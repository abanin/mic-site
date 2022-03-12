import { useMutation } from "react-query";
import createUrl from "helpers/createUrl";

const useEquipmentOrderMutation = () => {
  return useMutation(
    (params: {
      id: string | number;
      fio: string;
      phone: string;
      email: string;
    }) => {
      const { id, ...data } = params;
      return fetch(createUrl(`/equipment/order/${id}`), {
        method: "post",
        body: JSON.stringify(data),
      });
    }
  );
};

export default useEquipmentOrderMutation;
