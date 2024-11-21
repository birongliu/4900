"use client"

import { useState } from "react"

export function AddMessagePopup({ username }: { username: string }) {
  const [id, setId] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the message to your backend
    if(id.trim() === "") {
        setError("Please enter a valid username.")
        console.log("Please enter a valid id.")
        return;
    }
    if(id.trim() === username) {
        setError("You can't add yourself as a friend.")
        console.log("You can't add yourself as a friend.")
        return;
    }
    setId("")
    setIsOpen(false)
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        +
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add by username</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like to add as friends?
                </label>
                <input
                  id="message"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Type your message here."
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
                <p className="text-xs">By the way your username is: {username} </p>
              </div>
              {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Send Friend Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
