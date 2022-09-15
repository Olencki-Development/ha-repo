#!/usr/bin/with-contenv bashio

cd /app

# Create main config
CONFIG_BASIC_AUTH_USERNAME=$(bashio::config 'basic_auth_username')
CONFIG_BASIC_AUTH_PASSWORD=$(bashio::config 'basic_auth_password')
CONFIG_DB_USERNAME=$(bashio::config 'db_username')
CONFIG_DB_PASSWORD=$(bashio::config 'db_password')
CONFIG_DB_DATABASE=$(bashio::config 'db_database')
CONFIG_DB_HOST=$(bashio::config 'db_host')
CONFIG_WHITELISTED_DOMAINS=$(bashio::config 'whitelisted_domains')

# Launch server
echo "Launching server..."
DB_USERNAME="${CONFIG_DB_USERNAME}" DB_PASSWORD="${CONFIG_DB_PASSWORD}" DB_DATABASE="${CONFIG_DB_DATABASE}" DB_HOST="${CONFIG_DB_HOST}" BASIC_AUTH="${CONFIG_BASIC_AUTH_USERNAME}:${CONFIG_BASIC_AUTH_PASSWORD}" WHITELISTED_DOMAINS="${CONFIG_WHITELISTED_DOMAINS}" npm run build
DB_USERNAME="${CONFIG_DB_USERNAME}" DB_PASSWORD="${CONFIG_DB_PASSWORD}" DB_DATABASE="${CONFIG_DB_DATABASE}" DB_HOST="${CONFIG_DB_HOST}" BASIC_AUTH="${CONFIG_BASIC_AUTH_USERNAME}:${CONFIG_BASIC_AUTH_PASSWORD}" WHITELISTED_DOMAINS="${CONFIG_WHITELISTED_DOMAINS}" PORT=8099 node build
