import { useState } from 'react'

const Header = ({header}) => {
  return <h1 className="me-3">{header}</h1>;
}

const FeedbackButton = ({feedback, setFeedback}) => {
  return <button onClick={setFeedback}>{feedback}</button>
}

const StatisticLine = ({label, value}) => {
  return (
    <tr>
      <td>
        {label}
      </td>
      <td>
        {value}
      </td>
    </tr>
  );
}

const Statistics = ({good, bad, neutral, all, totalScore}) => {
  if (!all) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return(
    <div className="mt-3">
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine label="good" value={good} />
          <StatisticLine label="neutral" value={neutral} />
          <StatisticLine label="bad" value={bad} />
          <StatisticLine label="all" value={all} />
          <StatisticLine label="average" value={totalScore / all} />
          <StatisticLine label="positive" value={good/all * 100} />
        </tbody>
      </table>
    </div>
  );
}



const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const setState = (setFeedback, feedback, score) => {
    setFeedback(feedback + 1);
    setAll(all + 1);
    setTotalScore(totalScore + score);
  }

  return (
    <div>
      <Header header = 'give feedback'/>
      <FeedbackButton feedback={'good'} setFeedback={() => setState(setGood, good, 1)} />
      <FeedbackButton feedback={'neutral'} setFeedback={() => setState(setNeutral, neutral, 0)} />
      <FeedbackButton feedback={'bad'} setFeedback={() => setState(setBad, bad, -1)} />
      <Statistics good={good} bad={bad} neutral={neutral} all={all} totalScore={totalScore} />
    </div>
  );
}

export default App;