"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Auth() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = async (e) => {
        e.preventDefault()
        // Mock sign up
        console.log("Sign up with:", email, password)
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        // Mock sign in
        console.log("Sign in with:", email, password)
    }

    const handleSignOut = async () => {
        // Mock sign out
        console.log("Sign out")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSignUp} className="mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-2 p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-2 p-2 border rounded"
                />
                <Button type="submit">Sign Up</Button>
            </form>
            <form onSubmit={handleSignIn} className="mb-4">
                <Button type="submit">Sign In</Button>
            </form>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    )
}

