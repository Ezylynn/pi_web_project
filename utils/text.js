function transformText(str) {
    // Split the string into an array of words using the dash as a separator
    return str
        .split('-')
        // Capitalize the first letter of each word and join the rest of the word
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        // Join the array of words back into a string, separated by a space
        .join(' ');
}

module.exports = {transformText}