// pages/LayoutCreate.tsx
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {Edit, Eye, Plus, Save} from 'lucide-react';
import {LayoutTypeSelector} from "@/pages/layout-management/LayoutTypeSelector.tsx";
import LayoutPreview from "@/pages/layout-management/LayoutPreview.tsx";
import StyleConfigurator from "@/pages/layout-management/StyleConfigurator.tsx";
import LayoutConfigurator from "@/pages/layout-management/LayoutConfigurator.tsx";
import {toast} from "@/hooks/use-toast.ts";
import {SlotDialog} from "@/pages/layout-management/SlotDialog.tsx";

// Types
interface ContentSlot {
  id: string;
  name: string;
  acceptedTypes: ('image' | 'bundle' | 'custom')[];
  position: { x: number; y: number };
}

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
  };
}

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

const LayoutCreate = () => {
  // Basic Layout State
  const [layoutType, setLayoutType] = useState('grid');
  const [layoutName, setLayoutName] = useState('');
  const [activeDevice, setActiveDevice] = useState('desktop');

  // Content Slots State
  const [slots, setSlots] = useState<ContentSlot[]>([]);
  const [showSlotDialog, setShowSlotDialog] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{x: number; y: number} | null>(null);
  const [editingSlot, setEditingSlot] = useState<ContentSlot | null>(null);

 const handleAddSlotFromList = () => {
    setEditingSlot(null);
    setSelectedPosition(null); // Will be selected in dialog
    setShowSlotDialog(true);
  };

  const handleEditSlotFromList = (slot: ContentSlot) => {
    setEditingSlot(slot);
    setSelectedPosition(slot.position);
    setShowSlotDialog(true);
  };

  const handleSaveSlot = (slotData: any) => {
    if (editingSlot) {
      // Update existing slot
      setSlots(slots.map(slot =>
        slot.id === editingSlot.id ? {
          ...slot,
          ...slotData,
          position: slotData.position || slot.position // Keep existing position if not provided
        } : slot
      ));
    } else {
      // Add new slot
      const newPosition = selectedPosition || {
        x: Math.floor(slots.length / gridConfig[activeDevice].rows),
        y: slots.length % gridConfig[activeDevice].rows
      };
      setSlots([...slots, {
        id: `slot-${Date.now()}`,
        ...slotData,
        position: newPosition
      }]);
    }
  };
  // Grid Configuration State
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    desktop: { columns: 4, rows: 3 },
    tablet: { columns: 2, rows: 4 },
    mobile: { columns: 1, rows: 6 }
  });

  // List Configuration State
  const [listConfig, setListConfig] = useState<ListConfig>({
    direction: 'vertical',
    spacing: 10,
    maxItems: 10,
    infiniteScroll: true
  });

  // Carousel Configuration State
  const [carouselConfig, setCarouselConfig] = useState<CarouselConfig>({
    autoPlay: true,
    interval: 3000,
    navigation: true,
    indicators: true,
    slidesPerView: {
      desktop: 3,
      tablet: 2,
      mobile: 1
    }
  });

  // Style Configuration State
  const [styleConfig, setStyleConfig] = useState<StyleConfig>({
    theme: {
      primary: '#007bff',
      secondary: '#6c757d',
      accent: '#28a745',
      background: '#ffffff',
      text: '#212529'
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      fontSize: {
        base: '16px',
        heading: '24px',
        small: '14px'
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700
      }
    },
    spacing: {
      unit: '8px',
      container: '24px',
      item: '16px',
      gap: '16px'
    },
    borders: {
      radius: '8px',
      width: '1px',
      style: 'solid',
      color: '#dee2e6'
    },
    effects: {
      shadow: true,
      shadowColor: 'rgba(0,0,0,0.1)',
      shadowSize: '10px',
      transition: true,
      transitionDuration: '0.3s'
    },
    responsive: {
      breakpoints: {
        tablet: '768px',
        mobile: '480px'
      },
      adaptiveTypography: true,
      adaptiveSpacing: true
    }
  });

  // Preview State
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Handle slot management


  // Handle layout saving
  const handleSaveLayout = async () => {
    try {
      const layoutData = {
        name: layoutName,
        type: layoutType,
        slots,
        config: {
          grid: gridConfig,
          list: listConfig,
          carousel: carouselConfig
        },
        style: styleConfig
      };

      // TODO: Implement API call to save layout
      console.log('Saving layout:', layoutData);

      toast({
        title: "Layout Saved",
        description: "Layout has been saved successfully."
      });
    } catch (error) {
      console.error('Error saving layout:', error);
      toast({
        title: "Error",
        description: "Failed to save layout. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-4">Create Layout</h1>
        <LayoutTypeSelector
          layoutType={layoutType}
          layoutName={layoutName}
          onTypeChange={setLayoutType}
          onNameChange={setLayoutName}
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-3 gap-6">
        {/* Layout Configuration Column */}
        <div className="space-y-6">
          <LayoutConfigurator
            layoutType={layoutType}
            gridConfig={gridConfig}
            listConfig={listConfig}
            carouselConfig={carouselConfig}
            activeDevice={activeDevice}
            onGridConfigChange={setGridConfig}
            onListConfigChange={setListConfig}
            onCarouselConfigChange={setCarouselConfig}
            onDeviceChange={setActiveDevice}
          />
        </div>

        {/* Preview Column */}
        <div>
          <LayoutPreview
            layoutType={layoutType}
            gridConfig={gridConfig}
            listConfig={listConfig}
            carouselConfig={carouselConfig}
            activeDevice={activeDevice}
            onDeviceChange={setActiveDevice}
            slots={slots}
            styleConfig={styleConfig}
          />
          <div className="mt-4 flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Exit Preview' : 'Preview'}
            </Button>
            <Button
              className="flex-1"
              onClick={handleSaveLayout}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Layout
            </Button>
          </div>
        </div>

        {/* Style Configuration Column */}
        <StyleConfigurator
          styleConfig={styleConfig}
          onStyleChange={setStyleConfig}
          activeDevice={activeDevice}
        />
      </div>

            {/* Content Slots Management */}
      <Card className="mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Content Slots</h2>
            <div className="flex gap-2">
              <Button
                variant="default"
                onClick={handleAddSlotFromList}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Slot
              </Button>
              <Button
                variant="outline"
                onClick={() => setSlots([])}
              >
                Clear All
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {slots.map(slot => (
              <Card key={slot.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{slot.name}</h3>
                    <p className="text-sm text-gray-500">
                      Position: ({slot.position.x}, {slot.position.y})
                    </p>
                    <p className="text-sm text-gray-500">
                      Types: {slot.acceptedTypes.join(', ')}
                    </p>
                    {slot.contentConfig && (
                      <div className="mt-2 text-sm text-gray-500">
                        {slot.acceptedTypes.includes('image') && (
                          <p>Image: {slot.contentConfig.imageConfig.aspectRatio}</p>
                        )}
                        {slot.acceptedTypes.includes('bundle') && (
                          <p>Bundle Fields: {slot.contentConfig.bundleConfig.displayFields.join(', ')}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditSlotFromList(slot)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSlot(slot.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      {/* Slot Dialog */}
      <SlotDialog
        open={showSlotDialog}
        onClose={() => {
          setShowSlotDialog(false);
          setSelectedPosition(null);
          setEditingSlot(null);
        }}
        onSave={handleSaveSlot}
        position={selectedPosition || undefined}
        editSlot={editingSlot || undefined}
        gridConfig={gridConfig[activeDevice]} // Pass grid config for position selection
      />
      {/* Toast for notifications */}
      {/* Provided by layout wrapper */}
    </div>
  );
};

export default LayoutCreate;