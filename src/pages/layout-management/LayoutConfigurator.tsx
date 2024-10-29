// components/layout/LayoutConfigurator.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MonitorSmartphone } from 'lucide-react';

interface GridConfig {
  desktop: { columns: number; rows: number };
  tablet: { columns: number; rows: number };
  mobile: { columns: number; rows: number };
}

interface ListConfig {
  direction: 'vertical' | 'horizontal';
  spacing: number;
  maxItems: number;
  infiniteScroll: boolean;
}

interface CarouselConfig {
  autoPlay: boolean;
  interval: number;
  navigation: boolean;
  indicators: boolean;
  slidesPerView: {
    desktop: number;
    tablet: number;
    mobile: number;
  }
}

interface LayoutConfiguratorProps {
  layoutType: string;
  gridConfig: GridConfig;
  listConfig: ListConfig;
  carouselConfig: CarouselConfig;
  activeDevice: string;
  onGridConfigChange: (config: GridConfig) => void;
  onListConfigChange: (config: ListConfig) => void;
  onCarouselConfigChange: (config: CarouselConfig) => void;
  onDeviceChange: (device: string) => void;
}

export const LayoutConfigurator = ({
  layoutType,
  gridConfig,
  listConfig,
  carouselConfig,
  activeDevice,
  onGridConfigChange,
  onListConfigChange,
  onCarouselConfigChange,
  onDeviceChange
}: LayoutConfiguratorProps) => {
  // Helper function to update grid config for specific device
  const updateGridConfig = (device: 'desktop' | 'tablet' | 'mobile', field: 'columns' | 'rows', value: number) => {
    const newConfig = { ...gridConfig };
    newConfig[device][field] = value;
    onGridConfigChange(newConfig);
  };

  // Helper function to update carousel slides per view
  const updateSlidesPerView = (device: 'desktop' | 'tablet' | 'mobile', value: number) => {
    const newConfig = { ...carouselConfig };
    newConfig.slidesPerView[device] = value;
    onCarouselConfigChange(newConfig);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Layout Configuration</span>
          {/* Device Selector */}
          <div className="flex gap-2">
            {['desktop', 'tablet', 'mobile'].map(device => (
              <Button
                key={device}
                variant={activeDevice === device ? 'default' : 'outline'}
                size="sm"
                onClick={() => onDeviceChange(device)}
              >
                <MonitorSmartphone className="w-4 h-4 mr-2" />
                <span className="capitalize">{device}</span>
              </Button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Grid Layout Configuration */}
        {layoutType === 'grid' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-4">Grid Layout Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Columns</label>
                  <Input
                    type="number"
                    min={1}
                    max={12}
                    value={gridConfig[activeDevice].columns}
                    onChange={(e) => updateGridConfig(
                      activeDevice as 'desktop' | 'tablet' | 'mobile',
                      'columns',
                      parseInt(e.target.value)
                    )}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Rows</label>
                  <Input
                    type="number"
                    min={1}
                    max={12}
                    value={gridConfig[activeDevice].rows}
                    onChange={(e) => updateGridConfig(
                      activeDevice as 'desktop' | 'tablet' | 'mobile',
                      'rows',
                      parseInt(e.target.value)
                    )}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Gap Size</label>
              <Slider
                defaultValue={[16]}
                max={40}
                step={4}
                className="py-4"
              />
            </div>
          </div>
        )}

        {/* List Layout Configuration */}
        {layoutType === 'list' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-4">List Layout Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Direction</label>
                  <Select
                    value={listConfig.direction}
                    onValueChange={(value: 'vertical' | 'horizontal') =>
                      onListConfigChange({ ...listConfig, direction: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vertical">Vertical</SelectItem>
                      <SelectItem value="horizontal">Horizontal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Spacing</label>
                  <Slider
                    defaultValue={[listConfig.spacing]}
                    max={40}
                    step={4}
                    className="py-4"
                    onValueChange={([value]) =>
                      onListConfigChange({ ...listConfig, spacing: value })}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Maximum Items</label>
                  <Input
                    type="number"
                    min={1}
                    value={listConfig.maxItems}
                    onChange={(e) => onListConfigChange({
                      ...listConfig,
                      maxItems: parseInt(e.target.value)
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-500">Enable Infinite Scroll</label>
                  <Switch
                    checked={listConfig.infiniteScroll}
                    onCheckedChange={(checked) =>
                      onListConfigChange({ ...listConfig, infiniteScroll: checked })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Carousel Layout Configuration */}
        {layoutType === 'carousel' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-4">Carousel Layout Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-500">Auto Play</label>
                  <Switch
                    checked={carouselConfig.autoPlay}
                    onCheckedChange={(checked) =>
                      onCarouselConfigChange({ ...carouselConfig, autoPlay: checked })}
                  />
                </div>

                {carouselConfig.autoPlay && (
                  <div>
                    <label className="text-sm text-gray-500 mb-2 block">Interval (ms)</label>
                    <Input
                      type="number"
                      min={1000}
                      step={500}
                      value={carouselConfig.interval}
                      onChange={(e) => onCarouselConfigChange({
                        ...carouselConfig,
                        interval: parseInt(e.target.value)
                      })}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-500">Show Navigation</label>
                  <Switch
                    checked={carouselConfig.navigation}
                    onCheckedChange={(checked) =>
                      onCarouselConfigChange({ ...carouselConfig, navigation: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-500">Show Indicators</label>
                  <Switch
                    checked={carouselConfig.indicators}
                    onCheckedChange={(checked) =>
                      onCarouselConfigChange({ ...carouselConfig, indicators: checked })}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Slides Per View</label>
                  <div className="grid grid-cols-1 gap-4">
                    {['desktop', 'tablet', 'mobile'].map((device) => (
                      <div key={device} className={activeDevice === device ? '' : 'opacity-50'}>
                        <label className="text-xs text-gray-500 capitalize mb-1 block">{device}</label>
                        <Input
                          type="number"
                          min={1}
                          max={5}
                          value={carouselConfig.slidesPerView[device as keyof typeof carouselConfig.slidesPerView]}
                          onChange={(e) => updateSlidesPerView(
                            device as 'desktop' | 'tablet' | 'mobile',
                            parseInt(e.target.value)
                          )}
                          disabled={activeDevice !== device}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LayoutConfigurator;