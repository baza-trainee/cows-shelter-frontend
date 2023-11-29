export const formatDate = (dateString: string, lang: string) => {
  const inputDate = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const locale = lang === 'uk' ? 'uk-UK' : 'en-US';

  const formattedDate = inputDate.toLocaleString(locale, options);

  return formattedDate;
};
