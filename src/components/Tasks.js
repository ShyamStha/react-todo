import Task from "./Task"
import { Link } from "react-router-dom"
import CompletedTask from "./CompletedTask"
import FailedTask from "./FailedTask"

const Tasks = ({ tasks, onDelete, onToggle, completeTask, failTask }) => {

    return (
        <>
            <h2>Tasks </h2>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} completeTask={completeTask} failTask={failTask} />
            ))}


        </>
    )
}

export default Tasks;
