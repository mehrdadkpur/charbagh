import connectToMongodb from "@/lib/mongodb";
import Blog from '../../../../models/blog'
import { NextResponse , NextRequest } from "next/server";
import path from 'path'
import fs from 'fs/promises';

interface RouteSegment {
    params: Promise<{
        id: string
    }>
}
  

export async function PUT(request:NextRequest, { params }:RouteSegment) {
    const { id } = await params
    const body = await request.json()

    try {
        await connectToMongodb()
        const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true })

        if (!updatedBlog) {
            return new Response('Blog Not Found', { status: 404 })
        }

        return new Response(JSON.stringify(updatedBlog), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Something Went Wrong", { status: 500 })
    }
}

export const GET = async (request:NextRequest , {params}:RouteSegment)=>{
    const {id} = await params;
    try {
        await connectToMongodb();
        const blog = await Blog.findById(id);
        if(!blog)return new Response('Blog Not Found' , {status:404})
        return new Response(JSON.stringify(blog),{status:200});  
    } catch (error) {
        console.log(error)
        return new Response("Somthing Went Wrong" , {
            status:500
        })
    }
}

export async function DELETE(request:NextRequest, { params }:RouteSegment) {
    const {id} = await params;
    try {
        await connectToMongodb()
        
        const blog = await Blog.findById(id)
        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 })
        }

        // Extract image path from URL
        const imageUrl = blog.blog_img
        const relativePath = imageUrl.replace('/uploads/images/blogs', '')
        const absolutePath = path.join(process.cwd(), 'public/uploads/images/blogs', relativePath)

        // Delete image file
        try {
            await fs.unlink(absolutePath)
        } catch (fileError) {
            console.log('File deletion error:', fileError)
        }
        
        // Delete blog from database
        await Blog.findByIdAndDelete(id)

        return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 })
    } catch (error) {
        console.log('Delete error:', error)
        return NextResponse.json({ message: 'Failed to delete Blog' }, { status: 500 })
    }
}
