"use client"

import { useState, useEffect } from "react"
import VideoCard from "./VideoCard"
import { getRecommendedVideos, getRandomVideos } from "../utils/recommendationSystem"

export default function VideoFeed() {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true)
                let recommendedVideos = await getRecommendedVideos()

                // If we don't have enough recommended videos, pad with random videos
                if (recommendedVideos.length < 10) {
                    const randomVideos = await getRandomVideos(10 - recommendedVideos.length)
                    recommendedVideos = [...recommendedVideos, ...randomVideos]
                }

                setVideos(recommendedVideos)
            } catch (err) {
                console.error("Error fetching videos:", err)
                setError("Failed to load videos. Please try again later.")

                // Fallback to random videos if there's an error
                const randomVideos = await getRandomVideos()
                setVideos(randomVideos)
            } finally {
                setLoading(false)
            }
        }

        fetchVideos()
    }, [])

    if (loading) return <div className="text-center py-4">Loading videos...</div>
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    )
}

