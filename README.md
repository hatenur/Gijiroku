# Python Transcription and Summary Generator

この Python スクリプトは、指定された音声ファイル(mp4 形式)から、音声をテキストに変換（transcription）し、そのテキストを GPT-4 モデルを使って整理・要約します。

## 事前準備

1. **リポジトリのクローン**
   まずは、このコードが格納されているリポジトリをローカルにクローンします。

   ```bash
   git clone https://github.com/hatenur/Gijiroku.git
   cd [クローンしたリポジトリのディレクトリ名]
   ```

2. **環境変数の設定**
   `.env` ファイルをプロジェクトのルートに作成し、API キー等を設定します。例えば、

   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **必要な Python パッケージのインストール**
   このスクリプトを実行するには、いくつかの Python パッケージが必要です。以下のコマンドで必要なパッケージをインストールします。

   ```bash
   pip install -r requirements.txt
   ```

4. **langchain パッケージのコード修正**
   このスクリプトを実行するために、Langchain のパッケージのコードを修正する必要がある。
   具体的には
   langchain>document_loaders_parsers_audio.py
   の OpenAIWhisperPaser>lazy_pase
   ```python
         # この部分を追加
         if blob.data is not None:
            audio = AudioSegment.from_file(io.BytesIO(blob.data))
        else:
         # この部分を追加
            audio = AudioSegment.from_file(blob.path)
   ```
   Langchain のこの時のバージョンでは、音声ファイルのバイナリ自体を渡して、処理することができず、ファイルのパスを読み込むつくりになっていた。
   そのためここでは、バイナリファイルを渡されているときは、そのまま使うように修正している

## 実行方法

1. コマンドラインから実行する場合
   コマンドラインから以下のようにスクリプトを実行します。

```bash
python gijiroku.py [オプション] mp4_path
```

**引数:**

- `mp4_path`: 音声ファイル（mp4 形式）のパス。これは必須の引数です。

**オプション:**

- `-W, --whisper`: Whisper の API を使うか、インストール版を使うかを指定します。デフォルトは`api`です。
- `-G, --gpt`: 使用する GPT モデルを指定します。デフォルトは `gpt-3.5-turbo-16k` です。

**例:**

```bash
python gijiroku.py -W api -G gpt-4.0-turbo sample.mp4
```

この例では、`sample.mp4`という音声ファイルを処理し、Whisper の API を使用して音声をテキストに変換した後、`gpt-4.0-turbo`モデルを使用してそのテキストを整理・要約します。

2. API を実行する場合

**UvicornSrever の起動**

```bash
uvicorn api:app --reload
```

※reload なので、コードに変更があれば、リフレッシュされる

**SampleHTML で試したい場合**
http://127.0.0.1:8000/static/index.html

## 実行結果

1. **音声のテキスト変換結果（transcription）**
   スクリプトは、指定された音声ファイルのテキスト変換結果を `[mp4_path].txt`（例: `sample.txt`）という名前のファイルに保存します。

2. **GPT-4 による整理・要約結果**
   スクリプトは、音声のテキスト変換結果を GPT-4 モデルに送信し、整理・要約した結果を `[mp4_path]response.txt`（例: `sampleresponse.txt`）という名前のファイルに保存します。

---

これが、この Python コードの README になります。ユーザーがこのスクリプトを使うために必要な手順と、スクリプトの使い方、そして期待される出力について明確に説明しています。
