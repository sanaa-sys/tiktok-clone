import { list } from "@vercel/blob"

// Function to get recommended videos
export async function getRecommendedVideos(count = 10) {
    try {
        // Fetch all videos from Vercel Blob
        const { blobs } = await list({
            token: process.env.BLOB_READ_WRITE_TOKEN,
        })

        // Filter for video files and map to our desired format
        const videos = blobs
            .filter((blob) => blob.pathname.endsWith(".mp4"))
            .map((blob) => ({
                id: blob.pathname,
                url: blob.url,
                uploadedAt: new Date(blob.uploadedAt),
            }))

        // Sort videos by upload date (most recent first)
        videos.sort((a, b) => b.uploadedAt - a.uploadedAt)

        // Return the most recent 'count' number of videos
        return videos.slice(0, count)
    } catch (error) {
        console.error("Error fetching recommended videos:", error)
        return []
    }
}

// Function to get random videos (fallback if recommendation fails)
export async function getRandomVideos(count = 10) {
    try {
        const { blobs } = await list({
            token: process.env.BLOB_READ_WRITE_TOKEN,
        })
        const videos = blobs
            .filter((blob) => blob.pathname.endsWith(".mp4"))
            .map((blob) => ({
                id: blob.pathname,
                url: blob.url,
                uploadedAt: new Date(blob.uploadedAt),
            }))

        // Shuffle the array
        for (let i = videos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[videos[i], videos[j]] = [videos[j], videos[i]]
        }

        return videos.slice(0, count)
    } catch (error) {
        console.error("Error fetching random videos:", error)
        return []
    }
}

