import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QRScannerProps {
    onScanSuccess: (decodedText: string) => void;
    onScanError?: (errorMessage: string) => void;
    onClose: () => void;
}

/**
 * QRScanner Component
 * Uses html5-qrcode to scan QR codes from the camera.
 */
const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanError, onClose }) => {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            /* verbose= */ false
        );

        const handleSuccess = (decodedText: string) => {
            scanner.clear();
            onScanSuccess(decodedText);
        };

        const handleError = (error: string) => {
            if (onScanError) onScanError(error);
        };

        scanner.render(handleSuccess, handleError);

        return () => {
            scanner.clear().catch(error => console.error("Failed to clear scanner", error));
        };
    }, [onScanSuccess, onScanError]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
                    Escanear Código QR
                </h3>
                <div id="reader" style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }}></div>
                <button
                    onClick={onClose}
                    className="btn-primary"
                    style={{ marginTop: '1.5rem', width: '100%', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)' }}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default QRScanner;
