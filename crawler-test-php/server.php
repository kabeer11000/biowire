<?php
// Require composer autoloader
require __DIR__ . '/vendor/autoload.php';
//require "./scrapers/wired.com.php";

// Create Router instance
$router = new Router();

use Bramus\Router\Router;
use Sunra\PhpSimple\HtmlDomParser;

$router->get('pattern', function () {
    $html = HtmlDomParser::file_get_html("datasets/view-source_https___www.wired.com.html");
//    $html = WiredDotCom();
    $posts = $html->find("ul");
    print_r($posts);


//    foreach($posts as $element) echo $element->class . '<br>';
});
//https://react.geist-ui.dev/en-us/components/card

$router->run();
