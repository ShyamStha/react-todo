import Header from './components/Header'
import Tasks from './components/Tasks'
import React from 'react'
import { useState, useEffect } from "react"
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import CompletedTask from './components/CompletedTask'
import FailedTask from './components/FailedTask'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export const TodoContext = React.CreateContext < any > ({});


export const TodoContextProvider = ({ children }) => {
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

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const completeTask = (taskNameToDelete) => {
    setTasks(tasks.filter((task) => {
      return task = taskNameToDelete
    })
    )
    setCompletedList([...completedList, ...tasks.filter((task) => {
      return task == taskNameToDelete;
    })])

  }


  const failTask = (taskNameToDelete) => {
    setTasks(tasks.filter((task) => {
      return task.text = taskNameToDelete;
    })
    );

    setFailedList([...failedList, ...tasks.filter((task) => {
      return task.text === taskNameToDelete;
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
    <TodoContext.Provider
      value={{
        showAddTask,
        tasks,
        completedList,
        failedList,
        fetchTasks,
        fetchTask,
        addTask,
        handledelete,
        completeTask,
        failTask,
        toggleReminder
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

function App() {




  return (
    <TodoContextProvider>
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
            <Route path='/completedtask' element={<CompletedTask />} />
            <Route path='/failedtask' element={<FailedTask />} />
            <Route path='/about' element={<About />} />
          </Routes>
          < Footer />
        </div>
      </Router>
    </TodoContextProvider>
  );
}

export default App;
