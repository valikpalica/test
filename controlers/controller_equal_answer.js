const question_file = require('../question.json');
const result = require('../result.json');
const fs = require('fs');
const path = require('path');
module.exports =  (obj_answer) =>{
    try {
    const {name,surname,answers}= obj_answer;
    let correct_answer = 0;
    let array_correct_answers = [];
    question_file.map((elem,index)=>{
        array_correct_answers.push(elem.correct_answer);
        if(elem.correct_answer == answers[index].answer){
            correct_answer++;
        }
    })
    let path_to_result = path.join(__dirname.slice(0,__dirname.lastIndexOf('\\controlers')),'result.json');
    let data = {name,surname,correct_answer,total:answers.length};
    result.push(data);
    fs.writeFile(path_to_result,JSON.stringify(result),(err)=>{
        if(err){
            throw new Error(err);
        }
    });
    return {array_correct_answers,answers,correct_answer,total:answers.length};
    } catch (error) {
        console.log(error);
    }
}