function stringFormatting(inputString, sufix) {
    const formattedString = inputString.replace(/\s+/g, '-');
    const result = formattedString + sufix;
    return result;
}

export default stringFormatting