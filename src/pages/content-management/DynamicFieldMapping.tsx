// Dynamic Field Mapping Component
import {DynamicFieldMappingProps} from "@/lib/content.types.ts";
import {Input} from "@/components/ui/input.tsx";
import { SelectTrigger } from "@radix-ui/react-select";
import {Select, SelectContent, SelectItem, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash} from "lucide-react";

export const DynamicFieldMapping = ({ field, onUpdate, onRemove }: DynamicFieldMappingProps) => {
  return (
    <div className="grid grid-cols-12 gap-2 mb-2">
      <div className="col-span-3">
        <Input
          value={field.displayName}
          placeholder="Display Name"
          onChange={(e) => onUpdate({ ...field, displayName: e.target.value })}
        />
      </div>
      <div className="col-span-3">
        <Input
          value={field.sourceField}
          placeholder="Bundle Field"
          onChange={(e) => onUpdate({ ...field, sourceField: e.target.value })}
        />
      </div>
      <div className="col-span-3">
        <Select
          value={field.format}
          onValueChange={(value) => onUpdate({ ...field, format: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="currency">Currency</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="list">List</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="image">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2">
        <Input
          value={field.formatOptions}
          placeholder="Format Options"
          onChange={(e) => onUpdate({ ...field, formatOptions: e.target.value })}
        />
      </div>
      <div className="col-span-1">
        <Button variant="ghost" size="icon" onClick={() => onRemove(field.id)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};