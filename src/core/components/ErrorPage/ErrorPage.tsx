import './ErrorPage.scss';
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Button from "../GenericButton/Button";
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const { t } = useTranslation();
  const navigate  = useNavigate();
  const handleBackHome = useCallback(() => {
    navigate(-1); // Goes back one step :)
  }, [navigate]);

  return (
    <div id="error-page">
      <h1>{t('error.routes-header')}</h1>
      <p>{t('error.routes-text')}</p>
      <Button
        className='go-back-btn'
        label={t('error.go-back')}
        title={t('error.go-back')}
        onClick={handleBackHome}
        isInverse/>
    </div>
  );
};

export default memo(ErrorPage);
