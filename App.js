#!/usr/bin/env node

require('dotenv').config()
var express = require('express'),
app = express(),
{dialog} = require('electron'),
chalk = require('chalk'),
options = require('minimist')(process.argv.slice(2)),
pck = require('./package.json'),
key = options.k || options.key || process.env.KEY || 'key',
port = options.p || options.port || process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if(options.v || options.version){
    console.log( `${pck.version}`)
  process.exit(1);
}
else if (options.h || options.help) { // checking undifined args
    console.log(`
Usage: ${pck.name} -p <Port Number>  -f <file path> -k <auth key>
-k , --key auth key by default it should be 'sms'
-p , --port setting port number
-v , --version for showing cli version
-i , --issue for reporting web page (any issue or bugs)
-f , --fsLog for setting path for log file by default this option is not true 
`);
process.exit(0)

}
else if (options.i || options.issue) { // checking undifined args
  console.log(`
  Issues at ${pck.bugs.url} 
`);
process.exit(0)
}

else{
logger(`KEY: ${key}`)
app.listen(port, () => logger(`Server running at ${port}`))
}

app.get('/github', (req, res) => {
    res.redirect(pck.homepage)
})
app.get('/', (req, res) => {
    res.json({popup:'service'})
})
app.post('/api/v1', (req, res) => {
if(req.body.key==key){
dialog.showMessageBox({buttons: ['Ok'],title: req.body.title || '', message:req.body.message|| '' , detail: req.body.detail || ''})
res.json(req.body)
logger.req(` Title: ${req.body.title || ''} Message : ${req.body.message || ''} Detail : ${req.body.detail || ''}`,req)
}
else res.status(401).send('Unauthorised')
})


// Logger
function logger(message){
    console.log(chalk.bgYellow.red(`(LOG):${Date()}:${message}`))
    fsLog(message)
    }
logger.req = (message,req) => {
    console.log(chalk.bgYellow.blue(`(REQUEST):${Date()}:Ip : ${req.ip} : ${message}`))
    fsLog(message)
    }
    logger.err = (message) => {
    console.error(chalk.bgRed.green(`(ERROR):${Date()} : ${message}`))
    fsLog(message)
    }
    // Main 
    // file logging 
    function fsLog(logText) {
        if(options.fslog || options.f ||  process.env.LOG || false ){
        fs.appendFile(options.fsLog || options.f ||  process.env.LOGPATH || 'logs.log' ,`\n ${logText} \n` , (err) => {
            if (err) throw err;
          });
 }}
