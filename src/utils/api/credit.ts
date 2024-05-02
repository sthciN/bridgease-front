const getCredit = async (userId: string) => {
    // const response = await fetchWithErrorHandler(`/api/credit/${userId}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // });

    // if (!response.ok) {
    //     throw new Error('Failed to get credit status');
    // }

    // const creditStatus = await response.json();

    const creditStatus = {"credits": 1}
    
    return creditStatus;
};

export { getCredit };
