# Cron Job

Lezzserver allows you to schedule functions to run on a recurring basis. For example, cron jobs can be used to clean up data at a regular interval, send a reminder email at the same time every month, or schedule a backup every Saturday.

cronjobs are defined at ``lezzserver/cron.ts``

here an example cronjob

```js title="lezzserver/cron.ts"
import { cron } from '@lezzserver/server'
import internal from './db/internal'


// execute internal function every 1 week
cron.interval(
  'payment reminder',
  {
    days: 7
  },
  internal.payment.reminder,
  'johndoe@gmail.com' // pass argument to internal function
)


cron.interval(
  'update product stock',
  {
    hours: 1 hours
  },
  internal.products.stock,
)

// using clasic cron syntax
cron.cron(
  'daily script',
  '0 0 * * *',
  internal.script.daily
)
```
:::info
only internal function are allowed to execute by scheduler
:::
