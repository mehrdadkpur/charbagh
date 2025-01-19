/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || ''
}

export default config
