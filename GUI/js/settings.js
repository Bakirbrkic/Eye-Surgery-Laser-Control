var profiles = [];
var curentUser;
var userTimer;
var userDuration = 0;
var deviceLife;

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
			$(".lastTox").html(curentUser.lastToxicity);
			$(".totalTime").html(curentUser.totalTime);
			location.reload();
		},
		error: function () {

		}
	});	
}

//display curent user information in a page
function loadUserandDeviceInfo() {
	//handle user
	if (curentUser == undefined) {
		curentUser = JSON.parse(window.localStorage.getItem("curentUser"));
		$(".userNameLbl").html(curentUser.name.toUpperCase());
		$(".lastTox").html(curentUser.lastToxicity);
		$(".lastTime").html(Math.floor(parseInt(curentUser.lastTime)/3600) + "h " + Math.floor(parseInt(curentUser.lastTime)%3600/60) + "min " + Math.floor(parseInt(curentUser.lastTime)%3600%60) + "s");
		$(".totalTime").html(Math.floor(parseInt(curentUser.totalTime)/3600) + "h " + Math.floor(parseInt(curentUser.totalTime)%3600/60) + "min " + Math.floor(parseInt(curentUser.totalTime)%3600%60) + "s");
	}
	//handle device lifetime
	$.ajax({
		url: "../BACKEND/php/time.php?task=get",
		type: 'GET',
		success: function (data) {
			deviceLife = JSON.parse(data).lifeTime;
			window.localStorage.setItem("deviceLife", deviceLife);
			if (window.location.pathname.indexOf("diagnostics.html") != -1) {
				$(".lifeTimeTimerLbl").html(Math.floor(deviceLife/3600) + ":" + Math.floor(deviceLife%3600/60) + ":" + Math.floor(deviceLife%3600%60));
			}
		},
		error: function () {

		}
	});
}

function createUser(fname) {
	$.ajax({
		url: "../BACKEND/php/profileManager.php?task=register&fname="+fname,
		type: 'GET',
		success: function (data) {
			var response = JSON.parse(data);
			alert(response.msg);
		},
		error: function () {

		}
	});
}


//call when lamp is turned off (op finished), to send data to backend
function saveCurentUser(fname) {
	window.localStorage.setItem("curentUser", JSON.stringify(curentUser));
	$.ajax({
		url: "../BACKEND/php/profileManager.php?task=update&fname="+fname+"&fdata="+JSON.stringify(curentUser),
		type: 'GET',
		success: function (data) {
			console.log("Settings says: " + JSON.parse(data).msg);
		},
		error: function () {

		}
	});	
}

function removeUser(fname) {
	var response = {};
	$.ajax({
		url: "../BACKEND/php/profileManager.php?task=remove&fname="+fname,
		type: 'GET',
		success: function (data) {
			response = JSON.parse(data);
		},
		error: function () {

		}
	});
}

function updateLifeTime(t) {
	$.ajax({
		url: "../BACKEND/php/time.php?task=set&ftime="+t,
		type: 'GET',
		success: function (data) {
			console.log(data);
		},
		error: function () {

		}
	});
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

				$(".usersList").append('<div><button class="btn btn-secondary btn-lg selectUserBtn" data-fname="' + profiles[i] + '">' + profiles[i] + '</button> <button class="btn btn-danger btn-lg removeUserBtn" data-fname="' + profiles[i] + '"> X </button></div>');
				
				$(".selectUserBtn").click(function () {
					changeUser($(this).attr("data-fname"));
					//location.reload();
				});

				$(".removeUserBtn").click(function () {
					removeUser($(this).attr("data-fname"));
					if ($(this).attr("data-fname") == curentUser.name) {
						curentUser = {};
						window.localStorage.setItem("curentUser", "{}");
					}
					alert("User " + $(this).attr("data-fname") + " has been deleted");
					location.reload();
				})

			}
		},
		error: function () {

		}
	});

	$(".addUserBtn").click(function () {
		var fname = prompt("Input profile name (no witespaces, all lowercase):");
		fname = fname.replace(/\s/g,'');
		fname = fname.toLowerCase();
		createUser(fname);
		location.reload();
	})
}

//load and display information of curent user
loadUserandDeviceInfo();

if (window.location.pathname.indexOf("index.html") != -1) {
	$('.yellowLightBtn').click(function () {
		if(!(mainLightSwitch)) {
			console.log("settings says: " + !mainLightSwitch);
			//kase upali lampa
			userTimer = setInterval(function () {
				userDuration += 1;
				curentUser.lastTime = userDuration;
				curentUser.totalTime += 1;
				deviceLife += 1;
				window.localStorage.setItem("curentUser", JSON.stringify(curentUser));
				window.localStorage.setItem("deviceLife", deviceLife);
				$(".opTimeDurationLbl").html(Math.floor(userDuration/3600) + ":" + Math.floor(userDuration%3600/60) + ":" + Math.floor(userDuration%3600%60))
			}, 1000);
		} else {
			console.log("settings says: " + !mainLightSwitch);
			clearInterval(userTimer);
			curentUser.lastToxicity = $(".fill").attr("data-percentage");
			saveCurentUser(curentUser.name);
			updateLifeTime(deviceLife);
		}
	})
}

if (window.location.pathname.indexOf("diagnostics.html") != -1) {
	$(".restartLife").click(function () {
		var da = prompt("to restart timer type in 'RESTART'");
		if (da == "RESTART") {
			updateLifeTime(0);
		} else {
			alert("counter will not be restarted");
		}
	})
}