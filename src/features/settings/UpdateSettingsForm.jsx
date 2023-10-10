/* eslint-disable no-unused-vars */
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import {useUpdateSettings} from './useUpdateSettings.js'

function UpdateSettingsForm() {
  const { updateSettings, isUpdating } = useUpdateSettings();
  const { handleSubmit, register, formState } = useForm({
    defaultValues: {},
  });
  const {errors} = formState;
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    error,
  } = useSettings();

  function onSubmit(data) {
    updateSettings(data);
  }

  function onError(error) {
    //error={errors?.minNigths?.message}
  }

  if (isLoading) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Minimum nights/booking" > 
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          {...register("minBookingLength", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          {...register("maxBookingLength", { required: true })}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          {...register("maxGuestsPerBooking", { required: true })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          {...register("breakfastPrice", { required: true })}
        />
      </FormRow>

      <FormRow>
      <Button> Update Settings
      </Button>
    </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
