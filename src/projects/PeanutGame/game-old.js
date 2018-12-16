let cUtils = require('./utils/utils.canvas.js')
let container = document.getElementById('root');

// Create base game class
function Game(w, h) {
    // Generate a canvas and store it as our viewport
    this.viewport = cUtils.generateCanvas(w, h);
    this.viewport.id = "gameViewport"; // give the canvas an ID for easy CSS/JS targeting

    // Get and store the canvas context as a global
    this.context = this.viewport.getContext('2d');

    // Append our viewport into a container in the dom
    container.insertBefore(this.viewport, container.firstChild);

    // Spit out some text
    this.context.font = '32px Arial';
    this.context.fillStyle = '#fff';
    this.context.fillText('It\'s dangerous to travel this route alone.', 5, 50);

    return this;
}

let game = new Game(800, 600);

// Instantiate the game in a global
window.game = game;

// Export the game as a module
module.exports = game;