import { CollectionConfig } from 'payload'

const Profesores: CollectionConfig = {
  slug: 'profesores',
  labels: {
    singular: 'Profesor',
    plural: 'Profesores',
  },
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'apellido',
      type: 'text',
      required: true,
    },
    {
      name: 'identificacion',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'foto',
      label: 'Foto de perfil',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'area',
      type: 'select',
      options: [
        {
          label: 'Cuerda pulsada',
          value: 'cuerda-pulsada',
        },
        {
          label: 'Cuerda frotada',
          value: 'cuerda-frotada',
        },
        {
          label: 'Percusión',
          value: 'percusion',
        },
        {
          label: 'Viento madera',
          value: 'viento-madera',
        },
        {
          label: 'Viento metal',
          value: 'viento-metal',
        },
        {
          label: 'Teclado',
          value: 'teclado',
        },
        {
          label: 'Voz',
          value: 'voz',
        },
        {
          label: 'Composición',
          value: 'composicion',
        },
        {
          label: 'Dirección',
          value: 'direccion',
        },
        {
          label: 'Teoría musical',
          value: 'teoria-musical',
        },
      ],
      defaultValue: 'cuerda-pulsada',
      required: true,
    },
  ],
  timestamps: true,
}

export default Profesores
