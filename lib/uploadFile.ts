import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

export async function uploadFile(file: File, folder: 'images' | 'songs' | 'videos') {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const fileName = `${folder}/${Date.now()}-${file.name.replace(/\s/g, '-')}`
  
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type
    })
  )

  return `${process.env.AWS_CLOUDFRONT_URL}/${fileName}`
}
