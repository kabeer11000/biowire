<?php

use Sunra\PhpSimple\HtmlDomParser;

function WiredDotCom()
{
//    return HtmlDomParser::str_get_html("datasets/view-source_https___www.wired.com.html");
    return HtmlDomParser::file_get_html("datasets/view-source_https___www.wired.com.html");
}
