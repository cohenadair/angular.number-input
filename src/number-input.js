/**
 * number-input.js
 * author: Cohen Adair
 * license: GNU GPL v2
 */

(function() {
    var app = angular.module("number-input", []);

    app.directive("numberInput", function() {
        return {
            restrict: 'E',
           
            templateUrl: 'src/number-input.html',
            
            scope: {
                model: "=ngModel",
                start: "=?start",
                min: "=?min",
                max: "=?max",
                step: "=?step",
                hint: "@?hint",
                hideHint: "=?hideHint",
                disableDecimal: "=?disableDecimal",
                decimalPlaces: "=?decimalPlaces",
                options: "=?options"
            },

            controller: ["$scope", function($scope) {

                // used to validate key presses
                var prevKey = null;

                var KEY_ZERO = 48;
                var KEY_NINE = 57;
                var KEY_PERIOD = 190;
                var KEY_DASH = 189;
                var KEY_SPACE = 32;

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
                    if (e.keyCode == KEY_SPACE)
                        validate();

                    if (validKey(e.keyCode))
                        prevKey = e.keyCode;
                };
                
                this.onChange = function() {
                    if (!isModelMaxLength())
                        return;

                    // skip validation for certain keys
                    if (prevKey == KEY_PERIOD || 
                        prevKey == KEY_DASH || 
                        (prevKey == KEY_ZERO && numberHasDecimal($scope.model))) return;
                    
                    validate();
                };

                this.onBlur = function() {
                    validate();
                    if (!$scope.model)
                        $scope.model = $scope.start || 0;
                };

                var isModelMaxLength = function() {
                    if (!isMaxValid() || !isMinValid())
                        return true;

                    // the length of the input only needs to be checked if both the max AND min are
                    // 1. positive
                    // 2. negative
                    if (!(($scope.max >= 0 && $scope.min >= 0) || ($scope.max <= 0 && $scope.min <= 0)))
                        return true;

                    var maxStrLen = $scope.max.toString().length;
                    var minStrLen = $scope.min.toString().length;
                    var len = (maxStrLen > minStrLen) ? maxStrLen : minStrLen;

                    var modelStr = $scope.model.toString();

                    if (modelStr.length > len)
                        $scope.model = parseInt(modelStr.substring(0, modelStr.length - 1));

                    return (len == $scope.model.toString().length);
                }

                var getHint = function() {
                    // hide hint if no max/min were given
                    if ((!isMaxValid() && !isMinValid())) 
                        return $scope.hideHint = true;
                    
                    // user specified hint
                    if ($scope.hint) 
                        return $scope.hint;

                    if ($scope.options.hint)
                        return $scope.options.hint;
                    
                    // hint if only a maximum was specified
                    if (isMaxValid() && !isMinValid()) 
                        return "Less than or equal to " + $scope.max;
                    
                    // hint if only a minimum was specified
                    if (isMinValid() && !isMaxValid()) 
                        return "Greater than or equal to " + $scope.min;
                    
                    // hint if both a maximum and minimum was specified
                    if (isMaxValid() && isMinValid()) 
                        return $scope.min + " to " + $scope.max;
                };

                // returns true if the model is >= the maximum
                var isMaxed = function() {
                    return isMaxValid() && $scope.model >= $scope.max;
                };

                // returns true if the model is <= the minimum
                var isMinnd = function() {
                    return isMinValid() && $scope.model <= $scope.min;
                };

                var isMaxValid = function() {
                    return !isNull($scope.max);
                };

                var isMinValid = function() {
                    return !isNull($scope.min);
                };

                var isNull = function(num) {
                    return (num === null) || (num === undefined) || (num === NaN);
                };

                var numberHasDecimal = function(num) {
                    return num.toString().indexOf(".") > -1;
                };

                var canGoNegative = function() {
                    return (!isMinValid() || $scope.min < 0);
                };

                var validKey = function(key) {
                    return (key >= KEY_ZERO && key <= KEY_NINE) ||
                           (key == KEY_DASH && canGoNegative()) ||
                           (key == KEY_PERIOD && !$scope.disableDecimal && !($scope.decimalPlaces == 0));
                };

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

                if (!$scope.options) $scope.options = {};

                // defaults
                if (isNull($scope.min)) $scope.min = $scope.options.min;
                if (isNull($scope.max)) $scope.max = $scope.options.max;

                // may still end up as null, which is okay
                if (isNull($scope.start)) $scope.start = $scope.options.start;
                if (isNull($scope.start)) $scope.start = $scope.min;

                $scope.step = $scope.step || $scope.options.step || 1;
                $scope.hint = this.hint = getHint();
                $scope.hideHint = $scope.hideHint || $scope.options.hideHint || false;
                $scope.disableDecimal = $scope.disableDecimal || $scope.options.disableDecimal || false;
                $scope.decimalPlaces = $scope.decimalPlaces || $scope.options.decimalPlaces || getDecimalPlaces();
                $scope.model = $scope.start || $scope.model || 0;
            }],

            controllerAs: "numberInput"
        };
    });
})();