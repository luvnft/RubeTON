// $('.menu-item').click(function(){


//     switch ($(this).data("page")) {
//         case "index":
//             $("#constructor").show();
//             $("#menu-block").hide();
//             $("#bron-block").hide();
//             $("#contacts-block").hide();
            
//             $("#index").addClass('bg-danger');
//             $("#menu").removeClass('bg-danger');
//             $("#bron").removeClass('bg-danger');
//             $("#contacts").removeClass('bg-danger');

//             refresh();
//             break;

//         case "menu":
//             $("#constructor").hide();
//             $("#menu-block").show();
//             $("#bron-block").hide();
//             $("#contacts-block").hide()
            
//             $("#index").removeClass('bg-danger');
//             $("#menu").addClass('bg-danger');
//             $("#bron").removeClass('bg-danger');
//             $("#contacts").removeClass('bg-danger');
//             break;

//         case "bron":
//             $("#constructor").hide();
//             $("#menu-block").hide();
//             $("#bron-block").show();
//             $("#contacts-block").hide()
            
//             $("#index").removeClass('bg-danger');
//             $("#menu").removeClass('bg-danger');
//             $("#bron").addClass('bg-danger');
//             $("#contacts").removeClass('bg-danger');
//             break;

//         case "contacts":
//             $("#constructor").hide();
//             $("#menu-block").hide();
//             $("#bron-block").hide();
//             $("#contacts-block").show()
            
//             $("#index").removeClass('bg-danger');
//             $("#menu").removeClass('bg-danger');
//             $("#bron").removeClass('bg-danger');
//             $("#contacts").addClass('bg-danger');
//             break;
    
//         default:
//             break;
//     } 
// })


    currentBlock = 1;
    bowl = [];
    bowlToppings = [];
    bowlSauce = [];
    bowlPosipka = [];
    bowlDesc = "";
    bowlPrice = 0;
    

    $('.topping').click(function(){
        $(this).toggleClass('active');
    })

    $('.sauce').click(function(){
        $(this).toggleClass('active');
    })

    $('.posipka').click(function(){
        $(this).toggleClass('active');
    })

    

    addItem = function (item, price)  {
        
        if (bowl.length < 1) {
            $("#block1-choose").html(item);
        }

        bowl.push(item);
        bowlPrice = bowlPrice + price;
     
        updateBowl();
        nextBlock();
    }

    
    addTopping = function (item, price) {

        if ( jQuery.inArray(item, bowlToppings) == -1 ) {
            bowlToppings.push(item);
            bowlPrice = bowlPrice + price;
        } else {
            bowlToppings.splice(jQuery.inArray(item, bowlToppings), 1)
            bowlPrice = bowlPrice - price
        }
        
        bowl[2] = bowlToppings;
        updateBowl();

    }


    addSauce = function (item, price) {

        if ( jQuery.inArray(item, bowlSauce) == -1 ) {
            bowlSauce.push(item);
            bowlPrice = bowlPrice + price;
        } else {
            bowlSauce.splice(jQuery.inArray(item, bowlSauce), 1)
            bowlPrice = bowlPrice - price
        }
        
        bowl[3] = bowlSauce;
        updateBowl();

    }

    addPosipka = function (item, price) {

        if ( jQuery.inArray(item, bowlPosipka) == -1 ) {
            bowlPosipka.push(item);
            bowlPrice = bowlPrice + price;
        } else {
            bowlPosipka.splice(jQuery.inArray(item, bowlPosipka), 1)
            bowlPrice = bowlPrice - price
        }
        
        bowl[4] = bowlPosipka;

        if (!bowl[3]) {
            bowl[3] = ['Нет']
        }
        updateBowl();

    }


    

    updateBowl = function() {
        $("#totalSum").html(bowlPrice);

        if (bowl.length == 1) {
            bowlDesc = "Основа: " + bowl[0];
        }

        if (bowl.length == 2) {
            bowlDesc = "Основа: " + bowl[0] + "<br>" + "Протеин: " + bowl[1]
        }

        if (bowl.length == 3) {
            bowlDesc = "Основа: " + bowl[0] + "<br>" + "Протеин: " + bowl[1] + "<br>" + "Топпинги: " + bowl[2].join(", ");
        }

        if (bowl.length == 4) {
            bowlDesc = "Основа: " + bowl[0] + "<br>" + "Протеин: " + bowl[1] + "<br>" + "Топпинги: " + bowl[2].join(", ") + "<br>" + "Соусы: " + bowl[3].join(", ");
        }

        if (bowl.length == 5) {
            bowlDesc = "Основа: " + bowl[0] + "<br>" + "Протеин: " + bowl[1] + "<br>" + "Топпинги: " + bowl[2].join(", ") + "<br>" + "Соусы: " + bowl[3].join(", ") + "<br>" + "Посыпка: " + bowl[4].join(", ");
        }

        $("#totalOrder").html(bowlDesc);
    }

    toppingsFinished = function() {
        if (bowlToppings.length !=0) {
            nextBlock();
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Нужно добавить топпинги',
                text: 'Добавьте хотя бы один топпинг',
                confirmButtonText: 'Хорошо'
              })   
        }
    };

    order = function() {
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Ваш заказ',
        //     html: bowlDesc,
        //     confirmButtonText: 'Отправить'
        //   })   


          Swal.fire({
            title: "Ваш заказ",
            html: bowlDesc + "<br><br>Стоимость – "+bowlPrice+"₽<br><br>Укажите телефон:",
            input: 'text',
            showCancelButton: true        
        }).then((result) => {
            if (result.value) {
                // console.log("Result: " + result.value);

                Swal.fire({
                    title: "Адрес доставки",
                    text: "Куда доставить заказ?",
                    input: 'text',
                    confirmButtonText: 'Готово'
                }).then((result) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Супер',
                        text: 'Заказ усшешно оформлен, мы начали готовить',
                        confirmButtonText: 'Ок, жду 😋'
                      })
                })
            }
        });


    }
    
    nextBlock = function() {
        currentBlock = currentBlock + 1;
        showBlock(currentBlock);
    }

    showBlock = function (x) {
        $("#block-1").hide();
        $("#block-2").hide();
        $("#block-3").hide();
        $("#block-4").hide();

        $("#block-"+x).show();
        //TODO добавить запись в адресную строку 

        $('body,html').animate({
            scrollTop: 200
        }, 400);
    }


    refresh = function() {
        currentBlock = 1;
        bowl = [];
        bowlToppings = [];
        bowlSauce = [];
        bowlPosipka = [];
        bowlDesc = "Выберите основу и ингредиенты для приготовления боула";
        bowlPrice = 0;

        $(".active").removeClass("active");
                
        updateBowl();
        showBlock(1);
    }

    
//  showBlock(4);   
    
      

