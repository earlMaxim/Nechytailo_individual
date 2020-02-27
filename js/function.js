'use strict';


// Put all data from catalog.js and best-offer.js to localstorage
if(!localStorage.getItem("catalog")) {
    localStorage.setItem("catalog", JSON.stringify(window.catalog));
}
if(!localStorage.getItem("bestOffer")) {
    localStorage.setItem("bestOffer", JSON.stringify(window.bestOffer));
}

//default functions
renderBestOffer()
renderNewArrivals()

// Variebles
let bestOffer_changePhotoUp_v     = document.querySelectorAll('.arrow_Up')
let bestOffer_changePhotoDown_v   = document.querySelectorAll('.arrow_Down')
let bestOffer_btn_AddToBag        = document.querySelectorAll('.btn_AddToBag')


// Behavior of different buttons
bestOffer_changePhotoUp_v.forEach(element => 
    element.addEventListener('click', function(e){
        let target = e.target.closest('.item');
        bestOffer_changePhotoUp_f(target)
}))
bestOffer_changePhotoDown_v.forEach(element => 
    element.addEventListener('click', function(e){
        let target = e.target.closest('.item');
        bestOffer_changePhotoDown_f(target)
}))

//section best offer

// bestOffer changing photo by clicking arrow Up
function bestOffer_changePhotoUp_f(item){
    //get id of item that rendring now
    let itemIdOld       = item.querySelector('.item-id').textContent
    let counter         = 999;
    let localSBestOffer = JSON.parse(localStorage.getItem('bestOffer'));
    let localCatalog    = JSON.parse(localStorage.getItem('catalog'));

    //if cusomer want change left photo in bestoffer
    if(item.querySelector('.item-bestOffer-left')){
        // firsty we find position best-offer.js
        localSBestOffer.left.forEach((element, index) =>{
            if(itemIdOld == element){
                    counter = index
                }
        })
        //next item
        counter = counter+1
        // checking for diapason
        if(counter >= localSBestOffer.left.length){
            counter = 0
        }
        renderBestOfferLeft(counter, localCatalog, localSBestOffer)
    }
     //if cusomer want change right photo in bestoffer
    else{
        // firsty we find position best-offer.js
        localSBestOffer.right.forEach((element, index) =>{
            if(itemIdOld == element){
                    counter = index
                }
        })
        //next item
        counter = counter+1
        // checking for diapason
        if(counter >= localSBestOffer.right.length){
            counter = 0
        }
        //rendering new item
        renderBestOfferRight(counter , localCatalog, localSBestOffer)
    }
}
// bestOffer changing photo by clicking arrow Down
function bestOffer_changePhotoDown_f(item){
    //get id of item that rendring now
    let itemIdOld       = item.querySelector('.item-id').textContent
    let counter         = 999;
    let localSBestOffer = JSON.parse(localStorage.getItem('bestOffer'));
    let localCatalog    = JSON.parse(localStorage.getItem('catalog'));

    //if cusomer want change left photo in bestoffer
    if(item.querySelector('.item-bestOffer-left')){
        // firsty we find position best-offer.js
        localSBestOffer.left.forEach((element, index) =>{
            if(itemIdOld == element){
                    counter = index
                }
        })
        //next item
        counter = counter-1
        // checking for diapason
        if(counter <= -1){
            counter = localSBestOffer.left.length -1
        }
        renderBestOfferLeft(counter, localCatalog, localSBestOffer)
    }
     //if cusomer want change right photo in bestoffer
    else{
        // firsty we find position best-offer.js
        localSBestOffer.right.forEach((element, index) =>{
            if(itemIdOld == element){
                    counter = index
                }
        })
        //next item
        counter = counter-1
        // checking for diapason
        if(counter <= -1){
            counter = localSBestOffer.right.length -1
        }
        //rendering new item
        renderBestOfferRight(counter , localCatalog, localSBestOffer)
    }
}

