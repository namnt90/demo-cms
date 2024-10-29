import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { LayoutList } from '@/pages/layout-management/LayoutList'
import { ContentList} from '@/pages/content-management/ContentList';
import { TemplateList } from '@/pages/template-management/TemplateList';
import LayoutCreate from "@/pages/layout-management/LayoutCreate.tsx";
import ContentCreate from "@/pages/content-management/ContentCreate.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'layouts',
        children: [
          { index: true, element: <LayoutList /> },
          { path: 'create', element: <LayoutCreate /> },
        ]
      },
      {
        path: 'contents',
        children: [
          { index: true, element: <ContentList /> },
          { path: 'create', element: <ContentCreate /> },
        ]
      },
      {
        path: 'templates',
        children: [
          { index: true, element: <TemplateList /> },
        ]
      }
    ]
  }
]);
