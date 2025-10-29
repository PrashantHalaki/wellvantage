import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-screen">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 overflow-auto flex flex-col">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed top-4 left-4 z-30"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </Button>
        <Outlet />
      </main>
    </div>
  );
}
