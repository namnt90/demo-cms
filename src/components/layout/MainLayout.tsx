import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar className="w-64 border-r" />
      <div className="flex-1">
        <Header className="h-16 border-b" />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};