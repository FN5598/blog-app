export function blogReadingTime(contentLength) {
    const readingTime = Math.ceil(contentLength / 260);
    if (readingTime <= 1) {
        return "1 min"
    } else if (readingTime > 1 && readingTime <= 60) {
        return `${readingTime} min`
    } else {
        const hours = Math.floor(readingTime / 60);
        const minutes = readingTime % 60;
        return `${hours} hr ${minutes} min`
    }
}