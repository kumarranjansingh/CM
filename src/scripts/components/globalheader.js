/*
 ** Represents a function to update header details,update profile modal functionality,logout functionality
 */
var headerSection = (function() {
    'use strict';
    var empid = window.sessionStorage.getItem('id');
    var flag;

    /**
     *function to fill and show update profile modal
     **/

    function fillAndShowUpdateProfileModal(data, userType) {
        var profileDetails;
        if (userType === 'supervisor') {
            profileDetails = data[0];
        } else if (userType === 'supervisee') {
            profileDetails = data;
        }

        $('#user-name').val("");
        $(".update-profile-pic").attr('src',profileDetails.image);
        $(".supervisor-name-label").each(function(index, value) {
            if (index === 1) {
                $(this).val(profileDetails.first_name + " " + profileDetails.last_name);
            }
        })
        $(".supervisor-email-label").each(function(index, value) {
            if (index === 1) {
                $(this).val(profileDetails.email);
            }
        })
        $(".supervisor-role-label").each(function(index, value) {
            if (index === 1) {
                $(this).val(profileDetails.role);
            }
        })
        $(".supervisor-address-label").each(function(index, value) {
            if (index === 1) {
                $(this).val(profileDetails.location);
            }
        })
        modal.modalOverlay.fadeIn(200);
        $(window).scrollTop(0);
        $('body').addClass('fixed');
        modal.updateProfileModal();
    }

    /*
     ** Represents a function that makes an AJAX call to update details of update profile section modal
     */
    function updateProfileModal() {
        $.ajax({
            url: _BASEURLJSONSERVER + '/' + supervisorList,
            data: {
                "id": empid
            },
            success: function(data) {
                fillAndShowUpdateProfileModal(data,'supervisor');
            },
            error: function() {
                alert('unable to get data from server');
            }

        });
    }


    //display drop down menu
    $(window).on('click', function(event) {
        if (!$(event.target).hasClass('drop-down')) {
            var dropdowns = $('.dropdown-content');
            dropdowns.each(function(index, element) {
                var openDropdown = element;
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            })
        } else {
            $('#dropdown-menu').toggleClass('show');
        }
    })
    /*
     ** Represents a function to update header details
     */
    function headerDetails(data) {
        var headerDetails = data[0];
        $('.user-name').text(headerDetails.first_name + " " + headerDetails.last_name);
    }

    /*
     ** Represents a function that makes AJAX call to update header details
     */
    function getHeaderDetails() {   
        $.ajax({
            url:_BASEURLJSONSERVER + '/' + supervisorList,
            data: {
                "id": empid
            },
            success: function(data) {
                headerDetails(data);
                $('.user-image').attr('src', '../../images/thumbnail/' + empid + '.png');
                $('.userimage-size').attr('src', '../../images/thumbnail/' + empid + '.png');
            },
            error: function() {
                alert('unable to get data from server');
            }

        });   
    } 
    getHeaderDetails();     

    //logout functionality
    $('.logout').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("wecwec");
        sessionStorage.clear();
        localStorage.removeItem('password');
        window.location = _BASEURLAPPLICATION + '/' + loginPage + '?logout=1';

    })

    //update profile functionality
    $('#update-profile').on("click", function() {
        updateProfileModal();
    });



    $('.save-button').on('click', function() {
        var  name  =  $(".supervisor-name-label")[1].value;
        var splitName = name.split(" ");
        if (splitName.length == 2) {
            var firstName = splitName[0],
                lastName = splitName[1];
        } else {
            var firstName = name;
            var lastName = "";
        }


        $.ajax({
            url: _BASEURLJSONSERVER + '/' + supervisorList,
            data: {
                "id": empid
            },
            success: function(data) {
                var updateProfileDetails = data[0];
                updateProfileDetails.first_name = firstName;
                updateProfileDetails.last_name = lastName;
                updateProfileDetails.email = $('.supervisor-email-label')[1].value;
                updateProfileDetails.role = $('.supervisor-role-label')[1].value;
                updateProfileDetails.location = $('.supervisor-address-label')[1].value;
                $.ajax({ 
                    type:   'PUT',
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(updateProfileDetails),
                    url:  _BASEURLJSONSERVER + '/' + supervisorList + '/' + empid,
                    success: function(data) {
                        $.ajax({
                            method: 'GET',
                            url: _BASEURLJSONSERVER + '/' + supervisorList,
                            data: {
                                "id": empid
                            },
                            success: function(data) {
                                var profileSectionDetails = data[0];

                                if ($('.supervisor-empid-label').text() === profileSectionDetails.id) {
                                  if(sessionStorage.getItem('id')===profileSectionDetails.id){

                                        headerDetails(data);
                                      profileDetails.profileDetailsSection(profileSectionDetails);

                                  }
                                }
                            }
                        })
                    }
                });

            },
            error: function() {
                alert('unable to get data from server')
            }

        });


    })
    return {
        fillAndShowUpdateProfileModal: fillAndShowUpdateProfileModal
    }

})();
