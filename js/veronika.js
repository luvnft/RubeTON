const db = new GoogleSpreadsheetsDb(
    'AIzaSyBdjsu_0mERhpzaz79MxeFzhcyqsiniImc',
    '1L3s7ikEgQf0Cq8xGflJz-C0bSAJya1AQVOGvXo-hjNc'
);

rows2 = {};

db.getAll('New Menu!A1:L100', (err, rows) => {
    rows2 = rows;

    elHTML_poke = "";
    elHTML_bowl = "";
    elHTML_starter = "";
    elHTML_noritako = "";
    elHTML_soup = "";
    elHTML_zavtrak = "";
    elHTML_smuzi = "";
    elHTML_napitok = "";
    elHTML_asai = "";
    elHTML_desert = "";

    rows.forEach(row => {
        if (!row.image) {
            row.image = "empty.jpg";
        }

        el = document.getElementById(row.category);

        switch (row.category) {
            case "Asian Noodles":
                elHTML_poke = elHTML_poke + generateHTML(row);
                el.innerHTML = elHTML_poke;
                break;

            case "RubeTON PAY":
                elHTML_bowl = elHTML_bowl + generateHTML(row);
                el.innerHTML = elHTML_bowl;
                break;

            // case "RubeTON Future Box":
            //     elHTML_starter = elHTML_starter + generateHTML(row);
            //     el.innerHTML = elHTML_starter;
            //     break;

            case "Rubeton Exchange":
                elHTML_noritako = elHTML_noritako + generateHTML(row);
                el.innerHTML = elHTML_noritako;
                break;

            case "Chips":
                elHTML_soup = elHTML_soup + generateHTML(row);
                el.innerHTML = elHTML_soup;
                break;

            case "Vitamins":
                elHTML_zavtrak = elHTML_zavtrak + generateHTML(row);
                el.innerHTML = elHTML_zavtrak;
                break;

            case "Chat Access":
                elHTML_smuzi = elHTML_smuzi + generateHTML(row);
                el.innerHTML = elHTML_smuzi;
                break;

            case "TON MEMES":
                elHTML_napitok = elHTML_napitok + generateHTML(row);
                el.innerHTML = elHTML_napitok;
                break;

            case "Consultations":
                elHTML_asai = elHTML_asai + generateHTML(row);
                el.innerHTML = elHTML_asai;
                break;

            case "Seminars":
                elHTML_desert = elHTML_desert + generateHTML(row);
                el.innerHTML = elHTML_desert;
                break;

            default:
                break;
        }
        runSwiper();
    });
})


