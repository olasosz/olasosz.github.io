//creates a button that generates more coal

var dataServer;
var pubKey = 'pub-c-63d8f906-e9db-43e0-849f-d87e9808713e';
var subKey = 'sub-c-de8a798e-1e67-11e9-9c4f-3252f3293505';

//input variables
var coal = 50;
var whistle;


//name used to sort your messages. used like a radio station. can be called anything
var channelName = "train";

function setup() 
{
  //makes button for coal, in case other version cant be implimented
  // button = createButton('coal');
  // button.size(500,500);
  // button.position(width/2,height/2);
  // button.mousePressed(moreCoal);

  getAudioContext().resume();
  createCanvas(windowWidth, windowHeight);
  background(0);
  
   // initialize pubnub
   dataServer = new PubNub(
   {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });

   noStroke();
   imageMode(CENTER);
   fill(200);  

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
  //background(0);
  console.log(coal);

  image(whistle.n, whistle.x, whistle.y, whistle.l, whistle.w);
//  rect(whistle.x, whistle.y, whistle.l, whistle.w);

}

function mouseClicked(){
  var clickdistance = dist(whistle.x, whistle.y, mouseX, mouseY);
  if(clickdistance < whistle.l || clickdistance < whistle.w){
    moreCoal();
  }
}

//function to add coal, for easier access
function moreCoal() {
  coal += 20;
  image(whistle.i, whistle.x, whistle.y, whistle.l, whistle.w);

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
  var coal = trainC;
}