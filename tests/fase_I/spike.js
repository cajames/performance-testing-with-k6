import http from 'k6/http';
import { group, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 10 },
        { duration: '30s', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 0 }
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

// alternancia entre 3 paginas
// export default function () {
//     group('page_1', function () {
//         let res = http.get('http://test.k6.io');
//         sleep(1);
//     });
//     group('page_2', function () {
//         let res = http.get('http://test.k6.io/contacts.php');
//         sleep(1);
//     });
//     group('page_3', function () {
//         let res = http.get('http://test.k6.io/form.php');
//         sleep(1);
//     });
// }