// Function to create a grid with nodes and walls
function createMazeGrid(rows, cols) {
  // Create the grid with nodes
  const grid = [];
  for (let r = 0; r <= rows; r++) {
    const row = [];
    for (let c = 0; c <= cols; c++) {
      row.push({ row: r, col: c });
    }
    grid.push(row);
  }

  // Initialize walls between nodes
  const walls = [];

  // Helper to add a wall between two nodes
  function addWall(node1, node2) {
    walls.push([node1, node2]);
  }

  // Helper to check if a wall exists between two nodes
  function isWall(node1, node2) {
    return walls.some(
      (wall) =>
        (wall[0].row === node1.row &&
          wall[0].col === node1.col &&
          wall[1].row === node2.row &&
          wall[1].col === node2.col) ||
        (wall[1].row === node1.row &&
          wall[1].col === node1.col &&
          wall[0].row === node2.row &&
          wall[0].col === node2.col)
    );
  }

  return {
    grid,
    walls,
    addWall,
    isWall,
  };
}

// Example usage
const maze = createMazeGrid(4, 4); // Create a 4x4 grid

// Add walls
maze.addWall({ row: 0, col: 0 }, { row: 0, col: 1 });
maze.addWall({ row: 1, col: 1 }, { row: 2, col: 1 });

// Check for a wall
console.log(
  maze.isWall({ row: 0, col: 0 }, { row: 0, col: 1 }) // true
);
console.log(
  maze.isWall({ row: 0, col: 0 }, { row: 1, col: 0 }) // false
);

// Print the walls
console.log(maze.walls);
