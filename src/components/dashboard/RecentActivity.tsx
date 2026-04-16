import { FileText, Landmark, Gavel } from "lucide-react";

const activities = [
  {
    icon: FileText,
    title: "Novo Documento Protocolado:",
    desc: "Petição judicial para Harrington vs. Global Logistics (Pedido de Julgamento Antecipado).",
    time: "Hoje às 10:42",
    author: "Ricardo Silva",
  },
  {
    icon: Landmark,
    title: "Transferência de Custódia Concluída:",
    desc: "Fundos de acordo recebidos para o Espólio de B. Miller.",
    time: "Ontem às 16:15",
    author: "Sistema Financeiro",
  },
  {
    icon: Gavel,
    title: "Audiência Agendada:",
    desc: "Audiência de instrução marcada para Silva & Associados — 22/10 às 14h.",
    time: "Ontem às 09:30",
    author: "Carlos Mendes",
  },
];

export function RecentActivity() {
  return (
    <section>
      <h4 className="text-xl font-serif text-foreground mb-6">
        Atividade Recente
      </h4>
      <div className="space-y-4">
        {activities.map((a, i) => (
          <div
            key={i}
            className="bg-card p-6 rounded-xl flex items-start gap-6 border-l-2 border-border hover:border-accent transition-all"
          >
            <div className="w-10 h-10 rounded bg-primary/5 flex items-center justify-center flex-shrink-0">
              <a.icon size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-bold">{a.title}</span> {a.desc}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2 font-label">
                {a.time} • {a.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
