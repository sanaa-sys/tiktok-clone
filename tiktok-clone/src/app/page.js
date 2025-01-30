import { auth } from "@clerk/nextjs"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import VideoFeed from "@/components/VideoFeed"
import VideoUpload from "@/components/VideoUpload"
import { list } from "@vercel/blob"

async function getInitialVideos() {
    const { blobs } = await list({
        token: process.env.BLOB_READ_WRITE_TOKEN,
        prefix: "videos/",
        limit: 10,
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

    return Promise.all(videoPromises)
}

export default async function Home() {
    
    const initialVideos = await getInitialVideos()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">TikTok Clone</h1>
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
            <VideoFeed initialVideos={initialVideos} />
            <SignedIn>
                <VideoUpload />
            </SignedIn>
        </main>
    )
}

