import { fetchWithErrorHandler } from "./globalFetch";
import { buildAPIUrl } from "./misc";

const getLanguage = async (accessToken: string) => {
    const response = await fetchWithErrorHandler(buildAPIUrl('/user/language'), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(response.error);
    }
    console.log('RESPONSE', response);
    const languageData = await response.json();
    const data = languageData.language;
    console.log('DADADATATATA', data)

    return data;
};

export { getLanguage };
