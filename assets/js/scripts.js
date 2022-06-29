//**=======Cody4code Forms!======**
window.onload = () => {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  document.querySelectorAll("form").forEach((e) => {
    // let invalid = e.querySelector(".invalid-feedback");
    let show = e.querySelector("#showp");
    show &&
      (show.onclick = (e) => {
        e.target.parentNode.parentNode.children.password.type == "password"
          ? (e.target.parentNode.parentNode.children.password.type = "text")
          : (e.target.parentNode.parentNode.children.password.type =
              "password");
        e.target.classList.contains("la-eye") &&
          e.target.classList.toggle("la-eye-slash");
      });
    e.oninput = (e) => {
      let feedback = e.target.parentNode.children.feedback;
      console.log(feedback);
      e.target.value
        ? e.target.classList.add("active")
        : e.target.classList.remove("active");
      e.target.value.length >= 30
        ? (e.target.classList.add("is-invalid"),
          feedback &&
            (feedback.innerText = `please use a valid ${e.target.name}`))
        : e.target.classList.remove("is-invalid");
    };
    e.onsubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      console.log(form);
      const inp = Object.fromEntries(new FormData(form).entries());
      try {
        if (form.email && form.password) {
          if (
            form.email.value.toLowerCase().match(reg) &&
            form.password.value
          ) {
            fetch(form.action, {
              method: "POST",
              body: JSON.stringify(inp),
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                let emptval = [];
                let val = [];
                if (data.data) {
                  for (let [key, value] of Object.entries(data.data)) {
                    value = value.replace(/[^a-z0-9]/gi, "");
                    console.log(value);
                    value.length >= 30 && val.push(key);
                    !value && emptval.push(key);
                  }
                }
                if (data.success) {
                  window.location.href = data.url;
                } else {
                  let c = data.email;
                  let e = data.err;
                  e &&
                    (e == "notexist"
                      ? [form.password, form.email].forEach((e) =>
                          e.classList.add("is-invalid")
                        )
                      : document
                          .querySelector(`[name=${e}]`)
                          .classList.add("is-invalid"));
                  c &&
                    document
                      .querySelector(`[name=${c}]`)
                      .classList.remove("is-invalid");
                  for (const val of emptval) {
                    document
                      .querySelector(`[name=${val}]`)
                      .classList.add("is-invalid");
                  }
                  for (const v of val) {
                    console.log(v);
                    document
                      .querySelector(`[name=${v}]`)
                      .classList.add("is-invalid");
                  }
                }

                form.name &&
                  (!/^[a-zA-Z]+$/.test(form.name.value)
                    ? form.name.classList.add("is-invalid")
                    : form.name.classList.remove("is-invalid"));
                data.mailexist
                  ? (form.email.classList.add("is-invalid"),
                    (form.email.parentNode.children.feedback.innerText =
                      "this Email is already exist try login "))
                  : data.nameexist &&
                    (form.name.classList.add("is-invalid"),
                    (form.name.parentNode.children.feedback.innerText =
                      "this name is already exist Please use Different name"));
              })
              .catch((err) => console.log(err));
          } else {
            !form.password.value
              ? form.password.classList.add("is-invalid")
              : form.password.classList.remove("is-invalid");
            !form.email.value.toLowerCase().match(reg)
              ? form.email.classList.add("is-invalid")
              : form.email.classList.remove("is-invalid");
            form.name &&
              (!form.name.value
                ? form.name.classList.add("is-invalid")
                : form.name.classList.remove("is-invalid"));
            form.last_name &&
              (!form.last_name.value
                ? form.last_name.classList.add("is-invalid")
                : form.last_name.classList.remove("is-invalid"));
          }
        } else {
          fetch(form.action, {
            method: "POST",
          })
            .then((res) => res.json())
            .then((res) => {
              res.url && (window.location.href = res.url);
            })
            .catch(console.log);
        }
      } catch (e) {
        console.log(e);
      }
    };
  });
  try {
    let file = document.querySelector("input[type=file]");
    let h5 = document.querySelector("#err");
    let img = file.parentNode.children.img;
    console.log("=>", file);
    file.onchange = () => {
      let formData = new FormData();
      console.log(file.files[0]);
      formData.append("image", file.files[0]);
      fetch("/uploads", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          let imgs = URL.createObjectURL(file.files[0]);
          console.log("data: ", data);
          console.log("url==> ", data.url);
          data.err && (h5.innerText = data.err);
          data.url && ((img.src = imgs), (h5.innerText = ""));
        })
        .catch(console.log);
    };
  } catch (e) {
    console.log();
  }
};
