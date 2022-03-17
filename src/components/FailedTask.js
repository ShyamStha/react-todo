import { Link } from "react-router-dom"
import { FaRedoAlt } from "react-icons/fa";
import { useContext } from "react";
import { TodoContext } from "../Context";

const FailedTask = () => {

    const { task, failedList, onAdd, handledelete } = useContext(TodoContext)

    return (
        <>
            <h2>Failed Task</h2>
            <div className="task">
                {failedList.map((task) => {
                    return (
                        <div>
                            <h3>{task.text} <FaRedoAlt
                                style={{ color: 'green', cursor: 'pointer' }}
                                onClick={() => console.log("Delete")}
                            />
                            </h3>
                            <h5> {task.time} minute </h5>
                        </div>
                    )
                })}
            </div>
            <Link to='/'>Go Back</Link>
        </>

    )
};

export default FailedTask;
