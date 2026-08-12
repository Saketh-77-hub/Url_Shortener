import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ["my-shortenurls"],

    queryFn: async () => {
      try {
        return await api.get("/api/urls/myurls", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
      } catch (error) {
        onError?.(error);
        throw error;
      }
    },

    select: (data) => {
      const sortedData = data.data.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );

      return sortedData;
    },

    staleTime: 5000,
  });
};

export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    queryKey: ["url-totalclick"],

    queryFn: async () => {
      try {
        return await api.get(
          "/api/urls/totalClicks?startDate=2024-01-01&endDate=2027-12-31",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
      } catch (error) {
        onError?.(error);
        throw error;
      }
    },

    select: (data) => {
      const convertToArray = Object.keys(data.data).map((key) => ({
        clickDate: key,
        count: data.data[key],
      }));

      return convertToArray;
    },

    staleTime: 5000,
  });
};