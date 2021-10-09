## Notion API Integration

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### Local:

#### Setup:

To install:
`yarn`

#### To run so that it can be tested with the platform service:

```
serverless offline
```

#### To invoke function to test:

1. `serverless offline`
2.

```
curl --request POST http://localhost:4000/dev/todo-item
```

### Cloud:

#### Deploy

```
serverless deploy --aws-profile {YOUR_AWS_PROFILE}
```
