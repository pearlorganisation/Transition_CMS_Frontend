"use server"
import { backendBaseUrl } from "../../../components/utils/backendUrl"
export const getFocusArea=async()=>{
    try {
        const res = await fetch(`${backendBaseUrl}/focusarea`);
        const data = await res.json()
        return data
    } catch (error) {
       throw error        
    }
}