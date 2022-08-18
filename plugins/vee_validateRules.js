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
    let dateArray = (value + "").split("-");
    const month = dateArray[1];
    const day = dateArray[2];
    const year = dateArray[0];
    const nowYear = new Date().getFullYear();
    const getmonth = new Date().getMonth() + 1;
    
    if (nowYear.toString() > year) {
      return true;
    } else if (nowYear.toString() < year) {
      return "date is out of now ";
    } else if (month.toString() < getmonth) {
      return true;
    } else if (
      month.toString() == getmonth &&
      day.toString() <= new Date().getDay()+7
    ) {
      return true;
    } else return "date is out of now";
  });
});
