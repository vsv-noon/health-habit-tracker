export type AutocompleteListProps = {
  items: string[];
  highlighted: number;
  onSelect: (value: string) => void;
  onHover: (index: number) => void;
};
