export default function (blob, callback = () => {}) {
  if(!(blob instanceof Blob)) {
    console.error("Not a blob type!");
    return;
  }

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  document.body.appendChild(link);
  link.click();

  return callback();
}
