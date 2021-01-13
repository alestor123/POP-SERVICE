var app = require('express')(),
{dialog} = require('electron'),
options = require('minimist')(process.argv.slice(2));
