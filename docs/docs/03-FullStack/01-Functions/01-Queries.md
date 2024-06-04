# Queries

Queries are functions to serve data from your backend to your frontend, every queries you made ready executed by your frontend
you can perform anything here includes fetch data from database or simply return calculated object

this is an example query that reading data from database

```jsx title="lezzserver/todo.ts"
import { query } from '@lezzserver/server'
import { db } from './db'

export const listTodo = query({
  handler: async () => {
    return await db.todo.findMany({})
  }
})

```
