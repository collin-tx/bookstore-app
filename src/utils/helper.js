export const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const stripWhiteSpace = (string) => {
    string = string.replace(/\s+/g, '-').toLowerCase();
    return string;
}

export const generateKey = (index) => {
    return `${index}_${new Date().getTime() * (Math.floor(Math.random() * 67))}`;
}

export const getQuote = quotesList => {
    let quotesLength = Object.keys(quotesList).length;
    const quote = quotesList[Math.ceil(Math.random() * quotesLength)];
    return quote;
}