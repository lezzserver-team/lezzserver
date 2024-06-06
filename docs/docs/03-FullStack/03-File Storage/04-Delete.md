# Delete

all stored file can be deleted via mutation
```js title="lezzserver/storage.ts"
import { mutation } from '@lezzserver/server'
export const deleteFile = mutation({
  args: v.string(),
  handler: async (ctx, storageId) => {
    return await ctx.storage.delete(storageId)
  }
})
```
