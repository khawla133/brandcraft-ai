// frontend/src/api/brandApi.js
export async function generateBrandKit(data) {
  try {
    const response = await fetch("http://127.0.0.1:8000/generate-brand-kit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Server error");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
