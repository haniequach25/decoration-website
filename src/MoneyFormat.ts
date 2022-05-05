export default function numberWithCommas(x: any) {
    if (typeof x === "number") {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x;
}