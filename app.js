const content = {
  copy:  ['lorem ispsum dolor 1','lorem ispsum dolor 2','lorem ispsum dolor 3', 'lorem ispsum dolor 4'],
  title: ['title ispsum dolor 1','title ispsum dolor 2','title ispsum dolor 3', 'title ispsum dolor 4'],
  links: ['http://vjs.zencdn.net/v/oceans.mp4','http://vjs.zencdn.net/v/oceans.mp4','http://vjs.zencdn.net/v/oceans.mp4','http://vjs.zencdn.net/v/oceans.mp4']
}

class Carousel {

  constructor(content) {
    this.videoContainer =  $('.vid-container')
    this.videoSource = content.links
    this.videoSourceLength = content.links.length
    this.titles = content.title
    this.copy = content.copy
  }

  createSlides() {
    var sourceAttributes = this.videoSource;
    let counterLength = this.videoSource.length;
    let suffix = 0;
    sourceAttributes.forEach((el, i) => {
      if(i === 0) {
        this.createVisibleSlide(suffix, el)
      } else {
        this.createInvisibleSlide(suffix, el)
      }
      suffix++
    })
  }

  getVids() {
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
    var vidz = this.getVids()
    var slidez = this.getSlides()
    this.getVids().then(function(vidz) {
      for(var i = 0; i < vidz.length; i++) {
        let next = vidz[i + 1]
        let prev = vidz[i - 1]
        let curr = vidz[i]
        let currSlide = document.getElementsByClassName(`slide-${ i }`)[0]
        let nextSlide = document.getElementsByClassName(`slide-${ i + 1 }`)[0]
        let prevSlide = document.getElementsByClassName(`slide-${ i - 1 }`)[0]
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

  createVisibleSlide(suff, elem) {
    let newSlide = `<div class="slide-${ suff }"></div>`
    this.videoContainer.append(newSlide).css("display", "flex")
    $(`.slide-${ suff }`).append(
      `<video
        id="my_video_0"
        controls preload="auto"
        class="slide"
        src="${ elem }"
        onended="console.log('its over')">
      </video>`
    ).append(`<h3>${this.titles[suff]}</h3>`
    ).append(`<p>${this.copy[suff]}</p>`)
  }

  createInvisibleSlide(suff, elem){
    let newSlide = `<div class="slide-${ suff }"></div>`
    this.videoContainer.append(newSlide).css('display', 'flex')
    $(`.slide-${ suff }`).append(
      `<video id="my_video_${ suff }"
        controls preload="auto"
        class="slide"
        src="${ elem }">
      </video>`
    ).append(`<h3>${this.titles[suff]}</h3>`
    ).append(`<p>${this.copy[suff]}</p>`
    ).css(
      'display', 'none'
    )
  }

  *startCarousel () {
    yield this.createSlides()
    var videoOne = document.getElementById("my_video_0");
    videoOne.play()
    yield this.getVids()
    yield this.playSlides()
  }
}

var carousel = new Carousel(content)
carousel.startCarousel()

var carouselGenerator = carousel.startCarousel()
carouselGenerator.next()
carouselGenerator.next()
carouselGenerator.next()
carouselGenerator.next()
