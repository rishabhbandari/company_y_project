
module.exports = {
    getitems: function (req, res) {
        sails.models.items.find({}).exec((err, items) => {
            if (err) {
                throw err;
            }
            items.length === 0
                ?
                res.send({ error: 'items table does not have any records' })
                :
                res.view('pages/viewitems', { items: items });
        });
    },

    additems: function (req, res) {
        console.log("Entering add items")
        sails.models.items
            .find({
                id: req.body.item_id,
            }).exec((err, item) => {
                if (err) {
                    console.log("Error in fetching job inside additem", err);
                    res.send({
                        error: true,
                        message: "This item Id already exist in Database",
                    });
                    throw err;
                } else {

                    const item = {
                        id: req.body.item_id,
                        item_name: req.body.item_name,
                        item_description: req.body.item_description,
                        item_quantity: req.body.item_quantity,
                        item_price: req.body.item_price,
                        item_image: req.body.item_image
                    };
                    console.log("item", item);
                    sails.models.items.create(item).exec((err) => {
                        if (err) {
                            res.json({ error: true, message: "Error in adding item into database" });
                        } else {
                            console.log("item successfully added to Database");

                            res.redirect("/view_items");
                        }
                    });
                }
            });
    },
    getDeleteitems: function (req, res) {
        console.log("trying to delete");

        sails.models.items.find({}).exec((err, items) => {
            if (err) {
                throw err;
            }
            items.length === 0
                ?
                res.send({ error: 'items table does not have any records' })
                :
                //res.send(items);
                res.view('pages/deleteitems', { items: items });
        });
    },
    deleteitems: function (req, res) {
        console.log(req.body.item_id);
        let prod_param = { id: req.body.item_id };

        sails.models.items.destroy(prod_param).exec(err => {
            if (err) {
                res.send({ success: false, isError: true, message: 'Error in deleting Job records' });
            } else {
                sails.models.items.find({}).exec((err, items) => {
                    if (err) {
                        throw err;
                    }
                    items.length === 0
                        ?
                        res.send({ error: 'items table does not have any records' })
                        :
                        //res.send(items);
                        res.view('pages/deleteitems', { items: items });
                });
            }
        });
    },
    getUpdateitems: function (req, res) {

        sails.models.items.find({}).exec((err, items) => {
            if (err) {
                throw err;
            }
            items.length === 0
                ?
                res.send({ error: 'items table does not have any records' })
                :
                //res.send(items);
                res.view('pages/updateitems', { items: items });
        });
    },
    updateitems: function (req, res) {
        const prod = {
            item_quantity: req.body.item_quantity,
        };
        console.log("Update ----->", req.body);
        sails.models.items
            .update({ id: req.body.item_id, item_name: req.body.item_name }, prod)
            .exec((err) => {
                if (err) {
                    res.send("Prod Name does not exist");
                } else {
                    sails.models.items.find({}).exec((err, items) => {
                        if (err) {
                            throw err;
                        }
                        items.length === 0
                            ?
                            res.send({ error: 'items table does not have any records' })
                            :
                            //res.send(items);
                            res.view('pages/updateitems', { items: items });
                    });
                }
            });
    },
    

    
    getViewitemsById: function (req, res) {
        let prod_param = req.param('item_id');

        sails.models.items.find({}).where({ 'id': req.param('item_id'),  }).exec((err, items) => {
            if (err) {
                throw err;
            }
            items.length === 0
                ?
                res.send({ error: 'items table does not have any records' })
                :
                //es.send(items);
                res.view('pages/viewitems', { items: items });
        });
    },

    getitemsById: function (req, res) {
        let prod = {
            id: req.body.item_id
        };

        sails.models.items.find(prod).exec((err, items) => {
            if (err) {
                throw err;
            }
            items.length === 0
                ?
                res.send({ error: 'items table does not have any records' })
                :
                res.send(items);
        });
    },
    getStatusById: function (req, res) {
        let prod = {
            id: req.body.item_id,
        };
        
        var red_qty;
        sails.models.items.find(prod).exec((err, items) => {
            if (err) {
                throw err;
            }
            items.length === 0
                ?
                res.send({ error: 'items table does not have any records' })
                :

                red_qty = (items[0].item_quantity - req.body.order_quantity)
                sails.log(red_qty,"-----------")
                if (red_qty > 0){
                    
                    sails.models.items
                    .update({ id: req.body.item_id },{item_quantity:items[0].item_quantity-req.body.order_quantity})
                    .exec((err) => {
                        if (err) {
                            sails.log(err)
                            res.send("Prod Name does not exist or the quantity is not available");
                        } else {
                            sails.log(typeof req.body.order_quantity,req.body.order_quantity,"---2",items[0].item_price)

                            const iv = {
                                id: req.body.id  ,
                                item_id: req.body.item_id,
                                user_id: req.body.user_id,
                                order_quantity: req.body.order_quantity,
                                order_status: "success",
                                order_amount: req.body.order_quantity * items[0].item_price
                            };
                            // console.log("__job", job);
                            sails.models.invoice.create(iv).exec((err) => {
                                if (err) {
                                    // res.json({ error: true, message: err });
                                    sails.log(err)
                                } else {
                                    console.log("___GET items CALLED");
        
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
                //         .update({ id: req.body.item_id, item_name: req.body.item_name }, bad)
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
                        //     .update({ id: req.body.item_id, item_name: req.body.item_name }, good)
                        //     .exec((err) => {
                        //         if (err) {
                        //             res.send("Prod Name does not exist");
                        //         } else {
                        //             sails.models.items.find({}).exec((err, items) => {
                        //                 if (err) {
                        //                     throw err;
                        //                 }
                        //                 });
                        //              }
                            // );
                
            });
    },
/*
    additems: function (req, res) {
        console.log("1", req.body);
        sails.models.items
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
                    sails.models.items.create(job).exec((err) => {
                        if (err) {
                            res.json({ error: true, message: err });
                        } else {
                            console.log("___GET items CALLED");

                            res.redirect("/view_items");
                        }
                    });
                }
            });
    },
    
    
*/
};
