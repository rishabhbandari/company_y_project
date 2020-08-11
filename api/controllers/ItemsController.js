/**
 * JobsController
 *
 * @description :: This controller is handling all the CRUD operations for jobs required for Company X
 *
 */

module.exports = {
    getItems: function (req, res) {
        sails.models.items.find({}).exec((err, items) => {
            if (err) {
                throw err;
            }
            items.length === 0
                ?
                res.send({ error: 'items table does not have any records' })
                :
                //res.send(jobs);
                res.view('pages/viewItems', { items: items });
        });
    },
   

    addItems: function (req, res) {
        console.log("1", req.body);
        sails.models.items
            .find({
                item_id: req.body.item_id,
            })
            .exec((err, item) => {
                if (err) {
                    console.log("Error in fetching item ", err);
                    res.send({
                        error: true,
                        message: "Error in fetching the item.",
                    });
                    throw err;
                } else {
                    console.log("3");

                    const item = {
                        item_id: req.body.item_id,
                        item_name: req.body.item_name,
                        qoh: req.body.qoh,
                        price: req.body.price,
                        description: req.body.description,
                        
                    };
                    console.log("__item", item);
                    sails.models.items.create(item).exec((err) => {
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
    getDeleteItems: function (req, res) {

        sails.models.items.find({}).exec((err, items) => {
            if (err) {
                throw err;
            }
            items.length === 0
                ?
                res.send({ error: 'Items table does not have any records' })
                :
                
                res.view('pages/deleteItems', { items: items });
        });
    },
    deleteItems: function (req, res) {
        console.log(req.body.item_id);
        let item_id_param = { item_id: req.body.item_id };

        sails.models.items.destroy(item_id_param).exec(err => {
            if (err) {
                res.send({ success: false, isError: true, message: 'Error is deleting Item records' });
            } else {
                sails.models.items.find({}).exec((err, items) => {
                    if (err) {
                        throw err;
                    }
                    items.length === 0
                        ?
                        res.send({ error: 'items table does not have any records' })
                        :
                        //res.send(jobs);
                        res.view('pages/deleteItems', { items: items });
                });
            }
        });
    },
    getupdateItems: function (req, res) {

        sails.models.items.find({}).exec((err, items) => {
            if (err) {
                throw err;
            }
            items.length === 0
                ?
                res.send({ error: 'items table does not have any records' })
                :
               
                res.view('pages/updateItems', { items: items });
        });
    },
    updateItems: function (req, res) {
        const item = {
            qoh: req.body.qoh,
        };
        console.log("Update ----->", req.body);
        sails.models.items
            .update({ item_id: req.body.item_id, item_name: req.body.item_name }, item)
            .exec((err) => {
                if (err) {
                    res.send("Item Name does not exist");
                } else {
                    sails.models.items.find({}).exec((err, items) => {
                        if (err) {
                            throw err;
                        }
                        items.length === 0
                            ?
                            res.send({ error: 'Items table does not have any records' })
                            :
                            
                            res.view('pages/updateItems', { items: items });
                    });
                }
            });
    }

};
