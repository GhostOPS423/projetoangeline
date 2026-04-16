import { useState } from "react";
import { ChevronRight, ChevronLeft, AlertTriangle } from "lucide-react";

const events = [
  { day: 15, title: "Audiência de Instrução", type: "fatal", detail: "Smith vs. TechCorp — 14h" },
  { day: 18, title: "Reunião com Cliente", type: "normal", detail: "TechBR Soluções — 10h" },
  { day: 22, title: "Prazo Recurso", type: "fatal", detail: "Silva & Associados — TRT 2ª Região" },
  { day: 24, title: "Divulgação de Perito", type: "normal", detail: "Williams - Resp. Civil" },
  { day: 28, title: "Prazo para Embargos", type: "fatal", detail: "Harrington vs. Global" },
];

const daysInMonth = 30;
const startDay = 2; // Tuesday

export default function Agenda() {
  const [currentMonth] = useState("Outubro 2024");
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-label mb-2">
          <span>Agenda</span>
          <ChevronRight size={10} />
          <span className="text-primary font-bold">Calendário</span>
        </div>
        <h2 className="text-4xl font-serif text-foreground">
          Prazos e Audiências
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Calendar */}
        <div className="col-span-12 lg:col-span-8 bg-card p-8 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <button className="p-2 hover:bg-muted rounded transition-colors">
              <ChevronLeft size={18} className="text-muted-foreground" />
            </button>
            <h4 className="text-xl font-serif text-foreground">{currentMonth}</h4>
            <button className="p-2 hover:bg-muted rounded transition-colors">
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((d) => (
              <div key={d} className="text-center text-[10px] font-label uppercase tracking-widest text-muted-foreground py-2">
                {d}
              </div>
            ))}
            {calendarDays.map((day, i) => {
              const event = day ? events.find((e) => e.day === day) : null;
              const isToday = day === 15;
              return (
                <div
                  key={i}
                  className={`min-h-[80px] p-2 rounded-lg border transition-all ${
                    day
                      ? "border-border hover:border-accent cursor-pointer"
                      : "border-transparent"
                  } ${isToday ? "bg-primary/5 border-primary/30" : ""}`}
                >
                  {day && (
                    <>
                      <span className={`text-xs font-bold ${isToday ? "text-primary" : "text-foreground"}`}>
                        {day}
                      </span>
                      {event && (
                        <div className={`mt-1 px-1.5 py-0.5 rounded text-[9px] font-label leading-tight ${
                          event.type === "fatal"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-accent/20 text-accent-foreground"
                        }`}>
                          {event.title}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-card p-8 rounded-xl shadow-sm border border-border sticky top-24">
            <h4 className="text-lg font-serif text-foreground mb-6">Próximos Eventos</h4>
            <div className="space-y-4">
              {events.map((e, i) => (
                <div key={i} className={`p-4 rounded-lg border-l-2 ${
                  e.type === "fatal" ? "border-destructive bg-destructive/5" : "border-accent bg-accent/5"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {e.type === "fatal" && <AlertTriangle size={12} className="text-destructive" />}
                    <span className="text-[10px] font-label uppercase tracking-widest text-muted-foreground font-bold">
                      {e.day} Out
                    </span>
                  </div>
                  <p className="text-sm font-serif text-foreground">{e.title}</p>
                  <p className="text-xs text-muted-foreground italic mt-1">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
