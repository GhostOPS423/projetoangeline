import { AlertTriangle } from "lucide-react";

const deadlines = [
  {
    urgent: true,
    label: "Em 48 Horas",
    title: "Audiência de Instrução",
    detail: "Justiça Federal - Distrito 4 • Smith vs. TechCorp",
    action: "Revisar Dossiê",
  },
  {
    urgent: false,
    label: "24 Out, 2024",
    title: "Divulgação de Perito",
    detail: "Tribunal de Justiça • Williams - Responsabilidade Civil",
    action: "Enviar Docs",
  },
  {
    urgent: false,
    label: "28 Out, 2024",
    title: "Prazo para Recurso",
    detail: "TRT 2ª Região • Silva & Associados - Trabalhista",
    action: "Preparar Recurso",
  },
];

export function UrgentDeadlines() {
  return (
    <section className="bg-card rounded-xl shadow-sm p-8 border border-border sticky top-24">
      <div className="flex items-center gap-3 mb-8">
        <AlertTriangle size={20} className="text-destructive" />
        <h4 className="text-xl font-serif text-foreground">Prazos Urgentes</h4>
      </div>

      <div className="space-y-8">
        {deadlines.map((d, i) => (
          <div key={i} className="relative pl-6 border-l border-border">
            <div
              className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full ring-4 ring-card ${
                d.urgent ? "bg-destructive" : "bg-muted-foreground/30"
              }`}
            />
            <p
              className={`text-[10px] font-label uppercase tracking-widest font-bold mb-1 ${
                d.urgent ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {d.label}
            </p>
            <h5 className="text-base font-serif text-foreground mb-2">
              {d.title}
            </h5>
            <p className="text-xs text-muted-foreground italic mb-4">
              {d.detail}
            </p>
            <button className="text-[10px] font-label uppercase tracking-widest text-foreground border border-primary px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-all rounded-sm">
              {d.action}
            </button>
          </div>
        ))}
      </div>

      {/* Quick insights */}
      <div className="mt-10 p-6 bg-surface-low rounded-lg">
        <p className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-4">
          Insights Rápidos
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-body text-foreground">
            Carga de Tarefas Ativas
          </span>
          <span className="text-xs font-bold text-foreground">72%</span>
        </div>
        <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: "72%" }} />
        </div>
        <p className="text-[10px] text-muted-foreground italic mt-3 text-center">
          Otimizado para produtividade
        </p>
      </div>
    </section>
  );
}
