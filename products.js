
var fs=require("fs");
var express=require("express");
var app=express();
app.use(express.json());
app.use(express.urlencoded({isextended:false}));
app.use(express.static("public"));

app.use(function(req,res,next)
{
  console.log("m1 fired");
  next();
});
app.get("/products",function(req,res)
{
	let data=req.query;
	console.log(data);
    res.send("get");
});
app.post("/aAddProduct",function(req,res)
{
	console.log("chl geya");
	var bodydata=req.body;
	fs.readFile("file.txt",(err,fdata)=>
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			filedata=JSON.parse(fdata);
		    filedata.push(bodydata);
	fs.writeFile("file.txt",JSON.stringify(bodydata),(err,data)=>
	{
		if(err)
		{
			console.log(err);
		}
	});
	console.log(bodydata);

}
});
});

app.post("/cart",function(req,res)
{
	console.log("chl geya");
	var bodydata=req.body;
	fs.readFile("cart.txt",(err,fdata)=>
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			filedata=JSON.parse(fdata);
		    filedata.push(bodydata);
	fs.writeFile("cart.txt",JSON.stringify(bodydata),(err,data)=>
	{
		if(err)
		{
			console.log(err);
		}
	});
	console.log(bodydata);

}
});
});


app.listen(4000,function(error)
{
  console.log("start at 4000");
});