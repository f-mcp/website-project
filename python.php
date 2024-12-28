<?php
// This php file should tell the host to run the python script in app.py
?>
 
$python = shell_exec(python app.py);
echo $python;