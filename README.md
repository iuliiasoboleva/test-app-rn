# TestApp

React Native приложение. Поддерживает:

- 🌙 Переключение светлой/тёмной темы
- 🌍 Переключение языка (русский/английский)
- 🧾 Список GitHub-репозиториев:
  - Поиск по названию
  - Пагинация
  - Pull-to-refresh
  - Детальный просмотр элемента
- 🔔 Локальные уведомления через Notifee
- ⚙️ Экран настроек: смена языка, темы, выход
- 🔐 Авторизация с сохранением состояния в AsyncStorage
- 🧭 Навигация через `@react-navigation`
- 🎨 Иконки табов через `react-native-vector-icons`
- 🔤 Подключены переводы через `i18next`
- 🖋 Кастомный шрифт (если подключен)

---

## 🚀 Запуск

```bash
npm install
npx react-native run-android
```

---

## 🔐 Авторизация

На экране входа нажмите **"Войти"** (без валидации). Приложение сохранит флаг авторизации и перенаправит в основную навигацию.

---

## 🧩 Библиотеки

- [`@notifee/react-native`](https://notifee.app/react-native/docs/overview) — уведомления
- [`react-native-vector-icons`](https://github.com/oblador/react-native-vector-icons)
- [`react-i18next`](https://react.i18next.com/) — переводы
- [`@react-navigation`](https://reactnavigation.org/)
- [`redux-toolkit`, `react-redux`]
- [`@react-native-async-storage/async-storage`]

---

## Скриншоты

### Авторизация
<img src="./assets/images/screenshots/screen1.jpg" alt="Авторизация" width="300" />

### Список элементов
<img src="./assets/images/screenshots/screen2.jpg" alt="Список элементов" width="300" />

### Элемент
<img src="./assets/images/screenshots/screen3.jpg" alt="Элемент" width="300" />

### Настройки
<img src="./assets/images/screenshots/screen4.jpg" alt="Настройки" width="300" />

### Темная тема и поиск
<img src="./assets/images/screenshots/screen5.jpg" alt="Темная тема и поиск" width="300" />

---

## 🧑‍💻 Автор

Логин для входа: `admin`  
Пароль: `1234`