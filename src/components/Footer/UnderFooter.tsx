import { useTranslation } from 'react-i18next';

const UnderFooter = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="border-t-2 px-5 py-4 text-center md:py-5">
        <p className="text-base ">
          {t('footer:allRightsReserved.created')}{' '}
          <a
            href="https://baza-trainee.tech/ua"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            {t('footer:allRightsReserved.baza')}
          </a>{' '}
          {t('footer:allRightsReserved.rights')}
        </p>
      </div>
    </div>
  );
};

export default UnderFooter;
