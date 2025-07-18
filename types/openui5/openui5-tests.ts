import UI5Event from "sap/ui/base/Event";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import ODataV4Model from "sap/ui/model/odata/v4/ODataModel";
import Table from "sap/m/Table";
import Toolbar from "sap/m/Toolbar";
import Button from "sap/m/Button";
import DatePicker from "sap/m/DatePicker";
import Label from "sap/m/Label";
import Column from "sap/m/Column";
import Dialog from "sap/m/Dialog";
import MessageBox from "sap/m/MessageBox";
import FileUploader, { FileUploader$UploadCompleteEvent } from "sap/ui/unified/FileUploader";
import FileUploaderParameter from "sap/ui/unified/FileUploaderParameter";
import ODataV4ListBinding, { ODataListBinding$CreateCompletedEvent } from "sap/ui/model/odata/v4/ODataListBinding";
import Target from "sap/ui/core/routing/Target";
import { CSSGapShortHand, TitleLevel } from "sap/ui/core/library";
import DateTimePicker from "sap/m/DateTimePicker";
import NumberFormat from "sap/ui/core/format/NumberFormat";
import CalendarUtils from "sap/ui/core/date/CalendarUtils";
import PlanningCalendar from "sap/m/PlanningCalendar";
import WebSocket from "sap/ui/core/ws/WebSocket";
import QUnit from "sap/ui/thirdparty/qunit-2";
import IllustratedMessage from "sap/m/IllustratedMessage";
import { SingleControlSelector } from "sap/ui/test/Opa5";
import Mobile from "sap/ui/util/Mobile";
import Input from "sap/m/Input";
import { ContentConfigType, DynamicDateRangeGroups, ITableItem } from "sap/m/library";
import ColumnListItem from "sap/m/ColumnListItem";
import Filter from "sap/ui/model/Filter";
import Version from "sap/base/util/Version";
import UploadItem from "sap/m/upload/UploadItem";
import DragDropInfo from "sap/ui/core/dnd/DragDropInfo";
import nextUIUpdate from "sap/ui/test/utils/nextUIUpdate";
import Link from "sap/m/Link";
import BaseObject from "sap/ui/base/Object";
import ObjectMarker from "sap/m/ObjectMarker";
import Theming from "sap/ui/core/Theming";
import ColumnAIAction from "sap/m/plugins/ColumnAIAction";
import List from "sap/m/List";

/*
 * REMARK: the type definition files are automatically generated and this generation is tested,
 * so the importance of these tests here is very limited. Hence there is no focus on making them
 * as complete or meaningful as possible.
 */

class Ctrl extends Controller {
    onShowHello(): void {
        // show a native JavaScript alert
        alert("Hello World");
    }

    onInit() {
        // set data model on view
        const oData = {
            recipient: {
                name: "World"
            }
        };
        const oModel = new JSONModel(oData);
        const view = this.getView();
        if (!view) {
            return;
        }

        view.setModel(oModel);

        const dp = new DatePicker({dateValue: "{myModel>/myPropertyName}"});
        dp.setShowCurrentDateButton(true);
    }
}

export class BaseController extends Controller {
    getRouter() {
        return (<UIComponent> this.getOwnerComponent()).getRouter();
    }
    getJSONModel(name: string) {
        const view = this.getView();
        if (!view) {
            return;
        }
        return <JSONModel> view.getModel(name);
    }
    getModel(name: string) {
        const view = this.getView();
        if (!view) {
            return;
        }
        return view.getModel(name);
    }
    suspendDefaultTarget() {
        const router = (<UIComponent> this.getOwnerComponent()).getRouter();
        const target = router.getTarget("default") as Target;
        target.suspend();
    }
}

const oTable = new Table({
    headerToolbar: new Toolbar({
        content: [
            new Button({
                text: "Create user",
                press: () => {
                },
            }),
        ]
    }),
    beforeOpenContextMenu: (oEvent: UI5Event) => {
        const params = oEvent.getParameters();
    }
});

const lbl = new Label(undefined);
lbl.setText('text');
const col = new Column();

type Headers = {
    "x-csrf-token": string
};

