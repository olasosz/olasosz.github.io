var r = 0;
function setup() 
{
background(0,255,0);
}

function draw() {
  
  fill(0);
  text(r,width/2,height/2);
 
}


///uses built in deviceShaken function in p5
function deviceShaken() 
{
	r = r+20;
  background(255,0,0);

}


