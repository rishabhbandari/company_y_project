
module.exports = {
    getProducts: function (req, res) {
        sails.models.products.find({}).exec((err, products) => {
            if (err) {
                throw err;
            }
            products.length === 0
                ?
                res.send({ error: 'products table does not have any records' })
                :
                res.view('pages/viewProducts', { products: products });
        });
    },

    addProducts: function (req, res) {
        console.log("Entering add Products")
        sails.models.products
            .find({
                id: req.body.product_id,
            }).exec((err, product) => {
                if (err) {
                    console.log("Error in fetching job inside addProduct", err);
                    res.send({
                        error: true,
                        message: "This Product Id already exist in Database",
                    });
                    throw err;
                } else {

                    const product = {
                        id: req.body.product_id,
                        product_name: req.body.product_name,
                        product_description: req.body.product_description,
                        product_quantity: req.body.product_quantity,
                        product_price: req.body.product_price,
                        product_image: req.body.product_image
                    };
                    console.log("Product", product);
                    sails.models.products.create(product).exec((err) => {
                        if (err) {
                            res.json({ error: true, message: "Error in adding product into database" });
                        } else {
                            console.log("Product successfully added to Database");

                            res.redirect("/view_products");
                        }
                    });
                }
            });
    },
    getDeleteProducts: function (req, res) {
        console.log("trying to delete");

        sails.models.products.find({}).exec((err, products) => {
            if (err) {
                throw err;
            }
            products.length === 0
                ?
                res.send({ error: 'products table does not have any records' })
                :
                //res.send(products);
                res.view('pages/deleteProducts', { products: products });
        });
    },
    deleteProducts: function (req, res) {
        console.log(req.body.product_id);
        let prod_param = { id: req.body.product_id };

        sails.models.products.destroy(prod_param).exec(err => {
            if (err) {
                res.send({ success: false, isError: true, message: 'Error is deleting Job records' });
            } else {
                sails.models.products.find({}).exec((err, products) => {
                    if (err) {
                        throw err;
                    }
                    products.length === 0
                        ?
                        res.send({ error: 'products table does not have any records' })
                        :
                        //res.send(products);
                        res.view('pages/deleteProducts', { products: products });
                });
            }
        });
    },
    getUpdateProducts: function (req, res) {

        sails.models.products.find({}).exec((err, products) => {
            if (err) {
                throw err;
            }
            products.length === 0
                ?
                res.send({ error: 'products table does not have any records' })
                :
                //res.send(products);
                res.view('pages/updateProducts', { products: products });
        });
    },
    updateProducts: function (req, res) {
        const prod = {
            product_quantity: req.body.product_quantity,
        };
        console.log("Update ----->", req.body);
        sails.models.products
            .update({ id: req.body.product_id, product_name: req.body.product_name }, prod)
            .exec((err) => {
                if (err) {
                    res.send("Prod Name does not exist");
                } else {
                    sails.models.products.find({}).exec((err, products) => {
                        if (err) {
                            throw err;
                        }
                        products.length === 0
                            ?
                            res.send({ error: 'products table does not have any records' })
                            :
                            //res.send(products);
                            res.view('pages/updateProducts', { products: products });
                    });
                }
            });
    },
    

    
    getViewproductsById: function (req, res) {
        let prod_param = req.param('product_id');

        sails.models.products.find({}).where({ 'id': req.param('product_id'),  }).exec((err, products) => {
            if (err) {
                throw err;
            }
            products.length === 0
                ?
                res.send({ error: 'products table does not have any records' })
                :
                //es.send(products);
                res.view('pages/viewproducts', { products: products });
        });
    },

    getproductsById: function (req, res) {
        let prod = {
            id: req.body.product_id
        };

        sails.models.products.find(prod).exec((err, products) => {
            if (err) {
                throw err;
            }
            products.length === 0
                ?
                res.send({ error: 'products table does not have any records' })
                :
                res.send(products);
        });
    },
    getStatusById: function (req, res) {
        let prod = {
            id: req.body.product_id,
        };
        
        var red_qty;
        sails.models.products.find(prod).exec((err, products) => {
            if (err) {
                throw err;
            }
            products.length === 0
                ?
                res.send({ error: 'products table does not have any records' })
                :

                red_qty = (products[0].product_quantity - req.body.order_quantity)
                sails.log(red_qty,"-----------")
                if (red_qty > 0){
                    
                    sails.models.products
                    .update({ id: req.body.product_id },{product_quantity:products[0].product_quantity-req.body.order_quantity})
                    .exec((err) => {
                        if (err) {
                            sails.log(err)
                            res.send("Prod Name does not exist or the quantity is not available");
                        } else {
                            sails.log(typeof req.body.order_quantity,req.body.order_quantity,"---2",products[0].product_price)

                            const iv = {
                                id: req.body.id  ,
                                product_id: req.body.product_id,
                                user_id: req.body.user_id,
                                order_quantity: req.body.order_quantity,
                                order_status: "success",
                                order_amount: req.body.order_quantity * products[0].product_price
                            };
                            // console.log("__job", job);
                            sails.models.invoice.create(iv).exec((err) => {
                                if (err) {
                                    // res.json({ error: true, message: err });
                                    sails.log(err)
                                } else {
                                    console.log("___GET products CALLED");
        
                                    res.send("invoice created");
                                }
                            });
                            
                        }
                    });
                }
                else{
                    res.send("qty not available.")
                }

                // .exec((err) => {
                //     if (err) {
                //         res.send("Prod Name does not exist or the quantity is not available");
                //         sails.models.invoice
                //         .update({ id: req.body.product_id, product_name: req.body.product_name }, bad)
                //         .exec((err) => {
                //             if (err) {
                //                 res.send("Prod Name does not exist");
                //             }
                //             else{

                //             }
                //         }
                //     }); 
                        
                
                        // else {
                        //     sails.models.invoice
                        //     .update({ id: req.body.product_id, product_name: req.body.product_name }, good)
                        //     .exec((err) => {
                        //         if (err) {
                        //             res.send("Prod Name does not exist");
                        //         } else {
                        //             sails.models.products.find({}).exec((err, products) => {
                        //                 if (err) {
                        //                     throw err;
                        //                 }
                        //                 });
                        //              }
                            // );
                
            });
    },
/*
    addproducts: function (req, res) {
        console.log("1", req.body);
        sails.models.products
            .find({
                partid: req.body.partid,
            })
            .exec((err, job) => {
                if (err) {
                    console.log("Error in fetching job inside addjob", err);
                    res.send({
                        error: true,
                        message: "Error in fetching the job.",
                    });
                    throw err;
                } else {
                    console.log("3");

                    const job = {
                        id: req.body.id,
                        partid: req.body.partid,
                        quantity: req.body.quantity,
                    };
                    console.log("__job", job);
                    sails.models.products.create(job).exec((err) => {
                        if (err) {
                            res.json({ error: true, message: err });
                        } else {
                            console.log("___GET products CALLED");

                            res.redirect("/view_products");
                        }
                    });
                }
            });
    },
    
    
*/
};
