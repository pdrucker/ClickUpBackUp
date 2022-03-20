// THIS SCRIPT WILL DOWNLOAD ATTACHMENTS FROM A GIVEN CLICKUP SPACE
// WRITTEN BY: PETER DRUCKER
// SET THESE VARIABLES

//api key
var api = '';
//file download directory
var directory = '';
//the id for the space you want to download files from
var spaceid = '';




//FILES FROM TASKS NOT IN FOLDERS
var request6 = require('request');

request6({
  method: 'GET',
  url: 'https://api.clickup.com/api/v2/space/'+ spaceid +'/list?archived=false',
  headers: {
    'Authorization': api,
    'Content-Type': 'application/json'
  }}, function (error, response6, body) {
  let parsed2 = JSON.parse(response6.body);
      

        for (let k = 0; k < parsed2.lists.length; k++) { 

var request5 = require('request');

request5({
  method: 'GET',
  url: 'https://api.clickup.com/api/v2/list/'+ parsed2.lists[k].id +'/task',
  headers: {
    'Authorization': api,
    'Content-Type': 'application/json'
  }}, function (error, response5, body) {

let parsed4 = JSON.parse(response5.body);
        for (let l = 0; l < parsed4.tasks.length; l++) { 
        

  
var request4 = require('request');

request4({
  method: 'GET',
  url: 'https://api.clickup.com/api/v2/task/'+ parsed4.tasks[l].id,
  headers: {
    'Authorization': api,
    'Content-Type': 'application/json'
  }}, function (error, response4, body) {

(function(t) {
  setTimeout(function() {




  var jsonParsed1 = JSON.parse(response4.body);


console.log(jsonParsed1.attachments.length + '-' + jsonParsed1.name);



for (let m = 0; m < jsonParsed1.attachments.length; m++) { 
  
   let filename = jsonParsed1.name.replace(/\//g, '') + '-' + jsonParsed1.attachments[m].url.split('/').pop().split('?')[0].split('&')[0];

const fs = require('fs');
const https = require('https');
  
const url = jsonParsed1.attachments[m].url;
https.get(url,(res) => {
    const path = `${__dirname}/`+ directory + '/' + filename; 
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish',() => {
        filePath.close();
        console.log('Download Completed'); 
    })


})
}
}, t*3000)
}(l)) });



        
        
        }
        
  });
        }
  });








//DUPLICATE FOR TASKS IN FOLDERS

  var request2 = require('request');
request2({
  method: 'GET',
  url: 'https://api.clickup.com/api/v2/space/'+ spaceid +'/folder?archived=false',
  headers: {
    'Authorization': api,
    'Content-Type': 'application/json'
  }}, function (error, response2, body) {
  let parsed2 = JSON.parse(response2.body);
      
        for (let j = 0; j < parsed2.folders.length; j++) { 

(function(t) {
  setTimeout(function() {
let parsed3 = parsed2.folders[j].lists;
        for (let k = 0; k < parsed3.length; k++) { 

var request3 = require('request');
request3({
  method: 'GET',
  url: 'https://api.clickup.com/api/v2/list/'+ parsed3[k].id +'/task',
  headers: {
    'Authorization': api,
    'Content-Type': 'application/json'
  }}, function (error, response3, body) {

let parsed4 = JSON.parse(response3.body);
console.log(parsed4.tasks.length);
        for (let l = 0; l < parsed4.tasks.length; l++) { 

(function(t1) {
  setTimeout(function() {

var request = require('request');
request({
  method: 'GET',
  url: 'https://api.clickup.com/api/v2/task/'+ parsed4.tasks[l].id,
  headers: {
    'Authorization': api,
    'Content-Type': 'application/json'
  }}, function (error, response, body) {

  var jsonParsed = JSON.parse(response.body);
for (let m = 0; m < jsonParsed.attachments.length; m++) { 
(function(t2) {
  setTimeout(function() {


let taskname = jsonParsed.name.split('/').pop().split('?')[0].split('&')[0].slice(0,50);
let filename = jsonParsed.attachments[m].url.split('/').pop().split('?')[0].split('&')[0];
 
   let combo = taskname + '-' + filename;
   console.log(combo);

const fs = require('fs');
const https = require('https')
  
const url = jsonParsed.attachments[m].url;
  
https.get(url,(res) => {
    const path = `${__dirname}/`+ directory + '/' + combo; 
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish',() => {
        filePath.close();
        console.log('Download Completed'); 
    })
})
  

}, t2*1500)
}(l))  

}
      
  });

  
}, t1*1500)
}(l))  
  
  }
  });

        }

}, t*1500)
}(j))  
     
  }

      
  });


