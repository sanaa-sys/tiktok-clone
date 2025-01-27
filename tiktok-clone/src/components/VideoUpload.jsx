"use client"

import { useState } from "react"
import { put } from "@vercel/blob"
import { Button } from "@/components/ui/button"

export default function VideoUpload() {
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select a file to upload.")
            }

            const file = event.target.files[0]
            const filename = `${Date.now()}-${file.name}`

            // Upload to Vercel Blob
            const { url } = await put(filename, file, {
                access: "public",
            })

            // Refresh the video list (you might want to implement this in your parent component)
            // For now, we'll just log the URL
            console.log("Video uploaded successfully:", url)

            alert("Video uploaded successfully!")
        } catch (error) {
            alert("Error uploading video!")
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="mb-8">
            <label className="button primary block" htmlFor="video">
                {uploading ? "Uploading ..." : "Upload Video"}
            </label>
            <input
                style={{
                    visibility: "hidden",
                    position: "absolute",
                }}
                type="file"
                id="video"
                accept="video/*"
                onChange={handleUpload}
                disabled={uploading}
            />
        </div>
    )
}

