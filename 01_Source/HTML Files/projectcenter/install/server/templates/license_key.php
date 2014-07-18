<?php
if (isset($verification_result)) {
    $verification_checked = true;
} else {
    $verification_checked = false;
    $verification_result = false;
}
?>

<!-- Step description -->
<p>When you purchased this application, CodeCanyon supplied you with a purchase code. Please enter the purchase code
    below. You can use these <a href="#">instructions</a> to locate your purchase code.
</p>


<?php if ($verification_result == false): ?>
    <!-- Have we already attempted a verification ? -->
    <?php if ($verification_checked): ?>
        <!-- A purchase code was entered, but it is incorrect -->
        <p class="step-result error">
            Oops. It looks like you entered an invalid purchase code. Please re-enter your purchase code
        </p>
    <?php else: ?>
        <br>
        <br>
    <?php endif; ?>
    <p>
    <form method="post">
        <div class="field"><label></label>
        <input type="text" name="purchase_code" required="required" value="<?php  $this->get_config('purchase_code')?>">
        <a class="purchase-code-image" target="_blank" href="client/images/purchase-code-location.png" target="_blank">Where can I find my purchase code?</a></div>
        <input class="next-step button dark" type="submit" value="Verify Purchase Code">
    </form>
    </p>


<?php else: ?>
    <p class="step-result success">
        Your purchase code has been verified
    </p>

    <a class="next-step button dark" href="<?php $this->next_step_url(); ?>"> Next Step </a>
<?php endif; ?>
