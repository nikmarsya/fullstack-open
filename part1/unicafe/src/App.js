import { useState } from 'react'

const Header = ({text}) => <div><h1>{text}</h1></div>
  
const Button = (props) =><button onClick={props.onClick}>{props.text}</button> 

const StatisticLine = (props) => <tr><td> {props.text}</td><td> {props.value}</td></tr>


const Statistics = (props) =>{
  if(props.good===0 && props.neutral===0 && props.bad===0)
    return(<div>No feedback given</div>)

  const all = props.good + props.neutral + props.bad
  return(
    <table>
      <tbody>
      <StatisticLine text='good' value={props.good} />
      <StatisticLine text='neutral' value={props.neutral} />
      <StatisticLine text='bad' value={props.bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={(props.good-props.bad)/all} />
      <StatisticLine text='positive' value={(props.good/all*100)+' %'} />
      </tbody>
    </table>

  )
}

const App = () =>{
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={handleGood} text='Good' />
      <Button onClick={handleNeutral} text='Neutral' />
      <Button onClick={handleBad} text='Bad' />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App