#!/bin/bash
set -e

# Load environment variables if .env exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

echo "🚀 [Deploy] Starting deployment process..."

# 1. Pull the latest code (optional, only if in a git repo)
if [ -d .git ]; then
    echo "📥 [Deploy] Pulling latest code from git..."
    git pull
fi

# 2. Database migrations (optional)
if [ -f scripts/db-check.js ]; then
    echo "🗄️  [Deploy] Running database migrations..."
    bun run scripts/db-check.js || echo "⚠️ [Deploy] Migration failed, proceeding anyway..."
fi

# 3. Build and start services
# --build: Rebuild images before starting containers
# -d: Start containers in background
# --remove-orphans: Remove containers for services not defined in the Compose file
echo "🏗️  [Deploy] Building and starting services..."
docker-compose up -d --build --remove-orphans

# 3. Wait for health check (optional but recommended)
echo "⏳ [Deploy] Waiting for service to be healthy..."
MAX_RETRIES=12
RETRY_COUNT=0
until [ $(docker inspect --format='{{.State.Health.Status}}' arrislink-web) == "healthy" ] || [ $RETRY_COUNT -eq $MAX_RETRIES ]; do
    echo "   ...waiting ($((RETRY_COUNT+1))/$MAX_RETRIES)"
    sleep 5
    RETRY_COUNT=$((RETRY_COUNT+1))
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "❌ [Deploy] Deployment timed out or service is unhealthy. Please check logs."
    docker-compose logs --tail=50 web
    exit 1
fi

# 4. Cleanup old images
echo "🧹 [Deploy] Cleaning up unused images..."
docker image prune -f

echo "✅ [Deploy] Deployment successfully completed!"
echo "   Site is running at: http://localhost:3200"
