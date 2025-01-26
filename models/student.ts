import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  mobile: String,
  nationalityNumber: { type: String, unique: true },
  studentId: { type: String, unique: true, sparse: true },
  gender: String,
  email: String,
  birthDate: String,
  address: String,
  password: String,
  course: String,
  status: String,
  profileImg: { type: String, default: '/images/avatar.png' },
}, { timestamps: true })

studentSchema.pre('save', async function(next) {
  if (this.isNew) {
    const StudentModel = this.constructor as any;
    const lastStudent = await StudentModel.findOne().sort({ studentId: -1 });
    this.studentId = lastStudent ? String(Number(lastStudent.studentId) + 1) : '10001';
  }
  next();
});

export default mongoose.models.Student || mongoose.model("Student", studentSchema)
