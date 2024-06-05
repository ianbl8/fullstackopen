import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)    
  }

  const handleBadClick = () => {
    setBad(bad + 1)
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
      <div>
        <h1>statistics</h1>
        <p>
          good {good}<br />
          neutral {neutral}<br />
          bad {bad}<br />
        </p>
      </div>
    </>
  )
}

export default App