# programmatic-video-carousel
programmatic-video-carousel

## Ever wanted a basic carousel for your videos
Finally, no more crazy clunky carousels for your content.

This video carousel is minimal, unopinionated, and easy to use.
No more importing tons of code, or dependencies just to get a carousel.
No more wrestling with these large code-bases to make simple changes and configurations.
Now you finally have a minimal tool that's built to be simple and easy to work with.


### how to set up

1) include carousely.js in your project
2) add two lines of HTML to your page where you wan the video carousel

```HTML
<div class="vid-container"></div>
<div class="dots"></div>
```

> The video container will render however many slides you provide content for
> The dots container will render a corresponding dot for however many slides there are

3) Create an object for your content data

The object shoudl container three even arrays:
A. Array of Video Titles
B. Array of Video source play
C. Array of Video description text

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

4) Create a new instance of the carousel class

5) Pass the content object, full of your data to the carousel instance

6) To style just hook into the classes that are provided in the style.css

7) If you wish to style a specific slide or add logic / behavior to a specific
  video object, you can hook into any slide or video node with the naming
  conventions used in the slide rendering funcitions.

>  Class names for slide have a prefix of .slide- and a suffix of [number]
>  together each slide can be targeted by .slide-[number]

>  IDs for each video object share the prefix of #my_video_ and the suffix of [number]
>  together, each vide can be targeted by #my_video_[number]
