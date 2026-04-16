import { TrendingUp, Scale, Clock, Landmark } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    label: "Honorários do Mês",
    value: "R$ 84.250,00",
    change: "+12.4% desde o mês passado",
    positive: true,
    icon: TrendingUp,
    highlight: true,
  },
  {
    label: "Processos Ativos",
    value: "23",
    change: "4 novos esta semana",
    positive: true,
    icon: Scale,
  },
  {
    label: "Prazos Próximos (48h)",
    value: "5",
    change: "2 prazos fatais",
    positive: false,
    icon: Clock,
    urgent: true,
  },
  {
    label: "Saldo em Conta",
    value: "R$ 142.800,00",
    change: "Atualizado hoje",
    positive: true,
    icon: Landmark,
    dark: true,
  },
];

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className={`p-6 rounded-xl shadow-sm relative overflow-hidden group transition-all hover:shadow-md ${
            card.dark
              ? "bg-primary text-primary-foreground"
              : card.highlight
              ? "bg-card border-l-4 border-accent"
              : "bg-card"
          }`}
        >
          <div className="relative z-10">
            <p
              className={`text-[10px] font-label uppercase tracking-widest mb-3 ${
                card.dark ? "text-primary-foreground/60" : "text-muted-foreground"
              }`}
            >
              {card.label}
            </p>
            <h3
              className={`text-3xl font-serif mb-2 ${
                card.dark ? "text-amber-accent" : "text-foreground"
              }`}
            >
              {card.value}
            </h3>
            <div
              className={`flex items-center gap-2 text-xs ${
                card.urgent
                  ? "text-destructive"
                  : card.dark
                  ? "text-primary-foreground/70"
                  : card.positive
                  ? "text-success"
                  : "text-muted-foreground"
              }`}
            >
              <card.icon size={14} />
              <span className="font-medium">{card.change}</span>
            </div>
          </div>
          <div
            className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${
              card.dark ? "text-amber-accent" : "text-primary"
            }`}
          >
            <card.icon size={80} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
