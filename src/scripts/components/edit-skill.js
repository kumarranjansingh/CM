var editSkills = (function() {
    var root = _BASEURLJSONSERVER + '/skills';
    var superviseeId = sessionStorage.getItem('superviseeId');

    // if (superviseeId === null && window.location.href != _BASEURLAPPLICATION + '/index.html' && window.location.href != _BASEURLAPPLICATION + '/dashboard.html') {
    //     window.location = "index.html";
    // }
    var i = 0;

    /*
     ** Represents a function to create skill container and skills from json server
     */

    $('.add-skills').on("click", function() {
        modal.addSkillsModal();
    });

    var skills = function(skill) {
        var empid = sessionStorage.getItem('superviseeId');

        var skillTypeClass = '.' + skill
        var skillListClass = '.' + skill + '-skill-list'
        $("document").ready(function() {
            var mydata = 1;
            $.ajax({
                url: root + '/' + superviseeId,
                method: 'GET',
                success: function(data1) {
                    ajaxcallback(data1);
                    if (window.location.href === _BASEURLAPPLICATION+ "/innerpage.html") {
                        var profileSectionDetails = data1;
                        profileDetails.profileDetailsSection(profileSectionDetails);
                    }
                },

            })

            function ajaxcallback(data) {
                mydata = data;
                $(skillTypeClass).append($('<div>').addClass(skill + '-skill-container'))
                $('.' + skill + '-skill-container').append($('<div>').addClass(skill + '-skill-list').attr('id', skill + '-skill-list'))
                $('.' + skill + '-skill-container').append($('.' + skill + '-edit-button'))
                i = 0;
                var ele = mydata[skill]
                var sum, val;
                var count;
                /*
                 ** Represents a loop to create main-skill rendered from database
                 */
                for (var d of ele) {
                    var mainSkillName = d['skill_name']

                    $(skillListClass).append($('<div>').addClass('main-skill-' + skill).attr('id', skill + '-main-skill-' + i))
                    $('#' + skill + '-main-skill-' + i).append($('<i>').addClass('fa fa-angle-down'))
                    $('#' + skill + '-main-skill-' + i).append($('<div>').addClass('main-skill-name').text(mainSkillName));
                    $('#' + skill + '-main-skill-' + i).append($('<div>').addClass('skill-level').attr('id', skill + '-skill-level' + i));
                    $(skillListClass).append($('<div>').addClass('sub-skill-container').attr('id', skill + '-sub-container' + i));
                    j = 0;
                    sum = 0;
                    count = 0;
                    /*
                     ** Represents a loop to create subskill-skill rendered from database
                     */
                    for (var e of d['sub_skills']) {
                        var subSkillName = e.sub_skill_name
                        $('#' + skill + '-sub-container' + i).append($('<div>').attr('id', skill + '-sub-skill' + i + '-' + j).addClass('sub-skill disable'));
                        $('#' + skill + '-sub-skill' + i + '-' + j).append($('<div>').addClass('sub-skill-check').attr('id', skill + '-sub-skill-check' + i + '-' + j));
                        $('#' + skill + '-sub-skill-check' + i + '-' + j).append($('<input>').attr('type', 'checkbox').addClass('checkbox ' + skill + '-checkbox disable-check').attr('id', 'checkbox' + i + '-' + j));
                        $('#' + skill + '-sub-skill' + i + '-' + j).append($('<div>').addClass('sub-skill-name').attr('id', skill + '-sub-skill-name' + i).text(e.sub_skill_name));
                        $('#' + skill + '-sub-skill' + i + '-' + j).append($('<span>').addClass('sub-skill-rating').attr('id', skill + '-sub-skill-rating' + i + '-' + j));
                        $('#' + skill + '-sub-skill-rating' + i + '-' + j).append($('<span>').addClass('stars-' + skill + ' stars' + i + '-' + j + '-' + skill).attr('data-main-skill', mainSkillName).attr('data-sub-skill', subSkillName).attr('id', 1 + '-' + i + '-' + j + '-' + skill))
                        $('#' + skill + '-sub-skill-rating' + i + '-' + j).append($('<span>').addClass('stars-' + skill + ' stars' + i + '-' + j + '-' + skill).attr('data-main-skill', mainSkillName).attr('data-sub-skill', subSkillName).attr('id', 2 + '-' + i + '-' + j + '-' + skill))
                        $('#' + skill + '-sub-skill-rating' + i + '-' + j).append($('<span>').addClass('stars-' + skill + ' stars' + i + '-' + j + '-' + skill).attr('data-main-skill', mainSkillName).attr('data-sub-skill', subSkillName).attr('id', 3 + '-' + i + '-' + j + '-' + skill))
                        $('#' + skill + '-sub-skill-rating' + i + '-' + j).append($('<span>').addClass('stars-' + skill + ' stars' + i + '-' + j + '-' + skill).attr('data-main-skill', mainSkillName).attr('data-sub-skill', subSkillName).attr('id', 4 + '-' + i + '-' + j + '-' + skill))
                        $('#' + skill + '-sub-skill-rating' + i + '-' + j).append($('<span>').addClass('stars-' + skill + ' stars' + i + '-' + j + '-' + skill).attr('data-main-skill', mainSkillName).attr('data-sub-skill', subSkillName).attr('id', 5 + '-' + i + '-' + j + '-' + skill))
                        var ratingId = e.rating + '-' + i + '-' + j + '-' + skill
                        $('.stars' + i + '-' + j + '-' + skill).each(function(i) {
                            if ($(this).attr("id") == ratingId) {
                                return false
                            }
                        })
                        sum = sum + e.rating
                        j++;
                        count++;
                    }
                    val = sum / count;
                    /*
                     ** Represents a condition to give level of each main skill
                     */
                    if (val < 2.5) {
                        $('#' + skill + '-skill-level' + i).append($('<div>').addClass('beginner').text('BEGINNER'));
                    } else if (val < 4) {
                        $('#' + skill + '-skill-level' + i).append($('<div>').addClass('mediocre').text('MEDIOCRE'));
                    } else {
                        $('#' + skill + '-skill-level' + i).append($('<div>').addClass('expert').text('EXPERT'));
                    }
                    i++;
                }
                $('.stars-' + skill).append($('.svg-' + skill))
                /*
                 ** Represents an event to disable or enable the editng of subskill
                 */
                $('.checkbox').on('click', function() {
                    if ($(this).prop('checked')) {
                        $(this).parentsUntil(".sub-skill-container").removeClass('disable').addClass('enable')
                    } else {
                        $(this).parentsUntil(".sub-skill-container").removeClass('enable').addClass('disable')
                    }
                })
                /*
                 ** Represents an event fill all stars until clicked star
                 */
                $('.stars-' + skill).on('click', function() {
                    if ($(this).parentsUntil(".sub-skill-container").hasClass("enable")) {
                        var classes = $(this).attr('class').split(' ');
                        presentclass = '.' + classes[1]
                        $(presentclass).each(function(i) {
                            $(this).children('svg').children('polygon').attr('fill', 'grey')

                        })
                        var val = $(this).attr("id");
                        $($(presentclass)).each(function(i) {
                            $(this).children('svg').children('polygon').attr('fill', '#3fbde8')
                            if ($(this).attr("id") == val) {
                                return false
                            }
                        })
                        var id1 = $(this).attr("id")
                        var findMainSkill = $(this).data('main-skill');
                        var findSubSkill = $(this).data('sub-skill')
                        var rating = id1.split('-')
                        var ratingVal = parseInt(rating[0]);
                        $.each(data[skill], function(i, value) {
                            if (data[skill][i]['skill_name'] == findMainSkill) {
                                $.each(data[skill][i]['sub_skills'], function(j, value) {
                                    if (data[skill][i]['sub_skills'][j].sub_skill_name == findSubSkill) {
                                        data[skill][i]['sub_skills'][j].rating = ratingVal;

                                    }
                                });
                            }
                        });
                    }

                })
                /*
                 ** Represents an event to post the rating changes to the database
                 */
                $('.' + skill + '-submit').on('click', function() {
                    if ($(this).hasClass('edit')) {
                        $(this).text('Submit');
                        $('.' + skill + '-checkbox').each(function() {
                            $(this).addClass('enable-check').removeClass("disable-check")
                        })
                        $(this).removeClass('edit').addClass('submit')
                    } else if ($(this).hasClass('submit')) {
                        // $(this).text($('<i>').addClass("fa fa-pencil")'  Edit');
                        $(this).empty()
                        $(this).append($('<i>').addClass("fa fa-pencil edit-pencil")).append(document.createTextNode('  Edit'));
                        // $(this).text('Edit')
                        $.ajax({
                            dataType: "json",
                            type: 'PUT',
                            contentType: "application/json",
                            data: JSON.stringify(data),
                            url: root + '/' + superviseeId,
                            success: function(data) {}
                        });
                        $('.' + skill + '-checkbox').each(function() {
                            $(this).removeClass('enable-check').addClass('disable-check')
                            if ($(this).parentsUntil('.sub-skill-container').hasClass('enable')) {
                                $(this).parentsUntil('.sub-skill-container').removeClass('enable').addClass('disable')
                            }
                            if ($(this).prop('checked')) {
                                $(this).prop('checked', false);

                            }
                        })
                        $(this).removeClass('submit').addClass('edit')

                    }

                })
                /*
                 ** Represents a loop to perform accordion on main skill
                 */
                $('.main-skill-' + skill).each(function(i) {
                    $(this).click(function() {
                        $(this).children('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
                        $(this).siblings().children('i').removeClass('fa-angle-up').addClass('fa-angle-down');
                        $(this).next().slideToggle('slow').siblings('.sub-skill-container').slideUp('slow');
                    })
                })
                var val = $(this).attr("id");
                /*
                 ** Represents a function to fill all the star ratings that are populated from database
                 */
                var starfill = function() {
                    $.ajax({
                        url: root + '/' + superviseeId,
                        method: 'GET',
                        success: function(data1) {
                            ajaxcallback2(data1)
                        },

                    })

                    function ajaxcallback2(data) {
                        mydata = data;
                        var ele = mydata[skill]
                        i = 0;
                        for (var d of ele) {
                            j = 0;
                            for (var e of d['sub_skills']) {
                                var ratingId = e.rating + '-' + i + '-' + j + '-' + skill
                                $('.stars' + i + '-' + j + '-' + skill).each(function(i) {
                                    $(this).children('svg').children('polygon').attr('fill', '#3fbde8')
                                    if ($(this).attr("id") == ratingId) {
                                        return false
                                    }

                                })
                                j++
                            }
                            i++
                        }
                    }
                }
                starfill();
            }

        });
    }

    skills('primary');
    skills('secondary');
    /*
     ** Represents an event to perform all tabs operation on primary and secondary skill on mobile
     */
    $('.primary-skills-mobile').on('click', function() {
        $('.primary-skills-mobile').css('border-bottom', '4px solid #dd2728')
        $('.secondary-skills-mobile').css('border-bottom', 'none')
        $('.primary').css('display', 'block');
        $('.secondary').css('display', 'none');

    })
    $('.secondary-skills-mobile').on('click', function() {
        $('.secondary-skills-mobile').css('border-bottom', '4px solid #dd2728')
        $('.primary-skills-mobile').css('border-bottom', 'none')
        $('.secondary').css('display', 'block');
        $('.primary').css('display', 'none');

    })


    $('.back-button').click(function() {
        window.location = 'dashboard.html';
    })
})();
