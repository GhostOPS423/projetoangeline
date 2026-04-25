import { useRef } from "react";
import { Search, Bell, FileSpreadsheet, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToExcel } from "@/lib/exportExcel";
import { downloadBackup, restoreBackup } from "@/lib/store";
import { toast } from "sonner";

export function TopBar() {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      exportToExcel();
      toast.success("Relatório Excel exportado");
    } catch (e) {
      console.error(e);
      toast.error("Falha ao exportar relatório");
    }
  };

  const handleBackup = () => {
    try {
      downloadBackup();
      toast.success("Backup JSON salvo");
    } catch (e) {
      console.error(e);
      toast.error("Falha ao gerar backup");
    }
  };

  const handleRestoreClick = () => fileRef.current?.click();

  const handleRestoreFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!confirm("Restaurar substituirá todos os dados atuais. Continuar?")) {
      e.target.value = "";
      return;
    }
    const text = await file.text();
    const result = restoreBackup(text);
    if (result.ok) {
      toast.success("Backup restaurado com sucesso");
    } else {
      toast.error(`Falha ao restaurar: ${result.error}`);
    }
    e.target.value = "";
  };

  return (
    <header className="flex justify-between items-center h-16 px-8 bg-card/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-border">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
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
          Excel
        </Button>
        <Button
          onClick={handleBackup}
          variant="outline"
          size="sm"
          className="gap-2 text-[10px] font-label uppercase tracking-widest border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all"
          title="Baixar backup JSON com todos os dados"
        >
          <Download size={14} />
          Backup
        </Button>
        <Button
          onClick={handleRestoreClick}
          variant="outline"
          size="sm"
          className="gap-2 text-[10px] font-label uppercase tracking-widest border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all"
          title="Restaurar dados de um arquivo de backup"
        >
          <Upload size={14} />
          Restaurar
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          onChange={handleRestoreFile}
          className="hidden"
        />
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
