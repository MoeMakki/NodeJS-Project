const product = require("../models/products");

const getAddProduct = (req,res,next)=>{
    res.render("../views/admin/add-product.ejs" , {PageTitle : 'Add Product' , isAuthenticated:req.session.isAuthenticated , isAdmin:req.session.isAdmin});
}

const postAddProduct = (req,res,next)=>{
    Pname = req.body.name;
    price = req.body.price;
    description = req.body.desc;
    imageURL = req.body.url;
    const newProduct = new product({
        name:Pname,
        price:price,
        description:description,
        imageURL:imageURL,

    });
    newProduct.save();
    res.redirect("/admin/products");
}

const getProducts = (req,res,next) =>{
    product.find().then((allProducts)=>{
    
        res.render("../views/admin/products.ejs" , {PageTitle : 'All Products' , products:allProducts , isAuthenticated:req.session.isAuthenticated , isAdmin:req.session.isAdmin})


    }).catch((allProducts)=>{
        res.send("No Products found");
    })
    
}

const getDeleteProduct = (req,res,next) =>{
    const pID = req.params.ProductID;
    product.findByIdAndDelete(pID).then((result)=>{
        res.redirect("/admin/products");
    }).catch((result)=>{
        res.send("ID was not found in the database");
    })

}

const getEditProduct = (req,res,next) =>{
    const pID = req.params.ProductID;
    product.findById(pID).then((found_product)=>{
        res.render("../views/admin/edit-product.ejs",{PageTitle : 'Edit Product' , products:found_product , isAuthenticated:req.session.isAuthenticated , isAdmin:req.session.isAdmin})
    })
    
}

const postEditProduct = (req,res,next) =>{
    Pname = req.body.name;
    price = req.body.price;
    description = req.body.desc;
    imageURL = req.body.url;
    id = req.body.id;
    product.findById(id).then((found_product)=>{
        found_product.name = Pname;
        found_product.price = price;
        found_product.description = description;
        found_product.imageURL = imageURL;
        found_product.save().then(()=>{
            res.redirect("/admin/products");
        })
    })
}

module.exports = {getAddProduct , postAddProduct , getProducts , getDeleteProduct , getEditProduct , postEditProduct}