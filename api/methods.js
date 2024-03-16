
import Api,{apiBaseURL,serializeQuery} from './Api'

export const getApi = async (endpoint, query) => {

    try {
        const queryString = serializeQuery(query);
        console.log('url:  ',`${apiBaseURL}${endpoint}?${queryString}`)
        const response = await Api.get(`${apiBaseURL}${endpoint}?${queryString}`);
        if (response.status === 200) {
            console.log(response, 'SUCCESS')
            
            return response.data;
        } else {
            console.log(response, 'Failed to fetch data')
            throw new Error("Failed to fetch data");
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
};

export const postApi = async (endpoint,payload) => {

    try{
        const response = await Api.post(`${apiBaseURL}${endpoint}`,payload);
        console.log(response)
        if(response.status ===200){
            return response.data;
        }else{
           throw new Error(response.data.message)
        }
    }catch(error){
        return error
    }
};
