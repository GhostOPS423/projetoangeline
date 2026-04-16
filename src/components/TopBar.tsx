import { Search, Bell, FileSignature, FileText } from "lucide-react";

export function TopBar() {
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
            placeholder="Pesquisar processos, casos ou documentos..."
            className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-accent rounded-md text-sm pl-10 py-2 font-body placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-primary hover:text-primary/70 transition-all flex items-center gap-2">
          <FileSignature size={14} />
          Assinar Documento
        </button>
        <button className="px-5 py-1.5 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase rounded hover:bg-primary/90 transition-all flex items-center gap-2">
          <FileText size={14} />
          Criar Relatório
        </button>

        <div className="flex items-center gap-4 text-muted-foreground ml-4">
          <Bell
            size={20}
            className="cursor-pointer hover:text-primary transition-colors"
          />
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
            JR
          </div>
        </div>
      </div>
    </header>
  );
}
