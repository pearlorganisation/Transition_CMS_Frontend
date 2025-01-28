"use server"
export const getAllArticles = async () => {
    try {
        const res = await fetch(`http://localhost:8000/api/v1/articles`);
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        const data = await res.json(); // Parse JSON data
        return data;
    } catch (error) {
        console.error("Error in getAllArticles:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};
