<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{{title}}</title>
</head>
<body>
	{{#each files}}
        <a href="{{../dir}}/{{file}}">[{{type}}]{{file}}</a>
        <br>
    {{/each}}
</body>
</html>