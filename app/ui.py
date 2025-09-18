import streamlit as st
from pipelines import generate_brand_kit

st.title("🚀 BrandCraft AI — Build Your LinkedIn Brand Kit")

st.write("Fill out the form below to generate your personalized LinkedIn brand kit.")

# Collect user inputs
name = st.text_input("Your Name")
role = st.text_input("Your Current Role", placeholder="e.g., Data Analyst")
industry = st.text_input("Industry", placeholder="e.g., Finance, Healthcare, Tech")
skills = st.text_area("Key Skills", placeholder="e.g., Python, SQL, Machine Learning")
goals = st.text_area("Career Goals", placeholder="e.g., Become a Data Scientist, Lead AI projects")

# Generate button
if st.button("✨ Generate My Brand Kit"):
    if name and role and industry and skills and goals:
        kit = generate_brand_kit(name, role, industry, skills, goals)

        st.subheader("🔹 Headline")
        st.write(kit["headline"])

        st.subheader("🔹 About Section")
        st.write(kit["about"])

        st.subheader("🔹 Bullet Points")
        for bullet in kit["bullets"]:
            st.write(f"- {bullet}")

        st.subheader("🔹 Banner")
        st.image(kit["banner_url"])
    else:
        st.warning("⚠️ Please fill in all the fields before generating.")
