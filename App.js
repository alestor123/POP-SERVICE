#!/usr/bin/env node

require('dotenv').config()
var app = require('express')(),
{dialog} = require('electron'),
chalk = require('chalk'),
options = require('minimist')(process.argv.slice(2)),
port = options.p || options.port || 3000;

app.listen(port, () => console.log(chalk.greenBright(`Server running at ${port}`)))