// section Best offer (default render)
function renderBestOffer(){
    let itemLeft        = document.querySelector('.bestoffer-main').children[0]
    let itemRight       = document.querySelector('.bestoffer-main').children[2]
    let itemLeftPhoto   = itemLeft.querySelector('img')
    let itemRightPhoto  = itemRight.querySelector('img')
    let total           = document.querySelector('.bestoffer-tottal')
   
    //some variables 
    let idL=0, idR = 0;
    let localSBestOffer = JSON.parse(localStorage.getItem('bestOffer'));
    let localCatalog    = JSON.parse(localStorage.getItem('catalog'));
    let idLeftPhoto     = localSBestOffer.left[idL]
    let idRightPhoto    = localSBestOffer.right[idR]

    //create objects with all data about rendered item
    let leftData = -1, rightData = -1;       
    localCatalog.forEach(element =>{
        if (element.id == idLeftPhoto){
            leftData = element
        }
        if (element.id == idRightPhoto){
            rightData = element
        }
    })

    //set photos and info's
    itemLeft.querySelector('.item-id').innerHTML = `${leftData.id}`
    itemRight.querySelector('.item-id').innerHTML = `${rightData.id}`
    itemLeftPhoto.setAttribute('src', `img/${leftData.id}.png`)
    itemRightPhoto.setAttribute('src', `img/${rightData.id}.png`)
    itemLeft.querySelector('.item-name').innerHTML = leftData.title
    itemRight.querySelector('.item-name').innerHTML = rightData.title
    itemLeft.querySelector('.item-price').innerHTML = `£${leftData.price}`
    itemRight.querySelector('.item-price').innerHTML = `£${rightData.price}`
    //label new
    if (itemLeft.querySelector('.label_new')){
        itemLeft.querySelector('.label_new').remove()
    }
    if (itemRight.querySelector('.label_new')){
        itemRight.querySelector('.label_new').remove()
    }
    if(leftData.hasNew == true){
        let lebelNew = document.createElement('div')
        lebelNew.classList.add('label_new')
        lebelNew.innerHTML='NEW'
        itemLeftPhoto.before(lebelNew)
    }
    if(rightData.hasNew == true){
        let lebelNew = document.createElement('div')
        lebelNew.classList.add('.label_new')
        lebelNew.innerHTML='NEW'
        itemRightPhoto.before(lebelNew)
    }
    //set total price
    total.firstChild.textContent    = `£${(leftData.price+rightData.price - localSBestOffer.discount).toFixed(2)}`
    total.lastChild.textContent     = `£${(leftData.price+rightData.price).toFixed(2)}`

    //local storage contain info about bestOffer that now rengering on main page
    let nowInBestOffer = {
        left:   leftData,
        right:  rightData
    };
    localStorage.setItem('nowInBestOffer',JSON.stringify(nowInBestOffer))
}
// bestOffer render changed photo by clicking arrow Up
function renderBestOfferLeft(counter, localCatalog, localSBestOffer){
    //rendering new item
    let itemLeft        = document.querySelector('.bestoffer-main').children[0]
    let itemLeftPhoto   = itemLeft.querySelector('img')
    let idLeftPhoto     = localSBestOffer.left[counter]
    //create objects with all data about rendered item
    let leftData = -1;      
    localCatalog.forEach(element =>{
    if (element.id == idLeftPhoto){
        leftData = element;
    }
    })
    itemLeft.querySelector('.item-id').innerHTML = `${leftData.id}`
    itemLeftPhoto.setAttribute('src', `img/${leftData.id}.png`)
    itemLeft.querySelector('.item-name').innerHTML = leftData.title
    itemLeft.querySelector('.item-price').innerHTML = `£${leftData.price}`
    //update local storage
    let nowInBestOffer = JSON.parse(localStorage.getItem('nowInBestOffer'))
    nowInBestOffer.left = leftData
    localStorage.removeItem('nowInBestOffer')
    localStorage.setItem('nowInBestOffer',JSON.stringify(nowInBestOffer))
    //label new
    if (itemLeft.querySelector('.label_new')){
        console.log('found')
        itemLeft.querySelector('.label_new').remove()
    }
    if(leftData.hasNew == true){
        let lebelNew = document.createElement('div')
        lebelNew.classList.add('label_new')
        lebelNew.innerHTML='NEW'
        itemLeftPhoto.before(lebelNew)
    }
   //update total price
    reCountTotalPriceBestOffer()
}
// bestOffer render changed photo by clicking arrow Down
function renderBestOfferRight(counter , localCatalog, localSBestOffer){
    //rendering new item
    let itemRight       = document.querySelector('.bestoffer-main').children[2]
    let itemRightPhoto  = itemRight.querySelector('img')
    let idRightPhoto    = localSBestOffer.right[counter]
    //create objects with all data about rendered item
    let  rightData = -1;       
    localCatalog.forEach(element =>{
        if (element.id == idRightPhoto){
            rightData = element
        }
    })
    //set photos and info's
    itemRight.querySelector('.item-id').innerHTML = `${rightData.id}`
    itemRightPhoto.setAttribute('src', `img/${rightData.id}.png`)
    itemRight.querySelector('.item-name').innerHTML = rightData.title
    itemRight.querySelector('.item-price').innerHTML = `£${rightData.price}`
    //update local storage
    let nowInBestOffer = JSON.parse(localStorage.getItem('nowInBestOffer'))
    nowInBestOffer.right = rightData
    localStorage.removeItem('nowInBestOffer')
    localStorage.setItem('nowInBestOffer',JSON.stringify(nowInBestOffer))
    //label new
    if (itemRight.querySelector('.label_new')){
        console.log('found')
        itemRight.querySelector('.label_new').remove()
    }
    if(rightData.hasNew == true){
        let lebelNew = document.createElement('div')
        lebelNew.classList.add('.label_new')
        lebelNew.innerHTML='NEW'
        itemRightPhoto.before(lebelNew)
    }
    //update total price
    reCountTotalPriceBestOffer()
}
 //update total price after changing item in best offer section
