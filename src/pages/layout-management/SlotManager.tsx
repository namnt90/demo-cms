import { Plus, Settings2, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {ContentSlot} from "@/lib/layout.ts";

interface SlotManagerProps {
  slots: ContentSlot[];
  onAddSlot: () => void;
  onEditSlot: (slot: ContentSlot) => void;
  onRemoveSlot: (slotId: string) => void;
}

export const SlotManager = ({
  slots,
  onAddSlot,
  onEditSlot,
  onRemoveSlot
}: SlotManagerProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Content Slots</CardTitle>
          <Button onClick={onAddSlot}>
            <Plus className="w-4 h-4 mr-2" />
            Add Slot
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {slots.map((slot) => (
            <div key={slot.id} className="border rounded p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{slot.name}</h4>
                  <p className="text-sm text-gray-500">
                    Accepts: {slot.acceptedTypes.join(', ')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditSlot(slot)}
                  >
                    <Settings2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveSlot(slot.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};