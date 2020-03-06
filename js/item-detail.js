// variebles
let btnAddToBag                 = document.querySelector(".btn_buy")
console.log(btnAddToBag)

btnAddToBag.addEventListener('click', buyThisItem)
showInfoInHeaderBag()
renderItemDetail()
function renderItemDetail(){
    //by target ID we found whole information about that item in catalog
    let id                      = JSON.parse(localStorage.getItem('targetIDForItemDetail'));
    let localCatalog            = JSON.parse(localStorage.getItem('catalog'));
    var item                    =  _.find(localCatalog, function(item){ if(item.id == id){return item}})
    // put photo
    let item_gallery            = document.querySelector('.item_gallery')
    if (item.preview.length>0){
        for(let i=0; i<3;i++){
            let pic = item_gallery.querySelectorAll('img')
            pic[i].setAttribute('src', item.preview[i]);
            pic[i+3].setAttribute('src', item.preview[i]);
        }
        let slides = document.getElementsByClassName("mySlides");
        slides[0].style.display = "block";
        
    }
    if (item.preview.length==0){
        for(let i=0; i<3;i++){
            let pic = item_gallery.querySelectorAll('img')
            pic[i].setAttribute('src', `img/${id}.png`);
            let slides = document.getElementsByClassName("mySlides");
            slides[0].style.display = "block";
        }
    }
    //put item data into DOM
    document.querySelector('.item-nameD').innerHTML = item.title;
    //if discount price less then price
    document.querySelector('.item-priceD').innerHTML = `£${(item.price).toFixed(2)}`
    if(item.price - item.discountedPrice != 0 && item.discountedPrice != null){
        document.querySelector('.item-priceD').innerHTML = `£${(item.discountedPrice).toFixed(2)}`
    }
    // if price different with discounted price - supposed to be crossed old price
    if(item.price - item.discountedPrice != 0 && item.discountedPrice != null){
        let oldPrice = document.createElement('div')
        oldPrice.classList.add('label_oldPrice')
        oldPrice.innerHTML = `£${(item.price).toFixed(2) }`
        document.querySelector('.item-priceD').prepend(oldPrice)
    }
 
    document.querySelector('.bestoffer-text-italic').innerHTML = item.description
    //add info about availible sizes

    if(item.sizes.length>=1){
        makeChoseSize(item)
    }
    if(item.colors.length>=1){
        makeChoseColor(item)
    }
    if(item.preview.length>0){
        var slideIndex = 1;
        showSlides(slideIndex);  
    }
}


function makeChoseSize(item){
    let container = document.querySelector('.size_conteiner')
    container.firstChild.innerHTML = 'Size:'
    let availible = container.lastChild;
    // create sizes 
    for(let i=0; i<(item.sizes).length;i++){
        let size = document.createElement('div')
        size.classList.add('variantForChoose')
        size.innerHTML = item.sizes[i];
        //active element (by default first element is active)
        if(i==0){size.className += " activeItemDetail"}
        size.addEventListener('click', function(){
            let current = this.parentNode.getElementsByClassName(" activeItemDetail");
            current[0].className = current[0].className.replace(" activeItemDetail", "");
            this.className += " activeItemDetail";
        })
        availible.append(size)
    }
}
function makeChoseColor(item){
    // create colors 
    container = document.querySelector('.color_container')
    container.firstChild.innerHTML = 'Color:'
    let availible = container.lastChild;
    for(let i=0; i<(item.colors).length;i++){
        let color = document.createElement('div')
        color.classList.add('variantForChoose')
        color.innerHTML = item.colors[i];
        //active element (by default first element is active)
        if(i==0){color.className += " activeItemDetail"}
        color.addEventListener('click', function(){
            let current = this.parentNode.getElementsByClassName(" activeItemDetail");
            current[0].className = current[0].className.replace(" activeItemDetail", "");
            this.className += " activeItemDetail";
        })
        availible.append(color)
    }
}

function buyThisItem(){
    let id      = JSON.parse(localStorage.getItem('targetIDForItemDetail'));
    let color   = null;
    let size    = null;
    let price   = (document.querySelector('.item-priceD').textContent).substring(1)
    if(id!=null){        
        if(price.includes('£')){
            price = price.slice((price.indexOf('£')+1) )
        }
        // we need megaUniqId to count how many simmilar items in shoping bag. The issue is the same item with different color or size has the same id in catalog.js
        let megaUniqId = id;
        //if item has size options
        if(document.querySelector('.size_conteiner').querySelector('.avalible_sign').children.length!=0){
            size    = document.querySelector('.size_conteiner').querySelector('.avalible_sign').querySelector('.activeItemDetail').textContent
            megaUniqId = megaUniqId + size;
        }
        //if item has color options
        if(document.querySelector('.color_container').querySelector('.avalible_sign').children.length!=0){
            color   = document.querySelector('.color_container').querySelector('.avalible_sign').querySelector('.activeItemDetail').textContent
            megaUniqId = megaUniqId + color;
        }
        let inShopingCart = {
            itemID: id,
            color:  color,
            size:   size,
            price:  price,
            megaUniqId: megaUniqId
        }
        let ShopingCart = JSON.parse(localStorage.getItem('ShopingCart'));
        // if we already has something in Shoping Cart
        if(ShopingCart != null){
            localStorage.removeItem('ShopingCart')
            ShopingCart.push(inShopingCart)
        }
        // if it's first item in shoping cart
        if(ShopingCart == null){
            ShopingCart =[];
            ShopingCart.push(inShopingCart)

        }
        localStorage.setItem('ShopingCart', JSON.stringify(ShopingCart))
    }
    showInfoInHeaderBag()
}


//gallery 

// if(item.preview.length>0){
//     var slideIndex = 1;
//     showSlides(slideIndex);  
// }
// var slideIndex = 1;
// showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
//   var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
    let beforeDots = dots[i].parentElement;
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
//   captionText.innerHTML = dots[slideIndex-1].alt;
}



//Always update info in header 
function showInfoInHeaderBag(){
   
    let nowInBag                      = JSON.parse(localStorage.getItem('ShopingCart'));
    if(nowInBag!=undefined){
        let money   = 0;
        let quantity= nowInBag.length;

        console.log(typeof(nowInBag))
        for(let i =0; i<quantity;i++){
            money = parseFloat(money)+ parseFloat(nowInBag[i].price)
            console.log(money)
        }
        console.log(nowInBag)
        document.querySelector('.bagprice').innerHTML    =`£ ${money}`
        document.querySelector('.bagquantity').innerHTML = ` (${quantity})`
    }
    if(nowInBag==undefined || nowInBag==null){
        document.querySelector('.bagprice').innerHTML    =`£ 0`
        document.querySelector('.bagquantity').innerHTML = ` (0)`
    }
}