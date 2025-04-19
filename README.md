# Travalizer & Pokémon SPA

Минималистичное Vue 3‑приложение регистрацией/авторизацией через Firebase и каталогом покемонов из PokeAPI.

[**➡️ Посмотреть демо**](https://travalizer.vercel.app/)

## Стек технологий

- **Фреймворк**: Vue 3 + Vite (ESM, быстрый HMR)
- **UI**: PrimeVue + Tailwind CSS
- **Аутентификация**: Firebase Auth (Email/Password & Google OAuth)
- **Обмен данными**: axios, PokeAPI
- **Качество кода**: ESLint, Prettier

## Ключевые фичи

- **Регистрация и вход**: email/password + Google OAuth, JWT в localStorage
- **Защищённые маршруты**: Vue Router Guards + lazy‑loading компонентов
- **Каталог покемонов**: список с картинками, страница деталей
- **Авто‑рефреш токена**: axios‑интерсепторы обрабатывают 401 и обновляют токен
- **Компонентная архитектура**: reusable components, composables (useAuth), clear project structure

## Быстрый старт

```bash
yarn           # установить зависимости
yarn dev       # запустить в режиме разработки
yarn build     # собрать на продакшен
yarn preview   # локальный предпросмотр
```
