'use client'

import { DataPageProvider } from '@/features/application-data/context/data-page-context'
import { DataPage } from '@/features/application-data/routes/data-page'

export default function Page() {
  return (
    <DataPageProvider>
      <DataPage />
    </DataPageProvider>
  )
}