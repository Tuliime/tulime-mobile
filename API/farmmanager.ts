import { serverURL } from "@/constants/urls";
import { TFarmManager } from "@/types/farmManger";

class FarmManagerAPI {
  get = async ({ limit }: TFarmManager["getFarmmanager"]) => {
    const response = await fetch(`${serverURL}/farmmanager?limit=${limit}`, {
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

export const farmManager = new FarmManagerAPI();
