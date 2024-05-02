import { buildAPIUrl } from "../routes";
import { fetchWithErrorHandler } from "./globalFetch";


interface BasicInformation {
    countryOfCitizenship: string | null;
    countryOfResidence: string | null;
    educationDegree: string | null;
    fieldOfStudy: string | null;
    languages: { language: string, languageLevel: string }[] | null;
    workingIndustry: string | null;
    yearsOfExperience: number | null;
}

interface BusinessInformation {
    investmentCapitalAvailableRange: string | null;
    isEntrepreneuer: string | null;
}

interface FamilyInformation {
    maritalStatus: string | null;
    noOfDependentAccompanyingYou: string | null;
    healthStatus: string | null;
    militaryServiceStatus: string | null;
    haveCriminalRecord: string | null;
}

interface PreferenceInformation {
    preferredClimate: string[] | null;
    preferredLanguage: string[] | null;
    preferredLivingCostRange: string | null;
    preferredIndustry: string | null;
}

const getBasicInformation = async (accessToken: string) => {
    const response = await fetchWithErrorHandler(buildAPIUrl('/client-basic-information'), {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },

    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    const data: BasicInformation = await response.json();
    if (data.languages) {
        data.languages = JSON.parse(data.languages);
    } else {
        data.languages = [{ language: '', languageLevel: '' }];
    }

    return data;
};

const updateBasicInformation = async (accessToken: string, userData: BasicInformation) => {
    const response = await fetchWithErrorHandler(buildAPIUrl('/client-basic-information'), {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to update user');
    }

    const res = await response.json();

    return res;
};

const getBusinessInformation = async (accessToken: string) => {
    const response = await fetchWithErrorHandler(buildAPIUrl('/user-business-information'), {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },

    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    const data: BusinessInformation = await response.json();

    return data;
};

const updateBusinessInformation = async (accessToken: string, userData: BusinessInformation) => {
    const response = await fetchWithErrorHandler(buildAPIUrl('/user-business-information'), {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to update user');
    }

    const businessInformation = await response.json();

    return businessInformation;
};

const getFamilyInformation = async (accessToken: string) => {
    const response = await fetchWithErrorHandler(buildAPIUrl('/client-family-information'), {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    const data: FamilyInformation = await response.json();

    return data;
};

const updateFamilyInformation = async (accessToken: string, userData: FamilyInformation) => {
    const response = await fetchWithErrorHandler(buildAPIUrl('/client-family-information'), {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to update user');
    }

    const familyInformation = await response.json();

    return familyInformation;
};

const getPreferenceInformation = async (user_id: string) => {
    const response = await fetchWithErrorHandler(buildAPIUrl('/user-preference-information'), {
        headers: {
            'Authorization': `Bearer ${user_id}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    const data: PreferenceInformation = await response.json();

    console.log('UUUSSSEEERRRRRDAAATAAAAA', data);

    return data;
};

const updatePreferenceInformation = async (accessToken: string, userData: PreferenceInformation) => {
    console.log('SEENNNNDDDDDDDuserData???', userData)
    const response = await fetchWithErrorHandler(buildAPIUrl('/user-preference-information'), {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to update user');
    }

    const data = await response.json();

    return data;
};

export {
    getBasicInformation,
    updateBasicInformation,
    getBusinessInformation,
    updateBusinessInformation,
    getFamilyInformation,
    updateFamilyInformation,
    getPreferenceInformation,
    updatePreferenceInformation
};
