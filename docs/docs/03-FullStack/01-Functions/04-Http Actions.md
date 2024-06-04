# Http Actions


Http actions are similiar to query and mutations with old school http server style
it take in a [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) and return a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

http actions are exposed at your-deployment-url/api/*

## Defining Http Action
this is an example the return json with http action
```js title="lezzserver/myHttpAction.ts"
import { httpAction } from '@lezzserver/server'
export const getTodoFromHttpApi = httpAction(async (ctx, request) => {
  const data = [
    {
      name: "coding"
    }
  ]

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
})
```

:::note
return a json with content-type application/json is mandatory right now
:::

## Defining route
in order to make our http action ready to call we should define the endpoint route

add file ``http.ts`` ( the name should http.ts ) and here the example our routes
```js title="lezzserver/http.ts"
import { getTodoFromHttpApi } from './myHttpAction'
import { HttpRouter } from '@lezzserver/server'

const router = new HttpRouter()

router.route({
  method: 'GET',
  path: '/todos',
  handler: getTodoFromHttpApi
})

export default router
```

you can now call the http actions via HTTP
curl your-deployment-url/api/todos


:::info
you can find your deployment url at ``.env`` file
:::
