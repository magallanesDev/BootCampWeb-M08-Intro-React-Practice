import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Page from '../../layout/Page';
import Button from '../../common/Button';
import Advert from './Advert';
import FormField from '../../common/FormField';
import { getLatestAdverts } from '../service';

import './AdvertsPage.css';

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>Be the first advert!</p>
    <Button as={Link} to="/adverts/new" variant="primary">
      Advert
    </Button>
  </div>
);

const AdvertsPage = () => {
  const [adverts, setAdverts] = useState([]);
  const [searchName, setSearchName] = useState('');

  const handleChange = event => {
    setSearchName(event.target.value);
    console.log(event.target.value);
  };

  const filteredAdverts = adverts.filter(advert => {
    if (advert.name.toLowerCase().includes(searchName.toLowerCase())) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const execute = async () => {
      const adverts = await getLatestAdverts();
      setAdverts(adverts);
    };
    execute();

    return () => {};
  }, [adverts, filteredAdverts]);

  return (
    <Page title="Adverts list">
      <div>
        {adverts.length ? (
          <div>
            <form className="loginForm">
              <FormField
                type="text"
                name="searchName"
                label="Filter by name"
                className="loginForm-field"
                value={searchName}
                onChange={handleChange}
              />
            </form>

            <ul>
              {filteredAdverts.map(advert => (
                <li key={advert.id}>
                  <Link to={`/adverts/${advert.id}`}>
                    <Advert {...advert} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
};

export default AdvertsPage;
