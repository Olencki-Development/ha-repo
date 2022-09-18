#!/usr/bin/with-contenv bashio

cd /app

# Create main config
CONFIG_DB_USERNAME=$(bashio::config 'db_username')
CONFIG_DB_PASSWORD=$(bashio::config 'db_password')
CONFIG_DB_DATABASE=$(bashio::config 'db_database')
CONFIG_DB_HOST=$(bashio::config 'db_host')

# Launch server
echo "Launching server..."
DB_USERNAME="${CONFIG_DB_USERNAME}" DB_PASSWORD="${CONFIG_DB_PASSWORD}" DB_DATABASE="${CONFIG_DB_DATABASE}" DB_HOST="${CONFIG_DB_HOST}" npm run build
PORT=8099 node build
