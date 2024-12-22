import React, { useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';

const useLoading = (delay = 1000) => {
    const isDarkMode = localStorage.getItem('theme')
    const [loading, setLoading] = useState(true);
    console.log(isDarkMode);


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    const LoadingIndicator = (
        isDarkMode === 'dark' ?
            <div className='flex items-center justify-center h-screen' style={{ backgroundColor: '#1e293b' }} >
                <Triangle
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{ backgroundColor: '#1e293b' }}
                />
            </div> :
            <div className='flex items-center justify-center h-screen'  >
                <Triangle
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="triangle-loading"
                    // wrapperStyle={{ backgroundColor: 'yellow' }}
                />
            </div>
    );

    return { loading, LoadingIndicator };
};

export default useLoading;
