<script lang="ts">
  import AuthButton from "$lib/forms/authButton.svelte";
  import AuthInput from "$lib/forms/authInput.svelte";
  import { object, string, number, date, InferType, ValidationError } from "yup";
  let email: string;
  let password: string;
  let errors = {email,password};
  function login(e) {
    console.log(email);
    console.log(password);
    validate();
  }

  let loginSchema = object({
    email: string().required("Please enter your email.").email("Please enter a valid email.").nullable(),
    password: string()
      .required("Please enter your password.")
      .min(5, "Your password must be longer than five characters.").nullable(),
  });

  async function validate() {
    try {
      await loginSchema.validate({email,password},{abortEarly:false});
      errors = {email:"",password:""}
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
  <div class="bg-white md:px-10 px-5 py-5 rounded-xl flex-1 mx-4 max-w-2xl shadow-2xl">
    <h1 class="mb-4 text-center font-bold text-2xl md:text-3xl">Login</h1>
    <hr />
    <form class="my-3" on:submit|preventDefault={login}>
      <div class="mt-2">
        <AuthInput
          label="Email"
          id="email"
          placeholder="email@example.com"
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
          placeholder="Enter your password..."
          type="password"
          bind:error={errors.password}
          bind:value={password}
          on:change={validate}
        />
      </div>
      <AuthButton type="submit">Login</AuthButton>
    </form>
    <br />
    <p class="text-sm text-center">
      <a href="https://driedsponge.net">Forgot password</a> &bull; Don't have an
      account? <a href="/register">Sign up here!</a>
    </p>
  </div>
</div>

<style lang="postcss">
  a {
    @apply text-blue-400 hover:text-blue-600;
  }
</style>
