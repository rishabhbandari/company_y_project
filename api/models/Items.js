/**
 * Jobs1.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'item_table',
  attributes: {
    id: {
      type: 'number',
      columnName: 'item_id',
      required: true
    },
    item_name: {
      type: 'string',
      columnName: 'item_name',
      required: true
    },
    item_image: {
      type: 'string',
      columnName: 'item_image',
      required: true
    },
    item_description: {
      type: 'string',
      columnName: 'item_description',
      required: true
    },
    item_quantity: {
      type: 'number',
      columnName: 'item_quantity',
      defaultsTo: 100
    },
    item_price: {
      type: 'number',
      columnName: 'item_price',
      defaultsTo: 100
    }
  }
};

