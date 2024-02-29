import axios from "axios";
const baseUrl = 'http://localhost:3100';

export const fetchDrivesListApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/sessions`);
        return response.data.data
    } catch (error) {
        console.log('Error retrieving data:', error);
    }
}