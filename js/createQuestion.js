beAddress = 'http://localhost:9999'


if (typeof("questionId")  === 'undefined'){
    console.log('no cookie');
} else {
    console.log(' cookie exist');    
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
            if (options[0].option_id != undefined){
                $("input#input-option-a").val(options[0].option)
                document.getElementById("customSwitches-option-a").disabled = false;
                if (options[0].option_id in answers){
                    $("input#customSwitches-option-a").val(this.checked = "TRUE")
                }
            }   
            if (options[1].option_id != undefined){
                $("input#input-option-b").val(options[1].option)
                document.getElementById("customSwitches-option-b").disabled = false;
                if (options[1].option_id in answers){
                    $("input#customSwitches-option-b").val(this.checked = "TRUE")
                }
            }  
            if (options[2].option_id != undefined){
                $("input#input-option-c").val(options[2].option)
                document.getElementById("customSwitches-option-c").disabled = false;
                if (options[2].option_id in answers){
                    $("input#customSwitches-option-c").prop('checked', true)
                    console.log($("input#customSwitches-option-c").val())
                }
            }  
            if (options[3].option_id != undefined){
                $("input#input-option-d").val(options[3].option)
                document.getElementById("customSwitches-option-d").disabled = false;
                if (options[3].option_id in answers){
                    $("input#customSwitches-option-d").val(this.checked = "TRUE")
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


var getCookieUsernameLogin = getCookie("usernameLogin")
$("#dis-creator").val(getCookieUsernameLogin)

$("input[type='checkbox']").on('change', function(){
    $(this).val(this.checked ? "TRUE" : "FALSE");
})

document.getElementById("customSwitches-option-a").disabled = true;
document.getElementById("customSwitches-option-b").disabled = true;
document.getElementById("customSwitches-option-c").disabled = true;
document.getElementById("customSwitches-option-d").disabled = true;

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
    quiz_id = getCookie("quizId")
    question = $('input#input-question').val()
    options = []
    optionsNumb = []
    answer = []
    
    opsiA = $("input#input-option-a").val()
    if (opsiA != "") {
        options.push(opsiA)
        optionsNumb.push(0)
    }
    opsiB = $("input#input-option-b").val()
    if (opsiB != "") {
        options.push(opsiB)
        optionsNumb.push(1)
    }
    opsiC = $("input#input-option-c").val()
    if (opsiC != "") {
        options.push(opsiC)
        optionsNumb.push(2)
    }
    opsiD = $("input#input-option-d").val()
    if (opsiD != "") {
        options.push(opsiD)
        optionsNumb.push(3)
    }
    ansA = $("input#customSwitches-option-a").val()
    if (ansA == "TRUE") {
        p = optionsNumb.indexOf(0)
        answer.push(p)
    }
    ansB = $("input#customSwitches-option-b").val()
    if (ansB == "TRUE") {
        p = optionsNumb.indexOf(1)
        answer.push(p)
    }
    ansC = $("input#customSwitches-option-c").val()
    if (ansC == "TRUE") {
        p = optionsNumb.indexOf(2)
        answer.push(p)
    }
    ansD = $("input#customSwitches-option-d").val()
    if (ansD == "TRUE") {
        p = optionsNumb.indexOf(3)
        answer.push(p)
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
            "options" : options                
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

