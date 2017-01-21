var login = (function() {
    var regexUsername = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{5,13}$/;
    var regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#@&])[A-Za-z\d!#@&]{7,13}$/;

$('#username, #password').on('keyup',function(){
  $(".validation-message").text("");

});

    if (window.location.search === "?logout=1") {
        alert("You have been logged out Successfully");
        //modal.notificationModal("You have been logged out Successfully");
    }

    //remember me functionality

    if ((localStorage.getItem("password") !== null) && (window.location.href !== (_BASEURLAPPLICATION + "/dashboard.html"))) {
        var idValue = localStorage.getItem("id");
        var encPassword = localStorage.getItem("password");

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: _BASEURLJSONSERVER + "/supervisor_credentials?empid=" + idValue + "&password=" + encPassword,
            success: function(data) {
              console.log(data[0]);
                if (data.length === 1) {
                    window.sessionStorage.setItem('id', idValue);
                    window.sessionStorage.setItem('password', encPassword);
                    //Redirect to Dashboard
                    window.location.replace(_BASEURLAPPLICATION + "/dashboard.html");
                }
            }
        });

    }

    var validateUsername = function(username) {
        if (username === undefined || username === "") {
            $(".validation-message").text("Username cannot be blank");
            return false;
        } else if (!username.match(regexUsername)) {
            $(".validation-message").text("Username is invalid");
            return false;
        } else {

            return true;
        }
    }

    var validatePassword = function(password) {
        if (password === undefined || password === "") {
            $(".validation-message").text("Password cannot be blank");
            return false;
        } else if (!password.match(regexPassword)) {
            $(".validation-message").text("Password is invalid");
            return false;
        } else {
            return true;
        }
    }

    $('#login-submit').click(function(e) {
      e.preventDefault();
      e.stopPropagation();

        var username = $('#username').val().trim(),
            password = $('#password').val().trim();
        var encPassword = CryptoJS.MD5(password);

        if (validateUsername(username) && validatePassword(password)) {
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: _BASEURLJSONSERVER + "/supervisor_credentials?id=" + username + "&password=" + encPassword,
                success: function(data) {
                    if (data.length === 0) {
                        $(".validation-message").text("Username or Password is incorrect");
                    } else if (data.length === 1) {
                        //for remember me
                        if ($("#checkbox").prop('checked')) {
                            window.localStorage.setItem('id', data[0].empid);
                            window.localStorage.setItem('password', encPassword);
                        } else {
                            window.localStorage.setItem('id', data[0].empid);
                            window.localStorage.removeItem("password");
                        }
                        //Create Session Storage
                        window.sessionStorage.setItem('id', data[0].empid);
                        window.sessionStorage.setItem('password', encPassword);
                        //Redirect to Dashboard
                        location.assign(_BASEURLAPPLICATION + "/dashboard.html");
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    modal.notificationModal('Your request cannot be processed');
                }
            });
        }
    });

    //random key generation
    function randomKey(length) {
        var generatedkey = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            generatedkey += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return generatedkey;
    }

    //sending email
    function sendEmail() {
        //sending email
        emailjs.init("user_HclbNBKuSSjaZxwVSIbku");
        emailjs.send("gmail", "template_EBKTHKEW", {
            to_name: username,
            from_name: "competency matrix",
            message_html: "you got a mail from competency matrix." + _BASEURLAPPLICATION + "/forgot-password.html?id=" + username + "&key=" + generatedKey + "   click this link to reset your password."
        }); //email
        $(".validation-message").text("email has been sent");
    }

    $(".forgot-password").click(function() {

        username = $("#username").val().trim();

        if (validateUsername(username)) {
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: _BASEURLJSONSERVER + '/supervisor_credentials?id=' + username,
                success: function(data) {

                    if (data.length === 0) {
                        $(".validation-message").text("Username does not exist");
                    } else {
                        generatedKey = randomKey(20);
                        data[0].key = generatedKey;
                        $.ajax({
                            dataType: "json",
                            type: 'PUT',
                            contentType: "application/json",
                            data: JSON.stringify(data[0]),
                            url: _BASEURLJSONSERVER + "/supervisor_credentials/" + username,
                            success: function() {
                                sendEmail();

                            },
                            error: function() {
                                alert('unable to get data from server');
                            }
                        });  //second ajax call
                    } //else if data.length=1
                } //success(data)
            });   //first ajax call
        } //if check
    });
    return {
        validatePassword: validatePassword
    }
})();
