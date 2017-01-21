/*
 ** Represents a function to update profile details section
 */
var profileDetails = (function() {
    var empid = sessionStorage.getItem('id');

    function profileDetailsSection(profileSectionDetails) {
        $(".profile-pic").attr('src', profileSectionDetails.image);
        $(".supervisor-name-label").each(function(index, value) {
            if (index === 0) {
                $(this).text(profileSectionDetails.first_name + " " + profileSectionDetails.last_name);
            }
        });

        $(".supervisor-empid-label").each(function(index, value) {
            if (index === 0) {
                $(this).text(profileSectionDetails.id);
            }

        });

        $(".supervisor-email-label").each(function(index, value) {
            if (index === 0) {
                $(this).text(profileSectionDetails.email);
            }

        });

        $(".supervisor-role-label").each(function(index, value) {
            if (index === 0) {
                $(this).text(profileSectionDetails.role);
            }
        });

        $(".supervisor-address-label").each(function(index, value) {
            if (index === 0) {
                $(this).text(profileSectionDetails.location);
            }
        });

    }

    function getProfileDetails() {
        $.ajax({
            url: _BASEURLJSONSERVER + '/' + supervisorList,
            data: {
                "id": empid
            },
            success: function(data) {
                var profileSectionDetails = data[0];
                profileDetailsSection(profileSectionDetails);
            }
        });
    }
    getProfileDetails();
    return {
        profileDetailsSection: profileDetailsSection

    }
})();
