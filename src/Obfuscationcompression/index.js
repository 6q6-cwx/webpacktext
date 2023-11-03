import "./styles.css";
document.addEventListener("DOMContentLoaded", function () {
  var d = document.getElementById("ceshi");
  d.style.color = "red";
});

// 代码压缩混淆 处理变量与注释
console.log("Hello from index.js!");
var a = 7;
console.log(a, "aaaa");
// 这就是a

// 在压缩之后 代码var a会被压缩掉
// 原因
// 在代码混淆的过程中，通常的做法是将不影响代码逻辑的变量名进行压缩，以减小代码体积，提高加载速度
