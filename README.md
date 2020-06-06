# Проект News Explorer (Frontend)

## v0.0.5

Финальный проект Яндекс-Практикума(дипломная работа).
Проект должен показать чему научился студент на курсу Вэб-разработчик.
В данном проекте реализован Frontend проекта.
Бэкенд для этого проекта можно найти на следующем репозитории

## [Ссылка на проект front] (https://github.com/vadimobruchnikov/news-explorer-front)

## [Ссылка на проект back] (https://github.com/vadimobruchnikov/news-explorer-api)

В проекте были использованы следующие технологии:
*Front-End:* HTML5 + CSS + JS(ES6, REST API, AJAX, JSON, CORS) + Babel + Webpack + NPM
*Back-End:* VPS Linux + NodeJS + MongoDB + JS(ES6) + NPM + HTTPS(SSL Certificate)

Реализованы механизмы логирования запросов и их ответов, ошибок.
Реализована валидация данных непосредственно при вводе.

## Для развертывания проекта установите следующие пакеты:

Саму библиотеку подсистем *NPM*
Скачать ее можно с [официального сайта](https://nodejs.org/en/download/)

Установите npm-зависимости
>`npm install`

После установки NPM, будут установлены следующие пакеты:

[Babel CLI](https://babeljs.io/docs/en/babel-cli#docsNav)

[Babel Core](https://babeljs.io/docs/en/babel-core)

[Babel Preset Evnvironment](https://babeljs.io/docs/en/babel-preset-env#docsNav)

[Сore JS](https://github.com/zloirock/core-js#readme)

[PostCSS](https://postcss.org/)

[Define plugin](https://webpack.js.org/plugins/define-plugin/)

[Style loader](https://github.com/webpack-contrib/style-loader)

[Optimize CSS assets](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)

## После установки всех пакетов проделайте следующее

Склонируйте гит-репозиторий
>`git clone https://github.com/vadimobruchnikov/news-explorer-front.git`

Запустите сборку приложения
>`npm run build`

Запустите проект разработки на локальном сервере
>`npm run dev`

Можно задеплоить проект командой
>`npm run deploy`

Проект работает на большинстве разрешений экранов
(оптимизирован под 1440px, 720px, 535px, 320px)


# Информация для ревьювера

## [Ссылка на пул-реквест]
(https://github.com/vadimobruchnikov/news-explorer-front/pull/2)

## [Проект залит на]
(http://cloudsnews.ru)

## [Апи работает по адресу]
(http://api.cloudsnews.ru)

1) Пришлось переключиться на свой АПИ новостей, совместимый с NEWAPI.ORG, т.к. последний работал только на localhost.

2) Расскажите, пожалуйста, по-подробней, что должно передаваться в параметрах при создании BaseComponent?
Я так понимаю, что это массив из объектов в каждом у которого есть:

-элемент

-наименование события,

-и кол-бек функция, которая вешается на это событие

Так?
