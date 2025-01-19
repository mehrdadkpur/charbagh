import bcrypt from 'bcryptjs'

export const hashPassword = async (password) => {
  if (!password) return null;
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword)
}
