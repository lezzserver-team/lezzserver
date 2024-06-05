# Scheduled Functions

Lezzserver allows you to schedule functions to run in the future. you can schedule internal function from any other function via the scheduler provided in the respective function context

- **runAfter** schedules a function to run after a delay (measured in milliseconds).
- **runAt** schedules a function run at a date or timestamp (measured in milliseconds elapsed since the epoch).


here an example automatically delete the record after 5 seconds created using scheduled functions

```js title="lezzserver/message.ts"
export const createMessage = mutation({
  args: v.object({
    body: v.string(),
  }),
  handler: async (ctx, { body }) => {
    const createMessage =  await db.todo.create({
      data: {
        body,
      }
    })

    // delete message after 5 seconds
    ctx.runAfter(5000, internal.message.deleteMessage, createMessage.id)
    return createMessage
  }
})

export const deleteMessage = internalMutation({
  args: v.string(),
  handler: async (_, id) => {
    return await db.message.delete({
      where: {
        id
      }
    })
  }
})
```
