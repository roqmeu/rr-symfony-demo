import http from 'k6/http';
import { stages, random, comment } from "./common.js";

export const options = {
    scenarios: {
        "ok": {
            executor: "ramping-vus",
            exec: "ok",
            startVUs: 8,
            startTime: '0s',
            gracefulRampDown: '0s',
            gracefulStop: '0s',
            stages: stages,
        },
        "get": {
            executor: "ramping-vus",
            exec: "get",
            startVUs: 8,
            startTime: '2m30s',
            gracefulRampDown: '0s',
            gracefulStop: '0s',
            stages: stages,
        },
        "post": {
            executor: "ramping-vus",
            exec: "post",
            startVUs: 8,
            startTime: '5m',
            gracefulRampDown: '0s',
            gracefulStop: '0s',
            stages: stages,
        },
    }
};

const commentId = random(1, 150);
const postId = random(1, 150);

export function ok() {
    http.get(
        `http://nginx:80/en/blog/ok`,
        {
            'tags': { 'name': 'ok' },
            'timeout': '0.5s',
            'responseType': 'none'
        }
    );
}

export function get() {
    http.get(
        `http://nginx:80/en/blog/comment/${commentId}`,
        {
            'tags': { 'name': 'get' },
            'timeout': '0.5s',
            'responseType': 'none'
        }
    );
}

export function post() {
    http.post(
        `http://nginx:80/en/blog/post/${postId}/comment`,
        JSON.stringify({
            "content": comment
        }),
        {
            'headers': { 'Content-Type': 'application/json' },
            'tags': { 'name': 'post' },
            'timeout': '0.5s',
            'responseType': 'none'
        }
    );
}
