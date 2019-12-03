var mainLightSwitch = 0, blueLightSwitch = 0;

var amount;

function setup() {
	$.ajax({
   		url:"../BACKEND/php/lightIntensityAPI.php?task=checkConnection",
   		type: 'GET',
   		success: function (data) {
   			console.log(data);
   		},
   		error: function () {
   			
   		}
   	});
	$.ajax({
   		url:"../BACKEND/php/lightIntensityAPI.php?task=setup",
   		type: 'GET',
   		success: function (data) {
   			console.log(data);
   		},
   		error: function () {
   			
   		}
   	});
}

setup();

function switchBlue(power) {
	$.ajax({
   		url:"../BACKEND/php/lightIntensityAPI.php?task=blue&power="+power,
   		type: 'GET',
   		success: function (data) {
   			console.log(data);
   		},
   		error: function () {
   			
   		}
   	});
}




$(".mainLightSlider").change(function () {
    $(".mainLightValueLbl").html($(".mainLightSlider").val() + "%");
    if (mainLightSwitch) {
    	$.ajax({
	   		url:"../BACKEND/php/lightIntensityAPI.php?task=dim&amount=" + $(".mainLightSlider").val(),
	   		type: 'GET',
	   		success: function (data) {
	   			console.log(data);
	   		},
	   		error: function () {
	   			
	   		}
   		});
    }
});

$(".controlBtns > .btn").click(function () {
   	if ($(this).hasClass("active")){
       	$(this).removeClass("active");
       	if ($(this).hasClass("yellowLightBtn")) {
       		mainLightSwitch = 1;
          $.ajax({
            url:"../BACKEND/php/lightIntensityAPI.php?task=dim&amount=" + $(".mainLightSlider").val(),
            type: 'GET',
            success: function (data) {
              console.log(data);
            },
            error: function () {     
            }
          });
       	} else {
       		blueLightSwitch = 1;
       		switchBlue(blueLightSwitch);
       	}
   	}else {
       	$(this).addClass("active");
       	if ($(this).hasClass("yellowLightBtn")) {
       		mainLightSwitch = 0;
            $.ajax({
              url:"../BACKEND/php/lightIntensityAPI.php?task=dim&amount=0",
              type: 'GET',
              success: function (data) {
                console.log(data);
              },
              error: function () {              }
            });
       	} else {
       		blueLightSwitch = 0;
       		switchBlue(blueLightSwitch);
       	}
   	}
   	console.log("ml: " + mainLightSwitch);
   	console.log("bl: " + blueLightSwitch);
});

var a = setInterval(function(){
  $(function(){
    var p = $("#bar1 .fill").attr("data-percentage");
    p = parseInt(p);
    p=p+1;
    $("#bar1 .fill").attr("data-percentage", p);
             // $("#bar1 .fill").attr("data-percentage","")
           if(p>0 && p<50){
                $('#bar1').barfiller({
                  // color of bar
                  barColor: '#16b597',
                  // shows a tooltip
                  tooltip: true,
                  // duration in ms
                  duration: 1000,
                  // re-animate on resize
                  animateOnResize: true,
                  // custom symbol
                  symbol: "%"
                });
              }
              if(p>=50 && p<75){
                $('#bar1').barfiller({
                  // color of bar
                  barColor: '#ffb700',
                  // shows a tooltip
                  tooltip: true,
                  // duration in ms
                  duration: 1000,
                  // re-animate on resize
                  animateOnResize: true,
                  // custom symbol
                  symbol: "%"
                });
              }
              if(p>=75 && p<=100){
                $('#bar1').barfiller({
                  // color of bar
                  barColor: '#d3191c',
                  // shows a tooltip
                  tooltip: true,
                  // duration in ms
                  duration: 1000,
                  // re-animate on resize
                  animateOnResize: true,
                  // custom symbol
                  symbol: "%"
                });
              }


            });
            //$('#bar1').barfiller();
},1000);
