import { useCallback, useState, useEffect } from 'react';
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
  const [filters, setFilters] = useState({
    searchName: '',
    searchSale: '',
    searchTags: '',
    searchPrice: '',
});
  

  const { searchName, searchSale, searchTags, searchPrice} = filters;

  const handleChange = useCallback(event => {
    setFilters(filters => ({
      ...filters,
      [event.target.name] : event.target.value,
    }));
  }, []);

  
  
  const filteredAdverts = adverts.filter(advert => {
    
    if (
      (advert.name.toLowerCase().includes(searchName.toLowerCase()))  &&
      (String(advert.sale).toLowerCase().includes(searchSale.toLowerCase())) &&
      (String(advert.tags).toLowerCase().includes(searchTags.toLowerCase())) &&
      (String(advert.price).includes(searchPrice))
    ) { 
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
              <FormField
                type="text"
                name="searchSale"
                label="Filter by sale"
                className="loginForm-field"
                value={searchSale}
                onChange={handleChange}
              />
              <FormField
                type="text"
                name="searchTags"
                label="Filter by tags"
                className="loginForm-field"
                value={searchTags}
                onChange={handleChange}
              />
              <FormField
                type="number"
                name="searchPrice"
                label="Filter by price"
                className="loginForm-field"
                value={searchPrice}
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
