// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { collections } from './collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections,
  cors: [
    'http://localhost:3000',
    'http://localhost:3001', // frontend local (HeroUI + Next.js)
    'http://127.0.0.1:3001', // (opcional)
  ],
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001', // frontend local (HeroUI + Next.js)
    'http://127.0.0.1:3001', // (opcional)
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  globals: [
    {
      slug: 'site-settings',
      fields: [
        {
          name: 'siteTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'siteDescription',
          type: 'textarea',
          required: true,
        },
        {
          name: 'logo',
          label: 'Logo del sitio',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'favicon',
          label: 'Favicon del sitio',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'contactEmail',
          type: 'email',
          required: true,
        },
        {
          name: 'contactPhone',
          type: 'text',
          required: false,
        },
        {
          name: 'socialMediaLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
