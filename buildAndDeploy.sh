set -e
cd app
gulp test
gulp bundle
cd ./../deploy
terraform plan -out=./tf-deploy-plan
terraform apply ./tf-deploy-plan
