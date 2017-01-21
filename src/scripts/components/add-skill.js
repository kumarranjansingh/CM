/**
 * Represents a function to add new skills for the selected supervisee
 */

var addSkills = (function() {

            var skillType;
            var a = 110000;
            a = sessionStorage.getItem('superviseeId');
            /**
             * Represents an event to pop up the modal to add primary skills
             **/
            $('#add-skill-button-primary').on('click', function() {
                skillType = "Primary";
                //  $('.primary-skills-div').show();
                $('.secondary-skills-div').hide();
                $('.custom-secondary-skills').hide();
                $('.custom-primary-skills').hide();

                $('.secondary-sub-skills-div').hide();
                //  $('.custom-secondary-skills').hide();
                $('.primary-skills-div').show();
                $('.primary-sub-skills-div').show();
                          });

            var skillcount = 1;
            /**
             * Represents an event to pop up the modal to add secondary skills
             **/
            $('#add-skill-button-secondary').on('click', function() {
                skillType = "Secondary";
                $('.secondary-skills-div').show();
                $('.secondary-sub-skills-div').show();

                $('.primary-skills-div').hide();
                $('.primary-sub-skills-div').hide();
                $('.custom-primary-skills').hide();
                $('.custom-secondary-skills').hide();

            });

            var subSkillOptions;
            var selectedPrimarySkill = $('.primary-skills')[0].value;
            var selectedSecondarySkill = $('.secondary-skills')[0].value;

            var flag = 0;
            var primarySubSkills = $('.primary-sub-skills');
            var secondarySubSkills = $('.secondary-sub-skills');

            var selectedSecondarySkill;
            var selectPrimaryOption = $("<option value='0'>SubSkill</option>");
            var selectedSecondarySubSkill = $('.secondary-sub-skills')[0].value;
            var selectSecondaryOption = $("<option value='0'>SubSkill</option>");
            $('.primary-sub-skills').append(selectPrimaryOption);
            $('.secondary-sub-skills').append(selectSecondaryOption);


            /**
             * Represents an event to populate the subskill dropdown according to the primary skill selected
             **/

            $('.primary-skills').change(function() {
                    if ($('.primary-skills')[0].value == "Custom") {
                    flag = 1;

                    var customSkill = $("<input type=\"text\" class=\"custom\" />");
                    customSkill.show();
                    $('.primary-sub-skills').append(customSubSkill);

                } else {


                    selectedPrimarySkill = $('.primary-skills')[0].value;

                    $('.primary-sub-skills').empty();
                    $('.primary-sub-skills').append(selectPrimaryOption);
                    if (selectedPrimarySkill != 0) {
                        $.ajax({
                            url: _BASEURLJSONSERVER+'/skill-set?skill_name=' + selectedPrimarySkill,
                            success: function(data) {


                                subSkillOptions = data[0].sub_skills;
                                $('.primary-sub-skills').empty();
                                $('.primary-sub-skills').append(selectPrimaryOption);
                                for (var k = 0; k < subSkillOptions.length; k++) {
                                    var subSkillOption = $("<option>" + subSkillOptions[k].sub_skill_name + "</option>");
                                    $('.primary-sub-skills').append(subSkillOption);

                                }
                                var customPrimarySubSkill = $("<option value= 'Custom'>Custom</option>")

                                $('.primary-sub-skills').append(customPrimarySubSkill);
                            }
                        });
                    }
                    flag = 0;
                }
            });


            /**
             * Represents an event to populate the subskill dropdown according to the secondary skill selected
             **/
            $('.secondary-skills').change(function() {
                selectedSecondarySkill = $('.secondary-skills')[0].value;
                selectedSecondarySubSkill = $('.secondary-sub-skills')[0].value;
                $('.secondary-sub-skills').append(selectSecondaryOption);
                if ($('.secondary-skills')[0].value == "Custom") {

                    flag = 1;
                    var customSkill = $("<input type=\"text\" class=\"custom\" />");
                    customSkill.show();
                    $('.secondary-sub-skills').append(customSubSkill);
                } else {

                    $('.custom-secondary-skills').hide();
                    selectedSecondarySkill = $('.secondary-skills')[0].value;
                    $('.secondary-sub-skills').empty();
                    $('.secondary-sub-skills').append(selectSecondaryOption);
                    if (selectedSecondarySkill != 0) {
                        $.ajax({
                            url: _BASEURLJSONSERVER+'/skill-set?skill_name=' + selectedSecondarySkill,
                            success: function(data) {
                                subSkillOptions = data[0].sub_skills;
                                $('.secondary-sub-skills').append(selectSecondaryOption);
                                for (var k = 0; k < subSkillOptions.length; k++) {
                                    var subSkillOption = $("<option>" + subSkillOptions[k].sub_skill_name + "</option>");
                                    $('.secondary-sub-skills').append(subSkillOption);

                                }
                                var customSecondarySubSkill = $("<option value= 'Custom'>Custom</option>");
                                $('.secondary-sub-skills').append(customSecondarySubSkill);
                            }
                        });
                    }
                    flag = 0;
                }
            });


                var addSkillList=[];
            /**
             * Represents an event to add an input field to add custom primary subskill
             **/

            $('.primary-sub-skills').change(function() {
              flag1=0;
                addSkillList=[];
                selectedPrimarySubSkill = $('.primary-sub-skills')[0].value;
                for (var i = 0; i < skillcount; i++) {
                    addSkillList[i] = $('.primary-sub-skills')[i].value;
                    if ($('.primary-sub-skills')[i].value == 0) {
                        flag1 = 1;
                    }
                }
                if ($('.primary-sub-skills')[0].value == "Custom") {
                    $('.custom-primary-skills').show();
                    flag = 1;

                    var customSkill = $("<input type=\"text\" class=\"custom-primary\" />");

                    $('.custom-primary-skills').append(customSkill);

                } else {
                    $('.custom-primary-skills').hide();
                }
            })


            /**
             * Represents an event to add an input field to add custom secondary subskill
             **/
            $('.secondary-sub-skills').change(function() {
              flag1=0;
                addSkillList=[];
                for (var i = 0; i < skillcount; i++) {
                    addSkillList[i] = $('.secondary-sub-skills')[i].value;
                    if ($('.secondary-sub-skills')[i] == 0) {
                        flag1 = 1;
                    }
                }
                if ($('.secondary-sub-skills')[0].value == "Custom") {
                    $('.custom-secondary-skills').show();
                    flag = 1;
                    var customSkill = $("<input type=\"text\" class=\"custom-secondary\" />");

                    $('.custom-secondary-skills').append(customSkill);
                } else {
                    $('.custom-secondary-skills').hide();
                }
            })

            var pSubSkill = $('.primary-sub-skills-div');
            var secondarySubSkill = $('.secondary-sub-skills-div');


            /**
             * Represents an event to add additional subskills
             **/
            $('.add-more-skills').on("click", function(e) {
              console.log("add-more-skills");
                    if (selectedPrimarySkill != 0 || selectedSecondarySkill != 0) {
                        var element = $(this).parent();
                        skillcount++;
                        if (skillType == "Primary" ){
                                if (flag1 == 0) {
                                    $(this).parent().after(pSubSkill.clone());
                                }
                                else {
                                 alert('Add a subskill first');
                                  // modal.notificationModal("Add a subskill first",0);
                                }
                            } else{
                              if(flag1==0){
                                $(this).parent().after(secondarySubSkill.clone());
                              }
                              else{
                                alert('Add a sub-skill first');
                              }
                        }
                      }
                    });

                var i = 0;
                var j = 0;
                var flag1;



                /**
                 * Represents an event to save the added skills
                 **/
                $('.add-skill').on("click", function() {
                    flag1 = 0;
                    if (skillType == "Primary") {

                         addSkillList = [];
                        var finalSkillsCount = 0;

                        var alertMessage = "";
                        for (var i = 0; i < skillcount; i++) {
                            addSkillList[i] = $('.primary-sub-skills')[i].value;
                            if ($('.primary-sub-skills')[i].value == 0) {
                                flag1 = 1;

                            }
                        }

                        if (flag1 == 0) {
                            var uniqueSkillNames = [];
                            $.each(addSkillList, function(i, el) {
                                if ($.inArray(el, uniqueSkillNames) === -1) uniqueSkillNames.push(el);
                            });
                            var uniqueSkillObjects = [];
                            var newSubSkill;
                            for (var j = 0; j < uniqueSkillNames.length; j++) {
                                newSubSkill = {
                                    "sub_skill_name": uniqueSkillNames[j],
                                    "rating": 1
                                }
                                uniqueSkillObjects.push(newSubSkill);
                            }
                            $.ajax({
                                url: _BASEURLJSONSERVER+'/skills/' + a,
                                success: function(data) {
                                    var skillList = data;
                                    var primarySkills = skillList.primary;
                                    var count = 0;
                                    $.each(primarySkills, function(index, value) {
                                        if (value.skill_name == selectedPrimarySkill) {
                                            $.each(value.sub_skills, function(index1, value1) {
                                                $.each(uniqueSkillObjects, function(index2, value2) {
                                                    if (value1.sub_skill_name == value2.sub_skill_name) {
                                                        alertMessage += value2.sub_skill_name + " Subskill already exist\n";
                                                        uniqueSkillObjects.splice(index2,1);
                                                    } else {
                                                        count++;

                                                        alertMessage += value2.sub_skill_name + " Subskill Successfully Added\n";
                                                    }

                                                })
                                            })
                                            if (count != 0) {
                                                if (selectedPrimarySubSkill == "Custom") {
                                                    newSubSkill = {
                                                        "sub_skill_name": $('.custom-primary')[0].value,
                                                        "rating": 1
                                                    };
                                                    uniqueSkillObjects = [];
                                                    uniqueSkillObjects.push(newSubSkill);
                                                }
                                                $.each(uniqueSkillObjects, function(index3, value3) {
                                                    data.primary[index].sub_skills.push(value3);
                                                });
                                            }
                                            $.ajax({
                                                dataType: "json",
                                                type: 'PUT',
                                                contentType: "application/json",
                                                data: JSON.stringify(data),
                                                url: _BASEURLJSONSERVER+'/skills/' + a,
                                                success: function() {
                                                    alert(alertMessage);
                                                    window.location.href=_BASEURLAPPLICATION+'/innerpage.html';

                                                },

                                            });
                                        }
                                    })
                                }
                            })
                        } else {
                            alert("Cannot be empty");
                        }
                    } else {
                        var addSkillList = [];
                        var finalSkillsCount = 0;

                        var alertMessage = "";

                        for (var i = 0; i < skillcount; i++) {
                            addSkillList[i] = $('.secondary-sub-skills')[i].value;
                            if ($('.secondary-sub-skills')[i] == 0) {
                                flag1 = 1;
                            }
                        }


                        if (flag1 == 0) {
                            var uniqueSkillNames = [];
                            $.each(addSkillList, function(i, el) {
                                if ($.inArray(el, uniqueSkillNames) === -1) uniqueSkillNames.push(el);
                            });
                            var uniqueSkillObjects = [];
                            var newSubSkill;
                            for (var j = 0; j < uniqueSkillNames.length; j++) {
                                newSubSkill = {
                                    "sub_skill_name": uniqueSkillNames[j],
                                    "rating": 1
                                }
                                uniqueSkillObjects.push(newSubSkill);
                            }
                            $.ajax({
                                url: _BASEURLJSONSERVER+'/skills/' + a,
                                success: function(data) {
                                    var skillList = data;
                                    var secondarySkills = skillList.secondary;
                                    var count = 0;
                                    $.each(secondarySkills, function(index, value) {
                                        if (value.skill_name == selectedSecondarySkill) {
                                            $.each(value.sub_skills, function(index1, value1) {
                                                $.each(uniqueSkillObjects, function(index2, value2) {
                                                    if (value1.sub_skill_name == value2.sub_skill_name) {
                                                        alertMessage += value2.sub_skill_name + " Subskill already exist\n";
                                                        uniqueSkillObjects.splice(index2,1);
                                                    } else {
                                                        count++;

                                                        alertMessage += value2.sub_skill_name + " Subskill Successfully Added";
                                                    }

                                                })
                                            })
                                            if (count != 0) {
                                                if (selectedSecondarySubSkill == "Custom") {
                                                    newSubSkill = {
                                                        "sub_skill_name": $('.custom-secondary')[0].value,
                                                        "rating": 1
                                                    };
                                                    uniqueSkillObjects = [];
                                                    uniqueSkillObjects.push(newSubSkill);
                                                }
                                                $.each(uniqueSkillObjects, function(index3, value3) {
                                                    data.secondary[index].sub_skills.push(value3);
                                                });
                                            }
                                            $.ajax({
                                                dataType: "json",
                                                type: 'PUT',
                                                contentType: "application/json",
                                                data: JSON.stringify(data),
                                                url: _BASEURLJSONSERVER+'/skills/' + a,
                                                success: function() {
                                                  window.location.href=_BASEURLAPPLICATION+'/innerpage.html';
                                                  alert(alertMessage);

                                                },
                                                error: function() {

                                                }

                                            });
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            })();
