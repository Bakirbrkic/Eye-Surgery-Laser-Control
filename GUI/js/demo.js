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

function yellowLightBtn() {
  if (!$('.yellowLightBtn').hasClass("active")) {
    var html = $('.mainLightValueLbl').html()
    add = 0
    add += (parseInt(html) / 10) //100 => 10, 5 => 0.5 
    add = Math.round(add); // preko .5 zaokruzi na broj vise...5.5 => 6 / 5.2 => 5
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
    console.log("add"+add)
    /* var a =  */
    setInterval(function () {
      $(function () {
        console.log("interval" + interval)
        var p = $("#bar1 .fill").attr("data-percentage");
        p = parseInt(p)
        p = p + add;
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


      });
      //$('#bar1').barfiller();
    }, interval);
  } else {
    add = 0
  }
}




yellowLightBtn()

$('.yellowLightBtn').click(function () {
  yellowLightBtn()
})

$('#myRange').change(function () {
  yellowLightBtn()
})