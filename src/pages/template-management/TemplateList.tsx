import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from 'lucide-react';

export const TemplateList = () => {
  const templates = [
    { id: 1, name: 'Product Showcase', layout: 'Product Grid', status: 'active' },
    { id: 2, name: 'Homepage Hero', layout: 'Banner Carousel', status: 'draft' },
    { id: 3, name: 'Category List', layout: 'Feature List', status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Templates</h2>
        <Link to="/templates/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Layout</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.name}</TableCell>
              <TableCell>{template.layout}</TableCell>
              <TableCell>{template.status}</TableCell>
              <TableCell>
                <Link to={`/templates/${template.id}/edit`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};