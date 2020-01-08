var profiles = [];
var curentUser;

//log in user
function changeUser(fname) {
	$.ajax({
		url: "../BACKEND/php/profileManager.php?task=load&fname="+fname,
		type: 'GET',
		success: function (data) {
			var response = JSON.parse(data);
			curentUser = response.values;
			window.localStorage.setItem("curentUser", JSON.stringify(curentUser));
			$(".userNameLbl").html(curentUser.name.toUpperCase());
			$(".lastTime").html(curentUser.lastTime);
			$(".totalTime").html(curentUser.totalTime);
		},
		error: function () {

		}
	});	
}

//display curent user information in a page
function loadUser() {
	if (curentUser == undefined) {
		curentUser = JSON.parse(window.localStorage.getItem("curentUser"));
		$(".userNameLbl").html(curentUser.name.toUpperCase());
		$(".lastTime").html(curentUser.lastTime);
		$(".totalTime").html(curentUser.totalTime);
	}
}

//to do
function createUser(argument) {
	// body...
}

//call every second (toxicity timeinterval) to update time of use of the curent user
function updateCurentUser(argument) {
	// body...
}

//call when lamp is turned off (op finished), to send data to backend
function saveCurentUser(argument) {
	// body...
}

//do this only if you are on settings page
if (window.location.pathname.indexOf("settings.html") != -1) {
	//load list of all users
	$.ajax({
		url: "../BACKEND/php/profileManager.php?task=listAll",
		type: 'GET',
		success: function (data) {
			console.log(data);
			profiles = JSON.parse(data).profiles;
			console.log(profiles);
			for (var i = profiles.length - 1; i >= 0; i--) {

				$(".usersList").append('<li class="selectUserBtn" data-fname="' + profiles[i] + '">' + profiles[i] + "</li>");
				
				$(".selectUserBtn").click(function () {
					changeUser($(this).attr("data-fname"));
				});

			}
		},
		error: function () {

		}
	});
}
//load and display information of curent user
loadUser();