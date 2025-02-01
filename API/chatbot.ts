import { serverURL } from "@/constants/urls";
import { TChatbot } from "@/types/chatbot";

class ChatbotAPI {
  post = async ({
    userID,
    message,
    writtenBy,
    postedAt,
    token,
  }: TChatbot["messageInput"]) => {
    const response = await fetch(`${serverURL}/chatbot/user/${userID}`, {
      method: "POST",
      body: JSON.stringify({
        message: message,
        writtenBy: writtenBy,
        postedAt: postedAt,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return await response.json();
  };
}

export const chatbot = new ChatbotAPI();
