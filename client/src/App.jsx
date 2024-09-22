import styles from "./index.module.css"
import React from 'react'
import logo from "/Users/dhruvsharma/Library/CloudStorage/OneDrive-Personal/University/Projects/Full_Stack_AI/client/src/assets/Harry-Potter-Logo.png";
import { useState } from "react";

function App() {
  const [queryDescription, setQueryDescription] = useState('');
  const [query, setQuery] = useState('');

  const onSubmit = async(e) => {
    e.preventDefault();
    console.log(queryDescription);
    const query = await generateQuery();
    setQuery(query);
  }

  const generateQuery = async() => {
    const response = await fetch("http://localhost:3005/generate",{
      method:"POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({queryDescription: queryDescription})
    });

    const data = await response.json();

    return data.answer;
  }

  return (
    <main className={styles.main}>
      <img src={logo} alt="Harry Potter Logo" className={styles.logo} />
      <h1> Harry Potter AI </h1> 
      <form onSubmit = {onSubmit}>
          <input type="text"
          name = "query description"
          placeholder = "What question do you have?"
          onChange = {(e) => setQueryDescription(e.target.value)}/>

          <input type = "submit" value = "Generate Answer"/>
      </form>
      {query && <div className={styles.queryOutput}>
        <h2>Answer:</h2>
        <p>{query}</p>
        
      </div>}
    </main>
    
  )
}
export default App