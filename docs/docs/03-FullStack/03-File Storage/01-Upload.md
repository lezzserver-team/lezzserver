# Upload

To implement upload file from your front end, we should make 2 request
1. Generate temporary upload URL
2. Send POST request with the file you want to upload to the temporary generated URL 

### Generate temporary upload url

here an example a mutation that generate temporary upload URL
```js title="lezzserver/storage.ts"
import { mutation } from '@lezzserver/server'
export const generateUploadUrl = mutation({
  handler:async (ctx) => {
    return { url: await ctx.storage.generateUploadUrl()}
  }
})
```

after add a mutation, now we can call that mutation from our frontend to receive the URL

```jsx title="App.tsx"
import { useQuery, useMutation, useAction } from '@lezzserver/react'
export default function App() {
  const { mutateAsync: generateUploadUrl } = useMutation(api.storage.generateUploadUrl)
  const handleUploadFile = async () => {
    const { url } = await generateUploadUrl(null)
    console.log(url)
  }

  return (
    <div>
      <h5> Upload file </h5>
      <input type='file' onChange={handleChangeFile} />
      <button onClick={handleUploadFile}> upload  </button>
    </div>
  )
}
```

in code above, we make a simple form with a single file input. whenever user click it will call our mutation to generate the temporary file URL

so after we obtain the url we send HTTP request to that URL to upload our content, lets complete our code
```tsx title="App.tsx"
import { useQuery, useMutation, useAction } from '@lezzserver/react'
export default function App() {
  const { mutateAsync: generateUploadUrl } = useMutation(api.storage.generateUploadUrl)
  const handleUploadFile = async () => {
    const { url } = await generateUploadUrl(null)
    // highlight-start
    const formData = new FormData()
    formData.append('file', newFile!)
    await fetch(url, {
      method: "POST",
      body: formData,
    });
    // highlight-end
  }

  return (
    <div>
      <h5> Upload file </h5>
      <input type='file' onChange={handleChangeFile} />
      <button onClick={handleUploadFile}> upload  </button>
    </div>
  )
}

```
