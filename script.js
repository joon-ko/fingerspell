var currentWord; // string
var lastSignFrame; // number
var wordQueue; // array
var signedWord; // animation

var wordText; // html p

function setup() {
	background(255, 0, 0);

	// original 160x120
	let canvas = createCanvas(250, 190);
	canvas.parent('canvasContainer');

	wordText = createP();
	wordText.parent('wordTextContainer');
	wordText.style('visibility', 'hidden');

	// repeat button
	let rb = createButton('');
	rb.elt.title = 'repeat word';
	rb.id('repeatButton');
	rb.class('fa fa-repeat');
	rb.parent('inputContainer');
	rb.mousePressed(replayAnimation);

	// show word button
	let sb = createButton('');
	sb.elt.title = 'show word';
	sb.id('showButton');
	sb.class('fa fa-search');
	sb.parent('inputContainer');
	sb.mousePressed(showWordText);

	// new word button
	let nb = createButton('');
	nb.elt.title = 'new word';
	nb.id('newButton');
	nb.class('fa fa-arrow-right');
	nb.parent('inputContainer');
	nb.mousePressed(handleNewWordPress); // hideWordText, displayNewWord

	textSize(20);
	frameRate(3); // three updates per second
	wordQueue = [];
}

// ASL hand pictures taken from https://www.handspeak.com/spell/index.php?id=spell-asl.

function draw() {
	fill(255);
	
	if (wordQueue.length > 0) {
		currentWord = wordQueue.pop();
		wordText.elt.innerHTML = currentWord;
		constructSignedWord(currentWord);
		background(0, 128, 0);
	}

	if (typeof signedWord !== 'undefined') {
		if (signedWord.animation.getFrame() == signedWord.animation.getLastFrame()) {
			signedWord.changeAnimation('stopped');
			background(255, 0, 0);
		}
	}

	drawSprites();
}

function displayNewWord() {
	// 710 words
	var randomIndex = Math.floor((Math.random() * 710));
	var randomWord = words[randomIndex];
	wordQueue.push(randomWord);
}

function constructSignedWord(word) {
	// construct the filename of the letter
	var split = word.split('').map(letter => "./signs/asl" + letter + ".gif");
	if (typeof signedWord !== 'undefined') {
		signedWord.remove();
	}
	signedWord = createSprite(125, 95, 160, 120);
	signedWord.scale = 1.5;
	signedWord.addAnimation('signing', ...split);
	signedWord.addAnimation('stopped', split[split.length - 1]);
}

function handleNewWordPress() {
	hideWordText();
	displayNewWord();
}

function showWordText() {
	wordText.style('visibility', 'visible');
}

function hideWordText() {
	wordText.style('visibility', 'hidden');
}

function replayAnimation() {
	if (typeof signedWord !== 'undefined') {
		signedWord.changeAnimation('signing');
		signedWord.animation.nextFrame();
		signedWord.animation.play();
		background(0, 128, 0);
	}
}

window.addEventListener('keypress', function(e) {
	if (e.keyCode >= 49 && e.keyCode <= 57) {
		frameRate(e.keyCode - 48); // set fps equal to number pressed on keyboard
	}
})