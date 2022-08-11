const toDecimal = (num: any,digit:any) => {
        const d = digit * 10
        return isNaN(parseFloat(num))?0:Math.round(num*d)/d;
}

export default toDecimal