import React from 'react'
import CalendarTask1 from './components/CalendarTask1'
import CalendarTask2 from './components/CalendarTask2'
import './App.css';

function App() {

  return (
    <div className="app-container">
      <div className="task">
        <h2 className="task-title">Task 1 - Current Month Date Range</h2>
        <CalendarTask1 />
      </div>
      <div className="task">
        <h2 className="task-title">Task 2 - Cross Months Date Range</h2>
        <CalendarTask2 />
      </div>
    </div>
  )
}

export default App
