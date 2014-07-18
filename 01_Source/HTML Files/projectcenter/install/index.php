<?php

//turn on debugging if it's set
if (isset($_GET['debug']) && $_GET['debug'] == 'on') {
    error_reporting(E_ALL);
    ini_set('display_errors', 'On');
}


if (version_compare(PHP_VERSION, '5.3') >= 0) {
    //the user has the correct version

} else {
    //the user does not have the minimum php version
    echo "<body style='background-color:#F7F8FA;'>";
    echo "<div style='text-align:center; font-family:sans-serif; margin:60px auto; max-width:500px;'>";
    echo "<h2>Please upgrade your version of PHP before continuing</h2>";
    echo "<br/><p><strong>Required version</strong>: This application requires PHP 5.3 or greater. <br/>
          <strong>Your current version</strong>: You currently have PHP " . PHP_VERSION . "</p> <br/><br/>";
    echo "<p>You will need to contact your hosting provider to upgrade your version of php.
    This is usually free and very quick. Once you have upgraded, return this installation script to continue with
    the installation. </p>";
    echo "</div></body>";
    exit;
}

require_once('server/wizard.class.php');



$wizard = new Wizard();
$wizard->start();

function pre($data){
    echo '<pre>';
    print_r($data);
    echo '</pre>';
}


