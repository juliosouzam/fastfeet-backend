<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>
<h3 align="center">
  FastFeet, Backend make with Express.Js and Coffee.
</h3>

## :mortar_board: Features

It was developed with [Node.js](https://nodejs.org/en/) for the Rocketseat Bootcamp GoStack challange.

- [Express.js](https://github.com/expressjs/express)
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js#readme)
- [Bee Queue](https://github.com/bee-queue/bee-queue)
- [Date FNS](https://github.com/date-fns/date-fns)
- [Json Web Token](https://github.com/auth0/node-jsonwebtoken#readme)
- [Nodemailer](https://github.com/nodemailer/nodemailer)
- [Multer](https://github.com/expressjs/multer)
- [Sequelize](https://sequelize.org/)
- [Yup](https://github.com/jquense/yup)
- [Docker](https://docs.docker.com/install/)

## :computer: Configure

To run this application i recommend you to install [Docker](https://docs.docker.com/install/) and [configure](https://docs.docker.com/install/linux/linux-postinstall/) it to use with your user system. (If you needed).

First it all, let's go ready the databases.
Postgres SQL

_Change the name of container and/or password_

```sh
$ docker run --name postgres -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres
```

Second, let's go configure the redis

_Change the name of container_

```sh
$ docker run --name redis -p 6379:6379 -d redis:alpine
```

Now, let's prepare the application

_Just for organizational purposes, let's create a folder called **fastfeet** and put our codes inside_

```sh
$ mkdir fastfeet
$ cd fastfeet
```

Cloning the repository

```sh
$ git clone https://github.com/juliosouzam/fastfeet-backend.git backend
$ cd backend
```

With [_yarn_](https://classic.yarnpkg.com/en/docs/install) installed run...

```sh
$ yarn
# and now
$ cp .env.example .env
```

_Dont forget to configure your app url, app port, app secret, database, redis and mail_

## :video_game: Running

```sh
# in the terminal
$ yarn dev
# in other terminal
$ yarn queue
```

## Next Features

- Tests
- CI/CD

Developed by [me](https://github.com/juliosouzam) with :coffee: and :heart:
