"use client"

import { useState } from "react"
import type { Todo } from "@/app/page"
import { Trash2, Edit2, Check, X } from "lucide-react"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  return (
    <div className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all hover:border-white/20">
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            todo.completed
              ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-400"
              : "border-white/30 hover:border-white/50"
          }`}
        >
          {todo.completed && <Check size={16} className="text-white" />}
        </button>

        {/* Todo text or edit input */}
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 text-lg transition-all ${todo.completed ? "text-slate-400 line-through" : "text-white"}`}
          >
            {todo.text}
          </span>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all"
                title="Save"
              >
                <Check size={18} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
                title="Cancel"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
