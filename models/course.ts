import mongoose, { Schema } from "mongoose"

const courseSchema = new Schema(
    {
        course_name: { 
            type: String, 
            required: true 
        },
        course_img: { 
            type: String, 
            required: true 
        },
        course_teachers: [{ 
            type: String, 
            required: true 
        }],
        course_description: { 
            type: String, 
            required: true 
        },
        course_status: { 
            type: String, 
            required: true,
            enum: ['فعال', 'غیرفعال'],
            default: 'active'
        },
    },
    { 
        timestamps: true 
    }
)

// Add indexes for better query performance
courseSchema.index({ course_name: 1 })
courseSchema.index({ course_status: 1 })

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema)

export default Course
