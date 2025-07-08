from fastapi.responses import StreamingResponse
import tempfile

@router.post("/concat")
async def concat_csvs(
    primary_column: str = Form(...),
    files: List[UploadFile] = File(...)
):
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least two CSV files must be uploaded")

    dfs = []
    for file in files:
        if not file.filename.endswith(".csv"):
            raise HTTPException(status_code=400, detail=f"File {file.filename} is not a CSV")
        try:
            contents = await file.read()
            df = pd.read_csv(io.BytesIO(contents))
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error reading CSV {file.filename}: {str(e)}")
        
        if primary_column not in df.columns:
            raise HTTPException(status_code=400, detail=f"Primary column '{primary_column}' not found in {file.filename}")

        df[primary_column] = df[primary_column].astype(str)
        dfs.append(df)

    df_merged = pd.concat(dfs, axis=0)

    # Convert to CSV bytes
    stream = io.StringIO()
    df_merged.to_csv(stream, index=False)
    stream.seek(0)

    headers = {
        "Content-Disposition": "attachment; filename=concatenated.csv"
    }

    return StreamingResponse(stream, media_type="text/csv", headers=headers)
