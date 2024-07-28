import { useState } from "react";
import "../styles.css";

// This component visualizes the solution to the 0/1 Knapsack problem
function KnapsackVisualization({ weights, values, capacity }) {
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [dpTable, setDpTable] = useState([]);

  const handleSolveClick = () => {
    let n = weights.length;
    let W = capacity;
    let dp = Array(n + 1)
      .fill(0)
      .map(() => Array(W + 1).fill(0));
    const newSteps = [];

    for (let i = 0; i <= n; i++) {
      for (let w = 0; w <= W; w++) {
        if (i === 0 || w === 0) {
          dp[i][w] = 0;
        } else if (weights[i - 1] <= w) {
          dp[i][w] = Math.max(
            values[i - 1] + dp[i - 1][w - weights[i - 1]],
            dp[i - 1][w]
          );
          newSteps.push(
            `dp[${i}][${w}] = max(${values[i - 1]} + dp[${i - 1}][${w - weights[i - 1]}], dp[${i - 1}][${w}]) = ${dp[i][w]}`
          );
        } else {
          dp[i][w] = dp[i - 1][w];
          newSteps.push(
            `dp[${i}][${w}] = dp[${i - 1}][${w}] = ${dp[i][w]}`
          );
        }
      }
    }

    setResult(dp[n][W]);
    setSteps(newSteps);
    setDpTable(dp);
  };

  return (
    <div className="visualization-container">
      <button className="solve-button" onClick={handleSolveClick}>Solve Knapsack</button>
      {result !== null && (
        <div>
          <h3>Maximum Value: {result}</h3>
          <h3>DP Table:</h3>
          <table className="dp-table">
            <tbody>
              {dpTable.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Steps:</h3>
          <ol>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

// Main component for user input and integration with KnapsackVisualization
export default function Knapsack() {
  const [numItems, setNumItems] = useState("");
  const [weights, setWeights] = useState([]);
  const [values, setValues] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [inputWeights, setInputWeights] = useState([]);
  const [inputValues, setInputValues] = useState([]);

  const handleNumItemsChange = (e) => {
    setNumItems(e.target.value);
    setInputWeights(Array(Number(e.target.value)).fill(""));
    setInputValues(Array(Number(e.target.value)).fill(""));
  };

  const handleWeightChange = (index, value) => {
    const newWeights = [...inputWeights];
    newWeights[index] = value;
    setInputWeights(newWeights);
  };

  const handleValueChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const handleSetKnapsack = () => {
    const parsedWeights = inputWeights.map((num) => parseInt(num, 10));
    const parsedValues = inputValues.map((num) => parseInt(num, 10));
    setWeights(parsedWeights);
    setValues(parsedValues);
    setCapacity(parseInt(capacity, 10));
  };

  return (
    <>
      <header>
        <h1>0/1 Knapsack Problem</h1>
      </header>
      <main>
        <section id="knapsack-details">
          <h2>Details</h2>
          <p>
            The 0/1 Knapsack Problem is a classic problem where you need to pack items into a knapsack to get the highest value without exceeding the weight limit. Here’s a simple explanation of how we use Dynamic Programming (DP) and the iterative approach to solve it:
          </p>
          <ol>
            <li><strong>What is Dynamic Programming?</strong> DP is a method to solve problems by breaking them into smaller, simpler problems and solving those. It stores the results of these smaller problems to avoid redoing the work.</li>
            <li><strong>What is Iterative DP (Tabulation)?</strong> In iterative DP, we solve problems by filling out a table step-by-step, starting from the simplest cases and building up to the final solution.</li>
            <li><strong>Step-by-Step Approach:</strong> We create a table with rows for items and columns for capacities. We fill this table one cell at a time, using results from previous cells to solve each new cell.</li>
            <li><strong>Starting with Simple Cases:</strong> The table starts with base cases where there are no items or zero capacity, and we initialize these cases to zero.</li>
            <li><strong>Filling the Table:</strong> For each item and capacity, we decide whether to include the item by comparing the value of including it versus not including it.</li>
            <li><strong>Updating the Table:</strong> We use results from earlier in the table to help fill in the current cell. This way, we build up to the solution for the full set of items and capacity.</li>
            <li><strong>Finding the Final Answer:</strong> After filling out the table, the final cell gives us the maximum value we can achieve with all items and the full knapsack capacity.</li>
            <li><strong>Efficiency:</strong> This method is efficient because it avoids redoing calculations by storing and reusing results from smaller problems.</li>
            <li><strong>Benefits:</strong> Iterative DP (tabulation) is easy to understand and implement. It ensures that all subproblems are solved and used correctly to build the final solution.</li>
            <li><strong>Summary:</strong> By using iterative DP, we efficiently solve the Knapsack Problem by systematically building up the solution through a table of smaller subproblems, ensuring we get the best result without redundant calculations.</li>
          </ol>
        </section>
        <section id="interactive-knapsack">
          <h2>Interactive Knapsack Solver</h2>
          <div className="input-container">
            <input
              type="number"
              value={numItems}
              onChange={handleNumItemsChange}
              placeholder="Enter number of items"
              className="input-field"
            />
            {inputWeights.map((value, index) => (
              <div key={index} className="item-input">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                  placeholder={`Weight of item ${index + 1}`}
                  className="input-field"
                />
                <input
                  type="number"
                  value={inputValues[index]}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  placeholder={`Value of item ${index + 1}`}
                  className="input-field"
                />
              </div>
            ))}
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter knapsack capacity"
              className="input-field"
            />
            <button className="set-button" onClick={handleSetKnapsack}>Set Knapsack</button>
          </div>
          {weights.length > 0 && values.length > 0 && capacity && (
            <KnapsackVisualization weights={weights} values={values} capacity={capacity} />
          )}
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Graph Algorithms Interactive Learning</p>
      </footer>
    </>
  );
}
