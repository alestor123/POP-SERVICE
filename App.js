#!/usr/bin/env node

require('dotenv').config()
var app = require('express')(),
{dialog} = require('electron'),
chalk = require('chalk'),
options = require('minimist')(process.argv.slice(2)),
pck = require('./package.json'),
port = options.p || options.port || 3000;
app.get('/github', (req, res) => {
    res.redirect(pck.homepage)
})
app.get('/', (req, res) => {
    res.json({popup:'service'})
})
app.listen(port, () => console.log(chalk.greenBright(`Server running at ${port}`)))
