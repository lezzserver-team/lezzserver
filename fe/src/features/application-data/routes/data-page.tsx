import { NewTabIcon } from "@/components/icons/new-tab";
import { ContentWrapper } from "@/components/ui/content-wrapper";
import { CustomMarkdown } from "@/components/ui/custom-markdown";
import { markdownCode } from "@/features/application-function/utils";
import { CardWrapper } from "@/features/applications/layouts/card-wrapper";
import Link from "next/link";
import { DataContent } from "../components/data-content";
import { DataSidebar } from "../components/data-sidebar";
import { useDataPage } from "../hooks/use-data-page";


export function DataPage() {
    const {
        appId,
        tableParams,
        MDEmptyData,
        isDataEmpty
    } = useDataPage()

    const isTableSelected = !!tableParams

    return (
        <div className="flex">
            <DataSidebar />
            <ContentWrapper className="p-5 space-y-2">
                {isTableSelected || !isDataEmpty ?
                    <DataContent
                        appId={appId}
                        selectedTable={tableParams}
                        className="pt-3"
                    />
                    :
                    <CardWrapper className="p-10 flex flex-col space-y-4 items-center justify-center">
                        <p className="text-3xl">Store data in the form of documents</p>
                        <p className="text-md">No data yet! Create the first row with the Add Documents button or run a mutation.</p>

                        <CustomMarkdown className="w-max-[500px]">
                            {markdownCode("typescript", MDEmptyData)}
                        </CustomMarkdown>

                        <p className="flex items-center text-md font-normal text-primary hover:underline">
                            <Link href="#">Learn more about reading and writing data</Link>
                            <NewTabIcon className="ml-2 h-4 w-4" />
                        </p>

                        <p className="flex items-center text-md font-normal text-primary hover:underline">
                            <Link href="#">Learn by following the Lezzserver tutorial</Link>
                            <NewTabIcon className="ml-2 h-4 w-4" />
                        </p>

                        <p className="flex items-center text-md font-normal text-primary hover:underline">
                            <Link href="#">Ramp up fast by following one of our quickstart guides</Link>
                            <NewTabIcon className="ml-2 h-4 w-4" />
                        </p>
                    </CardWrapper>
                }
            </ContentWrapper>
        </div>
    )

}
