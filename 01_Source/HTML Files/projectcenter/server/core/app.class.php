<?php


class App{
    function load_language(){}

    static function get_config(){}

    static function log($data){
        if(class_exists('ChromePhp')){
            ChromePhp::log($data);
        }
    }
}

