<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{{title}}</title>
</head>
<body>
	{{#each files}}
        <img src="{{icon}}" style="width:20px;vertical-align: middle;">
        <a href="{{../dir}}/{{file}}">{{file}}[{{icon}}]{{../dir}}</a>
        <br>
    {{/each}}
</body>
</html>