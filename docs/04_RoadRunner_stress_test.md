# Нагрузочное тестирование приложения при использовании RoadRunner

## Настраиваем RoadRunner в соответствии с PHP-FPM
1. В файле [/.rr.yaml](../.rr.yaml) устанавливаем количество php процессов равным `4` (такое-же, как и у php-fpm).
    Для этого добавляем параметр `http.pool.num_workers`.
    Добавляем параметр `http.pool.max_jobs` чтобы php процессы перезапускались после обработки `1000` запросов
    ```yaml
    http:
      address: 0.0.0.0:8080
      pool:
        debug: false
        max_jobs: 1000
        num_workers: 4
   ```
2. В файле [/.rr.yaml](../.rr.yaml) отключаем логи входящих запросов.
    Для этого значение параметра `logs.channels.http.level` меняем с `debug` на `warn`
    ```yaml
    logs:
      mode: production
      channels:
        http:
          level: warn # Log all http requests, set to info to disable
        server:
          level: info # Everything written to worker stderr is logged
    ```
3. Для проверки изменений можно сравнить текущее состояние проекта с веткой `STEP-4`

## Запускаем тестирование RoadRunner
1. Заходим в терминал в корень проекта
2. Заходим в shell нашего php контейнера командой `make sh`
3. Запускаем RoadRunner командой `./rr serve -c ./.rr.yaml`
4. Заходим в другой терминал в корень проекта
5. Запускаем нагрузочное тестирование командой `make stress-rr`

## Просматриваем результаты теста в режиме реального времени
1. Открываем в браузере страницу http://127.0.0.1:8027/
2. После изучения информации закрываем страницу. Тестирование завершиться только после закрытия страницы

## Просматриваем результаты теста после
1. После завершения теста в корне проекта сохраняется результат в файле [/roadrunner.report.html](../roadrunner.report.html)
2. Файл [/roadrunner.report.html](../roadrunner.report.html) можно в любое время после теста открыть в браузере и ещё раз изучить
3. Пример файла с результатом - [/docs/example.roadrunner.report.html](./example.roadrunner.report.html)

[Далее >> Анализ результатов внедрения RoadRunner](./05_Analyze.md)
