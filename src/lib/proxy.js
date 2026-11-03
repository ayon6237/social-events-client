// src/lib/proxy.js
export const fetchProxy = async (endpoint, options = {}) => {
    // Local storage theke token nicchi
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Token thakle header e Bearer token hisebe add kora hocche
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    return response;
};