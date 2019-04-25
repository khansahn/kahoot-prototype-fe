
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

// TAB ALL QUIZ
function allQuiz(){    
    $.ajax({
        url: BEAddress +'/quiz/seeAllQuizAvailable',
        method : 'GET',
        // headers: {
        //     'Authorization':'Bearer ' + getCookie("token"),
        //     // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
        //     // 'Content-Type':'application/json'
        // },
        // type : 'GET',
        // data: [],{}, string, int, JSON.stringify([{}]) --> misalnya API butuh data dr user,
        success: function(result){
            $('ul#card-quizCard').empty()
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
}


// TAB MY QUIZ
function myQuiz(){    
    $.ajax({
        url: BEAddress +'/quiz/seeAllQuizCreatedBy/'+getCookie("usernameLogin"),
        method : 'GET',
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        // type : 'GET',
        // data: [],{}, string, int, JSON.stringify([{}]) --> misalnya API butuh data dr user,
        success: function(result){
            $('ul#card-quizCard').empty()
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

                <div>
                <div class="row" style="display: flex; justify-content: flex-end"><a onclick="toUpdateQuiz(`+data[i].quiz_id+`)"><img src="https://img.icons8.com/color/48/000000/edit.png" width="30" height="30" ></a></div>
                <div class="row" style="display: flex; justify-content: flex-end"><a onclick="toDeleteQuiz(`+data[i].quiz_id+`)"><img src="https://img.icons8.com/color/48/000000/delete.png" width="30" height="30" ></a></div>
                </div>

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
}




// TO UPDATE QUIZ
function toUpdateQuiz(quizId){ 
    createCookie("quizId", quizId, 1)
    window.location.href='/createQuiz.html'
}



// TO DELETE QUIZ
function toDeleteQuiz(quizId){     
    var r = confirm("Yakin mau dihapus?");
    if (r == true) {
        txt = "You pressed OK!";
        
        
        $.ajax({
            url: beAddress+ '/quiz/'+quizId,
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


// CREATE GAME
function createGame(quizId){     
    $.ajax({
        url: beAddress + '/game',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "quiz_id" : quizId
        }),
        success: function(response){
            console.log(response)
            // alert(response.data.token)
            // respon = JSON.parse(response)
            alert(response.message)
            createCookie("gamePin", response.data.game_pin, 1)
            window.location.href='homepageNewGame.html'
        },
        error: function(error){
            alert(error.responseJSON.message)
            console.log(error)
        },
        complete: function(){
            
        }
    })        
}




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

