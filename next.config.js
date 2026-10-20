// GitHub Pages serves a project site from /<repo>, so the deploy workflow
// passes the base path in. Locally it is empty and the site runs from /.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
