FROM php:8.3.19-fpm-bookworm

LABEL "org.opencontainers.image.source"="https://github.com/roqmeu/symfony-roadrunner-workshop-2025-04"

USER root

RUN apt-get update; \
    apt-get install -y --no-install-recommends \
        procps \
        libicu-dev \
        librabbitmq-dev \
        libyaml-dev \
        libzip-dev \
    ; \
    pecl install amqp redis yaml zip 1>/dev/null; \
    docker-php-ext-install intl; \
    docker-php-ext-enable amqp opcache redis yaml zip; \
    rm -rf /var/lib/apt/lists/* /var/log/* /var/cache/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --version=2.8.8

COPY ./deploy/php/common.fpm.conf /usr/local/etc/php-fpm.d/zzz-common.conf
COPY ./deploy/php/common.php.ini /usr/local/etc/php/conf.d/zzz-common.ini

RUN mkdir -p /var/www/tmpfs-cache; \
    pecl install protobuf; \
    docker-php-ext-enable protobuf; \
    docker-php-ext-install sockets

RUN mv $PHP_INI_DIR/php.ini-production $PHP_INI_DIR/php.ini

USER www-data
