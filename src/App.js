import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState, useEffect } from "react"
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CompletedTask from './components/CompletedTask'
import FailedTask from './components/FailedTask'
import { Link } from 'react-router-dom'
import { TodoContext, TodoContextProvider } from './Context'
import { useContext } from 'react'




function App() {
  const {
    showAddTask,
    tasks,
    completedList,
    failedList,
    addTask,
    handledelete,
    completeTask,
    setTasks,
    setShowAddTask,
    setCompletedList,
    setFailedList,
    failTask,
    toggleReminder,
    fetchTasks,
    fetchTask
  } = useContext(TodoContext)

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])


  return (
    <>
      <Router>
        <div className="container">
          <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

          <Routes>
            <Route path='/' exact element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks tasks={tasks} handledelete={handledelete} toggleReminder={toggleReminder} failTask={failTask} completeTask={completeTask} />
                ) : (
                  'No Tasks To Show'
                )}

              </>
            } />
            <Route path='/completedtask' element={<CompletedTask />} />
            <Route path='/failedtask' element={<FailedTask />} />
            <Route path='/about' element={<About />} />
          </Routes>
          <div>
            <h3><Link to="/completedtask">Task Completed</Link></h3>
            <span></span>
            <h3><Link to="/failedtask">Task Failed</Link></h3>
          </div>
          < Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
