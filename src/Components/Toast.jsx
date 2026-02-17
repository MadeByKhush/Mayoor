import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const ToastContainer = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#333',
                    color: '#fff',
                },
                success: {
                    style: {
                        background: 'green',
                    },
                },
                error: {
                    style: {
                        background: 'red',
                    },
                },
            }}
        />
    );
};

export const showToast = {
    success: (msg) => toast.success(msg),
    error: (msg) => toast.error(msg),
    info: (msg) => toast(msg),
};
