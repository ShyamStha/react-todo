import { FaCheck } from 'react-icons/fa'
import Timer from './Timer';

const Task = ({ task, onDelete, onToggle, completeTask, failTask }) => {
    let time = task.time
    console.log(time)
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FaCheck
                style={{ color: 'green', cursor: 'pointer' }}
                onClick={() => completeTask()} />
            </h3>
            <h5> {task.time} minute <Timer time={time} failTask={failTask} /></h5>

        </div>
    )
}

export default Task;
