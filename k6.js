import http from 'k6/http';

export const options = {
    scenarios: {
        "ok": {
            executor: "ramping-vus",
            exec: "ok",
            startVUs: 8,
            startTime: '0s',
            gracefulRampDown: '0s',
            gracefulStop: '0s',
            stages: [
                { target: 16, duration: '10s' },
                { target: 16, duration: '20s' },
                { target: 32, duration: '10s' },
                { target: 32, duration: '20s' },
                { target: 64, duration: '10s' },
                { target: 64, duration: '20s' },
                { target: 128, duration: '10s' },
                { target: 128, duration: '20s' },
                { target: 0, duration: '10s' },
                { target: 0, duration: '20s' },
            ],
        },
        "get": {
            executor: "ramping-vus",
            exec: "get",
            startVUs: 8,
            startTime: '2m30s',
            gracefulRampDown: '0s',
            gracefulStop: '0s',
            stages: [
                { target: 16, duration: '10s' },
                { target: 16, duration: '20s' },
                { target: 32, duration: '10s' },
                { target: 32, duration: '20s' },
                { target: 64, duration: '10s' },
                { target: 64, duration: '20s' },
                { target: 128, duration: '10s' },
                { target: 128, duration: '20s' },
                { target: 0, duration: '10s' },
                { target: 0, duration: '20s' },
            ],
        },
        "post": {
            executor: "ramping-vus",
            exec: "post",
            startVUs: 8,
            startTime: '5m',
            gracefulRampDown: '0s',
            gracefulStop: '0s',
            stages: [
                { target: 16, duration: '10s' },
                { target: 16, duration: '20s' },
                { target: 32, duration: '10s' },
                { target: 32, duration: '20s' },
                { target: 64, duration: '10s' },
                { target: 64, duration: '20s' },
                { target: 128, duration: '10s' },
                { target: 128, duration: '20s' },
                { target: 0, duration: '10s' },
                { target: 0, duration: '20s' },
            ],
        },
    }
};

const commentId = 1 + Math.floor(Math.random() * 149);
const postId = 1 + Math.floor(Math.random() * 29);

const commentContent = "Praesent id fermentum lorem. Ut est lorem, fringilla at accumsan nec, euismod atnunc.";

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
            "content": commentContent
        }),
        {
            'headers': { 'Content-Type': 'application/json' },
            'tags': { 'name': 'post' },
            'timeout': '0.5s',
            'responseType': 'none'
        }
    );
}
