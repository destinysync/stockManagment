'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    local: {
        id: String,
        password: String,
        role: String,
        agent: {
            address: String,
            phone: Number,
            name: String
        },
        retailer: {
            address: String,
            phone: Number,
            name: String,
            agent: String
        },
        cloudCode: Object,

//         cloudCode: {
//
// {factoryInventory: {Number: number}},
// {agentInventory: [{_id: _id,
// number: number}]},
// {retailerInventory: [{_id: _id, number: number}]},
// { codeInfo: [{
//     code: String,
//     association: String,
//     status: String,
//     model: String
// }] }
// }

        product: {
            model: Object
        }
    }
});

module.exports = mongoose.model('User', User);
