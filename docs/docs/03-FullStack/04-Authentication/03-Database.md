# Database

## Storing Users in the Lezzserver Database

You might want to store user information directly in your Lezzserver database, for the following reasons:

    - Your functions need information about other users, not just about the currently logged-in user
    - Your functions need access to information other than the fields available in the Open ID Connect JWT

There are two ways you can choose from for storing user information in your database (but only the second one allows storing information not contained in the JWT):

    1. Have your app's client call a mutation that stores the information from the JWT available on ctx.auth
    2. Implement a webhook and have your identity provider call it whenever user information changes

### Call a mutation from the client

#### Add user table in our schema.prisma

You can define a "users" table

In the examples below we will use the `sub` from the ctx.auth.getUserIdentity() to identify the user, but you could use other field or even email

Which field you use will determine how multiple providers interact, and how hard it will be to migrate to a different provider.

```prisma title="lezzserver/schema.prisma"
model users {
  id   String   @id
  name String
}
```

#### Mutation for storing user

This is an example of a mutation that stores the user's name:

```ts title="lezzserver/user.ts
import { mutation } from "@lezzserver/server";
import { db } from "./db";

export const store = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("unAuthorized");
    }

    const { sub, name } = identity.payload;
    const user = await db.users.upsert({
      where: {
        id: sub,
      },
      create: {
        id: sub,
        name,
      },
      update: {
        name,
      },
    });
    return user;
  },
});
```

#### Calling the store user mutation from React

You can call this mutation when the user logs in from a useEffect hook. After the mutation succeeds you can update local state to reflect that the user has been stored.
This helper hook that does the job:

```ts title="src/useStoreUserEffect.ts"
import { useUser } from "@clerk/clerk-react";
import { useLezzServerAuth } from "@lezzserver/react";
import { useEffect, useState } from "react";
import { useMutation } from "@lezzserver/react";
import { api } from "../lezzserver/_generated/api";

export function useStoreUserEffect() {
  const { isLoading, isAuthenticated } = useLezzServerAuth();
  const { user } = useUser();

  // When this state is set we know the server
  // has stored the user.
  const [userId, setUserId] = useState<string | null>(null);
  const storeUser = useMutation(api.user.store);

  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // If the user is not logged in don't do anything
    if (!isAuthenticated) {
      return;
    }
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const user = await storeUser.mutateAsync(null);
      setUserId(user.id);
    }
    createUser();
    return () => setUserId(null);
    // Make sure the effect reruns if the user logs in with
    // a different identity
  }, [isAuthenticated, user?.id]);

  // Combine the local state with the state from context
  return {
    isLoading: isLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null,
  };
}
```

You can use this hook in your top-level component. If your queries need the user document to be present, make sure that you only render the components that call them after the user has been stored:

```tsx title="src/App.tsx"
import { useQuery } from "@lezzserver/react";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { api } from "../lezzserver/_generated/api";
import { useStoreUserEffect } from "./useStoreUseEffect";

export default function App() {
  const auth = useStoreUserEffect();

  if (auth.isAuthenticated) {
    return <AuthenticatedPage />;
  }

  return <SignInButton />;
}

function AuthenticatedPage() {
  const { data: user, isLoading } = useQuery(api.auth.me);

  if (isLoading) {
    return <div>loading ...</div>;
  }

  return (
    <div>
      {JSON.stringify(user, null, 2)} <SignOutButton />
    </div>
  );
}
```

#### Using the current user's ID document

Similarly to the store user mutation, you can retrieve the current user's ID, or throw an error if the user hasn't been stored.

Now that you have users stored as documents in your Lezzserver database, you can use their IDs as foreign keys in other documents:

```ts title="lezzserver/todo.ts
export const createTodo = mutation({
  args: v.object({
    name: v.string(),
    isDone: v.boolean().optional().default(true),
  }),
  handler: async (ctx, { name, isDone }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("unAuthorized");
    }

    const { sub } = identity.payload;

    return await db.todo.create({
      data: {
        name,
        isDone,
        userId: sub,
      },
    });
  },
});
```

#### Loading data that related to user's

here the example to get the data and its users relations

```ts title="lezzserver/todo.ts"
export const listTodo = query({
  handler: async () => {
    const data = await db.todo.findMany({
      include: {
        user: true,
      },
    });
    return data;
  },
});
```