generateHTML = function (row) {
    units = "";
    // if (row.category == "НАПИТОК") {
    //     units = "мл";
    // }
    if (row.hide != "yes") {
        return `<div class="swiper-slide">
        <img src="img/food/`+ row.image + `" width="100%" class="rounded" onclick="showAlert(` + row.id + `)">
        <span class=""><b>`+ row.name + `</b></span><br>
        <span class="text-muted small">`+ row.output + ` ${units}</span>
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
        // console.log(item.description);
        Swal.fire({
            title: item.name,
            html: '<text style="white-space: pre-line;">'+item.description+'</text>' + '<br><br><b>' + item.output + ' </b>',
            imageUrl: img,
            showCloseButton: true,
            confirmButtonText: item.price,
            confirmButtonColor: 'rgb(77, 89, 166)',
            imageAlt: 'RubeTON'
        }).then((result) => {
            if (result.value) {
                addToCart(item);
            }
        })
    } else {
        addToCart(item);
    }

};

deliveryOption = 0;
cart = [];

addToCart = function (item, roboAdd) {
    
    price = 0;
    cart.push(item);
    $("#totalOrder").html("");
    cart.forEach(element => {
        str = element.name + " – " + element.price + "<br>"
        $("#totalOrder").append(str);
        price = price + parseInt(element.price);
    });
    if (deliveryOption == 1 && price < 20) {
            price = price + 5;
        }
    $("#totalSum").html(price)
    if (price > 0) {
        $("#btnOrder").show();
        $("#cartClear").show();
    }

    if (!roboAdd) {
        menuAdd(item);
        ym(96980244,'reachGoal','add-item');
        animateCSS('#blockCart', 'pulse');
    }
    

}

$("#cartClear").on("click", function () {
    cart = [];
    $("#totalSum").html("0");
    $("#totalOrder").html("Empty cart");
    $("#btnOrder").hide();
    $("#cartClear").hide();
    removeCustomBowls();
    removeMenu();
});

btnOrderName = "#btnOrder";
if (error) {
    btnOrderName = "#btnOrder-none";
}

$(btnOrderName).on("click", function () {

    if (deliveryOption == 0) {
        if (price < 20) {        
           $("#totalSum").html( parseInt($("#totalSum").html()) + 5 );
        }
        deliveryOption = 1;
    }

    if (deliveryOption == 1) {
        option1 = "checked";
        option2 = "";
    }

    if (deliveryOption == 2) {
        option1 = "";
        option2 = "checked";
    }
    // log in with telegram
    Swal.fire({
        title: "Order",
        confirmButtonText: 'Purchase',
        confirmButtonColor: 'rgb(77, 89, 166)',
        showCloseButton: true,
        html: `
        <div class="input-group flex-nowrap pt-2 pb-2">
            <input id="userName" type="text" class="form-control" placeholder="Your Name">
        </div>

        <div class="input-group flex-nowrap pb-2">
            <input id="phone" type="text" class="form-control" placeholder="E-mail">
        </div>
       
        <div class="btn-group btn-group-toggle pb-2" data-toggle="buttons">
        
            <label class="btn btn-secondary active">
                <input type="radio" name="options" onclick="deliveryMethod(1)" id="option1" ${option1}> EMS Delivery
            </label>

            <label class="btn btn-secondary">
                <input type="radio" name="options" onclick="deliveryMethod(2)" id="option2" ${option2}> No Delivery
            </label>
        </div>

        <div id="samovivoz" style="display: none" class="flex-nowrap pb-2">
            No Delivery
        </div>
        
        <div id="dostavka"  class="flex-nowrap">
            <textarea id="address" class="mb-2 form-control" placeholder="Your Address"></textarea>
            Delivery cost is 5 rubeton inside the <a href="delivery.html" style="color: rgb(77, 89, 166);">delivery zone</a>. Delivery is free on orders more than 20 Rubeton
            <br><br>
            Delivery is made by EMS Post First Class with tracking
            
        </div>
        `
    }).then((result) => {

        userName = $("#userName").val();
        phone = $("#phone").val();
        address = "No Delivery";
        if ( $("#address").val().length > 0 ) {
            address = $("#address").val();
        }

        if (phone.length > 5) {
            placeOrder( $("#totalOrder").html(), $("#totalSum").html(), userName, phone, address );
            ym(96980244,'reachGoal','order');
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Success',
            //     text: 'Opening TON-wallet', //usd tonconnect 
            // })
        } else if (result.isConfirmed) {
            Swal.fire({
                // icon: 'warning',
                title: 'Oop',
                text: 'Provide your E-mail',
                confirmButtonColor: 'rgb(77, 89, 166)',
                confirmButtonText: 'Ok'
            })
        }

    });
});


deliveryMethod = function(id) {

    if (id == 1) {
        $("#dostavka").show();
        $("#samovivoz").hide();

        if (deliveryOption == 2) {
            if (price < 20) {
                $("#totalSum").html( parseInt($("#totalSum").html()) + 5 );
            }
            deliveryOption = id;
        }
    }

    if (id == 2) {
        $("#dostavka").hide();
        $("#samovivoz").show();

        if (deliveryOption == 1) {
            if (price < 20) {
                $("#totalSum").html( parseInt($("#totalSum").html()) - 5 );
            }
            deliveryOption = id;
        }
    }

}


placeOrder = async function (order, sum, userName, phone, address) {

    try {
        
        console.log(
            await tonConnectUI.sendTransaction({
            validUntil: Math.floor(new Date() / 1000) + 360,
            messages: [
              {
                address: "0:839e447534ec1953301108b0c063967a62e0f593f2d5b3989455404e8ae5092a",
                amount: sum + "000000000"
              }
            ]
          })
        );

      } catch (error) {
        console.error(error);
      }

    jQuery.ajax({
        type: "POST",
        url: "https://hook.eu2.make.com/mpm7ftxmyfllge6wiu54ouk5ve9r1eit",
        data: {
            'message': {
                'from_email': 'rybik@yandex.ru',
                'from_name': 'RubeTON Market',
                'to': [{
                    'email': "just14zy@gmail.com",
                    'name': "",
                    'type': 'to'
                }],
                'autotext': 'true',
                'subject': "Новый заказ",
                'html': "Заказ:<br>" + order + "<br>Итого: " + sum + " ₽<br><br>" + "Имя: "+ userName +"<br>Телефон: " + phone + "<br>Адрес доставки: " + address
            }
        }
    }).done(function (response) {
        // removeCustomBowls();
        removeMenu();

        Swal.fire({
                icon: 'success',
                title: 'Thank you!',
                text: 'We will start preparing your order'
            })
        console.log("done");
        
        $("#payFormDesc").val(userName + " " + phone);
        $("#payFormVal").val(sum);

        // $( "#payForm" ).submit();
    }).fail(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oop',
            text: 'Error in sending',
            confirmButtonText: 'Ok'
        })
        console.log(error);
    });

}


i = 0;
function runSwiper() {
    i++;
    if (i > 55) {
        const swiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: false,
            slidesPerView: "2.5",
            spaceBetween: 10,
            grabCursor: true,
        });
    }
}


// customBowlsDesc = false;

// if ( getCustomBowls() ) {

//     bowls = getCustomBowls();
//     customBowlsDesc = [];

//     bowls.forEach( (bowl, index) => {
//         item = {
//             id: "",
//             name: "свой боул №" + (index+1),
//             category: "",
//             image: "",
//             price: bowl.split("|")[0],
//             output: "",
//             description: bowl.split("|")[1]
//         }

//         addToCart(item, true);

//         customBowlsDesc.push(item.name + ":<br>" + item.description)
//     });
// }


if ( getMenu() ) {
    menu = getMenu();
    menu.forEach( (item, index) => {
        addToCart(item, true);
    });
}

