# Database 

lezzserver using postgresql as database and prisma as ORM

## Define schema
you can define you prisma schema at ``lezzserver/schema.prisma``
```txt
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") 
}

generator client {
  provider = "prisma-client-js"
}

model todo {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  name      String?
  isDone    Boolean?
}
```
the ``datasource`` and ``generator client`` is mandatory don't delete it in your schema, and the DATABASE_URL variables initated when lezzserver spawn the runtime

## Using Prisma ORM
when you change your schema the lezzserver cli automatically run command ``npx prisma generate`` to update the client sdk and typing,
you can import the prisma orm instance from ``lezzserver/db/index.ts`` 

```js title="lezzserver/todo.ts"
import { query } from '@lezzserver/server'
import { db } from './db'
export const listTodo = query({
  args: v.object({
    sort: v.record(v.string(), v.enum(['asc', 'desc'])).optional(),
    skip: v.number().default(0),
    take: v.number().default(10).optional()
  }).optional(),
  handler: async (ctx, args) => {

    // highlight-start
    // get list data todo from database via prisma ORM
    const data = await db.todo.findMany({
      take: args?.take,
      skip: args?.skip,
      orderBy: args?.sort
    })
    // highlight-end
    return data
  }
})


export const createTodo = mutation({
  args: v.object({
    name: v.string(),
    isDone: v.boolean().optional().default(true),
  }),
  handler: async (ctx, { name, isDone }) => {
    
    // highlight-start
    // insert new todo to database via prisma ORM
    const createTodo =  await db.todo.create({
      data: {
        name,
        isDone
      }
    })
    // highlight-end
  }
})

```

you can freely use prisma orm inside of handler Lezzserver function, for more information about prisma lets check [prisma docs](https://www.prisma.io/orm)
