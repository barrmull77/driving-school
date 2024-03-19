import axios from "axios";
const baseUrl = 'http://localhost:3100';

export const fetchDrivesListApi = async (page = 1, pageSize = 20) => {
    try {
        const response = await axios.get(`${baseUrl}/api/sessions`, {
            params: {
                page,
                pageSize,
            },
        });
        const { data, metaData } = response.data;
        return {
            drives: data,
            // Determine if there are more items based on totalCount and items fetched so far
            hasMore: ((page - 1) * pageSize + metaData.count) < metaData.totalCount,
        };
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw error; // Important to throw the error for the caller to handle
    }
};