'use client';
import React, { Suspense } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import type { CustomEvent } from '@/types';

const TimelineDemo = () => {
    const customEvents: CustomEvent[] = [
        {
            status: 'Ordered',
            date: '15/09/2022 10:30',
            icon: 'pi pi-shopping-cart',
            color: '#9C27B0',
            image: 'game-controller.jpg'
        },
        {
            status: 'Processing',
            date: '15/09/2022 14:00',
            icon: 'pi pi-cog',
            color: '#673AB7'
        },
        {
            status: 'Shipped',
            date: '15/09/2022 16:15',
            icon: 'pi pi-envelope',
            color: '#FF9800'
        },
        {
            status: 'Delivered',
            date: '16/09/2022 10:00',
            icon: 'pi pi-check',
            color: '#607D8B'
        }
    ];

    const horizontalEvents = ['2023', '2024', '2025', '2026'];

    const customizedContent = (item: CustomEvent) => {
        return (
            <Card title={item.status} subTitle={item.date}>
                {item.image && (
                    <img src={`/demo/images/product/${item.image}`} onError={(e) => ((e.target as HTMLImageElement).src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')} alt={item.name} width={200} className="shadow-2" />
                )}
                <p className="line-height-3 my-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
                <Button label="Read more" className="mb-5" outlined></Button>
            </Card>
        );
    };

    const customizedMarker = (item: CustomEvent) => {
        return (
            <span className="flex z-1 w-2rem h-2rem align-items-center justify-content-center text-white border-circle shadow-2" style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
            </span>
        );
    };

    return (
        <div>
            <div className="grid">
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Left Align</h5>
                        <Timeline value={customEvents} content={(item) => item.status} />
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Right Align</h5>
                        <Timeline value={customEvents} align="right" content={(item) => item.status} />
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Alternate Align</h5>
                        <Timeline value={customEvents} align="alternate" content={(item) => item.status} />
                    </div>
                </div>

                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Opposite Content</h5>
                        <Timeline value={customEvents} opposite={(item) => item.status} content={(item) => <small className="p-text-secondary">{item.date}</small>} />
                    </div>
                </div>

                <div className="col-12">
                    <div className="card timeline-demo">
                        <h5>Customized</h5>
                        <Timeline value={customEvents} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <h5>Horizontal</h5>
                        <h6>Top Align</h6>
                        <Timeline value={horizontalEvents} layout="horizontal" align="top" content={(item) => item} />

                        <h6>Bottom Align</h6>
                        <Timeline value={horizontalEvents} layout="horizontal" align="bottom" content={(item) => item} />

                        <h6>Alternate Align</h6>
                        <Timeline value={horizontalEvents} layout="horizontal" align="alternate" content={(item) => item} opposite={<span>&nbsp;</span>} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const SuspenseWrapper = (props) => (
    <Suspense fallback={null}>
        <TimelineDemo {...props} />
    </Suspense>
);

export default SuspenseWrapper;
