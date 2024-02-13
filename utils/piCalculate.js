const fsPromises = require("fs/promises");
/*
    - Whitespaces are ignored in this function
    - Any non-alphanumeric characters will be considered unmatched
    - If the student's answer is longer than 10000, return 10000!
    - This file is still in completion
 */
const rankingPiAnswers = async () => {
    try {
        const piBuffer = await fsPromises.readFile("./data/pi.txt");
        const pi = piBuffer.toString().split(" ").join("");
        const studentAnswersBuffer = await fsPromises.readFile("./data/studentAnswers.json");
        const studentAnswers = JSON.parse(studentAnswersBuffer.toString());
        const leaderboard = studentAnswers.map(studentAnswer => {
            const answer = studentAnswer.answer.split(" ").join("");
            if (answer.length > pi.length){
                return {name: studentAnswer.name, piNumbersGuessed: 10000} //No way this is gonna happen
            } 
            for (let i = 0; i < answer.length; i++) {
                if (answer[i] !== pi[i]) {
                    if(i === 1){
                        return {name: studentAnswer.name, piNumbersGuessed:1}
                    }
                    return {name: studentAnswer.name, piNumbersGuessed: i-1}; 
                }
            }
            
            return {name: studentAnswer.name, piNumbersGuessed: answer.length};
        }); 

        leaderboard.sort((a,b) => {
            if (a.piNumbersGuessed < b.piNumbersGuessed){
                return 1
            }else if (a.piNumbersGuessed > b.piNumbersGuessed){
                return -1
            }else{
                return 0
            }
        })
        for (let i = 0; i < leaderboard.length; i++){
            leaderboard[i].position = (i+1).toString()
            leaderboard[i].piNumbersGuessed = leaderboard[i].piNumbersGuessed.toString()
        }
        return leaderboard
  
    } catch (err) {
        console.error("Error:", err);
    }
};

rankingPiAnswers();