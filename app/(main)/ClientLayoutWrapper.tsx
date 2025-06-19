'use client';
import React, { Suspense } from 'react';
import Layout from '../../layout/layout';

interface ClientLayoutWrapperProps {
    children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Layout>{children}</Layout>
        </Suspense>
    );
}
