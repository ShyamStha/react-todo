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

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [completedList, setCompletedList] = useState([])
  const [failedList, setFailedList] = useState([])


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3001/tasks')

    const data = await res.json()
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`)

    const data = await res.json()
    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),

    })

    const data = await res.json()

    setTasks([...tasks, data])


    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])


  }

  const handledelete = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    })

    setCompletedList(tasks.filter((task) => task.id !== id))
  }

  const completeTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))

    setCompletedList([...completedList, ...tasks.filter((task) => {
      return task.id === id;
    })])

  }


  const failTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))

    setFailedList([...failedList, ...tasks.filter((task) => {
      return task.id === id;
    })])
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task, reminder:
            data.reminder
        } : task
      )
    )
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Routes>
          <Route path='/' exact element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={handledelete} onToggle={toggleReminder} failTask={failTask} completeTask={completeTask} />
              ) : (
                'No Tasks To Show'
              )}

            </>
          } />
          <Route path='/completedtask' element={<CompletedTask completedList={completedList} handledelete={handledelete} />} />
          <Route path='/failedtask' element={<FailedTask failedList={failedList} />} />
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
  );
}

export default App;
