import { useEffect, useState } from "react"

import TaskForm from "../components/TaskForm"

const Home =()=>{

    const [workout, setWorkout] = useState(null)

    useEffect(()=>{
        const fetchWorks = async ()=>
            {
                const response = await fetch('/api/workout')
                const json = await response.json()

                if (response.ok){
                    setWorkout(json)
                }
            }
        fetchWorks()
    },[])

    return(
        <div className="home">
            <div className="workouts">
                {workout && workout.map((workouts)=>(
                    <p key={workouts.id}>{workouts.title}</p>

                ))}
            </div>
            <TaskForm />
        </div>
    )
}

export default Home