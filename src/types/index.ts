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
  text: string;
}
export type Reviews = {
  id: string;
  name: string;
  review: string;
};

export type ExcursionsData = {
  id: string;
  title: string;
  description: string;
  mainImgSrc: string;
  mainImgSrc_tablet: string;
  imagesSrs: string[];
  imagesSrs_tablet: string[];
};

export type SupportCard = {
  title: string;
  subtitle: string;
  banner: string;
  image: string;
};
