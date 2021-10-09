import React, { useState } from 'react'
import styled from 'styled-components';

interface SelectProps {
    placeholder?: string;
    endpoint: string;
}

const Select: React.FC<SelectProps> = () => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <SelectContainer>
            <SelectValueContainer onClick={() => setOpen(!open)}>
                This is select
            </SelectValueContainer>
            <DropdownContainer visible={open}>
                <SearchInput />
                <ListContainer>
                    <ListItem>
                        <span>Test</span>
                    </ListItem>
                </ListContainer>
            </DropdownContainer>
        </SelectContainer>
    )
}

const SelectContainer = styled.div`
    position: relative;
`;

const SelectValueContainer = styled.div`
    border: 0.5px solid #e2e2e2;
`

const DropdownContainer = styled.div<{ visible: boolean }>`
    position: absolute;
    top: 20px;
    left: 0px;
    display: ${(props) => props.visible ? 'block' : 'none'};
    border: 0.5px solid #e2e2e2;
`

const SearchInput = styled.input`
    margin: 10px 5px;
`

const ListContainer = styled.ul`
    margin: 0px;
    padding: 0px;
`

const ListItem = styled.li`
    list-style-type: none;
    margin: 5px 10px;

    :not(:last-child) {
        border-bottom: 0.5px solid #e2e2e2;
    }
`

export default Select;
