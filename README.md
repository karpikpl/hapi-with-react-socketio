# sample

Sample generated Rest API

[![Dependency Status](https://david-dm.org/karpikpl/hapi-with-react-socketio.svg)](https://david-dm.org/karpikpl/hapi-with-react-socketio)
[![devDependency Status](https://david-dm.org/karpikpl/hapi-with-react-socketio/dev-status.svg?theme=shields.io)](https://david-dm.org/karpikpl/hapi-with-react-socketio?type=dev)
[![Build Status](https://travis-ci.org/karpikpl/hapi-with-react-socketio.svg?branch=master)](https://travis-ci.org/karpikpl/hapi-with-react-socketio)
[![Coverage Status](https://coveralls.io/repos/github/karpikpl/hapi-with-react-socketio/badge.svg?branch=master)](https://coveralls.io/github/karpikpl/hapi-with-react-socketio?branch=master)

# Description
Hapi 17.0 sample build based on Yeoman template

## Blog
https://medium.com/@piotrkarpaa

## Usage

```bash
$ yarn
$ yarn start
```

## Client
Client build using `react-create-app`

## Build with
Yeoman generator for scaffolding hapi apps and plugins. https://github.com/jedireza/generator-hapi-style

Migrated to latest dependencies (Hapi 17.0) with the idea to create PR to jedireza repo

# API
## IsOn
`curl -X PUT -d '{"isOn":true}' -H 'Content-Type: application/json'  .:8080/api/isOn`

## License

MIT
