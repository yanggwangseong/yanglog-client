import { ChangeEvent, useState } from 'react';

/*
T : string | number 밖에 못온다. 이유는 react type의 InputHTMLAttributes타입의 value값이 그렇게 선언 되어있음.
*/
type FormState<T> = {
	[key: string]: T;
};

type FormEvent = ChangeEvent<HTMLInputElement>;

type UseFormStateResult<T> = {
	formData: FormState<T>;
	handleChange: (e: FormEvent) => void;
	setValue: (key: string, value: T) => void;
	resetForm: () => void;
};

const useFormState = <T>(initialState: FormState<T>): UseFormStateResult<T> => {
	const [formData, setFormData] = useState<FormState<T>>(initialState);

	const handleChange = (e: FormEvent) => {
		const { name, value } = e.target;
		setFormData(prevState => ({ ...prevState, [name]: value as T }));
	};

	const setValue = (key: string, value: T) => {
		setFormData(prevState => ({ ...prevState, [key]: value }));
	};

	const resetForm = () => {
		setFormData(initialState);
	};

	return { formData, handleChange, setValue, resetForm };
};

export default useFormState;
