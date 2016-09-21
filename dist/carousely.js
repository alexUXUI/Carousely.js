'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var content = {
  copy: ['lorem ispsum dolor 1', 'lorem ispsum dolor 2', 'lorem ispsum dolor 3', 'lorem ispsum dolor 4'],
  title: ['title ispsum dolor 1', 'title ispsum dolor 2', 'title ispsum dolor 3', 'title ispsum dolor 4'],
  links: ['http://vjs.zencdn.net/v/oceans.mp4', 'http://vjs.zencdn.net/v/oceans.mp4', 'http://vjs.zencdn.net/v/oceans.mp4', 'http://vjs.zencdn.net/v/oceans.mp4', 'http://vjs.zencdn.net/v/oceans.mp4']
};

/*
 * @input object of arrays containing
 *  copy, title, and video src path
 *  @output returns an html slide and dot for each video
**/

var Carousel = function () {

  /*
   * @input DOM node for video
   * @input DOM node for dots
   * @input content for video and text
  **/

  function Carousel(content) {
    _classCallCheck(this, Carousel);

    this.videoContainer = $('.vid-container');
    this.dotContainer = $('.dots');
    this.videoSource = content.links;
    this.videoSourceLength = content.links.length;
    this.titles = content.title;
    this.copy = content.copy;
  }

  /*
   * Builds the html, appends the content to them,
   * adds dot to the dom, attaches controllers to their hover states
   * plays the fist video on page load. On end each video, play the next
   * video. If no next video play the first vido.
   */

  _createClass(Carousel, [{
    key: 'startCarousel',
    value: regeneratorRuntime.mark(function startCarousel() {
      return regeneratorRuntime.wrap(function startCarousel$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.renderSlideHTML();

            case 2:
              _context.next = 4;
              return this.sourceVideos();

            case 4:
              _context.next = 6;
              return this.renderDotHTML();

            case 6:
              _context.next = 8;
              return this.addHoverStateToDots();

            case 8:
              _context.next = 10;
              return this.playFirstVideo();

            case 10:
              _context.next = 12;
              return this.recusivelyPlaySlides();

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, startCarousel, this);
    })
  }, {
    key: 'renderSlideHTML',
    value: function renderSlideHTML() {
      var _this = this;

      var counterLength = this.videoSource.length;
      var sourceAttributes = this.videoSource;
      var suffix = 0;
      sourceAttributes.map(function (el, i) {
        if (i === 0) {
          _this.addFirstVideoToSlideOne(suffix, el);
        } else {
          _this.addVideosToSlides(suffix, el);
        }
        suffix++;
      });
    }
  }, {
    key: 'sourceVideos',
    value: function sourceVideos() {
      var countLength = this.videoSource.length;
      var videoCollection = [];
      var counter = 0;
      return new Promise(function (resolve, reject) {
        for (var i = 0; i < countLength; i++) {
          var currentVid = document.getElementById('my_video_' + counter);
          videoCollection.push(currentVid);
          counter++;
        }
        resolve(videoCollection);

        // this should also return the state of the array
        /* to do at work tomrrow
           next
          current
          prev
         */
      });
    }
  }, {
    key: 'renderDotHTML',
    value: function renderDotHTML() {
      var _this2 = this;

      var vidz = this.videoSource;
      vidz.map(function (el, i) {
        if (i + 1 > 0) _this2.printDot(i);
      });
    }

    /*
    1. get all the dots from the dom
    2. get all the vidz from the dom
    2. Iterate over them adding eventlisteners for hover
    3. On hover, pause currently playing video
    3.A) and play the video of the dot you hovered over
    */

  }, {
    key: 'addHoverStateToDots',
    value: function addHoverStateToDots() {
      var _this3 = this;

      var dot = $('.dot').get();
      var vidz = this.sourceVideos();
      dot.forEach(function (dot) {
        dot.addEventListener('mouseover', function (e) {
          if (dot) {
            var dotNumber = dot.className.split(' ')[0].match(/dot-(\d)/)[1]; // get the dot number
            var dotData = dot.data;
            _this3.currentlyPlayingVideo().then(function (data) {
              // grabs the currently playng video at time of hover
              var slideData = data.currentlyPlaying;
              var videoData = data.jQueryObj;
              var slideNumber = videoData.attr('data-video');
              if (dotNumber === slideNumber) {
                if (videoData) {
                  console.log('got some video data', videoData);
                }
                data.currentlyPlaying.play();
              } else {
                if (videoData) {
                  console.log('got some video data', videoData);
                }
                data.currentlyPlaying.pause(); // pauses the video
                data.currentlyPlaying.parentNode.style.display = 'none';
              }
            });
            _this3.sourceVideos().then(function (videoToPlay) {
              var nextVideo = videoToPlay[dotNumber];
              nextVideo.parentNode.style.display = "block";
              nextVideo.play();
            });
          }
        });
      });
    }
  }, {
    key: 'currentlyPlayingVideo',
    value: function currentlyPlayingVideo() {
      var videos = $("[id^=my_video_]").get();
      var currentlyPlaying;
      return new Promise(function (resolve, reject) {
        videos.map(function (el, i) {
          if (!el.paused) {
            var dataObject = {};
            dataObject.currentlyPlaying = el;
            dataObject.jQueryObj = $(el);
            dataObject.currentVideoIndex = i;
            resolve(dataObject);
          }if (el.paused) {
            // console.log('this is pause', el)
          } else {
              // console.log('do noting')
            }
        });
      }).catch(function (e) {
        console.log(e);
      });
    }
  }, {
    key: 'playFirstVideo',
    value: function playFirstVideo() {
      var videoOne = document.getElementById("my_video_0");
      videoOne.play();
    }
  }, {
    key: 'addPause',
    value: function addPause() {
      var vidz = this.sourceVideos();
      var slidez = this.getSlides();
      this.sourceVideos().then(function (vidz) {
        for (var i = 0; i < vidz.length; i++) {
          var next = vidz[i + 1],
              prev = vidz[i - 1],
              curr = vidz[i],
              currSlide = $('.slide-' + i)[0],
              nextSlide = $('.slide-' + (i + 1))[0],
              prevSlide = $('.slide-' + (i - 1))[0];

          vidz[i].addEventListener('pause', function () {
            console.log('i got paused');
            // get all the dots
            //
            //
            $('body').css('background-color', 'red');
            // if the video is paused and the user scrolls over any button that
            // does not equal the number of the dot
          });
        }
      });
    }
  }, {
    key: 'recusivelyPlaySlides',
    value: function recusivelyPlaySlides() {
      var _this4 = this;

      var vidz = this.sourceVideos();
      var slidez = this.getSlides();
      this.sourceVideos().then(function (vidz) {
        var _loop = function _loop() {
          var next = vidz[i + 1],
              prev = vidz[i - 1],
              curr = vidz[i],
              currSlide = $('.slide-' + i)[0],
              nextSlide = $('.slide-' + (i + 1))[0],
              prevSlide = $('.slide-' + (i - 1))[0];
          if (typeof vidz[i + 1] != 'undefined') {
            (function () {
              var playNextSlide = function playNextSlide() {
                currSlide.style.display = "none";
                nextSlide.style.display = "flex";
                next.style.display = "flex";
                next.play();
              };

              _this4.addPause();
              vidz[i].addEventListener('ended', function () {
                playNextSlide();
              });
            })();
          } else {
            (function () {
              var playFirstSlide = function playFirstSlide() {
                currSlide.style.display = "none";
                slideUno.style.display = 'flex';
                vidUno.style.display = "flex";
                vidUno.play();
              };

              var vidUno = vidz[0];
              var slideUno = slidez[0];

              _this4.addPause();
              vidz[i].addEventListener('ended', function () {
                playFirstSlide();
              });
            })();
          }
        };

        for (var i = 0; i < vidz.length; i++) {
          _loop();
        }
      });
    }

    /*
     * Helper methods, these get called by other methods w/i this class
     **/

  }, {
    key: 'getSlides',
    value: function getSlides() {
      var countLength = this.videoSource.length;
      var slideCollection = [];
      var counter = 0;
      for (var i = 0; i < countLength; i++) {
        var currentVid = $('.slide-' + counter)[0];
        slideCollection.push(currentVid);
        counter++;
      }
      return slideCollection;

      // this should also return the state of the slide array
      /* to do at work tomrrow
         next
        current
        prev
       */
    }
  }, {
    key: 'addFirstVideoToSlideOne',
    value: function addFirstVideoToSlideOne(suff, elem) {
      var newSlide = '<div class="slide-' + suff + ' slide" data-slide="' + suff + '"></div>';
      var textContent = '\n      <div class="text-content-' + suff + '">\n        <h3 class="video-title">' + this.titles[suff] + '</h3>\n        <p class="video-description">' + this.copy[suff] + '</p>\n      </div>';
      this.videoContainer.append(newSlide).css("display", "flex");
      $('.slide-' + suff).append('<video id="my_video_0" data-video="0" controls preload="auto" class="vid" src="' + elem + '" onended="console.log(\'video ' + suff + ' has ended\')"></video>').append(textContent);
    }
  }, {
    key: 'addVideosToSlides',
    value: function addVideosToSlides(suff, elem) {
      var newSlide = '<div class="slide-' + suff + ' slide"></div>';
      var textContent = '\n      <div class="text-content-' + suff + '">\n        <h3 class="video-title">' + this.titles[suff] + '</h3>\n        <p class="video-description">' + this.copy[suff] + '</p>\n      </div>';
      this.videoContainer.append(newSlide).css('display', 'flex');
      $('.slide-' + suff).append('<video id="my_video_' + suff + '" data-video="' + suff + '" src="' + elem + '" controls preload="auto" class="vid" onended="console.log(\'video ' + suff + ' has ended\')"></video>').append(textContent).css('display', 'none');
    }
  }, {
    key: 'printDot',
    value: function printDot(index) {
      this.dotContainer.append('<div class="dot-' + index + ' dot" data-dot="' + index + '">•</div>');
    }
  }]);

  return Carousel;
}();

var carousel = new Carousel(content);
var carouselGenerator = carousel.startCarousel();

function carouselStepThrough() {
  for (var j = 0; j < 6; j++) {
    carouselGenerator.next();
  }
}

carouselStepThrough();