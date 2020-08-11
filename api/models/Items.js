/**
 * Jobs1.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'items_table',
  attributes: {
    item_name: {
      type: 'string',
      columnName: 'item_name',
      required: true
    },
    item_id: {
      type: 'number',
      columnName: 'item_id',
      required: true
    },
    qoh: {
      type: 'number',
      columnName: 'qoh',
      defaultsTo: 100
    },
    price: {
      type: 'number',
      columnName: 'price',
      required: true
    },
    description: {
      type: 'string',
      columnName: 'description',
      required: true
    }
  }
};

