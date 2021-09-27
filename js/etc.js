const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });



customBowlAdd = function(item, price) {
  bowl = price + "|" + item;
  bowls = JSON.parse( localStorage.getItem("bowls") );
 
  if (bowls) {
    bowls.push(bowl);
  } else {
    bowls = [];
    bowls.push(bowl);
  }
  localStorage.setItem("bowls", JSON.stringify(bowls) );
};

menuAdd = function(item) {
  menu = JSON.parse( localStorage.getItem("menu") );
 
  if (menu) {
    menu.push(item);
  } else {
    menu = [];
    menu.push(item);
  }

  localStorage.setItem("menu", JSON.stringify(menu) );
}


getCustomBowls = function() {
  bowls = JSON.parse( localStorage.getItem("bowls") );

  if (bowls) {
    return bowls
  }

}

getMenu = function() {
  menu = JSON.parse( localStorage.getItem("menu") );

  if (menu) {
    return menu
  }
  
}

removeCustomBowls = function() {
  localStorage.removeItem('bowls');
}

removeMenu = function() {
  localStorage.removeItem('menu');
}


Swal.fire("Заказы не принимаются", "Добрый день! Сегодня у команды Miska Bowls выходной, заказы не принимаются, ждём вас завтра!");