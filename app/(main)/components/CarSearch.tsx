'use client';
import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';

const CarSearch = () => {
    const conditions = [
        { label: 'Nuevo/Usado', value: '' },
        { label: 'Nuevo', value: 'new' },
        { label: 'Usado', value: 'used' }
    ];

    const brands = [{ label: 'Todas las Marcas', value: '' }];
    const models = [{ label: 'Todos los Modelos', value: '' }];
    const years = [{ label: '-', value: '' }];
    const prices = [{ label: '-', value: '' }];
    const locations = [{ label: 'Todas las Provincias', value: '' }];
    const typeVehicle = [{ label: 'Tipos de Vehiculos', value: '' }];
    const placeOrgin = [
        { label: 'Japone', value: 'japone' },
        { label: 'Americano', value: 'americana' },
        { label: 'Europeo', value: 'europeo' },
        { label: 'Chino', value: 'chino' }
    ];

    const featuredCars = [
        {
            id: 1,
            name: '2024 Nissan Frontier LE',
            price: 'US$ 48,900',
            image: '/assets/images/frontier.jpg',
        },
        {
            id: 2,
            name: '2024 Mercedes-Benz GLE',
            price: 'US$ 85,000',
            image: '/assets/images/mercedes.jpg'
        },
        {
            id: 3,
            name: '2023 BMW X5',
            price: 'US$ 75,500',
            image: '/assets/images/bmw.jpeg'
        }
    ];

    const carTemplate = (car: any) => {
        return (
            <div className="surface-card border-round h-full flex flex-col overflow-hidden p-1">
                <div className="flex-1 w-full flex items-center justify-center max-h-[290px]">
                    <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover shadow-lg rounded-md"
                    />
                </div>
                <div className="text-center mt-2">
                    <h3 className="text-base font-semibold">{car.name}</h3>
                    <p className="text-base text-primary font-bold">{car.price}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="flex md:flex-row flex-col w-full h-full gap-2 bg-amber-400 overflow-hidde">
            {/* Sidebar de filtros */}
            <div className="md:max-w-[300px] w-full surface-card py-4 px-3 shadow-2 border-round overflow-hidden">
                <h2 className="text-xl font-bold mb-2">¡Busca tu Carro!</h2>
                <div className="flex flex-col gap-3">
                    <Dropdown options={typeVehicle} placeholder="Tipos de vehiculos" className="w-full" />
                    <div className="flex gap-2">
                        <Dropdown options={brands} placeholder="Marca" className="w-full" />
                        <Dropdown options={models} placeholder="Modelo" className="w-full" />
                    </div>
                    <div className="flex gap-2">
                        <Dropdown options={years} placeholder="Año" className="w-6" />
                        <span className="flex items-center">hasta</span>
                        <Dropdown options={years} placeholder="Año" className="w-6" />
                    </div>
                    <div className="flex gap-2">
                        <Dropdown options={prices} placeholder="Precio" className="w-6" />
                        <span className="flex items-center">hasta</span>
                        <Dropdown options={prices} placeholder="Precio" className="w-6" />
                    </div>

                    <div className="flex gap-2">
                        <Dropdown options={conditions} placeholder="Estado" className="w-full" />
                        <Dropdown options={placeOrgin} placeholder="Version" className="w-full" />
                    </div>
                    <Dropdown options={locations} placeholder="Lugar" className="w-full" />
                    <Dropdown options={locations} placeholder="filtrado faltante" className="w-full" />
                    <Button label="Buscar" severity="danger" className="w-full" />
                </div>
            </div>

            {/* Carousel */}
            <div className="flex-1 surface-card p-4 shadow-2 rounded overflow-hidden">
                <h2 className="text-xl font-bold mb-3">Vehículos Destacados</h2>
                <div className="h-full w-full overflow-hidden ">
                    <Carousel
                        value={featuredCars}
                        numVisible={1}
                        numScroll={1}
                        className="w-full h-full"
                        itemTemplate={carTemplate}
                        autoplayInterval={3000}
                    />
                </div>
            </div>
        </div>
    );
};

export default CarSearch;
