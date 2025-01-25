import mongoose, { Schema } from "mongoose"

const studentSchema = new Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        mobile: { type: String, required: true },
        nationalityNumber: { type: String, required: true, unique: true },
        studentId: { type: String, unique: true,sparse: true },
        gender: { type: String, required: true },
        email: { type: String, required: true },
        birthDate: { type: String, required: true },
        address: { type: String, required: true },
        password: { type: String, required: true },
        course: { type: String, required: true },
        status: { type: String, required: true },
        profileImg: { type: String, default: '/images/avatar.png' },
    },
    { timestamps: true }
)

studentSchema.pre('save', async function(next) {
    if (this.isNew) {
        const lastStudent = await this.constructor.findOne().sort({ studentId: -1 })
        this.studentId = lastStudent ? 
            (parseInt(lastStudent.studentId) + 1).toString() : 
            '10001'
    }
    next()
})

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema)

export default Student
