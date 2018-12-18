import signs from './signs.js'

export default [
    { name: 'signpost', screen: 1, loc: { x: 335, y: 13 }, response: signs[0] },
    { name: 'signpost', screen: 1, loc: { x: 204, y: 209 }, response: signs[1] },
    { name: 'ilene', screen: 2, loc: { x: 30, y: 200 }, response: 'Welcome back Peanut!' },
    { name: 'pookie', screen: 2, loc: { x: 335, y: 13 }, response: 'Does Pookie even speak??' },
    { name: 'ollybear', screen: 2, loc: { x: 335, y: 13 }, response: 'My best friend is back!' },
    { name: 'nugget', screen: 2, loc: { x: 472, y: 211 }, response: 'Call me Mr. Nuggs' },
    { name: 'ogob', screen: 2, loc: { x: 335, y: 13 }, response: "I'm trying as hard as I can!" },
]