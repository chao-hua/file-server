<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{{title}}</title>
</head>
<body>
	{{#each files}}
        <img src="src/img/{{icon}}" style="width:20px;vertical-align: middle;">
        <a href="{{../dir}}/{{file}}">{{file}}[{{iconPath}}]{{../dir}}</a>
        <br>
    {{/each}}
</body>
</html>