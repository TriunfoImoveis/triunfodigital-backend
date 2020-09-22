import styled from 'styled-components';
import ReactSelect from 'react-select';

export const SelectInput = styled(ReactSelect)`
  & .react-select__control {
    background: none;
    border: 0.2rem solid #fff;
    font-size: 1.4rem;
    color: #fff;
  }
  & .react-select__single-value {
    font-size: 1.4rem;
    padding-left: 0.8rem;
    color: #fff;
  }

  & .react-select__indicator {
    color: #fff;
  }

  & .react-select__placeholder {
    color: #fff;
    font-size: 1.4rem;
    padding-left: 0.8rem;
  }

  & .react-select__menu-list {
    background: #fff;
  }

  & .react-select__option:hover {
    color: #c32925;
  }
`;
