'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const EmailSchema = new Schema({
  title: String,
  subject: String,
  to: String,
  body: String,
  emailToken: String,
  received: Boolean,
  receivedAt: Date,
  createdAt: Date,
  companyId: String,
  templateVars: {
    firstName: String,
    lastName: String,
    contractingPeriod: String,
    customMessage: String,
  },
});

module.exports = mongoose.model('Email', EmailSchema);
