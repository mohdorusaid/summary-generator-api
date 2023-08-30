const cohere = require('cohere-ai'); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')


const app = express(); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/summarizeParagraph', (req, res) => {
  // We will be coding here
  const excerpt = req.body; 
  // console.log(excerpt);
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

  
    res.send(response)
  

})();


});

app.post('/summarizeBullets', (req, res) => {
  // We will be coding here
  const excerpt = req.body; 
  // console.log(excerpt);
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

  if(response.body.summary){

    res.send(response)
  }

})();


});


app.listen(3000, function() {
  console.log("server running on port 3000");
})