(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function () {
                console.log('Service Worker Registered');
            });
    }
})();

$(document).ready(function () {
    function scroll() {
        $("html, body").animate({
            scrollTop: $(document).height()
        }, 1700);
    }
    setTimeout(scroll, 2500);
    /*step switch*/
    var $btnNext = $('.step-btn');
    var currentStep = 0;
    var $step = $('.step-item');
    var totalStep = $step.length;
    $btnNext.not('.submit-btn').on('click', function () {
        currentStep++;
        $step.hide().eq(currentStep).fadeIn();
        $('.pagination-item.active').next().addClass('active');
        if (currentStep === totalStep - 2) {
            loadResults();
            $('.pagination-block').hide();
        }
        $('.slider-item.active').removeClass('active').next().addClass('active');
        $('.slider-item.preload').next().addClass('preload');
        scroll();
    });
    /*load results*/
    function loadResults() {
        var $loadTitle = $('.load-item');
        var total = $loadTitle.length;
        var i = 0;
        var loadInterval;
        var intervalTime = 1000;
        loadInterval = setInterval(function () {
            if (i < total) {
                $loadTitle.hide().eq(i).show();
                i++;
            } else {
                clearInterval(loadInterval);
                $('.loader').hide();
                currentStep++;
                $step.hide().eq(currentStep).fadeIn();
                scroll();
            }
        }, intervalTime)
    }
});