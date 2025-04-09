const stages = [
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
];

const comment = "Praesent id fermentum lorem. Ut est lorem, fringilla at accumsan nec, euismod atnunc.";

function random(from, to) {
    return from + Math.floor(Math.random() * (to - from));
}

export { stages, comment, random };
