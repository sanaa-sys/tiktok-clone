import { cookies } from "next/headers"
import VideoFeed from "@/components/VideoFeed"
import VideoUpload from "@/components/VideoUpload"
import Auth from "@/components/Auth"

export default async function Home() {
    // Mock session check
    const mockSession = true // or false to test both states

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold mb-8">TikTok Clone</h1>
            {mockSession ? (
                <>
                    <VideoUpload />
                    <VideoFeed />
                </>
            ) : (
                <Auth />
            )}
        </main>
    )
}

