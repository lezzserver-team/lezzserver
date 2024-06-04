# Mutations

Mutations are function to create/update/delete your data in database, if you execute the mutation all the queries in same file will refetched

this is an example mutation to update data

```jsx title="lezzserver/todo.ts"
import { mutation } from '@lezzserver/server'
import { db } from './db'

export const createTodo = mutation({
  args: v.object({
    name: v.string(),
    isDone: v.boolean().optional().default(true),
  }),
  handler: async (ctx, { name, isDone }) => {
    return await db.todo.create({
      data: {
        name,
        isDone,
      }
    })
  }
})
```
