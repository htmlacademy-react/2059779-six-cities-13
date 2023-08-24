import { FormEvent } from 'react';
import { useActionCreators } from '../../hooks';
import { userActions } from '../../store/slices/user';
import { PASSWORD_REGEXP } from '../../const';

type THTMLLoginForm = HTMLFormElement & {
	email: HTMLInputElement;
	password: HTMLInputElement;
}

function LoginForm() {
	const { login } = useActionCreators(userActions);

	const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		const form = evt.currentTarget as THTMLLoginForm;

		if (PASSWORD_REGEXP.test(form.password.value)) {
			login({
				email: form.email.value,
				password: form.password.value,
			});
		} else {
			form.reportValidity();
		}

	};

	return (
		<section className="login">
			<h1 className="login__title">Sign in</h1>
			<form className="login__form form" action="#" method="post" onSubmit={handleSubmitForm}>
				<div className="login__input-wrapper form__input-wrapper">
					<label className="visually-hidden">E-mail</label>
					<input
						className="login__input form__input"
						type="email"
						name="email"
						placeholder="Email"
						required
					/>
				</div>
				<div className="login__input-wrapper form__input-wrapper">
					<label className="visually-hidden">Password</label>
					<input
						className="login__input form__input"
						type="password"
						name="password"
						placeholder="Password"
						required
						title="Password must contain at least one number and letter."
					/>
				</div>
				<button className="login__submit form__submit button" type="submit">
					Sign in
				</button>
			</form>
		</section>
	);
}

export default LoginForm;
