'use strict';
var app = app || {};

console.log(app);

(function() {

    class Notifier {
        showNotification(text, type) {
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-bottom-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "1",
                "hideDuration": "100",
                "timeOut": "1500",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
            if (type === 'success') {
                toastr.success(text);
            } else if (type === 'error') {
                toastr.error(text);
            }
        }
    }

    app.notifier = new Notifier();
}());