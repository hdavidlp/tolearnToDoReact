import React from 'react'
import { ToDoItem } from './ToDoItem'

export function ToDoList({ToDos, toggleToDo}) {
  return (
    <ul>
        {ToDos.map((todo)=>(
            <ToDoItem key={todo.id} todo={todo} toggleToDo={toggleToDo}/>
        ))}
    </ul>
  )
}
