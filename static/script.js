const form = document.getElementById("transcription-form");
const resultPathInput = form.querySelector('input[name="result_path"]');
const responseElement = document.getElementById("response");
const fileInput = form.querySelector('input[type="file"]');
const fileNameElement = document.querySelector(".file-name");
const fileDropArea = document.querySelector(".file-drop-area");

// エンドポイントのURL。変更する場合はこの値を変更します。
const ENDPOINT_URL = "/transcribe/";

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight() {
  fileDropArea.classList.add("highlight");
}

function unhighlight() {
  fileDropArea.classList.remove("highlight");
}

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  fileInput.files = files;
  if (files.length > 0) {
    fileNameElement.textContent = files[0].name;
    const filePath = "C:\\Users\\hidet\\Downloads\\";
    resultPathInput.value = filePath;
  }

  let event = new Event("change", {
    bubbles: true,
    cancelable: true,
  });

  fileInput.dispatchEvent(event);
}

// ドラッグ&ドロップのイベントハンドラ
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  fileDropArea.addEventListener(eventName, preventDefaults, false);
});

["dragenter", "dragover"].forEach((eventName) => {
  fileDropArea.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
  fileDropArea.addEventListener(eventName, unhighlight, false);
});

fileDropArea.addEventListener("drop", handleDrop, false);

// ファイル入力フィールドでファイルが選択された場合のイベント
fileInput.addEventListener("change", function () {
  if (fileInput.files.length > 0) {
    fileNameElement.textContent = fileInput.files[0].name;
    const filePath = "C:\\Users\\hidet\\Downloads\\";
    resultPathInput.value = filePath;
  } else {
    fileNameElement.textContent = "ファイルが選択されていません";
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  try {
    const res = await fetch(ENDPOINT_URL, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const result = await res.json();
      responseElement.textContent = JSON.stringify(result, null, 2);
    } else {
      responseElement.textContent = "Error: " + res.statusText;
    }
  } catch (error) {
    responseElement.textContent = "Error: " + error.toString();
  }
});
