import os
import openai
import json
from dotenv import load_dotenv
from models import BrandKit
from prompts import brand_prompt
from utils import call_image_model 
import base64
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_banner_image(prompt_text: str) -> str:
    try:
        response = openai.images.generate(
            model="gpt-image-1",
            prompt=prompt_text,
            size="1536x1024"
        )
        return response.data[0].url
    except Exception as e:
        print(f"[Image Generation Error] {e}")
        # Fallback to placeholder image
        return "https://placehold.co/1536x1024?text=Banner+Preview"



def generate_brand_kit(name, role, industry, skills, goals):
    # Fill the brand_prompt template
    prompt = brand_prompt.format(
        name=name,
        role=role,
        industry=industry,
        skills=skills,
        goals=goals
    )

    try:
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=500
        )
        content = response.choices[0].message.content.strip()
    except openai.error.OpenAIError as e:
        raise RuntimeError(f"Text generation failed: {str(e)}")
    

    # Try direct JSON parse
    try:
        kit = json.loads(content)
    except json.JSONDecodeError:
        # Fallback: extract JSON substring
        try:
            start = content.index("{")
            end = content.rindex("}") + 1
            json_str = content[start:end]
            kit = json.loads(json_str)
        except Exception:
            raise ValueError("Model did not return valid JSON:\n" + content)
    try:
        banner_url = generate_banner_image(kit.get("banner", "Your Brand"))
    except Exception as e:
        print(f"[Banner Error] {e}")
        banner_url = "https://placehold.co/1536x1024?text=Banner+Preview"


    # Guarantee all required fields exist
    return {
        "headline": kit.get("headline", f"{name} — {role} in {industry}"),
        "about": kit.get("about", ""),
        "bullets": kit.get("bullets", [])[:3],
        "banner_url": banner_url
    }
