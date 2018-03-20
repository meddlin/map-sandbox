# map-sandbox

An exercise in the combined use of reduce() the new Map().

### Where's the code?

Check out the `mapPlay()` helper function in `/client/main.js`...or here's the meat of it, right here.

```javascript
// Shove data entries into an array
let sampleArr = [];
	
for (var i = 0; i < 10; i++) { // we want to start with a sample of 10 dates
  	let tmp = new Date().setDate(i);
	sampleArr.push({ id: i, date: new Date(tmp).toLocaleDateString() });

	if (i == 2 || i == 3 || i == 5 || i == 7) { // if i is prime between 0 and 10
		sampleArr.push({ id: i + 100, date: new Date(tmp).toLocaleDateString() }); // duplicate it for more interesting data set
	}
}

/* Now, we have a set of objects with Dates on them, and some of
	the entries have duplicate dates.
	So, now let's group these objects by date into arrays holding
	similar days. Then store all of these arrays in a single Map.
*/
	var maply = sampleArr.reduce(function(acc, curr) {
	  	if ( acc.has(curr.date) ) {
	    	acc.get(curr.date).push(curr);
	  	} else {
	    	acc.set(curr.date, [curr]);
	  	}

	  	return acc;

	}, new Map());

/*
  * Desired:
  * Map = {
      {2018-03-01, [ {1, 2018-03-01}, {2, 2018-03-01} ]},
      {2018-03-02, [ {3, 2018-03-02} ]},
      {2018-03-05, [ {4, 2018-03-05} ]},
      {2018-03-10, [ {5, 2018-03-10}, {6, 2018-03-10}, {7, 2018-03-10} ]}
  }
*/
```

### Read the Docs

Map

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has)

reduce()

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

#### Sidenote

Yes, I created a "whole Meteor SPA app" just to show a working example of some native JavaScript stuff. *It's what I had.*