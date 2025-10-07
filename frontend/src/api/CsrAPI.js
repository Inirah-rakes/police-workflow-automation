import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const fetchRequests = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}requests/`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch CSR requests:", error);
        throw error;
    }
};

// Function now sends an array of request IDs
export const sendToProvider = async (request_ids) => {
    try {
        const response = await axios.post(`${API_BASE_URL}requests/send-to-provider/`, { request_ids });
        return response.data;
    } catch (error) {
        console.error(`Failed to send requests:`, error.response?.data || error.message);
        throw error;
    }
};

//Function to forward a response to the station
export const forwardToStation = async (requestId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}requests/${requestId}/forward-to-station/`);
        return response.data;
    } catch (error) {
        console.error(`Failed to forward request ${requestId}:`, error.response?.data || error.message);
        throw error;
    }
};
// ---FUNCTION TO FETCH ANALYTICS DATA ---
export const fetchAnalyticsData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}analytics/`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch analytics data:", error);
        throw error;
    }
};

