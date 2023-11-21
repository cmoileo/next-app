import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
    const categories = await prisma.category.findMany()
    return NextResponse.json({
        status: 200,
        body: categories,
    })
}

export async function POST(request: Request) {
    const body = await request.json()
    const createdCategory = await prisma.category.create({
        data: {
            name: body.name
        }}
    )
    
    return NextResponse.json({
        status: 201,
        body: createdCategory,
    })
}