  var products = [];
  var cart=[];
var productId = 1;
var flag=0;
var flag1=0;
var flag3=0;
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var aAddProduct = document.getElementById("aAddProduct");

var d=JSON.parse(localStorage.getItem("pr"));
if(d)
{
 for(var i=0;i<d.length;i++)
 {
 
	  var objProduct = new Object();
	
	objProduct.Id = productId;
 	objProduct.Name = d[i].Name;
    objProduct.Desc = d[i].Desc;
	objProduct.Price = d[i].Price;
	objProduct.Quantity = d[i].Quantity;
    products.push(objProduct);
	addProducttoDOM(objProduct);
	productId++;
 }
}
 if(d1)
 {
 var d1=JSON.parse(localStorage.getItem("cart"));
 for(var i=0;i<d1.length;i++)
 {
 
	  var objProduct = new Object();
	
	objProduct.Id = d1[i].Id;
 	objProduct.Name = d1[i].Name;
    objProduct.Desc = d1[i].Desc;
	objProduct.Price = d1[i].Price;
	objProduct.Quantity = d1[i].Quantity;
    cart.push(objProduct);
 }
}

aAddProduct.addEventListener("click", function(event)
									  {  
									  	if(flag3==0)
									  	{
									  		flag3=1;
									  		hideAddNewProductLink(aAddProduct);
									    createNewProductPanel(); 
									}
									  }
						    );
	
function addProducttoArray()
{
	var objProduct = new Object();
	
	objProduct.Id = productId;
 	objProduct.Name = document.getElementById("txtProductName").value;
 	if(objProduct.Name.length==0)
	{//unHideAddNewProductLink();
      alert("Name cant be left empty");
		return;}
    objProduct.Desc = document.getElementById("txtProductDesc").value;
    if(objProduct.Desc.length==0)
	{//unHideAddNewProductLink();
      alert("desc cant be left empty");
		return;}
	objProduct.Price = document.getElementById("txtProductPrice").value;
	if(objProduct.Price.length==0)
	{//unHideAddNewProductLink();
      alert("price cant be left empty");
		return;}
		if(objProduct.Price<0)
		{
			//unHideAddNewProductLink();
			alert("Please Enter Valid Price");
			return;
		}
	objProduct.Quantity = document.getElementById("txtProductQuantity").value;
	if(objProduct.Quantity<0)
		{
			//unHideAddNewProductLink();
			alert("Please Enter Valid Quantity");
			return;
		}
    products.push(objProduct);
    flag3=0;
	addProducttoDOM(objProduct);
    deleteNewProductPanel();
	productId++;
	 var strArray =  JSON.stringify(products);
	  addtoserver(products);
	  localStorage.setItem("pr",strArray);
}


