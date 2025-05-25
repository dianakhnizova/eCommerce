export const handleFieldOptions = (
  event: React.ChangeEvent<HTMLSelectElement>,
  setField: (value: string) => void,
  setOrder: (value: string) => void
) => {
  const selectedField = event.target.value;
  setField(selectedField);
  setOrder('');
};
