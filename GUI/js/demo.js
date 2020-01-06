var mainLightSwitch = 0,
  blueLightSwitch = 0;

var amount;

function setup() {
  $.ajax({
    url: "../BACKEND/php/lightIntensityAPI.php?task=checkConnection",
    type: 'GET',
    success: function (data) {
      console.log(data);
    },
    error: function () {

    }
  });
  $.ajax({
    url: "../BACKEND/php/lightIntensityAPI.php?task=setup",
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
    url: "../BACKEND/php/lightIntensityAPI.php?task=blue&power=" + power,
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
      url: "../BACKEND/php/lightIntensityAPI.php?task=dim&amount=" + $(".mainLightSlider").val(),
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
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    if ($(this).hasClass("yellowLightBtn")) {
      mainLightSwitch = 1;
      $.ajax({
        url: "../BACKEND/php/lightIntensityAPI.php?task=dim&amount=" + $(".mainLightSlider").val(),
        type: 'GET',
        success: function (data) {
          console.log(data);
        },
        error: function () {}
      });
    } else {
      blueLightSwitch = 1;
      switchBlue(blueLightSwitch);
    }
  } else {
    $(this).addClass("active");
    if ($(this).hasClass("yellowLightBtn")) {
      mainLightSwitch = 0;
      $.ajax({
        url: "../BACKEND/php/lightIntensityAPI.php?task=dim&amount=0",
        type: 'GET',
        success: function (data) {
          console.log(data);
        },
        error: function () {}
      });
    } else {
      blueLightSwitch = 0;
      switchBlue(blueLightSwitch);
    }
  }
  console.log("ml: " + mainLightSwitch);
  console.log("bl: " + blueLightSwitch);
});

var add = 0;
var interval = 0

var a

function intervalTimer() {
  a = setInterval(function () {
    /* $(function () { */
    console.log(interval)
    var p = $("#bar1 .fill").attr("data-percentage");
    p = parseInt(p)
     p = p + 1;

    $("#bar1 .fill").attr("data-percentage", p);
    // $("#bar1 .fill").attr("data-percentage","")
    if (p > 0 && p < 50) {
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
    if (p >= 50 && p < 75) {
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
    if (p >= 75 && p <= 100) {
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
  }, interval);
}

function yellowLightBtn() {
  clearInterval(a);
  if (!$('.yellowLightBtn').hasClass("active")) {
    clearInterval(a);
    var html = $('.mainLightValueLbl').html()
    add = 0
    interval = 0
    clearInterval(a);
    console.log("na pocetku add " + add)
    add += (parseInt(html) / 10)
    add = Math.round(add)
    console.log("poslije add " + add)
    if (add == 1) {
      interval = 10000
    } else if (add == 2) {
      interval = 9000
    } else if (add == 3) {
      interval = 8000
    } else if (add == 4) {
      interval = 7000
    } else if (add == 5) {
      interval = 6000
    } else if (add == 6) {
      interval = 5000
    } else if (add == 7) {
      interval = 4000
    } else if (add == 8) {
      interval = 3000
    } else if (add == 9) {
      interval = 2000
    } else if (add == 10) {
      interval = 1000
    }
    console.log(add)
    if (interval != 0) {
      intervalTimer()
    }

  } else {
    add = 0
  }
}


yellowLightBtn()

$('.yellowLightBtn').click(function () {
  clearInterval(a);
  if(!(blueLightSwitch)) {
    console.log("stiglo")
  yellowLightBtn()
  }
  else
    blueLightBtn()
})

$('#myRange').change(function () {
  clearInterval(a);
  if(!(blueLightSwitch)) {
    yellowLightBtn()
  }
  else
    blueLightBtn()
})


function blueLightBtn() {
  clearInterval(a);
  if (blueLightSwitch) {
    //clearInterval(a);
    //var html = $('.mainLightValueLbl').html()
    //add = 20
    interval = 0
    clearInterval(a);
    interval=500;
    if (interval != 0) {
      intervalTimer()
    }
  } 
}


blueLightBtn()

$('.blueLightBtn').click(function () {
  clearInterval(a);
  blueLightBtn();
  if(!(blueLightSwitch)) {
   yellowLightBtn(); 
  }
})

