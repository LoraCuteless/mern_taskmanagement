import { TasksContext } from "../context/TaskContext"
import { useContext } from "react"

export const useTasksContext = ()=>{
    const context = useContext(TasksContext)

    if (!context){
        throw Error('useTasksContext must be inside an TaskContextProvider')
    }
    
    return context
}