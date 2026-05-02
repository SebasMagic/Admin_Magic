import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex h-screen w-screen bg-black overflow-hidden" data-testid="page-layout">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-6 bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}
