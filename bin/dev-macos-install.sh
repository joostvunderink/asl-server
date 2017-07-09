echo "Building and starting containers..."
docker-compose up -d
echo "Done. Waiting 20 seconds for the MySQL server to start up..."
sleep 20
echo "Done. Preparing the database with tables and data..."
./bin/migrate
./bin/bootstrap
echo "Done."

