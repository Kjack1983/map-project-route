build:
	cd map-server && $(MAKE) build
	cd map-client && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down