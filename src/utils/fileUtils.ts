class FileUtils {
  public convertBase64ToFile(base64Data: string): File {
    const array = base64Data.split(",");
    let fileType = array[0].split(";")[0].split(":")[1];
    let suffix = "";
    if (fileType.startsWith("image")) {
      //图片
      suffix = "." + fileType.split("/")[1];
    } else if (fileType == "text/plain") {
      //txt
      suffix = ".txt";
    }
    let bytes = window.atob(array[1]);
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new File([ab], "file" + suffix, { type: "image/png" });
  }
  public compressImage(base64Data: string): Promise<any> {
    return new Promise<any>(function (resolve, reject) {
      const img_original = document.createElement("img");
      img_original.style.display = "none";
      document.body.appendChild(img_original);
      img_original.src = base64Data;
      img_original.onload = function () {
        let w = img_original.naturalWidth / 2;
        let h = img_original.naturalHeight / 2;
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let anw = document.createAttribute("width");
        anw.nodeValue = w + "";
        let anh = document.createAttribute("height");
        anh.nodeValue = h + "";
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);

        // @ts-ignore
        ctx.fillRect(0, 0, w, h);
        // @ts-ignore
        ctx.drawImage(img_original, 0, 0, w, h);

        const base64 = canvas.toDataURL("image/jpeg", 0.5); // 压缩后质量
        document.body.removeChild(img_original);
        resolve(base64);
        // const bytes = window.atob(base64.split(',')[1]);
        // const ab = new ArrayBuffer(bytes.length);
        // const ia = new Uint8Array(ab);
        // for (let i = 0; i < bytes.length; i++) {
        //     ia[i] = bytes.charCodeAt(i);
        // }
        // let blob = new Blob([ab], {type: 'image/jpeg'});
        // // 预览压缩后的图片
        // img_output.src = base64
      };
    });
  }
}

export default new FileUtils();

function getImgByteSize(base64Data: string) {
  if (base64Data) {
    // 获取base64图片byte大小
    const equalIndex = base64Data.indexOf("="); // 获取=号下标
    if (equalIndex > 0) {
      const str = base64Data.substring(0, equalIndex); // 去除=号
      const strLength = str.length;
      const fileLength = strLength - (strLength / 8) * 2; // 真实的图片byte大小
      return Math.floor(fileLength); // 向下取整
    } else {
      const strLength = base64Data.length;
      const fileLength = strLength - (strLength / 8) * 2;
      return Math.floor(fileLength); // 向下取整
    }
  } else {
    return null;
  }
}
