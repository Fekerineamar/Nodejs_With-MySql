const success = await Promise.resolve(true),
  notsuccess = await Promise.resolve(false),
  email = await Promise.resolve("email"),
  password = await Promise.resolve("password"),
  url = await Promise.resolve("/"),
  regname = /^[a-zA-Z]+$/,
  regemail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let imgname = {
  img: "image_" + Date.now() + ".jpeg",
};
export {
  success,
  notsuccess,
  email,
  password,
  url,
  regemail,
  regname,
  imgname,
};
