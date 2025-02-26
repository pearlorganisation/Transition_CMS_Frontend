// "use server"
// import { backendBaseUrl } from "../../../components/utils/backendUrl"
// export const getAllArticles = async () => {
//     try {
//         const res = await fetch(`${backendBaseUrl}/articles`);
//         if (!res.ok) {
//             throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
//         }
//         const data = await res.json(); // Parse JSON data
//         return data;
//     } catch (error) {
//         console.error("Error in getAllArticles:", error);
//         throw error; // Re-throw the error to handle it in the calling function
//     }
// };

 
// export const getAllNews = async () => {
//     try {
//         const res = await fetch(`${backendBaseUrl}/news`)
//         const data = await res.json()
//         return data;
//     } catch (error) {
//         console.log(error)
//         throw error
//     }
// }


// export const getAllPodcasts= async()=>{
//     try {
//         const res = await fetch(`${backendBaseUrl}/podcast`)
//         const data = await res.json();
//         return data
//     } catch (error) {
//         console.log(error)
//         throw error        
//     }
// }