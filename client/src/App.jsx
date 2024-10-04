
import React, { useState } from 'react';
import styles from './index.module.css';
import logo from './assets/Harry-Potter-Logo.png';

function App() {
  const [queryDescription, setQueryDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [answer, setAnswer] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setAnswer('');
    try {
      const result = await generateAnswer(queryDescription);
      setAnswer(result);
    } catch (err) {
      setError('Failed to generate answer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateAnswer = async (queryDescription) => {
    const response = await fetch('http://localhost:3005/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ queryDescription }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate query');
    }

    const data = await response.json();
    return data.result;
  };

  return (
    <main className={styles.main}>
      <img src={logo} alt="Harry Potter Logo" className={styles.logo} />
      <h1>Harry Potter AI</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What question do you have?"
          value={queryDescription}
          onChange={(e) => setQueryDescription(e.target.value)}
        />
        <input type="submit" value="Generate Answer" disabled={isLoading} />
      </form>
      {isLoading && <p>Generating answer...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {answer && (
        <div className={styles.queryOutput}>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </main>
  );
}

export default App;
