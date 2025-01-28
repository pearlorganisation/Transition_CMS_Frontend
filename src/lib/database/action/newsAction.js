"use server"
import { backendBaseUrl } from "../../../components/utils/backendUrl"
export const getAllNews =async()=>{
  try {
    const res = await fetch(`${backendBaseUrl}/news`)
    const data = await res.json()
    return data;
  } catch (error) {
    console.log(error)
    throw error    
  }
}