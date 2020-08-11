/**
 * invoice.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'invoice_table',
  attributes: {
    id: {
      type: 'number',
      columnName: 'order_id',
      required: true
    },
    product_id: {
      type: 'number',
      columnName: 'product_id',
      required: true
    },
    user_id: {
      type: 'number',
      columnName: 'user_id',
      required: true
    },
    order_quantity: {
      type: 'number',
      columnName: 'order_quantity'
    },
    order_status:{
      type:'string',
      columnName: 'order_status',
    },
    order_amount:{
      type:'number',
      columnName: 'order_amount',
    }
  }
};

