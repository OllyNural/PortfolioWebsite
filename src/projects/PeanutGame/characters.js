import signs from './signs.js'

const PI = Math.PI

const dance = (x, y, dir, offset) => {
    offset = offset * 50
    return function (t) {
        let x0 = x
        let y0 = y

        let loc = {
            x: x0,
            y: y0,
            theta: (-2 * PI/4),
            step: Math.round((t - offset) / 500) % 2
        }

        return loc
    }
}

export default [
    { name: 'signpost', inHouse: false, loc: { x: 435, y: 110 }, response: signs[0] },
    { name: 'signpost', inHouse: false, loc: { x: 500, y: 775 }, response: signs[1] },

    { name: 'ogob', inHouse: true, loc: dance(80, 105, 'south', Math.random()), response: "I'm trying as hard as I can...!" },
    { name: 'ilene', inHouse: true, loc: dance(130, 80, 'south', Math.random()), response: 'Welcome back Peanut!' },
    { name: 'pookie', inHouse: true, loc: dance(190, 100, 'south', Math.random()), response: '...Pookie words that say Merry Christmas!' },
    { name: 'nugget', inHouse: true, loc: dance(50, 106, 'south', Math.random()), response: 'Nug Nugs wishes you a Merry Christmas!' },
    { name: 'ollybear', inHouse: true, loc: dance(175, 132, 'south', Math.random()), response: 'My best friend is finally back!' },
]