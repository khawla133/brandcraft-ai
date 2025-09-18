# app/prompts.py
brand_prompt = """
You are an assistant that generates LinkedIn brand kits.

Return ONLY valid JSON in the following format:
{{
  "headline": "...",
  "about": "...",
  "bullets": ["...", "...", "..."],
  "banner": "..."
}}

Information:
Name: {name}
Role: {role}
Industry: {industry}
Skills: {skills}
Career Goals: {goals}
"""

