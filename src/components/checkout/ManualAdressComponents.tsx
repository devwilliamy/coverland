import OverlappingLabel from '../ui/overlapping-label';

export const ManualAdressComponents = (errors: any, register: any) => {
  return (
    <>
      <OverlappingLabel
        title="Address Line 1"
        name="line1"
        errors={errors}
        placeholder="123 Main Street"
        register={register}
        options={{ required: true }}
        autoComplete="address-line1"
      />
      <OverlappingLabel
        title="Address Line 2"
        name="line2"
        errors={errors}
        placeholder="P.O. Box 123"
        register={register}
        autoComplete="address-line2"
      />
      <OverlappingLabel
        title="City"
        name="city"
        errors={errors}
        placeholder="Los Angeles"
        register={register}
        options={{ required: true }}
        autoComplete="address-level2"
      />
      <OverlappingLabel
        title="State"
        name="state"
        errors={errors}
        placeholder="CA"
        register={register}
        options={{ required: true }}
        autoComplete="address-level1"
      />
      <OverlappingLabel
        title="ZIP"
        name="postal_code"
        errors={errors}
        placeholder="91801"
        register={register}
        options={{ required: true }}
        autoComplete="postal-code"
      />
    </>
  );
};
