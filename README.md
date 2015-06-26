# Number Input for AngularJS

[DEMO]

A number-only input element directive for AngularJS.

#### Requirements
* [Bootstrap] (built with 3.3.5)
* [AngularJS] (built with 1.4.1)

#### Installation
1. Include `dist/number-input.min.js`
2. Use the `<number-input></number-input>` tag

#### Example
```HTML
<number-input ng-model="model" max="24" min="0" step="1" start="10" hint="0 to 24 hours" hideHint="false" disableDecimal="true" decimalPlaces="0"></number-input>
```

_or_

```JavaScript
opts = {
  max: 24,
  min: 0,
  step: 1,
  start: 10,
  hint: "0 to 24 hours",
  hideHint: false,
  disableDecimal: true,
  decimalPlaces: 0
};
```
```HTML
<number-input ng-model="model" options="opts"></number-input>
```

#### Options
| Field          | Data type     | Default                   | Required | Attribute/Option | Description
| -------------- | ------------- | ------------------------- | -------- | ---------------- | -----------
| ngModel        | Number        | None                      | Yes      | Attribute        | AngularJS model
| start          | Number        | 0                         | No       | Both             | Initial input value
| min            | Number        | -∞                        | No       | Both             | Minimum input value
| max            | Number        | ∞                         | No       | Both             | Maximum input value
| step           | Number        | 1                         | No       | Both             | How much to increase/decrease by when the +/- buttons are pressed
| hint           | String        | Depends on min/max values | No       | Both             | Small text that appears below the input element
| hideHint       | Boolean       | false                     | No       | Both             | Hides the hint
| disableDecimal | Boolean       | false                     | No       | Both             | Disables decimals from being typed
| decimalPlaces  | Number        | # of decimals in step     | No       | Both             | Number of decimal places shown
| options        | Object        | Empty                     | No       | Both             | Options can be used instead of element attributes (attributes have priority)

#### Contributing
Feel free to send a pull request if you can improve something, or create an issue if you have any questions or problems.

#### License
Licensed under GNU GPL v2.

Enjoy!

[DEMO]:http://cohenadair.github.io/angular.number-input/
[Boostrap]:http://getbootstrap.com/
[AngularJS]:https://angularjs.org/
