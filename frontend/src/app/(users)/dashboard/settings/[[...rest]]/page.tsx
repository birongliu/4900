"use client"
import { useUser } from '@clerk/nextjs'

const ViewProfile = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  if (!isLoaded || !isSignedIn) {
    return null
  }

  console.log(user)

  return (
    <div className="container mx-auto">
      
    </div>
  )
}

export default ViewProfile