// types/layout.ts
export interface LayoutBaseConfig {
  id?: string;
  name: string;
  type: 'grid' | 'list' | 'carousel';
}

export interface GridConfig {
  desktop: { columns: number; rows: number };
  tablet: { columns: number; rows: number };
  mobile: { columns: number; rows: number };
}

export interface ListConfig {
  direction: 'vertical' | 'horizontal';
  spacing: number;
  maxItems: number;
  infiniteScroll: boolean;
}

export interface CarouselConfig {
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

export interface StyleConfig {
  theme: {
    primary: string;
    spacing: string;
    borderRadius: string;
  };
  container: {
    padding: string;
    background: string;
  }
}

export interface ContentSlot {
  id: string;
  name: string;
  acceptedTypes: ('image' | 'bundle' | 'custom')[];
  position: { x: number; y: number };
}