# Carousely.js
##### A small tool made for building video carousels.

Carousely.js takes any amount of content you
provide and will create slides with three components: `Title, Video, and Description.` Carosuley plays the first video. Once the first video ends, it will recursively play every video after until there are no more videos. In that case, carousely will play the first video again. Forever looping through your videos.

##### Philosophy
Finally, no more clunky carousels for your content.

Carousely is minimal, un-opinionated, and easy to use.
All you need is jQuery and `carousely.js`

No more wrestling with large code-bases to make simple changes and configurations.
Now you finally have a minimal tool that's built to be simple and easy to work with.

### how to set up

1) Include `carousely.js` and `jQuery` in your project

2) Add two lines of HTML to your page where you wan the video carousel

```HTML
<div class="vid-container"></div>
<div class="dots"></div>
```

> The video container will render however many slides you provide content for
> The dots container will render a corresponding dot for however many slides there are

3) Create an object for your content data

The object should contain three _even_ arrays:

>1 Array of Video Titles

>2 Array of Video source play

>3 Array of Video description text

```javascript

const content = {
  copy:  [
    'lorem ispsum dolor 1',
    'lorem ispsum dolor 2',
  ],
  title: [
    'title ispsum dolor 1',
    'title ispsum dolor 2',
  ],
  links: [
    'http://vjs.zencdn.net/v/oceans.mp4',
    'http://vjs.zencdn.net/v/oceans.mp4',
  ]
}
```

> Each array must have the same length for the slides to work

4) Create a new instance of the carousel class, Pass the content object, full of your data to the carousel instance

```javascript
var carousel = new Carousel(content)

```

5) If you wish to style a specific slide or add logic / behavior to a specific
  video object, you can hook into any slide or video node with the naming
  conventions used in the slide rendering funcitions.

>  Class names for slide have a prefix of .slide- and a suffix of [number]
>  together each slide can be targeted by .slide-[number]
> Each slide shares the base class of .slide so you can hook into every slide instance using .slide

```css

/* all slides */

.slide {
  targets all slides
}

/* individual slides */

.slide-0 {
  your styles here
}

```

>  IDs for each video object share the prefix of #my_video_ and the suffix of [number]
>  together, each vide can be targeted by #my_video_[number]

```css

/* all videos */

#vid {
  targets all video instances
}

/* individual slides */

 #my_video_0 {
  your styles here
}

```

#### known bugs

- once a video is over the video element disappears --> this should not happen

- if the user manually pauses a video and scrolls over another, the
paused video does not disappear
