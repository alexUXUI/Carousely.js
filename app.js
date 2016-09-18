const content = {
  copy:  ['lorem ispsum dolor 1','lorem ispsum dolor 2','lorem ispsum dolor 3'],
  title: ['title ispsum dolor 1','title ispsum dolor 2','title ispsum dolor 3'],
  links: ['http://vjs.zencdn.net/v/oceans.mp4','http://vjs.zencdn.net/v/oceans.mp4','http://vjs.zencdn.net/v/oceans.mp4','http://vjs.zencdn.net/v/oceans.mp4']
}

class Carousel {

  constructor(content){
    this.videoSource = content.links
    this.videoContainer =  $('.vid-container')
  }

  createSlides() {
    var sourceAttributes = this.videoSource;
    let counterLength = this.videoSource.length;
    let suffix = 0;
    sourceAttributes.forEach( (el, i) => {
      if(i === 0) this.createVisibleSlide(suffix, el)
      else this.createInvisibleSlide(suffix, el)
      suffix++
    })
  }

  getVids() {
    var countLength = this.videoSource.length;
    var videoCollection = []
    let counter = 0
      for(var i = 0; i < countLength; i++){
        var currentVid = document.getElementById(`my_video_${ counter }`);
        videoCollection.push(currentVid)
        counter++
      }
    return videoCollection
  }

  playSlides() {
    var vidz = this.getVids()
    for(var i = 0; i < vidz.length; i++){

      let next = vidz[i + 1]
      let prev = vidz[i - 1]
      let curr = vidz[i]
      let currSlide = document.getElementsByClassName(`slide-${ i }`)[0]
      let nextSlide = document.getElementsByClassName(`slide-${ i + 1 }`)[0]
      let prevSlide = document.getElementsByClassName(`slide-${ i - 1 }`)[0]

      console.log(
        'play next' +
        ' next ',       next,
        ' curr ', curr,
        ' nextSlide ' , nextSlide,
        ' currSlide ' , currSlide,
        ' prevSlide ' , prevSlide
      )

      if(typeof vidz[i + 1] != 'undefined') {

        vidz[i].addEventListener('ended', () => {

          curr.style.display = "none"
          next.style.display = "flex"
          next.style.backgroundColor = "blue"
          currSlide.style.display = "none"
          nextSlide.style.display = "flex"
          next.play();
        })

      } else {

        let vidUno = vidz[0]
        vidz[i].addEventListener('ended', () => {
          console.log("play video 1")
          vidUno.style.display = "flex"
          vidUno.play()
        })
      }
    }
  }

  createVisibleSlide(suff, elem) {
    let newSlide = `<div class="slide-${ suff }"></div>`
    this.videoContainer.append(newSlide).css("display", "flex")
    $(`.slide-${ suff }`).append(`<video id="my_video_0" controls preload="auto" class="slide" src="${ elem }" onended="console.log('its over')"> </video>`)
  }

  createInvisibleSlide(suff, elem){
    let newSlide = `<div class="slide-${ suff }"></div>`
    this.videoContainer.append(newSlide).css('display', 'flex')
    $(`.slide-${ suff }`).append(`<video id="my_video_${ suff }" controls preload="auto" class="slide" src="${ elem }"> </video>`).css('display', 'none')
  }

  *startCarousel () {
    yield this.createSlides()
    $('.description').append(content.copy[0])
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

$('.dot-one').on(  'mouseover', () => console.log('rolled over 1'))
$('.dot-two').on(  'mouseover', () => console.log('rolled over 2'))
$('.dot-three').on('mouseover', () => console.log('rolled over 3'))

function playVid(vid) { vid.play(vid); }
function pauseVid(vid) { vid.pause(vid); }
