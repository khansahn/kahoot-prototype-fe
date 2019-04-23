beAddress = 'http://localhost:9999'


var getCookieUsernameLogin = getCookie("usernameLogin")
$("#dis-creator").val(getCookieUsernameLogin)


// CREATE QUIZ
function createQuiz(){ 
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

