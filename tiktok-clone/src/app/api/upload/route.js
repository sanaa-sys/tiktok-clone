import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get("filename")

    const body = request.body || ""
    const blob = await put(filename, body, { access: "public" })

    return NextResponse.json(blob)
}

