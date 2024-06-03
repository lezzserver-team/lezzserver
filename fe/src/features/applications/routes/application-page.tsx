import { useFindApplication } from "@/services/applications/hooks/use-find-application"
import { AppCard } from "../components/app-card"
import GettingStartedDocs from '../components/getting-started.mdx'

export function ApplicationPage() {
  const { data: applications } = useFindApplication()

  if (applications?.length == 0) {
    return (
      <div className="prose">
        <GettingStartedDocs />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-5 w-full p-5">
      {applications?.map((application) => (
        <AppCard key={application.id} application={application} />
      ))}
    </div>
  )
}
