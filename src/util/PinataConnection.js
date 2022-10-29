import axios from "axios";
import FormData from "form-data";

const API_KEY = "ac3f5d90a227d8266a0d";
const API_SECRET =
  "6fc56db86bbc5e4e64b3099158ee29d6ed52a26337bdc8fa00839ec021a827aa";

export default async function uploadImage(fileLocation, fileName) {
  const response = await axios.get(fileLocation, {
    responseType: "blob",
  });
  return await uploadToPinata(response.data, fileName);
}

async function uploadToPinata(image, name) {
  // put file into form data
  const formData = new FormData();
  formData.append("file", image, name);

  // the endpoint needed to upload the file
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const response = await axios.post(url, formData, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
      pinata_api_key: API_KEY,
      pinata_secret_api_key: API_SECRET,
    },
  });
  return { imageHash: response.data.IpfsHash };
}
