import http from 'k6/http';
import { group, sleep } from 'k6';

export let options = {
    stages: [
        // { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minutes.
        // { duration: '2m', target: 100 }, // stay at 100 users for 2 minutes
        // { duration: '1m', target: 0 }, // ramp-down to 0 users
        { duration: '1m', target: 100 }, // below normal load
        { duration: '2m', target: 100 },
        { duration: '1m', target: 200 }, // normal load
        { duration: '2m', target: 200 },
        { duration: '1m', target: 300 }, // around the breaking point
        { duration: '2m', target: 300 },
        { duration: '1m', target: 400 }, // beyond the breaking point
        { duration: '2m', target: 400 },
        { duration: '10m', target: 0 }, // scale down. Recovery stage.
    ],
    thresholds: {
        // http_req_duration: ['p(99)<20'], // 99% of requests must complete below 0.2s
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};