const oUploadDialog = new Dialog(undefined);
oUploadDialog.setTitle("Upload photo");
const oDataV2Model = oUploadDialog.getModel() as ODataModel;
oDataV2Model.refreshSecurityToken();
oDataV2Model.bindList("/", undefined, [], [], {createdEntitiesKey: "test"});
// prepare the FileUploader control
const oFileUploader = new FileUploader({
    headerParameters: [
        new FileUploaderParameter({
            name: "x-csrf-token",
            value: (oDataV2Model.getHeaders() as Headers)['x-csrf-token']
        }),
    ],
    uploadComplete: (oEvent: FileUploader$UploadCompleteEvent) => { // 1.115.1: types not only for event parameters, but also for events
        const sResponse = oEvent.getParameter("response"); // 1.115: event objects are now specifically typed
        if (sResponse) {
            oUploadDialog.close();
            MessageBox.show("Return Code: " + sResponse);
        }
    }
});
// create a button to trigger the upload
const oTriggerButton = new Button({
    text: 'Upload',
    press: () => {
        // call the upload method
        oFileUploader.insertHeaderParameter(new FileUploaderParameter({ name: "slug", value: oFileUploader.getValue() }), 0);
        oFileUploader.upload();
    }
});

const dateTimePicker = new DateTimePicker({showCurrentTimeButton: true});
dateTimePicker.setShowCurrentTimeButton(!dateTimePicker.getShowCurrentTimeButton());
oUploadDialog.addContent(oFileUploader);
oUploadDialog.addContent(oTriggerButton);
oUploadDialog.addContent(dateTimePicker);
oUploadDialog.open();

const illustratedMessage: IllustratedMessage = new IllustratedMessage();
illustratedMessage.setAriaTitleLevel(TitleLevel.H1);
const focusable = illustratedMessage.isFocusable();

const odataV4ListBinding = illustratedMessage.getBinding("additionalContent") as ODataV4ListBinding;
const odataV4ListBindingCount = odataV4ListBinding.getCount();
const context = odataV4ListBinding.getKeepAliveContext("x");
const odataV4Model = odataV4ListBinding.getModel() as ODataV4Model;
odataV4Model.delete("something");
let eTagMap: Record<string, string | null>;
eTagMap = odataV4Model.getMetaModel().getETags();
odataV4Model.getKeyPredicate("some/path", {});

const integer = NumberFormat.getIntegerInstance({
    strictGroupingValidation: true
});

const weekConfigurationValues = CalendarUtils.getWeekConfigurationValues();

const pc = new PlanningCalendar();
pc.getSecondaryCalendarType();

const ws = new WebSocket("someUrl");
ws.close("end");

// 1.112: QUnit declared as importable module instead of just globally available
QUnit.config.autostart = false;

// 1.113: OPA improvements
const scs: SingleControlSelector = {
    id: "myControlId"
};

// 1.114: more details in the APIs
Mobile.setIcons({precomposed: false});

// 1.116: sap.ui.require (for use in plain JS) callback function parameters fixed
sap.ui.require(["sap/m/Button", "sap/m/Input"], (B: typeof Button, I: typeof Input) => {
    const b = new B({text: "Hello"});
    const i = new I();
});

// 1.116.1: more event parameters defined
odataV4ListBinding.attachCreateCompleted((evt: ODataListBinding$CreateCompletedEvent) => {
    const contect = evt.getParameter("context");
});

// 1.117.0: it's just an update of the types!

// 1.118
const ddrg: DynamicDateRangeGroups = DynamicDateRangeGroups.SingleDates;

// 1.119
const iti: ITableItem = new ColumnListItem();

// 1.120
const noneFilter = Filter.NONE;

// 1.121: this commit just updates the version in package.json

// 1.122
const cct = ContentConfigType.Link;

// 1.123 mainly comes with comment changes, deprecations etc.

// 1.124
const v: Version = new Version(1); // minor version is only optional since 1.124

// 1.125
const ui = new UploadItem();
ui.getIsTrustedSource();

// 1.126
const drag = new DragDropInfo();
drag.getKeyboardHandling();

// 1.127
nextUIUpdate();

// 1.128
const link = new Link();
link.getEndIcon();

// 1.129
MessageBox.alert("Hello World", { contentWidth: "100px" });

// 1.130
link.hasLabelableHTMLElement();

// 1.131.1
const preventDefault: boolean = oUploadDialog.fireBeforeOpen();

// 1.132
let something: unknown;
if (BaseObject.isObjectA<Dialog>(something, "sap.m.Dialog")) {
    something.open();
}

// 1.133
new ObjectMarker().setReactiveAreaMode("Inline");

// 1.134
const gap: CSSGapShortHand = "1px 2px 3px 4px";

// 1.135
const theming = Theming.setFavicon("favicon.ico");

// 1.136
const caia = new ColumnAIAction();

// 1.138
new List().attachItemActionPress((oEvent) => {
    oEvent.getParameters().listItem;
});