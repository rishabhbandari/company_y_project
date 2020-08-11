/**
 * Route Mappings
 * This file demonstrate all the routes for web service endpoints
 * copyright : Group-19 Company X
 * @author : Shakuntala Khatri
 */

module.exports.routes = {

  '/': { view: 'pages/homepage' },
  'GET /view_products': 'ProductController.getProducts',
  'GET /add_products': { view: 'pages/addProducts' },
  'POST /add_products': 'ProductController.addProducts',
  'GET /delete_products': 'ProductController.getDeleteProducts',
  'POST /delete_products': 'ProductController.deleteProducts',
  'GET /update_products': 'ProductController.getUpdateProducts',
  'POST /update_Products': 'ProductController.updateProducts',
  'GET /view_products/:product_id': 'ProductController.getViewproductsById',
  'POST /products_by_id': 'ProductController.getproductsById',
  'POST /get_status': 'ProductController.getStatusById',
  /*
  

  'GET /delete_jobs': 'ProductController.getDeleteJobs',
  'POST /delete_jobs': 'ProductController.deleteJobs',
  'GET /update_jobs': 'ProductController.getUpdateJobs',
  'POST /update_Jobs': 'ProductController.updateJobs',
  'POST /job_order' : 'JobOrderController.addJobsOrder',*/

};
