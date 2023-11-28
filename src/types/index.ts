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
  nameEn: string;
  reviewEn: string;
};

export type ExcursionsData = {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  mainImgSrc: string;
  mainImgSrc_tablet: string;
  mainImgSrc_mobile: string;
  imagesSrs: string[];
  imagesSrs_tablet: string[];
  imagesSrs_mobile: string;
  timeFrom: string;
  timeTill: string;
  number_of_people: string;
  minutes: string;
  to: string;
  visitors: string;
};

export type SupportCard = {
  id: number;
  title: string;
  subtitle: string;
  banner: string;
  image: string;
};

export type PartnersData = {
  title: string;
  href: string;
  src: string;
};

export type PartnersFormInput = {
  title: string;
  link: string;
  image: File[];
  id?: string;
  image_id: string;
};
export type NewsFormInput = {
  titleUa: string;
  titleEn: string;
  subTitleUa: string;
  subTitleEn: string;
  contentUa: string;
  contentEn: string;
  image: File[];
  image_id: string;
};

export type ForgotPasswordProps = {
  email: string;
  closePopup: () => void;
};

export type FormValuesSignIn = {
  email: string;
  password: string;
};

export type FormValuesPassword = {
  email: any;
  password: string;
};

export type ForgotPassword = {
  email: string | null;
};

export type AboutData = {
  title: string;
  description: string[];
  mainImg: string;
};

export type ExcursionsFormInput = {
  titleUa: string;
  titleEn: string;
  descriptionUa: string;
  descriptionEn: string;
  image: File[];
  timeFrom: string;
  timeTill: string;
  visitorsNumber: string;
};

export type ReviewsFormInput = {
  nameUa: string;
  nameEn: string;
  reviewUa: string;
  reviewEn: string;
};

export type FormResetPassword = {
  token: string | undefined;
  password: string;
};

export type FormValueResetPassword = {
  password: string;
  confirmpassword: string;
};

export type PdfFormInput = {
  title: string;
  document: File[];
};
export type Contacts = {
  email?: string;
  phone?: string;
};

export type ContactsFormInput = {
  email?: string;
  phone?: string;
};