function addProducttoDOM(objProduct)
{  	
	var divProduct = document.createElement("div");
	divProduct.setAttribute("id", productId);
	console.log(productId);
	 var t = document.createTextNode("Name = ");
	var lblProductName = document.createElement("label");
	lblProductName.innerHTML = objProduct.Name;
     divProduct.appendChild(t);
    divProduct.appendChild(lblProductName);
	insertBlankLine(divProduct);
	 var c = document.createTextNode("Desc = ");
	var lblProductDesc = document.createElement("label");
	lblProductDesc.innerHTML = objProduct.Desc;
	divProduct.appendChild(c);
    divProduct.appendChild(lblProductDesc);
insertBlankLine(divProduct);
 var a = document.createTextNode("Price = ");
		var lblProductPrice = document.createElement("label");
	lblProductPrice.innerHTML = objProduct.Price;
	divProduct.appendChild(a);
    divProduct.appendChild(lblProductPrice);
    insertBlankLine(divProduct);
     var b = document.createTextNode("Quantity = ");
			var lblProductQuantity = document.createElement("label");
	lblProductQuantity.innerHTML = objProduct.Quantity;
	divProduct.appendChild(b);
    divProduct.appendChild(lblProductQuantity);
    insertBlankLine(divProduct);
	var aDelete = document.createElement("button");
	aDelete.innerHTML = "Delete";
	divProduct.appendChild(aDelete);
	aDelete.addEventListener("click",function(event)
									  {
										   var targetParent = event.target.parentNode;
										   var selectedProductIndex = getProductIndex(parseInt(targetParent.id)); 
										   //console.log(selectedProductIndex);
										   removeFromProductsArray(selectedProductIndex);
										   targetParent.parentNode.removeChild(targetParent);
									  }
							);
												
	var cart = document.createElement("button");
	
	cart.innerHTML = "ADD TO CART";
	divProduct.appendChild(cart);
	cart.addEventListener("click",function(event)
									  {
									   
										   var targetParent1 = event.target.parentNode;
										   var selectedProductIndex1 = getProductIndex(parseInt(targetParent1.id)); 
										   console.log(targetParent1);
										   console.log(selectedProductIndex1);
										   var o=targetParent1.childNodes;
										   console.log(o[11].textContent);
										   addToCart(targetParent1,selectedProductIndex1); 
									  }
							);
							
    lblProductName.addEventListener("click",function(event)
									  {
										 var selectedProductIndex = getProductIndex(parseInt(event.target.parentNode.id));
										 getProductDetails(selectedProductIndex);
									  }
							     );
								 					 
	var up = document.createElement("button");
	up.innerHTML = "UPDATE";
	divProduct.appendChild(up);

	up.addEventListener("click",function(event)
									  {
									  	  var targetParent = event.target.parentNode;
										   var selectedProductIndex = getProductIndex(parseInt(targetParent.id)); 
									  		// var targetParent = event.target.parentNode.parentNode;
										    var i= parseInt(targetParent.id); 
										        var t=getProductIndex(i);
											   paneldom1(t,targetParent);
									  }
							);										 
									  
	divListProducts.appendChild(divProduct);
	flag=0;
	//unHideAddNewProductLink();
}
function paneldom1(i,tp)
{
	//hideAddNewProductLink();

	/* Label - Product Quantity */ 
	var lblAddProduct1 = document.createElement("label");
	lblAddProduct1.innerHTML = "Update Product";
	lblAddProduct1.setAttribute("style","font-weight:bold");
    divAddProduct.appendChild(lblAddProduct1);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Name */ 
	var txtProductName1 = document.createElement("input");
	txtProductName1.setAttribute("type","text");
	txtProductName1.setAttribute("id","txtProductName1");
    txtProductName1.setAttribute("value",products[i].Name);
    txtProductName1.setAttribute("placeholder", "Enter the product name");	
	txtProductName1.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductName1);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Description */ 
	var txtProductDesc1 = document.createElement("input");
	txtProductDesc1.setAttribute("id","txtProductDesc1");
	txtProductDesc1.setAttribute("value",products[i].Desc);
    txtProductDesc1.setAttribute("placeholder", "Enter the product description");	
	txtProductDesc1.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductDesc1);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* TextBox - Product Price */ 
	var txtProductPrice1 = document.createElement("input");
	txtProductPrice1.setAttribute("type","Number");
	txtProductPrice1.setAttribute("id","txtProductPrice1");
	txtProductPrice1.setAttribute("value",products[i].Price);
    txtProductPrice1.setAttribute("placeholder", "Enter the product price");	
	txtProductPrice1.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductPrice1);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Quantity */ 
	var txtProductQuantity1 = document.createElement("input");
	txtProductQuantity1.setAttribute("type","Number");
	txtProductQuantity1.setAttribute("id","txtProductQuantity1");
	txtProductQuantity1.setAttribute("value",products[i].Quantity);
    txtProductQuantity1.setAttribute("placeholder", "Enter the product quantity");	
	txtProductQuantity1.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductQuantity1);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* Button - Add Product */ 
	var btnAddButton1 = document.createElement("button");
	btnAddButton1.setAttribute("id","btnAddButton1");
	btnAddButton1.innerHTML = "UPDATE";
	divAddProduct.appendChild(btnAddButton1);		
		
    btnAddButton1.addEventListener("click", function(event)
											{
												var i= parseInt(tp.id); 
										       var t=getProductIndex(i);
											   console.log(i);
												upar(i,tp);
												deleteNewProductPanel();
											}
								 );	
}
function upar(t,tp)
{
	console.log(t);
	var i;
	for( i=0;i<products.length;i++)
	{
		if(products[i].Id==t){
			break;
		}
	}
	console.log(i);
	//console.log(products[t]+"   "+t);
	products[i].Name=document.getElementById("txtProductName1").value;
	if(products[i].Name.length==0)
	{unHideAddNewProductLink();
      alert("Name cant be left empty");
		return;}
	products[i].Desc=document.getElementById("txtProductDesc1").value;
	if(products[i].Desc.length==0)
	{unHideAddNewProductLink();
      alert("Description cant be left empty");
		return;}
		console.log(products[i].Price);
		console.log(document.getElementById("txtProductPrice1").value);
	products[i].Price=document.getElementById("txtProductPrice1").value;
	if(products[i].Price.length==0)
	{unHideAddNewProductLink();
      alert("price cant be left empty");
		return;}
	products[i].Quantity=parseInt(document.getElementById("txtProductQuantity1").value);
	if(products[i].Quantity.length==0)
	{unHideAddNewProductLink();
      alert("Quantity cant be left empty");
		return;}
	var k=-1;
	for(k=0;k<cart.length;k++)
	{
		if(cart[k].Id==t)
		{
			break;
		}
	}
	
	var jso=JSON.stringify(products);
	addtoserver(products);
     localStorage.setItem("pr",jso);
	 
	 addProducttoDOM1(i,tp);
}

