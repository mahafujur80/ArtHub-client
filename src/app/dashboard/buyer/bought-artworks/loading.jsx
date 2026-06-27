import { Skeleton } from '@heroui/react';
import React from 'react';

const loading = () => {
    const totalData = [0, 1, 2, 3, 4, 5]
    return (
        <div className='min-h-screen container mx-auto px-6 py-10' >

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                {
                    totalData.map((item, index) => {
                        return (
                            <div key={index} className="shadow-panel space-y-5 rounded-lg bg-transparent p-4">
                                <Skeleton className="h-35 rounded-lg" />
                                <div className="space-y-3">
                                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                                    <Skeleton className="h-3 w-2/5 rounded-lg" />
                                    <div>
                                        <Skeleton className="h-6 w-full rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default loading;