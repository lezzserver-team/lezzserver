---
sidebar_position: 1
sidebar_title: Docker
---

## Prerequisite

- [Docker](https://www.docker.com) ( >= 26.1.4 is recommended )
- [NodeJS](https://nodejs.org/en) ( >= v20.14 is recommended )

## Manual Installation

1. **Run lezzserver on your local machine**

```bash
docker network create lezzserver
docker run -d --name lezzserver --network lezzserver -p 2223:2223 lezzserver/lezzserver-lite
```

2. **Install Lezzserver UI (optional)**

```bash
docker run -d --name lezzserver-ui --network lezzserver -p 2222:2222 lezzserver/lezzserver-fe
```

## Install by Lezzserver CLI

1. **install lezzserver cli globally**

```bash
npm install -g @lezzserver/cli
```

2. **install lezzserver**

```bash
lezzserver install
```

3. **you will asked to install lezzserver ui to (optional)**

```bash
? Would you like to install Lezzserver UI ? (Y/n)
```

:::info
Install command basically just run command `docker compose up` based on lezzserver [Docker File](https://github.com/lezzserver-team/lezzserver/blob/main/docker-compose.yaml)
:::

now the lezzserver ready at your local machine, we can integrate lezzserver to your react project

:::warning
if you have installed this before then make sure you logout from UI and CLI (`lezzserver logout`) first
:::
