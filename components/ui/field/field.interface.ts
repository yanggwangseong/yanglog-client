import { InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

export interface FieldProps {
	Icon?: IconType;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & FieldProps;

export interface Field extends TypeInputPropsField {}
