$(".mainLightSlider").change(function () {
    $(".mainLightValueLbl").html($(".mainLightSlider").val() + "%");
});

$(".controlBtns > .btn").click(function () {
   if ($(this).hasClass("active")){
       $(this).removeClass("active");
   }else {
       $(this).addClass("active");
   }
});