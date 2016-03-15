// app/myObject.js
import Ember from 'ember';
export default function() {
    const Light = Ember.Object.extend({
        init(){
            console.log('IN INIT: The isON property is defaulted to ' + this.get('isOn'));
        },
        isOn: false,
        color: 'yellow',
        age: null,
        description: Ember.computed('isOn','color',function() {
            return 'The ' + this.get('color') + ' light is set to ' + this.get('isOn');
        }),
        fullDescription: Ember.computed('description','age',function() {
            return this.get('description') + ' and the age is ' + this.get('age');
        }),
        desc: Ember.computed.alias('description'),
        isOnChanged: Ember.observer('isOn',function() {
            console.log('IN ISONCHANGED: isOn value changed');
        })
    });
    Light.reopen({
        isAnythingChanged: Ember.observer('isOn','color',function() {
            console.log('IN ISANYTHINGCHANGED: isOn or color value changed');
        })
    });
    //The next two observers are arranged in such a way that when `isOn` changes
    //the `checkChanged` handler is only called once (rather then twic which is what
    //would otherwise happen
    Light.reopen({
        checkIsOn: Ember.observer('isOn','color', function() {
            Ember.run.once(this,'checkChanged');
        }),
        checkChanged: Ember.observer('description',function() {
            console.log('IN CHECKCHANGED:' + this.get('description'));
        })
    });
    console.log("--> About to instantiate Light");
    const bulb = Light.create({age: 22});
    console.log("--> About to set 'isOn' to true");
    bulb.set('isOn',true);
    console.log("--> About to set 'color' to blue");
    bulb.set('color', 'blue');
}
