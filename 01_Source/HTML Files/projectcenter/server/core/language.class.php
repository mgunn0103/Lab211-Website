<?php


class Language
{
    public $language_code;
    public $language_file;
    private static $instance;

    function __construct(){
        global $CONFIG;

        $this->language_code = $CONFIG['language'];

        $this->language_file =  APP_ROUTE . "/language/$this->language_code/build/all.php";
    }

    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new Language();
        }

        return self::$instance;
    }

    function load_templates($rebuild = false){

        $template_file = APP_ROUTE . "/templates/app/$this->language_code/build/all-templates.html";

        if ($rebuild == true || !file_exists($template_file)) {
            $result = $this->build_templates();

            //if the build fails, then we want to load the default language (english)
            if($result == false){
                AppMessage::set('Unable to build the requested language file');
                $template_file = APP_ROUTE . "/templates/app/en/build/all-templates.html";
            }
        }

        return file_get_contents($template_file);
    }




    function build_templates(){

        global $LANG;

        Model::load_library('mustache.php/src/Mustache/Autoloader');
        Mustache_Autoloader::register();

        $m = new Mustache_Engine();
        $base_template_dir = APP_ROUTE . "/templates/app";

        $template = file_get_contents("$base_template_dir/all-templates.mustache");
        $rendered = $m->render($template, $LANG); // "Hello, world!"

        $template_directory = $base_template_dir . "/$this->language_code/build/";
        $template_name = 'all-templates.html';
        $template_full_path = $template_directory . $template_name;

        if(DEVELOPMENT_ENVIRONMENT == true && file_exists($template_full_path)){
            $versioned_file_name = $this->incrementFileName($template_directory, $template_name);
           rename($template_full_path, $template_directory . $versioned_file_name);
        }

        $build = fopen($template_full_path, 'w');

        if($build){
            fwrite($build, "<script type=\"text/x-templates\">\n\n");
            fwrite($build, '<!-- ' . date('F j, Y, g:i:s a', time()) . " -->\n\n");
            fwrite($build, $rendered);
            fwrite($build, '</script>');
            return true;
        }
        else{
            AppMessage::set('Error building template file');
            return false;
        }
    }

    function incrementFileName($file_path, $filename)
    {
        if (count(glob($file_path . $filename)) > 0) {
            $file_ext = end(explode(".", $filename));
            $file_name = str_replace(('.' . $file_ext), "", $filename);
            $newfilename = $file_name . '_' . count(glob($file_path . "$file_name*.$file_ext")) . '.' . $file_ext;
            return $newfilename;
        } else {
            return $filename;
        }
    }

    static function load(){
        global $CONFIG;

        //when we inldude the language file, we want it to set the global LANG variable
        global $LANG;

        $language_file = APP_ROUTE . "/language/" . $CONFIG['language'] . "/build/all.php";
        if (file_exists($language_file))
            require_once($language_file);
        else {
            AppMessage::set('Requested language file does not exist');
            return false;
        }
    }

    static function get($key, $data = array()){
        global $LANG;

        $key_parts = explode('.', $key);
        $group = $key_parts[0];
        $item = $key_parts[1];

        //get the text if it exists. Retrun the key if it doesn't
        if(isset($LANG[$group][$item])){
            $line = $LANG[$group][$item];
            return Language::make_replacements($line, $data);
        }
        else return $key;
    }

    static function make_replacements($line, $data){

        foreach ($data as $key => $value) {
            $key = Utils::to_camel_case($key);
            $line = preg_replace("/:$key\b/i", $value, $line);
        }

        return $line;
    }


}
 
