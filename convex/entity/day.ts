export const getDayBucket = (timestamp: number): string => {
    const date = new Date(timestamp);
    const cutoffHour = 15;

    if (date.getHours() < cutoffHour) {
        date.setDate(date.getDate() - 1);
    }

    return date.toISOString().slice(0, 10);
};