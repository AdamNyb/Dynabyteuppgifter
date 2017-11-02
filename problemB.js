//the second parameter per friend is the net total of their gift after taxes, n_tot
//the net total of the gift for each band is n1, n2, .... etc

//a gift, g, is split into variables for each band they cover.
//a gift that covers 3 bands is g = g1 + g2 + g3 + g4, where g4 is the amount above the last band
//if a band is covered by a friend's earnings we don't count that part. 
//		example: 999.5 covers almost all the band 1000. We only count g1 = 1000 - 999.5

//a band's upperbound is b

//the tax-percentage for a band is p

// n_tot = n1 + n2
// -->  n1 = g1(1-p1)
//		n2 = g2(1-p2)
//
// g2 is over the band and we don't know it's value
//---> g2 = (n_tot - g1(1-p1)) / (1-p2)

//

function problemB(){
	
	//var numBands = readline();
  var numBands = 3;
	var bands = [];
	/*for (var b=0; b<numBands; b++){
		var bLine = readline().split(" ");
		bands[b] = bLine;
	}*/
  bands = [[4750,0],[8000,20],[10000,40]];
	//var totalPercent = readline();
  var totalPercent = 60;
  bands.push([0,totalPercent]);
	//var numFriends = readline();
  var numFriends = 3;
	//var friends = [];
  var friends = [[0, 10000],[10000,500],[15000,500]];
	for (var f=0; f<numFriends; f++){
		//var fLine = readline().split(" ");
		//friends[f] = fLine;
		earnings = friends[f][0];
		giftNet = friends[f][1];

		console.log(giftCalc (bands,earnings,giftNet));
	}


}

function giftCalc (bands,earnings, n_tot){


	var calcNet;
	var giftList=[];
	//var fillBand;

	for (i=0; i<bands.length; i++){
		b = bands[i][0];
		p = bands[i][1]/100;
    
   
		var fillBand = earnings - b;
    
		if(fillBand == b*(-1)){
			giftList.push(bands[i]);
      
		} 
    else if(fillBand < 0){
      giftList.push([b - earnings, p]);
    }
		else{
			var gift_band_difference = i - giftList.length;
			var taxedGiftSum;
			var giftSum;

			for (var j=gift_band_difference; j<i; j++){ //sums them in backwards order. g3(1-p3) + g2(1-p2) + ....
				var giftList_val = j - gift_band_difference;
				var jPercent = band[j][1];
				var giftVal = giftList[giftList_val][0];
				taxedGiftSum += giftVal * (1 - jPercent);
				giftSum += giftVal;
				
			}
			
		}
      var g_last = (n_tot - taxedGiftSum) / (1-p);
			var g_tot = giftSum + g_last;
			return g_tot;
	}
}

