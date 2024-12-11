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

        case "deleted": {
            const updatedTodos = currentTodos.filter((t) => {
                return t.id != action.payload.id
            })
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos
        }

        case "updated": {
            const updatedTodosList = currentTodos.map((t) => {
                if (t.id === action.payload.id) {
                    return { ...t, title: action.payload.title, details: action.payload.details };
                }
                return t;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodosList))
            return updatedTodosList
        }

        case "get": {
            const storageTodos = JSON.parse(localStorage.getItem("todos"));
            if (storageTodos) {
            return storageTodos
            } else {
                return []
            // إذا لم يكن هناك بيانات، اجعلها قائمة فارغة
            }
        }
        default: {
            throw Error("UnKnow Action" + action.type)
        }
    }
    return [];
}