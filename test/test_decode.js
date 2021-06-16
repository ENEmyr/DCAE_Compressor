const fs = require("fs");
const decoder = require("../decoder.js");

const test = async () => {
  compressed_bytes = fs.readFileSync("test/test_compressed_image");
  base64 = await decoder.decode(compressed_bytes);
  console.log(base64);
};

test();
