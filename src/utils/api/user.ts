import { buildAPIUrl } from "./misc";

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    bornDate: string;
    phone: string;
}

interface signupUserData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    language: string;
}

interface PasswordData {
    password: string;
    newPassword: string;
}

const signup = async (data: signupUserData) => {
    const response = await fetch(buildAPIUrl('/register'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    });

    console.log('RESPONSE', response);
    const res = await response.json();
    console.log('RES', res)
    if (!response.ok) {
        throw new Error(res.error);
    }
    const accessToken = res.access_token;
    localStorage.setItem('accessToken', accessToken);
    console.log('ACCESS TOKEN', accessToken);

    return accessToken;
};

const getUser = async (accessToken: string) => {
    const response = await fetch(buildAPIUrl('/user-profile'), {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

    const res = await response.json();

    console.log('RES', res)
    
    if (!response.ok) {
        throw new Error(res.error);
        
    }

    return res;
}

const getUserPersonalInfo = async (accessToken: string) => {
    const response = await fetch(buildAPIUrl('/user-personal-info'), {
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

const updateUserPersonalInfo = async (accessToken: string, userData: UserData) => {
    console.log('userData???', userData)
    const response = await fetch(buildAPIUrl('/user-personal-info'), {
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

    const updatedUser: UserData = await response.json();

    return updatedUser;
};

const updatePassword = async (passwordData: PasswordData) => {
    // const response = await fetch(buildAPIUrl('/user/passowrd'), {
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
    const response = await fetch(buildAPIUrl(`/user/${userId}/payment-status`), {
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

export { signup, getUser, getUserPersonalInfo, updateUserPersonalInfo, updatePassword, getPaymentStatus };
