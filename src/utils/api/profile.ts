interface BasicInformation {
    countryOfResidence: string;
    countryOfCitizenship: string;
    fieldOfStudy: string;
    educationDegree: string;
    workingIndustry: string;
    yearsOfExperience: string;
    languageAbility: string;
}

interface BusinessInformation {
    investmentCapitalAvailableRange: string;
    isEntrepreneuer: string;
}

interface FamilyInformation {
    maritalStatus: string;
    noOfDependentAccompanyingYou: string;
    healthStatus: string;
    militaryServiceStatus: string;
    haveCriminalRecord: string;
}

interface PreferenceInformation {
    preferredClimateTypes: string[];
    preferredLanguageTypes: string[];
    preferredLivingCostRange: string;
    preferredIndustryTypes: string[];
}

const getBasicInformation = async (user_id) => {
    // const response = await fetch('/api/user-basic-information');

    // if (!response.ok) {
    //     throw new Error('Failed to fetch user');
    // }

    // const userData: BasicInformation = await response.json();

    const basicInformation = {
        countryOfResidence: 'iran',
        countryOfCitizenship: 'iran',
        fieldOfStudy: 'education',
        educationDegree: 'master',
        workingIndustry: 'software',
        yearsOfExperience: '3',
        languageAbility: 'english',
    }

    return basicInformation;
};

const updateBasicInformation = async (userData: BasicInformation) => {
    // const response = await fetch('/api/user-basic-information', {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userData),
    // });

    // if (!response.ok) {
    //     throw new Error('Failed to update user');
    // }

    // const basicInformation: BasicInformation = await response.json();
    const basicInformation = {
        countryOfResidence: 'iraq',
        countryOfCitizenship: 'iraq',
        fieldOfStudy: 'education',
        educationDegree: 'master',
        workingIndustry: 'software',
        yearsOfExperience: '3',
        languageAbility: 'english',
    }
    console.log('basicInformation', basicInformation);

    return basicInformation;
};

const getBusinessInformation = async (user_id) => {
    // const response = await fetch('/api/user-business-information');

    // if (!response.ok) {
    //     throw new Error('Failed to fetch user');
    // }

    // const userData: BusinessInformation = await response.json();

    const businessInformation = {
        investmentCapitalAvailableRange: '10-15 USD',
        isEntrepreneuer: 'no',
    }

    return businessInformation;
};

const updateBusinessInformation = async (userData: BusinessInformation) => {
    // const response = await fetch('/api/user-business-information', {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userData),
    // });

    // if (!response.ok) {
    //     throw new Error('Failed to update user');
    // }

    // const businessInformation: BusinessInformation = await response.json();
    const businessInformation = {
        investmentCapitalAvailableRange: '10-15 USD',
        isEntrepreneuer: 'yes',
    }

    return businessInformation;
};

const getFamilyInformation = async (user_id) => {
    // const response = await fetch('/api/user-family-information');

    // if (!response.ok) {
    //     throw new Error('Failed to fetch user');
    // }

    // const userData: FamilyInformation = await response.json();

    const familyInformation = {
        maritalStatus: 'married',
        noOfDependentAccompanyingYou: '0',
        healthStatus: 'good',
        militaryServiceStatus: 'completed',
        haveCriminalRecord: 'no'
    };

    return familyInformation;
};

const updateFamilyInformation = async (userData: FamilyInformation) => {
    // const response = await fetch('/api/user-family-information', {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userData),
    // });

    // if (!response.ok) {
    //     throw new Error('Failed to update user');
    // }

    // const familyInformation: FamilyInformation = await response.json();
    const familyInformation = {
        maritalStatus: 'single',
        noOfDependentAccompanyingYou: '0',
        healthStatus: 'good',
        militaryServiceStatus: 'completed',
        haveCriminalRecord: 'no'
    };

    return familyInformation;
};

const getPreferenceInformation = async (user_id: string) => {
    // const response = await fetch('/api/user-preference-information');

    // if (!response.ok) {
    //     throw new Error('Failed to fetch user');
    // }

    // const userData: PreferenceInformation = await response.json();

    const preferenceInformation = {
        preferredClimateTypes: [],
        preferredLanguageTypes: ['english', 'spanish'],
        preferredLivingCostRange: '10-15 USD',
        preferredIndustryTypes: ['software'],
    };

    return preferenceInformation;
};

const updatePreferenceInformation = async (userData: PreferenceInformation) => {
    // const response = await fetch('/api/user-preference-information', {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userData),
    // });

    // if (!response.ok) {
    //     throw new Error('Failed to update user');
    // }

    // const preferenceInformation: PreferenceInformation = await response.json();
    const preferenceInformation = {
        preferredClimateTypes: ['cold'],
        preferredLanguageTypes: ['english'],
        preferredLivingCostRange: '',
        preferredIndustryTypes: ['software'],
    };

    return preferenceInformation;
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
