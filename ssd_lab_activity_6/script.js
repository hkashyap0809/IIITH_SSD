// function allValidate(){
//     validateUserName();
//     checkPassword();
// }


function validateUserName(){
    var a = document.getElementById('serverUserName').value;
    var pattern = /(?=.*?[0-9])(?=.*?[A-Za-z]).+/;
    if(!pattern.test(a)){
        console.log(a);
        document.getElementById('invalidUsername').innerHTML="<span style='color:red'>Invalid Username</span>";
    }else{
        document.getElementById('invalidUsername').innerHTML="<span style='color:red'></span>";

    }
}

function checkPassword(){
    var password = document.getElementById('serverPassword').value;
    var cnfrmpassword = document.getElementById('confirmPassword').value;
    if(password===cnfrmpassword){
        document.getElementById('invalidPassword').innerHTML="<span style='color:red'></span>";
    }else{
        document.getElementById('invalidPassword').innerHTML="<span style='color:red'> Password do not match </span>"
    }
}

function printValues(event){
    var managerName = document.getElementById('managerName').value;
    var groupEmail = document.getElementById('groupEmail').value;
    var serverUserName = document.getElementById('serverUserName').value;

    
    alert(
        "Manager Name : "+managerName+
        " Group Email : "+groupEmail+
        " Server User " + serverUserName
    );
    event.preventDefault()
}