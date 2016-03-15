// app/myObject.js
import Ember from 'ember';
export default function() {
    const Light = Ember.Object.extend({
        init(){
            console.log('The isON property is defaulted to ' + this.get('isOn'));
        },
        isOn: false,
        color: 'yellow',
        age: null,
        description: Ember.computed('isOn','color',function() {
            return 'The ' + this.get('color') + ' lightx is set to ' + this.get('isOn');
        }),
        fullDescription: Ember.computed('description','age',function() {
            return this.get('description') + ' and the age is ' + this.get('age');
        }),
        desc: Ember.computed.alias('description'),
        isOnChanged: Ember.observer('isOn',function() {
            console.log('isOn value changed');
        })
    });
    Light.reopen({
        isAnythingChanged: Ember.observer('isOn','color',function() {
            console.log('isOn or color value changed');
        })
    });
    const bulb = Light.create({age: 22});
    bulb.set('isOn',true);
    bulb.set('color', 'blue');
}
