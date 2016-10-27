// @flow
import React from 'react';
import styled from 'styled-components';

export const FormWrapper = styled.section`
  text-align: left;
`;

export const InnerInput = styled.input`
  margin: 0.2rem;
  padding: 0.2rem;
  font-size: 1.4rem;
`;

export const Button = styled.button`
  margin: 0.2rem;
  padding: 0.4rem;
  font-size: 1.4rem;
  font-weight: 200;
  background-color: #d20a10;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #9f0000;
  }
`;

export const Label = styled.label`
  display: block;
  margin: 1rem 0.2rem;
  font-size: 1.4rem;

  input {
    margin-left: 0.4rem;
    width: 100%;
  }
`;

export const RadioLabel = styled.label`
  display: block;
  margin: 0.2rem;
  font-size: 1.4rem;

  span {
    margin-left: 0.4rem;
  }
`;

type InputProps = {
  id?: string,
  name: string,
  value: string,
  label: string,
}

export const Input = ({ label, ...props }: InputProps) => (
  <Label htmlFor={props.id}>
    <span>{label}</span>
    <InnerInput id={props.name} {...props} />
  </Label>
);

type RadioProps = {
  id: string,
  name: string,
  value: string,
  label: string,
}

export const Radio = ({ label, ...props }: RadioProps) => (
  <RadioLabel htmlFor={props.id}>
    <InnerInput {...props} type="radio" />
    <span>{label}</span>
  </RadioLabel>
);
