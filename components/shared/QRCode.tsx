'use client'
import React from 'react';
import { useQRCode } from 'next-qrcode';

function QRCode({ qrtext = '' }: { qrtext: string }) {
    const { Canvas } = useQRCode();

    return (
        <Canvas
            text={qrtext}
            options={{
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: 4,
                width: 200,
            }}
        />
    );
}

export default QRCode;