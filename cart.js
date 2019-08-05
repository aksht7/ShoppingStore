var productsArray=[];
var divListOfProducts=document.getElementById("divListOfProducts");
function getStoredProducts()
{
    if(!localStorage.cartProducts)
        {
            localStorage.cartProducts=JSON.stringify([]);
        }
    else
        {
            productsArray=JSON.parse(localStorage.cartProducts);
            productId=productsArray.indexOf(productsArray[productsArray.length-1])+1;
            
                for(i=0;i<productsArray.length;i++)
                {
                    addProductToDOM(productsArray[i]);
                }
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
            if(productsArray[i].id==id)
                {
                    return i;
                }
        }
}

function deleteProduct(id,element)
{
    var index=getProductIndex(id);
    removeDataFromProductArray(index);
    divListOfProducts.removeChild(element);
}

function addProductToDOM(productObj)
{
    var str="Product name : "+productObj.name+"<br>Price : Rs "+productObj.price+"<br>Quantity : "+productObj.quantity+"<br>";
        var divRow=document.createElement("div");
        divRow.setAttribute("id",productObj.id);
        var product=document.createElement("p");
        product.innerHTML=str;
        divRow.appendChild(product);
        var deleteBtn=document.createElement("button");
        deleteBtn.innerHTML="Delete";
        deleteBtn.setAttribute("style","margin-left: 20px;background-color: white;color: black;border: 2px solid #555555;");
        divRow.appendChild(deleteBtn);
        deleteBtn.addEventListener("click",function(event) {
            deleteProduct(divRow.id,divRow);
        });
        divRow.setAttribute("style","width:350px;padding:10px 25px;margin-top:20px;border:2px solid #555555;");
        divListOfProducts.appendChild(divRow);
        console.log(divRow.id);
        console.log(productsArray);
        
}

function checkOut()
{
   productsArray=[];
   storeProducts();
   location.href='file:///E:/Frontend%20with%20JS/cart.html';
}

function continueToShop()
{
  location.href='file:///E:/Frontend%20with%20JS/viewProducts.html';
}