
//import {neuron, con} from './classes.js';

function setup() {
    createCanvas(1200, 800);
    v1 = new neuron(x=100, y=100, value=-1);
    v2 = new neuron(345, 122, 1);
    c1 = new con(v1, v2, 10);
}

function draw() {
    background(200);
    v1.display();
    v2.display();
    c1.display();
}

