interface UserData {
    firstName: string;
    lastName: string;
}

interface PasswordData {
    password: string;
    newPassword: string;
}

const getUser = async (user_id) => {
    // const response = await fetch('/api/user');

    // if (!response.ok) {
    //     throw new Error('Failed to fetch user');
    // }

    // const userData: UserData = await response.json();

    const userData = {
        firstName: 'Drake',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        factors: ['Factor 1', 'Factor 2', 'Factor 3'],
    };
    console.log('here?')
    return userData;
}

const updateUser = async (userData: UserData) => {
    // const response = await fetch('/api/user', {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userData),
    // });

    // if (!response.ok) {
    //     throw new Error('Failed to update user');
    // }

    // const updatedUser: UserData = await response.json();
    const updatedUser = {
        firstName: 'Drakrrrre',
        lastName: 'Doe',
        email: 'ecample@example.com'
    }

    return updatedUser;
};

const updatePassword = async (passwordData: PasswordData) => {
    // const response = await fetch('/api/user/passowrd', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(passwordData),
    // });

    // if (!response.ok) {
    //   throw new Error('Failed to update password');
    // }

    // const updatedPassword: PasswordData = await response.json();

    return true;
};

const getPaymentStatus = async (userId: string) => {
    const response = await fetch(`/api/user/${userId}/payment-status`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get payment status');
    }

    const paymentStatus: boolean = await response.json();

    return paymentStatus;
};

export { getUser, updateUser, updatePassword, getPaymentStatus };
