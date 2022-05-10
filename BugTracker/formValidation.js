const formValidation = (state) => {
    let errors = {};
    if (!state["name"]) {
      errors["name"] = "Cannot be empty";
      return errors
    }

    if (typeof state["name"] !== "undefined") {
      if (!state["name"].match(/^[a-zA-Z\s]+$/)) {
        errors["name type"] = "Only letters";
        return errors
      }
    }

    if (!state["email"]) {
      errors["email"] = "Cannot be empty";
      return errors
    }

    if (typeof state["email"] !== "undefined") {
      let lastAtPos = state["email"].lastIndexOf("@");
      let lastDotPos = state["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          state["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          state["email"].length - lastDotPos > 2
        )
      ) {
        errors["email"] = "Email is not valid";
        return errors
      }
    }
    if (!state["subject"]) {
        errors["subject"] = "Cannot be empty";
        return errors
      }


    return errors

  }


export default formValidation