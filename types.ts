
export enum Language {
  EN = 'en',
  AR = 'ar'
}

export interface NavItem {
  id: string;
  labelEn: string;
  labelAr: string;
  path: string;
}

export interface GalleryItem {
  url: string;
  captionEn?: string;
  captionAr?: string;
}

export interface Project {
  id: number;
  title: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string;
  category: string;
  // New details
  client?: string;
  year?: string;
  services?: string[];
  longDescriptionEn?: string;
  longDescriptionAr?: string;
  gallery?: GalleryItem[];
  liveUrl?: string;
}

export interface Service {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
}