"use server"
import { backendBaseUrl } from "../../../components/utils/backendUrl"
export const getFocusArea= async function(){
    try {
        const res = await fetch(`${backendBaseUrl}/focusarea`,{
            cache:'no-store'
        });
        const data = await res.json()
        return data
    } catch (error) {
       throw error        
    }
}