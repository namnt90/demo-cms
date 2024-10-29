import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Layout, FileText, Box } from 'lucide-react';

export const Sidebar = ({ className }: { className?: string }) => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Layout Management',
      path: '/layouts',
      icon: Layout
    },
    {
      title: 'Content Management',
      path: '/contents',
      icon: FileText
    },
    {
      title: 'Template Management',
      path: '/templates',
      icon: Box
    }
  ];

  return (
    <div className={cn("bg-background", className)}>
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-xl font-bold">CMS Admin</h1>
        </div>
        <nav className="flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-6 py-3 text-sm",
                "hover:bg-accent hover:text-accent-foreground",
                location.pathname.startsWith(item.path) &&
                "bg-accent text-accent-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};