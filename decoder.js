const zlib = require("zlib");
const base64converter = require("./base64_converter");
const tf = require("@tensorflow/tfjs-node");

const draw_on_canvas = (tensor, canvas) => {
  canvas.width = tensor.shape.width;
  canvas.height = tensor.shape.height;
  const image = tf.browser.toPixels(tensor, canvas);
  return image;
};

const inference = async (latent_vector, encode_img = false) => {
  try {
    const model = await tf.loadLayersModel("file://decoder_model/model.json");
    let tensor = tf.tensor(latent_vector).reshape([1, 2048]);
    let decoded = model.predict(tensor);
    decoded = decoded.mul(255).reshape([128, 128, 3]);
    if (encode_img) return tf.node.encodePng(decoded);
    return decoded;
  } catch (err) {
    console.error(err.message);
  }
};

const decode = async (compressed_bytes, return_as_tensor = false) => {
  // By default the function will return decoded iamge as Base64, But you can make it return as tensor and then draw a canvas by yourself, this choice is useful for client side.
  try {
    let decompressed = zlib.inflateSync(compressed_bytes);
    let decompressed_str = decompressed.toString();
    let decom_latent = decompressed_str.split(" ");
    decom_latent = decom_latent.map((x) => parseFloat(x));
    if (return_as_tensor) {
      decoded_image = await inference(decom_latent);
      return decoded_image;
    } else {
      decoded_image = await inference(decom_latent, (encode_img = true));
      base64_image = base64converter.bufferToBase64(decoded_image);
      return base64_image;
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { decode, inference, draw_on_canvas };
