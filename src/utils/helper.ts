export const validateEmail = (email: string) => {
    const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export const validateRequire = (value: string, name: string) => {
    const valueTrim = value.trim();
    if (valueTrim.length === 0) {
        return `${name} is required`;
    }
    return null;
}

export const getInitials = (name: string) => {
    if (!name) return "";
    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
}