function addProducttoDOM1(i,p)
{
	console.log(divListProducts.childNodes);
	console.log(i);
	console.log(p.childNodes);
	var k=p.childNodes;
	k[1].textContent=products[i].Name;
	k[4].textContent=products[i].Desc;
	k[7].textContent=products[i].Price;
	k[10].textContent=products[i].Quantity;
	//unHideAddNewProductLink();
}


function addToCart(p,i)
{
	console.log(products[i].Id);
	if(cart.length>=0)
	{
		for(var j=0;j<cart.length;j++)
		{
            if(products[i].Id==cart[j].Id && products[i].Name==cart[j].Name && products[i].Desc==cart[j].Desc && products[i].Price==cart[j].Price)
            {
            	if(products[i].Quantity!=0)
            	{
            		var g=p.childNodes;
            		console.log(cart[j].Quantity);
              cart[j].Quantity++;
              cart[j].Total=cart[j].Quantity*cart[j].Price;
              products[i].Quantity--;
              g[10].textContent=g[10].textContent-1;
              flag1=1;
               break;
                }
            else
            {
                 alert("Out of stock");
            }
            }
            else
            {
            	flag1=0;
            }
        }
    }
if(flag1==0)
{
            		var d=new Object();
	d.Id=products[i].Id;
	d.Name=products[i].Name;
	d.Desc=products[i].Desc;
	d.Price=products[i].Price;
	var h=products[i].Quantity-1;
		var g=p.childNodes;
	d.Quantity=products[i].Quantity-h;
	g[10].textContent=g[10].textContent-1;
	products[i].Quantity--;
    d.Total=d.Quantity*d.Price;
	cart.push(d);
}

	var jso=JSON.stringify(products);
	addtoserver(products);
     localStorage.setItem("pr",jso);
	var str =  JSON.stringify(cart);
	  localStorage.setItem("cart",str);
}
function getProductIndex(id) 
{
    for (var i = 0; i < products.length; i++) 
	{
        if (products[i].Id == id) 
			return i;
    }
} 
function getProductIndex1(ide) 
{
    for (var i = 0; i < cart.length; i++) 
	{
        if (cart[i].Id == ide) 
			return i;
    }
} 

function getProductDetails(selectedProductIndex)
{
  console.log( "Name : " + products[selectedProductIndex].Name + "  Desc: " + products[selectedProductIndex].Desc + 
               "   Price : " + products[selectedProductIndex].Price + "  Quantity: " + products[selectedProductIndex].Quantity);	
}

function removeFromProductsArray(selectedProductIndex)
{
	console.log(selectedProductIndex);
	
	products.splice(selectedProductIndex,1);
	console.log(products);
	 var strArray =  JSON.stringify(products);
	 addtoserver(products);
	  localStorage.setItem("pr",strArray);
	 productId--;
}

