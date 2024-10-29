import { useState } from 'react';
import { Plus, Trash, Eye, Save, Image as ImageIcon, Package, MessageSquare, ArrowUpRight, Maximize, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import ImageContentConfig from "@/pages/content-management/ImageContent.tsx";
import {Action, Bundle, FieldMapping} from "@/lib/content.types.ts";
import {DynamicFieldMapping} from "@/pages/content-management/DynamicFieldMapping.tsx";
import {renderActionConfig} from "@/pages/content-management/ActionConfig.tsx";
import {BundleSelectionDialog} from "@/pages/content-management/BundleSelectionDialog.tsx";

const ContentCreate = () => {
  // State for content type and basic info
  const [contentType, setContentType] = useState<'image' | 'bundle' | 'custom'>('bundle');
  const [contentName, setContentName] = useState('');

  // Bundle related state
  const [showBundleSelector, setShowBundleSelector] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([]);
  const [previewData, setPreviewData] = useState<Record<string, any> | null>(null);

  // Action related state
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);


  // Field Mapping Functions
  const addFieldMapping = () => {
    setFieldMappings([
      ...fieldMappings,
      {
        id: Date.now(),
        displayName: '',
        sourceField: '',
        format: 'text',
        formatOptions: ''
      }
    ]);
  };

  const updateFieldMapping = (updatedField: FieldMapping) => {
    setFieldMappings(fieldMappings.map(field =>
      field.id === updatedField.id ? updatedField : field
    ));
  };

  const removeFieldMapping = (fieldId: number) => {
    setFieldMappings(fieldMappings.filter(field => field.id !== fieldId));
  };

  // Preview Function
  const previewMappedData = () => {
    if (!selectedBundle) return;

    const mappedData = fieldMappings.reduce<Record<string, any>>((acc, mapping) => {
      let value = selectedBundle[mapping.sourceField];

      switch (mapping.format) {
        case 'currency':
          value = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(value);
          break;
        case 'date':
          value = new Date(value).toLocaleDateString();
          break;
        case 'list':
          value = Array.isArray(value) ? value.join(', ') : value;
          break;
      }

      acc[mapping.displayName] = value;
      return acc;
    }, {});

    setPreviewData(mappedData);
  };

  // Action Functions
  const addAction = (type: 'redirect' | 'dialog' | 'popup') => {
    const newAction: Action = {
      id: Date.now(),
      type,
      config: getDefaultConfig(type)
    };
    setActions([...actions, newAction]);
    setSelectedAction(newAction);
    setShowActionDialog(false);
  };

  const getDefaultConfig = (type: string) => {
    switch (type) {
      case 'redirect':
        return { url: '', target: '_self', trackingId: '' };
      case 'dialog':
        return { title: '', content: '', buttons: [] };
      case 'popup':
        return { url: '', width: 600, height: 400 };
      default:
        return {};
    }
  };

  const updateAction = (actionId: number, config: any) => {
    setActions(actions.map(action =>
      action.id === actionId ? { ...action, config } : action
    ));
  };

  const removeAction = (actionId: number) => {
    setActions(actions.filter(action => action.id !== actionId));
    if (selectedAction?.id === actionId) {
      setSelectedAction(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Create Content</h1>
        <div className="flex gap-4 items-center">
          <Select value={contentType} onValueChange={(value: any) => setContentType(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image">
                <div className="flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image Content
                </div>
              </SelectItem>
              <SelectItem value="bundle">
                <div className="flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  Bundle Content
                </div>
              </SelectItem>
              <SelectItem value="custom">
                <div className="flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Custom Content
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Content Name"
            value={contentName}
            onChange={(e) => setContentName(e.target.value)}
            className="w-[300px]"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-6">
        {/* Content Configuration */}
        <div className="col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Content Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              {contentType === 'bundle' && (
                <div className="space-y-6">
                  {/* Bundle Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Selected Bundle</label>
                    {selectedBundle ? (
                      <div className="border rounded p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{selectedBundle.name}</h4>
                            <p className="text-sm text-gray-500">{selectedBundle.shortDesc}</p>
                          </div>
                          <Button variant="outline" onClick={() => setShowBundleSelector(true)}>
                            Change Bundle
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => setShowBundleSelector(true)}>
                        Select Bundle
                      </Button>
                    )}
                  </div>

                  {/* Field Mappings */}
                  {selectedBundle && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Display Mapping</h4>
                        <Button variant="outline" onClick={addFieldMapping}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Field
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {fieldMappings.map(field => (
                          <DynamicFieldMapping
                            key={field.id}
                            field={field}
                            onUpdate={updateFieldMapping}
                            onRemove={removeFieldMapping}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preview */}
                  {selectedBundle && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Preview</h4>
                        <Button variant="outline" onClick={previewMappedData}>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>

                      {previewData && (
                        <div className="border rounded p-4 bg-gray-50">
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(previewData, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {contentType === 'image' && <ImageContentConfig />}
            </CardContent>
          </Card>
        </div>

        {/* Action Configuration */}
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Actions</CardTitle>
                <Button variant="outline" onClick={() => setShowActionDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Action
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actions.length > 0 ? (
                  actions.map(action => (
                    <div
                      key={action.id}
                      className={`border rounded p-3 cursor-pointer ${
                        selectedAction?.id === action.id ? 'border-blue-500' : ''
                      }`}
                      onClick={() => setSelectedAction(action)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium capitalize">{action.type}</h4>
                          <p className="text-sm text-gray-500">
                            {action.type === 'redirect' ? action.config.url : action.config.title}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAction(action.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No actions configured</p>
                    <p className="text-sm">Click Add Action to configure behavior</p>
                  </div>
                )}

                {selectedAction && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-4">Action Configuration</h4>
                    {/* Render configuration form based on action type */}
                    {renderActionConfig(selectedAction, updateAction)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preview & Save */}
          <div className="mt-6 space-y-4">
            <Button variant="outline" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Preview Content
            </Button>
            <Button className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Content
            </Button>
          </div>
        </div>
      </div>

      {/* Bundle Selection Dialog */}
      {showBundleSelector && (
        <BundleSelectionDialog
          bundles={[
            {
              id: 1,
              name: "Basic Insurance",
              shortDesc: "Essential coverage for individuals",
              price: "500,000 VND/month",
              category: "Insurance",
              iconUrl: "/api/placeholder/64/64"
            }
          ]}
          onSelect={(bundle) => {
            setSelectedBundle(bundle);
            setShowBundleSelector(false);
          }}
          onClose={() => setShowBundleSelector(false)}
        />
      )}

      {/* Action Selection Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Action Type</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 p-4">
            {[
              {
                type: 'redirect',
                icon: ArrowUpRight,
                title: 'Redirect',
                description: 'Navigate to URL when clicked',
                color: 'text-blue-500'
              },
              {
                type: 'dialog',
                icon: MessageSquare,
                title: 'Dialog',
                description: 'Show modal dialog',
                color: 'text-green-500'
              },
              {
                type: 'popup',
                icon: Maximize,
                title: 'Popup',
                description: 'Open in popup window',
                color: 'text-purple-500'
              }
            ].map(item => (
              <div
                key={item.type}
                className="border rounded-lg p-4 cursor-pointer hover:border-blue-500"
                onClick={() => addAction(item.type as any)}
              >
                <item.icon className={`w-8 h-8 mb-2 ${item.color}`} />
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};



export default ContentCreate;