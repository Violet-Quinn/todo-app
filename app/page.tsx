"use client"

import { useState, useEffect } from "react"
import TodoForm from "@/components/todo-form"
import TodoList from "@/components/todo-list"

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load todos from localStorage on mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem("todos")
      if (savedTodos) {
        try {
          setTodos(JSON.parse(savedTodos))
        } catch (error) {
          console.error("Failed to parse todos:", error)
        }
      }
      setIsLoaded(true)
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos, isLoaded])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos([newTodo, ...todos])
  }

  const updateTodo = (id: string, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-balance">My Tasks</h1>
          <p className="text-slate-400 text-lg">
            {completedCount} of {todos.length} completed
          </p>
        </div>

        {/* Main container with frosted glass effect */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <TodoForm onAdd={addTodo} />
          <TodoList todos={todos} onToggle={toggleTodo} onUpdate={updateTodo} onDelete={deleteTodo} />
        </div>
      </div>
    </main>
  )
}
