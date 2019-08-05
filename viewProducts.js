var productsArray=[];
var cart=[];
var users=[];
var divListOfProducts=document.getElementById("divListOfProducts");

function getUserDetail()
{
    sessionStorage.loggedUsers=JSON.stringify(users);
    if(users.length==0)
        {
            
        }
}
function storeProducts()
{
    localStorage.cartProducts=JSON.stringify(cart);
}

function getStoredProducts()
{
    if(!localStorage.products)
        {
            localStorage.products=JSON.stringify([]);
        }
    else
        {
            productsArray=JSON.parse(localStorage.products);
            productId=productsArray.indexOf(productsArray[productsArray.length-1])+1;
            
                for(i=0;i<productsArray.length;i++)
                {
                    addProductToDOM(productsArray[i]);
                }
        }
      getStoredCartProducts();
      getUserDetails();
}

function getStoredCartProducts()
{
    if(!localStorage.cartProducts)
        {
            localStorage.cartProducts=JSON.stringify([]);
        }
    else
        {
            cart=JSON.parse(localStorage.cartProducts);
        }
    console.log(cart);
}

function checkValidation(value)
{
    if(value>0 && !isNaN(value))
        {
            return true;
        }
    else
        {
            alert("Quantity must be numeric and greater than Zero!");
            return false;
        }
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

function getCartIndex(id)
{
    for(var i=0;i<cart.length;i++)
        {
            if(cart[i].id==id)
                {           
                    return i;
                }
        }
}

function checkCart(id)
{
    for(var i=0;i<cart.length;i++)
        {
            if(cart[i].id==id)
                {           
                    return true;
                }
        }
}

function checkQuantityAvailability(id,value)
{
    console.log(value);
      var index=getProductIndex(id);
     console.log(productsArray[index].quantity);
      if(productsArray[index].quantity>Number(value))
          {
              return true;
          }
     else
         {
             alert("Quantity not in stock");
             return false;
         }
}

function addProductToDOM(productObj)
{
    var str="Product name : "+productObj.name+"<br>Description : "+productObj.description+"<br>Price : Rs "+productObj.price+"<br>";
        var divRow=document.createElement("div");
        divRow.setAttribute("id",productObj.id);
        var product=document.createElement("p");
        product.innerHTML=str;
        divRow.appendChild(product);
        
        
        var quantity=document.createElement("input");
        quantity.setAttribute("placeholder"," quantity");
        quantity.setAttribute("style","outline:none;border:none;border-bottom:1px solid black;background:none;");
        var addToCart=document.createElement("button");
        addToCart.innerHTML="Add to cart";
        addToCart.setAttribute("style","margin-left: 20px;background-color: white;border: 2px solid #555555;");
        addToCart.addEventListener("click",function(event) {
            if(checkValidation(quantity.value))
                {
                    if(checkQuantityAvailability(divRow.id,quantity.value))
                        {
                           var index=getCartIndex(divRow.id);
                            console.log("index : "+index);
                            if(checkCart(divRow.id))
                                {
                                    var obj=new Object();
                                    obj.id=divRow.id;
                                    obj.name=productObj.name;
                                    obj.quantity=quantity.value;
                                    obj.price=productObj.price;
                                    cart.splice(index,1,obj);
                                    storeProducts();
                                    alert("Product added!");
                                    console.log(cart); 
                                }
                            else
                                {
                                    var obj=new Object();
                                    obj.id=divRow.id;
                                    obj.name=productObj.name;
                                    obj.quantity=quantity.value;
                                    obj.price=productObj.price;
                                    cart.push(obj);
                                    storeProducts();
                                    alert("Product added!");
                                    console.log(cart);
                                }
                        }
                    
                }
            quantity.value="";
        });
        divRow.appendChild(quantity);
        divRow.appendChild(addToCart);
        divRow.setAttribute("style","width:350px;padding:10px 25px;margin-top:20px;border:2px solid #555555;");
        divListOfProducts.appendChild(divRow);
        console.log(divRow.id);
        console.log(productsArray);
        
}