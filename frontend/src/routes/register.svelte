<script lang="ts">
  import AuthButton from "$lib/forms/authButton.svelte";
  import AuthInput from "$lib/forms/authInput.svelte";
  import { object, string, ref as rref } from "yup";
  import axios from "axios";
  import { transformError } from "$lib/forms/ErrorTransformer";

  //TO-DO: Condense down to object
  let email: string;
  let password: string;
  let confirm_password: string;
  let name: string;

  let errors = { email, password, name, confirm_password };
  async function register(e) {
    if (await validate()) {
      axios
        .post("http://localhost:8080/auth/register", { name, email, password })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err.response.status == 400) {
            errors = transformError(err.response.data);
          }
        });
    }
  }

  let loginSchema = object({
    name: string()
      .required("Please enter a username.")
      .min(3, "Your username must be greater than 3 characters.")
      .max(30, "Your username must be less than 30 characters.")
      .nullable(),
    email: string()
      .required("Please enter your email.")
      .email("Please enter a valid email.")
      .nullable(),
    password: string()
      .required("Please enter your password.")
      .min(5, "Your password must be longer than five characters.")
      .nullable(),
    confirm_password: string()
      .required("Please enter your password.")
      .min(5, "Your password must be longer than five characters.")
      .oneOf([rref("password"), null], "Passwords do not match.")
      .nullable(),
  });

  async function validate() {
    try {
      await loginSchema.validate(
        { email, password, name, confirm_password },
        { abortEarly: false }
      );
      errors = { email: "", password: "", name: "", confirm_password: "" };
      return true;
    } catch (err) {
      errors = err.inner.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message };
      }, {});
      return false;
    }
  }

  export const prerender = true;
</script>

<div class="flex items-center justify-center h-screen">
  <div class="bg-white px-10 py-5 rounded-xl flex-1 mx-4 max-w-2xl shadow-2xl">
    <h1 class="mb-4 text-center font-bold text-2xl md:text-3xl">
      Create An Account
    </h1>
    <hr />
    <form class="my-3" on:submit|preventDefault={register}>
      <div class="mt-2">
        <AuthInput
          label="Username"
          id="name"
          placeholder="DriedSponge"
          helpertext="Enter a username between 3-30 characters."
          bind:value={name}
          bind:error={errors.name}
          on:change={validate}
        />
      </div>
      <br />
      <div class="mt-2">
        <AuthInput
          label="Email"
          id="email"
          placeholder="email@example.com"
          helpertext="Enter an email you would like asscoiated with your account."
          bind:value={email}
          bind:error={errors.email}
          on:change={validate}
        />
      </div>
      <br />
      <div class="mb-2">
        <AuthInput
          label="Password"
          id="password"
          placeholder="Enter a password..."
          helpertext="Enter a strong password to secure your account."
          type="password"
          bind:error={errors.password}
          bind:value={password}
          on:change={validate}
        />
      </div>
      <br />
      <div class="mb-2">
        <AuthInput
          label="Confirm Password"
          id="confirm_password"
          placeholder="Enter your password..."
          helpertext="Re-enter the password you entered above."
          type="password"
          bind:error={errors.confirm_password}
          bind:value={confirm_password}
          on:change={validate}
        />
      </div>
      <AuthButton type="submit">Register</AuthButton>
    </form>
    <br />
    <p class="text-sm text-center">
      Already have an account? <a href="/login">Login here!</a>
    </p>
  </div>
</div>

<style lang="postcss">
  a {
    @apply text-blue-400 hover:text-blue-600;
  }
</style>
