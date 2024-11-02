#!/bin/bash

if [ ! -d "cs5610-final-server" ]; then
  git clone https://github.com/GameHorizonDev/cs5610-final-server.git
  cd cs5610-final-server
  npm install
  node seed.js
else
  cd cs5610-final-server
  git pull
  npm install
fi

npm run dev
