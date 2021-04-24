const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const controller_equal_answer = require('./controlers/controller_equal_answer');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')));
app.set("views engine", "hbs");
const checkStatus = (req,res,next)=>{
    if(req.header.status){
        next();
    }
    else{res.redirect('/');}
}
app.get('/',(req,res)=>{
    res.render('main.hbs');
})
app.get('/main',checkStatus,(req,res)=>{
    res.render('test.hbs',{name:req.header.name_user,surname:req.header.surname});
}); 
app.post('/',(req,res)=>{
    let {name,surname} = req.body;
    req.header.status = true;
    req.header.name_user = name;
    req.header.surname = surname;
    res.redirect('/main');
});
app.get('/question',(req,res)=>{
    try {
        fs.readFile(path.join(__dirname,'question.json'),'utf-8',(err,data)=>{
            if(err){
                throw new Error('We have problem with read file '+ err)
            }
            else{
                res.json(JSON.parse(data));
            }
        })
    } catch (error) {
        console.log(error);
    }
});
app.post('/getAnswers',(req,res)=>{
    let {array_correct_answers,answers:array_user_answer,correct_answer,total } = controller_equal_answer(req.body);
    //console.log(array_correct_answers,array_user_answer);
    res.json({array_correct_answers,array_user_answer,correct_answer,total});
})
app.listen(8080,()=>{
    console.log('server has been started 8080');
})
