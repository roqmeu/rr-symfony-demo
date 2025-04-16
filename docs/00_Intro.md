# Теория

## О проекте
Проект представляет собой сильно облегченный [symfony/demo](https://github.com/symfony/demo/tree/main) с тремя точками входа, а также скриптами нагрузочного тестирования для тестирования производительности.

Для работы потребуется Docker, Docker Compose и Make

Протестировано на MacOS Ventura 13.7.4, MacBook Pro M1 (linux/arm64)

## FAQ
- При использовании WSL под Windows может потребоваться `chmod -R 777 ./` всего проекта
- При переходе на ветку `STEP-5` или обратно нужно сделать `make rebuild && make reinstall`

## Рекомендуемая литература:
1. Изучение жизненного цикла PHP - https://www.phpinternalsbook.com/php7/extensions_design/php_lifecycle.html
2. Документация RoadRunner - https://docs.roadrunner.dev/docs
3. (статья) Управление памятью в PHP - https://habr.com/ru/articles/748352/
4. (статья) Подготовка приложения Symfony для Swoole, RoadRunner и FrankenPHP - https://dev.to/sergiid/getting-symfony-app-ready-for-swoole-roadrunner-and-frankenphp-no-ai-involved-2d0g

[Далее >> Инициализация приложения](./01_Initialize.md)
