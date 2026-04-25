// LocalStorage-backed data store for processes, financial entries and deadlines.
// All writes auto-persist immediately (synchronous) and dispatch a "sovereign:store-changed"
// CustomEvent so React components can subscribe via useStoreSync().

export interface Processo {
  id: string;
  cliente: string;
  numero: string;
  tribunal: string;
  valor: number;
  status: "Ativo" | "Em análise" | "Concluído";
  fase: string;
  criadoEm: string; // ISO datetime
}

export interface Lancamento {
  id: string;
  tipo: "receita" | "despesa";
  descricao: string;
  valor: number;
  data: string; // ISO date (yyyy-mm-dd)
  categoria?: string;
}

export interface Prazo {
  id: string;
  titulo: string;
  detalhe: string;
  data: string; // ISO date (yyyy-mm-dd)
  tipo: "fatal" | "normal";
  concluido?: boolean;
  processoId?: string;
}

const PROC_KEY = "sovereign_processos";
const LANC_KEY = "sovereign_lancamentos";
const PRAZO_KEY = "sovereign_prazos";
const SEED_KEY = "sovereign_seeded";

const STORE_EVENT = "sovereign:store-changed";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
  // Notify in-app subscribers (same tab)
  window.dispatchEvent(new CustomEvent(STORE_EVENT, { detail: { key } }));
}

// ---------- First-access seed ----------
// Loads small placeholder dataset only if there is NO real saved data yet.
function seedIfEmpty() {
  if (localStorage.getItem(SEED_KEY)) return;
  const hasAny =
    localStorage.getItem(PROC_KEY) ||
    localStorage.getItem(LANC_KEY) ||
    localStorage.getItem(PRAZO_KEY);
  if (hasAny) {
    localStorage.setItem(SEED_KEY, "1");
    return;
  }

  const today = new Date();
  const ymd = (offsetDays: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().slice(0, 10);
  };

  const seedProcessos: Processo[] = [
    {
      id: crypto.randomUUID(),
      cliente: "Harrington & Cia",
      numero: "0001234-56.2024.8.26.0100",
      tribunal: "TJ-SP",
      valor: 85000,
      status: "Ativo",
      fase: "Instrução",
      criadoEm: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      cliente: "Silva & Associados",
      numero: "0007891-23.2024.5.02.0001",
      tribunal: "TRT 2ª Região",
      valor: 42000,
      status: "Em análise",
      fase: "Recurso",
      criadoEm: new Date(today.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
  ];
  const seedLancamentos: Lancamento[] = [
    {
      id: crypto.randomUUID(),
      tipo: "receita",
      descricao: "Honorários — Harrington & Cia",
      valor: 12000,
      data: ymd(-3),
      categoria: "Honorários",
    },
    {
      id: crypto.randomUUID(),
      tipo: "despesa",
      descricao: "Custas judiciais",
      valor: 850,
      data: ymd(-1),
      categoria: "Custas",
    },
  ];
  const seedPrazos: Prazo[] = [
    {
      id: crypto.randomUUID(),
      titulo: "Audiência de Instrução",
      detalhe: "Smith vs. TechCorp — 14h",
      data: ymd(1),
      tipo: "fatal",
      concluido: false,
    },
    {
      id: crypto.randomUUID(),
      titulo: "Reunião com Cliente",
      detalhe: "TechBR Soluções",
      data: ymd(3),
      tipo: "normal",
      concluido: false,
    },
  ];

  localStorage.setItem(PROC_KEY, JSON.stringify(seedProcessos));
  localStorage.setItem(LANC_KEY, JSON.stringify(seedLancamentos));
  localStorage.setItem(PRAZO_KEY, JSON.stringify(seedPrazos));
  localStorage.setItem(SEED_KEY, "1");
}

// Run seed at module load (browser-only)
if (typeof window !== "undefined") {
  try {
    seedIfEmpty();
  } catch {
    // ignore
  }
}

// ---------- Processos ----------
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

// ---------- Lançamentos ----------
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

// ---------- Prazos ----------
export function getPrazos(): Prazo[] {
  return load<Prazo[]>(PRAZO_KEY, []);
}

export function savePrazos(list: Prazo[]) {
  save(PRAZO_KEY, list);
}

export function addPrazo(p: Omit<Prazo, "id">): Prazo {
  const list = getPrazos();
  const novo: Prazo = { ...p, id: crypto.randomUUID(), concluido: p.concluido ?? false };
  list.push(novo);
  savePrazos(list);
  return novo;
}

export function updatePrazo(id: string, data: Partial<Prazo>) {
  savePrazos(getPrazos().map((p) => (p.id === id ? { ...p, ...data } : p)));
}

export function deletePrazo(id: string) {
  savePrazos(getPrazos().filter((p) => p.id !== id));
}

// ---------- Date queries ----------
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

export function getDaysWithEvents(): Set<string> {
  const set = new Set<string>();
  getPrazos().forEach((p) => set.add(p.data.slice(0, 10)));
  getLancamentos().forEach((l) => set.add(l.data.slice(0, 10)));
  getProcessos().forEach((p) => set.add(p.criadoEm.slice(0, 10)));
  return set;
}

// ---------- Computed metrics ----------
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

/** Number of pending deadlines in the next 48 hours (from now). */
export function getPrazosProximas48h(): number {
  const now = new Date();
  const limit = new Date(now.getTime() + 1000 * 60 * 60 * 48);
  return getPrazos().filter((p) => {
    if (p.concluido) return false;
    const d = new Date(p.data + "T23:59:59");
    return d >= now && d <= limit;
  }).length;
}

/** Aggregated monthly receita/despesa for the last `monthsBack` months (oldest first). */
export function getMonthlySeries(monthsBack = 9): Array<{ mes: string; receita: number; despesa: number }> {
  const lanc = getLancamentos();
  const series: Array<{ mes: string; receita: number; despesa: number; key: string }> = [];
  const now = new Date();
  const monthShort = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    series.push({ mes: monthShort[d.getMonth()], receita: 0, despesa: 0, key });
  }
  lanc.forEach((l) => {
    const d = new Date(l.data);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const slot = series.find((s) => s.key === key);
    if (!slot) return;
    if (l.tipo === "receita") slot.receita += l.valor;
    else slot.despesa += l.valor;
  });
  return series.map(({ mes, receita, despesa }) => ({ mes, receita, despesa }));
}

// ---------- Backup / Restore ----------
export interface BackupPayload {
  version: 1;
  exportedAt: string;
  processos: Processo[];
  financeiro: Lancamento[];
  agenda: Prazo[];
}

export function buildBackup(): BackupPayload {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    processos: getProcessos(),
    financeiro: getLancamentos(),
    agenda: getPrazos(),
  };
}

export function downloadBackup() {
  const payload = buildBackup();
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `sovereign-backup-${date}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function restoreBackup(json: string): { ok: true } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(json) as Partial<BackupPayload>;
    if (!parsed || typeof parsed !== "object")
      return { ok: false, error: "Arquivo inválido." };
    if (Array.isArray(parsed.processos)) saveProcessos(parsed.processos as Processo[]);
    if (Array.isArray(parsed.financeiro)) saveLancamentos(parsed.financeiro as Lancamento[]);
    if (Array.isArray(parsed.agenda)) savePrazos(parsed.agenda as Prazo[]);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

// ---------- Subscription helper ----------
export function subscribeStore(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener(STORE_EVENT, handler);
  window.addEventListener("storage", handler); // cross-tab
  return () => {
    window.removeEventListener(STORE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
