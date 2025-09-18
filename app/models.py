from pydantic import BaseModel
from typing import List, Optional

class BrandKit(BaseModel):
    headline: str
    about: str
    bullets: List[str]
    banner_url: Optional[str] = None
