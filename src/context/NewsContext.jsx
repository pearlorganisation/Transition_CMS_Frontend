"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { backendBaseUrl } from "../components/utils/backendUrl"

const NewsContext = createContext()
// my news provider for wrapping the global layout so that data is available throughout the application.
export function NewsProvider({children}){
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${backendBaseUrl}/blogs`);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                const map = new Map();

                result?.data?.forEach((element) => {
                    if (!map?.has(element?.blogType)) {
                        map.set(`${element.blogType}`, [{ ...element }]);
                    } else {
                        const currentArray = map?.get(element?.blogType);
                        currentArray.push(element);
                    }
                });

                setNewsData(map);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <NewsContext.Provider value={{ newsData, loading, error }}>
            {children}
        </NewsContext.Provider>
    );
}

// my hook to access the blogs data
export function useNews() {
    const context = useContext(NewsContext);
    if (context === undefined) {
        throw new Error('useNews must be used within a NewsProvider');
    }
    return context;
}