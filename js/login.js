beAddress = 'http://localhost:9999'


// LOGIN USER
function loginUser(){ 
    username = $('input#defaultForm-username').val()
    password = $('input#defaultForm-pass').val()    
    $.ajax({
        url: beAddress+ '/user/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "username" : username,
            "password" : password,
            "todo" : "encrypt"
        }),
        success: function(response){
            console.log(response)
            // respon = JSON.parse(response)
            // alert(respon.data.token)
            createCookie("token", response.data.token, 1)
            createCookie("usernameLogin", response.data.username, 1)

            window.location.href='exploreAfterLogin.html'
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