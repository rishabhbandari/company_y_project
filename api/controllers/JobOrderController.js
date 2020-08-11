/**
 * JobOrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

   addJobsOrder : function (req, res) {
        const jobOder = {
            id: req.body.id,
            partid: req.body.partid,
            userid: req.body.userid,
            quantity: req.body.quantity,
        };
        console.log("__jobOder", jobOrder);
        sails.models.joborder.create(jobOder).exec((err,jobs) => {
            if (err) {
                res.json({ error: true, message: err });
            } else {
                res.send(jobs);
            }
        });

    }
};

