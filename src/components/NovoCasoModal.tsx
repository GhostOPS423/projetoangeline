import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { addProcesso } from "@/lib/store";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function NovoCasoModal({ open, onClose, onSaved }: Props) {
  const [cliente, setCliente] = useState("");
  const [numero, setNumero] = useState("");
  const [tribunal, setTribunal] = useState("");
  const [valor, setValor] = useState("");

  const handleSave = () => {
    if (!cliente.trim() || !numero.trim()) return;
    addProcesso({
      cliente,
      numero,
      tribunal,
      valor: parseFloat(valor.replace(/[^\d.,]/g, "").replace(",", ".")) || 0,
      status: "Ativo",
      fase: "Em análise",
    });
    setCliente("");
    setNumero("");
    setTribunal("");
    setValor("");
    onSaved();
    onClose();
  };

  const inputClass =
    "w-full bg-muted/50 border border-border focus:outline-none focus:ring-1 focus:ring-accent rounded-md text-sm px-4 py-2.5 font-body placeholder:text-muted-foreground transition-colors hover:border-accent/50";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Novo Caso Jurídico</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1.5 block">
              Nome do Cliente *
            </label>
            <input
              className={inputClass}
              placeholder="Ex: João da Silva"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1.5 block">
              Nº do Processo *
            </label>
            <input
              className={inputClass}
              placeholder="Ex: 0001234-56.2024.8.26.0100"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1.5 block">
              Tribunal
            </label>
            <input
              className={inputClass}
              placeholder="Ex: TJ-SP"
              value={tribunal}
              onChange={(e) => setTribunal(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] font-label uppercase tracking-widest text-muted-foreground mb-1.5 block">
              Valor da Causa
            </label>
            <input
              className={inputClass}
              placeholder="R$ 0,00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="hover:bg-muted">
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!cliente.trim() || !numero.trim()}>
            Salvar Processo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
