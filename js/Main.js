$(function(){
  let lastId = 0;
  $list = $("#card-list")
  const Members = [];
  function Member(fName, lName, uName, enrollDate, birthday,interest) {
    this.id = lastId++;
    this.fName = fName;
    this.lName = lName;
    this.uName = uName;
    this.interest = interest;
    this.enrollDate = enrollDate;
    this.birthday = birthday;
    this.currentAge = function () {
      var today = new Date();
      var birthDate = new Date(this.birthday);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
    };
  }
  function displayMembers(list){
    $list.html(" ")
    list.forEach(member =>{
      $list.append(`
      <div class="member-card">
      <i class="fa-solid fa-dumbbell"></i>
      <p><b>ID:</b>${member.id}</p>
      <p><b>First Name:</b> ${member.fName}</p>
      <p><b>Last Name:</b> ${member.lName}</p>
      <p><b>UserName:</b>${member.uName}</p>
      <p><b>Age:</b>${member.currentAge()}</p>
      <p><b>Enrollment Date:</b> ${member.enrollDate}</p>
      <p><b>Interest:</b> ${member.interest}</p>
      <input class="remove-Member btn" type="button" data-memberid="${member.id}" value="Delete Member"/>
    </div>`);
    });

    $(".remove-Member").on("click", function (e) {
      e.preventDefault();
      let currentId = $(this).data('memberid');
      debugger;
      if (window.confirm("Are you sure you want to Delete this member?")) {
        let $target = $(e.target).parent(".member-card").remove();
        
        let currentId = $(this).data('memberid');
        let currentIndex = Members.findIndex(member => member.id === currentId)
        debugger;
  
      Members.splice(currentIndex,1);
        console.log(Members)
        //Members.slice(currentIndex)
    
        console.log($target);
        
      }
    });
  
    
  
  }
 

  //This is function that will take the id and error message and display
  //the error on the correct element and label
  function displayErrorById(idSelector, errorMessage) {
    const $input = $("#" + idSelector);
    const $label = $(`label[for="${idSelector}"]`);

    $input.addClass("invalid");
    $label.text(" " + errorMessage);
  }

  //This is a function that will take the id and default label text
  //and remove any errors and reset the text
  function removeErrorById(idSelector, defaultText) {
    const $input = $("#" + idSelector);
    const $label = $(`label[for="${idSelector}"]`);

    $input.removeClass("invalid");
    $label.text(defaultText);
  }

  function validateNameById(id, nameType) {
    const $input = $('#' + id);
    
    const letterRegex = new RegExp('^[a-zA-Z]*$');

    if( letterRegex.test($input.val()) )
    {
        removeErrorById(id, nameType + " Name");
        return true;
    } else {
        displayErrorById(id, nameType + " Name - Please use only letters");
        return false;
    }
}


function validateUserNameById(id) {
    const $input = $('#' + id);
    
    const userNameRegex = new RegExp('^[a-zA-Z]{4,6}[0-9]{1,3}$');

    if( userNameRegex.test($input.val()) )
    {
        removeErrorById(id, "User Name");
        return true;
    } else {
        displayErrorById(id, "User Name - Please use 4-6 letters and 1-3 numbers");
        return false;
    }
}


function validateBirthdayById(id) {
  const bday = new Date($('#' + id).val().replace('-', '/'));

  let eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear( eighteenYearsAgo.getFullYear() - 18 )

  let isAdult = false;

  if(bday.getFullYear() < eighteenYearsAgo.getFullYear()){
      isAdult = true;
  } else if(bday.getFullYear() == eighteenYearsAgo.getFullYear()) {
      if(bday.getMonth() < eighteenYearsAgo.getMonth()) {
          isAdult = true;
      } else if (bday.getMonth() == eighteenYearsAgo.getMonth()) {
          if(bday.getDate() <= eighteenYearsAgo.getDate()) {
              isAdult = true;
          }
      }
  }

  if( isAdult )
  {
      removeErrorById(id, "Birthday");
      return true;
  } else {
      displayErrorById(id, "Birthday - Must be 18 years or older");
      return false;
  }
}
  function validateEnrollmentDateById(id) {
    
    const eDate = new Date($('#' + id).val().replace('-', '/'));
    let today = new Date();
    isValid = false;
    if (eDate.getFullYear() < today.getFullYear()) {
      isValid = true;
    } else if (eDate.getFullYear() == today.getFullYear()) {
      if (eDate.getMonth() < today.getMonth()) {
        isValid = true;
      } else if (eDate.getMonth() == today.getMonth()) {
        if (eDate.getDate() <= today.getDate()) {
          isValid = true;
        }
      }
    }
    if( isValid )
  {
      removeErrorById(id, "Enrollment Date ");
      return true;
  } else {
      displayErrorById(id, "Enrollment Date - Please enter a relevant date");
      return false;
  }
   
  }
  $("#fNameInput").on("keyup blur", function (e) {
    validateNameById("fNameInput", "first");
  });

  $("#lNameInput").on("keyup blur", function (e) {
    validateNameById("lNameInput", "last");
  });

  $("#uNameInput").on("keyup blur", function (e) {
    validateUserNameById("uNameInput");
  });

  $("#enrollDateInput").on("keyup blur", function (e) {
    validateEnrollmentDateById("enrollDateInput");
  });

  $("#birthDateInput").on("keyup blur", function (e) {
    validateBirthdayById("birthDateInput");
  });

$('form#addMembers').on('submit', function(e) {
        e.preventDefault();
        
        //validate our inputs
        let isFNameValid = validateNameById('fNameInput', 'First');
        let isLNameValid = validateNameById('lNameInput', 'Last');
        let isValidUserName = validateUserNameById('uNameInput');
        let isValidEnrollentDate  = validateEnrollmentDateById('enrollDateInput');
        let isOldEnough = validateBirthdayById( 'birthDateInput' );
        
        //if all are valid, add the student to the array and reset the form
        if(isFNameValid && isLNameValid && isValidUserName && isValidEnrollentDate && isOldEnough)
        {
            //create new students
            Members.push(new Member(
                $('#fNameInput').val(), 
                $('#lNameInput').val(), 
                $('#uNameInput').val(), 
                $('#enrollDateInput').val(), 
                $('#birthDateInput').val(),
                $('#select').val())
            );

            //push the new student IF valid
            this.reset();
            displayMembers(Members);
            console.log(Members)
        }
        

    }); 
 
  $(".remove-Member").on("click", function (e) {
    e.preventDefault();
    let currentId = $(this).data('memberid');
    debugger;
    if (window.confirm("Are you sure you want to Delete this member?")) {
      let $target = $(e.target).parent(".member-card").remove();
      
      let currentId = $(this).data('memberid');
      debugger;

      Members.slice(Members.indexOf())
      //Member.findIndex(member => member.id === some id)
      console.log($target);
      
    }
  });


  $("#join-now").on("click", function(e) {
    e.preventDefault();
    $("#newMember").slideToggle();
  });


  $("#list-members").on("click", function(e) {
    e.preventDefault();
    $("#list").slideToggle()
    });
    //SUBMIT THIS AND PACK! WHO CARES! JUST FILM IT IN 5 MINUTES
    //AND BE DONE WITH IT
    //WE CAN DO EXTRA STUFF WHEN YOU GET BACK
    $("#keywordFilter").on("keyup", function (e) {
      debugger;
      const membersByKeyword = Members.filter(filterByKeyword);
      if ($("#Sort").val() == "fName") {
        const membersSortedFName = membersByKeyword.sort(sortsMembersByfName);
        displayMembers(membersSortedFName);
      } else if($("#Sort").val() == "lName") {
        const membersSortedLName = membersByKeyword.sort(sortsMembersByLName);
        displayMembers(membersSortedLName);
      }else if($("#Sort").val() =="uName"){
        const membersSortedUName = membersByKeyword.sort(sortsMembersByUName);
        displayMembers(membersSortedUName)
      }else if($("#Sort").val() =="name"){
        const membersSortedName = membersByKeyword.sort(sortsMembersByName);
        displayMembers(membersSortedName)
      }else if($("#Sort").val() =="id"){
        const membersSortedId = membersByKeyword.sort(sortsMembersById);
        displayMembers(membersSortedId)
      }else if($("#Sort").val() =="enrollment"){
        const membersSortedEnrollmentDate = membersByKeyword.sort(sortsMembersByEnrollmentdate);
       displayMembers(membersSortedEnrollmentDate)
      }
    });
    function filterByKeyword(item) {
      let myKeyword = $("#keywordFilter").val().toLowerCase();
      if (
        item.fName.toLowerCase().includes(myKeyword) ||
        item.lName.toLowerCase().includes(myKeyword)||
        item.uName.toLowerCase().includes(myKeyword)
      ) {
        return true;
      }
      return false;
    }
  
    function sortsMembersByfName(a, b) {
      debugger;
      const aFirstNameLower = a.fName.toLowerCase();
      const bFirstNameLower = b.fName.toLowerCase();
  
      if (aFirstNameLower > bFirstNameLower) {
        return 1;
      } else if (aFirstNameLower < bFirstNameLower) {
        return -1;
      }
      return 0;
    }

    function sortsMembersByLName(a, b) {
      const aLastNameLower = a.lName.toLowerCase();
      const bLastNameLower = b.lName.toLowerCase();
  
      if (aLastNameLower > bLastNameLower) {
        return 1;
      } else if (aLastNameLower < bLastNameLower) {
        return -1;
      }
      return 0;
    }
    function sortsMembersByUName(a, b) {
      const aUserNameLower = a.uName.toLowerCase();
      const bUserNameLower = b.uName.toLowerCase();
  
      if (aUserNameLower > bUserNameLower) {
        return 1;
      } else if (aUserNameLower < bUserNameLower) {
        return -1;
      }
      return 0;
    }
    function sortsMembersByName(a, b) {
      const aNameLower = a.fName.toLowerCase() + " " +a.lName.toLowerCase();
      const bNameLower =b.fName.toLowerCase() + " " +b.lName.toLowerCase(); 
  
      if (aNameLower > bNameLower) {
        return 1;
      } else if (aNameLower < bNameLower) {
        return -1;
      }
      return 0;
    }
    function sortsMembersById(a, b) {
      const aId = a.id ;
      const bId =b.id ;
  
      if (aId > bId) {
        return 1;
      } else if (aId < bId) {
        return -1;
      }
      return 0;
    }
    function sortsMembersByEnrollmentdate(a, b) {
      const aEnrollment = a.enrollDate ;
      const bEnrollment = b.enrollDate ;
  
      if (aEnrollment > bEnrollment) {
        return 1;
      } else if (aEnrollment < bEnrollment) {
        return -1;
      }
      return 0;
    }
    
    $('#interests').on('submit', function (e) {
      e.preventDefault()
      $('#card-list').html('');
  const filtered = [];
      let isClasses = document.getElementById('Classes').checked
      let isPool = document.getElementById('Pool').checked
      let isRockClimbing = document.getElementById('RockClimbing').checked

      Members.forEach(member => {
          if (!isClasses && !isPool && !isRockClimbing) { displayMembers(Members); }

          else if ((isClasses && member.interest == 'Classes') || (isPool && member.interest == 'Pool') || (isRockClimbing && member.interest == 'RockClimbing')) {
              filtered.push(member)
              displayMembers(filtered)
          }
      })
      
  })


   


  });

