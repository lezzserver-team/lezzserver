# Actions

Actions are function the specifically to call third party from lezzserver,
for example to make http request to endpoint that outside lezzserver platform

if you want interact to database from action, we recommend do it indirectly by calling internal queries or mutations

this is an example Action the fetch data from other endpoint
```js title="lezzserver/todo.ts"
export const todoAction = action({
  handler: async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos')
    return await data.json()
  }
})

```
