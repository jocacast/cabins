import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";

import toast from "react-hot-toast";
export function useUpdateSettings(){
    const queryClient = useQueryClient();
    const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
        mutationFn: (setting) => updateSettingsApi(setting),
        onSuccess: () => {
          toast.success("Settings successfully updated");
          queryClient.invalidateQueries({
            queryKey: ["settings"],
          });
        },
        onError: (err) => toast.error(err.message),
      });
      return {updateSettings, isUpdating}

}