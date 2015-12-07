function Animator(element) {
  this.el = element;
  var that = this;
  var intervalId;
  var initial;
  var cssProp;
  this.animate = function(cssProperty, value, duration) {
    cssProp = cssProperty;
    var style = window.getComputedStyle(element);
    initial = style.getPropertyValue(cssProperty);
    initial = parseInt(initial);

    step = value / (duration / 50);

    var counter = 0;
    intervalId = setInterval(function() {
      counter++;
      var current = step * counter;

      // element.innerHTML = current;
      element.style[cssProperty] = current + initial + 'px';

      if (counter >= duration / 50) {
        clearInterval(intervalId);
      }
    }, 25);
  }

  // should stop the animation in current position
  this.stop = function() {
    console.log("helo");
    clearInterval(intervalId);
  }

  // should stop the animation and element's properties should be at "end" value
  this.finish = function(width) {
    clearInterval(intervalId);
    console.log('initial', initial);

    element.style[cssProp] = initial + width + 'px';
  }
}
