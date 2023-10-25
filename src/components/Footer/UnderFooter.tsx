import { useTranslation } from 'react-i18next';

const UnderFooter = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="border-t-2 py-5 text-center">
        <p className="default-text">
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
