import mongoose, { Schema, Document } from "mongoose"

interface ITeacher extends Document {
    firstname: string
    lastname: string
    mobile: string
    nationalityNumber: string
    teacherId?: string
    gender: string
    email: string
    birthDate: string
    registryDate: string
    address: string
    password: string
    skill: string
    status: string
    isAdmin: boolean
    teacher_resume: string
    mainImg: string
    profileImg: string
}

const teacherSchema = new Schema<ITeacher>(
    {   
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        mobile: { type: String, required: true },
        nationalityNumber: { type: String, required: true, unique: true },
        teacherId: { type: String, unique: true, sparse: true },
        gender: { type: String, required: true },
        email: { type: String, required: true },
        birthDate: { type: String, required: true },
        registryDate: { type: String, required: true },
        address: { type: String, required: true },
        password: { type: String, required: true },
        skill: { type: String, required: true },
        status: { type: String, required: true },
        isAdmin: { type: Boolean, required: true },
        teacher_resume: { type: String, required: true },
        mainImg: { type: String, default: '/images/avatar.png' },
        profileImg: { type: String, default: '/images/avatar.png' }
    },
    { timestamps: true }
)

teacherSchema.pre('save', async function(next) {
    if (this.isNew) {
        const TeacherModel = this.constructor as typeof Teacher
        const lastTeacher = await TeacherModel.findOne().sort({ teacherId: -1 })
        this.teacherId = lastTeacher ? 
            (parseInt(lastTeacher.teacherId) + 1).toString() : 
            '40000'
    }
    next()
})


const Teacher = mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", teacherSchema)

export default Teacher
