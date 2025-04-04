import React from 'react';
import CarSearch from '../../components/CarSearch';

const Page = () => {
    return (
        <div className="flex overflow-hidden">
            <div className="flex-none flex border-2">
                <div className="flex justify-content-center pt-4">Test 1</div>
            </div>
            <div className="flex-grow-1 flex border-2 w-full">
                <div className='flex-col w-full'>
                    <div className="flex justify-content-center pt-4 bg-red-500">
                        <CarSearch />
                    </div>
                    <div className="flex justify-content-center pt-4 border-2">Test 4</div>
                </div>
            </div>
            <div className="flex-none flex border-2 bg-blue-400">
                <div className="flex justify-content-center pt-4">test 3</div>
            </div>
        </div>
    );
};

export default Page;
