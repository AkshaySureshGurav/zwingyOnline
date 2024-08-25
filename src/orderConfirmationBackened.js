export async function orderConfirmationBackened(cartData) {
    const url = 'https://grove-calico-hexagon.glitch.me/sendEmail';
    console.log(cartData)

    try {
        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            // Add other headers if needed
            },
            body: JSON.stringify({"order": cartData}), // Body data as JSON
        });

        if (!response.ok) { // Check if the request was successful
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); 
        console.log("Order placed at backened (Confirmation/Email) - " + (result.status === 200));
        return result.status === 200; // Handle the result here (e.g., update UI, state)
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return 0;
    }
}
