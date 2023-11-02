export type PostRequest = {
  id: string;
  title: string;
  text: string;
};

export type GalleryItem = {
  id: string;
  url: string;
};

export interface NewsData {
  title: string;
  description: string;
  url: string;
  date: string;
}
