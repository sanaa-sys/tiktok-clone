"use client"

import { useState } from "react"
import { put } from "@vercel/blob"
import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function VideoUpload() {
    const [uploading, setUploading] = useState(false)
    const { userId } = useAuth()
    const router = useRouter()

    const handleUpload = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select a file to upload.")
            }

            const file = event.target.files[0]
            const filename = `videos/${Date.now()}-${file.name}`

            // Upload video to Vercel Blob
            const { url } = await put(filename, file, {
                access: "public",
                token: process.env.BLOB_READ_WRITE_TOKEN,
            })

            // Store video metadata in Vercel Blob
            const metadata = JSON.stringify({
                userId,
                title: file.name,
                createdAt: new Date().toISOString(),
            })

            await put(`${filename}.metadata`, metadata, {
                access: "public",
                token: process.env.BLOB_READ_WRITE_TOKEN,
            })

            alert("Video uploaded successfully!")
            router.refresh() // Refresh the page to update the video feed
        } catch (error) {
            alert("Error uploading video!")
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="mb-8 mt-8">
            <Button onClick={() => document.getElementById("fileInput").click()} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Video"}
            </Button>
            <input
                id="fileInput"
                type="file"
                accept="video/*"
                onChange={handleUpload}
                disabled={uploading}
                style={{ display: "none" }}
            />
        </div>
    )
}

