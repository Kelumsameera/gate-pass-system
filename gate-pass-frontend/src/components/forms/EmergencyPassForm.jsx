import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PassFormWrapper from "../common/PassFormWrapper";
import SubmitButton from "../common/SubmitButton";
import { requestPass } from "../../services/api";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  emergencyReason: yup
    .string()
    .required("emergencyReasonRequired")
    .min(5, "emergencyReasonMin"),
  priorityLevel: yup.string().required("priorityLevelRequired"),
});

function EmergencyPassForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      emergencyReason: "",
      priorityLevel: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await requestPass({ type: "Emergency", ...data });
      alert(t("passRequestSuccess"));
    } catch (error) {
      alert(t("passRequestError"));
    }
  };

  return (
    <PassFormWrapper
      title={t("emergencyPassRequest")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("emergencyReason")}
        label={t("emergencyReason")}
        fullWidth
        margin="normal"
        error={!!errors.emergencyReason}
        helperText={t(errors.emergencyReason?.message)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>{t("priorityLevel")}</InputLabel>
        <Select {...register("priorityLevel")} label={t("priorityLevel")}>
          <MenuItem value="Low">{t("low")}</MenuItem>
          <MenuItem value="Medium">{t("medium")}</MenuItem>
          <MenuItem value="High">{t("high")}</MenuItem>
        </Select>
        {errors.priorityLevel && (
          <p style={{ color: "red" }}>{t(errors.priorityLevel.message)}</p>
        )}
      </FormControl>
      <SubmitButton label={t("submit")} disabled={isSubmitting} />
    </PassFormWrapper>
  );
}
export default EmergencyPassForm;
