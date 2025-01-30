"use client"
import { useState } from "react"
import VideoCard from "./VideoCard"

const VIDEOS_PER_PAGE = 10

export default function VideoFeed({ initialVideos }) {
    const [videos, setVideos] = useState(initialVideos)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)

    const fetchMoreVideos = async () => {
        try {
            setLoading(true)
            setError(null)

            const nextPage = page + 1
            const response = await fetch(`/api/videos?page=${nextPage}`)
            if (!response.ok) {
                throw new Error("Failed to fetch more videos")
            }
            const newVideos = await response.json()

            if (newVideos.length > 0) {
                setVideos((prevVideos) => [...prevVideos, ...newVideos])
                setPage(nextPage)
            }
        } catch (err) {
            console.error("Error fetching more videos:", err)
            setError("Failed to load more videos. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    if (error) return <div className="text-center py-4 text-red-500">{error}</div>

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
            {loading && <div className="text-center py-4 ">Loading more videos...</div>}
            {!loading && videos.length > 0 && (
                <button
                    onClick={fetchMoreVideos}
                    className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 mb-4"
                >
                    Load More
                </button>
            )}
        </div>
    )
}

