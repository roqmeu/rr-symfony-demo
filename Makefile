init:
	docker compose up -d
	docker compose exec php bash -c "composer install"

prepare:
	docker compose exec php bash -c "bin/console c:c"
	docker compose exec php bash -c "composer dump-autoload --no-dev --classmap-authoritative"

stress-before:
	make prepare
	docker run --rm -i -t -p=5665:5665 -v .:/home/k6 --network=symfony-demo ghcr.io/grafana/xk6-dashboard:latest run k6.js --out 'dashboard=export=k6-report.before.html'

stress-after:
	make prepare
	docker run --rm -i -t -p=5665:5665 -v .:/home/k6 --network=symfony-demo ghcr.io/grafana/xk6-dashboard:latest run k6.js --out 'dashboard=export=k6-report.after.html'
