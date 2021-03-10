# HelloNFT
An ERC721 implementation with it's attribute Node+Express server and a React client app.

## Requirements
### Truffle
Truffle is a development environment, testing framework and asset pipeline for Ethereum.
```
npm install -g truffle
```
### Ganache
Ganache is your personal blockchain for Ethereum development.

[Download](https://www.trufflesuite.com/ganache)

## Build & Start
### Smart contract
```
cd contract
# install dependancies
npm install
# deploy to ganache 
truffle migrate --reset
```

### Server
```
cd server
# install dependancies
npm install
# start server
nodemon src/index.js
```

### Client app
```
cd app
# install dependancies
npm install
# start app
npm start
```

