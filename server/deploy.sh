#!/bin/bash

echo What should the version be?
read VERSION

docker build -t mmurray/fake-reddit-1:$VERSION .
docker push mmurray/fake-reddit-1:$VERSION 
heroku container:push web
heroku container:release web 