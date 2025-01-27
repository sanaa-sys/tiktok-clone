import { list } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const { blobs } = await list()
        const videos = blobs
            .filter((blob) => blob.pathname.endsWith(".mp4"))
            .map((blob) => ({
                id: blob.pathname,
                url: blob.url,
                uploadedAt: blob.uploadedAt,
            }))
        return NextResponse.json(videos)
    } catch (error) {
        console.error("Error listing videos:", error)
        return NextResponse.json({ error: "Failed to list videos" }, { status: 500 })
    }
}

