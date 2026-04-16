import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";

export function AppLayout() {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 ml-64 flex flex-col transition-all duration-300">
        <TopBar />
        <main className="flex-1 px-12 py-8">
          <Outlet />
        </main>
      </div>
      {/* Subtle gradient embellishment */}
      <div className="fixed top-0 right-0 w-1/3 h-screen bg-gradient-to-l from-primary/5 to-transparent pointer-events-none -z-10" />
    </div>
  );
}
