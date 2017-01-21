$(document).ready(function() {
    var query = window.location.search;
    result1 = query.split("?");
    result = result1[1].split("&");
    final1 = result[0].split("=");
    final2 = result[1].split("=");
    id = final1[1];
    keyValue = final2[1];

    $('.new-password, .confirm-new-password').on('keyup', function() {
        $(".validation-message").text("");

    });
    //redirect to login page if id keyvalue doesn't match
    $.ajax({
        dataType: "json",
        type: 'GET',
        url: _BASEURLJSONSERVER + '/supervisor_credentials?id=' + id,
        success: function(data) {
            if ((data.length !== 0) && (keyValue === data[0].key) && (id === data[0].id)) {
                $(".submit-forgot-password").click(function() {
                    var Password = $(".new-password").val().trim();
                    var confirmPassword = $(".confirm-new-password").val().trim();
                    var checkPass1 = login.validatePassword(Password);
                    if (checkPass1) {
                        var checkPass2 = login.validatePassword(confirmPassword);
                        if (checkPass2) {
                            if (Password === confirmPassword) {
                                var newPassword = CryptoJS.MD5(Password).toString();
                                data[0].password = newPassword;
                                $.ajax({
                                    dataType: "json",
                                    type: 'PUT',
                                    contentType: "application/json",
                                    data: JSON.stringify(data[0]),
                                    url: _BASEURLJSONSERVER + "/supervisor_credentials/" + id,
                                    success: function() {
                                        alert("password changed successfully");
                                        window.location = _BASEURLAPPLICATION;
                                    },
                                    error: function() {
                                        alert('unable to get data from server');
                                    }
                                });  //second ajax call
                            } // if password equal
                            else{
                              $(".validation-message").text("passwords are not equal");
                            }
                        } //if checkpass2
                    } //if checkpass1
                }); //click event
            } // if keyvalue
            else {
                alert("you are not allowed to reset the password!");
                window.location = _BASEURLAPPLICATION;
            }
        } //success :function
    }); //first ajax call
}); //document ready
