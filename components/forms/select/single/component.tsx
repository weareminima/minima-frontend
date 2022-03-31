import {
  useEffect, useRef, useMemo, FC,
} from 'react';

import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import cx from 'classnames';

// Downshift;
import { useSelect } from 'downshift';

// Popper
import {
  flipModifier,
  hideModifier,
  sameWidthModifier,
  offsetModifier,
} from 'components/forms/select/constants/popper-modifiers';
import THEME from 'components/forms/select/constants/theme';
import Menu from 'components/forms/select/menu';
import Toggle from 'components/forms/select/toggle';
import { SelectProps, SelectOptionProps } from 'components/forms/select/types';

export const SingleSelect: FC<SelectProps> = ({
  theme = 'dark',
  size = 'base',
  maxHeight = 300,
  status,
  prefix,
  options = [],
  disabled = false,
  placeholder,
  values,
  initialValues,
  clearSelectionActive,
  clearSelectionLabel = 'Clear selection',
  onSelect,
  onFocus,
  onBlur,
}: SelectProps) => {
  const triggerRef = useRef();
  const menuRef = useRef();

  const getOptions = useMemo(
    () => [
      ...(clearSelectionActive
        ? [
          {
            value: null,
            label: clearSelectionLabel,
          },
        ]
        : []),
      ...options,
    ],
    [options, clearSelectionActive, clearSelectionLabel],
  );

  const getInitialSelected = useMemo(() => {
    const opts = getOptions.find((o) => o.value === initialValues && o.value !== null);
    return opts;
  }, [getOptions, initialValues]);

  const getSelected = useMemo(() => {
    const opts = getOptions.find((o) => o.value === values && o.value !== null) || null;
    return opts;
  }, [getOptions, values]);

  // Events
  const handleSelectedItems = (selected, reset) => {
    switch (selected.value) {
      case null:
        reset();
        break;
      default:
        break;
    }
  };

  const isSelected = (selected: SelectOptionProps, selectedItms: SelectOptionProps[]) =>
    selectedItms.some((i) => i.value === selected.value);

  // 'useSelect'
  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    closeMenu,
    reset,
  } = useSelect<SelectOptionProps>({
    items: getOptions,
    ...(typeof values !== 'undefined' && {
      selectedItem: getSelected,
    }),
    ...(typeof initialValues !== 'undefined' && {
      initialSelectedItem: getInitialSelected,
    }),
    itemToString: (item) => item.label, // How the selected options is announced to screen readers
    stateReducer: (st, actionAndChanges) => {
      const { changes, type } = actionAndChanges;

      if (
        type === useSelect.stateChangeTypes.MenuKeyDownEnter
        || type === useSelect.stateChangeTypes.MenuKeyDownSpaceButton
        || type === useSelect.stateChangeTypes.ItemClick
      ) {
        onSelect(changes.selectedItem);
      }

      return changes;
    },
    onStateChange: ({ type, selectedItem: selected }) => {
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.ItemClick:
          if (selected) {
            handleSelectedItems(selected, reset);
          }
          break;
        default:
          break;
      }
    },
  });

  // 'usePopper'
  const { styles, attributes, update } = usePopper(triggerRef.current, menuRef.current, {
    placement: 'bottom',
    // strategy: 'fixed',
    modifiers: [offsetModifier, flipModifier, hideModifier, sameWidthModifier],
  });

  // Hide menu if reference is outside the boundaries
  const referenceHidden = attributes?.popper?.['data-popper-reference-hidden']
    || attributes?.popper?.['data-popper-reference-scaped'];
  useEffect(() => {
    if (referenceHidden) {
      closeMenu();
    }
  }, [referenceHidden, closeMenu]);

  useEffect(() => {
    if (update) update();
  }, [isOpen, update]);

  const selectedItems = selectedItem ? [selectedItem] : [];

  return (
    <div
      className={cx({
        'w-full leading-tight overflow-hidden': true,
        [THEME[theme].container]: true,
        [THEME[theme].closed]: true,
        [THEME.states[status]]: true,
      })}
    >
      <div className="relative w-full" ref={triggerRef}>
        <Toggle
          options={getOptions}
          theme={theme}
          size={size}
          status={status}
          prefix={prefix}
          disabled={disabled}
          opened={isOpen}
          selectedItems={selectedItems}
          placeholder={placeholder}
          getToggleButtonProps={getToggleButtonProps}
        />
      </div>

      {/* Menu */}
      {createPortal(
        <div
          className={cx({
            'z-50': true,
            // The content of `<Menu />` must always be in the DOM so that Downshift can get the ref
            // to the `<ul />` element through `getMenuProps`
            invisible: !isOpen,
          })}
          ref={menuRef}
          style={styles.popper}
          {...attributes.popper}
        >
          <Menu
            theme={theme}
            size={size}
            status={status}
            disabled={disabled}
            opened={isOpen}
            attributes={attributes}
          >
            <Toggle
              options={options}
              theme={theme}
              size={size}
              status={status}
              prefix={prefix}
              disabled={disabled}
              opened={isOpen}
              selectedItems={selectedItems}
              placeholder={placeholder}
              getToggleButtonProps={getToggleButtonProps}
            />

            <ul
              {...getMenuProps({ onFocus, onBlur })}
              className={cx({
                'py-1 overflow-y-auto overflow-x-hidden': true,
              })}
              style={{
                maxHeight,
              }}
            >
              {getOptions.map((option, index) => (
                <li
                  className={cx({
                    'px-4 py-1 mt-0.5 cursor-pointer': true,
                    [THEME[theme].item.base]: highlightedIndex !== index,
                    [THEME[theme].item.disabled]: option.disabled,
                    [THEME[theme].item.highlighted]:
                      (highlightedIndex === index && !option.disabled)
                      || isSelected(option, selectedItems),
                  })}
                  key={`${option.value}`}
                  {...getItemProps({ item: option, index, disabled: option.disabled })}
                >
                  <span
                    className={cx({
                      'ml-6': !!option.checkbox,
                    })}
                  >
                    {option.label}
                  </span>
                </li>
              ))}
            </ul>
          </Menu>
        </div>,
        document.body,
      )}
    </div>
  );
};

export default SingleSelect;
