import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import styles from './Select.module.css'

export interface IOption {
  id: number | string
  name: string
}

interface SelectBoxProps {
  options?: IOption[]
  selected?: IOption
  setSelected?: (option: IOption) => void
  width?: string
}

export function SelectBox({
  options,
  selected,
  setSelected,
  width = '100%',
}: SelectBoxProps) {
  return (
    <Listbox
      as="div"
      className="headless_ui_select"
      value={selected}
      onChange={setSelected}
    >
      <ListboxButton className={styles.headless_ui_button}>
        {selected?.name || 'Select'}
      </ListboxButton>
      <ListboxOptions
        className={styles.headless_ui_options}
        anchor={{to: 'bottom start', gap: '4px'}}
        style={{minWidth: 'fit-content', width: width}}
      >
        {options?.map(option => (
          <ListboxOption
            key={option.id}
            value={option}
            className={styles.headless_ui_option}
          >
            {option.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}
