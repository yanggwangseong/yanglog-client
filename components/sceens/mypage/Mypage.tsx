import Format from '@/components/ui/layout/format';
import React, { FC } from 'react';
import styles from './Mypage.module.scss';
import Sidebar from '@/components/ui/layout/sidebar/Sidebar';
import Image from 'next/image';
import Button from '@/components/ui/button/Button';
import Field from '@/components/ui/field/Field';
import useFormState from '@/hooks/useFormState';

const FieldStyle = {
	width: '100%',
	borderRadius: '8px',
	padding: '12px',
	fontSize: '18px',
	height: '44px',
};
const Mypage: FC = () => {
	const initialFormState = {
		username: '',
		phone_number: '',
		email: '',
		role: '',
	};

	const { formData, handleChange, setValue, resetForm } =
		useFormState(initialFormState);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<Format title="마이페이지">
			<div className={styles.container}>
				<Sidebar />
				<div className={styles.contents_container}>
					<div className={styles.contents_title}>Account</div>
					<div className={styles.contents_card}>
						<div className={styles.contents_main_container}>
							<form onSubmit={handleSubmit}>
								<div>Personal information</div>
								<div className={styles.avatar_label}>Avatar</div>
								<div className={styles.avatar_container}>
									<div>
										<Image
											className={styles.avatar_img}
											src="/images/author/dev-jeans 8.png"
											alt="avatar"
											width={88}
											height={88}
										></Image>
									</div>

									<div className={styles.avatar_btn_wrap}>
										<Button
											type="button"
											className="h-11 bg-white text-primary 
                                    border border-primary text-xl px-3 py-2 rounded-lg
                                    font-normal
                                    "
											style={{ width: '83px' }}
										>
											Change
										</Button>
									</div>
									<div className={styles.avatar_btn_wrap}>
										<Button
											type="button"
											className=" text-darkgray
                                     text-xl px-3 py-2 rounded-lg
                                     font-normal h-11 
                                    "
											style={{ width: '86px' }}
										>
											Remove
										</Button>
									</div>
								</div>
								<div className={styles.field_container}>
									<div className={styles.field_div}>
										<label className={styles.field_label}>
											Name
											<Field
												value={formData.username}
												onChange={handleChange}
												style={FieldStyle}
											></Field>
										</label>
									</div>
									<div className={styles.field_div}>
										<label className={styles.field_label}>
											Phone number
											<Field
												value={formData.phone_number}
												onChange={handleChange}
												style={FieldStyle}
											></Field>
										</label>
									</div>
								</div>
								<div className={styles.field_container}>
									<div className={styles.field_div}>
										<label className={styles.field_label}>
											Email
											<Field
												value={formData.email}
												onChange={handleChange}
												style={FieldStyle}
											></Field>
										</label>
									</div>
									<div className={styles.field_div}>
										<label className={styles.field_label}>
											Role
											<Field
												value={formData.role}
												onChange={handleChange}
												style={FieldStyle}
											></Field>
										</label>
									</div>
								</div>
								<div className={styles.email_notification_container}>
									<div>Email notifications</div>
									<div className={styles.field_container}>
										<div className={styles.field_checkbox_div}>
											<div className={styles.field_checkbox_container}>
												<input type="checkbox" className="w-5 h-5" checked />
											</div>
											<div className={styles.field_checkbox_description}>
												New Post
											</div>
										</div>
										<div className={styles.field_checkbox_div}>
											<div className={styles.field_checkbox_container}>
												<input type="checkbox" className="w-5 h-5" checked />
											</div>
											<div className={styles.field_checkbox_description}>
												Password changes
											</div>
										</div>
									</div>
									<div className={styles.field_container}>
										<div className={styles.field_checkbox_div}>
											<div className={styles.field_checkbox_container}>
												<input type="checkbox" className="w-5 h-5" checked />
											</div>
											<div className={styles.field_checkbox_description}>
												MyComment of reply
											</div>
										</div>
										<div className={styles.field_checkbox_div}>
											<div className={styles.field_checkbox_container}>
												<input type="checkbox" className="w-5 h-5" checked />
											</div>
											<div className={styles.field_checkbox_description}>
												MyPost of comment
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>

						<div className={styles.footer_btn_wrap}>
							<div>
								<Button
									type="button"
									className="h-11 bg-white text-warning
                                    border border-warning text-xl px-3 py-2 rounded-lg
                                    font-normal
                                    "
									style={{ width: '83px' }}
								>
									Log Out
								</Button>
							</div>
							<div className="flex ml-auto">
								<Button
									type="button"
									className="h-11 bg-primary text-white
                                    border border-primary text-xl px-3 py-2 rounded-lg
                                    font-normal
                                    "
								>
									Save Changes
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default Mypage;
