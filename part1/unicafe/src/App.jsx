import { useState } from 'react'

const Statistics = (props) => {
  const {good, neutral, bad, all} = props
  return (
    <div>
      <h1>statistics</h1>
      <p>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}<br />
        all {all}<br />
        average {(good - bad) / all}<br />
        positive {(good / all) * 100} %<br />
      </p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)    
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <p>
          <button onClick={handleGoodClick}>good</button>
          <button onClick={handleNeutralClick}>neutral</button>
          <button onClick={handleBadClick}>bad</button>
        </p>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </>
  )
}

export default App