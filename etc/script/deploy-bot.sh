#!/usr/bin/env bash

set -e

rsync -avzrhcP \
  -e 'ssh -i ~/.ssh/id_ecdsa_sec' \
  --exclude=".git" --exclude=".next" \
  --exclude=".env" \
  --exclude="*.csv" \
  --exclude="data/" \
  --exclude="out/" \
  --exclude="etc/" \
  --exclude="public/image" \
  --exclude="node_modules" \
  --exclude=".env*" \
  --exclude=".DS_Store" \
  ./server/ root@$DEPLOY_SERVER:/home/www/$name_snake_case$-project/server

echo Restarting Telegram bot service...
ssh -i ~/.ssh/id_ecdsa_sec root@$DEPLOY_SERVER chown -R www:www /home/www/$name_snake_case$-project
ssh -i ~/.ssh/id_ecdsa_sec root@$DEPLOY_SERVER systemctl restart $name_snake_case$-telegrambot
echo Done.

