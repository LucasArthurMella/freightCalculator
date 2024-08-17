export const cepMask = (value: String | undefined) => {
    if (!value) return ''
    value = value.replace(/\D/g, "")
    .replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
    .replace(/(-\d{3})(\d+?)/, '$1')    
    console.log(value);
    return value;
}
