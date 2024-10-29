export const generate2DArray = (rows: number): [number, number][] => {
    const result: [number, number][] = [];

    for (let i = 0; i < rows; i++) {
        const integerValue = Math.floor(Math.random() * 101);  
        const floatValue = Math.random();  
        result.push([integerValue, floatValue]);
    }

    return result;
};
