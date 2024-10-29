import {TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import {useState} from "react";
import {Tabs, TabsContent} from "@/components/ui/tabs.tsx";
import {ImageIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Switch} from "@radix-ui/react-switch";
import {Label} from "@/components/ui/label.tsx";

const ImageContentConfig = () => {
  const [imageContent, setImageContent] = useState({
    imageUrl: '',
    altText: '',
    dimensions: { width: 0, height: 0 },
    optimization: {
      format: 'original',
      quality: 80,
      responsive: {
        mobile: { width: 320 },
        tablet: { width: 768 },
        desktop: { width: 1200 }
      }
    }
  });

  const [previewUrl, setPreviewUrl] = useState('');
  const [activeTab, setActiveTab] = useState('upload');

  const handleImageUpload = (file: File) => {
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Get image dimensions
    const img = new Image();
    img.onload = () => {
      setImageContent({
        ...imageContent,
        imageUrl: url,
        dimensions: {
          width: img.width,
          height: img.height
        }
      });
    };
    img.src = url;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center"
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            {!previewUrl ? (
              <>
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Drag and drop your image here, or click to browse
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports: JPG, PNG, WebP up to 5MB
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    Browse Files
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="relative group">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPreviewUrl('');
                      setImageContent({
                        ...imageContent,
                        imageUrl: '',
                        dimensions: { width: 0, height: 0 }
                      });
                    }}
                  >
                    Change Image
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">Or use image URL</label>
            <div className="flex gap-2">
              <Input
                placeholder="https://"
                value={imageContent.imageUrl}
                onChange={e => setImageContent({
                  ...imageContent,
                  imageUrl: e.target.value
                })}
                className="flex-1"
              />
              <Button variant="outline">Load</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Alt Text</label>
              <Input
                placeholder="Describe the image"
                value={imageContent.altText}
                onChange={e => setImageContent({
                  ...imageContent,
                  altText: e.target.value
                })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Width</label>
                <Input
                  type="number"
                  value={imageContent.dimensions.width}
                  onChange={e => setImageContent({
                    ...imageContent,
                    dimensions: {
                      ...imageContent.dimensions,
                      width: parseInt(e.target.value)
                    }
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Height</label>
                <Input
                  type="number"
                  value={imageContent.dimensions.height}
                  onChange={e => setImageContent({
                    ...imageContent,
                    dimensions: {
                      ...imageContent.dimensions,
                      height: parseInt(e.target.value)
                    }
                  })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Aspect Ratio</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">Original</SelectItem>
                  <SelectItem value="16:9">16:9</SelectItem>
                  <SelectItem value="4:3">4:3</SelectItem>
                  <SelectItem value="1:1">1:1</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="optimization">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Output Format</label>
              <Select
                value={imageContent.optimization.format}
                onValueChange={format => setImageContent({
                  ...imageContent,
                  optimization: {
                    ...imageContent.optimization,
                    format
                  }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">Original</SelectItem>
                  <SelectItem value="jpg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Quality ({imageContent.optimization.quality}%)
              </label>
              <div className="space-y-2">
                <Input
                  type="range"
                  min="1"
                  max="100"
                  value={imageContent.optimization.quality}
                  onChange={e => setImageContent({
                    ...imageContent,
                    optimization: {
                      ...imageContent.optimization,
                      quality: parseInt(e.target.value)
                    }
                  })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Lower quality, smaller size</span>
                  <span>Best quality</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Responsive Versions
              </label>
              <div className="space-y-3">
                {Object.entries(imageContent.optimization.responsive).map(([device, config]) => (
                  <div key={device} className="flex items-center gap-4">
                    <Switch
                      id={`responsive-${device}`}
                      checked={!!config.width}
                    />
                    <Label htmlFor={`responsive-${device}`} className="capitalize flex-1">
                      {device}
                    </Label>
                    <Input
                      type="number"
                      placeholder="Width"
                      value={config.width}
                      onChange={e => setImageContent({
                        ...imageContent,
                        optimization: {
                          ...imageContent.optimization,
                          responsive: {
                            ...imageContent.optimization.responsive,
                            [device]: { width: parseInt(e.target.value) }
                          }
                        }
                      })}
                      className="w-24"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Size Estimation</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Original Size:</span>
                  <span>2.4 MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Optimized Size:</span>
                  <span className="text-green-600">820 KB</span>
                </div>
                <div className="flex justify-between">
                  <span>Saving:</span>
                  <span className="text-green-600">66%</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          {previewUrl && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <Select defaultValue="desktop">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Preview size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full"
                  style={{
                    maxHeight: '400px',
                    objectFit: 'contain'
                  }}
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Image Information</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Dimensions:</span>
                    <span>{imageContent.dimensions.width} x {imageContent.dimensions.height}px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span>{imageContent.optimization.format.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality:</span>
                    <span>{imageContent.optimization.quality}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageContentConfig