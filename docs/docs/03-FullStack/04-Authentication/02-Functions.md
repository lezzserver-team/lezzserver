# Functions

## Auth in Functions

Within a Lezzserver function, you can access information about the currently logged-in user by using the auth property of the context object:

```ts title="lezzserver/myfunction.ts"
import { query } from "@lezzserver/server";

export const me = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return {
      name: identity.payload.name,
    };

    //
  },
});
```

## User Identity Fields

The UserIdentity object returned by getUserIdentity is guaranteed to have `subject` and `issuer` fields. Which other fields it will include depends on the identity provider used and the configuration of JWT tokens and [OpenID scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)

```ts title="lezzserver/myfunction.ts"
import { query } from "@lezzserver/server";

export const me = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const { sub, iss, name, email } = identity.payload;
    //
  },
});
```

### Clerk claims configuration

the fields returned by getUserIdentity are determined by your JWT template's Claims config. Note that Lezzserver currently only supports passing through a list of fields which are part of the [OpenId standard](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).
