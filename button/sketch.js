//creates a button that generates more coal

var dataServer;
var pubKey = 'pub-c-8efd8f87-9fe2-45a5-81f6-7b60513f5ddc';
var subKey = 'sub-c-43574d8c-135b-11e9-abd1-2a488504b737';

//input variables
var coal = 100;
var hit; //var for collision detection later


//name used to sort your messages. used like a radio station. can be called anything
var channelName = "train";

function setup() 
{
  //makes button for coal, in case other version cant be implimented
  button = createButton('coal');
  button.size(100,100);
  button.position(65, 65);
  button.mousePressed(moreCoal);

  getAudioContext().resume();
  createCanvas(windowWidth, windowHeight);
  background(255);
  
 
   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });

    noStroke();
    fill(0);  

}

function draw() {
  background(240);
  console.log(coal);
}
//function to add coal, for easier access
function moreCoal() {
  coal += 20;
  
  //publish the number to everyone.
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        trainC: coal;       
      }
    });
}