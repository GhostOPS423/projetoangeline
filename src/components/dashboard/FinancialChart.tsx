import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { mes: "Jan", receita: 62000, despesa: 28000 },
  { mes: "Fev", receita: 58000, despesa: 31000 },
  { mes: "Mar", receita: 71000, despesa: 25000 },
  { mes: "Abr", receita: 84000, despesa: 33000 },
  { mes: "Mai", receita: 79000, despesa: 29000 },
  { mes: "Jun", receita: 92000, despesa: 35000 },
  { mes: "Jul", receita: 88000, despesa: 30000 },
  { mes: "Ago", receita: 95000, despesa: 32000 },
  { mes: "Set", receita: 84250, despesa: 28430 },
];

export function FinancialChart() {
  return (
    <div className="bg-card p-8 rounded-xl shadow-sm">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h4 className="text-xl font-serif text-foreground">
            Evolução Financeira Mensal
          </h4>
          <p className="text-sm text-muted-foreground">
            Receitas vs. Despesas — 2024
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
