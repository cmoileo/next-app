import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { parse } from "path"

const prisma = new PrismaClient()

export async function GET() {
    const posts = await prisma.post.findMany()
    return NextResponse.json({
        status: 200,
        body: posts,
    })
}

export async function POST(request: Request) {
    const body = await request.json()
    const createdPost = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            categoryId: parseInt(body.categoryId, 10),
            picture: body.picture,
        }
    })
    
    return NextResponse.json({
        status: 201,
        body: createdPost,
    })
}