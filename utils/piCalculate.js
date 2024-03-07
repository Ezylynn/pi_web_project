
const fsPromises = require("fs").promises;
const path = require("path");

const rankingPiAnswers = async (studentAnswers) => {
    try {
        const piFilePath = path.join(__dirname, "pi.txt");
        const piBuffer = await fsPromises.readFile(piFilePath);
        
      
        const pi = piBuffer.toString().split(" ").join("");
        console.log(pi)
        

        const leaderboard = studentAnswers.map(studentAnswer => {
            const answer = typeof studentAnswer.answer === 'string'? studentAnswer.answer: '';

            if (!answer) {
                return {
                    ...studentAnswer,
                    rightPositions: [],
                    wrongPositions: [],
                    score: 0,
                    percentageCorrect: "0.00",
                    error: "Empty answer"
                };
            }

            let rightPositions = [];
            let wrongPositions = [];
            let score = 0;
            let firstWrongEncountered = false;

            for (let i = 0; i < Math.min(answer.length, pi.length); i++) {
                if (answer[i] === "." && pi[i] === ".") continue
                if (answer[i] === pi[i]) {
                    rightPositions.push(i);
                    if (!firstWrongEncountered) {
                        score++;
                    }
                } else {
                    wrongPositions.push(i);
                    firstWrongEncountered = true;
                }
            }

            
            for (let i = pi.length; i < answer.length; i++) {
                wrongPositions.push(i);
            }

            return {
                ...studentAnswer,
                rightPositions: rightPositions,
                wrongPositions: wrongPositions,
                score: score,
                percentageCorrect: ((rightPositions.length/(rightPositions.length+wrongPositions.length))*100).toFixed(2) 
            };
        });

        return leaderboard;

    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
};






module.exports = { rankingPiAnswers };