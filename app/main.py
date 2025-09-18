from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pipelines import generate_brand_kit   

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to ["http://127.0.0.1:5500"] later if serving frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BrandRequest(BaseModel):
    name: str
    role: str
    industry: str
    skills: str
    goals: str

@app.post("/generate-brand-kit")
def generate_brand_kit_endpoint(request: BrandRequest):
    # Check required fields
    missing_fields = [
        field for field, value in request.dict().items() if not value.strip()
    ]
    if missing_fields:
        return {"error": f"Missing required fields: {', '.join(missing_fields)}"}

    try:
        kit = generate_brand_kit(
            request.name,
            request.role,
            request.industry,
            request.skills,
            request.goals
        )
        return kit
    except Exception as e:
        # Catch any unexpected errors
        return {"error": f"Failed to generate brand kit: {str(e)}"}


@app.get("/ping")
def ping():
    return {"ping": "pong"}
