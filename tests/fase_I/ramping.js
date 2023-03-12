import http from 'k6/http';
import { sleep } from 'k6';

const url1 = 'http://api-staging-lb-tf-1562660598.us-east-1.elb.amazonaws.com/api/v1/users?=&page=1&pageSize=5&term=&sortType=desc&sortColumn=created_at'
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIGRhIHNpbHZhIiwic3ViIjoyLCJyb2xlIjoiYWRtaW5pc3RyYWRvciIsImV4dGVybmFsX2lkIjpudWxsLCJicmFuY2hlcyI6W3siaWQiOjEsIm5hbWUiOiJNaW5hcyBHZXJhaXMiLCJleHRlcm5hbF9pZCI6MSwidWYiOiJtZyJ9LHsiaWQiOjIsIm5hbWUiOiJDYXJpYWNpY2EiLCJleHRlcm5hbF9pZCI6NiwidWYiOiJlcyJ9LHsiaWQiOjMsIm5hbWUiOiJTw6NvIEJlcm5hcmRvIGRvIENhbXBvIiwiZXh0ZXJuYWxfaWQiOjcsInVmIjoic3AifSx7ImlkIjo0LCJuYW1lIjoiQnJhc8OtbGlhIiwiZXh0ZXJuYWxfaWQiOjE0LCJ1ZiI6ImRmIn0seyJpZCI6NSwibmFtZSI6IkdvacOibmlhIiwiZXh0ZXJuYWxfaWQiOjE1LCJ1ZiI6ImdvIn0seyJpZCI6NiwibmFtZSI6IkN1aWFiw6EiLCJleHRlcm5hbF9pZCI6MTYsInVmIjoibXQifSx7ImlkIjo3LCJuYW1lIjoiTWFyYWNhbmHDuiIsImV4dGVybmFsX2lkIjoxNywidWYiOiJjZSJ9XSwiaWF0IjoxNjcyNjgwNDc4LCJleHAiOjE2NzI5Mzk2Nzh9.-CVeOxvXl8_AyzEKYHVvzM_nCiOKO1SMQ4_tlttKDfk'

const requestHeaders = {
    'User-Agent': 'k6',
    'Authorization': 'Bearer ' + apiToken,
  };

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 100 },
        { duration: '30s', target: 200 },
        { duration: '30s', target: 300 },
        { duration: '2m', target: 500 },
        { duration: '1m30s', target: 600 },
        { duration: '1m30s', target: 700 },
        { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '0s',
    },
  },
};

// export default function () {
//   http.get('http://api-staging-lb-tf-1562660598.us-east-1.elb.amazonaws.com/api/v1/users?=&page=1&pageSize=5&term=&sortType=desc&sortColumn=created_at/');
//   // We're injecting a processing pause for illustrative purposes only!
//   // Each iteration will be ~515ms, therefore ~2 iterations/second per VU maximum throughput.
//   sleep(0.5);
// }

export default function () {
    const res = http.batch([
      { method: 'GET', url: url1, params: { headers: requestHeaders } },
    ]);

    sleep(1);
  }
