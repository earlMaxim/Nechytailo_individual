
// showInfoInHeaderBag()
// //Always update info in header 
// function showInfoInHeaderBag(){
//     let nowInBag                      = JSON.parse(localStorage.getItem('ShopingCart'));
//     if(nowInBag!=undefined){
//         let money   = 0;
//         let quantity= nowInBag.length;
//         console.log(quantity)
//         for(let i =0; i<quantity;i++){
//             money = parseFloat(money)+ parseFloat(nowInBag[i].price)
//             console.log('money')
//         }
//         console.log(parseInt(nowInBag[0].price))
//         document.querySelector('.bagprice').innerHTML    =`£ ${money}`
//         document.querySelector('.bagquantity').innerHTML = ` (${quantity})`
//     }
// }


renderBagPage()
function renderBagPage(){
    let nowInBag                      = JSON.parse(localStorage.getItem('ShopingCart'));
    let catalog                       = JSON.parse(localStorage.getItem('catalog'));
    let containerForItems             = document.querySelector('.itemsInBag')
    console.log(nowInBag)

    let IcheckUniqItems = []; // in case if we have same item but in diferent sizes or colors

    // if have any items in the bag
    if(nowInBag!=undefined){

        // this loop going by each item in the Cart
        for(let i=0;i<nowInBag.length;i++){
            let id = nowInBag[i].itemID
            // by id we found all info about item in catalog.js
            id      =(_.find(catalog, function(item){ if(item.id == id){return item}}))

            // if in shoping bag we have same items we dont have render them twice we have to change quantity only 
            if(IcheckUniqItems.includes(nowInBag[i].megaUniqId) == true){
                let quantityAddOne = document.querySelector('.item-id-mega').parentNode.querySelector('.quantity_variable')
                quantityAddOne.innerHTML = (parseInt(quantityAddOne.textContent) + 1)
            }

            // render item but if we already rendered similliar we have to change quantity number only
            if(IcheckUniqItems.includes(nowInBag[i].megaUniqId) == false){
                IcheckUniqItems.push(nowInBag[i].megaUniqId)
           
                let item                    = document.createElement('div');
                let item_img                = document.createElement('div');
                let img                     = document.createElement('img');
                let item_name               = document.createElement('div')
                let item_price              = document.createElement('div')
                let item_id                 = document.createElement('div')
                let megaUniqId              = document.createElement('div')
                let item_info               = document.createElement('div')
                let item_detail_container   = document.createElement('div') // container for item_detail_color, item_detail_size, item_detail_quantity
                let item_detail_color       = document.createElement('div') // what color of choosen item
                let item_detail_size        = document.createElement('div') // what size of choosen item
                let item_detail_quantity    = document.createElement('div') // container for quantity_plus, quantity_minus, quantity_variable
                let quantity_plus           = document.createElement('div') // minus one item
                let quantity_minus          = document.createElement('div') // add one more item
                let quantity_variable       = document.createElement('div') // how many items
                let btn_RemoveItem          = document.createElement('div') // red sign on each item "Remove item"
                let a = document.createElement('a')
                a.setAttribute('href', 'itemDetail.html')
                item.classList.add('item')
                item_img.classList.add('item-img')
                item_name.classList.add('item-name')
                item_price.classList.add('item-price')
                item_id.classList.add('item-id')
                megaUniqId.classList.add('item-id-mega')
                item_info.classList.add('item-info')
                btn_RemoveItem.classList.add('item-btn_RemoveItem')
                
                item_detail_container.classList.add('item_detail_container')    //info about choosed color, size, quantity
                item_detail_color.classList.add('item_detail_color')
                item_detail_size.classList.add('item_detail_size')
                item_detail_quantity.classList.add('item_detail_quantity')
                quantity_plus.classList.add('quantity_plus')
                quantity_minus.classList.add('quantity_minus')
                quantity_variable.classList.add('quantity_variable')

                //set photos and info's
                item_id.innerHTML = `${id.id}`
                megaUniqId.innerHTML = `${nowInBag[i].megaUniqId}`
                img.setAttribute('src', `img/${id.id}.png`)
                item_name.innerHTML = `<a href="itemDetail.html">${id.title}</a>`
                img.addEventListener('click', detailPageItem) 
                item_name.addEventListener('click', detailPageItem)  
                item_price.innerHTML = `£${(id.price).toFixed(2)}`
                btn_RemoveItem.innerHTML    = 'Remove item'
                btn_RemoveItem.addEventListener('click', removeThisItemFromBag)
                quantity_plus.innerHTML = ' + '
                quantity_minus.innerHTML = ' — '
                quantity_plus.addEventListener('click', oneMoreSelectedItem)
                quantity_minus.addEventListener('click', oneLessSelectedItem)
                quantity_variable.innerHTML = '1'
                //additional info about size, color..
                console.log(id)
                if(nowInBag[i].color != null){
                    console.log('hey'+id.color)
                    item_detail_color.innerHTML = `Color: ${nowInBag[i].color}`
                }
                if(nowInBag[i].size != null){
                    item_detail_size.innerHTML = `Size: ${nowInBag[i].size}`
                }
                //if discount price less then price
                if(id.price - id.discountedPrice != 0 && id.discountedPrice != null){
                item_price.innerHTML = `£${id.discountedPrice}`
                }
                item_detail_quantity.innerHTML = 'Quantity: '
                // if item new - supposed to be red label
                if(id.hasNew == true){
                let lebelNew = document.createElement('div')
                lebelNew.classList.add('label_new')
                lebelNew.innerHTML='NEW'
                item_img.append(lebelNew)
                }
                a.append(img)
                item_img.append(a)
                item.append(item_img)
                item_info.append(item_name)
                item_info.append(item_price)
                item_info.append(item_id)
                item_info.append(megaUniqId)
                item_detail_container.append(item_detail_color)
                item_detail_container.append(item_detail_size)
                item_info.append(item_detail_container)
                item_detail_quantity.append(quantity_minus)
                item_detail_quantity.append(quantity_variable)
                item_detail_quantity.append(quantity_plus)
                item_info.append(item_detail_quantity)
                item_info.append(btn_RemoveItem)
                item.append(item_info)
                containerForItems.append(item)
            }
        }
    }
}


