
import React, { useState, useEffect } from "react";
import { formattedDate } from "../utility";
import { v4 as uuidv4 } from "uuid";
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";


const TodoItem = ({ todo, onToggle, onDelete, slideIn}) => {
  
  return(
    
    <div
      onClick={() => onToggle(todo.id)}
      className={`${todo.isChecked ? 'bg-gray-100' : 'bg-green-50'} flex items-start mb-5  p-4 rounded-xl gap-3  ${slideIn && "animate-myAnim"}`}
     
    >
      <div className="mt-1">
        {todo.isChecked ? (
          <FiCheckCircle className="text-gray-500 text-2xl" />
        ) : (
          <FiCircle className="text-green-700 text-2xl" />
        )}
      </div>
      <p
        className={`text-${todo.isChecked ? 'gray-500 line-through' : 'green-700'} text-2xl`}
      >
        {todo.text}
      </p>
      {todo.isChecked && (
        <div className="ml-auto">
          <RiDeleteBin5Fill
            className="text-3xl block text-red-500 cursor-pointer"
            onClick={() => onDelete(todo.id)}
          />
        </div>
      )}
    </div>
    
  )
};

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState(storeInputValue);
  const [slideIn, setSlicedIn] = useState(null)


  function storeInputValue() {
    const storeInput = localStorage.getItem("todoList");
    return storeInput ? JSON.parse(storeInput) : [];
  }

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const generateUniqueId = () => {
    return uuidv4();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const newValue = value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
    setInputValue(newValue);
  };

  const addToDo = () => {
    const newTodo = { id: generateUniqueId(), text: inputValue, isChecked: false };
    setTodoList((prevTodo) => [newTodo, ...prevTodo]);
    setInputValue("");
    setSlicedIn(newTodo);
  };

  const toggleTodo = (id) => {
    setTodoList((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodoList((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
    
  };
  

  const todoWrapper = () => (
    <>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={handleDelete}
          slideIn={slideIn}
        />
      ))}
    </>
  );

  return (
    <main className="p-5 pt-8 h-screen w-full">
       <section>
      <div className="flex items-baseline justify-between pb-8 ">
        <h1 className="capitalize text-5xl text-green-700 font-headerFont">
          todo
        </h1>
        <h2 className="text-xs tracking-wider text-gray-400 font-semibold">{formattedDate}</h2>
      </div>

      <section className="flex items-center gap-2 p-0 w-full bg-slate-50">
        <input
          type="text"
          name="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type here..."
          className="border-2 text-gray-500 focus:outline-green-600 focus:border-4 focus:border-none border-gray-300 bg-gray-50 w-full h-14 rounded-xl p-2 px-3 text-2xl"
        />
        <button
          onClick={addToDo}
          className="uppercase h-14 px-4 text-xl rounded-xl font-bold text-white font-mainFont bg-green-700"
        >
          add
        </button>
      </section>
    </section>
      {!todoList.length ? 
        (<h2 className="text-center text-xl text-green-700 uppercase mt-20 font-headerFont tracking-widest">no todo</h2>
        ):(
        <div className="mt-5">{todoWrapper()}</div>
      )}
    </main>
  );
};

export default App;