function deleteNewProductPanel()
{
   var childNodes = divAddProduct.childNodes;
   for (var i = 0; childNodes.length > 0;) 
   {
     divAddProduct.removeChild(childNodes[i]);
   }
}

function hideAddNewProductLink(i)
{
   i.setAttribute("style","visibility:hidden");
}

function unHideAddNewProductLink(j)
{
   j.setAttribute("style","visibility:visible");
}

function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}

function createNewProductPanel()
{
	var lblAddProduct = document.createElement("label");
	lblAddProduct.innerHTML = "Add New Product";
	lblAddProduct.setAttribute("style","font-weight:bold");
    divAddProduct.appendChild(lblAddProduct);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	var txtProductName = document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","txtProductName");
    txtProductName.setAttribute("placeholder", "Enter the product name");	
	txtProductName.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductName);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	var txtProductDesc = document.createElement("textarea");
	txtProductDesc.setAttribute("id","txtProductDesc");
    txtProductDesc.setAttribute("placeholder", "Enter the product description");	
	txtProductDesc.setAttribute("style","width:250px ; height:50px");
	divAddProduct.appendChild(txtProductDesc);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	var txtProductPrice = document.createElement("input");
	txtProductPrice.setAttribute("type","Number");
	txtProductPrice.setAttribute("id","txtProductPrice");
    txtProductPrice.setAttribute("placeholder", "Enter the product price");	
	txtProductPrice.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductPrice);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","Number");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
    txtProductQuantity.setAttribute("placeholder", "Enter the product quantity");	
	txtProductQuantity.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductQuantity);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	 
	var btnAddButton = document.createElement("button");
	btnAddButton.setAttribute("id","btnAddButton");
	btnAddButton.innerHTML = "Add Product";
	divAddProduct.appendChild(btnAddButton);		
		
    btnAddButton.addEventListener("click", function(event)
											{
												addProducttoArray();
											 unHideAddNewProductLink(aAddProduct);
											}
								 );	
}

function showCart()
{
	var a=document.getElementById("cartlist");
	a.innerHTML="CART"
	var d1=JSON.parse(localStorage.getItem("cart"));
	if(d1)
	{
	for(var i=0;i<d1.length;i++)
	{
	var b=document.createElement("div");
	var c=document.createElement("p");
	var lk=document.createElement("h4")
	var N=document.createTextNode("Name="+d1[i].Name+" ");
	var D=document.createTextNode("Desc="+d1[i].Desc+" ");
	var P=document.createTextNode("Price="+d1[i].Price+" ");
	var Q=document.createTextNode("Quantity="+d1[i].Quantity+" ");
	var total=document.createTextNode("Total="+d1[i].Total+" ");
	lk.appendChild(N);
	lk.appendChild(D);
	lk.appendChild(P);
	lk.appendChild(Q);
	lk.appendChild(total);

var aDelete = document.createElement("button");
	aDelete.innerHTML = "Delete";
	lk.appendChild(aDelete);
	aDelete.addEventListener("click",function(event)
									  {
										   var targetParent = event.target.parentNode;
										   var selectedProductIndex = getProductIndex1(parseInt(targetParent.id)); 
										   console.log(selectedProductIndex);
										   console.log(targetParent);
										   removeFromCartArray(selectedProductIndex);
										   targetParent.parentNode.removeChild(targetParent);
									  }
							);

	c.appendChild(lk);
	b.appendChild(c);
	a.appendChild(b);
	}
}
}
function removeFromCartArray(selectedProductIndex)
{
	console.log(selectedProductIndex);
	cart.splice(selectedProductIndex,1);
	console.log(cart);
	 var strArray =  JSON.stringify(cart);
	 // addtoserver(products);
	  localStorage.setItem("cart",strArray);
}

		var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("demo").innerHTML = this.responseText;
      console.log(this.responseText);
    }
  };

function addtoserver(i)
{
	xhttp.open("POST","http://localhost:4000/aAddProduct"); 
xhttp.setRequestHeader("Content-Type","application/json");
xhttp.send(JSON.stringify(i));
}