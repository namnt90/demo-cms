import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus, Trash} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Switch} from "@radix-ui/react-switch";
import {Label} from "@/components/ui/label.tsx";
import {Action} from "@/lib/content.types.ts";

interface ActionConfigProps {
  action: Action;
  onUpdate: (actionId: number, config: any) => void;
}

// Individual Action Config Components
const RedirectConfig = ({ action, onUpdate }: ActionConfigProps) => {
  const updateConfig = (updates: Partial<typeof action.config>) => {
    onUpdate(action.id, { ...action.config, ...updates });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Redirect URL</label>
        <Input
          placeholder="https://"
          value={action.config.url}
          onChange={e => updateConfig({ url: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Target</label>
          <Select
            value={action.config.target}
            onValueChange={target => updateConfig({ target })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select target" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_self">Same Window</SelectItem>
              <SelectItem value="_blank">New Window</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Tracking ID</label>
          <Input
            placeholder="Optional"
            value={action.config.trackingId}
            onChange={e => updateConfig({ trackingId: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">URL Parameters</label>
        <div className="space-y-2">
          {(action.config.params || []).map((param: any, index: number) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Key"
                value={param.key}
                onChange={e => {
                  const newParams = [...action.config.params];
                  newParams[index] = { ...param, key: e.target.value };
                  updateConfig({ params: newParams });
                }}
              />
              <Input
                placeholder="Value"
                value={param.value}
                onChange={e => {
                  const newParams = [...action.config.params];
                  newParams[index] = { ...param, value: e.target.value };
                  updateConfig({ params: newParams });
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newParams = action.config.params.filter((_: any, i: number) => i !== index);
                  updateConfig({ params: newParams });
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              const newParams = [...(action.config.params || []), { key: '', value: '' }];
              updateConfig({ params: newParams });
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Parameter
          </Button>
        </div>
      </div>
    </div>
  );
};

const DialogConfig = ({ action, onUpdate }: ActionConfigProps) => {
  const updateConfig = (updates: Partial<typeof action.config>) => {
    onUpdate(action.id, { ...action.config, ...updates });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Dialog Title</label>
        <Input
          placeholder="Enter title"
          value={action.config.title}
          onChange={e => updateConfig({ title: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Content</label>
        <Textarea
          placeholder="Dialog content..."
          value={action.config.content}
          onChange={e => updateConfig({ content: e.target.value })}
          rows={4}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Size</label>
        <Select
          value={action.config.size}
          onValueChange={size => updateConfig({ size })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Buttons</label>
        <div className="space-y-2">
          {(action.config.buttons || []).map((button: any, index: number) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Button text"
                value={button.text}
                onChange={e => {
                  const newButtons = [...action.config.buttons];
                  newButtons[index] = { ...button, text: e.target.value };
                  updateConfig({ buttons: newButtons });
                }}
              />
              <Select
                value={button.action}
                onValueChange={buttonAction => {
                  const newButtons = [...action.config.buttons];
                  newButtons[index] = { ...button, action: buttonAction };
                  updateConfig({ buttons: newButtons });
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="close">Close</SelectItem>
                  <SelectItem value="redirect">Redirect</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newButtons = action.config.buttons.filter((_: any, i: number) => i !== index);
                  updateConfig({ buttons: newButtons });
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              const newButtons = [...(action.config.buttons || []), { text: '', action: 'close' }];
              updateConfig({ buttons: newButtons });
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Button
          </Button>
        </div>
      </div>
    </div>
  );
};

const PopupConfig = ({ action, onUpdate }: ActionConfigProps) => {
  const updateConfig = (updates: Partial<typeof action.config>) => {
    onUpdate(action.id, { ...action.config, ...updates });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Popup URL</label>
        <Input
          placeholder="https://"
          value={action.config.url}
          onChange={e => updateConfig({ url: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Width</label>
          <Input
            type="number"
            placeholder="px"
            value={action.config.width}
            onChange={e => updateConfig({ width: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Height</label>
          <Input
            type="number"
            placeholder="px"
            value={action.config.height}
            onChange={e => updateConfig({ height: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Position</label>
        <Select
          value={action.config.position}
          onValueChange={position => updateConfig({ position })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="custom">Custom Position</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {action.config.position === 'custom' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">X Position</label>
            <Input
              type="number"
              placeholder="px"
              value={action.config.x}
              onChange={e => updateConfig({ x: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Y Position</label>
            <Input
              type="number"
              placeholder="px"
              value={action.config.y}
              onChange={e => updateConfig({ y: parseInt(e.target.value) })}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Switch
          id="auto-close"
          checked={action.config.autoClose}
          onCheckedChange={autoClose => updateConfig({ autoClose })}
        />
        <Label htmlFor="auto-close">Auto close after interaction</Label>
      </div>
    </div>
  );
};

// Main renderActionConfig function to be used in ContentCreate
const renderActionConfig = (action: Action, onUpdate: (actionId: number, config: any) => void) => {
  switch (action.type) {
    case 'redirect':
      return <RedirectConfig action={action} onUpdate={onUpdate} />;
    case 'dialog':
      return <DialogConfig action={action} onUpdate={onUpdate} />;
    case 'popup':
      return <PopupConfig action={action} onUpdate={onUpdate} />;
    default:
      return null;
  }
};

export {
  RedirectConfig,
  DialogConfig,
  PopupConfig,
  renderActionConfig
};