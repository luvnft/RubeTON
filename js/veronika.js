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

            case "БОУЛЫ":
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

            default:
                break;
        }
        runSwiper();
    });
})


generateHTML = function (row) {
    return `<div class="swiper-slide">
    <img src="img/food/`+ row.image + `" width="100%" class="rounded" onclick="showAlert(` + row.id + `)">
    <span class="dishTitle">`+ row.name + `</span><br>
    <span class="badge bg-primary">`+ row.price + `₽</span>
    </div>`;
}

showAlert = function (id) {
    item = rows2[id - 1];
    img = "img/food/" + item.image;
    Swal.fire({
        title: item.name,
        html:
            '<b>' + item.output + 'г.</b>, ' +
            item.description,
        imageUrl: img,
        confirmButtonText: item.price + " ₽ +",
        imageAlt: 'Custom image',
        backdrop: `
            rgba(0,0,123,0.4)
            url("/gif/mew.gif")
            center top
            no-repeat
            `
    }).then((result) => {
        if (result.value) {
            addToCart(item);
        }
    })

};

cart = [];

addToCart = function (item) {
    price = 0;
    cart.push(item);
    $("#totalOrder").html("");
    cart.forEach(element => {
        str = element.name + " – " + element.price + "₽<br>"
        $("#totalOrder").append(str);
        price = price + parseInt(element.price);
    });
    $("#totalSum").html(price)
    if (price > 0) {
        $("#btnOrder").show();
        $("#cartClear").show();
    }
}

$("#cartClear").on("click", function () {
    cart = [];
    $("#totalSum").html("0");
    $("#totalOrder").html("В корзине пусто");
    $("#btnOrder").hide();
    $("#cartClear").hide();
});

$("#btnOrder").on("click", function () {

    Swal.fire({
        title: "Ваш заказ",
        confirmButtonText: 'Готово',
        html: $("#totalOrder").html() + "<br><br>Стоимость – " + $("#totalSum").html() + "₽<br><br>" +
            `
        <div class="input-group flex-nowrap">
            <input id="phone" type="text" class="form-control" placeholder="Ваш телефон" aria-label="Phone" aria-describedby="addon-wrapping">
        </div>
        <br>
        <div class="input-group flex-nowrap">
            <textarea id="address" class="form-control" placeholder="Адрес доставки" aria-label="Address" aria-describedby="addon-wrapping"></textarea>
        </div>
        `
    }).then((result) => {

        phone = $("#phone").val();
        address = $("#address").val();

        if (phone.length > 2 && address.length > 2) {
            placeOrder($("#totalOrder").html(), $("#totalSum").html(), phone, address);
            Swal.fire({
                icon: 'success',
                title: 'Супер',
                text: 'Ваш заказ усшешно оформлен',
                confirmButtonText: 'Ок, жду 😋'
            })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Ой',
                text: 'Укажите телефон и адрес доставки',
                confirmButtonText: 'Ок'
            })
        }
    });
});

placeOrder = function (order, sum, phone, address) {
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
                'html': "Новый заказ:<br>" + order + " На сумму: " + sum + "₽<br><br>Телефон: " + phone + "<br>Адрес доставки: " + address
            }
        }
    }).done(function (response) {
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
        });
    }
}