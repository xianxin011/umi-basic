import CryptoJS from "crypto-js";
import Base64 from "crypto-js/enc-base64";

const key = "YWFqaWFvemljYXNobWVoNQ==";
const iv = "aGFqaWFvemljYXNobWVoNQ==";

/**
 * URL加密
 * @param url
 */
export function encryptUrl(url: string): string {
  let array: Array<string> = url.split("?");
  let result: string = array[0].trim();
  if (!result.startsWith("/")) {
    return encrypt("/" + result);
  }
  return encrypt(result);
}

/**
 * 数据加密
 * @param body
 */
export function encrypt(body: any): string {
  if (!body) {
    return "";
  }
  let content = body;
  if (typeof body === "object") {
    content = JSON.stringify(body);
  }
  let encrypted = CryptoJS.AES.encrypt(content, Base64.parse(key), {
    iv: Base64.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let cipherTextHexStr = CryptoJS.enc.Hex.parse(
    encrypted.ciphertext.toString()
  );
  return CryptoJS.enc.Base64.stringify(cipherTextHexStr);
}

/**
 * 数据解密
 * @param str
 */
export function decrypt(str: string): any {
  if (str.startsWith("{")) {
    return JSON.parse(str);
  }
  let decrypted = CryptoJS.AES.decrypt(str, Base64.parse(key), {
    iv: Base64.parse(iv),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  let result = decrypted.toString(CryptoJS.enc.Utf8).trim();
  // console.log("decrypted:" + decrypted);
  if (result.startsWith("{")) {
    return JSON.parse(result);
  }
  return result;
}

export function setUrlEncoded(obj: any): string {
  let urlEncoded = "";
  if (obj && obj instanceof Object) {
    const keys = Object.keys(obj);
    if (keys && keys.length) {
      keys.forEach((key, index) => {
        urlEncoded += `${key}=${obj[key]}`;
        if (index + 1 < keys.length) {
          urlEncoded += "&";
        }
      });
    }
  }
  return urlEncoded;
}