function reCountTotalPriceBestOffer(){
    let total           = document.querySelector('.bestoffer-tottal')
    let localSBestOffer = JSON.parse(localStorage.getItem('bestOffer'));
    let nowInBestOffer = JSON.parse(localStorage.getItem('nowInBestOffer'))
    total.firstChild.textContent    = `£${(nowInBestOffer.left.price+nowInBestOffer.right.price - localSBestOffer.discount).toFixed(2)}`
    total.lastChild.textContent     = `£${(nowInBestOffer.left.price+nowInBestOffer.right.price).toFixed(2)}`
}
//section best offer END

// section new arrivals

// section new arrivals (default render)
function renderNewArrivals(){
    let localCatalog            = JSON.parse(localStorage.getItem('catalog'));
    let container_newArivals    = document.querySelector('.containerNewArivals')
    //range catalog by date from new to old
    localCatalog = _.reverse(_.sortBy(localCatalog, function(data){return Date.parse(data.dateAdded)}))

    for (let i=0; i< container_newArivals.children.length; i++){
        let item = container_newArivals.children[i];
        //set photos and info's
        item.querySelector('.item-id').innerHTML = `${localCatalog[i].id}`
        item.querySelector('img').setAttribute('src', `img/${localCatalog[i].id}.png`)
        item.querySelector('.item-name').innerHTML = localCatalog[i].title
        item.querySelector('.item-price').innerHTML = `£${localCatalog[i].price}`
        if(localCatalog[i].hasNew == true){
            let lebelNew = document.createElement('div')
            lebelNew.classList.add('label_new')
            lebelNew.innerHTML='NEW'
            item.querySelector('img').before(lebelNew)
        }
    }
    console.log(localCatalog)
}







// section new arrivals END
