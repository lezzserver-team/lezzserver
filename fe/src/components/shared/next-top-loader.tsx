'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Loader, { NextTopLoaderProps } from 'nextjs-toploader';
import NProgress from 'nprogress';
import { useEffect } from 'react';


export function NextTopLoader(props: Readonly<NextTopLoaderProps>) {
    const pathname = usePathname();
    const searchParams = useSearchParams()

    useEffect(() => {
        NProgress.done();
    }, [pathname, searchParams]);

    return (
        <Loader {...props} />
    )
}