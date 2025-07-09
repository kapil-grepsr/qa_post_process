// src/lib/dtale.ts
export async function openFileInDtale(
  file: File | null,
  endpoint: string = "http://localhost:8000/dtale/open-in-dtale"
): Promise<void> {
  if (!file) {
    alert("Please upload a file first.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Error opening dtale: ${error.detail}`);
      return;
    }

    const data = await response.json();

    // Support either `dtale_url` or `url` from backend
    const url = data.dtale_url || data.url;
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("No URL returned from dtale.");
    }
  } catch (error) {
    alert("Failed to open dtale");
    console.error(error);
  }
}
