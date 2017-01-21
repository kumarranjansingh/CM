var dashboard = (function() {
    var flag = 0;
    var superviseeData;
    var supervisorId = sessionStorage.getItem('id');
    /**
     * Represents a function to sort array on the basis of First Name
     *@param {string} data - Data to be sorted
     *@param {string} order - asc|desc for desired order
     */
    CM.sortByName=function sortByName(data, order) {
        data.supervisee.sort(function sortByName(a, b) {
            var nameA = a.first_name.toLowerCase(),
                nameB = b.first_name.toLowerCase();
            if (order === 'asc') {
                if (nameA < nameB) //sort string ascending
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            } else if (order === 'desc') {
                if (nameA > nameB) //sort string descending
                    return -1;
                if (nameA < nameB)
                    return 1;
                return 0;
            }
        });
    }

    function deleteSupervisee(superviseeId) {
        var url = _BASEURLJSONSERVER + '/' + supervisorList + '/' + supervisorId;
        var data = superviseeData;
        console.log(data);
        var deletingId = superviseeId;
        $.each(data.supervisee, function(index, value) {
            if (deletingId == value.id) {
                data.supervisee.splice(index, 1);
                return false;
            }
        });
        if (confirm("Do you want to delete supervisee")) {

            $.ajax({
                url: url,
                method: "PUT",
                data: JSON.stringify(data),
                success: function() {
                    populateSuperviseeData(supervisorId);
                },
                contentType: "application/json"

            });
        }
    }



    /**
     * Represents a function to fetch supervisor data
     */
    function populateSuperviseeData(loggedInSupervisorId) {
        var url = _BASEURLJSONSERVER + '/' + supervisorList + '/' + loggedInSupervisorId;
        $.ajax({
            url: url,
            success: function(data) {
                superviseeData = data;
                flag = 1;
                CM.sortByName(superviseeData, 'asc');
                dynamicSuperviseeTable(superviseeData.supervisee);
                search();
            },
            error: function() {
                //will be used fo giving error message once the modal component is ready.
            }
        });
    }

    /**
     * Represents a function to fetch supervisee data
     *@param {string} superviseeData - object for superviseedata list
     */

    function dynamicSuperviseeTable(superviseeData) {
        $('.supervisee-list').html("");
        var arr = [];
        var count = 0;
        for (i = 65; i <= 90; i++) {
            arr[i - 65] = String.fromCharCode(i).toLowerCase();
        }
        $.each(superviseeData, function(index, value) {
            if (index % 2 == 0)
                value.rowClassName = "odd-supervisee-row";
            else
                value.rowClassName = "even-supervisee-row ";
            value.index = index + 2;
            if ((value.first_name.charAt(0)).toLowerCase() === arr[count]) {
                var alphaGroupingHeader = $('<div></div>').attr("id", arr[count]);
                $('.supervisee-list').append(alphaGroupingHeader);
                count++;
            } else if (value.first_name.charAt(0).toLowerCase() > arr[count]) {
                count = value.first_name.toLowerCase().charCodeAt(0) - 97;
                var alphaGroupingHeader = $('<div></div>').attr("id", arr[count]);
                $('.supervisee-list').append(alphaGroupingHeader);
                count++;
            }
            var supviseeRowTemplate = Handlebars.compile($('#supervisee-row').html().replace(/[\u200B]/g, ''));
            $('.supervisee-list').append(supviseeRowTemplate(value));

        });
        $.each($('.supervisee-row'), function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var superviseeId = $(this).attr('data-superviseeId');
                sessionStorage.setItem('superviseeId', superviseeId);
                window.location = "innerpage.html";
            });
        });
        $.each($('.supervisee-delete-button'), function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var superviseeId = $(this).attr('data-superviseeId');
                deleteSupervisee(superviseeId);
            })
        });
        //Event listener for edit Button
        $.each($('.supervisee-edit-button'), function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var superviseeId = $(this).attr('data-superviseeId');
                editSupervisee(superviseeId);
            });
        });
    }
    populateSuperviseeData(sessionStorage.getItem('id')); //Get supervisor Employee Id form Session Storage and pass it here

    /* Represent Event Listener on Emp.Name header to sort data by Name */
    $('#supervisee-name').on('click', function() {
        if (flag === 1) {
            if ($(this).attr('data-order') === 'asc') {
                $(this).attr('data-order', 'desc');
                $('.alphabets-list').hide();
                CM.sortByName(superviseeData, 'desc');
                dynamicSuperviseeTable(superviseeData.supervisee);
                $('#supervisee-name i').removeClass('fa-caret-up').addClass('fa-caret-down');
            } else {
                $(this).attr('data-order', 'asc');
                CM.sortByName(superviseeData, 'asc');
                $('.alphabets-list').show();

                dynamicSuperviseeTable(superviseeData.supervisee);
                $('#supervisee-name i').removeClass('fa-caret-down').addClass('fa-caret-up');
            }
        }

    });


    /**
     *Represents a function to update supervisor details
     **/
    function editSupervisee(superviseeId) {
        $.ajax({
            url: _BASEURLJSONSERVER + '/' + skills + '/' + superviseeId,
            success: function(data) {
                var superviseeDetails = data;
                headerSection.fillAndShowUpdateProfileModal(superviseeDetails, 'supervisee');

            },
            error: function() {
                //will be used fo giving error message once the modal component is ready.
            }
        });
    }

    //search functionality
    function search() {
        // if(flag===1){
        var data = superviseeData.supervisee;
        var searchBox = $("#search-box");
        searchBox.on('keypress', function(e) {
            var key = e.keyCode;
            if (key == 13) {
                displaySuperviseeList(data);
            }
        });

        searchBox.on('keyup', function() {
            var searchResult = $('#search-result');
            searchResult.empty();
            searching(data);
        });

        $(window).on('click', function(e) {
            var searchResult = $('#search-result');
            searchResult.hide();
        })
        // }

    }

    function searching(data) {
        var searchResult = $('#search-result');
        var searchBoxValue = $("#search-box").val();
        var newObj = new Array();
        if (searchBoxValue.trim().length >= 2) {
            searchResult.show();
            $.each(data, function(index, value) {

                var idValue = value.id;
                var nameOfEmployee = value.first_name;
                var lastNameOfEmployee = value.last_name;
                searchBoxValue = searchBoxValue.toUpperCase();
                nameOfEmployeeInUpper = nameOfEmployee.toUpperCase();

                if (nameOfEmployeeInUpper.indexOf(searchBoxValue) > -1 || idValue == searchBoxValue) {
                    /*if the substring matches then append into the div else dont*/
                    var listItem = $('<div></div>');
                    var nameNode = $('<span></span>');

                    var idNode = $('<span></span>');
                    idNode.attr('class', 'search-employeeID')

                    var nameOfEmployeeNode = document.createTextNode(nameOfEmployee + " " + lastNameOfEmployee);
                    nameNode.append(nameOfEmployeeNode)
                    listItem.append(nameNode);
                    listItem.append($("</br>"));
                    var IdofEmployeeNode = document.createTextNode(idValue);
                    idNode.append(IdofEmployeeNode);
                    listItem.append(idNode);


                    listItem.attr('id', idValue);

                    listItem.on('click', function() {
                        newObj.push(value);

                        dynamicSuperviseeTable(newObj);


                    });
                }
                searchResult.append(listItem);

            });



        } else {
            searchResult.hide();
        }

        if (searchResult.is(':empty')) {
            var listItem = $("<div></div>");
            var noResultNode = $("<span></span>")
            var noResultFoundMessage = document.createTextNode("No results Found");
            noResultNode.append(noResultFoundMessage);
            listItem.append(noResultNode);
            searchResult.append(listItem);
        }
    }

    function displaySuperviseeList(data) {
        var filteredData = {};
        var j = 0;
        var searchBox = $("#search-box").val();
        for (i in data) {

            var nameOfEmployee = data[i].first_name;
            var empid = data[i].id;

            nameOfEmployeeInUpper = nameOfEmployee.toUpperCase();
            searchBox = searchBox.toUpperCase();
            if (nameOfEmployeeInUpper.indexOf(searchBox) == 0 || empid == searchBox)
                filteredData[j++] = data[i];
        }

        dynamicSuperviseeTable(filteredData);
    }


})();
