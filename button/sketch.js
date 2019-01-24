//creates a button that generates more coal

var dataServer;
var pubKey = 'pub-c-8efd8f87-9fe2-45a5-81f6-7b60513f5ddc';
var subKey = 'sub-c-43574d8c-135b-11e9-abd1-2a488504b737';

//input variables
var coal = 20;
var whistle;
//var station = false;

//name used to sort your messages. used like a radio station. can be called anything
var channelName = "train";

function setup() 
{
  getAudioContext().resume();
  createCanvas(windowWidth, windowHeight);
  background(0);
  
   // initialize pubnub
   dataServer = new PubNub(
   {
    publish_key : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });

  dataServer.addListener({ message: readIncoming });
  dataServer.subscribe({channels: [channelName]});

   background(0);
   noStroke();
   imageMode(CENTER);
   fill(200);  

//button parameters
   whistle = { 
    n: loadImage("notPress.png"),
    i: loadImage("isPress.png"),
    x: width/2,
    y: height/2,
    l: 500,
    w: 500
  };

 }

 function draw() {
  //console.log(coal);
  

  image(whistle.n, whistle.x, whistle.y, whistle.l, whistle.w); //generates the "button" as a png
  // fill(255);
  // textSize(70);
  // text('Coal:'+ coal, width/3, 80);

}

function mouseClicked(){ //checks if the "button" is pressed
  var clickdistance = dist(whistle.x, whistle.y, mouseX, mouseY);
  if(clickdistance < whistle.l || clickdistance < whistle.w){

    image(whistle.i, whistle.x, whistle.y, whistle.l, whistle.w);
    moreCoal();

    setTimeout(reset,1000); //resets the background after 1.5 seconds
  }
}

function reset() { //resets background
  background(0);
}

//function to add coal
function moreCoal() {
  coal += 40;


  //publish the number to everyone.
  dataServer.publish(
  {
    channel: channelName,
    message: 
    {
      trainC: coal      
    }
  });
}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{
  coal = inMessage.message.trainC;
  //station = inMessage.message.atStation;
}