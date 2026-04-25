import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { addPrazo } from "@/lib/store";
import { format } from "date-fns";

interface Props {
  open: boolean;
  initialDate?: Date;
  onClose: () => void;
  onSaved: () => void;
}

export function NovoPrazoModal({ open, initialDate, onClose, onSaved }: Props) {
  const [titulo, setTitulo] = useState("");
  const [detalhe, setDetalhe] = useState("");
  const [data, setData] = useState(format(new Date(), "yyyy-MM-dd"));
  const [tipo, setTipo] = useState<"fatal" | "normal">("normal");

  useEffect(() => {
    if (initialDate) setData(format(initialDate, "yyyy-MM-dd"));
  }, [initialDate, open]);

  const handleSave = () => {
    if (!titulo.trim()) return;
    addPrazo({ titulo, detalhe, data, tipo });
    setTitulo("");
    setDetalhe("");
    setTipo("normal");
    onSaved();
    onClose();
  };

  const inputClass =
    "w-full bg-muted/50 border border-border focus:outline-none focus:ring-1 focus:ring-accent rounded-md text-sm px-4 py-2.5 font-body placeholder:text-muted-foreground transition-colors hover:border-accent/50";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Novo Prazo / Audiência</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1.5 block">
              Título *
            </label>
            <input
              className={inputClass}
              placeholder="Ex: Audiência de Instrução"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1.5 block">
              Detalhes
            </label>
            <input
              className={inputClass}
              placeholder="Ex: Smith vs. TechCorp — 14h"
              value={detalhe}
              onChange={(e) => setDetalhe(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Data *
              </label>
              <input
                type="date"
                className={inputClass}
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Tipo
              </label>
              <select
                className={inputClass}
                value={tipo}
                onChange={(e) => setTipo(e.target.value as "fatal" | "normal")}
              >
                <option value="normal">Normal</option>
                <option value="fatal">Prazo Fatal</option>
              </select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="hover:bg-muted">
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!titulo.trim()}>
            Salvar Prazo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
