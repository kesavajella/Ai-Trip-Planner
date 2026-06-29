"use client"

import * as React from "react"
import { ChevronDown, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface CityComboboxProps {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  label?: string
}

export function CityCombobox({
  value,
  onChange,
  options,
  placeholder = "Search or select a city...",
  label = "What is destination of choice?",
}: CityComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(value)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setInputValue(value)
  }, [value])

  const filtered = React.useMemo(() => {
    const q = inputValue.trim().toLowerCase()
    if (!q) return options.slice(0, 20)
    return options.filter((o) => o.toLowerCase().includes(q)).slice(0, 20)
  }, [inputValue, options])

  const handleSelect = (option: string) => {
    onChange(option)
    setInputValue(option)
    setIsOpen(false)
    setActiveIndex(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true)
        setActiveIndex(0)
        e.preventDefault()
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setActiveIndex((prev) => (prev + 1) % filtered.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
        break
      case "Enter":
        e.preventDefault()
        if (filtered[activeIndex]) {
          handleSelect(filtered[activeIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setActiveIndex(0)
        break
    }
  }

  return (
    <div className="relative w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setIsOpen(true)
            setActiveIndex(0)
            onChange(e.target.value)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            setTimeout(() => setIsOpen(false), 150)
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pr-10 text-sm",
            "placeholder:text-gray-400",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          )}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => {
            setIsOpen(!isOpen)
            if (!isOpen) inputRef.current?.focus()
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>
      </div>

      {isOpen && (
        <ul
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
          onMouseLeave={() => setActiveIndex(-1)}
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gray-500">No results found.</li>
          ) : (
            filtered.map((option, index) => (
              <li
                key={option}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "cursor-pointer px-4 py-2.5 text-sm text-gray-900 transition-colors",
                  index === activeIndex ? "bg-blue-50" : "hover:bg-blue-50"
                )}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
