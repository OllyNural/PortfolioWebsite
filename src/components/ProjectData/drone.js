export const drone = {
  id: 0, 
  name: 'drone', 
  title: 'Blood running with autonomous drones',
  src: 'drone.gif', 
  demo: null,
  code: 'https://github.com/ChristopherAkroyd/CO600-Droners',
  blog: null,
  background: [,
    'As my final year project at University, I worked within a team of 4 to design and create an autonomous drone system, capable of both transporting a package between different pick up points, and avoiding obstacles along the way.',
  ],
  howItWorks: [
    'The system is written in Python, a language few of us had experience in, and is built around <a href="https://www.ros.org/" target="_blank"><span class="title-name">ROS</span></a> - the Robotic Operating System. We used the <a href="https://gazebosim.org" target="_blank"><span class="title-name">Gazebo simulator</span></a> to simulate our flight paths and for debugging. The system utilises a central controller queueing all necessary flight movement and logic actions. The project was written in a very modular way, allowing maximum re-usability of flight actions, down to a very granular level.',
    'I wrote a <a href="https://en.wikipedia.org/wiki/A*_search_algorithm" target="_blank"><span class="title-name">A*</span></a> pathfinding algorithm, with a <a href="https://en.wikipedia.org/wiki/Euclidean_Distance" target="_blank"><span class="title-name">Euclidean Distance</span></a> heuristic. Due to inaccuracies surrounding our GPS readings from the drone, padding had to be introduced around all obstacles, and diagonal movement near the corner of an object had to be removed and adapted to.',
    'To safely identify landing and take off spaces, we paired the use of GPS with image recognition with <a href="https://opencv.org" target="_blank"><span class="title-name">OpenCV</span></a> to pick up our own custom tag. This allowed us to ensure we were landing at the correct location even with GPS inaccuracies. This was especially important as a big requirement was flying withing strict geo-boundaries, ensuring we flying within regulations.',
    'To sew this whole project together took some time, and testing was incredibly difficult as a result of the simulator being slightly buggy. Because of this, I decided to implement a web interface that used web sockets to interact with the running ROS server, allowing us to set Geo-boundaries and start/end locations very easily. It also allowed us to view the expected path that the system has calculated for us on the map, as well as mapping that against the actual route the drone is taking in real time, allowing for far easier debugging of the route.'
  ]
}