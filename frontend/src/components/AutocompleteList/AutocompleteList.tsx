import type { AutocompleteListProps } from './types';

export function AutocompleteList({ items, highlighted, onSelect, onHover }: AutocompleteListProps) {
  return (
    <ul>
      {items.map((item, i) => (
        <li
          key={i}
          className={i === highlighted ? 'active' : ''}
          onMouseEnter={() => onHover(i)}
          onMouseDown={() => onSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
