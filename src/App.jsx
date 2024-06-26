import React, { useState } from 'react'
import './App.css'

function App() {
  const [gender, setGender] = useState('')
  const [nationality, setNationality] = useState('')
  const [numUsers, setNumUsers] = useState(1)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // This handler function is for fetching users data when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(
        `https://randomuser.me/api/?gender=${gender}&nat=${nationality}&results=${numUsers}`
      )
      const data = await response.json()
      setResults(data.results)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }

    setIsLoading(false)
  }

  return (
    <div className='container'>
      <div className='heading'>
        <h1>Random User Generator</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label>
            Gender:
            <input
              type='text'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </label>
          <label>
            Nationality:
            <input
              type='text'
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            />
          </label>
          <label>
            Number of Users:
            <input
              type='number'
              value={numUsers}
              min={1}
              max={100}
              onChange={(e) => setNumUsers(e.target.value)}
            />
          </label>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Fetching...' : 'Fetch Users'}
          </button>
        </div>
      </form>
      <div className='user-container'>
        <div className='user-data-wrapper'>
          {isLoading && <p>Loading...</p>}
          {results.length > 0 && (
            <React.Fragment>
              <h2>User Data</h2>
              <div className='user-data'>
                {results.map((user, index) => (
                  <div key={index} className='user'>
                    <p>
                      Name: {user.name.first} {user.name.last}
                    </p>
                    <p>Gender: {user.gender}</p>
                    <p>Email: {user.email}</p>
                    <img src={user.picture.large} alt='User-Picture' />
                  </div>
                ))}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
