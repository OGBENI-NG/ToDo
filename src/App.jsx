
import React, { useState, useEffect, useCallback } from "react";
import { formattedDate } from "../utility";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";

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

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    const newValue = value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
    setInputValue(newValue);
  },[inputValue])

 
  const addToDo = useCallback((id) => {
    const newTodo = { 
      id: generateUniqueId(), 
      text: inputValue, 
      isChecked: false
    }

    setTodoList((prevTodo) => [newTodo, ...prevTodo]);
    setInputValue("");
    setSlicedIn(newTodo);
  },[inputValue, slideIn])

  const toggleTodo = (id) => {
    setTodoList((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  const handleDelete = useCallback((id) => {
    setTodoList((prevTodo) => prevTodo.filter((todo) => todo.id !== id));

  },[todoList])

  

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
    <main className="bg-slate-200 overflow-auto p-5 pt-8 h-screen w-full md:px-10 lg:w4/5 lg:m-auto 
      lg:py-12 lg:px-14 lg:h-screen xl:py-16 xl:px-16 xl:w-full"
    >
      <section className="m-auto lg:w-1/2 lg:h-auto">
        <div className="flex items-baseline justify-between pb-8 ">
          <h1 className="capitalize text-5xl text-green-500 font-headerFont md:text-6xl lg:text-4xl">
            todo
          </h1>
          <h2 
            style={{textShadow: "0px 0px 1px black"}}
            className="text-s tracking-wider text-gray-600 font-semibold md:text-lg lg:text-xs font-mainFont">{formattedDate}</h2>
        </div>

        <section className="flex items-center gap-2 p-0 w-full md:gap-4">
          <input
            type="text"
            name="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type to do here..."
            className="
              border-4 text-gray-600 focus:outline-green-500 
              focus:border-none border-green-500
              bg-slate-200 w-full h-14 rounded-xl p-2 px-3 text-2xl
              md:h-20 md:text-3xl md:px-4 lg:h-12 lg:px-2 lg:text-xl
              lg:rounded-lg lg:border-2
            "
          />
          <button
            disabled={inputValue === "" && true}
            onClick={addToDo}
            className="uppercase h-14 px-4 text-xl rounded-xl 
            font-bold text-white font-mainFont bg-green-500 
            md:h-20 md:text-2xl md:px-10 shadow-md lg:h-12 lg:px-4
            lg:cursor-pointer lg:rounded-lg
            "
          >
            add
          </button>
        </section>
      
        {!todoList.length ? 
          (<h2 className="text-center text-3xl text-green-700 uppercase mt-20 font-headerFont tracking-widest">no todo</h2>
          ):(
          <div className="mt-5 md:mt-10 lg:mt-8">{todoWrapper()}</div>
        )}
      </section>
    </main>
  );
};

export default App;
