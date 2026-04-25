import { useEffect, useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { format, parseISO, differenceInCalendarDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getPrazos, type Prazo } from "@/lib/store";
import { useOutletContext } from "react-router-dom";
import { useStoreSync } from "@/hooks/useStoreSync";

interface Props {
  /** Optional yyyy-MM-dd to filter only that day; if omitted, shows next upcoming. */
  filterDay?: string | null;
}

export function UrgentDeadlines({ filterDay }: Props) {
  const ctx = useOutletContext<{ refreshKey: number }>() || { refreshKey: 0 };
  const [prazos, setPrazos] = useState<Prazo[]>([]);

  useEffect(() => {
    setPrazos(getPrazos());
  }, [ctx?.refreshKey]);

  const visible = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (filterDay) {
      return prazos
        .filter((p) => p.data.slice(0, 10) === filterDay)
        .sort((a, b) => a.data.localeCompare(b.data));
    }

    return prazos
      .filter((p) => parseISO(p.data) >= today)
      .sort((a, b) => a.data.localeCompare(b.data))
      .slice(0, 5);
  }, [prazos, filterDay]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section className="bg-card rounded-xl shadow-sm p-8 border border-border sticky top-24">
      <div className="flex items-center gap-3 mb-8">
        <AlertTriangle size={20} className="text-destructive" />
        <h4 className="text-xl font-serif text-foreground">
          {filterDay ? "Prazos do Dia" : "Prazos Urgentes"}
        </h4>
      </div>

      {visible.length === 0 ? (
        <p className="text-xs text-muted-foreground italic py-4">
          {filterDay
            ? "Sem prazos para este dia."
            : "Nenhum prazo cadastrado. Acesse a Agenda para adicionar."}
        </p>
      ) : (
        <div className="space-y-8">
          {visible.map((d) => {
            const data = parseISO(d.data);
            const diff = differenceInCalendarDays(data, today);
            const urgent = d.tipo === "fatal" || (diff >= 0 && diff <= 2);
            const label =
              diff === 0
                ? "Hoje"
                : diff === 1
                  ? "Amanhã"
                  : diff > 0 && diff <= 2
                    ? `Em ${diff} dias`
                    : format(data, "dd MMM, yyyy", { locale: ptBR });

            return (
              <div key={d.id} className="relative pl-6 border-l border-border">
                <div
                  className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full ring-4 ring-card ${
                    urgent ? "bg-destructive" : "bg-muted-foreground/30"
                  }`}
                />
                <p
                  className={`text-[10px] font-label uppercase tracking-widest font-bold mb-1 ${
                    urgent ? "text-destructive" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </p>
                <h5 className="text-base font-serif text-foreground mb-2">
                  {d.titulo}
                </h5>
                {d.detalhe && (
                  <p className="text-xs text-muted-foreground italic mb-2">
                    {d.detalhe}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Quick insights */}
      <div className="mt-10 p-6 bg-surface-low rounded-lg">
        <p className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-4">
          Insights Rápidos
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-body text-foreground">
            Prazos Cadastrados
          </span>
          <span className="text-xs font-bold text-foreground">{prazos.length}</span>
        </div>
        <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${Math.min(100, prazos.length * 10)}%` }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground italic mt-3 text-center">
          Otimizado para produtividade
        </p>
      </div>
    </section>
  );
}
