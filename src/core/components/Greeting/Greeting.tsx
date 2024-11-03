import './Greeting.scss';
import { useTranslation } from "react-i18next";

const githubRepo = 'https://github.com/TheEletricboy/reactjs-demo-expandable-table';

// Unnecessary to put this in its own file imo, it's a simple greeting and it achieves its goal.
const Greeting = () => {
  const { t } = useTranslation();
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
    </section>
  );
};

export default Greeting;
