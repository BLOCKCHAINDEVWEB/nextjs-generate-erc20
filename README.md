This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
Clone code:  
```bash
git clone https://github.com/BLOCKCHAINDEVWEB/nextjs-generate-erc20.git
cd nextjs-generate-erc20
```

Duplicate the .env file given as an example:  
```bash
cp .env.sample .env
```

1. Complete your .env file with variables environnement keys of project:  
```text
NEXT_PUBLIC_NETWORK_WHITELIST=goerli,sokol,mumbai
NEXT_PUBLIC_KEY_DEPLOYER=0x1474CfFA8f8E1B48a37543510de18bC8Cc835406
NEXT_PUBLIC_PRIVATE_KEY_DEPLOYER=927f9118...
NEXT_PUBLIC_HOST_URL=http://localhost:3000

# Provider Urls
NEXT_PUBLIC_GOERLI_PROVIDER_URL=https://goerli.infura.io/v3/ed660...
NEXT_PUBLIC_SOKOL_PROVIDER_URL=https://sokol.poa.network/
NEXT_PUBLIC_MUMBAI_PROVIDER_URL=https://rpc-mumbai.maticvigil.com/v1/bd04...

```

2. Environnement keys from the database Postgres are for local developement:  
See the documentation to run a local server: [https://www.docker.com/](https://www.docker.com/) .

## Create and running a container Docker  
execute commands:
```text
docker-compose up -d
```

## Create a dashboard (pgAdmin 4) for initialize a table at your database:  
1. Connect with your pgadmin 4 login and password in your browser.  

open url: http://localhost/browser/  

Completed Login with:  
```text
  Email: sample@email.com  
  Password: password  
```
Click Login Button  

Go to left side flap  

Fly over 'server' and select:
```text
  Create select server  
```

For production complete with your remote datas connection.  

For local development following env datas per default:  
Completed General Tag in with:  
```text
  Name: localhost  
```
Completed Connexion Tag with:  
```text
  Host name/Address: postgres  
  User name: admin  
  User password: password  
```

2. Create a table of the database in your browser.  

In right side menu click on Tables (Serveurs>localhost>Schema>public>Tables)  
In top side menu open tag tools and select Query tool  
In query Editor paste all the queries of the tokensERC20.sql file  

Execute(F5) the code for create a table  

## Started application for development:  
execute commands:
```text
npm install
npm run dev
```

Open browser at http://localhost:3000  

or API at http://localhost:3000/api/erc20  
