import React, { Suspense } from 'react';

function Invoice() {
    return (
        <div className="card py-8 px-6 md:px-8 overflow-auto">
            <div className="flex flex-column align-items-start md:flex-row md:align-items-center md:justify-content-between border-bottom-1 surface-border pb-5 min-w-max">
                <div className="flex flex-column">
                    <svg width="48" height="50" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M33.1548 9.65956L23.9913 4.86169L5.54723 14.5106L0.924465 12.0851L23.9913 0L37.801 7.23403L33.1548 9.65956ZM23.9931 19.3085L42.4255 9.65955L47.0717 12.0851L23.9931 24.1595L10.1952 16.9361L14.8297 14.5106L23.9931 19.3085ZM4.6345 25.8937L0 23.4681V37.9149L23.0669 50V45.1489L4.6345 35.4894V25.8937ZM18.4324 28.2658L0 18.6169V13.7658L23.0669 25.8403V40.2977L18.4324 37.8615V28.2658ZM38.7301 23.468V18.6169L24.9205 25.8403V49.9999L29.555 47.5743V28.2659L38.7301 23.468ZM43.3546 35.4892V16.1914L48.0008 13.7659V37.9148L34.1912 45.1488V40.2977L43.3546 35.4892Z"
                            fill="var(--primary-color)"
                        />
                    </svg>
                    <div className="my-3 text-4xl font-bold text-900">YOUR COMPANY</div>
                    <span className="mb-2">9137 3rd Lane California City</span>
                    <span>CA 93504, U.S.A.</span>
                </div>
                <div className="flex flex-column mt-5 md:mt-0">
                    <div className="text-2xl font-semibold text-left md:text-right mb-3">INVOICE</div>
                    <div className="flex flex-column">
                        <div className="flex justify-content-between align-items-center mb-2">
                            <span className="font-semibold mr-6">DATE</span>
                            <span>30/08/2019</span>
                        </div>
                        <div className="flex justify-content-between align-items-center mb-2">
                            <span className="font-semibold mr-6">INVOICE #</span>
                            <span>8523</span>
                        </div>
                        <div className="flex justify-content-between align-items-center">
                            <span className="font-semibold mr-6">CUSTOMER ID</span>
                            <span>C1613</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 mb-8 flex flex-column">
                <div className="mb-3 text-2xl font-medium">BILL TO</div>
                <span className="mb-2">Claire Williams, 148 Hope Lane</span>
                <span>Palo Alto, CA 94304.</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full" style={{ borderCollapse: 'collapse', tableLayout: 'auto' }}>
                    <thead>
                        <tr>
                            <th className="text-left font-semibold py-3 border-bottom-1 surface-border white-space-nowrap">Description</th>
                            <th className="text-right font-semibold py-3 border-bottom-1 surface-border white-space-nowrap px-3">Quantity</th>
                            <th className="text-right font-semibold py-3 border-bottom-1 surface-border white-space-nowrap px-3">Unit Price</th>
                            <th className="text-right font-semibold py-3 border-bottom-1 surface-border white-space-nowrap">Line Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-left py-3 border-bottom-1 surface-border white-space-nowrap">Green T-Shirt</td>
                            <td className="text-right py-3 border-bottom-1 surface-border px-3">1</td>
                            <td className="text-right py-3 border-bottom-1 surface-border px-3">$49.00</td>
                            <td className="text-right py-3 border-bottom-1 surface-border">$49.00</td>
                        </tr>
                        <tr>
                            <td className="text-left py-3 border-bottom-1 surface-border white-space-nowrap">Game Controller</td>
                            <td className="text-right py-3 border-bottom-1 surface-border px-3">2</td>
                            <td className="text-right py-3 border-bottom-1 surface-border px-3">$99.00</td>
                            <td className="text-right py-3 border-bottom-1 surface-border">$198.00</td>
                        </tr>
                        <tr>
                            <td className="text-left py-3 border-bottom-1 surface-border white-space-nowrap">Mini Speakers</td>
                            <td className="text-right py-3 border-bottom-1 surface-border px-3">1</td>
                            <td className="text-right py-3 border-bottom-1 surface-border px-3">$85.00</td>
                            <td className="text-right py-3 border-bottom-1 surface-border">$85.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex flex-column md:flex-row md:align-items-start md:justify-content-between mt-8">
                <div className="font-semibold mb-3 md:mb-0">NOTES</div>
                <div className="flex flex-column">
                    <div className="flex justify-content-between align-items-center mb-2">
                        <span className="font-semibold mr-6">SUBTOTAL</span>
                        <span>$332.00</span>
                    </div>
                    <div className="flex justify-content-between align-items-center mb-2">
                        <span className="font-semibold mr-6">VAT #</span>
                        <span>0</span>
                    </div>
                    <div className="flex justify-content-between align-items-center">
                        <span className="font-semibold mr-6">TOTAL</span>
                        <span>$332.00</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function InvoiceWithSuspense(props) {
    return (
        <Suspense fallback={null}>
            <Invoice {...props} />
        </Suspense>
    );
}
