const content = {
  copy:  ['lorem ispsum dolor 1','lorem ispsum dolor 2','lorem ispsum dolor 3', 'lorem ispsum dolor 4'],
  title: ['title ispsum dolor 1','title ispsum dolor 2','title ispsum dolor 3', 'title ispsum dolor 4'],
  links: ['http://vjs.zencdn.net/v/oceans.mp4', 'http://vjs.zencdn.net/v/oceans.mp4', 'http://vjs.zencdn.net/v/oceans.mp4','http://vjs.zencdn.net/v/oceans.mp4','http://vjs.zencdn.net/v/oceans.mp4']
}

class Carousel {

  constructor(content) {
    this.videoContainer =  $('.vid-container')
    this.videoSource = content.links
    this.videoSourceLength = content.links.length
    this.titles = content.title
    this.copy = content.copy
  }

  makeDots() {
    var vidz = this.videoSource;
    vidz.map((el, i) => { if(i + 1 > 0) this.printDot(i) })
  }

  printDot(index) { $('.dots').append(`<div class="dot-${ index } dot">•</div>`) }

  addHoverStateToDots() {
    var dot = $('.dot').get()
    var dotArr = []

    let dots = []

    var vidz = this.sourceVideos()

    dot.map(function(el, i){

      var num = el.className.split(' ')[0].match(/dot-(\d)/)[1] // grabs class number

      el.addEventListener('mouseover', function(e) {
        var currDot = $(e.target).attr('class')                 // get dot being hoverd
        var currNum = el.className.split(' ')[0].match(/dot-(\d)/)[1] // grabs class number

        console.log(currNum);

        dots.push(currDot)

        function switchVideo(digit) {
          return $(`#my_video_${ digit }`)
        }

        switchVideo(num)
      })
    })
  }

  renderSlideHTML() {
    var sourceAttributes = this.videoSource;
    let counterLength = this.videoSource.length;
    let suffix = 0;
    sourceAttributes.map((el, i) => {
      if(i === 0) {
        this.addFirstVideoToSlideOne(suffix, el)
      } else {
        this.addVideosToSlides(suffix, el)
      }
      suffix++
    })
  }

  sourceVideos() {
    var countLength = this.videoSource.length;
    var videoCollection = []
    let counter = 0
    return new Promise(function(resolve, reject){
      for(var i = 0; i < countLength; i++){
        var currentVid = document.getElementById(`my_video_${ counter }`);
        videoCollection.push(currentVid)
        counter++
      }
      resolve(videoCollection)
    })
  }

  getSlides() {
    var countLength = this.videoSource.length;
    var slideCollection = []
    let counter = 0
    for(var i = 0; i < countLength; i++) {
      var currentVid = document.getElementsByClassName(`slide-${ counter }`)[0];
      slideCollection.push(currentVid)
      counter++
    }
    return slideCollection
  }

  playSlides() {
    var vidz = this.sourceVideos()
    var slidez = this.getSlides()
    this.sourceVideos().then(function(vidz) {
      for(var i = 0; i < vidz.length; i++) {
        let next = vidz[i + 1], prev = vidz[i - 1], curr = vidz[i],
        currSlide = $(`.slide-${ i }`)[0],
        nextSlide = $(`.slide-${ i + 1 }`)[0],
        prevSlide = $(`.slide-${ i - 1 }`)[0]
        if(typeof vidz[i + 1] != 'undefined') {
          function playNextSlide() {
            curr.style.display = "none"
            next.style.display = "flex"
            currSlide.style.display = "none"
            nextSlide.style.display = "flex"
            next.play();
          }
          vidz[i].addEventListener('ended', () => {
            playNextSlide()
          })
        } else {
          let vidUno = vidz[0]
          let slideUno = slidez[0]
          function playFirstSlide() {
            curr.style.display = "none"
            currSlide.style.display = "none"
            slideUno.style.display = 'block'
            vidUno.style.display = "block"
            vidUno.play()
          }
          vidz[i].addEventListener('ended', () => {
            playFirstSlide()
          })
        }
      }
    })
  }

  addFirstVideoToSlideOne(suff, elem) {
    let newSlide = `<div class="slide-${ suff } slide"></div>`
    let textContent =`
      <div class="text-content-${ suff }">
        <h3 class="video-title">${this.titles[suff]}</h3>
        <p class="video-description">${this.copy[suff]}</p>
      </div>`
    this.videoContainer.append(newSlide).css("display", "flex")
    $(`.slide-${ suff }`)
      .append(
        `<video
          id="my_video_0"
          controls preload="auto"
          class="vid"
          src="${ elem }"
          onended="console.log('video ${ suff } has ended')">
        </video>`)
      .append(textContent)
  }

  addVideosToSlides(suff, elem) {
    let newSlide = `<div class="slide-${ suff } slide"></div>`
    let textContent =`
      <div class="text-content-${ suff }">
        <h3 class="video-title">${this.titles[suff]}</h3>
        <p class="video-description">${this.copy[suff]}</p>
      </div>`
    this.videoContainer.append(newSlide).css('display', 'flex')
    $(`.slide-${ suff }`)
      .append(
        `<video id="my_video_${ suff }"
          controls preload="auto"
          class="vid"
          src="${ elem }"
          onended="console.log('video ${ suff } has ended')">
        </video>`)
      .append(textContent)
      .css('display', 'none')
  }

  playFirstVideo() {
    var videoOne = document.getElementById("my_video_0")
    videoOne.play()
  }

  *startCarousel () {
    yield this.renderSlideHTML()
    yield this.sourceVideos()
    yield this.playFirstVideo()
    yield this.makeDots()
    yield this.addHoverStateToDots()
    yield this.playSlides()
  }
}

var carousel = new Carousel(content)
carousel.startCarousel()

var carouselGenerator = carousel.startCarousel()

function carouselStepThrough() {
  for(var j = 0; j < 6; j++){
    console.log(carouselGenerator.next())
  }
}

carouselStepThrough()
