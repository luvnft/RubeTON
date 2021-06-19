const db = new GoogleSpreadsheetsDb(
    'AIzaSyBdjsu_0mERhpzaz79MxeFzhcyqsiniImc',
    '1L3s7ikEgQf0Cq8xGflJz-C0bSAJya1AQVOGvXo-hjNc'
);

rows2 = {};

db.getAll('Меню!A1:L100', (err, rows) => {
    rows2 = rows;

    elHTML_poke = "";
    elHTML_bowl = "";
    elHTML_starter = "";
    elHTML_soup = "";
    elHTML_zavtrak = "";
    elHTML_smuzi = "";
    elHTML_napitok = "";

    rows.forEach(row => {
        if (!row.image) {
            row.image = "empty.jpg";
        }

        el = document.getElementById(row.category);

        switch (row.category) {
            case "ПОКЕ":
                elHTML_poke = elHTML_poke + generateHTML(row);
                el.innerHTML = elHTML_poke;
                break;

            case "БОУЛ":
                elHTML_bowl = elHTML_bowl + generateHTML(row);
                el.innerHTML = elHTML_bowl;
                break;

            case "СТАРТЕР":
                elHTML_starter = elHTML_starter + generateHTML(row);
                el.innerHTML = elHTML_starter;
                break;

            case "СУП":
                elHTML_soup = elHTML_soup + generateHTML(row);
                el.innerHTML = elHTML_soup;
                break;

            case "ЗАВТРАК":
                elHTML_zavtrak = elHTML_zavtrak + generateHTML(row);
                el.innerHTML = elHTML_zavtrak;
                break;

            case "СМУЗИ БОУЛ":
                elHTML_smuzi = elHTML_smuzi + generateHTML(row);
                el.innerHTML = elHTML_smuzi;
                break;

            case "НАПИТОК":
                elHTML_napitok = elHTML_napitok + generateHTML(row);
                el.innerHTML = elHTML_napitok;
                break;

            default:
                break;
        }
        runSwiper();
    });
})


generateHTML = function (row) {
    if (row.hide != "yes") {
        return `<div class="swiper-slide">
        <img src="img/food/`+ row.image + `" width="100%" class="rounded" onclick="showAlert(` + row.id + `)">
        <span class=""><b>`+ row.name + `</b></span><br>
        <span class="text-muted small">`+ row.output + ` гр</span>
        <br>
        <span class="badge bg-primary rounded-pill price-pill" onclick="showAlert(` + row.id + `, false)">`+ row.price + `</span>
        </div>`;
    } else {
        return "";
    }
}

showAlert = function (id, showMessage) {
    item = rows2[id - 1];
    img = "img/food/" + item.image;
    if (showMessage != false) {
        if (item.description) {

        } else {
            item.description = "";
        }
    
        Swal.fire({
            title: item.name,
            html: item.description + '<br><br><b>' + item.output + ' гр</b>',
            imageUrl: img,
            showCloseButton: true,
            confirmButtonText: item.price,
            confirmButtonColor: 'rgb(77, 89, 166)',
            imageAlt: 'Miska Bowls'
            // backdrop: `
            //     rgba(0,0,123,0.4)
            //     url("/gif/mew.gif")
            //     center top
            //     no-repeat
            //     `
        }).then((result) => {
            if (result.value) {
                addToCart(item);
            }
        })
    } else {
        addToCart(item);
    }

};

cart = [];

addToCart = function (item) {
    price = 0;
    cart.push(item);
    $("#totalOrder").html("");
    cart.forEach(element => {
        str = element.name + " – " + element.price + " ₽<br>"
        $("#totalOrder").append(str);
        price = price + parseInt(element.price);
    });
    $("#totalSum").html(price)
    if (price > 0) {
        $("#btnOrder").show();
        $("#cartClear").show();
    }
    animateCSS('#blockCart', 'pulse');
}

$("#cartClear").on("click", function () {
    cart = [];
    $("#totalSum").html("0");
    $("#totalOrder").html("В корзине пусто");
    $("#btnOrder").hide();
    $("#cartClear").hide();
    removeCustomBowl();
});

lastOption = 0;

