<?php if(!class_exists('raintpl')){exit;}?><?php $tpl = new RainTPL;$tpl_dir_temp = self::$tpl_dir;$tpl->assign( $this->var );$tpl->draw( dirname("header") . ( substr("header",-1,1) != "/" ? "/" : "" ) . basename("header") );?>

The following message has been posted on the <?php echo $linked_object_type;?> '<?php echo $linked_object_title;?>'
<br/>
<br/>


<span style="color:#576269; font-style:italic;">
    "<?php echo $message;?>"
</span>


<br/>
<br/>
<a href="<?php echo $linked_object_url;?>">Click here to reply</a>

<?php $tpl = new RainTPL;$tpl_dir_temp = self::$tpl_dir;$tpl->assign( $this->var );$tpl->draw( dirname("footer") . ( substr("footer",-1,1) != "/" ? "/" : "" ) . basename("footer") );?>