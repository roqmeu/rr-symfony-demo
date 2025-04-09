DOCKER?=docker
DOCKER_COMPOSE?=docker compose

build:
	$(DOCKER_COMPOSE) build

rebuild:
	$(DOCKER_COMPOSE) rm -vsf ;\
	$(DOCKER_COMPOSE) down -v --remove-orphans ;\
	make build ;\
	make up

up:
	$(DOCKER_COMPOSE) up -d

reup:
	$(DOCKER_COMPOSE) rm -vsf ;\
	$(DOCKER_COMPOSE) down -v --remove-orphans ;\
	make up

sh:
	$(DOCKER_COMPOSE) exec -it php bash

init:
	$(DOCKER_COMPOSE) exec php bash -c "composer install"
	$(DOCKER_COMPOSE) exec php bash -c "bin/console c:c"

prepare:
	$(DOCKER_COMPOSE) exec php bash -c "bin/console c:c"
	$(DOCKER_COMPOSE) exec php bash -c "composer dump-autoload --no-dev --classmap-authoritative"

stress-fpm:
	make prepare
	$(DOCKER) run --rm -it -p=8025:8025 -v .:/home/k6 --network=symfony-roadrunner-workshop-2025-04 ghcr.io/grafana/xk6-dashboard:latest run k6/php-fpm.js --out 'dashboard=export=php-fpm.report.html&period=5s&port=8025'

stress-rr:
	make prepare
	$(DOCKER) run --rm -it -p=8027:8027 -v .:/home/k6 --network=symfony-roadrunner-workshop-2025-04 ghcr.io/grafana/xk6-dashboard:latest run k6/roadrunner.js --out 'dashboard=export=roadrunner.report.html&period=5s&port=8027'
