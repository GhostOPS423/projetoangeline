import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, AlertTriangle, FileText, Trash2 } from "lucide-react";
import { format, parseISO, differenceInCalendarDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { deletePrazo, type Prazo } from "@/lib/store";

interface Props {
  prazo: Prazo | null;
  onClose: () => void;
  onChanged?: () => void;
}

export function PrazoDetailModal({ prazo, onClose, onChanged }: Props) {
  if (!prazo) return null;

  const data = parseISO(prazo.data);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = differenceInCalendarDays(data, today);
  const status =
    diff < 0
      ? "Vencido"
      : diff === 0
        ? "Vence Hoje"
        : diff === 1
          ? "Vence Amanhã"
          : `Em ${diff} dias`;

  const handleDelete = () => {
    deletePrazo(prazo.id);
    onChanged?.();
    onClose();
  };

  return (
    <Dialog open={!!prazo} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl flex items-center gap-3">
            {prazo.tipo === "fatal" ? (
              <AlertTriangle size={20} className="text-destructive" />
            ) : (
              <FileText size={20} className="text-primary" />
            )}
            Detalhes do Prazo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div>
            <p className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1">
              Título
            </p>
            <p className="text-base font-serif text-foreground">{prazo.titulo}</p>
          </div>

          {prazo.detalhe && (
            <div>
              <p className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1">
                Detalhes
              </p>
              <p className="text-sm text-foreground">{prazo.detalhe}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1">
                Data
              </p>
              <div className="flex items-center gap-2">
                <CalendarDays size={14} className="text-muted-foreground" />
                <p className="text-sm text-foreground capitalize">
                  {format(data, "dd MMM, yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1">
                Status
              </p>
              <p
                className={`text-sm font-bold ${
                  diff < 0 || prazo.tipo === "fatal"
                    ? "text-destructive"
                    : diff <= 2
                      ? "text-accent"
                      : "text-foreground"
                }`}
              >
                {status}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1">
              Tipo
            </p>
            <span
              className={`inline-block text-[10px] font-label uppercase tracking-widest px-2 py-1 rounded ${
                prazo.tipo === "fatal"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {prazo.tipo === "fatal" ? "Prazo Fatal" : "Prazo Normal"}
            </span>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={handleDelete} className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive">
            <Trash2 size={14} />
            Excluir
          </Button>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
