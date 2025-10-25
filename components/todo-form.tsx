"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"

interface TodoFormProps {
  onAdd: (text: string) => void
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onAdd(input.trim())
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-blue-500/50"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </form>
  )
}