$("#btnOrder").on("click", function () {

    $("#totalSum").html( parseInt($("#totalSum").html()) + 200 );

    Swal.fire({
        title: "Оформить заказ",
        confirmButtonText: 'Заказать',
        confirmButtonColor: 'rgb(77, 89, 166)',
        showCloseButton: true,
        html: `
        <div class="input-group flex-nowrap pt-2 pb-2">
            <input id="userName" type="text" class="form-control" placeholder="Ваше имя">
        </div>

        <div class="input-group flex-nowrap pb-2">
            <input id="phone" type="text" class="form-control" placeholder="Телефон">
        </div>
       
        <div class="btn-group btn-group-toggle pb-2" data-toggle="buttons">
        
            <label class="btn btn-secondary active">
                <input type="radio" name="options" onclick="deliveryMethod(1)" id="option1" checked> Доставка
            </label>

            <label class="btn btn-secondary">
                <input type="radio" name="options" onclick="deliveryMethod(2)" id="option2" > Самовывоз
            </label>
        </div>

        <div id="samovivoz" style="display: none" class="flex-nowrap pb-2">
            Шаумяна 90, можно подходить через 30 мин 
        </div>
        
        <div id="dostavka"  class="flex-nowrap">
            <textarea id="address" class="mb-2 form-control" placeholder="Адрес доставки"></textarea>
            Стоимость доставки 200₽ в пределах <a href="delivery.html" style="color: rgb(77, 89, 166);">зоны доставки</a>
            <br><br>
            Доставка осуществляется сервисом Яндекс GO
            
        </div>
        `
    }).then((result) => {

        userName = $("#userName").val();
        phone = $("#phone").val();
        address = "Самовывоз";
        if ( $("#address").val().length > 0 ) {
            address = $("#address").val();
        }

        if (phone.length > 5) {
            placeOrder($("#totalOrder").html(), $("#totalSum").html(), userName, phone, address, customBowl);
            Swal.fire({
                icon: 'success',
                title: 'Ваш заказ успешно оформлен',
                text: 'Открываем форму оплаты',
                showConfirmButton: false
            })
        } else if (result.isConfirmed) {
            Swal.fire({
                // icon: 'warning',
                title: 'Ой',
                text: 'Вы забыли указать телефон',
                confirmButtonColor: 'rgb(77, 89, 166)',
                confirmButtonText: 'Хорошо'
            })
        }

    });
});


deliveryMethod = function(id) {
    if (id == 1) {
        // console.log(1);
        $("#dostavka").show();
        $("#samovivoz").hide();
        if (lastOption != 1) {  //&& $("#option1").prop('checked') == true
            $("#totalSum").html( parseInt($("#totalSum").html()) + 200 );
        }
        lastOption = id;
    }

    if (id == 2) {
        // console.log(2);
        $("#dostavka").hide();
        $("#samovivoz").show();
        if (lastOption != 2) { //&& $("#option2").prop('checked') == true
            $("#totalSum").html( parseInt($("#totalSum").html()) - 200 );
        }
        lastOption = id;
    }
}


placeOrder = function (order, sum, userName, phone, address, customBowl) {

    customBowlTxt = "";
    if (customBowl) {
        customBowlTxt = "Свой боул:<br>" + customBowl +"<br><br>";
    }

    jQuery.ajax({
        type: "POST",
        url: "https://hook.integromat.com/d9pqvw3awypa7v8mvfby5k3w59s6rv45",
        data: {
            'message': {
                'from_email': 'robot@miskabowls.ru',
                'from_name': 'Miska Orders',
                'to': [{
                    'email': "orders@miskabowls.ru",
                    'name': "",
                    'type': 'to'
                }],
                'autotext': 'true',
                'subject': "Новый заказ",
                'html': "Заказ:<br>" + order + "<br>Итого: " + sum + " ₽<br><br>" + customBowlTxt + "Имя: "+ userName +"<br>Телефон: " + phone + "<br>Адрес доставки: " + address
            }
        }
    }).done(function (response) {
        removeCustomBowl();
        
        // window.location.href = "/success.html";
        $("#payFormDesc").val(userName + " " + phone);
        $("#payFormVal").val(sum);
        $( "#payForm" ).submit();
    }).fail(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'Ой',
            text: 'Произошла ошибка при попытке отправить уведомление на orders@miskabowls.ru, пожалуйста, сообщите об этом администрации сайта',
            confirmButtonText: 'Ок'
        })
        console.log(error);
    });
}


i = 0;
function runSwiper() {
    i++;
    if (i > 40) {
        const swiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: false,
            slidesPerView: "2.5",
            spaceBetween: 10,
            grabCursor: true,
        });
    }
}

customBowl = false;

if ( customBowlCheck() ) {

    array = customBowlCheck()
    
    item = {
        id: "",
        name: "свой боул",
        category: "",
        image: "",
        price: array.split("|")[0],
        output: "",
        description: array.split("|")[1]
    }

    addToCart(item);
    customBowl = item.description;
}



