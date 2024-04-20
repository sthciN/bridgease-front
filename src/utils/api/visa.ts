import { ActionType } from "../types";


interface VisaData {
    password: string;
    newPassword: string;
}

const getVisas = async () => {
    // const response = await fetch('/api/visas');
    // if (!response.ok) {
    //   throw new Error('Failed to fetch visas');
    // }
    // const visasData = await response.json();

    const visasData = [
        { id: '1', country: 'Country 1', title: 'Title 1', description: 'Description 1', photo: '/login.jpg' },
        { id: '2', country: 'Country 1', title: 'Title 1', description: 'Description 1', photo: '/login.jpg' },
        { id: '3', country: 'Country 1', title: 'Title 1', description: 'Description 1', photo: '/login.jpg' },
        { id: '4', country: 'Country 1', title: 'Title 1', description: 'Description 1', photo: '/login.jpg' },
        { id: '5', country: 'Country 10', title: 'Title 10', description: 'Description 10', photo: '/login.jpg' },
    ];
    return visasData;
};

const getVisaProgram = async (id: string) => {
    // const response = await fetch('/api/visa/{id}');

    // if (!response.ok) {
    //     throw new Error('Failed to fetch visa');
    // }

    // const visaData: VisaData = await response.json();
    console.log('id', id);
    const visaData = {
        id: '1',
        title: 'Tourist Visa',
        country: 'USA',
        description: 'A tourist visa is a short-term visa that allows the holder to visit the USA for leisure or tourism. Tourist visas are also known as visitor visas. In the USA, the most common type of tourist visa is the B-2 visa. The B-2 visa is generally granted for 6 months and allows the holder to undertake activities such as tourism, visiting friends and relatives, medical treatment and participation in social events hosted by various organizations.',
        photo: '/login.jpg',
    };

    return visaData;
};

const getTimeline = async () => {
    // const timelineResponse = await fetch('/api/timeline', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         userId: 10,
    //     }),
    // });

    // if (!timelineResponse.ok) {
    //     // Handle error
    //     console.error('Failed to get timeline');
    //     return;
    // }

    // // Handle timeline data
    // const timelineData = await timelineResponse.json();

    const timelineData = null


    return timelineData;
};


const generateTimeline = async (id: string) => {
    // const response = await fetch('/api/timeline/generate', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         userId: id,
    //     }),
    // });

    // if (!response.ok) {
    //     throw new Error('Failed to get timeline');
    // }

    // const timelineData = await response.json();

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

export { getVisas, getVisaProgram, getTimeline, generateTimeline };
