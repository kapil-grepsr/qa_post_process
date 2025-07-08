from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from io import BytesIO
import pandas as pd
import dtale

router = APIRouter()

@router.post("/open-in-dtale")
async def open_in_dtale(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are accepted")

    try:
        contents = await file.read()
        df = pd.read_csv(BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading CSV: {str(e)}")

    # Start dtale, don't open browser server-side
    instance = dtale.show(df, open_browser=False)
    dtale_url = instance._main_url

    return JSONResponse(content={"dtale_url": dtale_url})
