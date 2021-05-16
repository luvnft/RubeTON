currentBlock = 1;
bowl = [];
bowlToppings = [];
bowlSauce = [];
bowlExtra = [];
bowlDesc = "";
bowlPrice = 0;

$('.topping').click(function(){
    $(this).toggleClass('active');
})

$('.sauce').click(function(){
    $(this).toggleClass('active');
})

$('.extra').click(function(){
    $(this).toggleClass('active');
})

addItem = function (item, price)  {

    $("#cartClear").show();
    
    if (bowl.length < 1) {
        $("#block1-choose").html(item);
    }

    if (currentBlock == 2) {
        Swal.fire({
            title: 'Удвоить протеин?',
            icon: 'info',
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: `Да`,
            cancelButtonText: `Нет`,
        }).then((result) => {
            if (result.isConfirmed) {
                item = item + " X2";
                bowl.push(item);
                bowlPrice = bowlPrice + price;
                bowlPrice = bowlPrice + price;
                updateBowl();
                nextBlock();
            } else {
                bowl.push(item);
                bowlPrice = bowlPrice + price;
                updateBowl();
                nextBlock();
            }
        })
    } else {
        bowl.push(item);
        bowlPrice = bowlPrice + price;
        updateBowl();
        nextBlock();
    }

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

addExtra = function (item, price) {
    if ( jQuery.inArray(item, bowlExtra) == -1 ) {
        bowlExtra.push(item);
        bowlPrice = bowlPrice + price;
    } else {
        bowlExtra.splice(jQuery.inArray(item, bowlExtra), 1)
        bowlPrice = bowlPrice - price
    }
    
    bowl[4] = bowlExtra;

    if (!bowl[3]) {
        bowl[3] = ['Нет']
    }
    updateBowl();
}

$("#btnOrder").click(function(){
    order();
})

$("#btnNext").click(function(){
    toppingsFinished();
    $("#btnNext").hide();
})

updateBowl = function() {
    $("#totalSum").html(bowlPrice);

    if (bowlPrice > 0 && bowl.length >2) {

        if (bowl.length == 3) {
            $("#btnOrder").hide();
            $("#btnNext").show();
        }

        if (bowl.length >= 4) {
            $("#btnOrder").show();
        }
        
    }

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
        bowlDesc = "Основа: " + bowl[0] + "<br>" + "Протеин: " + bowl[1] + "<br>" + "Топпинги: " + bowl[2].join(", ") + "<br>" + "Соусы: " + bowl[3].join(", ") + "<br>" + "Экстра: " + bowl[4].join(", ");
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

    // $('body,html').animate({
    //     scrollTop: 0
    // }, 400);
}


refresh = function() {
    currentBlock = 1;
    bowl = [];
    bowlToppings = [];
    bowlSauce = [];
    bowlExtra = [];
    bowlDesc = "Выберите основу и ингредиенты для приготовления боула";
    bowlPrice = 0;

    $(".active").removeClass("active");
            
    updateBowl();
    showBlock(1);

    $("#cartClear").hide();
    $("#btnOrder").hide();
    $("#btnNext").hide();
}



$("#cartClear").on("click", function () {
    refresh();
});

//  showBlock(4);   

    

