import { CollectionConfig, FieldAccess } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

type User = {
  role?: string | null
}

const isStudent = ({ req: { user } }: { req: { user?: User | null } }) => user?.role === 'student'
const isAdmin = ({ req: { user } }: { req: { user?: User | null } }) => user?.role === 'admin'
const isEditor = ({ req: { user } }: { req: { user?: User | null } }) => user?.role === 'editor'
const isNonPremium = ({ req: { user } }: { req: { user?: User | null } }) =>
  user?.role === 'non-premium'

const fieldAccess: FieldAccess = ({ req: { user } }) =>
  user?.role === 'student' || user?.role === 'admin' || user?.role === 'editor'

const Cursos: CollectionConfig = {
  slug: 'cursos',
  labels: {
    singular: 'Curso',
    plural: 'Cursos',
  },
  admin: {
    useAsTitle: 'titulo',
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      access: {
        read: fieldAccess, // Only student, admin, editor can see
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data && data.titulo) {
              return data.titulo
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-')
            }
          },
        ],
      },
      access: {
        read: fieldAccess,
      },
    },
    {
      name: 'descripcion',
      type: 'textarea',
      // No access restriction: all roles can read
    },
    {
      name: 'profesor',
      type: 'relationship',
      relationTo: 'profesores',
      required: true,
      hasMany: false,
      access: {
        read: fieldAccess,
      },
    },
    {
      name: 'lecciones',
      label: 'Lecciones del curso',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'titulo',
          label: 'Título de la lección',
          type: 'text',
          required: true,
        },
        {
          name: 'videoURL',
          label: 'Video de la lección',
          type: 'text',
          required: false,
        },
        {
          name: 'descripcion',
          label: 'Descripción de la lección',
          type: 'textarea',
          required: true,
        },
        {
          name: 'contenido',
          label: 'Contenido de la lección',
          type: 'richText',
          editor: lexicalEditor({}),
          required: true,
        },
      ],
    },
    {
      name: 'nivel',
      type: 'select',
      options: [
        { label: 'Principiante', value: 'principiante' },
        { label: 'Intermedio', value: 'intermedio' },
        { label: 'Avanzado', value: 'avanzado' },
      ],
      defaultValue: 'principiante',
      access: {
        read: fieldAccess,
      },
    },
  ],
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      return (
        user.role === 'student' ||
        user.role === 'admin' ||
        user.role === 'editor' ||
        user.role === 'non-premium'
      )
    },
    create: isAdmin,
    update: ({ req: { user } }) => !!user && (user.role === 'admin' || user.role === 'editor'),
  },
}

export default Cursos
