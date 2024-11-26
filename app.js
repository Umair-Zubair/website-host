let items = document.querySelectorAll('.slider .list .item'); //select all slider items
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

//parameters
let countItem = items.length;
let itemActive = 0;
//next button function 
next.onclick= function(){
    itemActive = itemActive +1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}

//prev button
prev.onclick= function(){
    itemActive = itemActive - 1 ;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}

//auto run slider
let refreshInterval = setInterval(() => {
    next.click();

}, 5000 ) //3000 means 3s
function showSlider(){
    //removing old item
    console.log("Oonga Boonga")
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
}

thumbnails.forEach((thumbnail , index ) => {
    thumbnail.addEventListener('click',()=> {
        itemActive = index;
        showSlider();
    })
})