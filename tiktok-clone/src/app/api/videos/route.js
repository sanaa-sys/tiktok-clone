import { list } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const VIDEOS_PER_PAGE = 10

    try {
        const { blobs } = await list({
            token: process.env.BLOB_READ_WRITE_TOKEN,
            prefix: "videos/",
            limit: VIDEOS_PER_PAGE,
            offset: (page - 1) * VIDEOS_PER_PAGE,
        })

        const videoPromises = blobs
            .filter((blob) => blob.pathname.endsWith(".mp4"))
            .map(async (blob) => {
                const metadataBlob = blobs.find((b) => b.pathname === `${blob.pathname}.metadata`)
                let metadata = {}
                if (metadataBlob) {
                    const metadataResponse = await fetch(metadataBlob.url)
                    metadata = await metadataResponse.json()
                }
                return {
                    id: blob.pathname,
                    url: blob.url,
                    ...metadata,
                }
            })

        const videos = await Promise.all(videoPromises)
        return NextResponse.json(videos)
    } catch (error) {
        console.error("Error fetching videos:", error)
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
    }
}

