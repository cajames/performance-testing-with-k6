import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

let ErrorCount = new Counter("errors");

export const options = {
  vus: 10,
  duration: "15s",
  thresholds: {
    // errors: ["rate<10"]
  }
};

export default function() {
  const checkStatus = Math.random() < 0.9 ? 200 : 404;

  let res = http.get("https://test.loadimpact.com");
  let success = check(res, {
    "status is 200": r => r.status === checkStatus
  });
  if (!success) {
    ErrorCount.add(1);
  }

  sleep(2);
}
