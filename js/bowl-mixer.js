

    
    // buttonClicked = function (x) {
      
      
        
    //     // $("#button-1").removeClass("animate__animated animate__zoomInUp");
    //     // $("#button-1").addClass("animate__animated animate__bounceOutUp");

    //     // animateCSS('#button1', 'bounce');
        

    //     // $("#button-2").removeClass("animate__animated animate__zoomInUp");
    //     // $("#button-2").addClass("animate__animated animate__fadeOut");

    //     // $("#button-3").removeClass("animate__animated animate__zoomInUp");
    //     // $("#button-3").addClass("animate__animated animate__fadeOut");

      

    //   // document.getElementById("button1").innerHTML = "Мясо";

    // //   document.getElementById("title").innerHTML = "Выберите протеин:";
    //   // document.getElementById("button1").innerHTML = "Мясо";
    //   // document.getElementById("button2").innerHTML = "Рыба";
    // //   document.getElementById("desc").innerHTML = "Шаг 2 из 4";

    //   showBlock(2);

    // }


    showBlock = function (x) {
        $("#block-1").hide();
        $("#block-2").hide();
        $("#block-3").hide();
        $("#block-4").hide();

        $("#block-"+x).show();
    }

      

//   showBlock(2);