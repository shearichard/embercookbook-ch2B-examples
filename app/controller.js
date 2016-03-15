import Ember from 'ember';

import myObject from './MyObject';

export default Ember.Controller.extend({
    init(){
      myObject();
        },
  appName: 'Ember Twiddle'
});
