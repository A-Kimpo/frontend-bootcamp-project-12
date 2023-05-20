import React from 'react';

const SignUpPage = () => (
  <div class="container-fluid h-100">
    <div class="row justify-content-center align-content-center h-100">
      <div class="col-12 col-md-8 col-xxl-6">
        <div class="card shadow-sm">
          <div class="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src="signUpImage.jpg" class="rounded-circle" alt="Регистрация" />
            </div>
            <form class="w-50">
              <h1 class="text-center mb-4">Регистрация</h1>
              <div class="form-floating mb-3">
                <input
                  placeholder="От 3 до 20 символов"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  required
                  id="username"
                  class="form-control"
                />
                <label class="form-label" htmlFor="username">Имя пользователя</label>
                <div placement="right" class="invalid-tooltip">Обязательное поле</div>
              </div>
              <div class="form-floating mb-3">
                <input
                  placeholder="Не менее 6 символов"
                  name="password"
                  aria-describedby="passwordHelpBlock"
                  required
                  autoComplete="new-password"
                  type="password"
                  id="password"
                  class="form-control"
                />
                <div class="invalid-tooltip">Обязательное поле</div>
                <label class="form-label" htmlFor="password">Пароль</label>
              </div>
              <div class="form-floating mb-4">
                <input
                  placeholder="Пароли должны совпадать"
                  name="confirmPassword"
                  required
                  autoComplete="new-password"
                  type="password"
                  id="confirmPassword"
                  class="form-control"
                />
                <div class="invalid-tooltip" />
                <label class="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
              </div>
              <button type="submit" class="w-100 btn btn-outline-primary">Зарегистрироваться</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignUpPage;
