import React, { useState } from 'react';
import './App.css';

//Username & Password Container
const Details = () => {
  return(
    <div className='details'>
        <h1 >Username: admin</h1>
        <p>Password: password</p>
      </div>
  )
}

// Login Component
const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    // if (username === "") {
    //   setError("Please fill Username")
    //   return;
    // }
    // if (password === "") {
    //   setError("Please fill Password")
    //   return;
    // }

    // Mock authentication
    if (username === 'admin' && password === 'password') {
      handleLogin(username);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// Jokes Component
const Jokes = () => {
  const [jokes, setJokes] = useState([]);

  const fetchJokes = async () => {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=en&amount=10');
      const data = await response.json();
      setJokes(data.jokes);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  return (
    <div className="jokes">
      <h2>Jokes </h2>
      <button onClick={fetchJokes}>Get Jokes</button>
      <table>
        <thead>
          <tr>
            <th>Joke</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((joke, index) => (
            <tr key={index}>
              <td>{joke.joke}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div>
        <Details />
        <Login handleLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h1>Welcome, {username}!</h1>
          <Jokes />
        </div>
      )}
    </div>
  );
};

export default App;

