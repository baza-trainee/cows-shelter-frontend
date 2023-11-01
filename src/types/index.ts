export type PostRequest = {
  id: string;
  title: string;
  text: string;
};

export type GalleryItem = {
  id: string;
  url: string;
};

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
  imagesSrs: string[];

export type SupportCard = {
  title: string;
  subtitle: string;
  banner: string;
  image: string;
};
