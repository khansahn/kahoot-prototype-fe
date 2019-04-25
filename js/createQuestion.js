beAddress = 'http://localhost:9999'

isUpdate = false


var getCookieUsernameLogin = getCookie("usernameLogin")
$("#dis-creator").val(getCookieUsernameLogin)

$("input[type='checkbox']").on('change', function(){
    $(this).val(this.checked ? "TRUE" : "FALSE");
})

document.getElementById("customSwitches-option-a").disabled = true;
document.getElementById("customSwitches-option-b").disabled = true;
document.getElementById("customSwitches-option-c").disabled = true;
document.getElementById("customSwitches-option-d").disabled = true;



if (typeof("questionId")  === 'undefined' || getCookie("questionId") == undefined){
    console.log('no cookie');
} else {
    console.log(' cookie exist');   
    isUpdate = true
    
    $.ajax({
        url: beAddress +'/quiz/'+getCookie("quizId")+'/question/'+ getCookie("questionId"),
        method : 'GET',
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        // type : 'GET',
        // data: [],{}, string, int, JSON.stringify([{}]) --> misalnya API butuh data dr user,
        success: function(result){
            $("input#input-question").val(result.data.question)
            
            let answers = result.data.answer
            let options = result.data.options
            let answerKeys = Object.keys(options)
            if (options.optA != ""){
                $("input#input-option-a").val(options.optA)
                document.getElementById("customSwitches-option-a").disabled = false;
                if (answers.includes(answerKeys[0])){
                    document.getElementById("customSwitches-option-a").checked = true;
                }
            }   
            if (options.optB != ""){
                $("input#input-option-b").val(options.optB)
                document.getElementById("customSwitches-option-b").disabled = false;
                if (answers.includes(answerKeys[1])){
                    document.getElementById("customSwitches-option-b").checked = true;
                }
            }  
            if (options.optC != ""){
                $("input#input-option-c").val(options.optC)
                document.getElementById("customSwitches-option-c").disabled = false;
                if (answers.includes(answerKeys[2])){
                    document.getElementById("customSwitches-option-c").checked = true;
                }
            }  
            if (options.optD != ""){
                $("input#input-option-d").val(options.optD)
                document.getElementById("customSwitches-option-d").disabled = false;
                if (answers.includes(answerKeys[3])){
                    document.getElementById("customSwitches-option-d").checked = true;
                }
            }  
            
            
            
        },
        error : function(){
            // error handling
        },
        complete: function(){
            
        }
    })
}



function disSwitchA(){
    opsiA = $("input#input-option-a").val()
    if (opsiA == ""){
        document.getElementById("customSwitches-option-a").disabled = true;
    }
    else {
        document.getElementById("customSwitches-option-a").disabled = false;
    }
}
function disSwitchB(){  
    opsiB = $("input#input-option-b").val()
    if (opsiB == ""){
        document.getElementById("customSwitches-option-b").disabled = true;
    }
    else {
        document.getElementById("customSwitches-option-b").disabled = false;
    }
}
function disSwitchC(){
    opsiC = $("input#input-option-c").val()
    if (opsiC == ""){
        document.getElementById("customSwitches-option-c").disabled = true;
    }
    else {
        document.getElementById("customSwitches-option-c").disabled = false;
    }
}
function disSwitchD(){
    opsiD = $("input#input-option-d").val()
    if (opsiD == ""){
        document.getElementById("customSwitches-option-d").disabled = true;
    }
    else {
        document.getElementById("customSwitches-option-d").disabled = false;
    }
}
// CREATE QUESTION
function createQuestion(){ 
    if (this.isUpdate == false){
        this.createQuestionNew()
    }
    else {
        this.updateQuestion()
    }
    
}

// CREATE QUESTION NEW
function createQuestionNew(){
    
    quiz_id = getCookie("quizId")
    question = $('input#input-question').val()
    answer = []
    
    ansA = $("input#customSwitches-option-a").val()
    if (ansA == "TRUE") {
        answer.push("optA")
    }
    ansB = $("input#customSwitches-option-b").val()
    if (ansB == "TRUE") {
        answer.push("optB")
    }
    ansC = $("input#customSwitches-option-c").val()
    if (ansC == "TRUE") {
        answer.push("optC")
    }
    ansD = $("input#customSwitches-option-d").val()
    if (ansD == "TRUE") {
        answer.push("optD")
    }
    
    $.ajax({
        url: beAddress+ '/question',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        data: JSON.stringify({
            "quiz-id": quiz_id,
            "question" : question,
            "answer" : answer,
            "options" : {
                "optA" : $("input#input-option-a").val(),
                "optB" : $("input#input-option-b").val(),
                "optC" : $("input#input-option-c").val(),
                "optD" : $("input#input-option-d").val()
            }                
        }),
        success: function(response){
            console.log(response)
            // alert(response.data.token)
            // respon = JSON.parse(response)
            // alert(respon.data.token)
            // createCookie("quizId", response.data.quiz_id, 1) 
            eraseCookie("questionId")           
            window.location.href='createQuestion_pre_questionList.html'
        },
        error: function(error){
            alert(error.responseJSON.message)
            console.log(error)
        },
        complete: function(){
            
        }
    })   
}


// UPDATE QUESTION
function updateQuestion(){
    
    quiz_id = getCookie("quizId")
    question_id = getCookie("questionId")
    status_enabled = true
    
    question = $('input#input-question').val()
    answer = []
    
    ansA = $("input#customSwitches-option-a").val()
    if (ansA == "TRUE") {
        answer.push("optA")
    }
    ansB = $("input#customSwitches-option-b").val()
    if (ansB == "TRUE") {
        answer.push("optB")
    }
    ansC = $("input#customSwitches-option-c").val()
    if (ansC == "TRUE") {
        answer.push("optC")
    }
    ansD = $("input#customSwitches-option-d").val()
    if (ansD == "TRUE") {
        answer.push("optD")
    }
    
    $.ajax({
        url: beAddress+ '/quiz/'+quiz_id+'/question/'+question_id,
        method: 'PUT',
        contentType: 'application/json',
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        data: JSON.stringify({            
            "quiz_id": quiz_id,
            "question_id" : question_id,
            "question" : question,
            "answer" : answer,
            "options" : {
                "optA" : $("input#input-option-a").val(),
                "optB" : $("input#input-option-b").val(),
                "optC" : $("input#input-option-c").val(),
                "optD" : $("input#input-option-d").val()
            },
            "status_enabled": true         
        }),
        success: function(response){
            console.log(response)
            // alert(response.data.token)
            // respon = JSON.parse(response)
            // alert(respon.data.token)
            // createCookie("quizId", response.data.quiz_id, 1) 
            eraseCookie("questionId")           
            window.location.href='createQuestion_pre_questionList.html'
        },
        error: function(error){
            alert(error.responseJSON.message)
            console.log(error)
        },
        complete: function(){
            
        }
    })   
}

// EXIT CREATING QUESTION
function exitCreatingQuestion(){ 
    eraseCookie("questionId")
    window.location.href='/createQuestion_pre_questionList.html'
}



// CREATE COOKIE
function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// GET COOKIE
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// ERASE COOKIE
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

