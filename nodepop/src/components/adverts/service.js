import client from '../../api/client';

const advertsBaseUrl = '/api/v1/adverts';

export const getLatestAdverts = () => {
  const url = `${advertsBaseUrl}`;
  return client.get(url);
};

export const getAdvert = advertId => {
  const url = `${advertsBaseUrl}/${advertId}`;
  return client.get(url);
};

export const createAdvert = formData => {
  const url = advertsBaseUrl;
  return client.post(url, formData );
};

export const deleteAdvert = advertId => {
  const url = `${advertsBaseUrl}/${advertId}`;
  return client.delete(url);
};