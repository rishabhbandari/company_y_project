/**
 * Jobs1.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'product_table',
  attributes: {
    id: {
      type: 'number',
      columnName: 'product_id',
      required: true
    },
    product_name: {
      type: 'string',
      columnName: 'product_name',
      required: true
    },
    product_image: {
      type: 'string',
      columnName: 'product_image',
      required: true
    },
    product_description: {
      type: 'string',
      columnName: 'product_description',
      required: true
    },
    product_quantity: {
      type: 'number',
      columnName: 'product_quantity',
      defaultsTo: 100
    },
    product_price: {
      type: 'number',
      columnName: 'product_price',
      defaultsTo: 100
    }
  }
};

