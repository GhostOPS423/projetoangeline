import { Search, Bell, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToExcel } from "@/lib/exportExcel";
import { toast } from "sonner";

interface TopBarProps {
  searchQuery?: string;
  onSearchChange?: (v: string) => void;
}

export function TopBar({ searchQuery = "", onSearchChange }: TopBarProps) {
  const handleExport = () => {
    try {
      exportToExcel();
      toast.success("Relatório exportado com sucesso");
    } catch (e) {
      console.error(e);
      toast.error("Falha ao exportar relatório");
    }
  };

  return (
    <header className="flex justify-between items-center h-16 px-8 bg-card/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-border">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Pesquisar processos, casos ou documentos..."
            className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-accent rounded-md text-sm pl-10 py-2 font-body placeholder:text-muted-foreground"
          />
        </div>
        <Button
          onClick={handleExport}
          variant="outline"
          size="sm"
          className="gap-2 text-[10px] font-label uppercase tracking-widest border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <FileSpreadsheet size={14} />
          Exportar Relatório
        </Button>
      </div>

      <div className="flex items-center gap-4 text-muted-foreground">
        <Bell
          size={20}
          className="cursor-pointer hover:text-primary transition-colors"
        />
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
          JR
        </div>
      </div>
    </header>
  );
}
