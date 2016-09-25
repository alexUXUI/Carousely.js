class Carousel {

  constructor(content) {
    this.videoContainer =  $('.vid-container')
    this.dotContainer = $('.dots')
    this.videoSource = content.links
    this.videoSourceLength = content.links.length
    this.titles = content.title
    this.copy = content.copy
  }

  *startCarousel () {
    yield this.renderSlideHTML()
    yield this.sourceVideos()
    yield this.renderDotHTML()
    yield this.addHoverStateToDots()
    yield this.playFirstVideo()
    yield this.recusivelyPlaySlides()
  }

  renderSlideHTML() {
    const counterLength = this.videoSource.length;
    var sourceAttributes = this.videoSource;
    let suffix = 0;
    sourceAttributes.map((el, i) => {
      this.addVideosToSlides(suffix, el)
      suffix++
    })
  }

  sourceVideos() {
    const countLength = this.videoSource.length;
    var videoCollection = []
    let counter = 0
    return new Promise(function(resolve, reject) {
      for(var i = 0; i < countLength; i++){
        var currentVid = document.getElementById(`my_video_${ counter }`)
        videoCollection.push(currentVid)
        counter++
      }
      resolve(videoCollection)

    })
  }

  renderDotHTML() {
    var vidz = this.videoSource;
    vidz.map((el, i) => { if(i + 1 > 0) this.printDot(i) })
  }

  addHoverStateToDots() {
    var dot = $('.dot').get()
    dot.forEach((dot) => {
      dot.addEventListener('mouseover', (e) => {
        let dotNumber = dot.getAttribute('data-dot')
        this.currentlyPlayingVideo().then(function(data){
          let slideData = data.currentlyPlaying;
          let videoData = data.jQueryObj;
          let slideNumber = videoData.attr('data-video')
          if (dotNumber === slideNumber) {
            data.currentlyPlaying.play()
          } else {
            data.currentlyPlaying.pause()
            data.currentlyPlaying.parentNode.style.display = 'none'
          }
        })
        this.sourceVideos().then(function(videoToPlay){
          var nextVideo = videoToPlay[dotNumber]
          nextVideo.parentNode.style.display = "block"
          nextVideo.play()
        })
      })
    })
  }

  currentlyPlayingVideo(){
    var videos = $("[id^=my_video_]").get()
    var currentlyPlaying
    return new Promise((resolve, reject) => {
      videos.map((el, i) => {
        if (!el.paused) {
          var dataObject = {}
          dataObject.currentlyPlaying = el
          dataObject.jQueryObj = $(el)
          dataObject.currentVideoIndex = i
          resolve(dataObject)
        } if (el.paused) {
          var currentlyPaused = el.getAttribute('data-video')
          var hideMe = document.getElementsByClassName(`slide-${ currentlyPaused }`)[0]
          hideMe.style.display = 'none'
        }
      })
    })
  }

  playFirstVideo() {
    var videoOne = document.getElementById("my_video_0")
    videoOne.play()
  }

  recusivelyPlaySlides() {
    var vidz = this.sourceVideos()
    var slidez = this.getSlides()
    this.sourceVideos().then((vidz) => {
      for(var i = 0; i < vidz.length; i++) {
        let next = vidz[i + 1],
            prev = vidz[i - 1],
            curr = vidz[i],
            currSlide = $(`.slide-${ i }`)[0],
            nextSlide = $(`.slide-${ i + 1 }`)[0],
            prevSlide = $(`.slide-${ i - 1 }`)[0]
        if(typeof vidz[i + 1] != 'undefined') {
          function playNextSlide() {
            currSlide.style.display = "none"
            nextSlide.style.display = "flex"
            next.style.display = "flex"
            next.play();
          }
          vidz[i].addEventListener('ended', () => {
            playNextSlide()
          })
        } else {
          let vidUno = vidz[0]
          let slideUno = slidez[0]
          function playFirstSlide() {
            currSlide.style.display = "none"
            slideUno.style.display = 'flex'
            vidUno.style.display = "flex"
            vidUno.play()
          }
          vidz[i].addEventListener('ended', () => {
            playFirstSlide()
          })
        }
      }
    })
  }

  getSlides() {
    var countLength = this.videoSource.length
    var slideCollection = []
    for(var i = 0; i < countLength; i++) {
      var currentVid = $(`.slide-${ i }`)[0]
      slideCollection.push(currentVid)
      i++
    }
    return slideCollection
  }

  addVideosToSlides(suff, elem) {
    let newSlide = `<div class="slide-${ suff } slide"></div>`
    this.videoContainer.append(newSlide).css('display', 'flex')
    let textContent = `<div class="text-content-${ suff }"><h3 class="video-title">${this.titles[suff]}</h3><p class="video-description">${this.copy[suff]}</p></div>`
    let currentVideo = `<video id="my_video_${ suff }" data-video="${ suff }" src="${ elem }" controls preload="auto" class="vid_${ suff }"></video>`
    if(suff === 0) {
      $(`.slide-${ suff }`).append(currentVideo).append(textContent)
    } else {
      $(`.slide-${ suff }`).append(currentVideo).append(textContent).css('display', 'none')
    }
  }

  printDot(index) {
    this.dotContainer.append(`<div class="dot-${ index } dot" data-dot="${ index }">•</div>`)
  }
}

const slideContent = require('./carousely.config.js')
const carousel = new Carousel(slideContent)
const carouselGenerator = carousel.startCarousel()

for(let next of carouselGenerator){
  carouselGenerator.next()
}
