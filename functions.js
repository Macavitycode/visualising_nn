// Used for saving tfjs model
//function mousePressed() {
//    wj = {
//        l0: {
//            w: model.layers[0].getWeights()[0].arraySync(),
//            b: model.layers[0].getWeights()[1].arraySync()
//        },
//        l1: {
//            w: model.layers[1].getWeights()[0].arraySync(),
//            b: model.layers[1].getWeights()[1].arraySync()
//        }
//    };
//    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
//        saveJSON(wj, "weights.json");
//    }
//}

// Draws all the text
function draw_text() {
    fill(0);
    strokeWeight(0);
    textSize(30);
    text('sepal length', 20, 180);
    text('sepal width', 20, 315);
    text('petal length', 20, 465);
    text('petal width', 20, 605);
    text('input layer', 200, 80);
    text('hidden layer', 480, 80);
    text('output layer', 780, 80);
    text('setosa', 950, 230);
    text('versicolour', 950, 410);
    text('virginica', 950, 590);
}

// Shows prediction with a green circle
function show_prediction(pred, num_of_classes, x) {

    var incs = 700 / (num_of_classes + 1);

    stroke(0);
    fill('green');
    circle(x, 225 + incs * pred, 40);
}

// Prints connections between two layers and returns a 2d list of cons
// conns[neuron in l1][neuron in l2]
function show_connections(l1, l2, weights = 0) {
    var conns = [];
    var len1 = l1.length;
    var len2 = l2.length;

    if (!weights) {
        for (var i = 0; i < len1; i++) {
            var node_conns = [];
            for (var j = 0; j < len2; j++)
                // The 1 here represents connection weight (strength of corelation)
                // -0.2 shows fixed negative corelation
                node_conns.push(new con(l1[i], l2[j], 0));
            conns.push(node_conns);
        }
    } else {
        for (var i = 0; i < len1; i++) {
            var node_conns = [];
            for (var j = 0; j < len2; j++) {
                // The 1 here represents connection weight (strength of corelation)
                //console.log(weights);
                node_conns.push(new con(l1[i], l2[j], weights[i][j]));
            }
            conns.push(node_conns);
        }
    }

    for (i = 0; i < len1; i++) {
        for (j = 0; j < len2; j++) conns[i][j].display();
    }

    return conns;
}

// Prints neurons on the mentioned x and returns a list of neurons.
function show_layer(num_of_neurons, x) {
    var layer = [];
    var incs = 700 / (num_of_neurons + 1);

    for (var i = 1; i <= num_of_neurons; i++)
        // The 1 here is the activation value
        layer.push(new neuron(x, 50 + incs * i, 1));

    for (i = 0; i < num_of_neurons; i++) layer[i].display();

    return layer;
}
