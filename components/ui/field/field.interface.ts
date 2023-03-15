import { InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

export interface FieldProps {
	Icon?: IconType;
	IconSize?: number;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & FieldProps;

export interface Field extends TypeInputPropsField {}
