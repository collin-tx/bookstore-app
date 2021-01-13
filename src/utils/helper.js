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
    const random = () => Math.floor(Math.random() * 100000);
    return `${index}_${new Date().getTime() * random() * random() + 69}`;
}

export const validateEmail = email => {
    // TODO: tighten this later
    return email.includes('@', '.') && email.length > 5;
}

export const validatePassword = (pass1, pass2) => {
    return pass1 === pass2 && pass1.length > 0;
}

let quotesLength = Object.keys(quotes).length;
export const quote = quotes[Math.ceil(Math.random() * quotesLength)];
