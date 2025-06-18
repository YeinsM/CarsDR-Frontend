import React from 'react';
import CarSearch from '../../components/CarSearch';
import AdSpace from '../../components/AdSpace';

const Page = () => {
    return (
        <div className="flex flex-col md:flex-row w-full h-full p-1 gap-3">
            {/* Columna izquierda */}
            <div className="w-full md:max-w-[200px] h-full flex items-center justify-center rounded-md p-0">
                <div className="flex flex-col gap-2 w-full h-screen items-center justify-between p-1 border rounded-md">
                    {[...Array(4)].map((_, index) => (
                        <AdSpace key={`left-ad-${index}`} />
                    ))}
                </div>
            </div>

            {/* Columna central */}
            <div className="flex-1 flex flex-col gap-4 rounded-md w-full">
                {/* Parte superior: Carousel */}
                <div className="md:h-[450px] w-full overflow-hidden p-1 rounded-md">
                    <CarSearch />
                </div>

                {/* Parte inferior: Recientes */}
                <div className="flex-1 w-full bg-white flex flex-col py-4 px-4 rounded-md overflow-hidden h-full">
                    <h2 className="font-bold mb-4">Recientes</h2>
                    <div className="grid grid-cols-6 gap-4 p-3">
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className="bg-gray-300 w-full max-w-40 sm:max-w-44 h-48 p-2 rounded-md shadow">
                                {/* Área de imagen o contenido visual */}
                                <div className="bg-amber-400 h-24 sm:w-40 w-36 rounded-md mb-1"></div>
                                {/* Título */}
                                <div>
                                    <div className='w-full p-0 m-0'>
                                        <p className="text-sm font-semibold p-1 m-0">Marca {index + 1}</p>
                                        <p className="text-sm font-semibold p-1">Precio {index + 1}</p>
                                    </div>
                                    {/* Descripción breve */}
                                    <p className="text-sm font-semibold text-gray-500 m-0 p-0">Descripción breve</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Columna derecha */}
            <div className="w-full md:max-w-[200px] h-full flex items-center justify-center rounded-md p-0">
                <div className="flex flex-col gap-2 w-full h-screen items-center justify-between p-1 border rounded-md">
                    {[...Array(4)].map((_, index) => (
                        <AdSpace key={`right-ad-${index}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;