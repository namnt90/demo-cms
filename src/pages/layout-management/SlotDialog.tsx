import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import {ContentSlot} from "@/lib/layout.ts";

interface SlotDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (slotData: any) => void;
  position?: { x: number; y: number };
  editSlot?: ContentSlot;
   gridConfig: { columns: number; rows: number };
}

export const SlotDialog = ({
  open,
  onClose,
  onSave,
  position,
  editSlot,
    gridConfig
}: SlotDialogProps) => {
  const [slotData, setSlotData] = useState({
    name: editSlot?.name || '',
    acceptedTypes: editSlot?.acceptedTypes || [],
    contentConfig: editSlot?.contentConfig || {
      imageConfig: {
        aspectRatio: '16:9',
        maxSize: 2,
        allowedFormats: ['jpg', 'png', 'webp']
      },
      bundleConfig: {
        displayFields: ['name', 'price', 'description'],
        priceFormat: 'VND',
        maxDescriptionLength: 100
      }
    }
  });
  const [selectedPos, setSelectedPos] = useState(position || { x: 0, y: 0 });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editSlot ? 'Edit Slot' : 'Add New Slot'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label>Slot Name</Label>
            <Input
              value={slotData.name}
              onChange={(e) => setSlotData({...slotData, name: e.target.value})}
              placeholder="Enter slot name"
            />
          </div>

          <div>
            <Label>Accepted Content Types</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="image"
                  checked={slotData.acceptedTypes.includes('image')}
                  onCheckedChange={(checked) => {
                    const types = checked
                      ? [...slotData.acceptedTypes, 'image']
                      : slotData.acceptedTypes.filter(t => t !== 'image');
                    setSlotData({...slotData, acceptedTypes: types});
                  }}
                />
                <label htmlFor="image">Image Content</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bundle"
                  checked={slotData.acceptedTypes.includes('bundle')}
                  onCheckedChange={(checked) => {
                    const types = checked
                      ? [...slotData.acceptedTypes, 'bundle']
                      : slotData.acceptedTypes.filter(t => t !== 'bundle');
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    setSlotData({...slotData, acceptedTypes: types});
                  }}
                />
                <label htmlFor="bundle">Bundle Content</label>
              </div>
            </div>
          </div>

          {slotData.acceptedTypes.includes('image') && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Image Configuration</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Aspect Ratio</Label>
                  <select
                    className="w-full h-9 rounded-md border px-3"
                    value={slotData.contentConfig.imageConfig.aspectRatio}
                    onChange={(e) => setSlotData({
                      ...slotData,
                      contentConfig: {
                        ...slotData.contentConfig,
                        imageConfig: {
                          ...slotData.contentConfig.imageConfig,
                          aspectRatio: e.target.value
                        }
                      }
                    })}
                  >
                    <option value="16:9">16:9</option>
                    <option value="4:3">4:3</option>
                    <option value="1:1">1:1</option>
                    <option value="9:16">9:16</option>
                  </select>
                </div>
                <div>
                  <Label>Max Size (MB)</Label>
                  <Input
                    type="number"
                    value={slotData.contentConfig.imageConfig.maxSize}
                    onChange={(e) => setSlotData({
                      ...slotData,
                      contentConfig: {
                        ...slotData.contentConfig,
                        imageConfig: {
                          ...slotData.contentConfig.imageConfig,
                          maxSize: Number(e.target.value)
                        }
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {slotData.acceptedTypes.includes('bundle') && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Bundle Configuration</h4>
              <div>
                <Label>Display Fields</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['name', 'price', 'description', 'category', 'tags'].map(field => (
                    <div key={field} className="flex items-center space-x-2">
                      <Checkbox
                        id={field}
                        checked={slotData.contentConfig.bundleConfig.displayFields.includes(field)}
                        onCheckedChange={(checked) => {
                          const fields = checked
                            ? [...slotData.contentConfig.bundleConfig.displayFields, field]
                            : slotData.contentConfig.bundleConfig.displayFields.filter(f => f !== field);
                          setSlotData({
                            ...slotData,
                            contentConfig: {
                              ...slotData.contentConfig,
                              bundleConfig: {
                                ...slotData.contentConfig.bundleConfig,
                                displayFields: fields
                              }
                            }
                          });
                        }}
                      />
                      <label htmlFor={field} className="capitalize">{field}</label>
                    </div>
                  ))}
                </div>
              </div>
              {/*<div>*/}
              {/*  <Label>Price Format</Label>*/}
              {/*  <select*/}
              {/*    className="w-full h-9 rounded-md border px-3"*/}
              {/*    value={slotData.contentConfig.bundleConfig.priceFormat}*/}
              {/*    onChange={(e) => setSlotData({*/}
              {/*      ...slotData,*/}
              {/*      contentConfig: {*/}
              {/*        ...slotData.contentConfig,*/}
              {/*        bundleConfig: {*/}
              {/*          ...slotData.contentConfig.bundleConfig,*/}
              {/*          priceFormat: e.target.value*/}
              {/*        }*/}
              {/*      }*/}
              {/*    })}*/}
              {/*  >*/}
              {/*    <option value="VND">VND</option>*/}
              {/*    <option value="USD">USD</option>*/}
              {/*    <option value="EUR">EUR</option>*/}
              {/*  </select>*/}
              {/*</div>*/}
            </div>
          )}

          {position && (
            <div>
              <Label>Position</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Column</Label>
                  <Input value={position.x} disabled />
                </div>
                <div>
                  <Label>Row</Label>
                  <Input value={position.y} disabled />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => {
            onSave({
              ...slotData,
              position: position || editSlot?.position
            });
            onClose();
          }}>
            {editSlot ? 'Update' : 'Add'} Slot
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};