import { useEffect, useState } from "react";

type LoadingState = {status: 'loading'} | { status: 'complete' }

export default function useLoadingState() : boolean {
    const [loading, setLoading] = useState({ status: 'loading' });
    useEffect(() => {
        setInterval(() => {
            setLoading({ status: 'complete' });
        }, 3000);
    }, [loading])

    return loading.status === 'complete';
}