import { Fragment } from 'react';

function Page({ title, children }) {
  return (
    <Fragment>
      <h2 className="layout-title bordered">{title}</h2>
      <section className="layout-content">{children}</section>
    </Fragment>
  );
}

// <Fragment></Fragment>
// <></>

export default Page;
