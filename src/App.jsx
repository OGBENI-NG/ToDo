
import React, { useState, useEffect } from "react";
import { formattedDate } from "../utility";
import { v4 as uuidv4 } from "uuid";
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";


const TodoItem = ({ todo, onToggle, onDelete, deleteId}) => (
  <div
    onClick={() => onToggle(todo.id)}
    className={`bg-${todo.isChecked ? 'gray-200' : 'green-50'} flex items-start mb-5  p-4 rounded-xl gap-3  ${deleteId && "animate-myAnim"} text-${todo.isChecked ? 'gray-500 line-through' : 'green-600'} text-2xl`}
   
  >
    <div className="mt-1">
      {todo.isChecked ? (
        <FiCheckCircle className="text-gray-500 text-2xl" />
      ) : (
        <FiCircle className="text-green-600 text-2xl" />
      )}
    </div>
    <p
      className={``}
    >
      {todo.text}
    </p>
    {todo.isChecked && (
      <div className="ml-auto">
        <RiDeleteBin5Fill
          className="text-3xl block text-red-300 cursor-pointer"
          onClick={() => onDelete(todo.id)}
        />
      </div>
    )}
  </div>
);

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState(storeInputValue);
  const [deleteId, setDeleteId] = useState(false);

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
    setDeleteId(true);
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
          deleteId={deleteId}
        />
      ))}
    </>
  );

  return (
    <main className="p-5 pt-8 h-screen w-full">
       <section>
      <div className="flex items-baseline justify-between pb-8 ">
        <h1 className="capitalize text-5xl text-green-600 font-headerFont">
          todo
        </h1>
        <h2 className="text-l text-gray-500 font-semibold">{formattedDate}</h2>
      </div>

      <section className="flex items-center gap-2 p-0 w-full">
        <input
          type="text"
          name="text"
          value={inputValue}
          onChange={handleChange}
          className="border-2 focus:border-none outline-3 focus:ring-green-200 focus:ring focus:outline-green-300 border-gray-300 w-full h-14 
            rounded-xl p-2 px-3 text-2xl"
        />
        <button
          onClick={addToDo}
          className="uppercase h-14 px-4 text-xl rounded-xl font-bold text-white font-mainFont bg-green-600"
        >
          add
        </button>
      </section>
    </section>
      <div className="mt-5">{todoWrapper()}</div>
    </main>
  );
};

export default App;
