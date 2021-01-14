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

export const formatDate = date => {
    const dateToFormat = date instanceof Date ? date : new Date(date);
    return `${getMonthFormatted(dateToFormat.getMonth())} ${dateToFormat.getDate()} ${dateToFormat.getFullYear()}`;
}

const getMonthFormatted = month => {
    switch (String(month)) {
        case "0":
            return 'January';
        case "1":
            return 'February';
        case "2":
            return 'March';
        case "3":
            return 'April';
        case "4":
            return 'May';
        case "5":
            return 'June';
        case "6":
            return 'July';
        case "7":
            return 'August';
        case "8":
            return 'September';
        case "9":
            return 'October';
        case "10":
            return 'November';
        case "11":
            return 'December';
        default:
            return null;
    }
}