export const postData = async (data) => {
    const res = await fetch('mailer/smart.php', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`${res.status}`);
    }

    return;
};
