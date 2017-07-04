;
(function() {
    function toArrayByClassName(nodes) {
        return [].slice.call(document.getElementsByClassName(nodes))
    }

    function distanceToTop(element) {
        return parseInt(element.offsetTop - window.pageYOffset);
    }



    /*cross browser addClass*/


    var doc = document,
        //toArrayByClassName = nodes => [].slice.call(doc.getElementsByClassName(nodes)),
        prev = doc.getElementById('prev'),
        next = doc.getElementById('next'),
        prev2 = doc.getElementById('prev-2'),
        next2 = doc.getElementById('next-2'),
        //slides = toArrayByClassName('img'),
        slider_video = doc.getElementById('slider-video'),
        slides_video_img = toArrayByClassName('img-bind'),
        video_container = doc.getElementById('video-container'),
        films = ['lqzJqeeOAlQ', '2JOoto47aLE', 'ILek6YF1iac', 'lqzJqeeOAlQ'],
        player,
        details = doc.getElementById('details'),
        showDetails = doc.getElementById('show-details'),
        hideDetails = doc.getElementById('hide-details'),
        opacity_switch = false,
        lazyLoad = toArrayByClassName('lazy'),
        wrapper = doc.getElementById('wrapper');




    var Logos = (function(settings) {
        var zero = new Array(14).fill(),
        logosImgItem = toArrayByClassName(settings.imgCssClass),
         invoke,
         stop;
        var getRandomRange = function(min, max) {

            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;

        }
        var imgSet = zero.map(function(element, index) {
            return element = index;
        })

        logosImgItem.forEach(function(element, index) {
            element.src = `./img/logos/logo-${imgSet[index]}.jpg`;
        })

        var draft = imgSet.splice(logosImgItem.length)
        var animation = function() {

            var random = getRandomRange(0, logosImgItem.length - 1);
            logosImgItem.forEach(function(element) {
                element.className = "logos__img";
            })
            logosImgItem.forEach(function(element, index) {
                if (random == index) {
                    element.classList.toggle("hide");
                    setTimeout(function() {
                        var newImg = draft.shift();
                        draft.push(imgSet[index])
                        imgSet[index] = newImg;
                        element.src = `./img/logos/logo-${newImg}.jpg`;
                    }, 1500)
                }
            })
        }

        return {
            invoke: function() {
                invoke = setInterval(animation, 4000);
            },
            stop: function() {
                stop = clearInterval(invoke)

            }
        }
    })({imgCssClass:"logos__img"})
    Logos.invoke()









    showDetails.addEventListener('click', scrollIt(details))
    hideDetails.addEventListener('click', scrollIt(wrapper))

    var detailsState = (function() {
        var state = false;

        function add() {
            state = true;
        }

        function sub() {
            state = false;
        }
        return {
            getState: function() {
                return state;
            },
            switcher: function() {
                state ? state = false : state = true;
            }
        }
    })()
    window.addEventListener('scroll', lazyLoader)

    function lazyLoader() {
        //  console.log(lazyLoad)
        //  var distance=distanceToTop(details);
        //  console.log('scrolling',window.pageYOffset-distance)
        lazyLoad.forEach(function(element, index) {
            var elementHeight = element.scrollHeight;
            var distance = distanceToTop(element);

            if (window.innerHeight - element.scrollHeight < window.pageYOffset - distance) {
                element.classList.add("opacity")
            }
            if (distance > window.innerHeight - elementHeight / 2 || elementHeight == 0) {

                element.classList.remove("opacity");

                //removeCssClass(element, 'opacity')

            }

        })



    }


    function scrollIt(destination) {

        var stateID;
        return function() {

            var state = detailsState.getState();
            console.log('state before click', state)
            if (!state) {
                details.className = "details display";
                showDetails.innerHTML = "hide"
                doc.body.style.overflow = "hidden";
                detailsState.switcher()
                console.log('state after click ', state)
            } else if (state) {

                //details.className = "details";
                doc.body.style.overflow = "hidden";
                showDetails.innerHTML = "learn more"
                detailsState.switcher()
                console.log('state return ', state)
            }
            /*always reset previous Interval*/
            clearInterval(stateID);
            setTimeout(function() {
                stateID = setInterval(scrollIncrement, 5);
            }, 500)


            function scrollIncrement() {
                /*
                FireFox and Internet Explorer use 'var html' height
                Chrome,Safari use 'var body' height
                startPoint + window.innerHeight === document.body.scrollHeight -> if true - bottom of document
                percentage ->quantity of scrolled %
                increment ->relative to percentage
                Math.ceil - round to biger number, if we go Down
                MAth.floor - round to less number, if we go Up
                */
                /*scrolltop scrollheight*/

                var html = document.documentElement,
                    body = document.body,
                    startPoint = window.pageYOffset || body.scrollTop || html.scrollTop,
                    toTop = distanceToTop(destination),
                    endPoint = Math.abs(toTop),
                    direction = toTop / endPoint,
                    bottom = endPoint + window.pageYOffset,
                    percentage = startPoint / ((bottom / 100)),
                    calculateStep = direction * (50 - ((50 / 100) * (percentage))),
                    increment;
                console.log('toTop', direction)

                direction > 0 ? increment = Math.ceil(calculateStep) : increment = Math.floor(calculateStep)
                if (endPoint != 1) {
                    var newY = startPoint + increment;
                    window.scrollTo(0, newY);
                } else {
                    if (direction < 0) {
                        console.log('direction less then 0, direction UP')
                        details.className = "details";
                    }
                    console.log('direction', direction)

                    clearInterval(stateID);
                    opacity_switch = true;
                    doc.body.style.overflow = "auto";



                    lazyLoader()
                }

            } //scrollIncrement
        }

    }






    function Slider(slides) {
        this.slides = toArrayByClassName(slides);
        this.slidesVideoImg = toArrayByClassName('img-bind');
        this.indexArray = ['0%', '100%', '200%', '300%'];
        this.currentSlide = 1;
        this.changeSlides();

    }

    Slider.prototype.changeSlides = function() {
        this.transitionEvent && this.slides[0].addEventListener(this.transitionEvent, this.transitionLogic);


        this.slidesVideoImg.forEach(function(element) {
            element.style.opacity = 0;
        })
        this.slidesVideoImg[this.currentSlide].style.opacity = "1";
    }
    Slider.prototype.getCurrentSlideIndex = function() {
        return this.currentSlide;
    }
    Slider.prototype.incrementSlideIndex = function(increment) {

        this.currentSlide += increment;
        this.currentSlide > this.slides.length - 1 ? this.currentSlide = 0 : false;
        this.currentSlide < 0 ? this.currentSlide = this.slides.length - 1 : false;

        this.slides.forEach(function(element) {
            var attr = parseInt(element.getAttribute('data-index'));
            attr += increment;
            attr > 3 ? attr = 0 : false;
            attr < 0 ? attr = 3 : false;

            element.setAttribute('data-index', attr);
        })
    }
    Slider.prototype.animatedSlide = function(dataIndex) {
        var app = this;
        this.slides.forEach(function(element, index) {

            var computed = getComputedStyle(element)
            var data_index = parseInt(element.getAttribute('data-index'));

            if (data_index == dataIndex) {

                element.style.zIndex = "-1";
            }
            element.style.left = app.indexArray[data_index];
        })
    }

    Slider.prototype.transitionEvent = function() {


        this.transitionEvent = (function() {
            var t;
            var el = slides[0]
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            }

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        })()
        return this.transitionEvent;
    }
    Slider.prototype.transitionLogic = function() {

        var app = this;
        app.slides.forEach(function(element, index) {
            var data_index = parseInt(element.getAttribute('data-index'));
            if (data_index == 0) {

                var computed = getComputedStyle(element)
                if (computed.left == '0px') {

                    element.style.zIndex = "1";
                }
            }
            if (data_index == app.slides.length - 1) {

                element.style.zIndex = "1";

            }
        })

    }
    Slider.prototype.move = function(increment, dataIndex, binded) {


        var app = this;

        return function() {
            app.transitionLogic()
            app.incrementSlideIndex(increment);
            binded ? app.changeSlides() : false;

            app.animatedSlide(dataIndex)
        }
    }
    var app = new Slider('img-1')


    prev.addEventListener('click', app.move(1, 0, true));
    next.addEventListener('click', app.move(-1, 3, true))


    var app2 = new Slider('img-2');


    prev2.addEventListener('click', app2.move(1, 0, false));
    next2.addEventListener('click', app2.move(-1, 3, false))


    slider_video.addEventListener('click', function(e) {
        var loadScript = (function() {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/player_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        })()
        if (player) {
            player.loadVideoById({
                'videoId': films[app.getCurrentSlideIndex()]
            });
            player.playVideo();
            video_container.className = "video-container show";
        }
    })
    window.onYouTubePlayerAPIReady = function() {

        player = new YT.Player('player', {
            height: '1000',
            width: '1000',
            playerVars: {
                'controls': 0,
                'rel': 0,
                'modestbranding': 0,
                'autoplay': 1,
                'enablejsapi': 1

            },
            events: {
                'onReady': onReady,
                'onStateChange': closeVideo
            }

        });

        function onReady(e) {

            player.loadVideoById({
                'videoId': films[app.getCurrentSlideIndex()]
            });
            //  player.playVideo()
            setTimeout(function() {
                video_container.className = "video-container show";
            }, 500)

        }

        function closeVideo(e) {

            if (e.data == 2 || e.data == 0) {
                video_container.className = "video-container";
                player.stopVideo();
                return;
            }
        }
    }



})() //global IIF


