import { ContentWrapper } from "@/components/ui/content-wrapper";
import { FunctionContent } from "../components/function-content";
import { FunctionSidebar } from "../components/function-sidebar";
import { useFunctionPage } from "../hooks/use-function-page";


export function FunctionPage() {
  const {
    appId,
    functionParams,
    isMethodSelected
  } = useFunctionPage()

  return (
    <div className="flex">
      <FunctionSidebar />
      <ContentWrapper className="p-5 space-y-2">
        {isMethodSelected ?
          <FunctionContent
            appId={appId}
            selectedMethod={functionParams.method}
            filename={functionParams.displayName ? `${functionParams.displayName}.ts` : "Selected function is not found!"}
            className="pt-3"
          />
          :
          <div className="flex w-full h-full justify-center items-center">
            <p className="text-md">Select a file on the left to open it. </p>
          </div>
        }
      </ContentWrapper>
    </div>
  )

}
