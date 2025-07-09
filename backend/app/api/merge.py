from fastapi import APIRouter

router = APIRouter()

@router.get("/merge")
async def merge_something():
    return {"message": "Merged successfully!"}
