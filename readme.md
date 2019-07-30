# Performance Testing with K6

Getting started:

```sh
docker-compose up -d influxdb grafana

docker-compose run k6 run /scripts/01-simple/test.js
```

After settings up Grafana, load the dashboard config.

Look through the k6 docs here: https://support.loadimpact.com/4.0/