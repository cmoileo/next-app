import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { useParams } from 'next/navigation'

const prisma = new PrismaClient()

type ParamsDto = {
    postId: string
}

export async function GET(
    request: Request,
    { params }: { params: ParamsDto }
) {
    const postId = parseInt(params.postId, 10);
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });
    return NextResponse.json({
        status: 200,
        body: post
    });
}

export async function PATCH(
    request: Request,
    { params }: { params: ParamsDto }) {
    const body = await request.json()
    const postId = parseInt(params.postId, 10)
    const createdPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title: body.title,
            content: body.content,
            categoryId: postId
        }
    })
    
    return NextResponse.json({
        status: 201,
        body: createdPost,
    })
}

export async function DELETE(
    request: Request,
    { params }: { params: ParamsDto }) {
    const postId = parseInt(params.postId, 10)
    const deletedPost = await prisma.post.delete({
        where: {
            id: postId
        }
    })

    return NextResponse.json({
        status: 200,
        body: deletedPost,
    })
}