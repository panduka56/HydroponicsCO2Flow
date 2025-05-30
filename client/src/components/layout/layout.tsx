import { Navigation } from "./navigation";
import { Footer } from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-grow bg-gradient-to-b from-background to-background-muted">
        {children}
      </main>
      <Footer />
    </div>
  );
}
