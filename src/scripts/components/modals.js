/**
 * Contains functions to populate specific modals and to hide and show those modals
 **/

var modal = (function() {
    var height = $(window).height();
    $('body').css('height', height);

    var modalOverlay = $('#modal-overlay');
    $('.button','supervisee-delete-button').on('click', function(e) {
        modalOverlay.fadeIn(200);
        $(window).scrollTop(0);
        $('body').addClass('fixed');
        notificationModal("Do you really want to delete this supervisor", true);
    });
        modalOverlay.on('click', function(e) {
        if (e.target === this) {
            modalOverlay.fadeOut(200);
            $('body').removeClass('fixed');
        } else return;
    })

    //function to pop up add skills modal
    function addSkillsModal() {
        console.log("Yes");
        modalOverlay.children().hide();
        modalOverlay.show();
        $('#add-skills-modal').show();

    }


    //function to pop up a notification
    function notificationModal(msg, isQuestion, callback, id) {

        modalOverlay.children().hide();
        $('.modal-body > p').html(msg);

        // $('.yes-button').click(function() {
        //     modalOverlay.fadeOut(200);
        //     $('body').removeClass('fixed');
        //     callback(true ,id);
        // })
        // $('.no-button').click(function() {
        //     modalOverlay.fadeOut(200);
        //     $('body').removeClass('fixed');
        //
        // })
        // $('.close-button').click(function() {
        //     modalOverlay.fadeOut(200);
        //     $('body').removeClass('fixed');
        // })

        if (isQuestion) {
            $('.close-button').hide();
        } else {
            $('.yes-button').hide();
            $('.no-button').hide();

        }
        $('#notification-modal').show(function() {
            //callback(true, id);
        });

    }

    function updateProfileModal() {
        modalOverlay.children().hide();
        $('#update-profile-modal').show();
        var chooseProfilePicDiv = $('#choose-profile-pic');
        $('#change-profile-picture-button').on('click', function() {
            $('#upload-file').trigger('click').change(function() {
                var filename = chooseProfilePicDiv.find('input').prop('value');
                if (filename != null) {
                    chooseProfilePicDiv.fadeIn(700);
                    chooseProfilePicDiv.find('p').html(chooseProfilePicDiv.find('input').prop('value'));
                }
            });

        });

        chooseProfilePicDiv.find('a').on('click', function() {
            chooseProfilePicDiv.find('input').val(null);
            chooseProfilePicDiv.fadeOut(700);
        })

        $('.modal-footer > .save-button').on('click', function() {
            //write ajax code here

            modalOverlay.fadeOut(200);
            $('body').removeClass('fixed');
            chooseProfilePicDiv.find('a').trigger('click');
        })

        $('.modal-footer > .cancel-button').on('click', function() {
            modalOverlay.fadeOut(200);
            $('body').removeClass('fixed');
            chooseProfilePicDiv.find('a').trigger('click');
        })

    }
    return {
        modalOverlay: modalOverlay,
        addSkillsModal: addSkillsModal,
        updateProfileModal: updateProfileModal,
        notificationModal: notificationModal
    }

})();
