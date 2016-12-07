(function () {
    "use strict";
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable);
    // For custom element jga-sortable


    function jgaSortable() {

        function init() {

            $("jga-sortable")
                .sortable({
                    axis: "y"
                });

        }
        init();

        var directive = {
            jgaSortable: jgaSortable
        };
        return directive;

    }


})();