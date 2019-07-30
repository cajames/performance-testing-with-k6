import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Rate } from "k6/metrics";

/*
 * Stages (aka ramping) is how you, in code, specify the ramping of VUs.
 * That is, how many VUs should be active and generating traffic against
 * the target system at any specific point in time for the duration of
 * the test.
 *
 * The following stages configuration will result in up-flat-down ramping
 * profile over a 20s total test duration.
 */

let ErrorCount = new Counter("errors");
let ErrorRate = new Rate("error_rate");

export let options = {
  stages: [
    // Ramp-up from 1 to 5 VUs in 10s
    { duration: "15s", target: 50 },

    // Stay at rest on 5 VUs for 5s
    { duration: "30s", target: 50 },

    // Ramp-down from 5 to 0 VUs for 5s
    { duration: "15s", target: 0 }
  ],
  thresholds: {
    error_rate: ["rate<0.1"]
  }
};

export default function() {
  const status = Math.random() < 0.9 ? "200" : "500";
  let res = http.get(`http://httpbin.org/status/${status}`);
  let success = check(res, {
    "status is 200": r => r.status === 200
  });
  if (!success) {
    ErrorCount.add(1);
    ErrorRate.add(true);
  } else {
    ErrorRate.add(false);
  }

  sleep(0.5);
}
