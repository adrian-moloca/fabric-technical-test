import axios, { AxiosError, AxiosResponse } from "axios"
import { IFetchResponse } from "../interfaces"

// Put here the server url
const baseURL: string = 'http://localhost:5050/technical-test/api/tests/movies/';

/* Use the next function to fetch any of the three matrix collections
 * It will call the server side to get the collection from the imdb api   
 * It will return to us a Promise --> if rejected it will be a string else an object of IFetchResponse type
 */
export const fetchCollection = async (path: string): Promise<IFetchResponse | string>  => {
    try {
        // saving the axios response from server
        const res = await axios.get(baseURL+path) as unknown as AxiosResponse;
        // parsing the data from response to valide it on typescript
        const data = res.data as IFetchResponse; 
        return data;
    } catch (err) {
        const error = err as AxiosError;
        const errorData = error.response?.data as string || 'Failed fetching movies.';
        return errorData;
    }
}