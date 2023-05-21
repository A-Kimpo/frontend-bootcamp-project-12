import React from 'react';

const Page404 = () => (
  <div className="text-center">
    <img src="page404.png" className="img-fluid h-25" alt="Страница не найдена" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      &nbsp;
      <a href="/">на главную страницу</a>
    </p>
  </div>
);

export default Page404;
