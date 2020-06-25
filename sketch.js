let s1, s2, s3, s4; // Sliders for the 4 values input into the model

async function preload() {
    model = await tf.loadLayersModel('iris_model_js/model.json');
}

function setup() {
    createCanvas(1200, 800);

    //sliders
    s1 = createSlider(4, 8, 6, 0.1);
    s1.position(20, 260);

    s2 = createSlider(1, 5, 3, 0.1);
    s2.position(20, 395);

    s3 = createSlider(0, 8, 4, 0.2);
    s3.position(20, 545);

    s4 = createSlider(0, 3, 1.5, 0.075);
    s4.position(20, 685);
}


async function draw() {
    background(200);
    var s1v = s1.value();
    var s2v = s2.value();
    var s3v = s3.value();
    var s4v = s4.value();

    //console.log(model.layers[0].input());

    //console.log(pred.dataSync());

    inp = show_layer(4, 250);
    l1 = show_layer(8, 550);
    op = show_layer(3, 850);

    //console.log(model.layers[0].getWeights()[0].arraySync());

    w0 = show_connections(inp, l1, model.layers[0].getWeights()[0].arraySync());
    w1 = show_connections(l1, op, model.layers[1].getWeights()[0].arraySync());

    var sv = tf.tensor([[s1v, s2v, s3v, s4v]]);
    var pred = await model.predict([sv]);

    console.log(pred.dataSync());

    sv.dispose();
    pred.dispose();
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
