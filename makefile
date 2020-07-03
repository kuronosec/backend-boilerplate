include utils/meta.mk utils/help.mk

SHELL := /bin/bash

run: ##@local Run the project locally
run: 
	make run-env 
	make run-postgres
	make run-wallet
	make -j 2 run-hapi run-hasura

run-env:
	@[ -f .env ] && source .env || echo "$(YELLOW)WARNING:$(RESET) .env file not found"

run-postgres:
	@docker-compose up -d --build postgres

run-wallet:
	@docker-compose up -d --build wallet

run-hapi:
	@cd hapi && yarn
	@docker-compose up -d --build hapi
	@if [ $(STAGE) = "dev" ]; then\
		docker-compose logs -f hapi;\
	fi

run-hasura:
	@until \
		docker-compose exec -T postgres pg_isready; \
		do echo "$(BLUE)$(STAGE)-$(APP_NAME)-hasura |$(RESET) waiting for postgres service"; \
		sleep 5; done;
	@until \
		curl http://localhost:9090/healthz; \
		do echo "$(BLUE)$(STAGE)-$(APP_NAME)-hasura |$(RESET) waiting for hapi service"; \
		sleep 5; done;
	@docker-compose stop hasura
	@docker-compose up -d --build hasura
	@until \
		curl http://localhost:8080/healthz; \
		do echo "$(BLUE)$(STAGE)-$(APP_NAME)-hasura |$(RESET) waiting ..."; \
		sleep 5; done;
	@echo ""
	@if [ $(STAGE) = "dev" ]; then\
	 	cd hasura;\
	 	hasura console --endpoint http://localhost:8080 --skip-update-check --no-browser;\
	fi

stop: ##@local Stops the development instance
stop:
	@docker-compose stop

install: ##@local Install hapi dependencies
install:
	@cd hapi && yarn

pre-commit: ##@local Run pre commit validations for hapi
pre-commit:
	@[ ! -d hapi/node_modules ] && cd hapi && yarn || echo ""
	@cd hapi && yarn format && yarn lint
