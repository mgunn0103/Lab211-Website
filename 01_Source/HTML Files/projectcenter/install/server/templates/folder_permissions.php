
<p>The installer needs write permissions to a few folders. </p>



<?php if(!isset($permissions_result) || (isset($permissions_result) && $permissions_result == false)): ?>

    <?php if(isset($permissions_result)): ?>

        <?php if($config_folder_result == true): ?>

        <div class="folder-permission-result correct">Config permissions are correct</div>

        <?php else: ?>

        <div class="folder-permission-result incorrect">Config permissions are incorrect</div>

        <?php endif; ?>

        <?php if($file_folder_result == true): ?>

        <div class="folder-permission-result correct">File folder permissions are correct</div>

        <?php else: ?>

        <div class="folder-permission-result incorrect">File folder permissions are incorrect</div>

        <?php endif; ?>

        <?php if($tmp_folder_result == true): ?>

        <div class="folder-permission-result correct">Tmp permissions are correct</div>

        <?php else: ?>

        <div class="folder-permission-result incorrect">Tmp permissions are incorrect</div>

        <?php endif; ?>

    <?php endif; ?>

    <br>

    <table id="file-permissions-descriptions" class="table table-bordered">
        <tr>
            <td>server/config</td>
            <td>The installer will generate a config file that is saved in this folder. It needs write permissions to
            </td>
        </tr>
        <tr>
            <td>server/files-folder</td>
            <td>This is the folder that all project files will be stored in. The application needs write permissions
                for uploads to work.
            </td>
        </tr>

        <tr>
            <td>server/tmp</td>
            <td>This folder holds temporary files generated by the application.
            </td>
        </tr>
    </table>
    <br>

    <p>
        The image below shows the structure of the Duet Project Management application on your server. <strong>You will need to
        change the permissions on the three folders highlighted in blue. Permissions should be set to 777</strong><br>
        <br>
        <img src="client/images/folder-permissions.png" alt="file-permissions">
    </p>


    <form method="post">
        <input type="hidden" name="check_permissions" value="1">
        <input type="submit" class="next-step button dark" value="Check Folder Permissions">
    </form>


<?php else: ?>
    <p class="step-result success">Your folder permissions are correct</p>

    <a class="next-step button dark" href="<?php $this->next_step_url(); ?>">Next Step</a>

<?php endif; ?>