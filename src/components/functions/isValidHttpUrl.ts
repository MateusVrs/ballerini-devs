export function isValidHttpUrl(string: string | null) {
    let newString = string ? string : ''
    let url;
    try {
        url = new URL(newString);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}