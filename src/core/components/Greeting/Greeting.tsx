import './Greeting.scss';
import { useCallback } from 'react';
import { useOverlay } from '../../contexts/OverlayContext';
import { useTranslation } from "react-i18next";
import Button from '../GenericButton/Button';
import { useNavigate } from 'react-router-dom';

const githubRepo = 'https://github.com/TheEletricboy/reactjs-demo-expandable-table';
const startOverlayId = "start-overlay";

const Greeting = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addOverlay } = useOverlay();
  const lblStartAssignment = t('homepage.start-assignment');

  const openOverlay = useCallback(() => {
    addOverlay({
      id: startOverlayId,
      content: (removeOverlay) => (
        <>
          <p>{t('homepage.start-assignment-intro')}</p>
          <Button label={t('homepage.start-assignment-intro-btn')} onClick={() => {
            removeOverlay();
            navigate('/table/randomTableName-0');
          }} />
        </>
      ),
      isVisible: true,
      type: "modal",
      label: lblStartAssignment,
    });
  }, [addOverlay, navigate, t, lblStartAssignment]);

  return (
    <section className='greeting'>
      <h1>
        {t('homepage.greeting')}
        <span className='developer-name'>{t('homepage.greeting-developer')}</span>
      </h1>
      <h3>
        <p>{t('homepage.greeting-description-1')}</p>
        <p>{t('homepage.greeting-description-2')}</p>
        <p>
          <span className='github-link'>
            {'>'}<a href={githubRepo} target="_blank">reactjs-demo-expandable-table</a>
          </span>
        </p>
      </h3>
      <Button title='Begin the demo' label={lblStartAssignment} onClick={openOverlay} />
    </section>
  );
};

export default Greeting;
