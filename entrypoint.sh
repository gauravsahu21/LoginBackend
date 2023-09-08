environment=$env

if [ "$environment" == "prod" ] 
then 
    cp "./src/config/config.prod.json" "./src/config/config.json"
fi

if [ "$environment" == "staging" ] 
then 
    cp "./src/config/config.staging.json" "./src/config/config.json"
fi

if [ "$environment" == "qa" ] 
then 
    cp "./src/config/config.qa.json" "./src/config/config.json"
fi

npm start