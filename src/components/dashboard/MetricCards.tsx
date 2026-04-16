import { TrendingUp, Scale, Clock, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import { getHonorariosMes, getSaldoEmConta, getProcessosAtivosCount } from "@/lib/store";

export function MetricCards() {
  const honorarios = getHonorariosMes();
  const saldo = getSaldoEmConta();
  const ativos = getProcessosAtivosCount();

  const fmt = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const cards = [
    {
      label: "Honorários do Mês",
      value: fmt(honorarios),
      change: "Soma das receitas do mês atual",
      positive: true,
      icon: TrendingUp,
      highlight: true,
    },
    {
      label: "Processos Ativos",
      value: String(ativos),
      change: `${ativos} caso${ativos !== 1 ? "s" : ""} com status Ativo`,
      positive: true,
      icon: Scale,
    },
    {
      label: "Prazos Próximos (48h)",
      value: "—",
      change: "Dados da agenda",
      positive: false,
      icon: Clock,
      urgent: false,
    },
    {
      label: "Saldo em Conta",
      value: fmt(saldo),
      change: "Receitas − Despesas",
      positive: saldo >= 0,
      icon: Landmark,
      dark: true,
    },
  ];

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
