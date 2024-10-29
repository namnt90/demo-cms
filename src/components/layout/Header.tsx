import { useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

export const Header = ({ className }: { className?: string }) => {
  const location = useLocation();

  const getPageTitle = (path: string) => {
    if (path.startsWith('/layouts')) return 'Layout Management';
    if (path.startsWith('/contents')) return 'Content Management';
    if (path.startsWith('/templates')) return 'Template Management';
    return 'Dashboard';
  };

  return (
    <header className={cn("bg-background px-6 flex items-center", className)}>
      <h1 className="text-lg font-semibold">
        {getPageTitle(location.pathname)}
      </h1>
    </header>
  );
};
