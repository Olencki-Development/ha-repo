#!/usr/bin/with-contenv bashio

# Create main config
CONFIG_BASIC_AUTH_USERNAME=$(bashio::config 'basic_auth_username')
CONFIG_BASIC_AUTH_PASSWORD=$(bashio::config 'basic_auth_password')
CONFIG_DB_USERNAME=$(bashio::config 'db_username')
CONFIG_DB_PASSWORD=$(bashio::config 'db_password')
CONFIG_DB_DATABASE=$(bashio::config 'db_database')
CONFIG_DB_HOST=$(bashio::config 'db_host')

echo "\n\n"
npm -v
node -v
echo "\n\n"

echo "Installing dependencies..."
echo "\n\n"
npm install

echo "\n\n"
echo "Launching server..."
echo "\n\n"
DB_USERNAME="${CONFIG_DB_USERNAME}" DB_PASSWORD="${CONFIG_DB_PASSWORD}" DB_DATABASE="${CONFIG_DB_DATABASE}" DB_HOST="${CONFIG_DB_HOST}" BASIC_AUTH="${CONFIG_BASIC_AUTH_USERNAME}:${CONFIG_BASIC_AUTH_PASSWORD}" HOST=0.0.0.0 PORT=5173 npm run build
npm run preview
