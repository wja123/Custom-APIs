'use strict';

var moment = require("moment");

exports.sentenceAnalyzer = function(sentence){
var stats = {};

  stats.numWords = sentence.split(" ") ? sentence.split(" ").length : 0;
  stats.letterCount= sentence.match(/[a-z]/ig) ? sentence.match(/[a-z]/ig).length : 0;
  stats.averageLength = parseFloat((stats.numWords > 0 ? stats.letterCount/stats.numWords : 0).toFixed(2));
  return stats;

}; 
