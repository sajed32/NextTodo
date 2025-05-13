"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), title: newTask, completed: false },
    ]);
    setNewTask("");
    setShowDialog(false);
  };

  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-blue-950">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-2 text-blue-700 dark:text-blue-300">
          Todo App
        </h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow mb-4 transition-colors"
          onClick={() => setShowDialog(true)}
        >
          + Add Task
        </button>
        <ul className="w-full bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700 min-h-[80px]">
          {todos.length === 0 && (
            <li className="p-4 text-center text-gray-400">No tasks yet.</li>
          )}
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between p-4">
              <span
                className={`flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}
                onClick={() => handleComplete(todo.id)}
                style={{ cursor: "pointer" }}
                title="Toggle complete"
              >
                {todo.title}
              </span>
              <div className="flex gap-2">
                <button
                  className={`text-green-600 hover:underline ${todo.completed ? "opacity-60" : ""}`}
                  onClick={() => handleComplete(todo.id)}
                  aria-label="Complete"
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(todo.id)}
                  aria-label="Delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <form
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-80 flex flex-col gap-4"
            onSubmit={handleAddTask}
          >
            <h2 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">
              Add Task
            </h2>
            <input
              className="border rounded px-3 py-2 text-black w-full mb-4"
              type="text"
              placeholder="Task title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                type="button"
                onClick={() => {
                  setShowDialog(false);
                  setNewTask("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-60"
                type="submit"
                disabled={!newTask.trim()}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
