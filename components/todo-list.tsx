"use client"

import type { Todo } from "@/app/page"
import TodoItem from "./todo-item"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onUpdate: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export default function TodoList({ todos, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">No tasks yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  )
}
