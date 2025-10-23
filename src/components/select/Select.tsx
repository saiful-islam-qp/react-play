import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

export interface IOption {
  id: number | string;
  name: string;
}

interface SelectBoxProps {
  options?: IOption[];
  selected?: IOption;
  setSelected?: (option: IOption) => void;
  width?: string;
}

export function SelectBox({
  options,
  selected,
  setSelected,
  width = "100%",
}: SelectBoxProps) {
  return (
    <Listbox
      as="div"
      className="headless-ui-select"
      value={selected}
      onChange={setSelected}
    >
      <ListboxButton className="headless-ui-button">
        {selected?.name || "Select"}
      </ListboxButton>
      <ListboxOptions
        className="headless-ui-options"
        anchor={{ to: "bottom start", gap: "4px" }}
        style={{ minWidth: "fit-content", width: width }}
      >
        {options?.map((option) => (
          <ListboxOption
            key={option.id}
            value={option}
            className="headless-ui-option"
          >
            {option.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
