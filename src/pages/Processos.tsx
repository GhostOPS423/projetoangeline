import { ActiveCases } from "@/components/dashboard/ActiveCases";
import { ChevronRight } from "lucide-react";

export default function Processos() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-label mb-2">
          <span>CRM Jurídico</span>
          <ChevronRight size={10} />
          <span className="text-primary font-bold">Processos</span>
        </div>
        <h2 className="text-4xl font-serif text-foreground">Gestão de Processos</h2>
      </div>
      <ActiveCases />
    </div>
  );
}
