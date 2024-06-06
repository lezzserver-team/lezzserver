# Store

instead of upload the file from client side, Store allow you to download the file directly from your backend and save it
here an example to download the file from external source and save it
```js title="lezzserver/storage.ts"
import { mutation } from '@lezzserver/server'
export const store = mutation({
  handler: async (ctx) => {
    const url = 'https://...' // your image url
    const response = await fetch(url);
    const image = await response.blob()
    const storageId = await ctx.storage.store(image)
    return {
      storageId
    }
  }
})
```
