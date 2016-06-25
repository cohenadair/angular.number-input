(function() {
     var app = angular.module("number-input-demo", ['number-input']);
    
     app.controller("AppController", function() {
          this.onChangeCount = 0;

          this.onChange = function(model) {
               this.onChangeCount++;
          };

          this.inputsConfig = [
               [
                    {
                         label: "Default",
                         options: {}
                    },
                    {
                         label: "Custom hint",
                         options: {
                              min: 0,
                              max: 24,
                              step: 0.25,
                              hint: "0 to 24 hours",
                              decimalPlaces: 2
                         }
                    }
               ],
               [
                    {
                         label: "Decimal places",
                         options: {
                              start: 0,
                              min: -1,
                              max: 1,
                              step: 0.0005,
                              hideHint: false,
                              disableDecimal: false
                         }
                    },
                    {
                         label: "From -10 to 10",
                         options: {
                              start: 0,
                              min: -10,
                              max: 10,
                              hideHint: true
                         }
                    }
               ],
               [
                    {
                         label: "50 or lower",
                         options: {
                              start: 45,
                              max: 50
                         }
                    },
                    {
                         label: "Always positive",
                         options: {
                              start: 0,
                              min: 0
                         }
                    }
               ],
               [
                    {
                         label: "From 6 to 19",
                         options: {
                              start: 6,
                              min: 6,
                              max: 19,
                              hideHint: true
                         }
                    },
                    {
                         label: "From -6 to -25",
                         options: {
                              start: -19,
                              min: -25,
                              max: -6,
                              hideHint: true
                         }
                    }
               ],
               [
                    {
                         label: "Prefix",
                         options: {
                              start: 100.00,
                              min: 100.00,
                              prefix: "$",
                              decimalPlaces: 2,
                              hideHint: true
                         }
                    },
                    {
                         label: "Postfix",
                         options: {
                              start: 0,
                              min: 0,
                              postfix: "lbs.",
                              hint: "Enter your weight in pounds"
                         }
                    }
               ],
               [
                    {
                         label: "Prefix and postfix",
                         options: {
                              start: 0.00,
                              min: 0.00,
                              prefix: "*",
                              postfix: "%",
                              disableDecimal: true,
                              hideHint: true
                         }
                    }
               ]
          ];
     });
})();