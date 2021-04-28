export function getDateStr(date: Date | number | string = new Date()) {
    const dt = new Date(date);
    const y = dt.getFullYear();
    const m = dt.getMonth() + 1;
    const d = dt.getDate();

    return `${y}年${m}月${d}日`;
}
