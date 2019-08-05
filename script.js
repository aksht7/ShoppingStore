var flag=0;
var productsArray=[];
var productId=1;
var aAddNewProduct=document.getElementById("aAddNewProduct");
var divAddProduct=document.getElementById("divAddProduct");
var divListOfProducts=document.getElementById("divListOfProducts");
var targetParent;
var editParent;
function storeProducts()
{
    localStorage.products=JSON.stringify(productsArray);
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
           // productId=productsArray.indexOf(productsArray[productsArray.length-1])+1;
            for(i=0;i<productsArray.length;i++)
                {
                    addProductToDOM(productsArray[i]);
                }
            productId=productsArray[i-1].id+1;
        }
}


aAddNewProduct.addEventListener("click",function(event){
    if(flag==0)
    {
    flag=1;
    addProductPanel(); 
    }
});
function hideAddNewProductLink()
{
    aAddNewProduct.setAttribute("style","visibility:hidden;");
}
function unHideAddNewProductLink()
{
    aAddNewProduct.setAttribute("style","visibility:visible;");
}
function insertBlankLine(targetElement)
{
    var blankLine=document.createElement("br");
    targetElement.appendChild(blankLine);
}
function deleteListRows(element,id)
{
    var index=getProductIndex(id);
    removeDataFromProductArray(index);
    divListOfProducts.removeChild(element);
}
function hideProductPanel(element)
{
    divAddProduct.removeChild(element);
    unHideAddNewProductLink();
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

function checkValidation(name,description,price,quantity)
{
    if(name!="")
        {
            if(description!="")
                {
                    if(price!="")
                        {
                            if(quantity!="")
                                {
                                    return true;
                                }
                            else
                                {
                                    alert("please fill the quantity");
                                    return false;
                                }
                        }
                    else
                        {
                            alert("please fill the price");
                            return false;
                        }
                }
            else
                {
                    alert("please fill the description");
                    return false;
                }
        }
    else
    {
         alert("please fill the product name");
        return false;
    }
}

function addProductToArray()
{
    var productObj=new Object();
    productObj.id=productId;
    productObj.name=document.getElementById("textName").value;
    productObj.description=document.getElementById("textDescription").value;
    productObj.price=document.getElementById("textPrice").value;
    productObj.quantity=document.getElementById("textQuantity").value;
    productsArray.push(productObj);
    storeProducts(productObj);
    addProductToDOM(productObj);
    storeProducts();
    productId++;
}

function removeDataFromProductArray(index)
{
   productsArray.splice(index,1);
   storeProducts();
}


function addProductToDOM(productObj)
{
    var str="Product name : "+productObj.name+"<br>Description : "+productObj.description+"<br>Price : Rs "+productObj.price+"<br>Quantity : "+productObj.quantity+"<br>";
        var divRow=document.createElement("div");
        divRow.setAttribute("id",productObj.id);
        var product=document.createElement("p");
        product.innerHTML=str;
        divRow.appendChild(product);
        
        
        var editBtn=document.createElement("button");
        editBtn.innerHTML="Edit";
        editBtn.setAttribute("style","margin-left: 10px;background-color: white;color: black;border: 2px solid #555555;");
        var deleteBtn=document.createElement("button");
        deleteBtn.innerHTML="Delete";
        deleteBtn.setAttribute("style","margin-left: 30px;background-color: white;color: black;border: 2px solid #555555;")
        deleteBtn.addEventListener("click",function(event) {
            deleteListRows(divRow,divRow.id);
             console.log(productsArray);
        });
        
        editBtn.addEventListener("click",function(event){
              if(flag==0)
             {
              flag=1;
              updateProductPanel(divRow.id);
             }
        });
        divRow.appendChild(editBtn);
        divRow.setAttribute("style","width:350px;padding:10px 25px;margin-top:20px;border:2px solid #555555;");
        divRow.appendChild(deleteBtn);
        divListOfProducts.appendChild(divRow);
        console.log(divRow.id);
        console.log(productsArray);
        
}

function replaceProductInDOM(productObj)
{
    var str="Product name : "+productObj.name+"<br>Description : "+productObj.description+"<br>Price : Rs "+productObj.price+"<br>Quantity : "+productObj.quantity+"<br>";
        var divRow=document.createElement("div");
        divRow.setAttribute("id",productObj.id);
        var product=document.createElement("p");
        product.innerHTML=str;
        divRow.appendChild(product);
        
        var editBtn=document.createElement("button");
        editBtn.innerHTML="Edit";
        editBtn.setAttribute("style","margin-left: 10px;background-color: white;color: black;border: 2px solid #555555;");
        
        var deleteBtn=document.createElement("button");
        deleteBtn.innerHTML="Delete";
        deleteBtn.setAttribute("style","margin-left: 30px;background-color: white;color: black;border: 2px solid #555555;")
        divRow.appendChild(editBtn);
        divRow.appendChild(deleteBtn);
        divRow.setAttribute("style","width:350px;padding:10px 25px;margin-top:20px;border:2px solid #555555;");
        deleteBtn.addEventListener("click",function(event) {
        deleteListRows(divRow,divRow.id);
        });
        
        editBtn.addEventListener("click",function(event){
            if(flag==0)
                {
                 flag=1;
                 updateProductPanel(divRow.id);
                }
        });
        var index=getProductIndex(productObj.id);
        divListOfProducts.replaceChild(divRow,divListOfProducts.childNodes[index+1]);
}

function addProductPanel()
{
    hideAddNewProductLink();
    var divLabel=document.createElement("div");
    
    var labelProduct=document.createElement("label");
    labelProduct.innerHTML="Add New Product";
    labelProduct.setAttribute("style","margin-left:50px");
    divLabel.appendChild(labelProduct);
    insertBlankLine(divLabel);
    insertBlankLine(divLabel);
    
    var name=document.createElement("input");
    name.setAttribute("type","text");
    name.setAttribute("id","textName");
    name.setAttribute("placeholder","name of product");
    name.setAttribute("style","width:250px");
    divLabel.appendChild(name);
    insertBlankLine(divLabel);
    insertBlankLine(divLabel);
    
    
    var description=document.createElement("textarea");
    description.setAttribute("id","textDescription");
    description.setAttribute("placeholder","description");
    description.setAttribute("style","width:250px");
    divLabel.appendChild(description);
    insertBlankLine(divLabel);
    insertBlankLine(divLabel);
    
    
    var price=document.createElement("input");
    price.setAttribute("type","text");
    price.setAttribute("id","textPrice");
    price.setAttribute("placeholder","price");
    price.setAttribute("style","width:250px");
    divLabel.appendChild(price);
    insertBlankLine(divLabel);
    insertBlankLine(divLabel);
    
    var quantity=document.createElement("input");
    quantity.setAttribute("type","text");
    quantity.setAttribute("id","textQuantity");
    quantity.setAttribute("placeholder","quantity");
    quantity.setAttribute("style","width:250px");
    quantity.setAttribute("required","");
    divLabel.appendChild(quantity);
    insertBlankLine(divLabel);
    insertBlankLine(divLabel);
    
    var addBtn=document.createElement("button");
    addBtn.innerHTML="Add Product";
    addBtn.setAttribute("id","addToList");
    addBtn.setAttribute("style","margin-left: 35px;background-color: white;color: black;border: 2px solid #555555;");
    divLabel.appendChild(addBtn);
    
    var cancelBtn=document.createElement("button");
    cancelBtn.innerHTML="Cancel";
    cancelBtn.setAttribute("id","cancel");
    cancelBtn.setAttribute("style","margin-left: 10px;background-color: white;color: black;border: 2px solid #555555;");
    divLabel.appendChild(cancelBtn);
    insertBlankLine(divLabel);
    insertBlankLine(divLabel);
    divAddProduct.appendChild(divLabel);
    
    cancelBtn.addEventListener("click",function(event){
        flag=0;
        hideProductPanel(divLabel);
    });
    
    addBtn.addEventListener("click",function(event){
        if(checkValidation(textName.value,textDescription.value,textPrice.value,textQuantity.value))
            {
                flag=0;
                addProductToArray(divLabel);
                hideProductPanel(divLabel);
           }
    });
    
}


function updateProductPanel(id)
{
    hideAddNewProductLink();
    var index=getProductIndex(id);
    var divLabel=document.createElement("div");
    var labelProduct=document.createElement("label");
    labelProduct.innerHTML="Add New Product";
    labelProduct.setAttribute("style","margin-left:50px");
    divLabel.appendChild(labelProduct);
    insertBlankLine(divLabel);
    insertBlankLine(divLabel);
    
    var name=document.createElement("input");
    name.setAttribute("type","text");
    name.setAttribute("id","textName");
    name.setAttribute("placeholder","name of product");
    name.setAttribute("style","width:250px");
    name.value=productsArray[index].name;
    divLabel.appendChild(name);
    insertBlankLine(divLabel);
    insertBlankLine(divLabel);
    
    
    var description=document.createElement("textarea");
    description.setAttribute("id","textDescription");
    description.setAttribute("placeholder","description");
    description.setAttribute("style","width:250px");
    description.value=productsArray[index].description;
    divLabel.appendChild(description);
    insertBlankLine(divLabel);
    insertBlankLine(divLabel);
    
    
    var price=document.createElement("input");
    price.setAttribute("type","text");
    price.setAttribute("id","textPrice");
    price.setAttribute("placeholder","price");
    price.setAttribute("style","width:250px");
    price.value=productsArray[index].price;
    divLabel.appendChild(price);
    insertBlankLine(divLabel);
    insertBlankLine(divLabel);
    
    var quantity=document.createElement("input");
    quantity.setAttribute("type","text");
    quantity.setAttribute("id","textQuantity");
    quantity.setAttribute("placeholder","quantity");
    quantity.setAttribute("style","width:250px");
    quantity.value=productsArray[index].quantity;
    divLabel.appendChild(quantity);
    insertBlankLine(divLabel);
    insertBlankLine(divLabel);
    
    var updateBtn=document.createElement("button");
    updateBtn.innerHTML="Update";
    updateBtn.setAttribute("id","updateToList");
    updateBtn.setAttribute("style","margin-left: 35px;background-color: white;color: black;border: 2px solid #555555;");
    divLabel.appendChild(updateBtn);
    
    var cancelBtn=document.createElement("button");
    cancelBtn.innerHTML="Cancel";
    cancelBtn.setAttribute("id","cancel");
     cancelBtn.setAttribute("style","margin-left: 10px;background-color: white;color: black;border: 2px solid #555555;");
    divLabel.appendChild(cancelBtn);
    insertBlankLine(divLabel);
    insertBlankLine(divLabel);
    divAddProduct.appendChild(divLabel);
    
    cancelBtn.addEventListener("click",function(event){
        flag=0;
        hideProductPanel(divLabel);
    });
    
    updateBtn.addEventListener("click",function(event){
        if(checkValidation(textName.value,textDescription.value,textPrice.value,textQuantity.value))
            {
                   flag=0;
                   var productObj=new Object();
                   productObj.id=parseInt(id);
                   productObj.name=textName.value;
                   productObj.description=textDescription.value;
                   productObj.price=textPrice.value;
                   productObj.quantity=textQuantity.value;
                   productsArray.splice(index,1,productObj);
                   storeProducts();
                   replaceProductInDOM(productObj);
                   hideProductPanel(divLabel);
            }
    });
    
}