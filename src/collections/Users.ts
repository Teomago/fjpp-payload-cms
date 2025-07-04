import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useAPIKey: true,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Non-premium', value: 'non-premium' },
        { label: 'Student', value: 'student' },
      ],
    },
    {
      name: 'foto',
      label: 'Foto de perfil',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
