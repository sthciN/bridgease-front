import { ActionType } from "../types";
import { buildAPIUrl } from "./misc";


interface VisaData {
    doc_id: string;
    title: string;
    country: string;
    short_summary: string;
}

const processVisaCard = async (accessToken: string) => {
    const response = await fetch(buildAPIUrl('/user/process-visa-card'), {
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
        const visaPrograms = JSON.parse(data.visaPrograms);
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
    const response = await fetch(buildAPIUrl('/user/reprocess-visa-card'), {
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
        const visaPrograms = JSON.parse(data.visaPrograms);
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
    const response = await fetch(buildAPIUrl('/user/visa-card'), {
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

    const visaPrograms = JSON.parse(data.visaPrograms);
    console.log('visa', visaPrograms)
    for (const visa of visaPrograms) {
        // Add photo from public to the visa object
        visa.photo = `/visa-card/${visa.doc_id}.jpeg`;
    }
    // const visaPrograms = [
    //     { id: '1', country: 'Country 1', title: 'Title 1', description: 'Description 1', photo: '/login.jpg' },
    //     { id: '2', country: 'Country 1', title: 'Title 1', description: 'Description 1', photo: '/login.jpg' },
    //     { id: '3', country: 'Country 1', title: 'Title 1', description: 'Description 1', photo: '/login.jpg' },
    //     { id: '4', country: 'Country 1', title: 'Title 1', description: 'Description 1', photo: '/login.jpg' },
    //     { id: '5', country: 'Country 10', title: 'Title 10', description: 'Description 10', photo: '/login.jpg' },
    // ];
    return visaPrograms;
};

const getVisaProgram = async (accessToken: string, id: string) => {
    const response = await fetch(buildAPIUrl(`/user/visa-program/${id}`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })

    if (!response.ok) {
        throw new Error('Failed to fetch visa');
    }

    const jsonResponse = await response.json();
    const data = jsonResponse[0]
    console.log('id', id);
    data.photo = `/visa-card/${data.doc_id}.jpeg`;
    // const visaData = {
    //     id: '1',
    //     title: 'Tourist Visa',
    //     country: 'USA',
    //     description: 'A tourist visa is a short-term visa that allows the holder to visit the USA for leisure or tourism. Tourist visas are also known as visitor visas. In the USA, the most common type of tourist visa is the B-2 visa. The B-2 visa is generally granted for 6 months and allows the holder to undertake activities such as tourism, visiting friends and relatives, medical treatment and participation in social events hosted by various organizations.',
    //     photo: '/login.jpg',
    // };

    return data;
};

const fetchTimeline = async (accessToken: string, id: string) => {
    const timelineResponse = await fetch(buildAPIUrl(`/user/fetch-timeline/${id}`), {
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

    const timelineData = JSON.parse(data.timeline)

    if (timelineData.length === 0) {
        // Handle error
        throw new Error('There is no timeline data');
    }

    return timelineData;
};

const getTimeline = async (accessToken: string, id: string) => {
    const timelineResponse = await fetch(buildAPIUrl(`/user/timeline/${id}`), {
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

    const timelineData = JSON.parse(data.timeline)

    if (timelineData.length === 0) {
        // Handle error
        throw new Error('There is no timeline data');
    }

    return timelineData;
};


const processTimeline = async (accessToken: string, id: string) => {
    const response = await fetch(buildAPIUrl(`/user/process-timeline/${id}`), {
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

export { processVisaCard, reprocessVisaCard, getVisaCards, getVisaProgram, fetchTimeline, getTimeline, processTimeline };
