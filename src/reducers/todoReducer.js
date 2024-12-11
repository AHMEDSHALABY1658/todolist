import { v4 as uuidv4 } from 'uuid';

export default function Reducer(currentTodos, action) {
    switch (action.type) {
        case "added": {
            const newTodo = {
                id: uuidv4(),
                title: action.payload.newTitle,
                details: "",
                isCopleted: false
            }
            const updatedTods = [...currentTodos, newTodo]
            localStorage.setItem("todos", JSON.stringify(updatedTods))
            return updatedTods;
        }
        default:{
            throw Error("UnKnow Action" + action.type)
        }
    }
    return [];
}