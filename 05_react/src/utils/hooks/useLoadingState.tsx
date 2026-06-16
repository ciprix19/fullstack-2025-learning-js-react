import { useEffect, useState } from "react";

type LoadingState = {status: 'loading'} | { status: 'complete' }

export default function useLoadingState() : boolean {
    const [loading, setLoading] = useState<LoadingState>({ status: 'loading' });
    useEffect(() => {
        setInterval(() => {
            setLoading({ status: 'complete' });
        }, 1000);
    }, [loading])

    return loading.status === 'complete';
}