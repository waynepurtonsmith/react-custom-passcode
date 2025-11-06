let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");

//#region src/libs/helpers.ts
const hasValidCharacters = (value, type) => {
	switch (type) {
		case "numeric": return /^[0-9]$/.test(value);
		case "text": return /^[a-zA-Z]$/.test(value);
		case "alphanumeric": return /^[a-zA-Z0-9]$/.test(value);
		default: return true;
	}
};
const removeInvalidCharacters = (value, type) => {
	switch (type) {
		case "numeric": return value.replace(/[^0-9]/g, "");
		case "text": return value.replace(/[^a-zA-Z]/g, "");
		case "alphanumeric": return value.replace(/[^a-zA-Z0-9]/g, "");
		default: return value;
	}
};

//#endregion
//#region src/components/Context.tsx
const PasscodeContext = (0, react.createContext)(void 0);
const PasscodeProvider = ({ totalFields, type, defaultValue, autoFocus, children, onUpdate }) => {
	var _currentPasscode$;
	const [currentPasscode, setCurrentPasscode] = (0, react.useState)(typeof defaultValue === "string" ? removeInvalidCharacters(defaultValue, type).slice(0, totalFields).split("") : []);
	const [currentFocusedIndex, setCurrentFocusedIndex] = (0, react.useState)(autoFocus && !(currentPasscode === null || currentPasscode === void 0 || (_currentPasscode$ = currentPasscode[0]) === null || _currentPasscode$ === void 0 ? void 0 : _currentPasscode$.length) ? 0 : -1);
	const setFieldFocus = (index) => {
		setCurrentFocusedIndex(index);
	};
	const updatePasscode = (code) => {
		const passcode = code.slice(0, totalFields);
		setCurrentPasscode(passcode.split(""));
		onUpdate === null || onUpdate === void 0 || onUpdate(passcode);
	};
	const updatePasscodeByIndex = (index, value) => {
		const newCode = [...currentPasscode];
		newCode[index] = value;
		setCurrentPasscode(newCode);
		onUpdate === null || onUpdate === void 0 || onUpdate(newCode.join(""), index);
	};
	const providerValue = {
		passcode: currentPasscode,
		focusedIndex: currentFocusedIndex,
		setFieldFocus,
		updatePasscode,
		updatePasscodeByIndex
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PasscodeContext.Provider, {
		value: providerValue,
		children
	});
};
const usePasscode = () => {
	const context = (0, react.useContext)(PasscodeContext);
	if (!context) throw new Error("usePasscode must be used within a PasscodeProvider");
	return context;
};

//#endregion
//#region \0@oxc-project+runtime@0.96.0/helpers/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (e.includes(n)) continue;
		t[n] = r[n];
	}
	return t;
}

//#endregion
//#region \0@oxc-project+runtime@0.96.0/helpers/objectWithoutProperties.js
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var s = Object.getOwnPropertySymbols(e);
		for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}

//#endregion
//#region \0@oxc-project+runtime@0.96.0/helpers/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof(o);
}

//#endregion
//#region \0@oxc-project+runtime@0.96.0/helpers/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}

//#endregion
//#region \0@oxc-project+runtime@0.96.0/helpers/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}

//#endregion
//#region \0@oxc-project+runtime@0.96.0/helpers/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}

//#endregion
//#region \0@oxc-project+runtime@0.96.0/helpers/objectSpread2.js
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
			_defineProperty(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}

