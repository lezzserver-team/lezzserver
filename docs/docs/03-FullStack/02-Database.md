# Database 

lezzserver using postgresql as database and prisma as ORM, you can refer to [prisma docs](https://www.prisma.io/orm) to more information

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
import { db } from './db'

// you can use db like prisma orm as well
// db.todo.findMany()
// etc
```
