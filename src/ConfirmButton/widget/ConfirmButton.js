/*global logger*/
/*
    ConfirmButton
    ========================

    @file      : ConfirmButton.js
    @version   : 
    @author    : Eric Tieniber
    @date      : Thurs, 30 June 2016
    @copyright : 
    @license   : Apache 2

    Documentation
    ========================
    A button widget that runs a microflow, if true then can prompt the user for confirmation, with microflows attached to the OK and cancel buttons.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "dojo/dom-class",
    "dojo/_base/lang",
    "dojo/text!ConfirmButton/widget/template/ConfirmButton.html"
], function (declare, _WidgetBase, _TemplatedMixin, dojoClass, dojoLang, widgetTemplate) {
	"use strict";

	// Declare widget's prototype.
	return declare("ConfirmButton.widget.ConfirmButton", [_WidgetBase, _TemplatedMixin], {
		// _TemplatedMixin will create our dom node using this HTML template.
		templateString: widgetTemplate,

		// DOM elements
		theButton: null,

		// Parameters configured in the Modeler.
		primaryMF: "",
		confirmMF: "",	
		buttonClass: "",
		buttonText: "",

		//Internal variables
		_contextObj: null,
		_listener: null,

		// mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
		update: function (obj, callback) {
			logger.debug(this.id + ".update");

			this._contextObj = obj;
			this._setupEvents();
			this._updateRendering();

			callback();
		},

		// Rerender the interface.
		_updateRendering: function () {
			logger.debug(this.id + "._updateRendering");
			this.theButton.innerHTML = this.buttonText;


			if (this.buttonClass !== "") {
				dojoClass.add(this.theButton, this.buttonClass);
			}
		},

		_setupEvents: function () {
			if (this._listener) {
				this.disconnect(this._listener);
			}
			this._listener = this.connect(this.theButton, "click", this._executePrimaryMicroflow);
		},
		
		_executePrimaryMicroflow: function() {
			this._executeMicroflow(this.primaryMF, false, '', this._primaryCallback);
		},
		
		_primaryCallback: function(returnVal) {
			if (returnVal) {
				mx.ui.confirmation({
					content: this.promptText,
					proceed: this.okText,
					cancel: this.cancelText,
					handler: dojoLang.hitch(this, this._executeConfirmMicroflow),
					handlerCancel: dojoLang.hitch(this, this._cancelPendingTransition)
				});
			} else {
				this._cancelPendingTransition();	
			}
		},
		_executeConfirmMicroflow: function() {
			this._executeMicroflow(this.confirmMF, false, '', function() {});
		},
		
		_cancelPendingTransition: function() {
			if (window.plugins && window.plugins.nativepagetransitions) {
				window.plugins.nativepagetransitions.cancelPendingTransition(
					function (msg) {
						//console.log("success: " + msg)
					} // called when the screenshot was hidden (almost instantly)
				);
			}
		},
		_executeMicroflow: function (mf, isModal, msg, success) {
			var modalString = 'nonmodal';
			if (isModal) {
				modalString = 'modal';
			}
			if (mf) {
				mx.ui.action(mf, {
					progress: modalString,
					progressMsg: msg,
					params: {
						applyto: "selection",
						//actionname: this.mfToExecute,
						guids: [this._contextObj.getGuid()]
					},
					store: {
						caller: this.mxform
					},
					callback: dojoLang.hitch(this, success),
					error: dojoLang.hitch(this, function (error) {
						logger.error(this.id + ": An error occurred while executing microflow: " + error.description);
					})
				}, this);
			}
		}
	});
});

require(["ConfirmButton/widget/ConfirmButton"], function () {
	"use strict";
});