import React, { useState, useRef, useEffect, useCallback, FC } from 'react'
import styled from 'styled-components';
import { useOnClickOutside } from '@lib';

interface SelectProps<Value> {
    placeholder?: string;
    value?: Value[] | null;
    onEndReached?: () => void;
    onOpen?: () => void;
    onClose?: () => void;
    endpoint: string;
    onChange: (value: Value) => void;
    onDeleteItem: (value: Value) => void;
    options: Value[] | [];
    onClear: () => void;
    onSearch?: (searchValue: string) => void;
}

export const Select = <Value extends { id: number, name: string }>() => {
    const Instance: FC<SelectProps<Value>> = ({ options, value, placeholder, onChange, onEndReached, onOpen, onClose, onClear, onDeleteItem, onSearch }) => {
        const [open, setOpen] = useState<boolean>(false)
        const [searchValue, setSearchValue] = useState<string>();
        const selectRef = useRef<HTMLDivElement>(null);
        const observer = useRef<IntersectionObserver | null>();
        useOnClickOutside(selectRef, () => {
            setOpen(false);
        });

        const lastElementRef = useCallback(  // (*)
            (node) => {
                if (observer.current) observer.current.disconnect();
                observer.current = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        onEndReached && onEndReached();
                    }
                });
                if (node) observer.current.observe(node);
            },
            [onEndReached]
        );

        useEffect(() => {
            if (open) {
                onOpen && onOpen();
            }
            else {
                onClose && onClose();
            }
        }, [open]);

        const onItemPress = (option: Value) => {
            const foundItem = value ? value.find((item) => item.id === option.id) : null
            if (foundItem) {
                onDeleteItem(option);
            }
            else {
                onChange(option);
            }
        }

        const clearValue = (e: React.MouseEvent<HTMLSpanElement>) => {
            onClear();
            setOpen(false);
            e.stopPropagation();
        }

        const deleteItem = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, item: Value) => {
            e.stopPropagation();
            onDeleteItem(item);
            setOpen(false);
        }

        const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
            onSearch && onSearch(e.target.value);
        }

        return (
            <SelectContainer ref={selectRef}>
                <SelectValueContainer onClick={() => setOpen(!open)}>
                    {value ? (
                        <ItemsContainer>
                            {value.map((item, index) => (
                                <Item key={item.id + index}>
                                    <SelectValueText>
                                        {item.name}
                                    </SelectValueText>
                                    <DeleteItem onClick={(e) => deleteItem(e, item)}>X</DeleteItem>
                                </Item>
                            ))}
                        </ItemsContainer>
                    ) : (
                        <SelectValuePlaceholder>
                            {placeholder ? placeholder : 'Select a value...'}
                        </SelectValuePlaceholder>
                    )}
                    <SelectValueClear onClick={clearValue}>
                        X
                    </SelectValueClear>
                </SelectValueContainer>
                <DropdownContainer visible={open}>
                    <SearchInput
                        type="text"
                        value={searchValue}
                        onChange={onSearchChange}
                    />
                    <ListContainer>
                        {options.map((option, index) => (
                            <ListItem key={option.id + index} onClick={() => onItemPress(option)}>
                                <input type='checkbox' readOnly checked={value ? !!value.find((item) => item.id === option.id) : false} />
                                <span>{option.name}</span>
                            </ListItem>
                        ))}
                        <div ref={lastElementRef} />
                    </ListContainer>
                </DropdownContainer>
            </SelectContainer>
        )
    }

    return Instance;
}

const SelectContainer = styled.div`
    position: relative;
    width: 100%;
    cursor: pointer;
`;

const SelectValueContainer = styled.div`
    border: 0.5px solid #e2e2e2;
    min-width: 0;
    display: flex;
    align-items: center;
    padding: 5px;
`;

const ItemsContainer = styled.span`
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
`;

const Item = styled.div`
    background-color: #eee;
    margin: 4px;
    display: flex;
    align-items: center;
    max-height: 25px;
`;

const SelectValueText = styled.span`
    /* flex: 1; */
    white-space: nowrap;
    padding: 2px;
    margin: 10px 2.5px;
    align-items: center;
    /* width: 100%; */
`;

const SelectValuePlaceholder = styled.span`
    color: #ddd;
    width: 100%;
`;

const SelectValueClear = styled.span`
    font-size: 11px;
    padding: 0px 10px;
    flex-shrink: 0;
`;

const DeleteItem = styled.span`
    font-size: 10px;
    padding: 7px;
`;

const DropdownContainer = styled.div<{ visible: boolean }>`
    position: absolute;
    left: 0px;
    display: ${(props) => props.visible ? 'block' : 'none'};
    border: 0.5px solid #e2e2e2;
    width: 100%;
    background-color: #fff;
    z-index: 9;
`;

const SearchInput = styled.input`
    margin: 10px 5px;
    width: calc(100% - 10px);
`;

const ListContainer = styled.ul`
    margin: 0px;
    padding: 0px;
    height: 150px;
    overflow-y: scroll;
`;

const ListItem = styled.li`
    list-style-type: none;
    margin: 5px 10px;
    padding-bottom: 5px;

    :not(:last-child) {
        border-bottom: 0.5px solid #e2e2e2;
    }
`;

export default Select;
