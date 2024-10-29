// components/layout/StyleConfigurator.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Palette, 
  Type, 
  BoxSelect, 
  Maximize,
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Trash
} from 'lucide-react';

interface StyleConfig {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      base: string;
      heading: string;
      small: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
  spacing: {
    unit: string;
    container: string;
    item: string;
    gap: string;
  };
  borders: {
    radius: string;
    width: string;
    style: string;
    color: string;
  };
  effects: {
    shadow: boolean;
    shadowColor: string;
    shadowSize: string;
    transition: boolean;
    transitionDuration: string;
  };
  responsive: {
    breakpoints: {
      tablet: string;
      mobile: string;
    };
    adaptiveTypography: boolean;
    adaptiveSpacing: boolean;
  };
}

interface StyleConfiguratorProps {
  styleConfig: StyleConfig;
  onStyleChange: (config: StyleConfig) => void;
  activeDevice: string;
}

export const StyleConfigurator = ({
  styleConfig,
  onStyleChange,
  activeDevice
}: StyleConfiguratorProps) => {
  const [activeTab, setActiveTab] = useState('colors');

  const updateStyle = (category: keyof StyleConfig, subCategory: string, value: any) => {
    const newConfig = { ...styleConfig };
    if (subCategory.includes('.')) {
      const [main, sub] = subCategory.split('.');
      newConfig[category][main][sub] = value;
    } else {
      newConfig[category][subCategory] = value;
    }
    onStyleChange(newConfig);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Style Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden lg:inline">Colors</span>
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              <span className="hidden lg:inline">Typography</span>
            </TabsTrigger>
            <TabsTrigger value="spacing" className="flex items-center gap-2">
              <BoxSelect className="w-4 h-4" />
              <span className="hidden lg:inline">Spacing</span>
            </TabsTrigger>
            <TabsTrigger value="borders" className="flex items-center gap-2">
              <Maximize className="w-4 h-4" />
              <span className="hidden lg:inline">Borders</span>
            </TabsTrigger>
            <TabsTrigger value="effects" className="flex items-center gap-2">
              <span className="hidden lg:inline">Effects</span>
            </TabsTrigger>
            <TabsTrigger value="responsive" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span className="hidden lg:inline">Responsive</span>
            </TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styleConfig.theme.primary}
                    onChange={(e) => updateStyle('theme', 'primary', e.target.value)}
                    className="w-12 h-8 p-0"
                  />
                  <Input
                    value={styleConfig.theme.primary}
                    onChange={(e) => updateStyle('theme', 'primary', e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              <div>
                <Label>Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styleConfig.theme.secondary}
                    onChange={(e) => updateStyle('theme', 'secondary', e.target.value)}
                    className="w-12 h-8 p-0"
                  />
                  <Input
                    value={styleConfig.theme.secondary}
                    onChange={(e) => updateStyle('theme', 'secondary', e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              <div>
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styleConfig.theme.background}
                    onChange={(e) => updateStyle('theme', 'background', e.target.value)}
                    className="w-12 h-8 p-0"
                  />
                  <Input
                    value={styleConfig.theme.background}
                    onChange={(e) => updateStyle('theme', 'background', e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              <div>
                <Label>Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styleConfig.theme.text}
                    onChange={(e) => updateStyle('theme', 'text', e.target.value)}
                    className="w-12 h-8 p-0"
                  />
                  <Input
                    value={styleConfig.theme.text}
                    onChange={(e) => updateStyle('theme', 'text', e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Font Family</Label>
                <Input
                  value={styleConfig.typography.fontFamily}
                  onChange={(e) => updateStyle('typography', 'fontFamily', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Base Size</Label>
                  <Input
                    value={styleConfig.typography.fontSize.base}
                    onChange={(e) => updateStyle('typography', 'fontSize.base', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Heading Size</Label>
                  <Input
                    value={styleConfig.typography.fontSize.heading}
                    onChange={(e) => updateStyle('typography', 'fontSize.heading', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Small Size</Label>
                  <Input
                    value={styleConfig.typography.fontSize.small}
                    onChange={(e) => updateStyle('typography', 'fontSize.small', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Normal Weight</Label>
                  <Input
                    type="number"
                    min="100"
                    max="900"
                    step="100"
                    value={styleConfig.typography.fontWeight.normal}
                    onChange={(e) => updateStyle('typography', 'fontWeight.normal', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Medium Weight</Label>
                  <Input
                    type="number"
                    min="100"
                    max="900"
                    step="100"
                    value={styleConfig.typography.fontWeight.medium}
                    onChange={(e) => updateStyle('typography', 'fontWeight.medium', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Bold Weight</Label>
                  <Input
                    type="number"
                    min="100"
                    max="900"
                    step="100"
                    value={styleConfig.typography.fontWeight.bold}
                    onChange={(e) => updateStyle('typography', 'fontWeight.bold', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Spacing Tab */}
          <TabsContent value="spacing" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Base Unit</Label>
                <Input
                  value={styleConfig.spacing.unit}
                  onChange={(e) => updateStyle('spacing', 'unit', e.target.value)}
                />
              </div>
              <div>
                <Label>Container Padding</Label>
                <Input
                  value={styleConfig.spacing.container}
                  onChange={(e) => updateStyle('spacing', 'container', e.target.value)}
                />
              </div>
              <div>
                <Label>Item Spacing</Label>
                <Input
                  value={styleConfig.spacing.item}
                  onChange={(e) => updateStyle('spacing', 'item', e.target.value)}
                />
              </div>
              <div>
                <Label>Gap</Label>
                <Input
                  value={styleConfig.spacing.gap}
                  onChange={(e) => updateStyle('spacing', 'gap', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          {/* Borders Tab */}
          <TabsContent value="borders" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Border Radius</Label>
                <Input
                  value={styleConfig.borders.radius}
                  onChange={(e) => updateStyle('borders', 'radius', e.target.value)}
                />
              </div>
              <div>
                <Label>Border Width</Label>
                <Input
                  value={styleConfig.borders.width}
                  onChange={(e) => updateStyle('borders', 'width', e.target.value)}
                />
              </div>
              <div>
                <Label>Border Style</Label>
                <select
                  className="w-full h-10 px-3 rounded-md border"
                  value={styleConfig.borders.style}
                  onChange={(e) => updateStyle('borders', 'style', e.target.value)}
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>
              <div>
                <Label>Border Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styleConfig.borders.color}
                    onChange={(e) => updateStyle('borders', 'color', e.target.value)}
                    className="w-12 h-8 p-0"
                  />
                  <Input
                    value={styleConfig.borders.color}
                    onChange={(e) => updateStyle('borders', 'color', e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Effects Tab */}
          <TabsContent value="effects" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enable Shadow</Label>
                <Switch
                  checked={styleConfig.effects.shadow}
                  onCheckedChange={(checked) => updateStyle('effects', 'shadow', checked)}
                />
              </div>
              {styleConfig.effects.shadow && (
                <>
                  <div>
                    <Label>Shadow Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={styleConfig.effects.shadowColor}
                        onChange={(e) => updateStyle('effects', 'shadowColor', e.target.value)}
                        className="w-12 h-8 p-0"
                      />
                      <Input
                        value={styleConfig.effects.shadowColor}
                        onChange={(e) => updateStyle('effects', 'shadowColor', e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Shadow Size</Label>
                    <Input
                      value={styleConfig.effects.shadowSize}
                      onChange={(e) => updateStyle('effects', 'shadowSize', e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="flex items-center justify-between">
                <Label>Enable Transitions</Label>
                <Switch
                  checked={styleConfig.effects.transition}
                  onCheckedChange={(checked) => updateStyle('effects', 'transition', checked)}
                />
              </div>
              {styleConfig.effects.transition && (
                <div>
                  <Label>Transition Duration</Label>
                  <Input
                    value={styleConfig.effects.transitionDuration}
                    onChange={(e) => updateStyle('effects', 'transitionDuration', e.target.value)}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          {/* Responsive Tab */}
          <TabsContent value="responsive" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tablet Breakpoint</Label>
                  <Input
                    value={styleConfig.responsive.breakpoints.tablet}
                    onChange={(e) => updateStyle('responsive', 'breakpoints.tablet', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Mobile Breakpoint</Label>
                  <Input
                    value={styleConfig.responsive.breakpoints.mobile}
                    onChange={(e) => updateStyle('responsive', 'breakpoints.mobile', e.target.value)}
                  />
                </div>
              </div>

              {/* Adaptive Features */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Adaptive Typography</Label>
                    <p className="text-sm text-gray-500">Automatically adjust font sizes for different devices</p>
                  </div>
                  <Switch
                    checked={styleConfig.responsive.adaptiveTypography}
                    onCheckedChange={(checked) => updateStyle('responsive', 'adaptiveTypography', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Adaptive Spacing</Label>
                    <p className="text-sm text-gray-500">Automatically adjust spacing for different devices</p>
                  </div>
                  <Switch
                    checked={styleConfig.responsive.adaptiveSpacing}
                    onCheckedChange={(checked) => updateStyle('responsive', 'adaptiveSpacing', checked)}
                  />
                </div>
              </div>

              {/* Device Preview Settings */}
              <div className="space-y-4 mt-6">
                <h3 className="text-sm font-medium">Device-Specific Styles</h3>
                <div className="grid grid-cols-3 gap-4">
                  {['desktop', 'tablet', 'mobile'].map((device) => (
                    <Card key={device} className={`p-4 ${activeDevice === device ? 'border-2 border-primary' : ''}`}>
                      <div className="flex flex-col items-center gap-2">
                        {device === 'desktop' && <Monitor className="w-6 h-6" />}
                        {device === 'tablet' && <Tablet className="w-6 h-6" />}
                        {device === 'mobile' && <Smartphone className="w-6 h-6" />}
                        <span className="text-sm font-medium capitalize">{device}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Custom Media Queries */}
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Custom Media Queries</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Query
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <Input
                      placeholder="min-width: 768px"
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Preview Section */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-sm font-medium mb-4">Style Preview</h3>
          <div className="bg-gray-100 rounded-lg p-4">
            <div
              className="preview-box p-4 rounded"
              style={{
                backgroundColor: styleConfig.theme.background,
                color: styleConfig.theme.text,
                fontFamily: styleConfig.typography.fontFamily,
                borderRadius: styleConfig.borders.radius,
                borderWidth: styleConfig.borders.width,
                borderStyle: styleConfig.borders.style,
                borderColor: styleConfig.borders.color,
                boxShadow: styleConfig.effects.shadow ? `0 0 ${styleConfig.effects.shadowSize} ${styleConfig.effects.shadowColor}` : 'none',
                transition: styleConfig.effects.transition ? `all ${styleConfig.effects.transitionDuration}` : 'none'
              }}
            >
              <h4
                style={{
                  fontSize: styleConfig.typography.fontSize.heading,
                  fontWeight: styleConfig.typography.fontWeight.bold
                }}
              >
                Preview Heading
              </h4>
              <p
                style={{
                  fontSize: styleConfig.typography.fontSize.base,
                  fontWeight: styleConfig.typography.fontWeight.normal,
                  marginTop: styleConfig.spacing.unit
                }}
              >
                This is a preview of how your styles will look. The text and spacing will adjust based on your configuration.
              </p>
              <div
                style={{
                  marginTop: styleConfig.spacing.container,
                  padding: styleConfig.spacing.item,
                  backgroundColor: styleConfig.theme.primary,
                  color: '#fff',
                  borderRadius: styleConfig.borders.radius,
                  fontWeight: styleConfig.typography.fontWeight.medium
                }}
              >
                Sample Button
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex gap-4">
          <Button variant="outline" className="flex-1">
            Reset to Defaults
          </Button>
          <Button variant="default" className="flex-1">
            Apply Styles
          </Button>
        </div>

        {/* CSS Output */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Generated CSS</h3>
            <Button variant="ghost" size="sm">
              Copy CSS
            </Button>
          </div>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
            {`
.layout-container {
  background-color: ${styleConfig.theme.background};
  color: ${styleConfig.theme.text};
  font-family: ${styleConfig.typography.fontFamily};
  padding: ${styleConfig.spacing.container};
}

.layout-item {
  border-radius: ${styleConfig.borders.radius};
  border: ${styleConfig.borders.width} ${styleConfig.borders.style} ${styleConfig.borders.color};
  ${styleConfig.effects.shadow ? `box-shadow: 0 0 ${styleConfig.effects.shadowSize} ${styleConfig.effects.shadowColor};` : ''}
  ${styleConfig.effects.transition ? `transition: all ${styleConfig.effects.transitionDuration};` : ''}
}

@media (max-width: ${styleConfig.responsive.breakpoints.tablet}) {
  .layout-container {
    padding: calc(${styleConfig.spacing.container} * 0.75);
  }
}

@media (max-width: ${styleConfig.responsive.breakpoints.mobile}) {
  .layout-container {
    padding: calc(${styleConfig.spacing.container} * 0.5);
  }
}
            `.trim()}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleConfigurator;