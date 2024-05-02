import { buildAPIUrl } from "../routes";

async function fetchWithErrorHandler(url: string, options: RequestInit) {
    console.log('options', options)
    options.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await fetch(url, options);
    
    if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error == 'ExpiredAccessError') {
            console.log('options.headers', options.headers)
            // handle expired access token
            const refreshTokenResponse = await fetch(buildAPIUrl('/user/refresh-token'), {
                headers: options.headers
            });
            if (!refreshTokenResponse.ok) {
                // console.log('refreshTokenResponse', refreshTokenResponse)
                throw new Error('Failed to refresh token');
            }
            const refreshTokenData = await refreshTokenResponse.json();
            console.log('refreshTokenData', refreshTokenData)
            
            // store the new access token
            localStorage.setItem('accessToken', refreshTokenData.access_token);
            
            options.headers.Authorization = `Bearer ${refreshTokenData.access_token}`;
            // retry the original request
            const retryResponse = await fetch(url, options);

            return retryResponse;
        }
        throw new Error(errorData.message || 'An error occurred');
    }

    return response;
}

export { fetchWithErrorHandler };