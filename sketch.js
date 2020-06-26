let s1, s2, s3, s4; // Sliders for the 4 values input into the model

async function preload() {
    model = await tf.loadLayersModel("iris_model_js/model.json");
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

    draw_text();

    inp = show_layer(4, 250);
    l1 = show_layer(8, 550);
    op = show_layer(3, 850);

    w0 = show_connections(inp, l1, model.layers[0].getWeights()[0].arraySync());
    w1 = show_connections(l1, op, model.layers[1].getWeights()[0].arraySync());

    var sv = tf.tensor([[s1v, s2v, s3v, s4v]]);
    var pred = await model.predict([sv]).squeeze();

    show_prediction(pred.argMax().dataSync(), 3, 900);

    sv.dispose();
    pred.dispose();
}
