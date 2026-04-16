import { MetricCards } from "@/components/dashboard/MetricCards";
import { ActiveCases } from "@/components/dashboard/ActiveCases";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UrgentDeadlines } from "@/components/dashboard/UrgentDeadlines";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { ChevronRight } from "lucide-react";

export default function Dashboard() {
  return (
    <div>
      {/* Breadcrumbs & Title */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-label mb-2">
            <span>Executivo</span>
            <ChevronRight size={10} />
            <span className="text-primary font-bold">Dashboard Principal</span>
          </div>
          <h2 className="text-4xl font-serif text-foreground">
            Visão Geral Financeira
          </h2>
        </div>
      </div>

      <MetricCards />

      {/* Chart */}
      <div className="mb-12">
        <FinancialChart />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <ActiveCases />
          <RecentActivity />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <UrgentDeadlines />
        </div>
      </div>
    </div>
  );
}
