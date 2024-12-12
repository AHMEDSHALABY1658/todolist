import { createContext , useReducer,useContext } from "react";
import todosReducer from '../reducers/todoReducer'

export const TodosContext = createContext([])
const TodosProvider = ({children}) =>{
    const [todos,TodosDispatch] = useReducer(todosReducer,[])
return(
    <TodosContext.Provider value={{todos:todos,dispatch:TodosDispatch}}>
        {children}
    </TodosContext.Provider>
)
}



export const useTodos =()=>{
    return  useContext(TodosContext)
}
export  default TodosProvider;




