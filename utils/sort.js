function sortByName(records) {
    return records.sort((a, b) => a.full_name.localeCompare(b.name));
}
function sortByScore(records) {
    return records.sort((a, b) => b.score - a.score);
}

function sortById(records) {
    return records.sort((a, b) => a.id - b.id);
}
function sortByClass(records){

    return records.sort((a, b) => {
        // Extract numerical and alphabetical parts from strings
        const [numA, charA] = [parseInt(a.grade), a.grade.replace(/^\d+/, '')];
        const [numB, charB] = [parseInt(b.grade), b.grade.replace(/^\d+/, '')];

        // Compare numerical parts
        if (numA !== numB) {
            return numA - numB;
        }

        // If numerical parts are equal, prioritize numerical part
        // Compare alphabetical parts based on custom order B, V, I, S
        const order = ['B', 'V', 'I', 'S'];
        return order.indexOf(charA) - order.indexOf(charB);
    });
}

module.exports = { sortByClass, sortById, sortByScore, sortByName}