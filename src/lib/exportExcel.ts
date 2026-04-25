import * as XLSX from "xlsx";
import { getProcessos, getLancamentos, getPrazos } from "./store";

function autoFitColumns(rows: Record<string, any>[]): { wch: number }[] {
  if (!rows.length) return [];
  const keys = Object.keys(rows[0]);
  return keys.map((k) => {
    const headerLen = k.length;
    const maxCell = rows.reduce((max, r) => {
      const v = r[k];
      const len = v == null ? 0 : String(v).length;
      return len > max ? len : max;
    }, 0);
    return { wch: Math.min(Math.max(headerLen, maxCell) + 2, 50) };
  });
}

function boldHeader(ws: XLSX.WorkSheet) {
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
  for (let c = range.s.c; c <= range.e.c; c++) {
    const addr = XLSX.utils.encode_cell({ r: 0, c });
    const cell = ws[addr];
    if (cell) {
      cell.s = { font: { bold: true } };
    }
  }
}

export function exportToExcel() {
  const processos = getProcessos().map((p) => ({
    "Nome do Cliente": p.cliente,
    "Nº do Processo": p.numero,
    Tribunal: p.tribunal || "",
    Status: p.status,
    "Valor da Causa": p.valor,
  }));

  const lancamentos = getLancamentos()
    .slice()
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .map((l) => ({
      Data: new Date(l.data).toLocaleDateString("pt-BR"),
      Descrição: l.descricao,
      Categoria: l.categoria || (l.tipo === "receita" ? "Receita" : "Despesa"),
      Tipo: l.tipo === "receita" ? "Receita" : "Despesa",
      Valor: l.valor,
    }));

  const wb = XLSX.utils.book_new();

  const wsProc = XLSX.utils.json_to_sheet(
    processos.length
      ? processos
      : [{ "Nome do Cliente": "", "Nº do Processo": "", Tribunal: "", Status: "", "Valor da Causa": "" }]
  );
  wsProc["!cols"] = autoFitColumns(processos.length ? processos : [{ "Nome do Cliente": "", "Nº do Processo": "", Tribunal: "", Status: "", "Valor da Causa": "" }]);
  boldHeader(wsProc);
  XLSX.utils.book_append_sheet(wb, wsProc, "Processos");

  const wsFin = XLSX.utils.json_to_sheet(
    lancamentos.length
      ? lancamentos
      : [{ Data: "", Descrição: "", Categoria: "", Tipo: "", Valor: "" }]
  );
  wsFin["!cols"] = autoFitColumns(lancamentos.length ? lancamentos : [{ Data: "", Descrição: "", Categoria: "", Tipo: "", Valor: "" }]);
  boldHeader(wsFin);
  XLSX.utils.book_append_sheet(wb, wsFin, "Financeiro");

  const prazos = getPrazos()
    .slice()
    .sort((a, b) => a.data.localeCompare(b.data))
    .map((p) => ({
      Data: new Date(p.data).toLocaleDateString("pt-BR"),
      Título: p.titulo,
      Detalhes: p.detalhe || "",
      Tipo: p.tipo === "fatal" ? "Prazo Fatal" : "Normal",
    }));

  const wsPrazos = XLSX.utils.json_to_sheet(
    prazos.length ? prazos : [{ Data: "", Título: "", Detalhes: "", Tipo: "" }]
  );
  wsPrazos["!cols"] = autoFitColumns(prazos.length ? prazos : [{ Data: "", Título: "", Detalhes: "", Tipo: "" }]);
  boldHeader(wsPrazos);
  XLSX.utils.book_append_sheet(wb, wsPrazos, "Prazos");

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `sovereign-ledger-${date}.xlsx`);
}
