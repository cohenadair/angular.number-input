/*
    Options:
        - ngModel
        - start: the starting value; default 0
        - min: the minimum value; default no limit
        - max: the maximum value; default no limit
        - step: amount the arrows increase/decrease by default 1
        - hint: small string under input element; default depends on min/max
        - hideHint: default false
        - disableDecimals: default false
        - decimalPlaces: number of decimal places to round to; default to decimal places in step
 */

(function() {
    var app = angular.module("lh.number-input", []);

    app.directive("numberInput", function() {
        return {
            restrict: 'E',
           
            templateUrl: '../utils/directives/number-input/number-input.html',
            
            scope: {
                model: "=ngModel",
                start: "=start",
                min: "=min",
                max: "=max",
                step: "=step",
                hint: "@hint",
                hideHint: "=hideHint",
                disableDecimal: "=disableDecimal",
                decimalPlaces: "=decimalPlaces"
            },

            controller: ["$scope", function($scope) {

                // used to validate key presses
                var prevKey = null;

                var HINT_MAX = "Less than or equal to " + $scope.max;
                var HINT_MIN = "Greater than or equal to" + $scope.min;
                var HINT_BOTH = $scope.min + "-" + $scope.max;

                // increment model by step
                this.inc = function() {
                    if (isMaxed() || prevKey != null)
                        return;

                    $scope.model += $scope.step;
                    validate();
                };

                // decrement model by step
                this.dec = function() {
                    if (isMinnd() ||  prevKey != null)
                        return;

                    $scope.model -= $scope.step;
                    validate();
                };

                this.onKeyPress = function(e) {
                    if (validKey(e.key))
                        prevKey = e.key;
                };

                this.onChange = function() {
                    if (prevKey == "." || prevKey == "-")
                        return;
                    validate();
                };

                this.hint = function() {
                    // hide hint if no max/min were given
                    if ((!isMaxValid() && !isMinValid())) 
                        return $scope.hideHint = true;
                    
                    // user specified hint
                    if ($scope.hint) 
                        return $scope.hint;
                    
                    // hint if only a maximum was specified
                    if (isMaxValid() && !isMinValid()) 
                        return HINT_MAX;
                    
                    // hint if only a minimum was specified
                    if (isMinValid() && !isMaxValid()) 
                        return HINT_MIN;
                    
                    // hint if both a maximum and minimum was specified
                    if (isMaxValid() && isMinValid()) 
                        return HINT_BOTH;
                };

                // returns true if the model is >= the maximum
                var isMaxed = function() {
                    return ($scope.max != null) && $scope.model >= $scope.max;
                };

                // returns true if the model is <= the minimum
                var isMinnd = function() {
                    return ($scope.min != null) && $scope.model <= $scope.min;
                };

                var isMaxValid = function() {
                    return ($scope.max != null);
                };

                var isMinValid = function() {
                    return ($scope.min != null);
                };

                var validKey = function(key) {
                    return !(key == "-" && $scope.min >= 0) &&      // trying to input negaitive if minimum is >= 0
                           (key == "." && !$scope.disableDecimal);  // trying to input decimal when they are disabled
                }

                // validates the current model
                // if it is higher/lower than max/min, will reset to max/min
                var validate = function() {
                    $scope.model = +parseFloat($scope.model).toFixed($scope.decimalPlaces);

                    if (isMaxed()) $scope.model = $scope.max;
                    if (isMinnd()) $scope.model = $scope.min;

                    prevKey = null;
                };

                // returns the number of decimal places in $scope.step
                var getDecimalPlaces = function() {
                    var str = $scope.step.toString();
                    if (str.indexOf(".") >= 0)
                        return str.split(".")[1].length;
                    return 0;
                };

                // defaults
                $scope.step = $scope.step || 1;  
                $scope.hideHint = $scope.hideHint || false;
                $scope.disableDecimal = $scope.disableDecimal || false;
                $scope.decimalPlaces = $scope.decimalPlaces || getDecimalPlaces();
                $scope.model = $scope.model || $scope.start || 0;
            }],

            controllerAs: "numberInput"
        };
    });
})();