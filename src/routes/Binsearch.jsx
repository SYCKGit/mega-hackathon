import { useState } from "react";
import "../styles.css";

function BinarySearchVisualization({ array, target }) {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(array.length - 1);
  const [mid, setMid] = useState(Math.floor((0 + array.length - 1) / 2));
  const [found, setFound] = useState(false);
  const [steps, setSteps] = useState([]);

  const handleSearchClick = () => {
    const newSteps = [];
    let l = low;
    let h = high;
    let m;
    let t = target;

    while (l <= h) {
      m = Math.floor((l + h) / 2);
      newSteps.push(`Checking middle element at index ${m}, which is ${array[m]}`);
      if (array[m] === t) {
        newSteps.push(`Element ${t} found at index ${m}`);
        setFound(true);
        break;
      } else if (array[m] < t) {
        newSteps.push(`Element ${t} is greater than ${array[m]}, moving right`);
        l = m + 1;
      } else {
        newSteps.push(`Element ${t} is less than ${array[m]}, moving left`);
        h = m - 1;
      }
    }
    if (l > h) {
      newSteps.push(`Element ${t} not found in the array`);
    }

    setLow(l);
    setHigh(h);
    setMid(m);
    setSteps(newSteps);
  };

  return (
    <div>
      <button onClick={handleSearchClick}>Start Binary Search</button>
      <div>
        <h3>Steps:</h3>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
      <div>
        <h3>Array Visualization:</h3>
        <div className="array-container">
          {array.map((num, index) => (
            <div
              key={index}
              className={`array-element ${
                index === mid ? "mid" : index >= low && index <= high ? "range" : ""
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Binsearch() {
  const [numElements, setNumElements] = useState("");
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [inputArray, setInputArray] = useState([]);

  const handleNumElementsChange = (e) => {
    setNumElements(e.target.value);
    setInputArray(Array(Number(e.target.value)).fill(""));
  };

  const handleArrayElementChange = (index, value) => {
    const newArray = [...inputArray];
    newArray[index] = value;
    setInputArray(newArray);
  };

  const handleSetArrayAndTarget = () => {
    const parsedArray = inputArray.map((num) => parseInt(num, 10)).sort((a, b) => a - b);
    setArray(parsedArray);
  };

  return (
    <>
      <header>
        <h1>Binary Search</h1>
      </header>
      <main>
        <section id="binary-search-details">
          <h2>Details</h2>
          <p>
            Binary Search is an efficient algorithm for finding an item from a sorted list of items.
            It works by repeatedly dividing in half the portion of the list that could contain the item,
            until you've narrowed down the possible locations to just one.
          </p>
        </section>
        <section id="interactive-explanation">
          <h2>Interactive Explanation</h2>
          <div className="step">
            <h3>Step 1: Initial Setup</h3>
            <p>Start with the entire array and calculate the middle index.</p>
          </div>
          <div className="step">
            <h3>Step 2: Compare Middle Element</h3>
            <p>Compare the middle element with the target value.</p>
          </div>
          <div className="step">
            <h3>Step 3: Adjust Range</h3>
            <p>Adjust the range based on the comparison result and repeat until the element is found or the range is empty.</p>
          </div>
        </section>
        <section id="binary-search-visualizer">
          <h2>Binary Search Visualizer</h2>
          <div>
            <input
              type="number"
              value={numElements}
              onChange={handleNumElementsChange}
              placeholder="Enter number of elements"
            />
            {inputArray.map((value, index) => (
              <input
                key={index}
                type="number"
                value={value}
                onChange={(e) => handleArrayElementChange(index, e.target.value)}
                placeholder={`Element ${index + 1}`}
              />
            ))}
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter target value"
            />
            <button onClick={handleSetArrayAndTarget}>Set Array and Target</button>
          </div>
          {array.length > 0 && target && (
            <BinarySearchVisualization array={array} target={parseInt(target, 10)} />
          )}
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Graph Algorithms Interactive Learning</p>
      </footer>
    </>
  );
}
