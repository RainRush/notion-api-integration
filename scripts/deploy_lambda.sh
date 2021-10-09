#!bin/bash
set -e

echo "Install Serverless"
sudo npm i -g serverless@2.4.0

echo "Setup Serverless config"
serverless config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY

echo "Serverless deploy"
serverless deploy
