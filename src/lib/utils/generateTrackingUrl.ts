/**
 * 
 * @param trackingNumber: string '123456789'
 * @param shippingCarrier: string 'ups' | 'fedex' | 'usps'
 * @returns trackingUrl: string -> 'https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=123456789'
 */
export const generateTrackingUrl = (trackingNumber: string, shippingCarrier: string): string => {
    const carrierUrls: { [key: string]: string } = {
        'ups': 'https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=',
        'fedex': 'https://www.fedex.com/apps/fedextrack/?tracknumbers=',
        'usps': 'https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1='
    };

    const baseUrl = carrierUrls[shippingCarrier.toLowerCase()];
    if (!baseUrl) {
        throw new Error('Unsupported shipping carrier');
    }

    return `${baseUrl}${trackingNumber}`;
};