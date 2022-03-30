import React, {Fragment, useState, useRef, useEffect} from "react";
import {v4 as uuidv4} from 'uuid'
import {ToDoList} from "./components/ToDoList";

const KEY = "todoApp.todos";

export function App(){
    const[todos, setTodos] = useState([
        {id:1, task: "Tarea Inicial", completed:false},
    ])

    const todoTaskRef = useRef();

    useEffect(()=>{
        const storedTodos =JSON.parse(localStorage.getItem(KEY));
        if(storedTodos){
            setTodos(storedTodos);
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem(KEY, JSON.stringify(todos));
    },[todos]);



    const toggleToDo = (id)=>{
        const newTodos= [...todos]
        const todo = newTodos.find((todo)=>todo.id===id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }


    const handleToDoAdd= () =>{
        const task =todoTaskRef.current.value;

        if(task==="") return;

        setTodos((prevToDos)=>{
            return [...prevToDos, {id:uuidv4(), task, completed:false}]
        })

        todoTaskRef.current.value = null;

    };

    const handleClearAll = () =>{
        const newTodos = todos.filter((todo)=>!todo.completed);
        setTodos(newTodos);

    }


    return (
        <Fragment>
            <ToDoList ToDos={todos} toggleToDo={toggleToDo}/>
            <input ref={todoTaskRef} type="text" placeholder ="Nueva Tarea" />
            <button onClick={handleToDoAdd} >➕</button>
            <button onClick={handleClearAll}>🗑</button>
            <div> Te quedan {todos.filter((todo)=>!todo.completed).length} tareas por terminar</div>
        </Fragment>
        
    
    );
}



