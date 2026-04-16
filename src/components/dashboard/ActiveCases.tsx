import { useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";

type CaseStatus = "Em análise" | "Petição Inicial" | "Audiência" | "Concluído" | "No Prazo" | "Docs Pendentes";

interface Case {
  id: string;
  title: string;
  number: string;
  phase: string;
  responsible: string;
  initials: string;
  status: CaseStatus;
}

const cases: Case[] = [
  {
    id: "1",
    title: "Harrington vs. Global Logistics",
    number: "#CASO-2023-9021",
    phase: "Fase de Descoberta",
    responsible: "Ricardo Silva",
    initials: "RS",
    status: "No Prazo",
  },
  {
    id: "2",
    title: "Integração de Fusão Acme Corp",
    number: "#CASO-2024-1102",
    phase: "Due Diligence",
    responsible: "Eleanor Vance",
    initials: "EV",
    status: "Docs Pendentes",
  },
  {
    id: "3",
    title: "Silva & Associados - Trabalhista",
    number: "#CASO-2024-0087",
    phase: "Petição Inicial",
    responsible: "Carlos Mendes",
    initials: "CM",
    status: "Petição Inicial",
  },
  {
    id: "4",
    title: "Espólio de B. Miller",
    number: "#CASO-2023-7744",
    phase: "Audiência Marcada",
    responsible: "Ana Paula",
    initials: "AP",
    status: "Audiência",
  },
  {
    id: "5",
    title: "Consultoria Tributária - TechBR",
    number: "#CASO-2024-2201",
    phase: "Análise Documental",
    responsible: "Ricardo Silva",
    initials: "RS",
    status: "Em análise",
  },
];

const statusStyles: Record<string, string> = {
  "No Prazo": "bg-surface-low text-secondary",
  "Docs Pendentes": "bg-amber-light text-accent-foreground italic",
  "Petição Inicial": "bg-primary/10 text-primary",
  "Audiência": "bg-destructive/10 text-destructive",
  "Em análise": "bg-muted text-muted-foreground",
  "Concluído": "bg-success/10 text-success",
};

export function ActiveCases() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"title" | "status">("title");

  const filtered = cases
    .filter(
      (c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.number.toLowerCase().includes(search.toLowerCase()) ||
        c.responsible.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a[sortField].localeCompare(b[sortField]));

  return (
    <section className="bg-card p-8 rounded-xl shadow-sm">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h4 className="text-xl font-serif text-foreground">
            Processos Jurídicos Ativos
          </h4>
          <p className="text-sm text-muted-foreground">
            Status do caso e fases do litígio
          </p>
        </div>
        <div className="relative w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Filtrar processos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-muted/50 border-none focus:outline-none focus:ring-1 focus:ring-accent rounded-md text-xs pl-9 py-2 font-body placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-low">
            <tr>
              <th
                className="px-4 py-3 text-[10px] font-label uppercase tracking-widest text-muted-foreground cursor-pointer"
                onClick={() => setSortField("title")}
              >
                <span className="flex items-center gap-1">
                  Identificador do Caso <ArrowUpDown size={10} />
                </span>
              </th>
              <th className="px-4 py-3 text-[10px] font-label uppercase tracking-widest text-muted-foreground">
                Fase
              </th>
              <th className="px-4 py-3 text-[10px] font-label uppercase tracking-widest text-muted-foreground">
                Responsável
              </th>
              <th
                className="px-4 py-3 text-[10px] font-label uppercase tracking-widest text-muted-foreground cursor-pointer"
                onClick={() => setSortField("status")}
              >
                <span className="flex items-center gap-1">
                  Status <ArrowUpDown size={10} />
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-card transition-colors cursor-pointer"
              >
                <td className="px-4 py-5">
                  <div className="font-serif text-foreground">{c.title}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {c.number}
                  </div>
                </td>
                <td className="px-4 py-5 text-sm text-foreground/70 italic">
                  {c.phase}
                </td>
                <td className="px-4 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">
                      {c.initials}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {c.responsible}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <span
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${
                      statusStyles[c.status] || "bg-muted text-muted-foreground"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
