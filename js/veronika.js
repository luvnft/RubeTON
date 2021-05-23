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
    return `<div class="swiper-slide">
    <img src="img/food/`+ row.image + `" width="100%" class="rounded" onclick="showAlert(` + row.id + `)">
    <span class=""><b>`+ row.name + `</b></span><br>
    <span class="text-muted small">`+ row.output + ` гр</span>
    <br>
    <span class="badge bg-primary rounded-pill price-pill" onclick="showAlert(` + row.id + `, false)">`+ row.price + `</span>
    </div>`;
}

showAlert = function (id, showMessage) {
    item = rows2[id - 1];
    img = "img/food/" + item.image;
    if (showMessage != false) {

    
        Swal.fire({
            title: item.name,
            html:
            item.description + '<br><br><b>' + item.output + ' гр</b>',
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

$("#btnOrder").on("click", function () {

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

        <div class="input-group flex-nowrap pb-2">
            <textarea id="address" class="form-control" placeholder="Адрес доставки"></textarea>
        </div>
        <div class="btn-group btn-group-toggle pb-2" data-toggle="buttons">
            <label class="btn btn-secondary active">
                <input type="radio" name="options" id="option1" autocomplete="off" checked> Доставка
            </label>
            <label class="btn btn-secondary">
                <input type="radio" name="options" id="option2" autocomplete="off"> Самовывоз
            </label>    
        </div>
        `+
        "<br>Итого – " + $("#totalSum").html() + " ₽"
        
    }).then((result) => {

        userName = $("#userName").val();
        phone = $("#phone").val();
        address = $("#address").val();

        if (phone.length > 5) {
            placeOrder($("#totalOrder").html(), $("#totalSum").html(), userName, phone, address, customBowl);
            Swal.fire({
                icon: 'success',
                title: 'Супер',
                text: 'Ваш заказ усшешно оформлен',
                confirmButtonColor: 'rgb(77, 89, 166)',
                confirmButtonText: 'Ок, жду'
            })
        } else if (result.isConfirmed) {
            Swal.fire({
                icon: 'warning',
                title: 'Ой',
                text: 'Вы забыли указать телефон',
                confirmButtonColor: 'rgb(77, 89, 166)',
                confirmButtonText: 'Хорошо'
            })
        }
    });
});

placeOrder = function (order, sum, userName, phone, address, customBowl) {
    jQuery.ajax({
        type: "POST",
        url: "https://hook.integromat.com/d9pqvw3awypa7v8mvfby5k3w59s6rv45",
        data: {
            'message': {
                'from_email': 'robot@miskabowls.ru',
                'from_name': 'Miska Orders',
                'to': [{
                    // 'email': "rybik@yandex.ru",
                    'email': "orders@miskabowls.ru",
                    'name': "",
                    'type': 'to'
                }],
                'autotext': 'true',
                'subject': "Новый заказ",
                'html': "Новый заказ:<br>" + order + "<br>На сумму: " + sum + " ₽<br><br>"+ "Свой боул #1:<br>" + customBowl + "<br><br>Имя: "+ userName +"<br>Телефон: " + phone + "<br>Адрес доставки: " + address
            }
        }
    }).done(function (response) {
        removeCustomBowl();
        window.location.href = "/success.html";
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
        name: "Свой Боул #1",
        category: "",
        image: "",
        price: array.split("|")[0],
        output: "",
        description: array.split("|")[1]
    }

    addToCart(item);
    customBowl = item.description;
}



