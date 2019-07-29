# Performance Testing with K6

> A walkthrough

Getting started:

```sh
docker-compose up -d influxdb grafana
docker-compose run k6 run /scripts/01-simple/test.js
```

## Core Concepts

- what are VUs
- Counters | Guage | rate | Trends
- Thresholds
- Default Function
- Modules
- Env Variables

## Examples
- simple and batch requests
- post
- auth
- graphql
- HAR
- cloud execution (multi region)

Look through the docs here: https://support.loadimpact.com/4.0/