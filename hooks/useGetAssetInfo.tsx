import { assets } from "@/API/assets";
import { useQuery } from "@tanstack/react-query";

export const useGetAssetInfo = ({ url }: { url: string }) => {
  const urlParts = extractUrlParts(url);

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`asset-${urlParts?.filename!}`],
    queryFn: () => {
      return assets.get({
        url: urlParts?.baseUrl!,
      });
    },
  });

  if (isError) {
    console.log("Error fetching asset info: ", error);
  }

  return { data, isPending, isError, error };
};

const extractUrlParts = (fullUrl: string) => {
  try {
    const url = new URL(fullUrl);
    const baseUrl = url.origin + url.pathname;
    const filename = baseUrl.split("/").pop() || "";

    return { baseUrl, filename };
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
};
