<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
    <script src="http://at.alicdn.com/t/font_1266779_lgsdgi81awo.js"></script>
    <style type="text/css">
        * {
            padding: 0;
            margin: 0;
        }

        body {
            padding: 20px;
        }

        .line {
            font-size: 16px;
            line-height: 2em;
        }

        .icon {
            width: 1.6em;
            height: 1.6em;
            vertical-align: middle;
            fill: currentColor;
            overflow: hidden;
        }
    </style>
</head>

<body>
    {{#each files}}
    <p class="line">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-{{icon}}"></use>
        </svg>
        <a href="{{../dir}}/{{file}}">{{file}}</a>
        <br>
    </p>
    {{/each}}
</body>

</html>