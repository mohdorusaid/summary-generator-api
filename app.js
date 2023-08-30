/* 

APP.JS - The entry point for our Node API. The API is a simple wrapper for Cohere's summary generator. 

*/

const cohere = require('cohere-ai'); 

//Using Express to spin a simple and robust web server.
const express = require('express');

//Using BodyParser to efficiently parse JSON data. 
const bodyParser = require('body-parser');

//Using CORS to ensure that we don't run into any problems when calling the API from another origin. 
const cors = require('cors')


//Create server 
const app = express(); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//POST ROUTE 1 - /summarizeParagraph - takes the text and generates a short paragraph of summary.

app.post('/summarizeParagraph', (req, res) => {

//Cohere stock code. 
cohere.init('WjLpipCX12LRxGR25ov1Mehpl3JIaJNmmNfONg72'); // This is your trial API key
(async () => { 
  const response = await cohere.summarize({ 
    text: req.body.excerpt,
    length: 'medium',
    format: 'paragraph',
    model: 'summarize-xlarge',
    additional_command: '',
    temperature: 0.3,
  }); 
  
  
  console.log('Summary:', response); 

  //Send the response back to the user. All error handling is done on the extension itself.
  res.send(response)
  

})();


});


//POST Route 2 - /summarizeBullets - takes text content and generates a list of bullet points as a summary output. 

app.post('/summarizeBullets', (req, res) => {

cohere.init('WjLpipCX12LRxGR25ov1Mehpl3JIaJNmmNfONg72'); // This is your trial API key
(async () => { 
  const response = await cohere.summarize({ 
    text: req.body.excerpt,
    length: 'medium',
    format: 'bullets',
    model: 'summarize-xlarge',
    additional_command: '',
    temperature: 0.3,
  }); 



  console.log('Summary:', response); 


  //Send the response back to the user. All error handling is done on the extension itself.  
    res.send(response)

})();


});


//Start the server and log it out on console.

app.listen(3000, function() {
  console.log("server running on port 3000");
})