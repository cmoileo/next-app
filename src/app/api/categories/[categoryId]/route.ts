import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type ParamsDto = {
    categoryId: string
}

export async function GET(
    request: Request,
    { params }: { params: ParamsDto }
) {
    const postId = parseInt(params.categoryId, 10);
    const category = await prisma.category.findUnique({
        where: {
            id: postId
        }
    });
    return NextResponse.json({
        status: 200,
        body: category
    });
}

export async function DELETE(
    request: Request,
    { params }: { params: ParamsDto }) {
    const body = await request.json()
    const categoryId = body.id
    const deletedCategory = await prisma.category.delete({
        where: {
            id: categoryId
        }
    })

    return NextResponse.json({
        status: 200,
        body: `Category ${categoryId} deleted`,
    })
}

export async function PATCH(
    request: Request,
    { params }: { params: ParamsDto }) {
    const body = await request.json()
    const categoryId = body.id
    const upddatedCategory = await prisma.category.update({
        where: {
            id: categoryId
        },
        data: {
            name: body.name
        }
    })

    return NextResponse.json({
        status: 200,
        body: upddatedCategory,
    })
}