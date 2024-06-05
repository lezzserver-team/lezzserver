# Clerk

Clerk is an authentication platform providing login via passwords, social identity providers, one-time email or SMS access codes, and multi-factor authentication and basic user management.

## Getting Started

### 1. Sign Up Clerk
Sign up for a free Clerk account at [clerk.com/sign-up](https://dashboard.clerk.com/sign-in).

![sign up clerk](/img/clerk-register.png)

### 2. Create Application Clerk
Choose how you want your users to sign in. \

![Create Application](/img/clerk-create-project.png)

### 3. Create JWT Template
In the JWT Templates section of the Clerk dashboard tap on + New template and choose Blank 
enter ``lezzserver`` in name input field


set the claims to
```json
{
  "aud": "lezzserver",
  "name": "{{user.full_name}}"
  // add custom claim field here
}
```

Copy the Issuer URL from the Issuer input field.
Hit Save


![Add New Template](/img/clerk-create-blank-template.png)
![Setting Up Template](/img/clerk-create-template.png)


### 4. Create the auth config
add ``auth.config.ts`` in ``lezzserver`` folder with this configuration


```js title="lezzserver/auth.config.ts"
export default {
  providers: [
    {
      domain: "https://your-url.clerk.accounts.dev/",
      applicationID: "lezzserver",
    },
  ]
};
```
change the value of domain to your issuer url 
:::warning 
don't remove last / on the url
:::

### 5. Deploy your changes 
```bash
npx lezzserver dev
```

### 6. Install clerk in our frontend
open a new terminal in root of our frontend project and install clerk package

```bash
npm install @clerk/clerk-react
```

### 7. Get your publishable key 
On the Clerk dashboard in the API Keys section copy the Publishable key
![Add New Template](/img/clerk-api-key.png)

### 8. Configure LezzServerProviderWithClerk
Now replace your LezzServerProvider with ClerkProvider wrapping LezzServerProviderWithClerk.
Pass the Clerk useAuth hook to the LezzServerProviderWithClerk.
Paste the Publishable key as a prop to ClerkProvider.

```jsx title="main.tsx"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// highlight-start
import { LezzServerReactClient, LezzServerProviderWithClerk } from '@lezzserver/react'
import { ClerkProvider, useAuth } from '@clerk/clerk-react'
// highlight-end 

const client = new LezzServerReactClient(import.meta.env.VITE_LEZZSERVER_DEPLOYMENT_URL)
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    // highlight-start
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <LezzServerProviderWithClerk client={client} useAuth={useAuth}>
    // highlight-end
        <App />
    // highlight-start
      </LezzServerProviderWithClerk>
    </ClerkProvider>
    // highlight-end
  </React.StrictMode>,
)
```

### 9. Add query to check user has logged in
add new query to check user has authenticated from our backend
and use ``getUserIdentity`` method from ctx to authenticated user

If the client isn't authenticated, ``ctx.auth.getUserIdentity`` will return null.

```js title="lezzserver/auth.ts"
import { query } from "@lezzserver/server";

export const me = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return {
      name: identity.payload.name
    }
  }
})
```

### 9. Show UI based on authentication state
You can control which UI is shown when the user is signed in or signed out with the provided hooks from "@lezzserver/react" and "@clerk/clerk-react".

To get started create a shell that will let the user sign in and sign out.
```jsx title="src/App.tsx"
import { useLezzServerAuth, useQuery } from "@lezzserver/react";
import { SignInButton, SignOutButton } from '@clerk/clerk-react'
import { api } from "../lezzserver/_generated/api";

export default function App() {
  const auth = useLezzServerAuth()
  if (auth.isAuthenticated) {
    return <AuthenticatedPage/>
  }

  return <SignInButton/>
}

function AuthenticatedPage() {
  const { data: user, isLoading } = useQuery(api.auth.me)

  if (isLoading) {
    return <div>loading ...</div>
  }

  return <div>{JSON.stringify(user, null, 2)} <SignOutButton/></div>
}
```
