import { useState, useEffect } from 'react';
import './timer.css'

const Timer = ({ task, time, failTask }) => {
    const [seconds, setSeconds] = useState(60)
    const [minutes, setMinutes] = useState(time - 1)

    /* any useeffect gets called one time in intial render */
    useEffect(() => {
        console.log(minutes, seconds);
        setTimeout(() => {
            if (minutes == 0 && seconds == 0) {
                setMinutes(0)
                setSeconds(0)
                console.log("hello")
                console.log(task.id)
                failTask(task.id)
            } else if (minutes > 0 && seconds == 0) {
                setMinutes(prevMinutes => prevMinutes - 1)
                setSeconds(59)
            } else {
                setSeconds(prevSeconds => prevSeconds - 1)
            }
        }, 1000);


    }, [minutes, seconds]);


    const restart = () => {
        setSeconds(60);
        setMinutes(time - 1);
    }

    const stop = () => {
        clearInterval(setTimeout);
    }

    return (
        <div >
            <span>{minutes}:{seconds}</span>
            <button onClick={restart}>Restart</button>
            <span>       </span>
            <button onClick={stop}>Stop</button>
        </div>

    )
}
export default Timer;
