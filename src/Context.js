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
import React from 'react'

export const TodoContext = React.createContext();

export const TodoContextProvider = ({ children }) => {


    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])
    const [completedList, setCompletedList] = useState([])
    const [failedList, setFailedList] = useState([])

    // Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:3001/tasks')

        const data = await res.json()
        return data
    }

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
        <TodoContext.Provider
            value={{
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
            }}>
            {children}
        </TodoContext.Provider>
    )
}