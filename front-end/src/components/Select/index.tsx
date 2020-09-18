import React, {
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { ArrowDown } from '../../assets/images';

import {
  DropDownContainer,
  DropDownHeader,
  DropDownList,
  DropDownListContainer,
  ListItem,
} from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
}

const Select: React.FC<SelectProps> = ({ name, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const toggling = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onOptionClicked = useCallback(
    value => {
      setSelectedOption(value);
      setIsOpen(false);
      console.log(selectedOption);
    },
    [selectedOption],
  );
  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        {selectedOption || 'Selecione o cargo'}
        <ArrowDown />
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            <ListItem onClick={() => onOptionClicked('MKT')}>MKT</ListItem>
            <ListItem onClick={() => onOptionClicked('Corretores')}>
              Corretores
            </ListItem>
            <ListItem onClick={() => onOptionClicked('Dono')}>Dono</ListItem>
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};

export default Select;
