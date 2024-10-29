// Bundle Selection Dialog
import {BundleSelectionDialogProps} from "@/lib/content.types.ts";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import {SelectValue} from "@radix-ui/react-select";
import {Card, CardContent} from "@/components/ui/card.tsx";

export const BundleSelectionDialog = ({ bundles, onSelect, onClose }: BundleSelectionDialogProps) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-3/4 max-h-[80vh] overflow-auto">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Select Bundle</h3>
          <Button variant="ghost" onClick={onClose}>&times;</Button>
        </div>

        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search bundles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bundles</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {bundles.map((bundle) => (
            <Card key={bundle.id} className="cursor-pointer hover:bg-gray-50" onClick={() => onSelect(bundle)}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {bundle.iconUrl && (
                    <img src={bundle.iconUrl} alt={bundle.name} className="w-16 h-16 object-cover rounded" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{bundle.name}</h4>
                    <p className="text-sm text-gray-500">{bundle.shortDesc}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-medium">{bundle.price}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {bundle.category}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};