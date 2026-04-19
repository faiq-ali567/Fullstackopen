import { useState } from 'react'


const Anecdote = ({header, anecdote, votes}) => {
  return (
    <div>
      <h1>{header}</h1>
      {anecdote}
      <p>has {votes} votes</p>
    </div>
  );
}

const Button = ({label, onClick}) => {
  return <button onClick={onClick}>{label}</button>;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [famousAnecdote, setFamousAnecdote] = useState(0);
  const [maxVotes, setMaxVotes] = useState(0);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const increaseVotes = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    if (maxVotes < votesCopy[selected]) {
      setMaxVotes(votesCopy[selected]);
      setFamousAnecdote(selected);
    }

    setVotes(votesCopy);
  }

  return (
    <div>
      <Anecdote header="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={() => setSelected(getRandomInt(anecdotes.length))} label="next anecdote" />
      <Button onClick={increaseVotes} label="vote" />
      <Anecdote header="Anecdote with most votes" anecdote={anecdotes[famousAnecdote]} votes={maxVotes} />
    </div>
  )
}

export default App;
