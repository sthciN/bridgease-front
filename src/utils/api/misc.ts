import { buildAPIUrl } from "../routes";
import { fetchWithErrorHandler } from "./globalFetch";


const getcountries = async (accessToken: string) => {
    const response = await fetchWithErrorHandler(buildAPIUrl('/countries'), {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

    const res = await response.json();
    
    if (!response.ok) {
        throw new Error(res.error);
        
    }

    return res;
}

export { buildAPIUrl, getcountries };
