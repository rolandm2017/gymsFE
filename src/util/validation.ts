import Joi, { ObjectSchema } from "joi";

export function isValidName(test: string): boolean {
    const firstName = test.split(" ")[0];
    const lastName = test.split(" ")[1];
    if (lastName === undefined) return false;
    return firstName.length >= 2 && lastName.length >= 2;
}

export function isEmail(maybeEmail: string): boolean {
    const schema: ObjectSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
    });
    const { error } = schema.validate({ email: maybeEmail });
    if (error) return false;
    else return true;
}

export function isValidPassword(pw: string, confirmation: string) {
    const schema: ObjectSchema = Joi.object({
        password: Joi.string().min(6).max(100).required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    });
    const { error } = schema.validate({ password: pw, confirmPassword: confirmation });
    if (error) return false;
    return true;
}

export function validAuthentication(email: string, password: string) {
    const schema: ObjectSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: Joi.string().required(),
    });
    const { error } = schema.validate({ email, password });
    if (error) return false;
    else return true;
}

export function validRegistration(name: string, email: string, password: string, confirmPassword: string) {
    const schema: ObjectSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: Joi.string().min(6).max(100).required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
        acceptTerms: Joi.boolean().valid(true).required(),
    });
    const { error } = schema.validate({ email, password, confirmPassword, acceptTerms: true });
    if (!isValidName(name)) return false;
    if (error) return false;
    else return true;
}
