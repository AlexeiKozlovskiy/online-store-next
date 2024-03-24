'use client';
type DualRangeInput = {
  value?: string | number;
  defaultValue?: string | number;
  unit: string;
  unitPosition: string;
  onChange?: (e: { target: { value: string } }) => void;
  id?: string;
};

export function DualRangeInput({ value, defaultValue, unit, unitPosition, onChange, id }: DualRangeInput) {
  return (
    <>
      <input
        id={id}
        type="text"
        value={value}
        defaultValue={defaultValue}
        className={'item-content__input'}
        maxLength={4}
        onChange={onChange}
      />
      <span className={`item-content-position__${unitPosition}`}>{unit}</span>
    </>
  );
}
