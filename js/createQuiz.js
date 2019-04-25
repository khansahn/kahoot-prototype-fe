beAddress = 'http://localhost:9999'

isUpdate = false

var getCookieUsernameLogin = getCookie("usernameLogin")
$("#dis-creator").val(getCookieUsernameLogin)




if (typeof("quizId")  === 'undefined' || getCookie("quizId") == undefined){
    console.log('no cookie');
} else {
    console.log(' cookie exist');   
    isUpdate = true
    
    $.ajax({
        url: beAddress +'/quiz/'+getCookie("quizId"),
        method : 'GET',
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        // type : 'GET',
        // data: [],{}, string, int, JSON.stringify([{}]) --> misalnya API butuh data dr user,
        success: function(result){
            $("input#input-quiz-title").val(result.data.quiz)
            $("input#input-quiz-category").val(result.data.quiz_category)   
        },
        error : function(){
            // error handling
        },
        complete: function(){
            
        }
    })
}




// CREATE QUIZ
function createQuiz(){ 
    if (this.isUpdate == false){
        this.createQuizNew()
    }
    else {
        this.updateQuiz()
    }  
}



// CREATE QUIZ NEW
function createQuizNew(){
    quiz = $('input#input-quiz-title').val()
    quiz_category = $('input#input-quiz-category').val()    
    $.ajax({
        url: beAddress+ '/quiz',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        data: JSON.stringify({
            "quiz" : quiz,
            "quiz_category" : quiz_category
        }),
        success: function(response){
            console.log(response)
            // alert(response.data.token)
            // respon = JSON.parse(response)
            // alert(respon.data.token)
            createCookie("quizId", response.data.quiz_id, 1)
            
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



// UPDATE QUIZ
function updateQuiz(){
    quiz = $('input#input-quiz-title').val()
    quiz_category = $('input#input-quiz-category').val()    
    $.ajax({
        url: beAddress+ '/quiz/'+getCookie("quizId"),
        method: 'PUT',
        contentType: 'application/json',
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        data: JSON.stringify({
            "quiz" : quiz,
            "quiz_category" : quiz_category,
            "status_enabled" : true
        }),
        success: function(response){
            console.log(response)
            // alert(response.data.token)
            // respon = JSON.parse(response)
            // alert(respon.data.token)            
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

