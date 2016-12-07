(function () {
    "use strict";
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable);
    // For custom element jga-sortable


    function jgaSortable() {



            function linker(scope, element, attrs) {

                var start = null;
                var end = null;

                element
                    .sortable({
                        axis: "y",
                        start: function (event, ui) {
                            start = $(ui.item).index();
                        },
                        end: function (event, ui) {
                            end = $(ui.item).index();
                            scope.sortController.sort(start, end);
                        }

                    });

            }


            var directive = {
                scope: {},
                link: linker,
                controller: sortController,
                controllerAs: "sortController"
            };
            return directive;



            function sortController(WidgetService, $routeParams) {
                var vm = this;
                vm.sort = sort;
                vm.pageId = $routeParams.pid;

                var sort = function(start, end) {
                    WidgetService.sort(start, end, vm.PageId)
                        .success(function(){
                        })
                        .error(function(){});
                }

            }


    }


})();