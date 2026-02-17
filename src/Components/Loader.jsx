import React from 'react';

const Loader = ({ size = 'lg', color = 'text-primary' }) => {
    return (
        <div className="flex justify-center items-center p-4">
            <span className={`loading loading-spinner loading-${size} ${color}`}></span>
        </div>
    );
};

export default Loader;
