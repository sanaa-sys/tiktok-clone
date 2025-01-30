"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useAuth } from "@clerk/nextjs"

export default function VideoCard({ video }) {
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const { userId } = useAuth()

    const handleLike = async () => {
        if (!userId) return alert("Please log in to like videos")
        setLikes(likes + 1)
        // In a real app, you'd update this in your database
    }

    const handleComment = async () => {
        if (!userId) return alert("Please log in to comment")
        if (!newComment.trim()) return

        const newCommentObj = { id: Date.now(), content: newComment, userId }
        setComments([...comments, newCommentObj])
        setNewComment("")
        // In a real app, you'd save this comment to your database
    }

    const handleShare = () => {
        // Implement share functionality
        alert("Share functionality to be implemented")
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
            </div>
            {comments.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-bold mb-2">Comments</h3>
                    {comments.map((comment) => (
                        <p key={comment.id} className="mb-2">
                            {comment.content}
                        </p>
                    ))}
                </div>
            )}
            <div className="mt-4">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="border rounded p-2 w-full mb-2"
                />
                <Button onClick={handleComment}>Post Comment</Button>
            </div>
        </div>
    )
}

