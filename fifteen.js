Event.observe(window, "load", function(){
	init();
});
var positions = ["0px 0px", "100px 0px", "200px 0px", "300px 0px", "0px 100px", "100px 100px", "200px 100px", "300px 100px", "0px 200px", "100px 200px", "200px 200px", "300px 200px", "0px 300px", "100px 300px", "200px 300px"]; //300px 300px

var bgPos = ["0px 0px", "-100px 0px", "-200px 0px", "-300px 0px", "0px -100px", "-100px -100px", "-200px -100px", "-300px -100px", "0px -200px", "-100px -200px", "-200px -200px", "-300px -200px", "0px -300px", "-100px -300px", "-200px -300px"]; //-300px -300px

BLANKPIECE = "300px 300px";
PIECES = [];

var init = function(){
	var div = $("puzzlearea").childElements("div");
	for (var i = 0; i < div.length; i++){
		div[i].addClassName("puzzlepiece");
		var pos = setPositions(positions[i]);
		div[i].setStyle({
			'background-position' : bgPos[i],
			'background-size' : '400px 400px',
			'background-image' : 'url(https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQsjwxH-jDfJ5PtFmgPZ4QghVZofmpyGRLDSa-tIeLzCx6wQpod)',
			'top' : pos[1] + "px",
			'left' : pos[0] + "px"
		});
		listen(div[i]);
		PIECES.push(div[i]);
	}
	$("shufflebutton").observe("click", function(){
		shuffle();
	});
}

var setPositions = function(position){
	var p = position.split(" ");
	var pos = [];
	this.h = parseInt(p[0].substring(0, p[0].length - 2));
	this.v = parseInt(p[1].substring(0, p[1].length - 2));
	pos.push(h);
	pos.push(v);
	return pos;
}

var listen = function(div){
	div.observe("mouseover", function(){
		if(isMovable(this)){
			$(this).addClassName("movablepiece");
		}else{
			$(this).removeClassName("movablepiece");
		}
	});
	div.observe("click", function(){
		if(isMovable(this)){
			move(this);
		}
		isSolved();
	});
}

var isMovable = function(div){
	var blankPos = setPositions(BLANKPIECE);
	var thisPos = setPositions($(div).getStyle('left') + " " + $(div).getStyle('top'));
	if((blankPos[0] == (thisPos[0] - 100) && blankPos[1] == thisPos[1]) || (blankPos[0] == (thisPos[0] + 100) && blankPos[1] == thisPos[1]) || (blankPos[1] == (thisPos[1] - 100) && blankPos[0] == thisPos[0]) || (blankPos[1] == (thisPos[1] + 100) && blankPos[0] == thisPos[0])){
		return true;
	}
	return false;
}

var move = function(div){
	var blank = setPositions(BLANKPIECE);
	var tempPos = $(div).getStyle('left') + " " + $(div).getStyle('top');
	$(div).setStyle({
		'top' : blank[1] + "px",
		'left' : blank[0] + "px"
	});
	BLANKPIECE = tempPos;
}

var shuffle = function(){
	var movable;
	var piecemoved;
	var prevPiece = -1;
	for(var i = 0; i <= 30; i++){
		movable = [];
		for(var j = 0; j < PIECES.length; j++){
			if(isMovable(PIECES[j])){
				movable.push(PIECES[j]);
			}
		}
		piecemoved = Math.floor(Math.random()*movable.length);
		while(parseInt(movable[piecemoved].innerHTML) == prevPiece){ //Ensures it doesnt make a back move
			piecemoved = Math.floor(Math.random()*movable.length);
			console.log('I was Here');
		}
		prevPiece = parseInt(movable[piecemoved].innerHTML);
		console.log(movable[piecemoved].innerHTML);
		move(movable[piecemoved]);
	}
}

var fixed = function(){
	var puzzlearea = $("puzzlearea").childElements("div");
	for(var i = 0; i < puzzlearea.length; i++){
		var gamePosition = setPositions(positions[i]);
		if(parseInt($(puzzlearea[i]).getStyle('left')) != gamePosition[0] || parseInt($(puzzlearea[i]).getStyle('top')) != gamePosition[1]){
			return false;
		}
	}
	return true;
}

var isSolved = function(){
	if(fixed()){
		$$('h1')[0].innerHTML = "CONGRATULATIONS YOU SOLVED IT!";
		$('puzzlearea').setStyle({
			'visibility' : 'hidden'
		});
		$('overall').setStyle({
			'background' : 'url(https://38.media.tumblr.com/569d680e7d50c3a9c197ab233f8e34a8/tumblr_n73pcoi2iH1relaado1_400.gif)',
			'background-repeat': 'no-repeat'
		});
	}
}
