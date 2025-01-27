"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"

export default function VideoCard({ video }) {
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")

    const handleLike = async () => {
        // In a real app, you'd send this to your API
        setLikes(likes + 1)
    }

    const handleComment = async () => {
        // In a real app, you'd send this to your API
        setComments([...comments, { id: Date.now(), content: newComment }])
        setNewComment("")
    }

    const handleShare = () => {
        // Implement share functionality
        alert("Share functionality to be implemented")
    }

    const handleFavorite = async () => {
        // In a real app, you'd send this to your API
        alert("Video added to favorites!")
    }

    return (
        <div className="border rounded-lg p-4 mb-4">
            <video src={video.url} controls className="w-full mb-4" />
            <div className="flex justify-between items-center mb-4">
                <Button onClick={handleLike} variant="ghost">
                    <Heart className="mr-2" /> {likes}
                </Button>
                <Button
                    onClick={() => setComments((prev) => (prev.length === 0 ? [{ id: 1, content: "First comment" }] : []))}
                    variant="ghost"
                >
                    <MessageCircle className="mr-2" /> {comments.length}
                </Button>
                <Button onClick={handleShare} variant="ghost">
                    <Share2 />
                </Button>
                <Button onClick={handleFavorite} variant="ghost">
                    <Bookmark />
                </Button>
            </div>
            {comments.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-bold mb-2">Comments</h3>
                    {comments.map((comment) => (
                        <p key={comment.id} className="mb-2">
                            {comment.content}
                        </p>
                    ))}
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="border rounded p-2 w-full mb-2"
                    />
                    <Button onClick={handleComment}>Post Comment</Button>
                </div>
            )}
        </div>
    )
}

