export async function genShortLink() {
    let code = "";
  
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let characLength = characters.length;
  
    for (let i = 0; i < 4; i++) {
      code += characters.charAt(Math.floor(Math.random() * characLength));
    }
  
    return code;
  }