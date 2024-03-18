import { defineRule } from "vee-validate";

import { required, email, image } from "@vee-validate/rules";
export default defineNuxtPlugin((nuxtApp) => {
  defineRule("required", (value, [target], ctx) => {
    if (value && (value + "").trim()) {
      return true;
    }
    return ctx.field + " is required";
  });
  defineRule("email", email);
  defineRule("image", image);
  defineRule("minLength", (value, [min]) => {
    if (value && (value + "").length >= min) {
      return true;
    } else return `At Least ${min} is required`;
  });
  defineRule("confirm", (value, [target], ctx) => {
    if (value === ctx.form[target]) {
      return true;
    } else return "Password is not match";
  });

  defineRule("range", (value, [min]) => {
    if (value >= min || !(value && (value + "").trim())) {
      return true;
    } else return `must be >= ${min}`;
  });
  defineRule("ethioPhone", (value) => {
    if (
      (value + "").match(
        /(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))/
      )
    ) {
      return true;
    } else return "please correct valid phone form";
  });

  defineRule("date", (value) => {
    if (value) {
      const end_date = new Date(value);
      const currentDate = new Date();
      if (currentDate >= end_date) {
        return true;
      } else return "date is out of range";
    }
  });

  defineRule("end_date", (value, [target], ctx) => {
    if (!ctx.form[target]) {
      return "end date must greater than start date";
    } else if (!value) {
      return true;
    } else {
      const end_date = new Date(value);
      const start_date = new Date(ctx.form[target]);

      if (start_date >= end_date) {
        return "end date must greater than start date";
      } else return true;
    }
  });
});
