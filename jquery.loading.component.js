(function ($) {
    var loadingComponentClass = 'loadingComponent';
    var loadingElementCss     = {"display": "flex", "margin": "0 auto"};
    var loadingIconCss        = {"font-size": "75px", "color": "white"}
    var loadingComponentCss   = {
        "position": "absolute",
        "display": "flex",
        "align-items": "center",
        "z-index": "10000",
        "background-color": "rgb(0, 0, 0)",
        "background-color": "rgba(0, 0, 0, 0.6)",
        "filter":"progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)",
        "-ms-filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)"
    };

    var calculateSize = calculateSizeFn;
    var fetchPixel    = fetchPixelFn;
    var addLoading    = addLoadingFn;
    var removeLoading = removeLoadingFn;

    // This loadingComponent function is the one who you have to call
    $.fn.loadingComponent = init;

    function init(action) {
        if (action === 'destroy') {
            removeLoading(this);
            return this;
        }

        addLoadingFn(this);
        return this;
    }

    function addLoadingFn(element) {
        var size = calculateSize(element);

        var loadingDiv = $('<div/>')
            .addClass(loadingComponentClass)
            .css(loadingComponentCss)
            .css('width', size.width + "px")
            .css('height', size.height + "px")
            .html(
                $('<div/>').css(loadingElementCss).html(
                    $('<i/>').addClass('fa fa-refresh fa-spin')
                        .css(loadingIconCss)
                )
            );

        element.prepend(loadingDiv);
    }

    function removeLoadingFn(element) {
        element.find('.' + loadingComponentClass).remove();
    }

    function fetchPixelFn(string) {
        return string.substring(0, string.length-2);
    }

    function calculateSizeFn(element) {
        var totalWidth = element.css('width');
        totalWidth = totalWidth.substring(0, totalWidth.length-2);

        var totalHeight = element.css('height');
        totalHeight = totalHeight.substring(0, totalHeight.length-2);

        // Width
        var paddingLeft  = fetchPixel(element.css('padding-left'));
        var paddingRight = fetchPixel(element.css('padding-right'));
        var borderLeft   = fetchPixel(element.css('border-left').split(' ')[0]);
        var borderRight  = fetchPixel(element.css('border-right').split(' ')[0]);
        var marginLeft   = fetchPixel(element.css('margin-left'));
        var marginRight  = fetchPixel(element.css('margin-right'));

        // Height
        var paddingTop    = fetchPixel(element.css('padding-top'));
        var paddingBottom = fetchPixel(element.css('padding-bottom'));
        var borderTop     = fetchPixel(element.css('border-top').split(' ')[0]);
        var borderBottom  = fetchPixel(element.css('border-bottom').split(' ')[0]);
        var marginTop     = fetchPixel(element.css('margin-top'));
        var marginBottom  = fetchPixel(element.css('margin-bottom'));

        var height = totalHeight -
                     paddingTop - paddingBottom - borderTop -
                     borderBottom - marginTop - marginBottom;
        var width = totalWidth -
                    paddingLeft - paddingRight - borderLeft -
                    borderRight - marginLeft - marginRight;

        return {
            "height": height,
            "width": width
        };
    }
})(jQuery);
