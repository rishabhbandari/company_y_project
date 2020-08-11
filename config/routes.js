/**
 * Route Mappings
 * This file demonstrate all the routes for web service endpoints
 * copyright : Group-19 Company X
 * @author : Shakuntala Khatri
 */

module.exports.routes = {

  '/': { view: 'pages/homepage' },
  'GET /view_items': 'ItemController.getitems',
  'GET /add_items': { view: 'pages/additems' },
  'POST /add_items': 'ItemController.additems',
  'GET /delete_items': 'ItemController.getDeleteitems',
  'POST /delete_items': 'ItemController.deleteitems',
  'GET /update_items': 'ItemController.getUpdateitems',
  'POST /update_items': 'ItemController.updateitems',
  'GET /view_items/:item_id': 'ItemController.getViewitemsById',
  'POST /items_by_id': 'ItemController.getitemsById',
  'POST /get_status': 'ItemController.getStatusById',
  /*
  

  'GET /delete_jobs': 'itemController.getDeleteJobs',
  'POST /delete_jobs': 'itemController.deleteJobs',
  'GET /update_jobs': 'itemController.getUpdateJobs',
  'POST /update_Jobs': 'itemController.updateJobs',
  'POST /job_order' : 'JobOrderController.addJobsOrder',*/

};
