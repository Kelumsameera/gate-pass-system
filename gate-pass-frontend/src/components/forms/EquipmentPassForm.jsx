import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import PassFormWrapper from "../common/PassFormWrapper";
import SubmitButton from "../common/SubmitButton";
import { requestPass } from "../../services/api";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  equipmentIds: yup
    .string()
    .required("equipmentIdsRequired")
    .matches(/^[0-9, ]+$/, "equipmentIdsInvalid"),
});

function EquipmentPassForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      equipmentIds: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await requestPass({ type: "Equipment", ...data });
      alert(t("passRequestSuccess"));
    } catch (error) {
      alert(t("passRequestError"));
    }
  };

  return (
    <PassFormWrapper
      title={t("equipmentPassRequest")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("equipmentIds")}
        label={t("equipmentIds")}
        fullWidth
        margin="normal"
        error={!!errors.equipmentIds}
        helperText={t(errors.equipmentIds?.message)}
      />
      <SubmitButton label={t("submit")} disabled={isSubmitting} />
    </PassFormWrapper>
  );
}
export default EquipmentPassForm;
