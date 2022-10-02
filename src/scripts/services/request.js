export const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
}
