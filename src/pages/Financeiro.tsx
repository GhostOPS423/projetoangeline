import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { ChevronRight, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const transactions = [
  { type: "receita", desc: "Honorários - Harrington vs. Global", value: "R$ 15.000,00", date: "15/09/2024" },
  { type: "despesa", desc: "Custas Processuais - TRT 2ª Região", value: "R$ 1.250,00", date: "14/09/2024" },
  { type: "receita", desc: "Consultoria - TechBR", value: "R$ 8.500,00", date: "12/09/2024" },
  { type: "despesa", desc: "Aluguel Escritório", value: "R$ 4.800,00", date: "10/09/2024" },
  { type: "receita", desc: "Honorários - Espólio B. Miller", value: "R$ 22.000,00", date: "08/09/2024" },
];

const inadimplentes = [
  { client: "TechBR Soluções", amount: "R$ 12.500,00", days: 45 },
  { client: "José M. Santos", amount: "R$ 3.200,00", days: 30 },
];

export default function Financeiro() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-label mb-2">
          <span>Financeiro</span>
          <ChevronRight size={10} />
          <span className="text-primary font-bold">Fluxo de Caixa</span>
        </div>
        <h2 className="text-4xl font-serif text-foreground">Controle Financeiro</h2>
      </div>

      <FinancialChart />

      <div className="grid grid-cols-12 gap-8 mt-8">
        {/* Transactions */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-card p-8 rounded-xl shadow-sm">
            <h4 className="text-xl font-serif text-foreground mb-6">Últimas Movimentações</h4>
            <div className="space-y-3">
              {transactions.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${t.type === "receita" ? "bg-success/10" : "bg-destructive/10"}`}>
                      {t.type === "receita" ? <TrendingUp size={14} className="text-success" /> : <TrendingDown size={14} className="text-destructive" />}
                    </div>
                    <div>
                      <p className="text-sm text-foreground">{t.desc}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-label">{t.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${t.type === "receita" ? "text-success" : "text-destructive"}`}>
                    {t.type === "receita" ? "+" : "-"}{t.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Inadimplência */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle size={18} className="text-warning" />
              <h4 className="text-lg font-serif text-foreground">Inadimplência</h4>
            </div>
            <div className="space-y-4">
              {inadimplentes.map((item, i) => (
                <div key={i} className="p-4 bg-warning/5 rounded-lg border-l-2 border-warning">
                  <p className="text-sm font-bold text-foreground">{item.client}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.amount} — {item.days} dias em atraso</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
