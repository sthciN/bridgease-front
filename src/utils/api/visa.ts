import { buildAPIUrl } from "../routes";
import { ActionType } from "../types";
import { fetchWithErrorHandler } from "./globalFetch";


interface VisaData {
    doc_id: string;
    title: string;
    country: string;
    short_summary: string;
}

const processVisaCard = async (accessToken: string) => {
    const language = localStorage.getItem('language') || '';
    const response = await fetchWithErrorHandler(buildAPIUrl(`/user/process-visa-card?language=${language}`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch visas');
    }

    const data = await response.json();
    console.log('data', data)
    if (data.visaPrograms) {
        const visaPrograms = data.visaPrograms;
        console.log('visa', visaPrograms)
        for (const visa of visaPrograms) {
            // Add photo from public to the visa object
            visa.photo = `/visa-card/${visa.doc_id}.jpeg`;
        }
        data.visaPrograms = visaPrograms;
        return data;
    }
    return data;

};

const reprocessVisaCard = async (accessToken: string) => {
    const response = await fetchWithErrorHandler(buildAPIUrl('/user/reprocess-visa-card'), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch visas');
    }

    const data = await response.json();
    console.log('data', data)
    if (data.visaPrograms) {
        const visaPrograms = data.visaPrograms;
        console.log('visa', visaPrograms)
        for (const visa of visaPrograms) {
            // Add photo from public to the visa object
            visa.photo = `/visa-card/${visa.doc_id}.jpeg`;
        }
        data.visaPrograms = visaPrograms;
        return data;
    }
    return data;

};

const getVisaCards = async (accessToken: string) => {
    const language = localStorage.getItem('language') || '';
    const response = await fetchWithErrorHandler(buildAPIUrl(`/user/visa-card?language=${language}`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },

    });

    if (!response.ok) {
        throw new Error('Failed to fetch visas');
    }

    const data = await response.json();
    console.log('data', data)

    if (data.length === 0) {
        throw new Error('No visas found');
    }

    const visaPrograms = data.visaPrograms;
    console.log('visa', visaPrograms)
    for (const visa of visaPrograms) {
        // Add photo from public to the visa object
        visa.photo = `/visa-card/${visa.doc_id}.jpeg`;
    }

    return visaPrograms;
};

const getVisaProgram = async (accessToken: string, id: string) => {
    const language = localStorage.getItem('language') || '';
    const response = await fetchWithErrorHandler(buildAPIUrl(`/user/visa-program/${id}?language=${language}`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })

    if (!response.ok) {
        throw new Error('Failed to fetch visa');
    }

    const jsonResponse = await response.json();
    console.log('::jsonResponse::', jsonResponse);
    const data = jsonResponse.visaProgram
    console.log('id', id);
    data.photo = `/visa-card/${data.doc_id}.jpeg`;

    return data;
};

const getTimeline = async (accessToken: string, id: string) => {
    const language = localStorage.getItem('language') || '';
    const timelineResponse = await fetchWithErrorHandler(buildAPIUrl(`/user/timeline/${id}?language=${language}`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!timelineResponse.ok) {
        // Handle error
        throw new Error('Failed to get timeline');
    }

    const data = await timelineResponse.json();

    if (!data.timeline) {
        // Handle error
        throw new Error('There is no timeline data');
    }

    const timelineData = data.timeline;

    if (timelineData.length === 0) {
        // Handle error
        throw new Error('There is no timeline data');
    }

    return timelineData;
};

const processTimeline = async (accessToken: string, id: string) => {
    const language = localStorage.getItem('language') || '';
    const response = await fetchWithErrorHandler(buildAPIUrl(`/user/process-timeline/${id}?language=${language}`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    });

    if (!response.ok) {
        throw new Error('Failed to get timeline');
    }

    const data = await response.json();
    console.log('>>>>DATA<<<<<', data)

    const timelineData = [
        { date: '2022-01-01', iconType: ActionType.SubmitDocument, action: 'Submit application' },
        { date: '2022-01-15', iconType: ActionType.Payment, action: 'Pay application fee' },
        { date: '2022-02-01', iconType: ActionType.SubmitDocument, action: 'Submit supporting documents' },
        { date: '2022-02-15', iconType: ActionType.Scheduling, action: 'Schedule interview' },
        { date: '2022-03-01', iconType: ActionType.AttendInterview, action: 'Attend interview' },
        { date: '2022-03-15', iconType: ActionType.ReceiveDocument, action: 'Receive decision' },
    ];

    return timelineData;
};

export { processVisaCard, reprocessVisaCard, getVisaCards, getVisaProgram, getTimeline, processTimeline };
