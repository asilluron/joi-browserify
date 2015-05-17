/* jshint globalstrict:true, node:true */
'use strict';

var fs = require('fs');
var browserify = require('browserify');
var aliasify   = require('aliasify').configure({
	aliases: {
		net     : './shims/net.js',
		isemail : './shims/isemail.js'
	},
	configDir: __dirname,
	verbose: false
});

var output = fs.createWriteStream('joi-browserify.min.js', { encoding: 'utf8' });

var b = new browserify({
	standalone: 'joi',
	debug: false
});

b.add('./node_modules/joi/index.js');
b.transform(aliasify);
b.transform({
  global: true
}, 'uglifyify')
b.ignore('path');     // Is not used by Joi
b.ignore('./binary'); // Doesn't work in the client


b.bundle().pipe(output);
