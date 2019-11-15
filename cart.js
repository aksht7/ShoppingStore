var user=[]
var allProducts=[];
var productsArray=[];
var userCartProducts=[];
var allOrders=[];
var grant=1;
var total=document.getElementById("total");
var divListOfProducts=document.getElementById("divListOfProducts");
var totalPrice=0;
function getStoredProducts()
{
    if(!localStorage.cartProducts)
        {
            localStorage.cartProducts=JSON.stringify([]);
        }
    else
        {
            allProducts=JSON.parse(localStorage.products);
            user=JSON.parse(sessionStorage.loggedUsers);
            productsArray=JSON.parse(localStorage.cartProducts);
            productId=productsArray.indexOf(productsArray[productsArray.length-1])+1;

                for(i=0;i<productsArray.length;i++)
                {
                    if(productsArray[i].user==user[0].uname)
                    {
                    userCartProducts.push(productsArray[i]);
                    addProductToDOM(productsArray[i]);
                    }
                }
            total.innerHTML=total.innerHTML+totalPrice;
        }
}

function storeProducts()
{
    localStorage.cartProducts=JSON.stringify(productsArray);
}

function removeDataFromProductArray(index)
{
   productsArray.splice(index,1);
   storeProducts();
}

function getProductIndex(id)
{
    for(var i=0;i<productsArray.length;i++)
        {
            if(productsArray[i].user==user[0].uname)
            {
            if(productsArray[i].id==id)
                {
                     return i;
                }
            }
        }
}

function getAllProductIndex(id)
{
    for(var i=0;i<allProducts.length;i++)
        {
            if(allProducts[i].id==id)
                {
                    return i;
                }

        }
}

function deleteProduct(id,element)
{
    var index=getProductIndex(id);
    console.log(index);
    totalPrice=totalPrice-(Number(productsArray[index].quantity)*Number(productsArray[index].price));
    removeDataFromProductArray(index);
    divListOfProducts.removeChild(element);
    location.href='cart.html';
}

function addProductToDOM(productObj)
{
    var str="Product name : "+productObj.name+"<br>Price : Rs "+productObj.price+"<br>Quantity : "+productObj.quantity+"<br>Total : Rs "+Number(productObj.price)*Number(productObj.quantity);
    var index=getAllProductIndex(productObj.id);
    var divRow=document.createElement("div");
     divRow.className+="productDiv";
    var img = document.createElement('img');
        img.setAttribute("style","margin-left:17%;");
        var path=productObj.img;
        var file =path.split("\\");
        var fileName = file[file.length-1];
        console.log(fileName);
        img.src="images/"+fileName;
        divRow.appendChild(img);
    
    divRow.setAttribute("id",productObj.id);
    var product=document.createElement("p");
    product.innerHTML=str;
    console.log(index);
   if(Number(allProducts[index].quantity)<Number(productObj.quantity))
    {
        product.innerHTML="OUT OF STOCK!!!"
    }
    divRow.appendChild(product);
    var deleteBtn=document.createElement("button");
    deleteBtn.innerHTML="Delete";
    deleteBtn.setAttribute("style","margin-left: 20px;background-color: white;color: black;border: 2px solid #555555;");
    divRow.appendChild(deleteBtn);
    deleteBtn.addEventListener("click",function(event) {
        deleteProduct(divRow.id,divRow);
    });
    divRow.setAttribute("style","float:left;margin-left:25px;width:340px;padding:10px 20px;margin-top:20px;");
    divListOfProducts.appendChild(divRow);
    totalPrice+=Number(productObj.price)*Number(productObj.quantity);

}

function checkQuantityAvailability()
{
    for(i=0;i<userCartProducts.length;i++)
        {
            for(j=0;j<allProducts.length;j++)
                {
                    var index=getAllProductIndex(userCartProducts[i].id);
                    console.log("index "+index);
                    if(Number(allProducts[index].quantity)<Number(userCartProducts[i].quantity))
                        {
                            grant=0;
                        }
                }
        }
    console.log(grant);
    return grant;
}

function checkOut()
{
    if(checkQuantityAvailability())
        {
    refreshQuantity();
    productsArray=JSON.parse(localStorage.cartProducts);
    for(i=0;i<userCartProducts.length;i++)
    {
        for(j=0;j<productsArray.length;j++)
            {
                if(userCartProducts[i].user==productsArray[j].user)
                    {
                        productsArray.splice(j,1);
                        break;
                    }
            }
    }
    userCartProducts=[];
    storeProducts();
    location.href='cart.html';
}
    else
        {
         alert("The product is OUT OF STOCK!!! please remove it");
        }
}

function continueToShop()
{
    location.href='viewProducts.html';
}

function refreshQuantity()
{
    for(i=0;i<userCartProducts.length;i++)
        {
            var index=getAllProductIndex(userCartProducts[i].id);
            console.log(index);
            allProducts[index].quantity=allProducts[index].quantity-userCartProducts[i].quantity;
        }
    console.log(allProducts);
    localStorage.products=JSON.stringify(allProducts);
    placeOrder();
}

function placeOrder()
{
    if(!localStorage.orders)
        {
            localStorage.orders=JSON.stringify([]);
        }
    else
        {
            allOrders=JSON.parse(localStorage.orders);
        }
    for(i=0;i<userCartProducts.length;i++)
        {
            allOrders.push(userCartProducts[i]);
        }
    localStorage.orders=JSON.stringify(allOrders);
}
