<!DOCTYPE html>

<head>
  <title>Color</title>
</head>

<body />

<script src="https://chir.ag/projects/ntc/ntc.js" type="module" defer />
<script>
   let { color } = new URLSearchParams(location.search);
   !color && (() => color = '#' + Math.floor(Math.random()*16777215).toString(16))();
   var string = ntc.name(color)[1];
   document.title += `: ${string}`;
   document.documentElement.style.background = document.body.style.background = color;
</script>
