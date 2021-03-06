//makes speed increase as device is shaken, consumes coal

var dataServer;
var pubKey = 'pub-c-8efd8f87-9fe2-45a5-81f6-7b60513f5ddc';
var subKey = 'sub-c-43574d8c-135b-11e9-abd1-2a488504b737';

//input variables
var r = 0;
var g = 0;
var b = 0;
var speed = 0;
var coal = 40;

//name used to sort your messages. used like a radio station. can be called anything
var channelName = "train";
var subChannel = "coal";

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
  dataServer.subscribe({channels: [subChannel]});

   setInterval(slowDown, 200);

}

//gradually decrease values
function draw() {
	background(r, g, b);

	if (r >= 0) {
		r = r-5;
	}
  fill(255);
  textSize(100);
  text('Coal:'+ coal, width/3, 80);
    //console.log(coal);
}

///uses built in deviceShaken function in p5 - when shaken, increase red value and speed, but only if there is coal
function deviceShaken() 
{
	if (coal > 0) {
		if (speed <= 14) {
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
  		train: speed    
  	}
  });
}


function slowDown()
{
	if (speed < 0) {
		speed = 2;
	} else if (speed < 200) {
		speed -= 2;
	}
  //publish the numbers to everyone.
  dataServer.publish(
  {
  	channel: channelName,
  	message: 
  	{
  		train: speed     
  	}
  });

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{
	coal = inMessage.message.trainC;
}