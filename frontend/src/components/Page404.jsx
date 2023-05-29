import React from 'react';

const Page404 = ({ t }) => (
  <div className="text-center">
    <img src="page404.png" className="img-fluid h-25" alt={t('page404.notFound')} />
    <h1 className="h4 text-muted">{t('page404.notFound')}</h1>
    <p className="text-muted">
      {t('page404.navigate')}
      &nbsp;
      <a href="/">{t('page404.link')}</a>
    </p>
  </div>
);

export default Page404;
