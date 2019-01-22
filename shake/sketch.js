//makes speed increase as device is shaken, consumes coal

var dataServer;
var pubKey = 'pub-c-8efd8f87-9fe2-45a5-81f6-7b60513f5ddc';
var subKey = 'sub-c-43574d8c-135b-11e9-abd1-2a488504b737';

//input variables
var r = 0;
var g = 0;
var b = 0;
var speed = 0;
var coal = 50;

//name used to sort your messages. used like a radio station. can be called anything
var channelName = "train";

function setup() 
{
	getAudioContext().resume();
	createCanvas(windowWidth, windowHeight);
	background(255);

  setShakeThreshold(20);  //sets the sensitivity of the deviceShaken function

   // initialize pubnub
   dataServer = new PubNub(
   {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
});
}

//gradually decrease values
function draw() {
	background(r, g, b);
	speed -= 2;
	if (r >= 0) {
		r = r-5;
	}
    //console.log(coal);
}

///uses built in deviceShaken function in p5 - when shaken, increase red value and speed, but only if there is coal
function deviceShaken() 
{
	if (coal > 0) {
		r = r+20;
		speed += 4;
		coal--;
	}else if(coal <= 0) {
		coal = 0;
	}

  //publish the numbers to everyone.
  dataServer.publish(
  {
  	channel: channelName,
  	message: 
  	{
  		trainC: coal,
  		trainS: speed       
  	}
  });
}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{
	var coal = trainC;
}