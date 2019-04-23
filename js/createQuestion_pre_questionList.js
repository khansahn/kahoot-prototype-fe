beAddress = 'http://localhost:9999'

eraseCookie("questionId")

var getCookieUsernameLogin = getCookie("usernameLogin")
$("#usernameLogin").val(getCookieUsernameLogin)


// GET QUESTION PER QUIZ

// var xhr = new XMLHttpRequest()
// xhr.open("GET", BEAddress +"/quiz/seeAllQuizAvailable")
// xhr.send()
// xhr.onreadystatechange = function(){

// }

$.ajax({
    url: beAddress +'/quiz/'+ getCookie("quizId"),
    method : 'GET',
    headers: {
        'Authorization':'Bearer ' + getCookie("token"),
        // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
        // 'Content-Type':'application/json'
    },
    // type : 'GET',
    // data: [],{}, string, int, JSON.stringify([{}]) --> misalnya API butuh data dr user,
    success: function(result){
        $("#read-quiz-title").val(result.data.quiz)
        $("#read-quiz-category").val(result.data.quiz_category)
        $("#read-quiz-creator").val(result.data.creator_username)
        
        let data = result.data.question_list
        for (let i=0; i<data.length; i++){  
            min=0; 
            max=9;  
            random =Math.round( Math.random() * (+max - +min) + +min); 
            
            question = 
            `            
            <div class="col-lg-12 justify-content-center" style="border-style: dashed; border-color: beige; display: flex; justify-content: center;">
            <div class="col-2">
            `+(i + 1)+`
            </div>
            <div class="col-8">
            <div class="row"><h4>`+data[i].question+`</h4></div>
            <div class="row"><h5>options</h5></div>
            </div>
            <div class="col-2" >
            <div class="row" style="display: flex; justify-content: flex-end"><a onclick="toUpdateQuestion(`+data[i].question_id+`)"><img src="https://img.icons8.com/color/48/000000/edit.png" width="30" height="30" ></a></div>
            <div class="row" style="display: flex; justify-content: flex-end"><a onclick="toDeleteQuestion(`+data[i].question_id+`)"><img src="https://img.icons8.com/color/48/000000/delete.png" width="30" height="30" ></a></div>
            </div>
            </div>
            `
            $('ul#question-list').append ('<li>' + question + '</li>')
            
            
        }
        
        
    },
    error : function(){
        // error handling
    },
    complete: function(){
        
    }
})



// EXIT CREATING QUIZ
function exitCreatingQuiz(){ 
    eraseCookie("quizId")
    window.location.href='/exploreAfterLogin.html'
}

// TO UPDATE QUESTION
function toUpdateQuestion(questionId){ 
    createCookie("questionId", questionId, 1)
    window.location.href='/createQuestion.html'
}



// TO DELETE QUESTION
function toDeleteQuestion(questionId){ 
    quizId = getCookie("quizId")
    
    var r = confirm("Yakin mau dihapus?");
    if (r == true) {
        txt = "You pressed OK!";
        
        
        $.ajax({
            url: beAddress+ '/quiz/'+quizId+'/question/'+questionId,
            method: 'DELETE',
            contentType: 'application/json',
            headers: {
                'Authorization':'Bearer ' + getCookie("token"),
                // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
                // 'Content-Type':'application/json'
            },
            success: function(response){
                console.log(response)
                // alert(response.message)
                location.reload(true)
                // respon = JSON.parse(response)
                // alert(respon.data.token)
            },
            error: function(error){
                alert(error.responseJSON.message)
                console.log(error)
            },
            complete: function(){
                
            }
        })     
    } else {
        txt = "You pressed Cancel!";
    }
    
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
