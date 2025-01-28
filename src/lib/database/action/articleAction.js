"use server"

export const getAllArticles =async()=>{
    try {
        const res = await fetch(`http://localhost:8000/api/v1/articles`)
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        return error
    }
}