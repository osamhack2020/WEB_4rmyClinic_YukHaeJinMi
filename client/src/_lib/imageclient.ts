import { IMG_UPLOAD_ENDPOINT } from "./endpoint";

type UploadImgResponse = {
  uploaded: boolean;
}
export async function UploadImg(img: File) {
  const form = new FormData();
  form.append("img", img);

  console.log(form.get("img"), form.get("name"));
  const response = await fetch(IMG_UPLOAD_ENDPOINT, {
    // headers: {
    //   'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
    // },
    credentials: 'include',
    method: 'POST',
    body: form,
  });
  const json = await response.json() as UploadImgResponse;
  return json.uploaded;
}
