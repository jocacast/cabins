import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["setings"],
    queryFn: getSettings,
  });

  return { isLoading, settings, error };
}
