import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const DummyPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.back();
    }, []);

    return (
        <>
        </>
    );
};

export default DummyPage;