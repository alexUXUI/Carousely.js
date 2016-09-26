class Carousel {

  constructor(slideContent) {
    this.videoSource = slideContent.links
    this.videoSourceLength = slideContent.links.length
    this.titles = slideContent.title
    this.copy = slideContent.copy
    this.videoContainer =  $('.vid-container')
    this.dotContainer = $('.dots')
  }

  *startCarousel() {
    yield this.renderSlideHTML()
    yield this.sourceVideos()
    yield this.renderDotHTML()
    yield this.addHoverLogicToDots()
    yield this.playFirstVideo()
    yield this.recursivelyPlaySlides()
  }

  renderSlideHTML() {
    const numberOfVideos = this.videoSource.length;
    var videos = this.videoSource;
    let uniqueId = 0;
    videos.forEach((videoSourcePath, i) => {
      this.addVideosToSlides(uniqueId, videoSourcePath)
      uniqueId++
    })
  }

  sourceVideos() {
    const numberOfVideos = this.videoSource.length;
    let videoCollection = []
    let counter = 0
    return new Promise((resolve, reject) => {
      for(let i = 0; i < numberOfVideos; i++){
        let currentVid = document.getElementById(`my_video_${ counter }`)
        videoCollection.push(currentVid)
        counter++
      }
      resolve(videoCollection)
    })
  }

  renderDotHTML() {
    var videos = this.videoSource;
    videos.map((el, i) => { if(i + 1 > 0) this.printDot(i) })
  }

  addHoverLogicToDots() {
    var dot = $('.dot').get()
    dot.forEach((dot) => {
      dot.addEventListener('mouseover' || 'click', (e) => {
        let dotNumber = dot.getAttribute('data-dot')
        this.currentlyPlayingVideo().then((data) => {
          let slideData = data.currentlyPlaying;
          let videoData = data.jQueryObj;
          let slideNumber = videoData.attr('data-video')
          let currentDot = data.currentDot
          let nextDot = data.nextDot
          if (dotNumber === slideNumber) {
            slideData.play()
          } else {
            this.getDots().then((dot) => {
              dot.forEach(function(index, dot){
                if(dot === slideNumber) {
                  index.style.backgroundColor = 'red'
                } else {
                  index.style.backgroundColor = 'black'
                }
              })
            })
            slideData.pause()
            slideData.parentNode.style.display = 'none'
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

  currentlyPlayingVideo() {
    var videos = $("[id^=my_video_]").get()
    var currentlyPlaying
    var dots = $('.dot')

    return new Promise((resolve, reject) => {
      videos.map((el, i) => {
        if (!el.paused) {
          let dataObject = {}
          dataObject.currentlyPlaying = el
          dataObject.jQueryObj = $(el)
          dataObject.currentVideoIndex = i
          dataObject.currentDot = $(dots[i])
          dataObject.nextDot = $(dots[i + 1])
          resolve(dataObject)
        } if (el.paused) {
          let currentlyPaused = el.getAttribute('data-video')
          let hideMe = document.getElementsByClassName(`slide-${ currentlyPaused }`)[0]
          hideMe.style.display = 'none'
        }
      })
    })
  }

  playFirstVideo() {
    const videoOne = document.getElementById("my_video_0")
    videoOne.play()
    $(`.dot-${ 0 }`).css('background-color', 'red')
  }

  recursivelyPlaySlides() {
    var videos = this.sourceVideos()
    var slides = this.getSlides()
    var dots = $('.dot')
    this.sourceVideos().then((videos) => {
      for(let i = 0; i < videos.length; i++) {
        let currentSlide = $(`.slide-${ i }`)[0]
        let nextSlide = $(`.slide-${ i + 1 }`)[0]
        let nextVideo = videos[i + 1]
        let firstVideo = videos[0]
        let firstSlide = slides[0]
        let firstDot = $('.dot-0')
        let currentDot = dots[i]
        let nextDot = dots[i + 1]
        if(nextDot) {
          videos[i].addEventListener('ended', () => {
            this.playNextSlide(currentSlide, nextSlide, nextVideo, currentDot, nextDot)
          })
          videos[i].addEventListener('play', () => {
            $(`.dot-${i}`).css('background-color', 'red')
          })
          videos[i].addEventListener('pause', () => {
            $(`.dot-${i}`).css('background-color', 'black')

          })
        }
        else {
          videos[i].addEventListener('ended', () => {
            this.playFirstSlide(currentSlide, firstSlide, firstVideo, currentDot, firstDot)
          })
          videos[i].addEventListener('play', () => {
            $(`.dot-${i}`).css('background-color', 'red')
          })
          videos[i].addEventListener('pause', () => {
            $(`.dot-${i}`).css('background-color', 'black')
          })
        }
      }
    })
  }

  playNextSlide(currentSlide, nextSlide, nextVideo, currentDot, nextDot) {
    currentSlide.style.display = "none"
    nextSlide.style.display = "flex"
    nextVideo.style.display = "flex"
    currentDot.style.backgroundColor = 'black'
    nextDot.style.backgroundColor = 'red'
    nextVideo.play();
  }

  playFirstSlide(currentSlide, firstSlide, firstVideo, currentDot, firstDot) {
    currentSlide.style.display = "none"
    firstSlide.style.display = 'flex'
    firstVideo.style.display = "flex"
    currentDot.style.backgroundColor = 'black'
    $(`.dot-0`).css('background-color', 'red')
    firstVideo.play()
  }

  getSlides() {
    const numberOfVideos = this.videoSource.length
    var slideCollection = []
    for(let i = 0; i < numberOfVideos; i++) {
      let currentVid = $(`.slide-${ i }`)[0]
      slideCollection.push(currentVid)
      i++
    }
    return slideCollection
  }

  getDots() {
    var dots = $('.dot')
    var dotCollection = []
    return new Promise(function(resolve, reject){
      dots.map(function(index, element){
        dotCollection.push(element)
      })
      resolve(dotCollection)
    })
  }

  addVideosToSlides(uniqueId, videoSource) {
    let newSlide = `<div class="slide-${ uniqueId } slide"></div>`
    this.videoContainer.append(newSlide).css('display', 'flex')
    let textContent = `<div class="text-content-${ uniqueId }"><h3 class="video-title">${ this.titles[ uniqueId ] }</h3><p class="video-description">${ this.copy[ uniqueId ] }</p></div>`
    let currentVideo = `<video id="my_video_${ uniqueId }" data-video="${ uniqueId }" src="${ videoSource }" controls preload="auto" muted class="vid_${ uniqueId }"></video>`
    if (uniqueId === 0) $(`.slide-${ uniqueId }`).append(currentVideo).append(textContent)
    else $(`.slide-${ uniqueId }`).append(currentVideo).append(textContent).css('display', 'none')
  }

  printDot(index) {
    this.dotContainer.append(`<div class="dot-${ index } dot" data-dot="${ index }">•</div>`)
  }
}

const slideContent = require('./carousely.config.js')
const carousel = new Carousel(slideContent)
const carouselGenerator = carousel.startCarousel()

for(let carouselFunction of carouselGenerator){
  carouselGenerator.next()
}
