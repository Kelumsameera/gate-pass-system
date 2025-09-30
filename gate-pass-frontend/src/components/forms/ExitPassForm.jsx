import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import PassFormWrapper from "../common/PassFormWrapper";
import SubmitButton from "../common/SubmitButton";
import { requestPass } from "../../services/api";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  reason: yup
    .string()
    .required("reasonForExitRequired")
    .min(5, "reasonForExitMin"),
});

function ExitPassForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await requestPass({ type: "Exit", ...data });
      alert(t("passRequestSuccess"));
    } catch (error) {
      alert(t("passRequestError"));
    }
  };

  return (
    <PassFormWrapper
      title={t("exitPassRequest")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("reason")}
        label={t("reasonForExit")}
        fullWidth
        margin="normal"
        error={!!errors.reason}
        helperText={t(errors.reason?.message)}
      />
      <SubmitButton label={t("submit")} disabled={isSubmitting} />
    </PassFormWrapper>
  );
}
export default ExitPassForm;
