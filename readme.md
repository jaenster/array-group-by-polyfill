# Polyfill for tc39/proposal-array-grouping

Simple polyfill for [tc39/proposal-array-grouping](https://tc39/proposal-array-grouping), if you dont feel like including core-js

# How to use
```typescript
import 'array-grouping-polyfill'


const {negative, positive, zero, nan} = [-1, 2, -4, 5, 'foo', 0, 6, 3, -3, 5].groupBy((i) => {
    switch(true) {
        case typeof i !== 'number':
            return 'nan';
        case i < 0:
            return 'negative'
        case i > 0:
            return 'positive'
        default:
            return 'zero';
    }
});


console.log(negative) // -1, -4, -3
console.log(positive) // 2, 5, 6, 3, 5
console.log(zero) // 0
console.log(nan) // foo
```




## proposal-array-grouping
(Note this is a copy from [tc39/proposal-array-grouping](https://tc39/proposal-array-grouping))

A proposal to make grouping of items in an array easier. 

```js
const array = [1, 2, 3, 4, 5];

// groupBy groups items by arbitrary key.
// In this case, we're grouping by even/odd keys
array.groupBy((num, index, array) => {
  return num % 2 === 0 ? 'even': 'odd';
});

// =>  { odd: [1, 3, 5], even: [2, 4] }

// groupByToMap returns items in a Map, and is useful for grouping using
// an object key.
const odd  = { odd: true };
const even = { even: true };
array.groupByToMap((num, index, array) => {
  return num % 2 === 0 ? even: odd;
});

// =>  Map { {odd: true}: [1, 3, 5], {even: true}: [2, 4] }
```

Array grouping is an extremely common operation, best exemplified by
SQL's `GROUP BY` clause and MapReduce programming (which is better
thought of map-group-reduce). The ability to combine like data into
groups allows developers to compute higher order datasets, like the
average age of a cohort or daily LCP values for a webpage.

Two methods are offered, `groupBy` and `groupByToMap`. The first returns a
null-prototype object, which allows ergonomic destructuring and prevents
accidental collisions with global Object properties. The second returns
a regular `Map` instance, which allows grouping on complex key types
(imagine a compound key or [tuple]).


# Transpiled standalone code
Just want to use a small blob of code that is stand alone?
```javascript
void (function() {
    var _a, _b;
    var _c, _d;
    (_a = (_c = Array.prototype).groupBy) !== null && _a !== void 0 ? _a : (_c.groupBy = function (callback, thisArg) {
        var obj = {};
        this.forEach(function (value, idx, self) {
            var _a;
            var ret = thisArg ? callback.call(thisArg, value, idx, self) : callback(value, idx, self);
            ((_a = obj[ret]) !== null && _a !== void 0 ? _a : (obj[ret] = [])).push(value);
        });
        return obj;
    });
    (_b = (_d = Array.prototype).groupByToMap) !== null && _b !== void 0 ? _b : (_d.groupByToMap = function (callback, thisArg) {
        var map = new Map();
        this.forEach(function (value, idx, self) {
            var ret = thisArg ? callback.call(thisArg, value, idx, self) : callback(value, idx, self);
            var group = map.get(ret) || [];
            if (group.push(value) === 1)
                map.set(ret, group);
        });
        return map;
    });
})()
```