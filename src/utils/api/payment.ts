import { fetchWithErrorHandler } from "./globalFetch";

// Step 3: Collect payment information
const collectPaymentInformation = () => {
    // This is a placeholder function. In a real application, you would collect this information from a form.
    return {
        cardNumber: '4111111111111111',
        expiryDate: '12/24',
        cvv: '123',
        cardHolderName: 'John Doe',
    };
};

// Step 4: Send payment information to payment gateway
const processPayment = async (paymentInformation, amount) => {
    const response = await fetchWithErrorHandler('/api/process-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            paymentInformation,
            amount,
        }),
    });

    if (!response.ok) {
        throw new Error('Payment processing failed');
    }

    const paymentResult = await response.json();

    return paymentResult;
};

// Step 5: Verify payment
const verifyPayment = async (paymentResult) => {
    if (paymentResult.status !== 'success') {
        throw new Error('Payment verification failed');
    }

    return true;
};

const paymentInformation = collectPaymentInformation();
const paymentResult = await processPayment(paymentInformation, 100); // Let's say the amount is 100
const isPaymentVerified = await verifyPayment(paymentResult);

if (isPaymentVerified) {
  console.log('Payment successful');
} else {
  console.log('Payment failed');
}
