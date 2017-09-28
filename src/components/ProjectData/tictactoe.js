export const tictactoe = {
  id: 0, 
  name: 'tictactoe', 
  title: 'Creating an unbeatable TicTacToe opponent', 
  demo: '/tictactoe/demo',
  code: null,
  blog: null,
  background: [,
    'To best learn <a href="https://facebook.github.io/react/" target="_blank"><span class="title-name">React.js</span></a> (and with the aim of building this website using it), I followed a <a href="https://facebook.github.io/react/tutorial/tutorial.html" target="_blank"><span class="title-name">Facebook tutorial</span></a> of creating a simple TicTacToe game allowing 2 players to play against each other. This helped me understand the basics of the library, however I wanted to further this implementation.',
    'During my final year of University, I learned the basic concepts of various puzzle-solving algorithms including the <a href="https://en.wikipedia.org/wiki/A*_search_algorithm" target="_blank"><span class="title-name">A*</span></a> and <a href="https://en.wikipedia.org/wiki/Minimax" target="_blank"><span class="title-name">Minimax</span></a> algorithms, and as part of coursework I created a tile-puzzle solver using an A* algorithm with a custom heuristic. It therefore seemed a natural progression to test out the MiniMax algorithm on a well-suited TicTacToe game, as you can view in the <a href="/tictactoe/demo" target="_blank"><span class="title-name">demo</span></a>.'
  ],
  howItWorks: [
    'The formidable foe uses the <a href="https://en.wikipedia.org/wiki/Minimax" target="_blank"><span class="title-name">Minimax Algorithm</span></a>. The computer looks ahead at every possible game state the game has left to offer, and evaluates each based on the set outcome - in my case a +/- score of +10 (minus the amount of moves taken). It then chooses the move that has the best outcome.',
    'The name MiniMax comes from the fact that when tunneling down the tree of all the different potential moves to make, it will always choose the <i>minimum</i> value for it\'s turn, and the <i>maximum</i> value for the players. This ensures that it has covered all bases, and is accounting for the worst case scenario every single time.',
    'Of course, TicTacToe is quite a special game in the sense the board is easy to map into a game state, and there are only a small, finite amount of moves available to take before the game ends. This ensures a quick and easy calculation for the computer (Maximum of 9 turns available). In a game of chess, for example, the computer would most likely have to limit it\'s depth of move searching to a smaller number - perhaps 5, 10 or 15 depending on the computer.'
  ]
}