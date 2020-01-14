if (window.location.pathname.indexOf("index.html") != -1) {
	$.ajax({
		url: "../BACKEND/php/lightFeedback.php?task=checkLight",
		type: 'GET',
		async: false,
		success: function (data) {
			var s = data;
			s = s.split(",");
			if (s[0] == 1 && s[1] == 1 && s[2] == 1 && s[3] == 1 && s[4] == 1) {
				console.log("feedback says: all working");
			} else {
				console.log("feedback says: device not ready lamp not functioning properly");
				location = "diagnostics.html";
			}
		},
		error: function () {

		}
	});
} else if (window.location.pathname.indexOf("diagnostics.html") != -1) {
	$.ajax({
		url: "../BACKEND/php/lightFeedback.php?task=checkLight",
		type: 'GET',
		async: false,
		success: function (data) {
			var s = data;
			s = s.split(",");
			if (s[0] == 1 && s[1] == 1 && s[2] == 1 && s[3] == 1 && s[4] == 1) {
				$(".lightDiag").html("feedback says: all working");
			} else {
				$(".lightDiag").html("feedback says: device not ready lamp not functioning properly");
			}
			//lightStatusColor
			for (var i = s.length - 1; i >= 0; i--) {
				var lbl = "#lightStatusColor"+(i+1);
				console.log(lbl);
				s[i] == 0 ? $(lbl).addClass("led-red") : $(lbl).addClass("led-green");
				s[i] == 0 ? $(".lightStatusLbl").eq(i).html("BROKEN") : $(".lightStatusLbl").eq(i).html("OK")
			}
		},
		error: function () {

		}
	});
}