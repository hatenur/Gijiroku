from fastapi import FastAPI, File, UploadFile, Form
from fastapi.staticfiles import StaticFiles

from pydantic import BaseModel
import asyncio

# gijiroku.pyからhandle_audio関数をインポート
from gijiroku import handle_audio

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


class TranscriptionResponse(BaseModel):
    transcription: str


@app.post("/transcribe/", response_model=TranscriptionResponse)
async def transcribe(
    file: UploadFile = File(...),
    result_path: str = Form("result"),
    whisper: str = Form("api"),
    gpt: str = Form("gpt-3.5-turbo-16k"),
):
    # このエンドポイントが非同期であることを示すために、awaitを使って非同期の処理を行います。
    await asyncio.sleep(1)  # 例えば、非同期I/O処理を模倣

    mp4_file = await file.read()

    # 実際の処理
    result = await handle_audio(mp4_file, result_path, whisper, gpt)

    return {"status": "completed", "result": result}
