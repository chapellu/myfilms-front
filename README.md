# base

## Project setup

```shell
# npm
npm install
```

### Compiles and hot-reloads for development

```shell
# npm
npm run dev
```

### Compiles and minifies for production

```shell
# npm
npm run build
```

### Lints and fixes files

```shell
# npm
npm run lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).

# Docker

## Docker build

```shell
npm run build:docker
```

## Docker run

```shell
npm run serve:docker
```

#  Docker compose

Before being able to run docker compose you will need to build the docker for the two projets: myfilms-front and myfilms-back

```shell
docker-compose -f deploy/docker-compose.yml up
```
