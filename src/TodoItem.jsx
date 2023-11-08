import React from "react";
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";

const TodoItem = ({ todo, onToggle, onDelete, slideIn}) => {
  
  return(
    <div
      onClick={() => onToggle(todo.id)}
      className={`
        ${todo.isChecked ? 'bg-gray-50' : 'bg-green-50'} 
        flex items-start mb-5  p-4 rounded-xl gap-3 md:mb-7 md:py-6 md:px-8 
        ${slideIn && "animate-myAnim"} lg:py-3 lg:px-3
        shadow-md lg:cursor-pointer lg:mb-3
      `}
    >
      <div className="mt-1">
        {todo.isChecked ? (
          <FiCheckCircle className="text-gray-500 text-2xl md:text-4xl lg:text-base" />
        ) : (
          <FiCircle className="text-green-500 text-2xl md:text-4xl lg:text-base" />
        )}
      </div>
      <p
        className={`font-mainFont text-${todo.isChecked ? 'gray-500 line-through' : 'green-500'} text-2xl md:text-4xl lg:text-xl`}
      >
        {todo.text}
      </p>
      {todo.isChecked && (
        <div className="ml-auto">
          <RiDeleteBin5Fill
            className="text-3xl block text-red-500 cursor-pointer md:text-4xl lg:text-xl"
            onClick={() => onDelete(todo.id)}
          />
        </div>
      )}
    </div>
  )
}
export default TodoItem