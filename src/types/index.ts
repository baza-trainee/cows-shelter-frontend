export type PostRequest = {
  id: string;
  title: string;
  text: string;
};

export type GalleryItem = {
  id: string;
  url: string;
};

export type NewsData = {
  title: string;
  description: string;
  url: string;
  date: string;
  text: string;
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
  mainImgSrc_tablet: string;
  mainImgSrc_mobile: string;
  imagesSrs: string[];
  imagesSrs_tablet: string[];
  imagesSrs_mobile: string;
};

export type SupportCard = {
  id: number;
  title: string;
  subtitle: string;
  banner: string;
  image: string;
};

export type PartnersType = {
  title: string;
  href: string;
  src: string;
};

export type NewsFormInput = {
  titleUa: string;
  titleEn: string;
  contentUa: string;
  contentEn: string;
  image: File[];
};

export type PartnersFormInput = {
  title: string;
  href: string;
  image: File[];
};
