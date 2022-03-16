import Task from "./Task"
import { useState } from "react"
import { Link } from "react-router-dom"
import CompletedTask from "./CompletedTask"
import FailedTask from "./FailedTask"

const Tasks = ({ tasks, onDelete, onToggle, completeTask, failTask }) => {
    const [completedList, setCompletedList] = useState([])
    const [failedList, setFailedList] = useState([])

    return (
        <>
            <h2>Tasks </h2>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} completeTask={completeTask} failtask={failTask} />
            ))}
            <h3><Link to="/completedtask">Task Completed</Link></h3>
            <div className="task">
                <p>Completed Tasks</p>
                {completedList.map((task) => {
                    return (
                        <div>
                            <p>{task.text}</p>
                        </div>
                    )
                })}
            </div>
            <span>     </span>
            <h3><Link to="/failedtask">Backlog</Link></h3>
            <div className="task">
                <p>Failed Tasks</p>
                {failedList.map((task) => {
                    return (
                        <div>
                            <p>{task.text}</p>
                        </div>
                    )
                })}
            </div>

        </>
    )
}

export default Tasks;
