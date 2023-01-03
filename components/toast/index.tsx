import React from 'react';
import { toast } from 'react-toastify';
import {
	FaInfo,
	FaCheck,
	FaExclamationTriangle,
	FaBug,
	FaExclamationCircle,
} from 'react-icons/fa';

// export const displayIcon = (type: string) => {
//     switch (type) {
//       case "success":
//         return <FaCheck />;
//       case "info":
//         return <FaInfo />;
//       case "error":
//         return <FaExclamationCircle />;
//       case "warning":
//         return <FaExclamationTriangle />;
//       default:
//         return <FaBug />;
//     }
//   };

export interface toast {
	type: 'success' | 'error' | 'info' | 'warning';
	message: string;
}

const ToastMessage = ({ type, message }: toast) =>
	toast[type](
		<div style={{ display: 'flex' }}>
			<div style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px' }}>
				{message}
			</div>
		</div>,
	);

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
