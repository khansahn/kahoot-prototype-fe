beAddress = 'http://localhost:9999'

// REGISTER USER
function registerUser(){ 
    username = $('input#orangeForm-username').val()
    fullname = $('input#orangeForm-fullname').val()
    email = $('input#orangeForm-email').val()
    password = $('input#orangeForm-password').val()
    
    $.ajax({
        url: beAddress +'/user',
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
            alert("Berhasil registrasi!")
            // respon = JSON.parse(response)
            // alert(respon.data.token)
            window.location.href='index.html'
        },
        error: function(error){
            alert(error.responseJSON.message)
            console.log(error)
        },
        complete: function(){
            
        }
    })        
}
