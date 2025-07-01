import { useState } from 'react'
import './App.css'

function App() {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const validateDate = async () => {
    if (!day || !month || !year) {
      setError('Please fill in all fields')
      setResult(null)
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('http://localhost:3000/api/validate-date', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: parseInt(day),
          month: parseInt(month),
          year: parseInt(year)
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || 'An error occurred')
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure the backend is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }

  const clearForm = () => {
    setDay('')
    setMonth('')
    setYear('')
    setResult(null)
    setError('')
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">📅 Date Validator</h1>
        <p className="subtitle">Check if your date is valid</p>
        
        <div className="form-container">
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="day">Day</label>
              <input
                id="day"
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="DD"
                className="input"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="month">Month</label>
              <input
                id="month"
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="MM"
                className="input"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="year">Year</label>
              <input
                id="year"
                type="number"
                min="1"
                max="9999"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="YYYY"
                className="input"
              />
            </div>
          </div>

          <div className="button-row">
            <button 
              onClick={validateDate} 
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? '⏳ Validating...' : '✅ Validate Date'}
            </button>
            
            <button 
              onClick={clearForm}
              className="btn btn-secondary"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {error && (
          <div className="result-container error">
            <h3>❌ Error</h3>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className={`result-container ${result.valid ? 'success' : 'invalid'}`}>
            {result.valid ? (
              <>
                <h3>✅ Valid Date!</h3>
                <div className="date-details">
                  <p><strong>Formatted Date:</strong> {result.date.formatted}</p>
                  <p><strong>Day:</strong> {result.date.day}</p>
                  <p><strong>Month:</strong> {monthNames[(result.date.month || 1) - 1]} ({result.date.month})</p>
                  <p><strong>Year:</strong> {result.date.year}</p>
                </div>
              </>
            ) : (
              <>
                <h3>❌ Invalid Date</h3>
                <p>{result.error}</p>
              </>
            )}
          </div>
        )}

        <div className="examples">
          <h3>💡 Examples to try:</h3>
          <div className="example-grid">
            <div className="example-item">
              <strong>Valid:</strong> 29/02/2024 (Leap year)
            </div>
            <div className="example-item">
              <strong>Invalid:</strong> 29/02/2023 (Not a leap year)
            </div>
            <div className="example-item">
              <strong>Invalid:</strong> 31/04/2023 (April has 30 days)
            </div>
            <div className="example-item">
              <strong>Valid:</strong> 31/12/2023 (New Year's Eve)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
