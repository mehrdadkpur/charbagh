import { NextResponse } from "next/server";
import connectToMongodb from "../../../lib/mongodb";
import Blog from "../../../models/blog";

export const dynamic = 'force-static'

export async function POST(request) {
    try {
        await connectToMongodb()
        
        const blogData = await request.json()
        
        // Add current date to the blog data
        const enrichedBlogData = {
            ...blogData,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        
        const newBlog = await Blog.create(enrichedBlogData)
        
        return NextResponse.json({ 
            success: true, 
            message: 'Blog created successfully',
            blog: newBlog 
        }, { status: 201 })
        
    } catch (error) {
        console.error('Blog creation error:', error)
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to create blog'
        }, { status: 500 })
    }
}


export async function GET (){
    await connectToMongodb();
    const blogs = await Blog.find();
    return NextResponse.json({blogs})
}

export async function DELETE (request){
    const id =request.nextUrl.searchParams.get("id");
    await connectToMongodb();
     await Blog.findByIdAndDelete(id);
    return NextResponse.json({message:"Blog Deleted"},{status:200})
}

