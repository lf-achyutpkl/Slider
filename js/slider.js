// var sliderLong = document.getElementsByClassName('slider-long')[0];

// var shiftMargin = 0;
var imageWidth = 900;
var sliderLong = document.getElementsByClassName("slider-long")[0];
var animator = new Animator(sliderLong);
var counter = 0;
var allSlides = sliderLong.children;
var slideLength = allSlides.length;
var slidePos = 0;
var posImage = document.getElementsByClassName('seeker');
var flag = 0;

sliderLong.style.marginLeft = 0 + 'px';



function slide() {
  counter++;
  flag = 0;
  console.log(counter, slideLength);
  if (counter >= slideLength) {
    animator.animate("margin-left", (imageWidth * (slideLength - 1)), 1000);
    counter = 0;
  } else if (counter < 0) {
    counter = 0;
  } else {
    animator.animate("margin-left", -imageWidth, 1000);
  }

  checkPosition();
}

var mainId = setInterval(slide, 2000);



//for seekers
var imageBottom = document.getElementsByClassName('image-bottom')[0];
var seeker = document.getElementsByClassName('seeker');

for (var i = 0; i < slideLength; i++) {
  var span = document.createElement('span');
  span.className = 'seeker';
  span.id = i;
  if (i == 0) {
    span.className += ' active';
  }
  imageBottom.appendChild(span);
  seeker[i].addEventListener('click', seekerClick);
}

//seeker clicker
function seekerClick() {
  clearInterval(mainId);
  slidePos = parseInt(sliderLong.style.marginLeft);
  if ((slidePos % imageWidth) == 0) {
    animator.animate("margin-left", (counter - this.id) * 900, 1000);
    counter = this.id;
  }

  mainId = setInterval(slide, 2000);
  checkPosition();
}

//position images, bottom seekerss
function checkPosition() {
  for (var j = 0; j < slideLength; j++) {
    posImage[j].className = 'seeker';
  }
  posImage[counter].className += ' active';
}



// for right and left arrows
var rightArrow = document.getElementsByClassName('image-right')[0];
var leftArrow = document.getElementsByClassName('image-left')[0];

rightArrow.addEventListener('click', function() {
  clearInterval(mainId);
  slidePos = parseInt(sliderLong.style.marginLeft);


  if ((slidePos % imageWidth) == 0 && (slidePos > -(imageWidth * (slideLength - 1)))) {
    counter++;
    checkPosition();
    animator.animate("margin-left", -imageWidth, 1000);
  } else {
    checkPosition();
    animator.finish(-900);
  }
  mainId = setInterval(slide, 2000);
});


leftArrow.addEventListener('click', function() {
  clearInterval(mainId);

  slidePos = parseInt(sliderLong.style.marginLeft);

  if ((slidePos % imageWidth) == 0 && (slidePos < 0)) {
    counter--;
    checkPosition();
    animator.animate("margin-left", imageWidth, 1000);
    flag = 1;
  } else if ((slidePos < 0) && flag == 0) {
    counter--;
    checkPosition();
    animator.finish(0);
    flag = 0;
  }
  mainId = setInterval(slide, 2000);
});
