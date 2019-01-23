//makes speed increase as device is shaken, consumes coal

var dataServer;
var pubKey = 'pub-c-959add75-e9d1-4aa4-bfbd-62a5cb8d1ca3';
var subKey = 'sub-c-fd6890b4-1e6e-11e9-a469-92940241a6b5';

//input variables
var r = 0;
var g = 0;
var b = 0;
var speed = 0;
var coal = 20;

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
    publish_key : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
});

  dataServer.addListener({ message: readIncoming });
  dataServer.subscribe({channels: [channelName]});

   setInterval(slowDown, 300);

}

//gradually decrease values
function draw() {
	background(r, g, b);
  fill(255);
  textSize(70);
  text('Coal:'+ coal, width/3, height/2);

	if (r >= 0) {
		r = r-5;
	}
    //console.log(coal);
}

///uses built in deviceShaken function in p5 - when shaken, increase red value and speed, but only if there is coal
function deviceShaken() 
{
	if (coal > 0) {
		if (speed <= 12) {
		r = r+20;
		speed += 2;
		coal--;
	}
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


function slowDown()
{
	if (speed < 0) {
		speed = 2;
	} else if (speed > 0) {
		speed -= 2;
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
	coal = inMessage.message.trainC;
}