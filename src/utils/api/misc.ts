const BASE_URL = 'http://127.0.0.1:5000';

const buildAPIUrl = (path: string) => `${BASE_URL}${path}`;

const getcountries = async (accessToken: string) => {
    const response = await fetch(buildAPIUrl('/countries'), {
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
