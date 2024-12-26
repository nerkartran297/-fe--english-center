// Types for the API response
interface UserRoleResponse {
    userRole: string;
    mongoID: string;
    isActivated: boolean;
}

interface APIError {
    error: string;
    message?: string;
}

// API base URL
const API_BASE_URL = "http://localhost:5000";

/**
 * Fetches the user role and related information from the backend
 * @param clerkUserId - The Clerk user ID
 * @returns Promise with user role information
 * @throws Error if the request fails
 */
export const getUserRole = async (
    clerkUserId: string
): Promise<UserRoleResponse> => {
    try {
        if (!clerkUserId) {
            throw new Error("Clerk User ID is required");
        }

        const response = await fetch(
            `${API_BASE_URL}/api/get-role?clerkUserId=${encodeURIComponent(
                clerkUserId
            )}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorData: APIError = await response.json();
            throw new Error(errorData.message || "Failed to fetch user role");
        }

        const data: UserRoleResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user role:", error);
        throw error;
    }
};

// Example usage in your component:
/*
import { getUserRole } from '@/utils/api';

// In your component:
try {
    const userRoleData = await getUserRole(user.id);
    console.log(userRoleData.userRole);
    console.log(userRoleData.mongoID);
    console.log(userRoleData.isActivated);
} catch (error) {
    console.error('Error:', error);
}
*/
