import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },

  mapPlay() {
  	// first, let's create a Map

  	let m = new Map();

  	// let's put some stuff in the Map
  	m.set('does this', 'work?');
  	console.log(m);

  	// let's store dates -- easy to get to a key -> { value } relationship
  	const d1 = new Date("2018-03-15");
  	const d2 = new Date("2018-03-16");

  	m.set('d1', d1);
  	m.set('d2', d2);

  	// now let's retrieve them
  	console.log( m.get('d1') );
  	console.log( m.get('d2') );

  	// cool. now let's generate some dates (cheaply) and shove them in the map
  	m = new Map();

  	for (var i = 0; i < 20; i++) {
  		m.set("d" + i, new Date().setDate(i));
  	}

  	console.log( m );

  	// ok...bigger objects and duplicate dates
  	m = new Map();
  	
  	for (var i = 0; i < 10; i++) { // we want to start with a sample of 10 dates
  		m.set(i, { id: i, date: new Date().setDate(i) });

  		if (i == 2 || i == 3 || i == 5 || i == 7) { // if i is prime between 0 and 10
  			m.set(i + 100, { id: i, date: new Date().setDate(i) }); // duplicate it for more interesting data set
  		}
  	}

  	// alright, now let's shove those same data entries into an array
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

  	return maply;
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
