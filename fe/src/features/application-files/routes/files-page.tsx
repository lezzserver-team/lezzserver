import { NewTabIcon } from "@/components/icons/new-tab";
import { Button } from "@/components/ui/button";
import { ContentWrapper } from "@/components/ui/content-wrapper";
import { CustomMarkdown } from "@/components/ui/custom-markdown";
import { markdownCode } from "@/features/application-function/utils";
import { CardWrapper } from "@/features/applications/layouts/card-wrapper";
import { UploadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useFilesPage } from "../hooks/use-files-page";


export function FilesPage() {
  const { MDEmptyFiles } = useFilesPage()

  return (
    <div className="flex">
      <ContentWrapper className="p-5 space-y-2">
        <div className="space-y-2">
          <div className="w-full flex items-center justify-between">
            <p className="text-lg font-bold">File Storage</p>
            <div className="space-x-2">

              <Button variant="outline">
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            </div>
          </div>
          <p className="text-xs">Total Files <span className="font-bold">0</span></p>
        </div>
        <CardWrapper className="p-10 flex flex-col space-y-4 items-center justify-center">
          <p className="text-3xl">Store and serve dynamic files</p>
          <p className="text-md">Start file upload by using a mutation that calls storage.generateUploadUrl().</p>

          <CustomMarkdown className="w-max-[500px]">
            {markdownCode("typescript", MDEmptyFiles)}
          </CustomMarkdown>

          <p className="flex items-center text-md font-normal text-primary hover:underline">
            <Link href="#">Learn more about file storage </Link>
            <NewTabIcon className="ml-2 h-4 w-4" />
          </p>
        </CardWrapper>
      </ContentWrapper>
    </div>
  )

}
