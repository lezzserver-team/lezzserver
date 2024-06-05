# Internal Functions

Internal functions actually same as Query or Mutation but they not able called directly by your frontend,
so the internal query or mutation only able called by Query/Mutation/HttpAction/Scheduler

here the example to make internal function
```js title="lezzserver/todo.ts"
import { internalQuery } from '@lezzserver/server'
export const myInternalQuery = internalQuery({
  handler: async () => {
    return { internal: 'query' }
  }
})
```

after you define the internal query, the list of internal query generated on ``lezzserver/db/internal.ts`` and you can use it to call the internal function
lets update our previous file ``todo.ts``
```js title="lezzserver/todo"
import { internalQuery } from '@lezzserver/server'
export const myQuery = query({
  handler: async (ctx) => {
    return await ctx.run(ctx.todo.myInternalQuery)
  }
})

```

