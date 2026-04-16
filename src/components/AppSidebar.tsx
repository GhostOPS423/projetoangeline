import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Wallet,
  CalendarDays,
  Settings,
  HelpCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Processos", path: "/processos", icon: Briefcase },
  { title: "Fluxo de Caixa", path: "/financeiro", icon: Wallet },
  { title: "Agenda", path: "/agenda", icon: CalendarDays },
];

const footerItems = [
  { title: "Configurações", path: "/configuracoes", icon: Settings },
  { title: "Suporte", path: "/suporte", icon: HelpCircle },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-primary flex flex-col z-50 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className={cn("p-6", collapsed && "p-3")}>
        {!collapsed && (
          <>
            <h1 className="text-xl font-serif text-amber-accent mb-1">
              The Sovereign Ledger
            </h1>
            <p className="text-[10px] tracking-[0.2em] uppercase text-sidebar-foreground/50 font-label">
              Gestão Financeira Jurídica
            </p>
          </>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary border border-amber-accent/30 flex items-center justify-center text-amber-accent hover:bg-sidebar-hover transition-colors"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-sm",
                isActive
                  ? "border-l-2 border-amber-accent text-amber-accent font-bold bg-sidebar-hover/50"
                  : "text-sidebar-foreground/70 hover:text-primary-foreground hover:bg-sidebar-hover/30 hover:translate-x-1",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon size={18} />
              {!collapsed && (
                <span className="text-xs tracking-wider uppercase font-label">
                  {item.title}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* CTA */}
      {!collapsed && (
        <div className="px-4 py-4">
          <button className="w-full py-3 bg-sidebar-hover text-amber-accent text-xs font-bold tracking-widest uppercase rounded shadow-lg hover:bg-sidebar-hover/80 transition-all border border-amber-accent/20 flex items-center justify-center gap-2">
            <Plus size={14} />
            Novo Caso Jurídico
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="p-2 space-y-1 border-t border-sidebar-hover/50">
        {footerItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-2 text-sidebar-foreground/50 hover:text-primary-foreground transition-colors",
              collapsed && "justify-center px-2"
            )}
          >
            <item.icon size={16} />
            {!collapsed && (
              <span className="text-xs font-label">{item.title}</span>
            )}
          </NavLink>
        ))}
      </footer>
    </aside>
  );
}
