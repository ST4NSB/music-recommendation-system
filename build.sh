#!/bin/bash

# Generate random API Key
api_key=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 32 | head -n 1)
api_key="${api_key:0:8}-${api_key:8:4}-${api_key:12:4}-${api_key:16:4}-${api_key:20}"

# Create .flaskenv file if doesn't exist
fenv=".flaskenv"
if [[ ! -e $fenv ]]; then
    touch $fenv

    echo '# How to get a YOUTUBE API KEY: https://blog.hubspot.com/website/how-to-get-youtube-api-key' >> $fenv
    printf 'YT_API_KEY="INSERT YOUR API KEY HERE" \n\n' >> $fenv
    echo 'DB_USER_NAME="admin"' >> $fenv
    echo 'DB_USER_PASS="HqMuhzTzhQIU7Rkt"' >> $fenv
    echo 'DB_CLUSTER_NAME="cluster0"' >> $fenv
    echo 'API_KEY="'"$api_key"'"' >> $fenv
    echo 'ELASTICSEARCH_HOST="http://localhost:9200/"' >> $fenv
    echo 'Created '$fenv' file successfully'
fi

# Create .env file if doesn't exist
env="client-app/.env"
if [[ ! -e $env ]]; then
    touch $env

    echo 'REACT_APP_API_KEY='$api_key'' >> $env
    echo 'REACT_APP_HOST=http://127.0.0.1:5000' >> $env
    echo 'REACT_APP_MIN_SONGS=3' >> $env
    echo 'Created '$env' file successfully'
fi

echo ''

# Start up the containers
docker-compose up -d --build
# Check that containers are up and running
docker-compose ps

echo ''
echo "*************************************************************************************************"
echo "*** Get and add data.csv dataset to this project folder.                                      ***"
echo "*** Dataset download link: https://www.kaggle.com/ektanegi/spotifydata-19212020/download      ***"
echo "*** Insert your YOUTUBE API KEY in .flaskenv file.                                            ***"
echo "*** How to get a YOUTUBE API KEY: https://blog.hubspot.com/website/how-to-get-youtube-api-key ***"
echo "*************************************************************************************************"

$SHELL