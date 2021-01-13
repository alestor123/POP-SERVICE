#!/usr/bin/env node

require('dotenv').config()
var express = require('express'),
app = express(),
{dialog} = require('electron'),
chalk = require('chalk'),
options = require('minimist')(process.argv.slice(2)),
pck = require('./package.json'),
key = options.k || options.key || 'key',
port = options.p || options.port || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/github', (req, res) => {
    res.redirect(pck.homepage)
})
app.get('/', (req, res) => {
    res.json({popup:'service'})
})
app.post('/api/v1', (req, res) => {
dialog.showMessageBox({buttons: ['Ok'],title: req.body.title || '', message:req.body.message|| '' , detail: req.body.detail || ''})
res.json(req.body)
console.log(chalk.cyanBright`(LOG) ${Date()} : ${req.ip} : Title: ${req.body.title || ''} Message : ${req.body.message || ''} Detail : ${req.body.detail || ''}`)
})
app.listen(port, () => console.log(chalk.greenBright(`Server running at ${port}`)))
