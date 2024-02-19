const fsPromises = require("fs/promises");
const path = require("path")
/*
    - Whitespaces are ignored in this function
    - Any non-alphanumeric characters will be considered unmatched
    - If the student's answer is longer than 10000, return 10000!
    - This file is still in completion
 */
    const rankingPiAnswers = async (studentAnswers) => {
        try {
            const piFilePath = path.join(__dirname, "pi.txt");
            const piBuffer = await fsPromises.readFile(piFilePath);
            // Remove whitespace and then non-alphanumeric characters except the decimal point
            const pi = piBuffer.toString().replace(/\s+/g, '').replace(/[^0-9.]/g, '');
    
            const leaderboard = studentAnswers.map(studentAnswer => {
                // Check if answer is a string, if not, use an empty string
                const answer = typeof studentAnswer.answer === 'string'
                    ? studentAnswer.answer.replace(/\s+/g, '').replace(/[^0-9.]/g, '')
                    : '';
            
                let piNumbersGuessed = 0;
            
                for (let i = 0; i < answer.length && i < pi.length; i++) {
                    if (answer[i] === pi[i]) {
                        // Increase the count for each matched digit, ignoring the decimal point
                        if (answer[i] !== '.') {
                            piNumbersGuessed++;
                        }
                    } else {
                        // Stop counting at the first mismatch
                        break;
                    }
                }
            
                // Limit the piNumbersGuessed to 10000 if it's longer
                if (piNumbersGuessed > 10000) {
                    piNumbersGuessed = 10000;
                }
            
                return {
                    ...studentAnswer,
                    piNumbersGuessed: piNumbersGuessed
                };
            });
            
    
            // Sort the leaderboard by piNumbersGuessed in descending order
            leaderboard.sort((a, b) => b.piNumbersGuessed - a.piNumbersGuessed);
    
            // Set the position on the leaderboard
            leaderboard.forEach((item, index) => {
                item.position = (index + 1).toString();
                item.piNumbersGuessed = item.piNumbersGuessed.toString();
            });
    
            return leaderboard;
    
        } catch (err) {
            console.error("Error:", err);
        }
    };

module.exports = {rankingPiAnswers}