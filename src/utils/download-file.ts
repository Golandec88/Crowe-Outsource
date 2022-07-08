export default function (blob: Blob, callback = () => {}) {
  if (!(blob instanceof Blob)) {
    console.error("Not a blob type!");
    return;
  }

  const link: HTMLAnchorElement = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  // link.download = name;
  document.body.appendChild(link);
  link.click();

  return callback();
}
