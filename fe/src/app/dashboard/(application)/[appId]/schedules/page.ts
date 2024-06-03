"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { appId } = useParams();

  useEffect(() => {
    router.replace(`/dashboard/${appId}/schedules/functions`);
  }, [appId, router]);
}
