let question = [];
document.addEventListener("DOMContentLoaded", function(event) {
    fetch('/question').then((response)=>{
        return response.json();
    }).then((array_question)=>{
        let body = document.getElementById('question');
        let table = '';
        question = array_question;
        array_question.map(({question,array_vatiant},index)=>{
            table+=`<div  class="question_table">
            <label id="${index}" class="some_question">${question}</label>
            <div class="form-check some_variant">
                <input class="form-check-input" type="radio" name="flexRadioDefault${index}" id ="a${index}" value="a">
                <label class="form-check-label" for="flexRadioDefault1" id = "La${index}">
                ${array_vatiant[0].a}
                </label>
            </div>
            <div class="form-check some_variant">
                <input class="form-check-input" type="radio" name="flexRadioDefault${index}" id ="b${index}" value="b">
                <label class="form-check-label" for="flexRadioDefault1" id = "Lb${index}">
                ${array_vatiant[1].b}
                </label>
            </div>
            <div class="form-check some_variant">
                <input class="form-check-input" type="radio" name="flexRadioDefault${index}" id ="c${index}" value="c">
                <label class="form-check-label" for="flexRadioDefault1" id = "Lc${index}">
                ${array_vatiant[2].c}
                </label>
            </div>
            <div class="form-check some_variant">
                <input class="form-check-input" type="radio" name="flexRadioDefault${index}" id ="d${index}" value="d">
                <label class="form-check-label" for="flexRadioDefault1" id = "Ld${index}">
                ${array_vatiant[3].d}
                </label>
            </div>
        </div>`
        })
        body.innerHTML= table;
    })
  });
document.getElementById('save').addEventListener('click', async (event)=>{
    event.preventDefault();
    let inputs  = document.getElementsByClassName('form-check-input');
    let answers = [];
    let count = 0;
    for(let item of inputs){
        if(item.checked){
            answers.push({count:count,answer:item.value});
            count++;
        }
    }
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let data = {name,surname,answers};
    let response = await fetch('/getAnswers',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    let {array_correct_answers,array_user_answer,correct_answer,total}  = await response.json();
    label_correct_answers(total,correct_answer);
    match(array_correct_answers,array_user_answer);

})
const match = (array_correct_answers,array_user_answer) =>{
        array_correct_answers.map((element,index) => {
            let div = document.getElementById(index);
            if(element===array_user_answer[index].answer){
                div.style.color = 'green';
                let label  = document.getElementById(`L${array_user_answer[index].answer}${index}`)
                label.style.color = 'green';
                work_btn();
            }
            else{
                div.style.color = 'red';
                let label  = document.getElementById(`L${array_user_answer[index].answer}${index}`);
                let label_correct  = document.getElementById(`L${element}${index}`);
                let checker = document.getElementById(`${element}${index}`);
                checker.checked = true;
                label_correct.style.color = 'green';
                label.style.color = 'red';   
                work_btn();
            }
        });
}

const work_btn  = () =>{
                let button = document.getElementById('save');
                if(button!=null){
                button.remove();
                let button_redirect = document.createElement('button');
                button_redirect.className = 'btn btn-primary button_save';
                button_redirect.innerText = 'Main Page';
                button_redirect.addEventListener('click',(event)=>{
                    event.preventDefault();
                    window.location.href = '/main';
                })
                let btn_div  = document.getElementById('btn_div');
                btn_div.appendChild(button_redirect);
               }
}
label_correct_answers = (total,correct) =>{
    let res  = document.getElementById('res');
    res.innerText = `Total answers was = ${total}, Corect answers was = ${correct}`;
}