import logo from './logo.svg';
import './App.css';
import Todolist from './Componets/Todolist'
import { TodosContext } from './contexts/TodosContext';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import MySnackBar from './Componets/MySnackBar';
import { ToastProvider } from './contexts/ToastContext';


const initialTodos = [
  {
    id: uuidv4(),
    title: "fasdfaf",
    details: "fdafaf",
    isCopleted: false
  }

]



function App() {
  const [todos, setTodos] = useState(initialTodos)



  return (
    <div className="App">
      <TodosContext.Provider value={{ todos, setTodos }}>
        <ToastProvider >
      
          <Todolist />
        </ToastProvider>
      </TodosContext.Provider>
    </div>
  );
}

export default App;
