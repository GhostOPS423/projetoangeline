// LocalStorage-backed data store for processes and financial entries

export interface Processo {
  id: string;
  cliente: string;
  numero: string;
  tribunal: string;
  valor: number;
  status: "Ativo" | "Em análise" | "Concluído";
  fase: string;
  criadoEm: string;
}

export interface Lancamento {
  id: string;
  tipo: "receita" | "despesa";
  descricao: string;
  valor: number;
  data: string; // ISO date
}

export interface Prazo {
  id: string;
  titulo: string;
  detalhe: string;
  data: string; // ISO date (yyyy-mm-dd)
  tipo: "fatal" | "normal";
  processoId?: string;
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// --- Processos ---
const PROC_KEY = "sovereign_processos";

export function getProcessos(): Processo[] {
  return load<Processo[]>(PROC_KEY, []);
}

export function saveProcessos(list: Processo[]) {
  save(PROC_KEY, list);
}

export function addProcesso(p: Omit<Processo, "id" | "criadoEm">): Processo {
  const list = getProcessos();
  const novo: Processo = {
    ...p,
    id: crypto.randomUUID(),
    criadoEm: new Date().toISOString(),
  };
  list.push(novo);
  saveProcessos(list);
  return novo;
}

export function updateProcesso(id: string, data: Partial<Processo>) {
  const list = getProcessos().map((p) => (p.id === id ? { ...p, ...data } : p));
  saveProcessos(list);
}

export function deleteProcesso(id: string) {
  saveProcessos(getProcessos().filter((p) => p.id !== id));
}

// --- Lançamentos ---
const LANC_KEY = "sovereign_lancamentos";

export function getLancamentos(): Lancamento[] {
  return load<Lancamento[]>(LANC_KEY, []);
}

export function saveLancamentos(list: Lancamento[]) {
  save(LANC_KEY, list);
}

export function addLancamento(l: Omit<Lancamento, "id">): Lancamento {
  const list = getLancamentos();
  const novo: Lancamento = { ...l, id: crypto.randomUUID() };
  list.push(novo);
  saveLancamentos(list);
  return novo;
}

export function deleteLancamento(id: string) {
  saveLancamentos(getLancamentos().filter((l) => l.id !== id));
}

// --- Computed ---
export function getHonorariosMes(): number {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  return getLancamentos()
    .filter((l) => {
      const d = new Date(l.data);
      return l.tipo === "receita" && d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((s, l) => s + l.valor, 0);
}

export function getSaldoEmConta(): number {
  return getLancamentos().reduce(
    (s, l) => s + (l.tipo === "receita" ? l.valor : -l.valor),
    0
  );
}

export function getProcessosAtivosCount(): number {
  return getProcessos().filter((p) => p.status === "Ativo").length;
}

// --- Prazos ---
const PRAZO_KEY = "sovereign_prazos";

export function getPrazos(): Prazo[] {
  return load<Prazo[]>(PRAZO_KEY, []);
}

export function savePrazos(list: Prazo[]) {
  save(PRAZO_KEY, list);
}

export function addPrazo(p: Omit<Prazo, "id">): Prazo {
  const list = getPrazos();
  const novo: Prazo = { ...p, id: crypto.randomUUID() };
  list.push(novo);
  savePrazos(list);
  return novo;
}

export function deletePrazo(id: string) {
  savePrazos(getPrazos().filter((p) => p.id !== id));
}

// --- Date queries ---
function sameDay(iso: string, ymd: string): boolean {
  return iso.slice(0, 10) === ymd;
}

export function getPrazosByDay(ymd: string): Prazo[] {
  return getPrazos().filter((p) => sameDay(p.data, ymd));
}

export function getLancamentosByDay(ymd: string): Lancamento[] {
  return getLancamentos().filter((l) => sameDay(l.data, ymd));
}

export function getProcessosByDay(ymd: string): Processo[] {
  return getProcessos().filter((p) => sameDay(p.criadoEm, ymd));
}

/** Returns set of ymd strings that have at least one event (prazo, lançamento or novo processo). */
export function getDaysWithEvents(): Set<string> {
  const set = new Set<string>();
  getPrazos().forEach((p) => set.add(p.data.slice(0, 10)));
  getLancamentos().forEach((l) => set.add(l.data.slice(0, 10)));
  getProcessos().forEach((p) => set.add(p.criadoEm.slice(0, 10)));
  return set;
}
