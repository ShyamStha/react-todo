import { Link } from "react-router-dom"
import { useState } from "react"
import { FaTimes } from "react-icons/fa";

const CompletedTask = ({ completedList, handledelete }) => {


    return (
        <>
            <h2>Task Completed</h2>
            <div className="task">
                {completedList.map((task) => {
                    return (
                        <div>
                            <h3>{task.text} <FaTimes
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={() => handledelete(task.id)} />
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

export default CompletedTask;


