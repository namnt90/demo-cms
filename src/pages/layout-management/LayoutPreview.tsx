// components/layout/LayoutPreview.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Monitor, Smartphone, Tablet, Move } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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

interface ContentSlot {
  id: string;
  name: string;
  acceptedTypes: ('image' | 'bundle' | 'custom')[];
  position: { x: number; y: number };
}

interface LayoutPreviewProps {
  layoutType: string;
  gridConfig: GridConfig;
  listConfig: ListConfig;
  carouselConfig: CarouselConfig;
  activeDevice: string;
  onDeviceChange: (device: string) => void;
  slots: ContentSlot[];
  styleConfig: any;
}

const DeviceFrame = ({ children, device }: { children: React.ReactNode; device: string }) => {
  const frames = {
    desktop: "w-full min-h-[500px] bg-white",
    tablet: "w-[768px] min-h-[400px] bg-white mx-auto",
    mobile: "w-[375px] min-h-[300px] bg-white mx-auto"
  };

  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm ${frames[device]}`}>
      {children}
    </div>
  );
};

const GridPreview = ({ config, device, slots, styleConfig }: {
  config: GridConfig;
  device: string;
  slots: ContentSlot[];
  styleConfig: any;
}) => {
  const { columns, rows } = config[device];
  const totalCells = columns * rows;

  return (
    <div
      className="grid gap-4 p-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, minmax(80px, auto))`,
        backgroundColor: styleConfig?.container?.background || '#ffffff',
        padding: styleConfig?.container?.padding || '16px'
      }}
    >
      {Array.from({ length: totalCells }).map((_, index) => {
        const slot = slots.find(s => s.position.x === (index % columns) && s.position.y === Math.floor(index / columns));

        return (
          <div
            key={index}
            className={`
              border-2 rounded-lg p-4 flex items-center justify-center
              ${slot ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'}
              transition-all duration-200 hover:border-blue-300
            `}
          >
            {slot ? (
              <div className="text-center">
                <p className="font-medium text-sm">{slot.name}</p>
                <p className="text-xs text-gray-500">{slot.acceptedTypes.join(', ')}</p>
              </div>
            ) : (
              <span className="text-gray-400 text-sm">Empty Cell</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ListPreview = ({ config, device, slots, styleConfig }: {
  config: ListConfig;
  device: string;
  slots: ContentSlot[];
  styleConfig: any;
}) => {
  return (
    <div className="p-4"
      style={{
        backgroundColor: styleConfig?.container?.background || '#ffffff',
        padding: styleConfig?.container?.padding || '16px'
      }}
    >
      <div
        className={`
          flex
          ${config.direction === 'vertical' ? 'flex-col' : 'flex-row'}
          gap-${config.spacing}
        `}
      >
        {Array.from({ length: Math.min(config.maxItems, 5) }).map((_, index) => {
          const slot = slots[index];

          return (
            <div
              key={index}
              className={`
                border-2 rounded-lg p-4
                ${slot ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'}
                ${config.direction === 'vertical' ? 'w-full' : 'flex-1'}
                min-h-[100px] flex items-center justify-center
              `}
            >
              {slot ? (
                <div className="text-center">
                  <p className="font-medium text-sm">{slot.name}</p>
                  <p className="text-xs text-gray-500">{slot.acceptedTypes.join(', ')}</p>
                </div>
              ) : (
                <span className="text-gray-400 text-sm">Empty Slot</span>
              )}
            </div>
          );
        })}
      </div>
      {config.infiniteScroll && (
        <div className="mt-4 text-center text-gray-400 text-sm">
          ↓ Infinite Scroll Enabled
        </div>
      )}
    </div>
  );
};

const CarouselPreview = ({ config, device, slots, styleConfig }: {
  config: CarouselConfig;
  device: string;
  slots: ContentSlot[];
  styleConfig: any;
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (config.autoPlay) {
      interval = setInterval(() => {
        setActiveSlide(prev =>
          prev === slots.length - 1 ? 0 : prev + 1
        );
      }, config.interval);
    }
    return () => clearInterval(interval);
  }, [config.autoPlay, config.interval, slots.length]);

  const slidesPerView = config.slidesPerView[device];

  return (
    <div className="p-4"
      style={{
        backgroundColor: styleConfig?.container?.background || '#ffffff',
        padding: styleConfig?.container?.padding || '16px'
      }}
    >
      <div className="relative">
        {/* Carousel Container */}
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: slidesPerView }).map((_, index) => {
            const slot = slots[index];
            return (
              <div
                key={index}
                className={`
                  flex-none
                  border-2 rounded-lg p-4
                  ${slot ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'}
                  min-h-[200px] flex items-center justify-center
                `}
                style={{ width: `${100 / slidesPerView}%` }}
              >
                {slot ? (
                  <div className="text-center">
                    <p className="font-medium text-sm">{slot.name}</p>
                    <p className="text-xs text-gray-500">{slot.acceptedTypes.join(', ')}</p>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Empty Slide</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        {config.navigation && (
          <>
            <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
              ←
            </button>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
              →
            </button>
          </>
        )}
      </div>

      {/* Indicators */}
      {config.indicators && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: slots.length || 3 }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === activeSlide ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const LayoutPreview = ({
  layoutType,
  gridConfig,
  listConfig,
  carouselConfig,
  activeDevice,
  onDeviceChange,
  slots,
  styleConfig
}: LayoutPreviewProps) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Layout Preview</CardTitle>
          <Select value={activeDevice} onValueChange={onDeviceChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desktop">
                <div className="flex items-center">
                  <Monitor className="w-4 h-4 mr-2" />
                  Desktop
                </div>
              </SelectItem>
              <SelectItem value="tablet">
                <div className="flex items-center">
                  <Tablet className="w-4 h-4 mr-2" />
                  Tablet
                </div>
              </SelectItem>
              <SelectItem value="mobile">
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <DeviceFrame device={activeDevice}>
          {layoutType === 'grid' && (
            <GridPreview
              config={gridConfig}
              device={activeDevice}
              slots={slots}
              styleConfig={styleConfig}
            />
          )}

          {layoutType === 'list' && (
            <ListPreview
              config={listConfig}
              device={activeDevice}
              slots={slots}
              styleConfig={styleConfig}
            />
          )}

          {layoutType === 'carousel' && (
            <CarouselPreview
              config={carouselConfig}
              device={activeDevice}
              slots={slots}
              styleConfig={styleConfig}
            />
          )}
        </DeviceFrame>

        {slots.length > 0 && (
          <div className="mt-4 px-4">
            <h4 className="text-sm font-medium mb-2">Content Slots</h4>
            <div className="flex flex-wrap gap-2">
              {slots.map(slot => (
                <div
                  key={slot.id}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
                >
                  {slot.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LayoutPreview;