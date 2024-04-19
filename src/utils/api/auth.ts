import { User }  from '../types';

export async function loginUser(email: string, password: string): Promise<User | null> {
    // const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    // });

    // if (!response.ok) {
    //     throw new Error('Login failed');
    // }

    // const data = await response.json();

    // return data.user;

    const user: User = {
        email: 'email',
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        role: 'user'
    };

    return user;
}
