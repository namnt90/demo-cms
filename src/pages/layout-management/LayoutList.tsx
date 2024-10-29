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

export const LayoutList = () => {
  const layouts = [
    { id: 1, name: 'Product Grid', type: 'grid', status: 'active' },
    { id: 2, name: 'Banner Carousel', type: 'carousel', status: 'draft' },
    { id: 3, name: 'Feature List', type: 'list', status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Layouts</h2>
        <Link to="/layouts/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Layout
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {layouts.map((layout) => (
            <TableRow key={layout.id}>
              <TableCell>{layout.name}</TableCell>
              <TableCell>{layout.type}</TableCell>
              <TableCell>{layout.status}</TableCell>
              <TableCell>
                <Link to={`/layouts/${layout.id}/edit`}>
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