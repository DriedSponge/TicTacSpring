<script lang="ts">
  import AuthButton from "$lib/forms/authButton.svelte";
  import AuthInput from "$lib/forms/authInput.svelte";
  import axios from "axios";
  import { goto } from "$app/navigation";
  import {
    object,
    string,
  } from "yup";
  let name: string;
  let errors = { name };
  async function login(e) {
    if (await validate()) {
      axios
        .post(
          "http://localhost:8080/auth/login-guest",
          {
            name:name,
          },
          { withCredentials: true }
        )
        .then((res) => {
          goto("/");
        })
        .catch((err) => {});
    }
  }

  let loginSchema = object({
    name: string()
      .required("Please enter a name.")
      .min(3, "Your name must be longer than 3 characters.")
      .max(30,"Your name must be shorther than 30 characters")
      .nullable(),
  });

  async function validate() {
    try {
      await loginSchema.validate({ name }, { abortEarly: false });
      errors = { name: ""};
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

<form autocomplete="off" on:submit|preventDefault="{login}">
  <div class="flex flex-col">
    <div class="w-full">
      <input bind:value="{name}" on:change="{validate}"  name="name" id="name" maxlength="30" placeholder="Your Name" />
    </div>
    <div class="w-full">
      <button type="submit">Go {errors.name}</button>
    </div>
  </div>
</form>

<style lang="postcss">
  button {
    @apply py-2 appearance-none rounded-b-lg border-t-0 rounded-t-none shadow-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl;
    @apply transition ease-in-out duration-300 w-full;
  }
  input {
    @apply p-2;
    @apply appearance-none;
    @apply focus:ring-0 focus:outline-none;
    @apply transition duration-300 ease-in-out;
    @apply w-full rounded-t-lg rounded-b-none border-gray-100 border-2 focus:border-blue-200;
    @apply placeholder:text-xl placeholder:text-center;
    @apply text-center font-bold text-xl;
  }
</style>
