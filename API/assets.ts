class AssetAPI {
  get = async ({ url }: { url: string }) => {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  getLocal = async ({ url }: { url: string }) => {
    const response = await fetch(`${url}`, {
      method: "GET",
      // headers: {
      //   "Content-type": "application/json",
      // },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };
}

export const assets = new AssetAPI();
