import { TrashIcon } from "@/components/icons/trash";
import { Button } from "@/components/ui/button";
import { ContentWrapper } from "@/components/ui/content-wrapper";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "@/features/applications/layouts/card-wrapper";


export function SettingsPage() {
    return (
        <div className="flex flex-col">
            <ContentWrapper className="p-5 space-y-4">
                <p className="text-lg font-bold">Project Settings</p>
                <CardWrapper className="space-y-4">
                    <p className="text-lg">Edit Project</p>
                    <div className="mt-2 space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm">Project Name</p>
                            <Input
                                placeholder={`Enter a name for your project`}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm">Project Slug</p>
                            <Input
                                placeholder={`Enter a slug for your project`}
                            />
                        </div>
                    </div>
                </CardWrapper>
                <CardWrapper className="space-y-4">
                    <p className="text-lg">Edit Project</p>
                    <div className="mt-2 space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm">Project Name</p>
                            <Input
                                placeholder={`Enter a name for your project`}
                            />
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm">Delete Project</p>
                            <p className="text-md">This project will be permanently deleted. This action cannot be undone.</p>
                            <div className="w-full flex justify-end">
                                <Button
                                    onClick={() => { }}
                                    variant="destructive"
                                >
                                    <TrashIcon />  Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardWrapper>
            </ContentWrapper>
        </div>
    )

}
