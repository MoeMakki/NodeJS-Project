const product = require("../models/products");
const users = require("../models/users");
const order = require("../models/orders");


const getHome = (req,res,next) =>{
    res.render("../views/shop/index.ejs" , {PageTitle : 'Shop Home' , isAuthenticated:req.session.isAuthenticated , isAdmin:req.session.isAdmin});
}

const getCart = (req,res,next) =>{
    users.findById(req.session.user_id).then((user)=>{ 
        user.populate({path:'cart', populate:{path:'items.productId'}})
        .then(userPopulated=>{const products = userPopulated.cart.items;
            return res.render('../views/shop/cart.ejs', {PageTitle:'Shopping cart',products:products, isAuthenticated:req.session.isAuthenticated , isAdmin:req.session.isAdmin});        
        
        });   
    
    });
     
    };
    

    const postCart = (req, res, next) => {
        const productId = req.body.productId; 
    
        users.findById(req.session.user_id).then((user) => {
            const existingProductIndex = user.cart.items.findIndex(
                (item) => item.productId.toString() === productId
            );
    
            if (existingProductIndex >= 0) {
                
                user.cart.items[existingProductIndex].quantity += 1;
            } else {
                
                user.cart.items.push({ productId: productId, quantity: 1 });
            }
            console.log("Existing Product Index:", existingProductIndex);
            console.log("Cart Items:", user.cart.items);
    
            
            return user.save();
            
        })
        .then(() => {
            
            res.redirect('/cart');
        })
    }


const getProducts = (req,res,next) =>{
     product.find().then((allProducts)=>{
        
            res.render("../views/shop/products.ejs" , {PageTitle : 'Products' , products:allProducts , isAuthenticated:req.session.isAuthenticated , isAdmin:req.session.isAdmin})
    
    
        }).catch((allProducts)=>{
            res.send("No Products found");
        })
        
}

const postCartDeleteitems = (req,res,next) =>{
    const productId = req.body.id;
     users.findById(req.session.user_id).then((user)=>{ 
        user.cart.items= user.cart.items.filter(item=>{ 
            return item.productId.toString() != productId.toString(); 
        });
        console.log(user.cart.items);
        user.save();
        return res.redirect('/cart');
});
}
const createOrder = (req, res, next) => {
    users.findById(req.session.user_id)
        .then((user) => {
            req.session.items = user.cart.items;
            const newOrder = new order({
                user: {
                    userId: user._id,
                    username: user.username,
                },
                items: user.cart.items, 
            });

            return newOrder.save().then(() => {
                user.cart.items = []; 
                return user.save();
            });
        })
        .then(() => {
            res.redirect('/orders'); 
        })
    }
    const getOrders = (req, res, next) => {
        order.find({ 'user.userId': req.session.user_id })
            .populate('items.productId')  // Populate product details
            .then((orders) => {
                res.render("../views/shop/orders.ejs", {
                    PageTitle: 'My Orders',
                    orders: orders,
                    isAuthenticated: req.session.isAuthenticated,
                    isAdmin: req.session.isAdmin
                });
})
}

const getAboutUs = (req,res,next) =>{
    res.render("../views/shop/aboutus.ejs",{PageTitle : "About us" , isAuthenticated:req.session.isAuthenticated,isAdmin:req.session.isAdmin});
}

module.exports = {getHome , getCart , getProducts , postCart , postCartDeleteitems , createOrder , getOrders , getAboutUs}