
(function($) {

    $.fn.csDialog = function(options) {

        var $this = this;
        var maxHeight = $(window).height() - 100;
        var settings = $.extend({
            height: Math.min(800, maxHeight),
            width: 600,
                onClosing: null
            },
            options);


        var dialog = $('#csDialogContainer');

        if (dialog.length === 0) {
            dialog = $("<div id='csDialogContainer' class='cs-dialog'></div>")
                .appendTo('body');
        }

        dialog
            .empty()
            .append(
                $("<div class='cs-dialog-content'><div><span id='csDialogClose'>Close</span></div></div>").append(
                    $("<div class='cs-dialog-body'></div>")
                    .height(settings.height - 70)
                    .append($this)
                )
                .height(settings.height)
                .width(settings.width)
            );

        dialog.on('click',
            '#csDialogClose',
            function () {
                if (settings.onClosing) {
                    settings.onClosing.apply(dialog);
                }

                $('body').removeClass('modal-open');
                $('#csDialogContainer').remove();
            });

        $('body').addClass('modal-open');
        dialog.show();

        var body = dialog
            .find('.cs-dialog-body');

        setTimeout(function() {
            dialog
                .find('.cs-dialog-body > *')
                .height(body.height())
                .width(body.width())
                .css('max-height', maxHeight);
        });

        return this;
    };

}(jQuery));