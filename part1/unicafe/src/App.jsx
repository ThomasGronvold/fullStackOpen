import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total, average, possitive }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={possitive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const possitive = (good / total) * 100;

  const addGood = () => {
    setGood(good + 1);
  };

  const addNeutral = () => {
    setNeutral(neutral + 1);
  };

  const addBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={() => addGood()} />
      <Button text="neutral" handleClick={() => addNeutral()} />
      <Button text="bad" handleClick={() => addBad()} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} possitive={possitive} />
    </div>
  );
};

export default App;
