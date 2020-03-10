import quotes from '../quotes.json';

export const handleErrors = response => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const stripWhiteSpace = string => {
    string = string.replace(/\s+/g, '-').toLowerCase();
    return string;
}

export const generateKey = index => {
    return `${index}_${new Date().getTime() * (Math.floor(Math.random() * 67) * (Math.floor(Math.random() * 67)))}`;
}

let quotesLength = Object.keys(quotes).length;
export const quote = quotes[Math.ceil(Math.random() * quotesLength)];