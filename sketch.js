function setup() {
    createCanvas(1200, 800);

}

function draw() {
    background(200);
    // inp is input layer
    inp = show_layer(1, 100);
    l1 = show_layer(10, 300);
    l2 = show_layer(10, 500);
    l3 = show_layer( 1, 700);

    w0 = show_connections(inp, l1);
    w1 = show_connections(l1, l2);
    w2 = show_connections(l2, l3);
}

// Prints connections between two layers and returns a 2d list of cons 
// conns[neuron in l1][neuron in l2]
function show_connections(l1, l2) {
    var conns = []
    var len1 = l1.length
    var len2 = l2.length

    for (var i=0; i<len1; i++) {
        var node_conns = []
        for (var j=0; j<len2; j++) 
            // The 1 here represents connection weight (strength of corelation)
            node_conns.push(new con(l1[i], l2[j], 1));
        conns.push(node_conns);
    }

    for (i=0; i<len1; i++) {
        for (j=0; j<len2; j++)
            conns[i][j].display();
    }

    return conns;
}


// Prints neurons on the mentioned x and returns a list of neurons.
function show_layer(num_of_neurons, x) {
    var layer = [];
    var incs = 700 / (num_of_neurons + 1);

    for (var i=1; i<=num_of_neurons; i++)
        // The 1 here is the activation value
        layer.push(new neuron(x, 50 + (incs * i), 1));

    for (i=0; i<num_of_neurons; i++)
        layer[i].display();

    return layer;
}












