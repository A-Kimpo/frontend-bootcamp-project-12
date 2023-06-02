import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes from '../routes';

const Page404 = ({ t }) => (
  <div className="text-center">
    <Image src="page404.png" className="img-fluid h-25" alt={t('page404.notFound')} />
    <h1 className="h4 text-muted">{t('page404.notFound')}</h1>
    <p className="text-muted">
      {t('page404.navigate')}
      &nbsp;
      <Link href={routes.mainPage()}>{t('page404.link')}</Link>
    </p>
  </div>
);

export default Page404;
