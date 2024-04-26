import { useQuery } from "@tanstack/react-query";
import client from "../../utils/axios.config";

const useHealthCheck = () => {
  return useQuery({
    queryKey: ["healthCheck"],
    queryFn: async () => {
      const response = await client.get("/test/health");
      return response.data.data;
    },
    staleTime: 30,
  });
};

export { useHealthCheck };
