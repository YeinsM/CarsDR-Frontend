'use client'
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

    const brands = [
        { label: 'Todas las Marcas', value: '' }
        // Add more brands as needed
    ];

    const models = [
        { label: 'Todos los Modelos', value: '' }
        // Add more models as needed
    ];

    const years = [
        { label: '-', value: '' }
        // Add years as needed
    ];

    const prices = [
        { label: '-', value: '' }
        // Add price ranges as needed
    ];

    const locations = [
        { label: 'Todas las Provincias', value: '' }
        // Add locations as needed
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
            <div className="surface-card p-2 border-round">
                <div className="relative" style={{ 
                    width: '100%',
                    paddingTop: '56.25%', // 16:9 aspect ratio
                    overflow: 'hidden',
                }}>
                    <img 
                        src={car.image} 
                        alt={car.name} 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                        className="border-round"
                    />
                </div>
                <div className="text-center mt-3">
                    <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                    <p className="text-xl text-primary font-bold">{car.price}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="grid w-full">
            <div className="col-12 md:col-4">
                <div className="surface-card p-4 shadow-2 border-round">
                    <h2 className="text-xl font-bold mb-4">¡Busca tu Carro!</h2>
                    <div className="flex flex-column gap-3">
                        <Dropdown options={conditions} placeholder="Estado" className="w-full" />
                        <Dropdown options={brands} placeholder="Marca" className="w-full" />
                        <Dropdown options={models} placeholder="Modelo" className="w-full" />
                        <div className="flex gap-2">
                            <Dropdown options={years} placeholder="Año" className="w-6" />
                            <span className="flex align-items-center">hasta</span>
                            <Dropdown options={years} placeholder="Año" className="w-6" />
                        </div>
                        <div className="flex gap-2">
                            <Dropdown options={prices} placeholder="Precio" className="w-6" />
                            <span className="flex align-items-center">hasta</span>
                            <Dropdown options={prices} placeholder="Precio" className="w-6" />
                        </div>
                        <Dropdown options={locations} placeholder="Lugar" className="w-full" />
                        <Button label="Buscar" severity="danger" className="w-full" />
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-8 flex align-items-start">
                <div className="surface-card p-4 shadow-2 border-round w-full">
                    <h2 className="text-xl font-bold mb-4">Vehículos Destacados</h2>
                    <div style={{ maxHeight: '450px', overflow: 'hidden' }}>
                        <Carousel 
                            value={featuredCars} 
                            numVisible={1} 
                            numScroll={1} 
                            className="w-full"
                            itemTemplate={carTemplate}
                            autoplayInterval={3000}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarSearch;
