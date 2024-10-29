import { Grid, List, ImageIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface LayoutTypeSelectorProps {
  layoutType: string;
  layoutName: string;
  onTypeChange: (type: string) => void;
  onNameChange: (name: string) => void;
}

export const LayoutTypeSelector = ({
  layoutType,
  layoutName,
  onTypeChange,
  onNameChange
}: LayoutTypeSelectorProps) => {
  return (
    <div className="flex gap-4 items-center">
      <Select value={layoutType} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select layout type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="grid">
            <div className="flex items-center">
              <Grid className="w-4 h-4 mr-2" />
              Grid Layout
            </div>
          </SelectItem>
          <SelectItem value="list">
            <div className="flex items-center">
              <List className="w-4 h-4 mr-2" />
              List Layout
            </div>
          </SelectItem>
          <SelectItem value="carousel">
            <div className="flex items-center">
              <ImageIcon className="w-4 h-4 mr-2" />
              Carousel Layout
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Layout Name"
        value={layoutName}
        onChange={(e) => onNameChange(e.target.value)}
        className="w-[300px]"
      />
    </div>
  );
};