//#endregion
//#region src/components/Field.tsx
const _excluded = [
	"index",
	"renderer",
	"type",
	"required",
	"fieldType",
	"autoTab"
];
const patternsByType = {
	alphanumeric: "[a-zA-Z0-9]",
	numeric: "[0-9]",
	text: "[a-zA-Z]"
};
const Field = (_ref) => {
	let { index, renderer: Renderer, type, required, fieldType, autoTab } = _ref, props = _objectWithoutProperties(_ref, _excluded);
	const fieldRef = (0, react.useRef)(null);
	const { passcode, focusedIndex, updatePasscode, updatePasscodeByIndex, setFieldFocus } = usePasscode();
	const onKeyDown = (event) => {
		var _passcode$index;
		const { key } = event;
		const isUsingSpecialKeys = event.ctrlKey || event.metaKey || event.altKey;
		if (key === "v" && isUsingSpecialKeys) return;
		const isDeleting = key === "Backspace" || key === "Delete";
		if (!(key === "Tab") && (isDeleting || fieldType && !isUsingSpecialKeys && !hasValidCharacters(key, fieldType))) event.preventDefault();
		if (!isDeleting) return;
		const value = (_passcode$index = passcode[index]) !== null && _passcode$index !== void 0 ? _passcode$index : "";
		if (autoTab !== false && value === "") setFieldFocus(Math.max(0, index - 1));
		if (value !== "") updatePasscodeByIndex(index, "");
	};
	const onChange = (event) => {
		const { target: { value } } = event;
		updatePasscodeByIndex(index, value);
		if (autoTab !== false && value !== "") setFieldFocus(index + 1);
	};
	const onBlur = () => {
		setFieldFocus(-1);
	};
	const onFocus = () => {
		setFieldFocus(index);
	};
	const onPasteCapture = (event) => {
		event.preventDefault();
		const pastedValue = event.clipboardData.getData("text").replace(/\s/g, "");
		if (!fieldType || hasValidCharacters(pastedValue, fieldType)) {
			updatePasscode(pastedValue);
			return;
		}
		updatePasscode(removeInvalidCharacters(pastedValue, fieldType));
	};
	(0, react.useEffect)(() => {
		if (fieldRef.current && focusedIndex === index) {
			var _fieldRef$current;
			(_fieldRef$current = fieldRef.current) === null || _fieldRef$current === void 0 || _fieldRef$current.focus();
		}
	}, [focusedIndex, index]);
	const pattern = fieldType ? patternsByType[fieldType] : void 0;
	const mergedProps = _objectSpread2({
		type: type !== null && type !== void 0 ? type : "text",
		"aria-label": `Passcode field ${index + 1}`,
		ref: fieldRef,
		value: passcode[index] || "",
		required: required !== null && required !== void 0 ? required : true,
		maxLength: 1,
		autoCapitalize: "off",
		autoCorrect: "off",
		autoComplete: "one-time-code",
		spellCheck: false,
		pattern,
		onChange,
		onBlur,
		onKeyDown,
		onFocus,
		onPasteCapture
	}, props);
	if (Renderer) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Renderer, _objectSpread2(_objectSpread2({}, mergedProps), {}, { index }));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", _objectSpread2(_objectSpread2({}, mergedProps), {}, { ref: fieldRef }));
};
var Field_default = Field;

//#endregion
//#region src/components/Passcode.tsx
/**
* Create a passcode input component with multiple fields
* @param fields - The second color, in hexadecimal format
* @param [defaultValue] - The default value to autofill the fields
* @param [name] - The prefix for the name attribute of each field
* @param [id] - The prefix for the id attribute of each field
* @param [renderer] - Custom renderer for each field to give more control over the input appearance
* @param [type] - The type of characters allowed in each field - options are `text`, `numeric`, and `alphanumeric`
* @param [autoFocus] - Whether to autofocus the first field on mount
* @param [autoTab] - Whether to automatically tab to the next field when the current field is filled
* @param [required] - Whether each field is required
* @return The passcode
*/
const Passcode = ({ defaultValue, fields, name, id, renderer, type, autoFocus, autoTab, required, onUpdate }) => {
	const passcodeFields = (0, react.useMemo)(() => {
		if (Array.isArray(fields)) return fields;
		return [...Array(fields)].map((_, index) => ({
			name: typeof name !== "undefined" ? `${name}[${index}]` : `code[${index}]`,
			id: typeof id !== "undefined" ? `${id}-${index}` : `code-${index}`
		}));
	}, [
		fields,
		name,
		id
	]);
	const totalFields = passcodeFields.length;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PasscodeProvider, {
		totalFields,
		type,
		defaultValue,
		autoFocus,
		onUpdate,
		children: passcodeFields.map((field, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react.Fragment, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field_default, _objectSpread2({
			renderer,
			index,
			fieldType: type,
			autoTab,
			required
		}, field)) }, field.id))
	});
};
var Passcode_default = Passcode;

//#endregion
exports.Field = Field_default;
exports.Passcode = Passcode_default;