;
(function() {

    function toArrayByClassName(nodes) {
        return [].slice.call(document.getElementsByClassName(nodes))
    }
    var doc = document,
        //toArrayByClassName = nodes => [].slice.call(doc.getElementsByClassName(nodes)),
        header = doc.getElementById('header'),
        prev = doc.getElementById('prev'),
        next = doc.getElementById('next'),
        navItem = toArrayByClassName('nav-item'),
        dropdownContainer = toArrayByClassName('dropdown-container'),
        dropdownMenu = toArrayByClassName('dropdown-menu'),
        parallaxItem = toArrayByClassName('anim-item-1'),
        animatedBlocks = toArrayByClassName('anim-item-2'),
        animatedBlocks3 = toArrayByClassName('anim-item-3'),
        slides = toArrayByClassName('slide');



    /**
     *@param {object} settings, properties: prev/next(button objects), slides (slide, usually 'LI' element)
     */
    var slider = (function(settings) {

        /*private method*/
        var currentIndex = 0,
            slideIndex = 1,
            slideClick,
            /*closure*/
            wrapper = n => slideClick = () => slideRender(slideIndex += n);
        settings.prev.addEventListener('click', wrapper(-1));
        settings.next.addEventListener('click', wrapper(1));
        /*private method*/
        function slideRender(n) {
            var i,
                slides = settings.slides;

            n > slides.length ? slideIndex = 1 : false;
            n < 1 ? slideIndex = slides.length : false;

            slides.forEach(function(element, index) {
                element.style.display = "none";
                index == slideIndex - 1 ? element.style.opacity = "0" : false;
            });
            slides[slideIndex - 1].style.display = "block";
            setTimeout(function() {
                slides[slideIndex - 1].style.opacity = "1";
            }, 0)

        }
        slideRender(slideIndex);
        return {
            wrapper: wrapper,
            slideRender: slideRender
        }
    })({
        prev: prev,
        next: next,
        slides: slides
    });




    window.addEventListener('resize', function(e) {
        function transitionNone(element) {
            element.style.transition = "none";
        }
        var mix = parallaxItem.concat(animatedBlocks, animatedBlocks3 /*, navItem*/ );
        mix.forEach(transitionNone);
    });
    window.addEventListener('load', function(e) {
        parallaxItem.forEach(function(element) {
            element.style.transition = "all 1s ease";
        })
        setTimeout(function() {
            window.scrollTo(0, 0);
        });
    });

    doc.addEventListener("scroll", function(e) {
        var run = new Promise(
            function(res, rej) {
                var pageYOffset = window.pageYOffset;
                if (e) {
                    if (pageYOffset < 10) {
                        header.className = "";
                    }
                    if (pageYOffset > 100) {
                        header.className = "scrolled";
                        parallaxItem.forEach(function(element, index) {
                            element.className = "anim-item-1 item-" + (index + 1);
                        });
                    }
                    if (pageYOffset > 400) {
                        animatedBlocks.forEach(function(element, index) {
                            element.className = "anim-item-2 item-" + (index + 5);
                        })
                    }
                    if (pageYOffset > 600) {
                        animatedBlocks3.forEach(function(element, index) {
                            element.className = "anim-item-3 item-" + (index + 8);
                        })
                    }

                    res('done')
                } else {
                    rej('cancel')
                }
            }
        );
        run.then(function(result) {

        })
    });
})
