# Confirm Button

This Mendix widget renders a button. It allows you to easily create an optional confirmation workflow. Saves the effort of creating an extra pop-up page and buttons. It also works together with the MobileNativeFeatures - MobileDialog widget so you can show a native mobile confirmation prompt.

When a user clicks the confirm button, a microflow will run to determine whether the user should see a confirmation prompt. If the microflow returns true, the user will get a confirmation prompt with 2 options: ok and cancel. If the user clicks ok, another microflow will run. If the user clicks cancel, the dialog will close.

## Contributing

For more information on contributing to this repository visit [Contributing to a GitHub repository](https://world.mendix.com/display/howto50/Contributing+to+a+GitHub+repository)!

## Typical usage scenario

 - Add this widget as a "back" or "cancel" button to check for changes to the form before proceeding. (e.g., do you want to save your changes?)
 - Add this widget as the "ok" button to check certain thresholds and alert the user if those thresholds are met/exceeded (e.g., This claim is for over $100k, is that correct?)

## Configuration

This widget has the following options that should be configured:
 - Primary Microflow: the microflow that runs when you click on the button. It should return true if you want the confirmation prompt to appear, and false if not.
 - Confirm Microflow: the microflow that should run if the user clicks "OK" from the confirmation prompt
 - Button Text: the text for the confirmation button
 - Button Class: a list CSS classes for the button, for example btn-primary
 - Prompt Text: the text of the confirmation prompt
 - Ok Button Text: the text in the "Ok" button of the confirmation prompt
 - Cancel Button Text: the text in the "Cancel" button of the confirmation prompt

## Screenshots

![Web Confirmation](https://github.com/tieniber/ConfirmButton/blob/master/assets/confirm-mendix.png)

![iOS Confirmation](https://github.com/tieniber/ConfirmButton/blob/master/assets/confirm-iOS.jpg)
