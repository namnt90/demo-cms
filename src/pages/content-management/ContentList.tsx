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

export const ContentList = () => {
  const contents = [
    { id: 1, name: 'Summer Sale Banner', type: 'image', status: 'published' },
    { id: 2, name: 'Premium Bundle', type: 'bundle', status: 'draft' },
    { id: 3, name: 'Featured Products', type: 'bundle', status: 'published' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contents</h2>
        <Link to="/contents/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Content
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
          {contents.map((content) => (
            <TableRow key={content.id}>
              <TableCell>{content.name}</TableCell>
              <TableCell>{content.type}</TableCell>
              <TableCell>{content.status}</TableCell>
              <TableCell>
                <Link to={`/contents/${content.id}/edit`}>
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