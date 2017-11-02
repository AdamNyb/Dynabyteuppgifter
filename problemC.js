function problemC(){
	var numGuests = 3; //sample data. general is readline();
	var me = {};
	me.speed = 100.0; //sample data. general is readline();
	var guestList = [];
	
	//hardcoded for sample data, 3 guests. Orders are different ways of visiting each guest.
	var uniqueOrders = [[1,2,3],[1,3,2],
                     [2,1,3],[2,3,1],
                     [3,1,2],[3,2,1]];
  
 	//using sample data
  	var lineArr=[[40.0, 25.0, 20.0, 5.95],
               [-185.0, 195.0, 6.0, 2.35],
               [30.0, -80.0, 23.0, 2.76]];


	for (n=0;n<numGuests;n++){

		//var guestLines = readline().split(" "); use for general solution
	    if(n == 1){
	      var guestLines = lineArr[0];
	    }
	    else if(n == 2){
	      var guestLines = lineArr[1];
	    }
	    else{
	      var guestLines = lineArr[2];
	    }
	    
	    
		guestList[n] = {id: n+1, x: guestLines[0], y: guestLines[1], speed: guestLines[2], dir: guestLines[3]};
	    guestList[n].v = {};
	}

	var timeList = []; //store all possible times in here

	for(var k=0; k<uniqueOrders.length; k++){
    	timeList.push(intersectPt(guestList, me, uniqueOrders[k],numGuests));
	}

	console.log(Math.min(...timeList)); //return fastest time

}


function intersectPt(guestList, me, currOrder, numGuests){ 
	var currOrder_times = [];

	while(currOrder.length !== 0){ //repeats 
		var guest = guestList.filter(function( obj ) {
	  			return obj.id == currOrder[0];
			});
		guest = guest[0];

		if (currOrder.length == numGuests){
			me.x = 0;
			me.y = 0;
		}    

		//vector between us
		var ABx = guest.x - me.x;
		var ABy = guest.y - me.y;
    
		//normalize
		var ABmag = Math.sqrt(ABx*ABx + ABy*ABy);
		ABx = ABx/ABmag;
		ABy = ABy/ABmag;

		//projecting onto new axis AB (or m) 
		//new axis lines will be x-->m, y-->n
		var guestDotAB = ABx * guest.x + ABy * guest.y;	
		guest.v.mx = guestDotAB * ABx;
		guest.v.my = guestDotAB * ABy;


		guest.v.nx = guest.x - guest.v.mx;
		guest.v.ny = guest.y - guest.v.my;

		//I use same coordSys as guest
		me.nx = guest.v.nx;
		me.ny = guest.v.ny;

		//now project me onto same
		meNmag = Math.sqrt(me.nx*me.nx + me.ny*me.ny);   
    	meMmag = Math.sqrt(me.speed * me.speed - meNmag * meNmag);
    

		me.mx = ABx * meMmag;
		me.my = ABy * meMmag;

		//now back to x, y giving the intersectingpoint
		me.endX = me.mx + me.nx;    
		me.endY = me.my + me.ny;

		var interSection = distance(me.x, me.y, me.endX, me.endY);	

		var timeToGuest = timeCalc(interSection, me.speed);
		var guestToBus = timeCalc(interSection, guest.speed);
    
		currOrder_times.push(timeToGuest+guestToBus);
    
		//reset values for next iteration
		me.x = me.endX;
		me.y = me.endY;
		currOrder.splice(0,1); //one guest done, currOrder are the remaining ones
	}
  	var currOrder_sum = currOrder_times.reduce(function(accumulator, currentValue){
    	return accumulator + currentValue;
  	});
  
	return currOrder_sum;
}

function distance(startX, startY, endX, endY){
	var a = startX-endX;
	var b = startY-endY;
	var c = Math.sqrt(a*a + b*b);
	return c;
}

function timeCalc(dist, speed){
	var time = dist/speed;
  	return time;
}
