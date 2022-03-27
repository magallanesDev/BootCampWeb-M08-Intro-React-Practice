import Page from '../../layout/Page';
import Button from '../../common/Button';
import FormField from '../../common/FormField';

import './NewAdvertPage.css';
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { createAdvert } from '../service';
import { Navigate, useNavigate } from 'react-router-dom';

const NewAdvertPage = () => {
  const ref = useRef(null);
  //const navigate = useNavigate();
  const [content, setContent] = useState({
    name: '',
    sale: '',
    tags: '',
    price: '',
    photo: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdAdvert, setCreatedAdvert] = useState(null);

  useEffect(() => {
    console.log(ref.current);
    ref.current.focus();
  }, []);

  const { name, sale, tags, price, photo } = content;

  const handleChange = useCallback(event => {
    setContent(content => ({
      ...content,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(document.querySelector('form'));
    console.log(formData);
    try {
      const advert = await createAdvert(formData);
      setCreatedAdvert(advert);
      // navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      setError(error);
    }
  };

  const buttonDisabled = useMemo(() => {
    return !name || !sale || !tags || !price || isLoading;
  }, [name, sale, tags, price, isLoading]);

  if (createdAdvert) {
    return <Navigate to={`/adverts/${createdAdvert.id}`} />;
  }

  if (error?.status === 401) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="Make your advert...">
      <div className="newAdvertPage bordered">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <FormField
              type="text"
              name="name"
              label="Name"
              className="loginForm-field"
              value={name}
              onChange={handleChange}
              ref={ref}
            />
            <FormField
              type="boolean"
              name="sale"
              label="Sale (true / false)"
              className="loginForm-field"
              value={sale}
              onChange={handleChange}
            />
            <FormField
              type="text"
              name="tags"
              label="Tags - lifestyle, mobile, motor, work - (one or more separated by commas)"
              className="loginForm-field"
              value={tags}
              onChange={handleChange}
            />
            <FormField
              type="number"
              name="price"
              label="Price €"
              className="loginForm-field"
              value={price}
              onChange={handleChange}
            />
            <FormField
              type="file"
              name="photo"
              label="Photo (optional)"
              className="loginForm-field"
              value={photo}
              onChange={handleChange}
            />

            <div className="newAdvertPage-footer">
              <Button
                type="submit"
                className="newAdvertPage-submit"
                variant="primary"
                disabled={buttonDisabled}
              >
                Let's go!
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default NewAdvertPage;
