.PHONY: help dev build up down start stop restart migrate status logs clean prune health-check deploy

# Default target
help:
	@echo "🚀 Arrislink Web Deployment Management"
	@echo "--------------------------------------"
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  dev           Start local development server (bun run dev)"
	@echo "  build         Build the Docker image"
	@echo "  up            Create and start containers (docker-compose up -d)"
	@echo "  down          Stop and remove containers, networks, images, and volumes"
	@echo "  start         Start existing containers"
	@echo "  stop          Stop running containers"
	@echo "  restart       Restart containers"
	@echo "  deploy        Execute the deployment script (full pipeline)"
	@echo "  migrate       Run database migrations (db-check.js)"
	@echo "  status        Show current container status"
	@echo "  logs          Follow logs of the web container"
	@echo "  clean         Same as 'down'"
	@echo "  prune         Cleanup unused Docker images and build cache"
	@echo "  health-check  Run a local health check against the running container"

dev:
	bun run dev

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

start:
	docker-compose start

stop:
	docker-compose stop

restart:
	docker-compose restart

deploy:
	chmod +x scripts/deploy.sh
	./scripts/deploy.sh

migrate:
	bun run scripts/db-check.js

status:
	docker-compose ps

logs:
	docker-compose logs -f web

clean: down

prune:
	docker system prune -f

health-check:
	curl -f http://localhost:3200/api/health || echo "❌ Health check failed"
