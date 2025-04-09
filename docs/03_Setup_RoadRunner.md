# Установка RoadRunner

## Устанавливаем необходимые PHP расширения
1. Заходим в терминал в корень проекта
2. Очищаем контейнер от результатов предыдущего теста командой `make reup`
3. Заходим в shell нашего php контейнера командой `make sh`
4. Устанавливаем расширение `sockets` командой `docker-php-ext-install sockets`

## Устанавливаем composer пакеты
1. Проверяем, что мы в shell php контейнера
2. Устанавливаем composer пакет [baldinof/roadrunner-bundle](https://github.com/Baldinof/roadrunner-bundle) командой `composer require "baldinof/roadrunner-bundle:^3.2"`
3. Проверяем, что после установки бандл добавился в [/config/bundles.php](../config/bundles.php) и добавилась его конфигурация в [/config/packages/baldinof_road_runner.yaml](../config/packages/baldinof_road_runner.yaml)
4. Проверяем, что в корне проекта добавилась стандартная конфигурация RoadRunner в файле [/.rr.yaml](../.rr.yaml)
5. Устанавливаем composer пакет [spiral/roadrunner-cli](https://github.com/roadrunner-php/cli) командой `composer require "spiral/roadrunner-cli:^2.6"`
6. Очищаем Symfony кеш после изменения списка пакетов командой `bin/console c:c`

# Устанавливаем RoadRunner
1. Проверяем, что мы в shell php контейнера
2. Скачиваем исполняемый файл RoadRunner командой `./vendor/bin/rr get-binary`
3. Проверяем, что в корне проекта добавился исполняемый файл [/rr](../rr)
4. Добавляем прав на запуск исполняемому файлу командой `chmod +x ./rr`
5. Выходим из контейнера командой `exit`
6. Для проверки изменений можно сравнить текущее состояние проекта с веткой `STEP-3`
