import { z } from "zod";

export {
	userUpdateSchema,
	userRequestSchema,
	userSchema,
	userWithoutPasswordSchema
};

const userSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1).max(50),
	email: z.string().email().min(1).max(70),
	password: z
		.string()
		.min(8)
		.regex(
			new RegExp(".*[A-Z].*"),
			"Password must have at least one capital letter"
		)
		.regex(
			new RegExp(".*[a-z].*"),
			"Password must have at least one lowercase letter"
		)
		.regex(new RegExp(".*\\d.*"), "Password must have at least one number")
		.regex(
			new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
			"Password must have at least one special character"
		),
	createdAt: z.string(),
	updatedAt: z.string(),
});

const userRequestSchema = userSchema
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true
	})

const userUpdateSchema = userSchema
	.pick({
		name: true,
		birthdate: true,
		email: true,
		password: true,
		description: true
	})
	.partial();

	const userWithoutPasswordSchema = userSchema
	.omit({
		password: true,
	})
	.partial();

