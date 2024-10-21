import { UserProfile } from '@clerk/nextjs'
import React from 'react'

export default function page() {
  return (
    <div className="px-12  py-12 bg-pureWhite w-1/2 lg:rounded-r-xl">
        <div className="flex justify-between">
            <div>
            <h1 className="text-3xl font-bold text-black">Settings</h1>
            <p className="text-gray-400">Update your account settings</p>
            </div>
        </div>
    </div>
  )
}

