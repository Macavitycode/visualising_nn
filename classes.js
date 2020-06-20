class neuron {
    constructor(x = width / 2, y = height / 2, value = 1) {
        this.x = x
        this.y = y
        this.value = value;
    }

    display() {
        strokeWeight(1);
        colorMode(RGB, 255, 255, 255, 1);
        // map activation from to 0 -> 1
        var correctedValue = 1;
        if (this.value > 0) {
            var c = color('orange');
            c.setAlpha(correctedValue);
        }
        else {
            var c = color('cyan');
            c.setAlpha(correctedValue);
        }

        fill(c);
        circle(this.x, this.y, 30);
    }
}

class con {
    constructor(n1, n2, weight) {
        this.n1 = n1;
        this.n2 = n2;
        this.weight = weight;
    }

    display() {
        colorMode(RGB, 255, 255, 255, 1);
        // map weight from to 0 -> 1
        //var correctedValue = 1;
        //if (this.value > 0) {
        //    var c = color('orange');
        //    c.setAlpha(correctedValue);
        //}
        //else {
        //    var c = color('cyan');
        //    c.setAlpha(correctedValue);
        //}

        stroke(0);
        strokeWeight(this.weight);
        line(this.n1.x, this.n1.y, this.n2.x, this.n2.y);
        strokeWeight(1);
    }
}
