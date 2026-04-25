import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { getMonthlySeries } from "@/lib/store";
import { useStoreSync } from "@/hooks/useStoreSync";

export function FinancialChart() {
  useStoreSync();
  const data = getMonthlySeries(9);
  const year = new Date().getFullYear();

  return (
    <div className="bg-card p-8 rounded-xl shadow-sm">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h4 className="text-xl font-serif text-foreground">
            Evolução Financeira Mensal
          </h4>
          <p className="text-sm text-muted-foreground">
            Receitas vs. Despesas — {year}
          </p>
        </div>
        <div className="flex items-center gap-6 text-xs font-label">
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-primary rounded" />
            Receita
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-accent rounded" />
            Despesas
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(238, 90%, 21%)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(238, 90%, 21%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 91%)" />
          <XAxis
            dataKey="mes"
            tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value: number) =>
              `R$ ${value.toLocaleString("pt-BR")}`
            }
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid hsl(210, 20%, 91%)",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="receita"
            stroke="hsl(238, 90%, 21%)"
            strokeWidth={2}
            fill="url(#colorReceita)"
          />
          <Line
            type="monotone"
            dataKey="despesa"
            stroke="hsl(42, 80%, 66%)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
