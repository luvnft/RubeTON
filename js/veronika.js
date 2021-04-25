const db = new GoogleSpreadsheetsDb(
    'AIzaSyBdjsu_0mERhpzaz79MxeFzhcyqsiniImc',
    '1L3s7ikEgQf0Cq8xGflJz-C0bSAJya1AQVOGvXo-hjNc'
);




// var categories = [
//     {
//         ru: "Супы",
//         en: "Soups"
//     },
//     {
//         ru: "Холодные закуски",
//         en: ""
//     },
//     {
//         ru: "Салаты",
//         en: ""
//     },
//     {
//         ru: "Горячие закуски",
//         en: ""
//     },
//     {
//         ru: "Горячие блюда-Мясо",
//         en: ""
//     },
//     {
//         ru: "Горячие блюда-Птица",
//         en: ""
//     },
//     {
//         ru: "Горячие блюда-Рыба",
//         en: ""
//     },
//     {
//         ru: "Горячие блюда на углях",
//         en: ""
//     },
//     {
//         ru: "Гарниры и соусы",
//         en: ""
//     },
//     {
//         ru: "Десерты",
//         en: ""
//     },
//     {
//         ru: "Напитки от шефа",
//         en: ""
//     }
// ]


// var categories = ["ПОКЕ", "БОУЛЫ", "СТАРТЕР", "СУП", "ЗАВТРАК"];


rows2 = {};



    db.getAll('Меню!A1:L100', (err, rows) => {     
        // category.rows = rows;
        
        rows2 = rows;
        
        elHTML_poke = "";
        elHTML_bowl = "";
        elHTML_starter = "";
        elHTML_soup = "";
        elHTML_zavtrak = "";
        elHTML_smuzi = "";

        
        rows.forEach(row => {   
            
            if (!row.image) {
                row.image = "unnamed-800x533.jpg";
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

            
            
        //     if (category.rows.length == row.id) {
                runSwiper();
        //     };
            
        });
    })


generateHTML = function(row) {
    return `<div class="swiper-slide">
    <img src="img/`+row.image +`" width="100%" onclick="showAlert(`+row.id+`)">
    <p class="dishTitle"><b>`+row.name_ru +`</b><br>`+ row.price + `₽</p>
    </div>`;
}

showAlert = function(id) {
    
    // console.log(rows2[id-1]);
    item = rows2[id-1];

    img = "img/"+item.image;

    Swal.fire({
        title: item.name_ru,
        text: item.price + "₽",
        imageUrl: img,
        // imageWidth: 400,
        // imageHeight: 200,
        confirmButtonText: "В корзину",
        showCloseButton: true,
        imageAlt: 'Custom image',
      })

    // Swal.fire({
    //     title: item.name_ru,
    //     html: "sd",
    //     // input: 'text',
    //     showCancelButton: true        
    // }).then((result) => {
    //     if (result.value) {
    //         // console.log("Result: " + result.value);

    //     }
    // });

}


// categories.forEach(category => {
//     db.getAll(category.ru+'!A1:L100', (err, rows) => {     
//         category.rows = rows;
//         el = document.getElementById(category.ru);
//         elHTML = "";
//         category.rows.forEach(row => {
            
//             if (row.image) {
//                 row.image = "unnamed-800x533.jpg";
//             }
        
//             elHTML = elHTML + `
//             <div class="swiper-slide">
//                 <img src="img/`+row.image +`" width="100%">
//                 <p class="dishTitle"><b>`+row.name_ru +` – `+ row.price + `р. </b></p>
//                 <p class="description">`+row.description_ru +`</p>
//             </div>
//             `;
//             el.innerHTML = elHTML;
            
//             if (category.rows.length == row.id) {
//                 runSwiper();
//             };
            
//         });
//     })
    
// });

i = 0;
function runSwiper() {
    // i = 0;
    i++;
    // categories.forEach(category => {
    //     if (document.getElementById(category.ru).innerHTML.length > 50) {
    //         i = i + 1
    //     }
    // });

    if (i > 40) {

        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            direction: 'horizontal',
            loop: false,
            // effect: "flip",
            slidesPerView: 3,
            // pagination: {
            //     el: '.swiper-pagination',
            //     dynamicBullets: true,
            //     type: "progressbar"
            // },
            spaceBetween: 20,
        });

        // const swiper2 = new Swiper('.swiper-container-zavtrak', {
        //     slidesPerView: 1,
        //     direction: 'horizontal',
        //     loop: false,
        //     slidesPerView: 1,
        //     spaceBetween: 20,
        // });

        // const swiper3 = new Swiper('.swiper-container-smuzi', {
        //     slidesPerView: 1,
        //     direction: 'horizontal',
        //     loop: false,
        //     slidesPerView: 3,
        //     spaceBetween: 20,
        // });


        
    }
    
}