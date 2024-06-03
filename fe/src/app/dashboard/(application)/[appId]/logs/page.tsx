'use client'

import { LogsPageProvider } from '@/features/application-logs/context/logs-page-context'
import { LogsPage } from '@/features/application-logs/routes/logs-page'

export default function Page() {
  return (
    <LogsPageProvider>
      <LogsPage />
    </LogsPageProvider>
  )
}