import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'beers',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string'},
        { name: 'blg', type: 'number' },
        { name: 'alco', type: 'number' },
        { name: 'smell', type: 'number' },
        { name: 'color', type: 'string' },
        { name: 'taste', type: 'number' },
        { name: 'bitter', type: 'number' },
        { name: 'overall', type: 'number' },
        { name: 'add_info', type: 'string' },
        { name: 'index', type: 'number' },
      ]
    }),
  ]
})

