export default {
  translation: {
    appName: 'Hexlet Chat',
    logOutButton: 'Выйти',
    errors: {
      required: 'Обязательное поле',
      diffPasswords: 'Пароли должны совпадать',
      length: 'От 3 до 20 символов',
      minLength: 'Не менее 6 символов',
      unauthorized: 'Неверные имя пользователя или пароль',
      existUser: 'Такой пользователь уже существует',
      existChannel: 'Канал с таким именем уже существует',
      networkError: 'Ошибка сети',
      authError: 'Ошибка авторизации',
      serverError: 'Ошибка сервера',
      unknownError: 'Неизвестная ошибка',
    },
    logInPage: {
      header: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      nullAccount: 'Нет аккаунта?',
      signUpLink: 'Регистрация',
    },
    signUpPage: {
      header: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
    },
    page404: {
      notFound: 'Страница не найдена',
      navigate: 'Но вы можете перейти',
      link: 'на главную страницу',
    },
    channels: {
      header: 'Каналы',
      channelControl: 'Управление каналом',
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    messages: {
      newMessage: 'Новое сообщение',
      messagesCount: {
        messages_one: '{{count}} сообщение',
        messages_few: '{{count}} сообщения',
        messages_many: '{{count}} сообщений',
      },
      messagesInput: 'Введите сообщение...',
      send: 'Отправить',
    },
    modals: {
      channelName: 'Имя канала',
      add: {
        header: 'Добавить канал',
        cancel: 'Отменить',
        submit: 'Подтвердить',
      },
      remove: {
        header: 'Удалить канал',
        warning: 'Уверены?',
        cancel: 'Отменить',
        submit: 'Удалить',
      },
      rename: {
        header: 'Переименовать канал',
        cancel: 'Отменить',
        submit: 'Подтвердить',
      },
    },
    toast: {
      add: 'Канал создан',
      remove: 'Канал удалён',
      rename: 'Канал переименован',
    },
  },
};
