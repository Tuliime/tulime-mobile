import { serverURL } from "@/constants/urls";
import { TFarmInput } from "@/types/farmInput";

class FarmInputAPI {
  get = async ({ limit, category, cursor }: TFarmInput["getFarmInput"]) => {
    const response = await fetch(
      `${serverURL}/farminputs?limit=${limit}&category=${category}&cursor=${cursor}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };

  getById = async ({ id }: TFarmInput["getById"]) => {
    const response = await fetch(`${serverURL}/farminputs/${id}`, {
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
}

export const farmInput = new FarmInputAPI();
