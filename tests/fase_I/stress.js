import http from 'k6/http';
import { group, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '30s', target: 10 },
        { duration: '10s', target: 20 },
        { duration: '30s', target: 20 },
        { duration: '10s', target: 30 },
        { duration: '30s', target: 30 },
        { duration: '10s', target: 40 },
        { duration: '30s', target: 40 },
        { duration: '10s', target: 50 },
        { duration: '30s', target: 50 },
        { duration: '10s', target: 60 },
        { duration: '30s', target: 60 },
        { duration: '10s', target: 70 },
        { duration: '30s', target: 70 },
        { duration: '10s', target: 80 },
        { duration: '30s', target: 80 },
        { duration: '10s', target: 30 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

export default function () {
    group('page_1', function () {// rename 'page' to the group name
        let req, res;

        req = [
            {
                'method': 'GET',
                'url': 'https://test-api.k6.io/public/crocodiles/1/',
                'params': {// optional
                    'headers': {
                        'Content-Type': 'application/json',
                    },
                },
            },
        ];
        res = http.batch(req);
        sleep(1);
    });
}
