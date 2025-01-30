"use server";
import { backendBaseUrl } from "../../../components/utils/backendUrl";

export const getAllTeamMembers = async () => {
    try {
        const res = await fetch(`${backendBaseUrl}/teams`);
        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch team members:", error);
        throw error;
    }
};