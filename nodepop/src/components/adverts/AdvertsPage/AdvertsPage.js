import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Page from '../../layout/Page';
import Button from '../../common/Button';
import Advert from './Advert';
import { getLatestAdverts } from '../service';

import './AdvertsPage.css';
import styles from './AdvertsPage.module.css';

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>Be the first advert!</p>
    <Button as={Link} to="/adverts/new" variant="primary">
      Advert
    </Button>
  </div>
);

const useAdverts = () => {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    // getLatestTweets().then(tweets => setTweets(tweets));
    const execute = async () => {
      const adverts = await getLatestAdverts();
      setAdverts(adverts);
    };
    execute();

    return () => {};
  }, []);

  return adverts;
};

const AdvertsPage = () => {
  const adverts = useAdverts();

  return (
    <Page title="What's going on...">
      <div className={styles.advertsPage}>
        {adverts.length ? (
          <ul>
            {adverts.map(advert => (
              <li key={advert.id}>
                <Link to={`/adverts/${advert.id}`}>
                  <Advert {...advert} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
};

export default AdvertsPage;
