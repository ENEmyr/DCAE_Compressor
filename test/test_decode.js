const fs = require("fs");
const decoder = require("../decoder.js");

const test = async () => {
  compressed_bytes = fs.readFileSync("test/test_compressed_image");
  tensor = await decoder.decode(compressed_bytes, (return_as_tensor = true));
  console.log("Decoded Image Tensor :", tensor);
  base64 = await decoder.decode(compressed_bytes, (return_as_tensor = false));
  console.log("Decoded Image as Base64", base64);

  // const printCanvas = document.getElementById("#el1");
  // const image = await decoder.draw_on_canvas(tensor, printCanvas);
};

test();
