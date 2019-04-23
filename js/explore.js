
BEAddress = 'http://localhost:9999'

var getCookieUsernameLogin = getCookie("usernameLogin")
$("#usernameLogin").val(getCookieUsernameLogin)


// GET ALL QUIZ

var xhr = new XMLHttpRequest()
xhr.open("GET", BEAddress +"/quiz/seeAllQuizAvailable")
xhr.send()
xhr.onreadystatechange = function(){
    
}

$.ajax({
    url: BEAddress +'/quiz/seeAllQuizAvailable',
    method : 'GET',
    // type : 'GET',
    // data: [],{}, string, int, JSON.stringify([{}]) --> misalnya API butuh data dr user,
    success: function(result){
        let data = result.data
        for (let i=0; i<data.length; i++){  
            min=0; 
            max=9;  
            random =Math.round( Math.random() * (+max - +min) + +min); 
                        
            quizCard = 
            `            
            <!--Grid column-->
            <div class="col-lg-12 col-md-6 my-3">
            
            <!--Card-->
            <div class="card">
            
            <!--Card image-->
            <div class="view overlay">
            <img src="/img/ink/randCard/`+random+`.jpg" class="card-img-top" alt="">
            <a href="#">
            <div class="mask rgba-white-slight"></div>
            </a>
            </div>
            
            <!--Card content-->
            <div class="card-body">
            <!--Title-->
            <h4 class="card-title">`+data[i].quiz+`</h4>
            <!--Text-->
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#!" class="btn btn-primary" onclick="createGame(`+data[i].quiz_id+`)">PLAY</a>
            </div>
            
            </div>
            <!--/.Card-->
            
            </div>
            <!--Grid column-->
            `
            $('ul#card-quizCard').append ('<li>' + quizCard + '</li>')
            
            
        }
    },
    error : function(){
        // error handling
    },
    complete: function(){
        
    }
})



// LOGIN USER
function loginUser(){ 
    username = $('input#defaultForm-username').val()
    password = $('input#defaultForm-password').val()
    
    $.ajax({
        url: 'http://localhost:9999/user/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "username" : username,
            "password" : password,
            "todo" : "encrypt"
        }),
        success: function(response){
            console.log(response)
            // alert(response.data.token)
            // respon = JSON.parse(response)
            // alert(respon.data.token)
            createCookie("token", response.data.token, 1)
            window.location.href='exploreQuizDariLogin.html'
        },
        error: function(error){
            alert(error.responseJSON.message)
            console.log(error)
        },
        complete: function(){
            
        }
    })        
}


// REGISTER USER
function registerUser(){ 
    username = $('input#orangeForm-username').val()
    fullname = $('input#orangeForm-fullname').val()
    email = $('input#orangeForm-email').val()
    password = $('input#orangeForm-password').val()
    
    $.ajax({
        url: 'http://localhost:9999/user',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "username" : username,
            "password" : password,
            "email" : email,
            "todo" : "encrypt",
            "fullname" : fullname
        }),
        success: function(response){
            console.log(response)
            // alert(response.data.token)
            // respon = JSON.parse(response)
            // alert(respon.data.token)
            // window.location.href='exploreQuiz.html'
        },
        error: function(error){
            alert(error.responseJSON.message)
            console.log(error)
        },
        complete: function(){
            
        }
    })        
}


// COOKIE
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
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