function detailPageItem(e){
    let targetID = e.target.closest('.item').querySelector('.item-id').textContent;
    localStorage.removeItem('targetIDForItemDetail')
    localStorage.setItem("targetIDForItemDetail", JSON.stringify(targetID));
}

function removeThisItemFromBag(e){
    console.log(e.target.closest('.item'))
    let item =e.target.closest('.item')
    //firstly we delete all info in localstorage
    let ShopingCart = JSON.parse(localStorage.getItem('ShopingCart'));
    localStorage.removeItem('ShopingCart')
    let uniqId      = item.querySelector('.item-id-mega').textContent
    let howLookThatElem = _.find(ShopingCart, function(item){ if(item.megaUniqId == uniqId){return item}})
    ShopingCart     = _.differenceWith(ShopingCart, [howLookThatElem], _.isEqual)
    localStorage.setItem('ShopingCart', JSON.stringify(ShopingCart))
    //then we delete DOM
    item.remove()
}

function oneMoreSelectedItem(e){
    //quantity +1
    e.target.parentNode.querySelector('.quantity_variable').innerHTML = (parseInt(e.target.parentNode.querySelector('.quantity_variable').textContent) +1)
    //add the item to localStorage
    let container_info = (e.target.closest('.item-info'))
    let id = container_info.querySelector('.item-id').textContent;
    let color = container_info.querySelector('.item_detail_color').textContent.substring(7);
    let size = container_info.querySelector('.item_detail_size').textContent.substring(6);
    let price = container_info.querySelector('.item-price').textContent.substring(1)
    buyThisItem(id,color,size,price)
}

function oneLessSelectedItem(e){
        //quantity -1
        let amountDOM = e.target.parentNode.querySelector('.quantity_variable')
        let amount    = parseInt(amountDOM.textContent)
        if(amount>0){

            let container_info = (e.target.closest('.item-info'))
            let uniqId         = container_info.querySelector('.item-id-mega').textContent

            let ShopingCart = JSON.parse(localStorage.getItem('ShopingCart'));
            // if we already has something in Shoping Cart
            if(ShopingCart != null){
                // firstly delete old info about purhcases
                localStorage.removeItem('ShopingCart')
                //then we have to find item that we would like to delete
                let itemToDelete = _.find(ShopingCart, function(item){ if(item.megaUniqId == uniqId){return item}})
                //delete this item from shoping cart
                ShopingCart      = _.reject(ShopingCart, function(item){return item==itemToDelete})
                //change info in DOM
                amountDOM.innerHTML = amount - 1
            }

            localStorage.setItem('ShopingCart', JSON.stringify(ShopingCart))

            console.log(ShopingCart)
        }
        else{alert("Sorry, but you cannot choose a quantity less than zero")}
}

function buyThisItem(Id, Color, Size, Price){
    let id      = Id;
    let color   = Color;
    let size    = Size;
    let price   = Price
    // we need megaUniqId to count how many simmilar items in shoping bag. The issue is the same item with different color or size has the same id in catalog.js
    let megaUniqId = id;
    //if item has size options
    if( size!=undefined){
        megaUniqId = megaUniqId + size;
    }
    //if item has color options
    if(color!=undefined){
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