import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const DummyPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            router.push('/login');
        }
        if (router.isReady) {
            router.back();
        }
    }, [router.isReady]);

    return (
        <>
        </>
    );
};

export default DummyPage;