$(document).ready(function () {

    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();

    // Initialize metisMenu plugin to sidebar menu
    // Moved this to MenuController in order to initialize the plugin when the page has been rendered.
    // $('#side-menu').metisMenu();

    // Handle minimalize sidebar menu
    $('body').on('click', '.hide-menu', function(event){
        event.preventDefault();
        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        } else {
            $("body").toggleClass("hide-sidebar");
        }
        // We need to notify that the screen is resized.
        // Wait until the animation finish
        setTimeout(function() {
            $(window).trigger('resize');
        }, 600);
    });

    // Initialize iCheck plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    // Initialize animate panel function
    $('.animate-panel').animatePanel();

    // Function for collapse hpanel
    $('body').on('click', '.showhide', function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        var icon = $(this).find('i:first');
        var body = hpanel.find('div.panel-body');
        var footer = hpanel.find('div.panel-footer');
        body.slideToggle(300);
        footer.slideToggle(200);

        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        hpanel.toggleClass('').toggleClass('panel-collapse');
        setTimeout(function () {
            hpanel.resize();
            hpanel.find('[id^=map-]').resize();
        }, 50);
    });

    // Function for close hpanel
    $('body').on('click', '.closebox', function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        hpanel.remove();
    });

    // Set minimal height of #wrapper to fit the window
    // Moved this to MenuController in order to set the minimal height when the page has been rendered.
    // fixWrapperHeight();

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body")

});

$(window).bind("load", function () {
    // Remove splash screen after load
    $('.splash').css('display', 'none')
})

$(window).bind("resize click", function () {
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();
    fixWrapperHeight();
})

function fixWrapperHeight() {
    // Get and set current height
    var headerH = 62;
    var navigationH = $("#navigation").height();
    var contentH = $(".content").height();

    // Set new height when contnet height is less then navigation
    if (contentH < navigationH) {
        $("#wrapper").css("min-height", navigationH + 'px');
        $("#visualization-chart-editor").css("min-height", navigationH - 215 + 'px');
    }

    // Set new height when contnet height is less then navigation and navigation is less then window
    if (contentH < navigationH && navigationH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH  + 'px');
        $("#visualization-chart-editor").css("min-height", $(window).height() - headerH  - 215  + 'px');
    }

    // Set new height when contnet is higher then navigation but less then window
    if (contentH > navigationH && contentH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH + 'px');
        $("#visualization-chart-editor").css("min-height", $(window).height() - headerH - 215 + 'px');
    }
}


function setBodySmall() {
    if ($(this).width() < 769) {
        $('body').addClass('page-small');
    } else {
        $('body').removeClass('page-small');
        $('body').removeClass('show-sidebar');
    }
}

// Animate panel function
$.fn['animatePanel'] = function() {

    var element = $(this);
    var effect = $(this).data('effect');
    var delay = $(this).data('delay');
    var child = $(this).data('child');

    // Set default values for attrs
    if(!effect) { effect = 'zoomIn'};
    if(!delay) { delay = 0.06 } else { delay = delay / 10 };
    if(!child) { child = '.row > div'} else {child = "." + child};

    //Set defaul values for start animation and delay
    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;

    // Get all visible element and set opactiy to 0
    var panel = element.find(child);
    panel.addClass('opacity-0');

    // Get all elements and add effect class
    panel = element.find(child);
    panel.addClass('animated-panel').addClass(effect);

    // Add delay for each child elements
    panel.each(function (i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's')
        // Remove opacity 0 after finish
        $(elm).removeClass('opacity-0');
    });
}