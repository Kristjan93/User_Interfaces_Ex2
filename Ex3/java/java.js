// Pseudo code


var firstparallaxslider = new parallaxSlider({
    wrapperid: 'myparallaxslider', //ID of DIV on page to house slider
    displaymode: {
        // Auto or manual
        type: 'auto',
        // Pause between slides,
        pause: 3000,
        // Number of cycles before the slider stops in automatic mode
        cycles: 0,
        stoponclick: true,
        pauseonmouseover: true
    },
    //transition duration (milliseconds)
    slideduration: 1000,
    // delay in milliseconds between the revealing of each description layer inside a slide
    delaybtwdesc: 500,
    // path to nav images
    navbuttons: ['left.png', 'right.png', 'up.png', 'down.png'],
    // CSS class that gets added to currently shown DIV slide
    activeslideclass: 'selectedslide',
    //Valid values: "h" or "v"
    orientation: 'h',
    //remember last viewed slide and recall within same session?
    persist: true
})