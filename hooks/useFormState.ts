import { ChangeEvent, useState } from 'react';

type FormState = {
	[key: string]: string;
};

type FormEvent = ChangeEvent<HTMLInputElement>;

type UseFormStateResult = {
	formData: FormState;
	handleChange: (e: FormEvent) => void;
	setValue: (key: string, value: string) => void;
	resetForm: () => void;
};

const useFormState = (initialState: FormState): UseFormStateResult => {
	const [formData, setFormData] = useState<FormState>(initialState);

	const handleChange = (e: FormEvent) => {
		const { name, value } = e.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
	};

	const setValue = (key: string, value: string) => {
		setFormData(prevState => ({ ...prevState, [key]: value }));
	};

	const resetForm = () => {
		setFormData(initialState);
	};

	return { formData, handleChange, setValue, resetForm };
};

export default useFormState;
