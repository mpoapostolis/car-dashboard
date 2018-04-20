//------------------------------------------------------------------------------
// Copyright IBM Corp. 2015, 2016
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------

var mqtt = require('mqtt');
var properties = require('properties');
const socket = require("./socket")


module.exports = function() {
  return {
    "read" : function(propertiesFileName, callback) {
      if (!propertiesFileName) {
        propertiesFileName = 'config-gs.properties';
        console.error('Default configuration file config-gs.properties is used');
      }
      properties.parse('./' + propertiesFileName, {path: true}, function(err, cfg) {
        if (err) {
          console.error('Error parsing the configuration file - see config-sample.properties for an example');
          process.exit(0);
		    }
        if (!cfg.carid) {
          console.error('Error parsing the configuration file - see config-sample.properties for an example');
          process.exit(0);
        }
        socket.emit('connect-car',{name:cfg.name, lane: cfg.startlane,  id:cfg.carid})
          callback(cfg.carid, cfg.startlane, null,cfg.name);
      });	
	  }
  };
};