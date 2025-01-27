import { serverURL } from "@/constants/urls";
import { TVetDoctor } from "@/types/vetDoctor";

class VetDoctorAPI {
  get = async ({ limit }: TVetDoctor["getVetDoctor"]) => {
    const response = await fetch(`${serverURL}/vetdoctor?limit=${limit}`, {
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

export const vetDoctor = new VetDoctorAPI();
