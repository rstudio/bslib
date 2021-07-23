(function() {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = function(target) {
    return __defProp(target, "__esModule", { value: true });
  };
  var __commonJS = function(cb, mod) {
    return function __require() {
      return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
  };
  var __reExport = function(target, module, desc) {
    if (module && typeof module === "object" || typeof module === "function")
      for (var keys = __getOwnPropNames(module), i = 0, n = keys.length, key; i < n; i++) {
        key = keys[i];
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: function(k) {
            return module[k];
          }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
      }
    return target;
  };
  var __toModule = function(module) {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: function() {
      return module.default;
    }, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/core-js/internals/global.js
  var require_global = __commonJS({
    "node_modules/core-js/internals/global.js": function(exports, module) {
      var check = function(it) {
        return it && it.Math == Math && it;
      };
      module.exports = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global == "object" && global) || function() {
        return this;
      }() || Function("return this")();
    }
  });

  // node_modules/core-js/internals/fails.js
  var require_fails = __commonJS({
    "node_modules/core-js/internals/fails.js": function(exports, module) {
      module.exports = function(exec) {
        try {
          return !!exec();
        } catch (error) {
          return true;
        }
      };
    }
  });

  // node_modules/core-js/internals/descriptors.js
  var require_descriptors = __commonJS({
    "node_modules/core-js/internals/descriptors.js": function(exports, module) {
      var fails6 = require_fails();
      module.exports = !fails6(function() {
        return Object.defineProperty({}, 1, { get: function() {
          return 7;
        } })[1] != 7;
      });
    }
  });

  // node_modules/core-js/internals/object-property-is-enumerable.js
  var require_object_property_is_enumerable = __commonJS({
    "node_modules/core-js/internals/object-property-is-enumerable.js": function(exports) {
      "use strict";
      var $propertyIsEnumerable2 = {}.propertyIsEnumerable;
      var getOwnPropertyDescriptor3 = Object.getOwnPropertyDescriptor;
      var NASHORN_BUG = getOwnPropertyDescriptor3 && !$propertyIsEnumerable2.call({ 1: 2 }, 1);
      exports.f = NASHORN_BUG ? function propertyIsEnumerable2(V) {
        var descriptor = getOwnPropertyDescriptor3(this, V);
        return !!descriptor && descriptor.enumerable;
      } : $propertyIsEnumerable2;
    }
  });

  // node_modules/core-js/internals/create-property-descriptor.js
  var require_create_property_descriptor = __commonJS({
    "node_modules/core-js/internals/create-property-descriptor.js": function(exports, module) {
      module.exports = function(bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value: value
        };
      };
    }
  });

  // node_modules/core-js/internals/classof-raw.js
  var require_classof_raw = __commonJS({
    "node_modules/core-js/internals/classof-raw.js": function(exports, module) {
      var toString2 = {}.toString;
      module.exports = function(it) {
        return toString2.call(it).slice(8, -1);
      };
    }
  });

  // node_modules/core-js/internals/indexed-object.js
  var require_indexed_object = __commonJS({
    "node_modules/core-js/internals/indexed-object.js": function(exports, module) {
      var fails6 = require_fails();
      var classof = require_classof_raw();
      var split = "".split;
      module.exports = fails6(function() {
        return !Object("z").propertyIsEnumerable(0);
      }) ? function(it) {
        return classof(it) == "String" ? split.call(it, "") : Object(it);
      } : Object;
    }
  });

  // node_modules/core-js/internals/require-object-coercible.js
  var require_require_object_coercible = __commonJS({
    "node_modules/core-js/internals/require-object-coercible.js": function(exports, module) {
      module.exports = function(it) {
        if (it == void 0)
          throw TypeError("Can't call method on " + it);
        return it;
      };
    }
  });

  // node_modules/core-js/internals/to-indexed-object.js
  var require_to_indexed_object = __commonJS({
    "node_modules/core-js/internals/to-indexed-object.js": function(exports, module) {
      var IndexedObject = require_indexed_object();
      var requireObjectCoercible2 = require_require_object_coercible();
      module.exports = function(it) {
        return IndexedObject(requireObjectCoercible2(it));
      };
    }
  });

  // node_modules/core-js/internals/is-object.js
  var require_is_object = __commonJS({
    "node_modules/core-js/internals/is-object.js": function(exports, module) {
      module.exports = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
      };
    }
  });

  // node_modules/core-js/internals/to-primitive.js
  var require_to_primitive = __commonJS({
    "node_modules/core-js/internals/to-primitive.js": function(exports, module) {
      var isObject6 = require_is_object();
      module.exports = function(input, PREFERRED_STRING) {
        if (!isObject6(input))
          return input;
        var fn, val;
        if (PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject6(val = fn.call(input)))
          return val;
        if (typeof (fn = input.valueOf) == "function" && !isObject6(val = fn.call(input)))
          return val;
        if (!PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject6(val = fn.call(input)))
          return val;
        throw TypeError("Can't convert object to primitive value");
      };
    }
  });

  // node_modules/core-js/internals/to-object.js
  var require_to_object = __commonJS({
    "node_modules/core-js/internals/to-object.js": function(exports, module) {
      var requireObjectCoercible2 = require_require_object_coercible();
      module.exports = function(argument) {
        return Object(requireObjectCoercible2(argument));
      };
    }
  });

  // node_modules/core-js/internals/has.js
  var require_has = __commonJS({
    "node_modules/core-js/internals/has.js": function(exports, module) {
      var toObject4 = require_to_object();
      var hasOwnProperty = {}.hasOwnProperty;
      module.exports = Object.hasOwn || function hasOwn(it, key) {
        return hasOwnProperty.call(toObject4(it), key);
      };
    }
  });

  // node_modules/core-js/internals/document-create-element.js
  var require_document_create_element = __commonJS({
    "node_modules/core-js/internals/document-create-element.js": function(exports, module) {
      var global6 = require_global();
      var isObject6 = require_is_object();
      var document2 = global6.document;
      var EXISTS = isObject6(document2) && isObject6(document2.createElement);
      module.exports = function(it) {
        return EXISTS ? document2.createElement(it) : {};
      };
    }
  });

  // node_modules/core-js/internals/ie8-dom-define.js
  var require_ie8_dom_define = __commonJS({
    "node_modules/core-js/internals/ie8-dom-define.js": function(exports, module) {
      var DESCRIPTORS5 = require_descriptors();
      var fails6 = require_fails();
      var createElement = require_document_create_element();
      module.exports = !DESCRIPTORS5 && !fails6(function() {
        return Object.defineProperty(createElement("div"), "a", {
          get: function() {
            return 7;
          }
        }).a != 7;
      });
    }
  });

  // node_modules/core-js/internals/object-get-own-property-descriptor.js
  var require_object_get_own_property_descriptor = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-descriptor.js": function(exports) {
      var DESCRIPTORS5 = require_descriptors();
      var propertyIsEnumerableModule2 = require_object_property_is_enumerable();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      var toIndexedObject3 = require_to_indexed_object();
      var toPrimitive2 = require_to_primitive();
      var has3 = require_has();
      var IE8_DOM_DEFINE = require_ie8_dom_define();
      var $getOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
      exports.f = DESCRIPTORS5 ? $getOwnPropertyDescriptor2 : function getOwnPropertyDescriptor3(O, P) {
        O = toIndexedObject3(O);
        P = toPrimitive2(P, true);
        if (IE8_DOM_DEFINE)
          try {
            return $getOwnPropertyDescriptor2(O, P);
          } catch (error) {
          }
        if (has3(O, P))
          return createPropertyDescriptor2(!propertyIsEnumerableModule2.f.call(O, P), O[P]);
      };
    }
  });

  // node_modules/core-js/internals/an-object.js
  var require_an_object = __commonJS({
    "node_modules/core-js/internals/an-object.js": function(exports, module) {
      var isObject6 = require_is_object();
      module.exports = function(it) {
        if (!isObject6(it)) {
          throw TypeError(String(it) + " is not an object");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/object-define-property.js
  var require_object_define_property = __commonJS({
    "node_modules/core-js/internals/object-define-property.js": function(exports) {
      var DESCRIPTORS5 = require_descriptors();
      var IE8_DOM_DEFINE = require_ie8_dom_define();
      var anObject4 = require_an_object();
      var toPrimitive2 = require_to_primitive();
      var $defineProperty2 = Object.defineProperty;
      exports.f = DESCRIPTORS5 ? $defineProperty2 : function defineProperty4(O, P, Attributes) {
        anObject4(O);
        P = toPrimitive2(P, true);
        anObject4(Attributes);
        if (IE8_DOM_DEFINE)
          try {
            return $defineProperty2(O, P, Attributes);
          } catch (error) {
          }
        if ("get" in Attributes || "set" in Attributes)
          throw TypeError("Accessors not supported");
        if ("value" in Attributes)
          O[P] = Attributes.value;
        return O;
      };
    }
  });

  // node_modules/core-js/internals/create-non-enumerable-property.js
  var require_create_non_enumerable_property = __commonJS({
    "node_modules/core-js/internals/create-non-enumerable-property.js": function(exports, module) {
      var DESCRIPTORS5 = require_descriptors();
      var definePropertyModule2 = require_object_define_property();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      module.exports = DESCRIPTORS5 ? function(object, key, value) {
        return definePropertyModule2.f(object, key, createPropertyDescriptor2(1, value));
      } : function(object, key, value) {
        object[key] = value;
        return object;
      };
    }
  });

  // node_modules/core-js/internals/set-global.js
  var require_set_global = __commonJS({
    "node_modules/core-js/internals/set-global.js": function(exports, module) {
      var global6 = require_global();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      module.exports = function(key, value) {
        try {
          createNonEnumerableProperty4(global6, key, value);
        } catch (error) {
          global6[key] = value;
        }
        return value;
      };
    }
  });

  // node_modules/core-js/internals/shared-store.js
  var require_shared_store = __commonJS({
    "node_modules/core-js/internals/shared-store.js": function(exports, module) {
      var global6 = require_global();
      var setGlobal = require_set_global();
      var SHARED = "__core-js_shared__";
      var store = global6[SHARED] || setGlobal(SHARED, {});
      module.exports = store;
    }
  });

  // node_modules/core-js/internals/inspect-source.js
  var require_inspect_source = __commonJS({
    "node_modules/core-js/internals/inspect-source.js": function(exports, module) {
      var store = require_shared_store();
      var functionToString = Function.toString;
      if (typeof store.inspectSource != "function") {
        store.inspectSource = function(it) {
          return functionToString.call(it);
        };
      }
      module.exports = store.inspectSource;
    }
  });

  // node_modules/core-js/internals/native-weak-map.js
  var require_native_weak_map = __commonJS({
    "node_modules/core-js/internals/native-weak-map.js": function(exports, module) {
      var global6 = require_global();
      var inspectSource = require_inspect_source();
      var WeakMap = global6.WeakMap;
      module.exports = typeof WeakMap === "function" && /native code/.test(inspectSource(WeakMap));
    }
  });

  // node_modules/core-js/internals/is-pure.js
  var require_is_pure = __commonJS({
    "node_modules/core-js/internals/is-pure.js": function(exports, module) {
      module.exports = false;
    }
  });

  // node_modules/core-js/internals/shared.js
  var require_shared = __commonJS({
    "node_modules/core-js/internals/shared.js": function(exports, module) {
      var IS_PURE3 = require_is_pure();
      var store = require_shared_store();
      (module.exports = function(key, value) {
        return store[key] || (store[key] = value !== void 0 ? value : {});
      })("versions", []).push({
        version: "3.15.2",
        mode: IS_PURE3 ? "pure" : "global",
        copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)"
      });
    }
  });

  // node_modules/core-js/internals/uid.js
  var require_uid = __commonJS({
    "node_modules/core-js/internals/uid.js": function(exports, module) {
      var id = 0;
      var postfix = Math.random();
      module.exports = function(key) {
        return "Symbol(" + String(key === void 0 ? "" : key) + ")_" + (++id + postfix).toString(36);
      };
    }
  });

  // node_modules/core-js/internals/shared-key.js
  var require_shared_key = __commonJS({
    "node_modules/core-js/internals/shared-key.js": function(exports, module) {
      var shared2 = require_shared();
      var uid2 = require_uid();
      var keys = shared2("keys");
      module.exports = function(key) {
        return keys[key] || (keys[key] = uid2(key));
      };
    }
  });

  // node_modules/core-js/internals/hidden-keys.js
  var require_hidden_keys = __commonJS({
    "node_modules/core-js/internals/hidden-keys.js": function(exports, module) {
      module.exports = {};
    }
  });

  // node_modules/core-js/internals/internal-state.js
  var require_internal_state = __commonJS({
    "node_modules/core-js/internals/internal-state.js": function(exports, module) {
      var NATIVE_WEAK_MAP = require_native_weak_map();
      var global6 = require_global();
      var isObject6 = require_is_object();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var objectHas = require_has();
      var shared2 = require_shared_store();
      var sharedKey2 = require_shared_key();
      var hiddenKeys2 = require_hidden_keys();
      var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
      var WeakMap = global6.WeakMap;
      var set;
      var get;
      var has3;
      var enforce = function(it) {
        return has3(it) ? get(it) : set(it, {});
      };
      var getterFor = function(TYPE) {
        return function(it) {
          var state;
          if (!isObject6(it) || (state = get(it)).type !== TYPE) {
            throw TypeError("Incompatible receiver, " + TYPE + " required");
          }
          return state;
        };
      };
      if (NATIVE_WEAK_MAP || shared2.state) {
        store = shared2.state || (shared2.state = new WeakMap());
        wmget = store.get;
        wmhas = store.has;
        wmset = store.set;
        set = function(it, metadata) {
          if (wmhas.call(store, it))
            throw new TypeError(OBJECT_ALREADY_INITIALIZED);
          metadata.facade = it;
          wmset.call(store, it, metadata);
          return metadata;
        };
        get = function(it) {
          return wmget.call(store, it) || {};
        };
        has3 = function(it) {
          return wmhas.call(store, it);
        };
      } else {
        STATE = sharedKey2("state");
        hiddenKeys2[STATE] = true;
        set = function(it, metadata) {
          if (objectHas(it, STATE))
            throw new TypeError(OBJECT_ALREADY_INITIALIZED);
          metadata.facade = it;
          createNonEnumerableProperty4(it, STATE, metadata);
          return metadata;
        };
        get = function(it) {
          return objectHas(it, STATE) ? it[STATE] : {};
        };
        has3 = function(it) {
          return objectHas(it, STATE);
        };
      }
      var store;
      var wmget;
      var wmhas;
      var wmset;
      var STATE;
      module.exports = {
        set: set,
        get: get,
        has: has3,
        enforce: enforce,
        getterFor: getterFor
      };
    }
  });

  // node_modules/core-js/internals/redefine.js
  var require_redefine = __commonJS({
    "node_modules/core-js/internals/redefine.js": function(exports, module) {
      var global6 = require_global();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var has3 = require_has();
      var setGlobal = require_set_global();
      var inspectSource = require_inspect_source();
      var InternalStateModule3 = require_internal_state();
      var getInternalState3 = InternalStateModule3.get;
      var enforceInternalState = InternalStateModule3.enforce;
      var TEMPLATE = String(String).split("String");
      (module.exports = function(O, key, value, options) {
        var unsafe = options ? !!options.unsafe : false;
        var simple = options ? !!options.enumerable : false;
        var noTargetGet = options ? !!options.noTargetGet : false;
        var state;
        if (typeof value == "function") {
          if (typeof key == "string" && !has3(value, "name")) {
            createNonEnumerableProperty4(value, "name", key);
          }
          state = enforceInternalState(value);
          if (!state.source) {
            state.source = TEMPLATE.join(typeof key == "string" ? key : "");
          }
        }
        if (O === global6) {
          if (simple)
            O[key] = value;
          else
            setGlobal(key, value);
          return;
        } else if (!unsafe) {
          delete O[key];
        } else if (!noTargetGet && O[key]) {
          simple = true;
        }
        if (simple)
          O[key] = value;
        else
          createNonEnumerableProperty4(O, key, value);
      })(Function.prototype, "toString", function toString2() {
        return typeof this == "function" && getInternalState3(this).source || inspectSource(this);
      });
    }
  });

  // node_modules/core-js/internals/path.js
  var require_path = __commonJS({
    "node_modules/core-js/internals/path.js": function(exports, module) {
      var global6 = require_global();
      module.exports = global6;
    }
  });

  // node_modules/core-js/internals/get-built-in.js
  var require_get_built_in = __commonJS({
    "node_modules/core-js/internals/get-built-in.js": function(exports, module) {
      var path = require_path();
      var global6 = require_global();
      var aFunction2 = function(variable) {
        return typeof variable == "function" ? variable : void 0;
      };
      module.exports = function(namespace, method) {
        return arguments.length < 2 ? aFunction2(path[namespace]) || aFunction2(global6[namespace]) : path[namespace] && path[namespace][method] || global6[namespace] && global6[namespace][method];
      };
    }
  });

  // node_modules/core-js/internals/to-integer.js
  var require_to_integer = __commonJS({
    "node_modules/core-js/internals/to-integer.js": function(exports, module) {
      var ceil = Math.ceil;
      var floor = Math.floor;
      module.exports = function(argument) {
        return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
      };
    }
  });

  // node_modules/core-js/internals/to-length.js
  var require_to_length = __commonJS({
    "node_modules/core-js/internals/to-length.js": function(exports, module) {
      var toInteger = require_to_integer();
      var min2 = Math.min;
      module.exports = function(argument) {
        return argument > 0 ? min2(toInteger(argument), 9007199254740991) : 0;
      };
    }
  });

  // node_modules/core-js/internals/to-absolute-index.js
  var require_to_absolute_index = __commonJS({
    "node_modules/core-js/internals/to-absolute-index.js": function(exports, module) {
      var toInteger = require_to_integer();
      var max2 = Math.max;
      var min2 = Math.min;
      module.exports = function(index, length) {
        var integer = toInteger(index);
        return integer < 0 ? max2(integer + length, 0) : min2(integer, length);
      };
    }
  });

  // node_modules/core-js/internals/array-includes.js
  var require_array_includes = __commonJS({
    "node_modules/core-js/internals/array-includes.js": function(exports, module) {
      var toIndexedObject3 = require_to_indexed_object();
      var toLength4 = require_to_length();
      var toAbsoluteIndex2 = require_to_absolute_index();
      var createMethod = function(IS_INCLUDES) {
        return function($this, el, fromIndex) {
          var O = toIndexedObject3($this);
          var length = toLength4(O.length);
          var index = toAbsoluteIndex2(fromIndex, length);
          var value;
          if (IS_INCLUDES && el != el)
            while (length > index) {
              value = O[index++];
              if (value != value)
                return true;
            }
          else
            for (; length > index; index++) {
              if ((IS_INCLUDES || index in O) && O[index] === el)
                return IS_INCLUDES || index || 0;
            }
          return !IS_INCLUDES && -1;
        };
      };
      module.exports = {
        includes: createMethod(true),
        indexOf: createMethod(false)
      };
    }
  });

  // node_modules/core-js/internals/object-keys-internal.js
  var require_object_keys_internal = __commonJS({
    "node_modules/core-js/internals/object-keys-internal.js": function(exports, module) {
      var has3 = require_has();
      var toIndexedObject3 = require_to_indexed_object();
      var indexOf2 = require_array_includes().indexOf;
      var hiddenKeys2 = require_hidden_keys();
      module.exports = function(object, names) {
        var O = toIndexedObject3(object);
        var i = 0;
        var result = [];
        var key;
        for (key in O)
          !has3(hiddenKeys2, key) && has3(O, key) && result.push(key);
        while (names.length > i)
          if (has3(O, key = names[i++])) {
            ~indexOf2(result, key) || result.push(key);
          }
        return result;
      };
    }
  });

  // node_modules/core-js/internals/enum-bug-keys.js
  var require_enum_bug_keys = __commonJS({
    "node_modules/core-js/internals/enum-bug-keys.js": function(exports, module) {
      module.exports = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf"
      ];
    }
  });

  // node_modules/core-js/internals/object-get-own-property-names.js
  var require_object_get_own_property_names = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-names.js": function(exports) {
      var internalObjectKeys = require_object_keys_internal();
      var enumBugKeys = require_enum_bug_keys();
      var hiddenKeys2 = enumBugKeys.concat("length", "prototype");
      exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames2(O) {
        return internalObjectKeys(O, hiddenKeys2);
      };
    }
  });

  // node_modules/core-js/internals/object-get-own-property-symbols.js
  var require_object_get_own_property_symbols = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-symbols.js": function(exports) {
      exports.f = Object.getOwnPropertySymbols;
    }
  });

  // node_modules/core-js/internals/own-keys.js
  var require_own_keys = __commonJS({
    "node_modules/core-js/internals/own-keys.js": function(exports, module) {
      var getBuiltIn3 = require_get_built_in();
      var getOwnPropertyNamesModule2 = require_object_get_own_property_names();
      var getOwnPropertySymbolsModule2 = require_object_get_own_property_symbols();
      var anObject4 = require_an_object();
      module.exports = getBuiltIn3("Reflect", "ownKeys") || function ownKeys(it) {
        var keys = getOwnPropertyNamesModule2.f(anObject4(it));
        var getOwnPropertySymbols3 = getOwnPropertySymbolsModule2.f;
        return getOwnPropertySymbols3 ? keys.concat(getOwnPropertySymbols3(it)) : keys;
      };
    }
  });

  // node_modules/core-js/internals/copy-constructor-properties.js
  var require_copy_constructor_properties = __commonJS({
    "node_modules/core-js/internals/copy-constructor-properties.js": function(exports, module) {
      var has3 = require_has();
      var ownKeys = require_own_keys();
      var getOwnPropertyDescriptorModule2 = require_object_get_own_property_descriptor();
      var definePropertyModule2 = require_object_define_property();
      module.exports = function(target, source) {
        var keys = ownKeys(source);
        var defineProperty4 = definePropertyModule2.f;
        var getOwnPropertyDescriptor3 = getOwnPropertyDescriptorModule2.f;
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (!has3(target, key))
            defineProperty4(target, key, getOwnPropertyDescriptor3(source, key));
        }
      };
    }
  });

  // node_modules/core-js/internals/is-forced.js
  var require_is_forced = __commonJS({
    "node_modules/core-js/internals/is-forced.js": function(exports, module) {
      var fails6 = require_fails();
      var replacement = /#|\.prototype\./;
      var isForced = function(feature, detection) {
        var value = data[normalize(feature)];
        return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails6(detection) : !!detection;
      };
      var normalize = isForced.normalize = function(string) {
        return String(string).replace(replacement, ".").toLowerCase();
      };
      var data = isForced.data = {};
      var NATIVE = isForced.NATIVE = "N";
      var POLYFILL = isForced.POLYFILL = "P";
      module.exports = isForced;
    }
  });

  // node_modules/core-js/internals/export.js
  var require_export = __commonJS({
    "node_modules/core-js/internals/export.js": function(exports, module) {
      var global6 = require_global();
      var getOwnPropertyDescriptor3 = require_object_get_own_property_descriptor().f;
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var redefine5 = require_redefine();
      var setGlobal = require_set_global();
      var copyConstructorProperties2 = require_copy_constructor_properties();
      var isForced = require_is_forced();
      module.exports = function(options, source) {
        var TARGET = options.target;
        var GLOBAL = options.global;
        var STATIC = options.stat;
        var FORCED3, target, key, targetProperty, sourceProperty, descriptor;
        if (GLOBAL) {
          target = global6;
        } else if (STATIC) {
          target = global6[TARGET] || setGlobal(TARGET, {});
        } else {
          target = (global6[TARGET] || {}).prototype;
        }
        if (target)
          for (key in source) {
            sourceProperty = source[key];
            if (options.noTargetGet) {
              descriptor = getOwnPropertyDescriptor3(target, key);
              targetProperty = descriptor && descriptor.value;
            } else
              targetProperty = target[key];
            FORCED3 = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
            if (!FORCED3 && targetProperty !== void 0) {
              if (typeof sourceProperty === typeof targetProperty)
                continue;
              copyConstructorProperties2(sourceProperty, targetProperty);
            }
            if (options.sham || targetProperty && targetProperty.sham) {
              createNonEnumerableProperty4(sourceProperty, "sham", true);
            }
            redefine5(target, key, sourceProperty, options);
          }
      };
    }
  });

  // node_modules/core-js/internals/a-possible-prototype.js
  var require_a_possible_prototype = __commonJS({
    "node_modules/core-js/internals/a-possible-prototype.js": function(exports, module) {
      var isObject6 = require_is_object();
      module.exports = function(it) {
        if (!isObject6(it) && it !== null) {
          throw TypeError("Can't set " + String(it) + " as a prototype");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/object-set-prototype-of.js
  var require_object_set_prototype_of = __commonJS({
    "node_modules/core-js/internals/object-set-prototype-of.js": function(exports, module) {
      var anObject4 = require_an_object();
      var aPossiblePrototype = require_a_possible_prototype();
      module.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var CORRECT_SETTER = false;
        var test = {};
        var setter;
        try {
          setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set;
          setter.call(test, []);
          CORRECT_SETTER = test instanceof Array;
        } catch (error) {
        }
        return function setPrototypeOf2(O, proto) {
          anObject4(O);
          aPossiblePrototype(proto);
          if (CORRECT_SETTER)
            setter.call(O, proto);
          else
            O.__proto__ = proto;
          return O;
        };
      }() : void 0);
    }
  });

  // node_modules/core-js/internals/correct-prototype-getter.js
  var require_correct_prototype_getter = __commonJS({
    "node_modules/core-js/internals/correct-prototype-getter.js": function(exports, module) {
      var fails6 = require_fails();
      module.exports = !fails6(function() {
        function F() {
        }
        F.prototype.constructor = null;
        return Object.getPrototypeOf(new F()) !== F.prototype;
      });
    }
  });

  // node_modules/core-js/internals/object-get-prototype-of.js
  var require_object_get_prototype_of = __commonJS({
    "node_modules/core-js/internals/object-get-prototype-of.js": function(exports, module) {
      var has3 = require_has();
      var toObject4 = require_to_object();
      var sharedKey2 = require_shared_key();
      var CORRECT_PROTOTYPE_GETTER2 = require_correct_prototype_getter();
      var IE_PROTO = sharedKey2("IE_PROTO");
      var ObjectPrototype2 = Object.prototype;
      module.exports = CORRECT_PROTOTYPE_GETTER2 ? Object.getPrototypeOf : function(O) {
        O = toObject4(O);
        if (has3(O, IE_PROTO))
          return O[IE_PROTO];
        if (typeof O.constructor == "function" && O instanceof O.constructor) {
          return O.constructor.prototype;
        }
        return O instanceof Object ? ObjectPrototype2 : null;
      };
    }
  });

  // node_modules/core-js/internals/array-method-is-strict.js
  var require_array_method_is_strict = __commonJS({
    "node_modules/core-js/internals/array-method-is-strict.js": function(exports, module) {
      "use strict";
      var fails6 = require_fails();
      module.exports = function(METHOD_NAME, argument) {
        var method = [][METHOD_NAME];
        return !!method && fails6(function() {
          method.call(null, argument || function() {
            throw 1;
          }, 1);
        });
      };
    }
  });

  // node_modules/core-js/internals/engine-user-agent.js
  var require_engine_user_agent = __commonJS({
    "node_modules/core-js/internals/engine-user-agent.js": function(exports, module) {
      var getBuiltIn3 = require_get_built_in();
      module.exports = getBuiltIn3("navigator", "userAgent") || "";
    }
  });

  // node_modules/core-js/internals/engine-v8-version.js
  var require_engine_v8_version = __commonJS({
    "node_modules/core-js/internals/engine-v8-version.js": function(exports, module) {
      var global6 = require_global();
      var userAgent = require_engine_user_agent();
      var process = global6.process;
      var versions = process && process.versions;
      var v8 = versions && versions.v8;
      var match;
      var version;
      if (v8) {
        match = v8.split(".");
        version = match[0] < 4 ? 1 : match[0] + match[1];
      } else if (userAgent) {
        match = userAgent.match(/Edge\/(\d+)/);
        if (!match || match[1] >= 74) {
          match = userAgent.match(/Chrome\/(\d+)/);
          if (match)
            version = match[1];
        }
      }
      module.exports = version && +version;
    }
  });

  // node_modules/core-js/internals/native-symbol.js
  var require_native_symbol = __commonJS({
    "node_modules/core-js/internals/native-symbol.js": function(exports, module) {
      var V8_VERSION2 = require_engine_v8_version();
      var fails6 = require_fails();
      module.exports = !!Object.getOwnPropertySymbols && !fails6(function() {
        var symbol = Symbol();
        return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION2 && V8_VERSION2 < 41;
      });
    }
  });

  // node_modules/core-js/internals/use-symbol-as-uid.js
  var require_use_symbol_as_uid = __commonJS({
    "node_modules/core-js/internals/use-symbol-as-uid.js": function(exports, module) {
      var NATIVE_SYMBOL2 = require_native_symbol();
      module.exports = NATIVE_SYMBOL2 && !Symbol.sham && typeof Symbol.iterator == "symbol";
    }
  });

  // node_modules/core-js/internals/well-known-symbol.js
  var require_well_known_symbol = __commonJS({
    "node_modules/core-js/internals/well-known-symbol.js": function(exports, module) {
      var global6 = require_global();
      var shared2 = require_shared();
      var has3 = require_has();
      var uid2 = require_uid();
      var NATIVE_SYMBOL2 = require_native_symbol();
      var USE_SYMBOL_AS_UID2 = require_use_symbol_as_uid();
      var WellKnownSymbolsStore2 = shared2("wks");
      var Symbol2 = global6.Symbol;
      var createWellKnownSymbol = USE_SYMBOL_AS_UID2 ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid2;
      module.exports = function(name2) {
        if (!has3(WellKnownSymbolsStore2, name2) || !(NATIVE_SYMBOL2 || typeof WellKnownSymbolsStore2[name2] == "string")) {
          if (NATIVE_SYMBOL2 && has3(Symbol2, name2)) {
            WellKnownSymbolsStore2[name2] = Symbol2[name2];
          } else {
            WellKnownSymbolsStore2[name2] = createWellKnownSymbol("Symbol." + name2);
          }
        }
        return WellKnownSymbolsStore2[name2];
      };
    }
  });

  // node_modules/core-js/internals/to-string-tag-support.js
  var require_to_string_tag_support = __commonJS({
    "node_modules/core-js/internals/to-string-tag-support.js": function(exports, module) {
      var wellKnownSymbol5 = require_well_known_symbol();
      var TO_STRING_TAG2 = wellKnownSymbol5("toStringTag");
      var test = {};
      test[TO_STRING_TAG2] = "z";
      module.exports = String(test) === "[object z]";
    }
  });

  // node_modules/core-js/internals/classof.js
  var require_classof = __commonJS({
    "node_modules/core-js/internals/classof.js": function(exports, module) {
      var TO_STRING_TAG_SUPPORT2 = require_to_string_tag_support();
      var classofRaw = require_classof_raw();
      var wellKnownSymbol5 = require_well_known_symbol();
      var TO_STRING_TAG2 = wellKnownSymbol5("toStringTag");
      var CORRECT_ARGUMENTS = classofRaw(function() {
        return arguments;
      }()) == "Arguments";
      var tryGet = function(it, key) {
        try {
          return it[key];
        } catch (error) {
        }
      };
      module.exports = TO_STRING_TAG_SUPPORT2 ? classofRaw : function(it) {
        var O, tag2, result;
        return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag2 = tryGet(O = Object(it), TO_STRING_TAG2)) == "string" ? tag2 : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : result;
      };
    }
  });

  // node_modules/core-js/internals/object-to-string.js
  var require_object_to_string = __commonJS({
    "node_modules/core-js/internals/object-to-string.js": function(exports, module) {
      "use strict";
      var TO_STRING_TAG_SUPPORT2 = require_to_string_tag_support();
      var classof = require_classof();
      module.exports = TO_STRING_TAG_SUPPORT2 ? {}.toString : function toString2() {
        return "[object " + classof(this) + "]";
      };
    }
  });

  // node_modules/core-js/internals/regexp-flags.js
  var require_regexp_flags = __commonJS({
    "node_modules/core-js/internals/regexp-flags.js": function(exports, module) {
      "use strict";
      var anObject4 = require_an_object();
      module.exports = function() {
        var that = anObject4(this);
        var result = "";
        if (that.global)
          result += "g";
        if (that.ignoreCase)
          result += "i";
        if (that.multiline)
          result += "m";
        if (that.dotAll)
          result += "s";
        if (that.unicode)
          result += "u";
        if (that.sticky)
          result += "y";
        return result;
      };
    }
  });

  // node_modules/core-js/internals/a-function.js
  var require_a_function = __commonJS({
    "node_modules/core-js/internals/a-function.js": function(exports, module) {
      module.exports = function(it) {
        if (typeof it != "function") {
          throw TypeError(String(it) + " is not a function");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/object-keys.js
  var require_object_keys = __commonJS({
    "node_modules/core-js/internals/object-keys.js": function(exports, module) {
      var internalObjectKeys = require_object_keys_internal();
      var enumBugKeys = require_enum_bug_keys();
      module.exports = Object.keys || function keys(O) {
        return internalObjectKeys(O, enumBugKeys);
      };
    }
  });

  // node_modules/core-js/internals/object-define-properties.js
  var require_object_define_properties = __commonJS({
    "node_modules/core-js/internals/object-define-properties.js": function(exports, module) {
      var DESCRIPTORS5 = require_descriptors();
      var definePropertyModule2 = require_object_define_property();
      var anObject4 = require_an_object();
      var objectKeys2 = require_object_keys();
      module.exports = DESCRIPTORS5 ? Object.defineProperties : function defineProperties2(O, Properties) {
        anObject4(O);
        var keys = objectKeys2(Properties);
        var length = keys.length;
        var index = 0;
        var key;
        while (length > index)
          definePropertyModule2.f(O, key = keys[index++], Properties[key]);
        return O;
      };
    }
  });

  // node_modules/core-js/internals/html.js
  var require_html = __commonJS({
    "node_modules/core-js/internals/html.js": function(exports, module) {
      var getBuiltIn3 = require_get_built_in();
      module.exports = getBuiltIn3("document", "documentElement");
    }
  });

  // node_modules/core-js/internals/object-create.js
  var require_object_create = __commonJS({
    "node_modules/core-js/internals/object-create.js": function(exports, module) {
      var anObject4 = require_an_object();
      var defineProperties2 = require_object_define_properties();
      var enumBugKeys = require_enum_bug_keys();
      var hiddenKeys2 = require_hidden_keys();
      var html = require_html();
      var documentCreateElement = require_document_create_element();
      var sharedKey2 = require_shared_key();
      var GT = ">";
      var LT = "<";
      var PROTOTYPE2 = "prototype";
      var SCRIPT = "script";
      var IE_PROTO = sharedKey2("IE_PROTO");
      var EmptyConstructor = function() {
      };
      var scriptTag = function(content) {
        return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
      };
      var NullProtoObjectViaActiveX = function(activeXDocument2) {
        activeXDocument2.write(scriptTag(""));
        activeXDocument2.close();
        var temp = activeXDocument2.parentWindow.Object;
        activeXDocument2 = null;
        return temp;
      };
      var NullProtoObjectViaIFrame = function() {
        var iframe = documentCreateElement("iframe");
        var JS = "java" + SCRIPT + ":";
        var iframeDocument;
        iframe.style.display = "none";
        html.appendChild(iframe);
        iframe.src = String(JS);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(scriptTag("document.F=Object"));
        iframeDocument.close();
        return iframeDocument.F;
      };
      var activeXDocument;
      var NullProtoObject = function() {
        try {
          activeXDocument = document.domain && new ActiveXObject("htmlfile");
        } catch (error) {
        }
        NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
        var length = enumBugKeys.length;
        while (length--)
          delete NullProtoObject[PROTOTYPE2][enumBugKeys[length]];
        return NullProtoObject();
      };
      hiddenKeys2[IE_PROTO] = true;
      module.exports = Object.create || function create4(O, Properties) {
        var result;
        if (O !== null) {
          EmptyConstructor[PROTOTYPE2] = anObject4(O);
          result = new EmptyConstructor();
          EmptyConstructor[PROTOTYPE2] = null;
          result[IE_PROTO] = O;
        } else
          result = NullProtoObject();
        return Properties === void 0 ? result : defineProperties2(result, Properties);
      };
    }
  });

  // node_modules/core-js/internals/function-bind.js
  var require_function_bind = __commonJS({
    "node_modules/core-js/internals/function-bind.js": function(exports, module) {
      "use strict";
      var aFunction2 = require_a_function();
      var isObject6 = require_is_object();
      var slice2 = [].slice;
      var factories = {};
      var construct2 = function(C, argsLength, args) {
        if (!(argsLength in factories)) {
          for (var list = [], i = 0; i < argsLength; i++)
            list[i] = "a[" + i + "]";
          factories[argsLength] = Function("C,a", "return new C(" + list.join(",") + ")");
        }
        return factories[argsLength](C, args);
      };
      module.exports = Function.bind || function bind3(that) {
        var fn = aFunction2(this);
        var partArgs = slice2.call(arguments, 1);
        var boundFunction = function bound() {
          var args = partArgs.concat(slice2.call(arguments));
          return this instanceof boundFunction ? construct2(fn, args.length, args) : fn.apply(that, args);
        };
        if (isObject6(fn.prototype))
          boundFunction.prototype = fn.prototype;
        return boundFunction;
      };
    }
  });

  // node_modules/core-js/internals/add-to-unscopables.js
  var require_add_to_unscopables = __commonJS({
    "node_modules/core-js/internals/add-to-unscopables.js": function(exports, module) {
      var wellKnownSymbol5 = require_well_known_symbol();
      var create4 = require_object_create();
      var definePropertyModule2 = require_object_define_property();
      var UNSCOPABLES = wellKnownSymbol5("unscopables");
      var ArrayPrototype = Array.prototype;
      if (ArrayPrototype[UNSCOPABLES] == void 0) {
        definePropertyModule2.f(ArrayPrototype, UNSCOPABLES, {
          configurable: true,
          value: create4(null)
        });
      }
      module.exports = function(key) {
        ArrayPrototype[UNSCOPABLES][key] = true;
      };
    }
  });

  // node_modules/core-js/internals/iterators.js
  var require_iterators = __commonJS({
    "node_modules/core-js/internals/iterators.js": function(exports, module) {
      module.exports = {};
    }
  });

  // node_modules/core-js/internals/iterators-core.js
  var require_iterators_core = __commonJS({
    "node_modules/core-js/internals/iterators-core.js": function(exports, module) {
      "use strict";
      var fails6 = require_fails();
      var getPrototypeOf2 = require_object_get_prototype_of();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var has3 = require_has();
      var wellKnownSymbol5 = require_well_known_symbol();
      var IS_PURE3 = require_is_pure();
      var ITERATOR2 = wellKnownSymbol5("iterator");
      var BUGGY_SAFARI_ITERATORS = false;
      var returnThis = function() {
        return this;
      };
      var IteratorPrototype;
      var PrototypeOfArrayIteratorPrototype;
      var arrayIterator;
      if ([].keys) {
        arrayIterator = [].keys();
        if (!("next" in arrayIterator))
          BUGGY_SAFARI_ITERATORS = true;
        else {
          PrototypeOfArrayIteratorPrototype = getPrototypeOf2(getPrototypeOf2(arrayIterator));
          if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
            IteratorPrototype = PrototypeOfArrayIteratorPrototype;
        }
      }
      var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == void 0 || fails6(function() {
        var test = {};
        return IteratorPrototype[ITERATOR2].call(test) !== test;
      });
      if (NEW_ITERATOR_PROTOTYPE)
        IteratorPrototype = {};
      if ((!IS_PURE3 || NEW_ITERATOR_PROTOTYPE) && !has3(IteratorPrototype, ITERATOR2)) {
        createNonEnumerableProperty4(IteratorPrototype, ITERATOR2, returnThis);
      }
      module.exports = {
        IteratorPrototype: IteratorPrototype,
        BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
      };
    }
  });

  // node_modules/core-js/internals/set-to-string-tag.js
  var require_set_to_string_tag = __commonJS({
    "node_modules/core-js/internals/set-to-string-tag.js": function(exports, module) {
      var defineProperty4 = require_object_define_property().f;
      var has3 = require_has();
      var wellKnownSymbol5 = require_well_known_symbol();
      var TO_STRING_TAG2 = wellKnownSymbol5("toStringTag");
      module.exports = function(it, TAG, STATIC) {
        if (it && !has3(it = STATIC ? it : it.prototype, TO_STRING_TAG2)) {
          defineProperty4(it, TO_STRING_TAG2, { configurable: true, value: TAG });
        }
      };
    }
  });

  // node_modules/core-js/internals/create-iterator-constructor.js
  var require_create_iterator_constructor = __commonJS({
    "node_modules/core-js/internals/create-iterator-constructor.js": function(exports, module) {
      "use strict";
      var IteratorPrototype = require_iterators_core().IteratorPrototype;
      var create4 = require_object_create();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      var setToStringTag2 = require_set_to_string_tag();
      var Iterators = require_iterators();
      var returnThis = function() {
        return this;
      };
      module.exports = function(IteratorConstructor, NAME2, next2) {
        var TO_STRING_TAG2 = NAME2 + " Iterator";
        IteratorConstructor.prototype = create4(IteratorPrototype, { next: createPropertyDescriptor2(1, next2) });
        setToStringTag2(IteratorConstructor, TO_STRING_TAG2, false, true);
        Iterators[TO_STRING_TAG2] = returnThis;
        return IteratorConstructor;
      };
    }
  });

  // node_modules/core-js/internals/define-iterator.js
  var require_define_iterator = __commonJS({
    "node_modules/core-js/internals/define-iterator.js": function(exports, module) {
      "use strict";
      var $16 = require_export();
      var createIteratorConstructor = require_create_iterator_constructor();
      var getPrototypeOf2 = require_object_get_prototype_of();
      var setPrototypeOf2 = require_object_set_prototype_of();
      var setToStringTag2 = require_set_to_string_tag();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var redefine5 = require_redefine();
      var wellKnownSymbol5 = require_well_known_symbol();
      var IS_PURE3 = require_is_pure();
      var Iterators = require_iterators();
      var IteratorsCore = require_iterators_core();
      var IteratorPrototype = IteratorsCore.IteratorPrototype;
      var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
      var ITERATOR2 = wellKnownSymbol5("iterator");
      var KEYS = "keys";
      var VALUES = "values";
      var ENTRIES = "entries";
      var returnThis = function() {
        return this;
      };
      module.exports = function(Iterable, NAME2, IteratorConstructor, next2, DEFAULT, IS_SET, FORCED3) {
        createIteratorConstructor(IteratorConstructor, NAME2, next2);
        var getIterationMethod = function(KIND) {
          if (KIND === DEFAULT && defaultIterator)
            return defaultIterator;
          if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
            return IterablePrototype[KIND];
          switch (KIND) {
            case KEYS:
              return function keys() {
                return new IteratorConstructor(this, KIND);
              };
            case VALUES:
              return function values() {
                return new IteratorConstructor(this, KIND);
              };
            case ENTRIES:
              return function entries2() {
                return new IteratorConstructor(this, KIND);
              };
          }
          return function() {
            return new IteratorConstructor(this);
          };
        };
        var TO_STRING_TAG2 = NAME2 + " Iterator";
        var INCORRECT_VALUES_NAME = false;
        var IterablePrototype = Iterable.prototype;
        var nativeIterator = IterablePrototype[ITERATOR2] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
        var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
        var anyNativeIterator = NAME2 == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
        var CurrentIteratorPrototype, methods, KEY;
        if (anyNativeIterator) {
          CurrentIteratorPrototype = getPrototypeOf2(anyNativeIterator.call(new Iterable()));
          if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
            if (!IS_PURE3 && getPrototypeOf2(CurrentIteratorPrototype) !== IteratorPrototype) {
              if (setPrototypeOf2) {
                setPrototypeOf2(CurrentIteratorPrototype, IteratorPrototype);
              } else if (typeof CurrentIteratorPrototype[ITERATOR2] != "function") {
                createNonEnumerableProperty4(CurrentIteratorPrototype, ITERATOR2, returnThis);
              }
            }
            setToStringTag2(CurrentIteratorPrototype, TO_STRING_TAG2, true, true);
            if (IS_PURE3)
              Iterators[TO_STRING_TAG2] = returnThis;
          }
        }
        if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
          INCORRECT_VALUES_NAME = true;
          defaultIterator = function values() {
            return nativeIterator.call(this);
          };
        }
        if ((!IS_PURE3 || FORCED3) && IterablePrototype[ITERATOR2] !== defaultIterator) {
          createNonEnumerableProperty4(IterablePrototype, ITERATOR2, defaultIterator);
        }
        Iterators[NAME2] = defaultIterator;
        if (DEFAULT) {
          methods = {
            values: getIterationMethod(VALUES),
            keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
            entries: getIterationMethod(ENTRIES)
          };
          if (FORCED3)
            for (KEY in methods) {
              if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                redefine5(IterablePrototype, KEY, methods[KEY]);
              }
            }
          else
            $16({ target: NAME2, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
        }
        return methods;
      };
    }
  });

  // node_modules/core-js/modules/es.array.iterator.js
  var require_es_array_iterator = __commonJS({
    "node_modules/core-js/modules/es.array.iterator.js": function(exports, module) {
      "use strict";
      var toIndexedObject3 = require_to_indexed_object();
      var addToUnscopables = require_add_to_unscopables();
      var Iterators = require_iterators();
      var InternalStateModule3 = require_internal_state();
      var defineIterator2 = require_define_iterator();
      var ARRAY_ITERATOR = "Array Iterator";
      var setInternalState3 = InternalStateModule3.set;
      var getInternalState3 = InternalStateModule3.getterFor(ARRAY_ITERATOR);
      module.exports = defineIterator2(Array, "Array", function(iterated, kind) {
        setInternalState3(this, {
          type: ARRAY_ITERATOR,
          target: toIndexedObject3(iterated),
          index: 0,
          kind: kind
        });
      }, function() {
        var state = getInternalState3(this);
        var target = state.target;
        var kind = state.kind;
        var index = state.index++;
        if (!target || index >= target.length) {
          state.target = void 0;
          return { value: void 0, done: true };
        }
        if (kind == "keys")
          return { value: index, done: false };
        if (kind == "values")
          return { value: target[index], done: false };
        return { value: [index, target[index]], done: false };
      }, "values");
      Iterators.Arguments = Iterators.Array;
      addToUnscopables("keys");
      addToUnscopables("values");
      addToUnscopables("entries");
    }
  });

  // node_modules/core-js/internals/freezing.js
  var require_freezing = __commonJS({
    "node_modules/core-js/internals/freezing.js": function(exports, module) {
      var fails6 = require_fails();
      module.exports = !fails6(function() {
        return Object.isExtensible(Object.preventExtensions({}));
      });
    }
  });

  // node_modules/core-js/internals/internal-metadata.js
  var require_internal_metadata = __commonJS({
    "node_modules/core-js/internals/internal-metadata.js": function(exports, module) {
      var hiddenKeys2 = require_hidden_keys();
      var isObject6 = require_is_object();
      var has3 = require_has();
      var defineProperty4 = require_object_define_property().f;
      var uid2 = require_uid();
      var FREEZING = require_freezing();
      var METADATA = uid2("meta");
      var id = 0;
      var isExtensible = Object.isExtensible || function() {
        return true;
      };
      var setMetadata = function(it) {
        defineProperty4(it, METADATA, { value: {
          objectID: "O" + id++,
          weakData: {}
        } });
      };
      var fastKey = function(it, create4) {
        if (!isObject6(it))
          return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
        if (!has3(it, METADATA)) {
          if (!isExtensible(it))
            return "F";
          if (!create4)
            return "E";
          setMetadata(it);
        }
        return it[METADATA].objectID;
      };
      var getWeakData = function(it, create4) {
        if (!has3(it, METADATA)) {
          if (!isExtensible(it))
            return true;
          if (!create4)
            return false;
          setMetadata(it);
        }
        return it[METADATA].weakData;
      };
      var onFreeze = function(it) {
        if (FREEZING && meta.REQUIRED && isExtensible(it) && !has3(it, METADATA))
          setMetadata(it);
        return it;
      };
      var meta = module.exports = {
        REQUIRED: false,
        fastKey: fastKey,
        getWeakData: getWeakData,
        onFreeze: onFreeze
      };
      hiddenKeys2[METADATA] = true;
    }
  });

  // node_modules/core-js/internals/is-array-iterator-method.js
  var require_is_array_iterator_method = __commonJS({
    "node_modules/core-js/internals/is-array-iterator-method.js": function(exports, module) {
      var wellKnownSymbol5 = require_well_known_symbol();
      var Iterators = require_iterators();
      var ITERATOR2 = wellKnownSymbol5("iterator");
      var ArrayPrototype = Array.prototype;
      module.exports = function(it) {
        return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR2] === it);
      };
    }
  });

  // node_modules/core-js/internals/function-bind-context.js
  var require_function_bind_context = __commonJS({
    "node_modules/core-js/internals/function-bind-context.js": function(exports, module) {
      var aFunction2 = require_a_function();
      module.exports = function(fn, that, length) {
        aFunction2(fn);
        if (that === void 0)
          return fn;
        switch (length) {
          case 0:
            return function() {
              return fn.call(that);
            };
          case 1:
            return function(a) {
              return fn.call(that, a);
            };
          case 2:
            return function(a, b) {
              return fn.call(that, a, b);
            };
          case 3:
            return function(a, b, c) {
              return fn.call(that, a, b, c);
            };
        }
        return function() {
          return fn.apply(that, arguments);
        };
      };
    }
  });

  // node_modules/core-js/internals/get-iterator-method.js
  var require_get_iterator_method = __commonJS({
    "node_modules/core-js/internals/get-iterator-method.js": function(exports, module) {
      var classof = require_classof();
      var Iterators = require_iterators();
      var wellKnownSymbol5 = require_well_known_symbol();
      var ITERATOR2 = wellKnownSymbol5("iterator");
      module.exports = function(it) {
        if (it != void 0)
          return it[ITERATOR2] || it["@@iterator"] || Iterators[classof(it)];
      };
    }
  });

  // node_modules/core-js/internals/iterator-close.js
  var require_iterator_close = __commonJS({
    "node_modules/core-js/internals/iterator-close.js": function(exports, module) {
      var anObject4 = require_an_object();
      module.exports = function(iterator) {
        var returnMethod = iterator["return"];
        if (returnMethod !== void 0) {
          return anObject4(returnMethod.call(iterator)).value;
        }
      };
    }
  });

  // node_modules/core-js/internals/iterate.js
  var require_iterate = __commonJS({
    "node_modules/core-js/internals/iterate.js": function(exports, module) {
      var anObject4 = require_an_object();
      var isArrayIteratorMethod = require_is_array_iterator_method();
      var toLength4 = require_to_length();
      var bind3 = require_function_bind_context();
      var getIteratorMethod = require_get_iterator_method();
      var iteratorClose = require_iterator_close();
      var Result = function(stopped, result) {
        this.stopped = stopped;
        this.result = result;
      };
      module.exports = function(iterable, unboundFunction, options) {
        var that = options && options.that;
        var AS_ENTRIES = !!(options && options.AS_ENTRIES);
        var IS_ITERATOR = !!(options && options.IS_ITERATOR);
        var INTERRUPTED = !!(options && options.INTERRUPTED);
        var fn = bind3(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
        var iterator, iterFn, index, length, result, next2, step;
        var stop = function(condition) {
          if (iterator)
            iteratorClose(iterator);
          return new Result(true, condition);
        };
        var callFn = function(value) {
          if (AS_ENTRIES) {
            anObject4(value);
            return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
          }
          return INTERRUPTED ? fn(value, stop) : fn(value);
        };
        if (IS_ITERATOR) {
          iterator = iterable;
        } else {
          iterFn = getIteratorMethod(iterable);
          if (typeof iterFn != "function")
            throw TypeError("Target is not iterable");
          if (isArrayIteratorMethod(iterFn)) {
            for (index = 0, length = toLength4(iterable.length); length > index; index++) {
              result = callFn(iterable[index]);
              if (result && result instanceof Result)
                return result;
            }
            return new Result(false);
          }
          iterator = iterFn.call(iterable);
        }
        next2 = iterator.next;
        while (!(step = next2.call(iterator)).done) {
          try {
            result = callFn(step.value);
          } catch (error) {
            iteratorClose(iterator);
            throw error;
          }
          if (typeof result == "object" && result && result instanceof Result)
            return result;
        }
        return new Result(false);
      };
    }
  });

  // node_modules/core-js/internals/an-instance.js
  var require_an_instance = __commonJS({
    "node_modules/core-js/internals/an-instance.js": function(exports, module) {
      module.exports = function(it, Constructor, name2) {
        if (!(it instanceof Constructor)) {
          throw TypeError("Incorrect " + (name2 ? name2 + " " : "") + "invocation");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/check-correctness-of-iteration.js
  var require_check_correctness_of_iteration = __commonJS({
    "node_modules/core-js/internals/check-correctness-of-iteration.js": function(exports, module) {
      var wellKnownSymbol5 = require_well_known_symbol();
      var ITERATOR2 = wellKnownSymbol5("iterator");
      var SAFE_CLOSING = false;
      try {
        called = 0;
        iteratorWithReturn = {
          next: function() {
            return { done: !!called++ };
          },
          "return": function() {
            SAFE_CLOSING = true;
          }
        };
        iteratorWithReturn[ITERATOR2] = function() {
          return this;
        };
        Array.from(iteratorWithReturn, function() {
          throw 2;
        });
      } catch (error) {
      }
      var called;
      var iteratorWithReturn;
      module.exports = function(exec, SKIP_CLOSING) {
        if (!SKIP_CLOSING && !SAFE_CLOSING)
          return false;
        var ITERATION_SUPPORT = false;
        try {
          var object = {};
          object[ITERATOR2] = function() {
            return {
              next: function() {
                return { done: ITERATION_SUPPORT = true };
              }
            };
          };
          exec(object);
        } catch (error) {
        }
        return ITERATION_SUPPORT;
      };
    }
  });

  // node_modules/core-js/internals/inherit-if-required.js
  var require_inherit_if_required = __commonJS({
    "node_modules/core-js/internals/inherit-if-required.js": function(exports, module) {
      var isObject6 = require_is_object();
      var setPrototypeOf2 = require_object_set_prototype_of();
      module.exports = function($this, dummy, Wrapper) {
        var NewTarget, NewTargetPrototype;
        if (setPrototypeOf2 && typeof (NewTarget = dummy.constructor) == "function" && NewTarget !== Wrapper && isObject6(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype)
          setPrototypeOf2($this, NewTargetPrototype);
        return $this;
      };
    }
  });

  // node_modules/core-js/internals/collection.js
  var require_collection = __commonJS({
    "node_modules/core-js/internals/collection.js": function(exports, module) {
      "use strict";
      var $16 = require_export();
      var global6 = require_global();
      var isForced = require_is_forced();
      var redefine5 = require_redefine();
      var InternalMetadataModule = require_internal_metadata();
      var iterate = require_iterate();
      var anInstance = require_an_instance();
      var isObject6 = require_is_object();
      var fails6 = require_fails();
      var checkCorrectnessOfIteration2 = require_check_correctness_of_iteration();
      var setToStringTag2 = require_set_to_string_tag();
      var inheritIfRequired = require_inherit_if_required();
      module.exports = function(CONSTRUCTOR_NAME, wrapper, common) {
        var IS_MAP = CONSTRUCTOR_NAME.indexOf("Map") !== -1;
        var IS_WEAK = CONSTRUCTOR_NAME.indexOf("Weak") !== -1;
        var ADDER = IS_MAP ? "set" : "add";
        var NativeConstructor = global6[CONSTRUCTOR_NAME];
        var NativePrototype = NativeConstructor && NativeConstructor.prototype;
        var Constructor = NativeConstructor;
        var exported = {};
        var fixMethod = function(KEY) {
          var nativeMethod = NativePrototype[KEY];
          redefine5(NativePrototype, KEY, KEY == "add" ? function add(value) {
            nativeMethod.call(this, value === 0 ? 0 : value);
            return this;
          } : KEY == "delete" ? function(key) {
            return IS_WEAK && !isObject6(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
          } : KEY == "get" ? function get(key) {
            return IS_WEAK && !isObject6(key) ? void 0 : nativeMethod.call(this, key === 0 ? 0 : key);
          } : KEY == "has" ? function has3(key) {
            return IS_WEAK && !isObject6(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
          } : function set(key, value) {
            nativeMethod.call(this, key === 0 ? 0 : key, value);
            return this;
          });
        };
        var REPLACE = isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != "function" || !(IS_WEAK || NativePrototype.forEach && !fails6(function() {
          new NativeConstructor().entries().next();
        })));
        if (REPLACE) {
          Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
          InternalMetadataModule.REQUIRED = true;
        } else if (isForced(CONSTRUCTOR_NAME, true)) {
          var instance = new Constructor();
          var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
          var THROWS_ON_PRIMITIVES = fails6(function() {
            instance.has(1);
          });
          var ACCEPT_ITERABLES = checkCorrectnessOfIteration2(function(iterable) {
            new NativeConstructor(iterable);
          });
          var BUGGY_ZERO = !IS_WEAK && fails6(function() {
            var $instance = new NativeConstructor();
            var index = 5;
            while (index--)
              $instance[ADDER](index, index);
            return !$instance.has(-0);
          });
          if (!ACCEPT_ITERABLES) {
            Constructor = wrapper(function(dummy, iterable) {
              anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
              var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
              if (iterable != void 0)
                iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
              return that;
            });
            Constructor.prototype = NativePrototype;
            NativePrototype.constructor = Constructor;
          }
          if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
            fixMethod("delete");
            fixMethod("has");
            IS_MAP && fixMethod("get");
          }
          if (BUGGY_ZERO || HASNT_CHAINING)
            fixMethod(ADDER);
          if (IS_WEAK && NativePrototype.clear)
            delete NativePrototype.clear;
        }
        exported[CONSTRUCTOR_NAME] = Constructor;
        $16({ global: true, forced: Constructor != NativeConstructor }, exported);
        setToStringTag2(Constructor, CONSTRUCTOR_NAME);
        if (!IS_WEAK)
          common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
        return Constructor;
      };
    }
  });

  // node_modules/core-js/internals/redefine-all.js
  var require_redefine_all = __commonJS({
    "node_modules/core-js/internals/redefine-all.js": function(exports, module) {
      var redefine5 = require_redefine();
      module.exports = function(target, src, options) {
        for (var key in src)
          redefine5(target, key, src[key], options);
        return target;
      };
    }
  });

  // node_modules/core-js/internals/set-species.js
  var require_set_species = __commonJS({
    "node_modules/core-js/internals/set-species.js": function(exports, module) {
      "use strict";
      var getBuiltIn3 = require_get_built_in();
      var definePropertyModule2 = require_object_define_property();
      var wellKnownSymbol5 = require_well_known_symbol();
      var DESCRIPTORS5 = require_descriptors();
      var SPECIES2 = wellKnownSymbol5("species");
      module.exports = function(CONSTRUCTOR_NAME) {
        var Constructor = getBuiltIn3(CONSTRUCTOR_NAME);
        var defineProperty4 = definePropertyModule2.f;
        if (DESCRIPTORS5 && Constructor && !Constructor[SPECIES2]) {
          defineProperty4(Constructor, SPECIES2, {
            configurable: true,
            get: function() {
              return this;
            }
          });
        }
      };
    }
  });

  // node_modules/core-js/internals/collection-strong.js
  var require_collection_strong = __commonJS({
    "node_modules/core-js/internals/collection-strong.js": function(exports, module) {
      "use strict";
      var defineProperty4 = require_object_define_property().f;
      var create4 = require_object_create();
      var redefineAll = require_redefine_all();
      var bind3 = require_function_bind_context();
      var anInstance = require_an_instance();
      var iterate = require_iterate();
      var defineIterator2 = require_define_iterator();
      var setSpecies = require_set_species();
      var DESCRIPTORS5 = require_descriptors();
      var fastKey = require_internal_metadata().fastKey;
      var InternalStateModule3 = require_internal_state();
      var setInternalState3 = InternalStateModule3.set;
      var internalStateGetterFor = InternalStateModule3.getterFor;
      module.exports = {
        getConstructor: function(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
          var C = wrapper(function(that, iterable) {
            anInstance(that, C, CONSTRUCTOR_NAME);
            setInternalState3(that, {
              type: CONSTRUCTOR_NAME,
              index: create4(null),
              first: void 0,
              last: void 0,
              size: 0
            });
            if (!DESCRIPTORS5)
              that.size = 0;
            if (iterable != void 0)
              iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          });
          var getInternalState3 = internalStateGetterFor(CONSTRUCTOR_NAME);
          var define = function(that, key, value) {
            var state = getInternalState3(that);
            var entry = getEntry(that, key);
            var previous, index;
            if (entry) {
              entry.value = value;
            } else {
              state.last = entry = {
                index: index = fastKey(key, true),
                key: key,
                value: value,
                previous: previous = state.last,
                next: void 0,
                removed: false
              };
              if (!state.first)
                state.first = entry;
              if (previous)
                previous.next = entry;
              if (DESCRIPTORS5)
                state.size++;
              else
                that.size++;
              if (index !== "F")
                state.index[index] = entry;
            }
            return that;
          };
          var getEntry = function(that, key) {
            var state = getInternalState3(that);
            var index = fastKey(key);
            var entry;
            if (index !== "F")
              return state.index[index];
            for (entry = state.first; entry; entry = entry.next) {
              if (entry.key == key)
                return entry;
            }
          };
          redefineAll(C.prototype, {
            clear: function clear() {
              var that = this;
              var state = getInternalState3(that);
              var data = state.index;
              var entry = state.first;
              while (entry) {
                entry.removed = true;
                if (entry.previous)
                  entry.previous = entry.previous.next = void 0;
                delete data[entry.index];
                entry = entry.next;
              }
              state.first = state.last = void 0;
              if (DESCRIPTORS5)
                state.size = 0;
              else
                that.size = 0;
            },
            "delete": function(key) {
              var that = this;
              var state = getInternalState3(that);
              var entry = getEntry(that, key);
              if (entry) {
                var next2 = entry.next;
                var prev = entry.previous;
                delete state.index[entry.index];
                entry.removed = true;
                if (prev)
                  prev.next = next2;
                if (next2)
                  next2.previous = prev;
                if (state.first == entry)
                  state.first = next2;
                if (state.last == entry)
                  state.last = prev;
                if (DESCRIPTORS5)
                  state.size--;
                else
                  that.size--;
              }
              return !!entry;
            },
            forEach: function forEach3(callbackfn) {
              var state = getInternalState3(this);
              var boundFunction = bind3(callbackfn, arguments.length > 1 ? arguments[1] : void 0, 3);
              var entry;
              while (entry = entry ? entry.next : state.first) {
                boundFunction(entry.value, entry.key, this);
                while (entry && entry.removed)
                  entry = entry.previous;
              }
            },
            has: function has3(key) {
              return !!getEntry(this, key);
            }
          });
          redefineAll(C.prototype, IS_MAP ? {
            get: function get(key) {
              var entry = getEntry(this, key);
              return entry && entry.value;
            },
            set: function set(key, value) {
              return define(this, key === 0 ? 0 : key, value);
            }
          } : {
            add: function add(value) {
              return define(this, value = value === 0 ? 0 : value, value);
            }
          });
          if (DESCRIPTORS5)
            defineProperty4(C.prototype, "size", {
              get: function() {
                return getInternalState3(this).size;
              }
            });
          return C;
        },
        setStrong: function(C, CONSTRUCTOR_NAME, IS_MAP) {
          var ITERATOR_NAME = CONSTRUCTOR_NAME + " Iterator";
          var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
          var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
          defineIterator2(C, CONSTRUCTOR_NAME, function(iterated, kind) {
            setInternalState3(this, {
              type: ITERATOR_NAME,
              target: iterated,
              state: getInternalCollectionState(iterated),
              kind: kind,
              last: void 0
            });
          }, function() {
            var state = getInternalIteratorState(this);
            var kind = state.kind;
            var entry = state.last;
            while (entry && entry.removed)
              entry = entry.previous;
            if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
              state.target = void 0;
              return { value: void 0, done: true };
            }
            if (kind == "keys")
              return { value: entry.key, done: false };
            if (kind == "values")
              return { value: entry.value, done: false };
            return { value: [entry.key, entry.value], done: false };
          }, IS_MAP ? "entries" : "values", !IS_MAP, true);
          setSpecies(CONSTRUCTOR_NAME);
        }
      };
    }
  });

  // node_modules/core-js/modules/es.map.js
  var require_es_map = __commonJS({
    "node_modules/core-js/modules/es.map.js": function(exports, module) {
      "use strict";
      var collection = require_collection();
      var collectionStrong = require_collection_strong();
      module.exports = collection("Map", function(init) {
        return function Map2() {
          return init(this, arguments.length ? arguments[0] : void 0);
        };
      }, collectionStrong);
    }
  });

  // node_modules/core-js/internals/string-multibyte.js
  var require_string_multibyte = __commonJS({
    "node_modules/core-js/internals/string-multibyte.js": function(exports, module) {
      var toInteger = require_to_integer();
      var requireObjectCoercible2 = require_require_object_coercible();
      var createMethod = function(CONVERT_TO_STRING) {
        return function($this, pos) {
          var S = String(requireObjectCoercible2($this));
          var position = toInteger(pos);
          var size = S.length;
          var first, second;
          if (position < 0 || position >= size)
            return CONVERT_TO_STRING ? "" : void 0;
          first = S.charCodeAt(position);
          return first < 55296 || first > 56319 || position + 1 === size || (second = S.charCodeAt(position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
        };
      };
      module.exports = {
        codeAt: createMethod(false),
        charAt: createMethod(true)
      };
    }
  });

  // node_modules/core-js/internals/dom-iterables.js
  var require_dom_iterables = __commonJS({
    "node_modules/core-js/internals/dom-iterables.js": function(exports, module) {
      module.exports = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0
      };
    }
  });

  // node_modules/core-js/internals/is-array.js
  var require_is_array = __commonJS({
    "node_modules/core-js/internals/is-array.js": function(exports, module) {
      var classof = require_classof_raw();
      module.exports = Array.isArray || function isArray5(arg) {
        return classof(arg) == "Array";
      };
    }
  });

  // node_modules/core-js/internals/object-get-own-property-names-external.js
  var require_object_get_own_property_names_external = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-names-external.js": function(exports, module) {
      var toIndexedObject3 = require_to_indexed_object();
      var $getOwnPropertyNames2 = require_object_get_own_property_names().f;
      var toString2 = {}.toString;
      var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
      var getWindowNames = function(it) {
        try {
          return $getOwnPropertyNames2(it);
        } catch (error) {
          return windowNames.slice();
        }
      };
      module.exports.f = function getOwnPropertyNames2(it) {
        return windowNames && toString2.call(it) == "[object Window]" ? getWindowNames(it) : $getOwnPropertyNames2(toIndexedObject3(it));
      };
    }
  });

  // node_modules/core-js/internals/well-known-symbol-wrapped.js
  var require_well_known_symbol_wrapped = __commonJS({
    "node_modules/core-js/internals/well-known-symbol-wrapped.js": function(exports) {
      var wellKnownSymbol5 = require_well_known_symbol();
      exports.f = wellKnownSymbol5;
    }
  });

  // node_modules/core-js/internals/define-well-known-symbol.js
  var require_define_well_known_symbol = __commonJS({
    "node_modules/core-js/internals/define-well-known-symbol.js": function(exports, module) {
      var path = require_path();
      var has3 = require_has();
      var wrappedWellKnownSymbolModule2 = require_well_known_symbol_wrapped();
      var defineProperty4 = require_object_define_property().f;
      module.exports = function(NAME2) {
        var Symbol2 = path.Symbol || (path.Symbol = {});
        if (!has3(Symbol2, NAME2))
          defineProperty4(Symbol2, NAME2, {
            value: wrappedWellKnownSymbolModule2.f(NAME2)
          });
      };
    }
  });

  // node_modules/core-js/internals/array-species-create.js
  var require_array_species_create = __commonJS({
    "node_modules/core-js/internals/array-species-create.js": function(exports, module) {
      var isObject6 = require_is_object();
      var isArray5 = require_is_array();
      var wellKnownSymbol5 = require_well_known_symbol();
      var SPECIES2 = wellKnownSymbol5("species");
      module.exports = function(originalArray, length) {
        var C;
        if (isArray5(originalArray)) {
          C = originalArray.constructor;
          if (typeof C == "function" && (C === Array || isArray5(C.prototype)))
            C = void 0;
          else if (isObject6(C)) {
            C = C[SPECIES2];
            if (C === null)
              C = void 0;
          }
        }
        return new (C === void 0 ? Array : C)(length === 0 ? 0 : length);
      };
    }
  });

  // node_modules/core-js/internals/array-iteration.js
  var require_array_iteration = __commonJS({
    "node_modules/core-js/internals/array-iteration.js": function(exports, module) {
      var bind3 = require_function_bind_context();
      var IndexedObject = require_indexed_object();
      var toObject4 = require_to_object();
      var toLength4 = require_to_length();
      var arraySpeciesCreate2 = require_array_species_create();
      var push = [].push;
      var createMethod = function(TYPE) {
        var IS_MAP = TYPE == 1;
        var IS_FILTER = TYPE == 2;
        var IS_SOME = TYPE == 3;
        var IS_EVERY = TYPE == 4;
        var IS_FIND_INDEX = TYPE == 6;
        var IS_FILTER_OUT = TYPE == 7;
        var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
        return function($this, callbackfn, that, specificCreate) {
          var O = toObject4($this);
          var self2 = IndexedObject(O);
          var boundFunction = bind3(callbackfn, that, 3);
          var length = toLength4(self2.length);
          var index = 0;
          var create4 = specificCreate || arraySpeciesCreate2;
          var target = IS_MAP ? create4($this, length) : IS_FILTER || IS_FILTER_OUT ? create4($this, 0) : void 0;
          var value, result;
          for (; length > index; index++)
            if (NO_HOLES || index in self2) {
              value = self2[index];
              result = boundFunction(value, index, O);
              if (TYPE) {
                if (IS_MAP)
                  target[index] = result;
                else if (result)
                  switch (TYPE) {
                    case 3:
                      return true;
                    case 5:
                      return value;
                    case 6:
                      return index;
                    case 2:
                      push.call(target, value);
                  }
                else
                  switch (TYPE) {
                    case 4:
                      return false;
                    case 7:
                      push.call(target, value);
                  }
              }
            }
          return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
        };
      };
      module.exports = {
        forEach: createMethod(0),
        map: createMethod(1),
        filter: createMethod(2),
        some: createMethod(3),
        every: createMethod(4),
        find: createMethod(5),
        findIndex: createMethod(6),
        filterOut: createMethod(7)
      };
    }
  });

  // node_modules/core-js/internals/array-for-each.js
  var require_array_for_each = __commonJS({
    "node_modules/core-js/internals/array-for-each.js": function(exports, module) {
      "use strict";
      var $forEach2 = require_array_iteration().forEach;
      var arrayMethodIsStrict2 = require_array_method_is_strict();
      var STRICT_METHOD2 = arrayMethodIsStrict2("forEach");
      module.exports = !STRICT_METHOD2 ? function forEach3(callbackfn) {
        return $forEach2(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
      } : [].forEach;
    }
  });

  // node_modules/core-js/internals/object-to-array.js
  var require_object_to_array = __commonJS({
    "node_modules/core-js/internals/object-to-array.js": function(exports, module) {
      var DESCRIPTORS5 = require_descriptors();
      var objectKeys2 = require_object_keys();
      var toIndexedObject3 = require_to_indexed_object();
      var propertyIsEnumerable2 = require_object_property_is_enumerable().f;
      var createMethod = function(TO_ENTRIES) {
        return function(it) {
          var O = toIndexedObject3(it);
          var keys = objectKeys2(O);
          var length = keys.length;
          var i = 0;
          var result = [];
          var key;
          while (length > i) {
            key = keys[i++];
            if (!DESCRIPTORS5 || propertyIsEnumerable2.call(O, key)) {
              result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
            }
          }
          return result;
        };
      };
      module.exports = {
        entries: createMethod(true),
        values: createMethod(false)
      };
    }
  });

  // node_modules/core-js/internals/is-regexp.js
  var require_is_regexp = __commonJS({
    "node_modules/core-js/internals/is-regexp.js": function(exports, module) {
      var isObject6 = require_is_object();
      var classof = require_classof_raw();
      var wellKnownSymbol5 = require_well_known_symbol();
      var MATCH = wellKnownSymbol5("match");
      module.exports = function(it) {
        var isRegExp;
        return isObject6(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : classof(it) == "RegExp");
      };
    }
  });

  // node_modules/core-js/internals/not-a-regexp.js
  var require_not_a_regexp = __commonJS({
    "node_modules/core-js/internals/not-a-regexp.js": function(exports, module) {
      var isRegExp = require_is_regexp();
      module.exports = function(it) {
        if (isRegExp(it)) {
          throw TypeError("The method doesn't accept regular expressions");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/correct-is-regexp-logic.js
  var require_correct_is_regexp_logic = __commonJS({
    "node_modules/core-js/internals/correct-is-regexp-logic.js": function(exports, module) {
      var wellKnownSymbol5 = require_well_known_symbol();
      var MATCH = wellKnownSymbol5("match");
      module.exports = function(METHOD_NAME) {
        var regexp = /./;
        try {
          "/./"[METHOD_NAME](regexp);
        } catch (error1) {
          try {
            regexp[MATCH] = false;
            return "/./"[METHOD_NAME](regexp);
          } catch (error2) {
          }
        }
        return false;
      };
    }
  });

  // node_modules/core-js/internals/create-property.js
  var require_create_property = __commonJS({
    "node_modules/core-js/internals/create-property.js": function(exports, module) {
      "use strict";
      var toPrimitive2 = require_to_primitive();
      var definePropertyModule2 = require_object_define_property();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      module.exports = function(object, key, value) {
        var propertyKey = toPrimitive2(key);
        if (propertyKey in object)
          definePropertyModule2.f(object, propertyKey, createPropertyDescriptor2(0, value));
        else
          object[propertyKey] = value;
      };
    }
  });

  // node_modules/core-js/internals/array-method-has-species-support.js
  var require_array_method_has_species_support = __commonJS({
    "node_modules/core-js/internals/array-method-has-species-support.js": function(exports, module) {
      var fails6 = require_fails();
      var wellKnownSymbol5 = require_well_known_symbol();
      var V8_VERSION2 = require_engine_v8_version();
      var SPECIES2 = wellKnownSymbol5("species");
      module.exports = function(METHOD_NAME) {
        return V8_VERSION2 >= 51 || !fails6(function() {
          var array = [];
          var constructor = array.constructor = {};
          constructor[SPECIES2] = function() {
            return { foo: 1 };
          };
          return array[METHOD_NAME](Boolean).foo !== 1;
        });
      };
    }
  });

  // node_modules/core-js/internals/call-with-safe-iteration-closing.js
  var require_call_with_safe_iteration_closing = __commonJS({
    "node_modules/core-js/internals/call-with-safe-iteration-closing.js": function(exports, module) {
      var anObject4 = require_an_object();
      var iteratorClose = require_iterator_close();
      module.exports = function(iterator, fn, value, ENTRIES) {
        try {
          return ENTRIES ? fn(anObject4(value)[0], value[1]) : fn(value);
        } catch (error) {
          iteratorClose(iterator);
          throw error;
        }
      };
    }
  });

  // node_modules/core-js/internals/array-from.js
  var require_array_from = __commonJS({
    "node_modules/core-js/internals/array-from.js": function(exports, module) {
      "use strict";
      var bind3 = require_function_bind_context();
      var toObject4 = require_to_object();
      var callWithSafeIterationClosing = require_call_with_safe_iteration_closing();
      var isArrayIteratorMethod = require_is_array_iterator_method();
      var toLength4 = require_to_length();
      var createProperty3 = require_create_property();
      var getIteratorMethod = require_get_iterator_method();
      module.exports = function from2(arrayLike) {
        var O = toObject4(arrayLike);
        var C = typeof this == "function" ? this : Array;
        var argumentsLength = arguments.length;
        var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
        var mapping = mapfn !== void 0;
        var iteratorMethod = getIteratorMethod(O);
        var index = 0;
        var length, result, step, iterator, next2, value;
        if (mapping)
          mapfn = bind3(mapfn, argumentsLength > 2 ? arguments[2] : void 0, 2);
        if (iteratorMethod != void 0 && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
          iterator = iteratorMethod.call(O);
          next2 = iterator.next;
          result = new C();
          for (; !(step = next2.call(iterator)).done; index++) {
            value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
            createProperty3(result, index, value);
          }
        } else {
          length = toLength4(O.length);
          result = new C(length);
          for (; length > index; index++) {
            value = mapping ? mapfn(O[index], index) : O[index];
            createProperty3(result, index, value);
          }
        }
        result.length = index;
        return result;
      };
    }
  });

  // node_modules/core-js/modules/es.object.set-prototype-of.js
  var $ = require_export();
  var setPrototypeOf = require_object_set_prototype_of();
  $({ target: "Object", stat: true }, {
    setPrototypeOf: setPrototypeOf
  });

  // node_modules/core-js/modules/es.object.get-prototype-of.js
  var $2 = require_export();
  var fails = require_fails();
  var toObject = require_to_object();
  var nativeGetPrototypeOf = require_object_get_prototype_of();
  var CORRECT_PROTOTYPE_GETTER = require_correct_prototype_getter();
  var FAILS_ON_PRIMITIVES = fails(function() {
    nativeGetPrototypeOf(1);
  });
  $2({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
    getPrototypeOf: function getPrototypeOf(it) {
      return nativeGetPrototypeOf(toObject(it));
    }
  });

  // node_modules/core-js/modules/es.array.index-of.js
  "use strict";
  var $3 = require_export();
  var $indexOf = require_array_includes().indexOf;
  var arrayMethodIsStrict = require_array_method_is_strict();
  var nativeIndexOf = [].indexOf;
  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
  var STRICT_METHOD = arrayMethodIsStrict("indexOf");
  $3({ target: "Array", proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
    indexOf: function indexOf(searchElement) {
      return NEGATIVE_ZERO ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : void 0);
    }
  });

  // node_modules/core-js/modules/es.date.to-string.js
  var redefine = require_redefine();
  var DatePrototype = Date.prototype;
  var INVALID_DATE = "Invalid Date";
  var TO_STRING = "toString";
  var nativeDateToString = DatePrototype[TO_STRING];
  var getTime = DatePrototype.getTime;
  if (new Date(NaN) + "" != INVALID_DATE) {
    redefine(DatePrototype, TO_STRING, function toString2() {
      var value = getTime.call(this);
      return value === value ? nativeDateToString.call(this) : INVALID_DATE;
    });
  }

  // node_modules/core-js/modules/es.object.to-string.js
  var TO_STRING_TAG_SUPPORT = require_to_string_tag_support();
  var redefine2 = require_redefine();
  var toString = require_object_to_string();
  if (!TO_STRING_TAG_SUPPORT) {
    redefine2(Object.prototype, "toString", toString, { unsafe: true });
  }

  // node_modules/core-js/modules/es.regexp.to-string.js
  "use strict";
  var redefine3 = require_redefine();
  var anObject = require_an_object();
  var fails2 = require_fails();
  var flags = require_regexp_flags();
  var TO_STRING2 = "toString";
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING2];
  var NOT_GENERIC = fails2(function() {
    return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
  });
  var INCORRECT_NAME = nativeToString.name != TO_STRING2;
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine3(RegExp.prototype, TO_STRING2, function toString2() {
      var R = anObject(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === void 0 && R instanceof RegExp && !("flags" in RegExpPrototype) ? flags.call(R) : rf);
      return "/" + p + "/" + f;
    }, { unsafe: true });
  }

  // node_modules/core-js/modules/es.reflect.construct.js
  var $4 = require_export();
  var getBuiltIn = require_get_built_in();
  var aFunction = require_a_function();
  var anObject2 = require_an_object();
  var isObject = require_is_object();
  var create = require_object_create();
  var bind = require_function_bind();
  var fails3 = require_fails();
  var nativeConstruct = getBuiltIn("Reflect", "construct");
  var NEW_TARGET_BUG = fails3(function() {
    function F() {
    }
    return !(nativeConstruct(function() {
    }, [], F) instanceof F);
  });
  var ARGS_BUG = !fails3(function() {
    nativeConstruct(function() {
    });
  });
  var FORCED = NEW_TARGET_BUG || ARGS_BUG;
  $4({ target: "Reflect", stat: true, forced: FORCED, sham: FORCED }, {
    construct: function construct(Target, args) {
      aFunction(Target);
      anObject2(args);
      var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG)
        return nativeConstruct(Target, args, newTarget);
      if (Target == newTarget) {
        switch (args.length) {
          case 0:
            return new Target();
          case 1:
            return new Target(args[0]);
          case 2:
            return new Target(args[0], args[1]);
          case 3:
            return new Target(args[0], args[1], args[2]);
          case 4:
            return new Target(args[0], args[1], args[2], args[3]);
        }
        var $args = [null];
        $args.push.apply($args, args);
        return new (bind.apply(Target, $args))();
      }
      var proto = newTarget.prototype;
      var instance = create(isObject(proto) ? proto : Object.prototype);
      var result = Function.apply.call(Target, instance, args);
      return isObject(result) ? result : instance;
    }
  });

  // node_modules/core-js/modules/es.function.bind.js
  var $5 = require_export();
  var bind2 = require_function_bind();
  $5({ target: "Function", proto: true }, {
    bind: bind2
  });

  // nav.js
  var import_es_array_iterator2 = __toModule(require_es_array_iterator());
  var import_es_map = __toModule(require_es_map());

  // node_modules/core-js/modules/es.string.iterator.js
  "use strict";
  var charAt = require_string_multibyte().charAt;
  var InternalStateModule = require_internal_state();
  var defineIterator = require_define_iterator();
  var STRING_ITERATOR = "String Iterator";
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
  defineIterator(String, "String", function(iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length)
      return { value: void 0, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  // node_modules/core-js/modules/web.dom-collections.iterator.js
  var global2 = require_global();
  var DOMIterables = require_dom_iterables();
  var ArrayIteratorMethods = require_es_array_iterator();
  var createNonEnumerableProperty = require_create_non_enumerable_property();
  var wellKnownSymbol = require_well_known_symbol();
  var ITERATOR = wellKnownSymbol("iterator");
  var TO_STRING_TAG = wellKnownSymbol("toStringTag");
  var ArrayValues = ArrayIteratorMethods.values;
  for (var COLLECTION_NAME in DOMIterables) {
    Collection = global2[COLLECTION_NAME];
    CollectionPrototype = Collection && Collection.prototype;
    if (CollectionPrototype) {
      if (CollectionPrototype[ITERATOR] !== ArrayValues)
        try {
          createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
        } catch (error) {
          CollectionPrototype[ITERATOR] = ArrayValues;
        }
      if (!CollectionPrototype[TO_STRING_TAG]) {
        createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
      }
      if (DOMIterables[COLLECTION_NAME])
        for (METHOD_NAME in ArrayIteratorMethods) {
          if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
            try {
              createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
            } catch (error) {
              CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
            }
        }
    }
  }
  var Collection;
  var CollectionPrototype;
  var METHOD_NAME;

  // node_modules/core-js/modules/es.object.create.js
  var $6 = require_export();
  var DESCRIPTORS = require_descriptors();
  var create2 = require_object_create();
  $6({ target: "Object", stat: true, sham: !DESCRIPTORS }, {
    create: create2
  });

  // node_modules/core-js/modules/es.symbol.js
  "use strict";
  var $7 = require_export();
  var global3 = require_global();
  var getBuiltIn2 = require_get_built_in();
  var IS_PURE = require_is_pure();
  var DESCRIPTORS2 = require_descriptors();
  var NATIVE_SYMBOL = require_native_symbol();
  var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
  var fails4 = require_fails();
  var has = require_has();
  var isArray = require_is_array();
  var isObject2 = require_is_object();
  var anObject3 = require_an_object();
  var toObject2 = require_to_object();
  var toIndexedObject = require_to_indexed_object();
  var toPrimitive = require_to_primitive();
  var createPropertyDescriptor = require_create_property_descriptor();
  var nativeObjectCreate = require_object_create();
  var objectKeys = require_object_keys();
  var getOwnPropertyNamesModule = require_object_get_own_property_names();
  var getOwnPropertyNamesExternal = require_object_get_own_property_names_external();
  var getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
  var getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor();
  var definePropertyModule = require_object_define_property();
  var propertyIsEnumerableModule = require_object_property_is_enumerable();
  var createNonEnumerableProperty2 = require_create_non_enumerable_property();
  var redefine4 = require_redefine();
  var shared = require_shared();
  var sharedKey = require_shared_key();
  var hiddenKeys = require_hidden_keys();
  var uid = require_uid();
  var wellKnownSymbol2 = require_well_known_symbol();
  var wrappedWellKnownSymbolModule = require_well_known_symbol_wrapped();
  var defineWellKnownSymbol = require_define_well_known_symbol();
  var setToStringTag = require_set_to_string_tag();
  var InternalStateModule2 = require_internal_state();
  var $forEach = require_array_iteration().forEach;
  var HIDDEN = sharedKey("hidden");
  var SYMBOL = "Symbol";
  var PROTOTYPE = "prototype";
  var TO_PRIMITIVE = wellKnownSymbol2("toPrimitive");
  var setInternalState2 = InternalStateModule2.set;
  var getInternalState2 = InternalStateModule2.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global3.Symbol;
  var $stringify = getBuiltIn2("JSON", "stringify");
  var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  var nativeDefineProperty = definePropertyModule.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
  var AllSymbols = shared("symbols");
  var ObjectPrototypeSymbols = shared("op-symbols");
  var StringToSymbolRegistry = shared("string-to-symbol-registry");
  var SymbolToStringRegistry = shared("symbol-to-string-registry");
  var WellKnownSymbolsStore = shared("wks");
  var QObject = global3.QObject;
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
  var setSymbolDescriptor = DESCRIPTORS2 && fails4(function() {
    return nativeObjectCreate(nativeDefineProperty({}, "a", {
      get: function() {
        return nativeDefineProperty(this, "a", { value: 7 }).a;
      }
    })).a != 7;
  }) ? function(O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
    if (ObjectPrototypeDescriptor)
      delete ObjectPrototype[P];
    nativeDefineProperty(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
      nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty;
  var wrap = function(tag2, description) {
    var symbol = AllSymbols[tag2] = nativeObjectCreate($Symbol[PROTOTYPE]);
    setInternalState2(symbol, {
      type: SYMBOL,
      tag: tag2,
      description: description
    });
    if (!DESCRIPTORS2)
      symbol.description = description;
    return symbol;
  };
  var isSymbol = USE_SYMBOL_AS_UID ? function(it) {
    return typeof it == "symbol";
  } : function(it) {
    return Object(it) instanceof $Symbol;
  };
  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype)
      $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject3(O);
    var key = toPrimitive(P, true);
    anObject3(Attributes);
    if (has(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has(O, HIDDEN))
          nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has(O, HIDDEN) && O[HIDDEN][key])
          O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
      }
      return setSymbolDescriptor(O, key, Attributes);
    }
    return nativeDefineProperty(O, key, Attributes);
  };
  var $defineProperties = function defineProperties(O, Properties) {
    anObject3(O);
    var properties = toIndexedObject(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys, function(key) {
      if (!DESCRIPTORS2 || $propertyIsEnumerable.call(properties, key))
        $defineProperty(O, key, properties[key]);
    });
    return O;
  };
  var $create = function create3(O, Properties) {
    return Properties === void 0 ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPrimitive(V, true);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P))
      return false;
    return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPrimitive(P, true);
    if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key))
      return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);
    if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject(O));
    var result = [];
    $forEach(names, function(key) {
      if (!has(AllSymbols, key) && !has(hiddenKeys, key))
        result.push(key);
    });
    return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach(names, function(key) {
      if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  };
  if (!NATIVE_SYMBOL) {
    $Symbol = function Symbol2() {
      if (this instanceof $Symbol)
        throw TypeError("Symbol is not a constructor");
      var description = !arguments.length || arguments[0] === void 0 ? void 0 : String(arguments[0]);
      var tag2 = uid(description);
      var setter = function(value) {
        if (this === ObjectPrototype)
          setter.call(ObjectPrototypeSymbols, value);
        if (has(this, HIDDEN) && has(this[HIDDEN], tag2))
          this[HIDDEN][tag2] = false;
        setSymbolDescriptor(this, tag2, createPropertyDescriptor(1, value));
      };
      if (DESCRIPTORS2 && USE_SETTER)
        setSymbolDescriptor(ObjectPrototype, tag2, { configurable: true, set: setter });
      return wrap(tag2, description);
    };
    redefine4($Symbol[PROTOTYPE], "toString", function toString2() {
      return getInternalState2(this).tag;
    });
    redefine4($Symbol, "withoutSetter", function(description) {
      return wrap(uid(description), description);
    });
    propertyIsEnumerableModule.f = $propertyIsEnumerable;
    definePropertyModule.f = $defineProperty;
    getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
    getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
    wrappedWellKnownSymbolModule.f = function(name2) {
      return wrap(wellKnownSymbol2(name2), name2);
    };
    if (DESCRIPTORS2) {
      nativeDefineProperty($Symbol[PROTOTYPE], "description", {
        configurable: true,
        get: function description() {
          return getInternalState2(this).description;
        }
      });
      if (!IS_PURE) {
        redefine4(ObjectPrototype, "propertyIsEnumerable", $propertyIsEnumerable, { unsafe: true });
      }
    }
  }
  $7({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
    Symbol: $Symbol
  });
  $forEach(objectKeys(WellKnownSymbolsStore), function(name2) {
    defineWellKnownSymbol(name2);
  });
  $7({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
    "for": function(key) {
      var string = String(key);
      if (has(StringToSymbolRegistry, string))
        return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym))
        throw TypeError(sym + " is not a symbol");
      if (has(SymbolToStringRegistry, sym))
        return SymbolToStringRegistry[sym];
    },
    useSetter: function() {
      USE_SETTER = true;
    },
    useSimple: function() {
      USE_SETTER = false;
    }
  });
  $7({ target: "Object", stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS2 }, {
    create: $create,
    defineProperty: $defineProperty,
    defineProperties: $defineProperties,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });
  $7({ target: "Object", stat: true, forced: !NATIVE_SYMBOL }, {
    getOwnPropertyNames: $getOwnPropertyNames,
    getOwnPropertySymbols: $getOwnPropertySymbols
  });
  $7({ target: "Object", stat: true, forced: fails4(function() {
    getOwnPropertySymbolsModule.f(1);
  }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols2(it) {
      return getOwnPropertySymbolsModule.f(toObject2(it));
    }
  });
  if ($stringify) {
    FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails4(function() {
      var symbol = $Symbol();
      return $stringify([symbol]) != "[null]" || $stringify({ a: symbol }) != "{}" || $stringify(Object(symbol)) != "{}";
    });
    $7({ target: "JSON", stat: true, forced: FORCED_JSON_STRINGIFY }, {
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;
        while (arguments.length > index)
          args.push(arguments[index++]);
        $replacer = replacer;
        if (!isObject2(replacer) && it === void 0 || isSymbol(it))
          return;
        if (!isArray(replacer))
          replacer = function(key, value) {
            if (typeof $replacer == "function")
              value = $replacer.call(this, key, value);
            if (!isSymbol(value))
              return value;
          };
        args[1] = replacer;
        return $stringify.apply(null, args);
      }
    });
  }
  var FORCED_JSON_STRINGIFY;
  if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
    createNonEnumerableProperty2($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  }
  setToStringTag($Symbol, SYMBOL);
  hiddenKeys[HIDDEN] = true;

  // node_modules/core-js/modules/es.symbol.description.js
  "use strict";
  var $8 = require_export();
  var DESCRIPTORS3 = require_descriptors();
  var global4 = require_global();
  var has2 = require_has();
  var isObject3 = require_is_object();
  var defineProperty2 = require_object_define_property().f;
  var copyConstructorProperties = require_copy_constructor_properties();
  var NativeSymbol = global4.Symbol;
  if (DESCRIPTORS3 && typeof NativeSymbol == "function" && (!("description" in NativeSymbol.prototype) || NativeSymbol().description !== void 0)) {
    EmptyStringDescriptionStore = {};
    SymbolWrapper = function Symbol2() {
      var description = arguments.length < 1 || arguments[0] === void 0 ? void 0 : String(arguments[0]);
      var result = this instanceof SymbolWrapper ? new NativeSymbol(description) : description === void 0 ? NativeSymbol() : NativeSymbol(description);
      if (description === "")
        EmptyStringDescriptionStore[result] = true;
      return result;
    };
    copyConstructorProperties(SymbolWrapper, NativeSymbol);
    symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
    symbolPrototype.constructor = SymbolWrapper;
    symbolToString = symbolPrototype.toString;
    native = String(NativeSymbol("test")) == "Symbol(test)";
    regexp = /^Symbol\((.*)\)[^)]+$/;
    defineProperty2(symbolPrototype, "description", {
      configurable: true,
      get: function description() {
        var symbol = isObject3(this) ? this.valueOf() : this;
        var string = symbolToString.call(symbol);
        if (has2(EmptyStringDescriptionStore, symbol))
          return "";
        var desc = native ? string.slice(7, -1) : string.replace(regexp, "$1");
        return desc === "" ? void 0 : desc;
      }
    });
    $8({ global: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }
  var EmptyStringDescriptionStore;
  var SymbolWrapper;
  var symbolPrototype;
  var symbolToString;
  var native;
  var regexp;

  // node_modules/core-js/modules/es.symbol.iterator.js
  var defineWellKnownSymbol2 = require_define_well_known_symbol();
  defineWellKnownSymbol2("iterator");

  // node_modules/core-js/modules/es.array.for-each.js
  "use strict";
  var $9 = require_export();
  var forEach = require_array_for_each();
  $9({ target: "Array", proto: true, forced: [].forEach != forEach }, {
    forEach: forEach
  });

  // node_modules/core-js/modules/web.dom-collections.for-each.js
  var global5 = require_global();
  var DOMIterables2 = require_dom_iterables();
  var forEach2 = require_array_for_each();
  var createNonEnumerableProperty3 = require_create_non_enumerable_property();
  for (var COLLECTION_NAME in DOMIterables2) {
    Collection = global5[COLLECTION_NAME];
    CollectionPrototype = Collection && Collection.prototype;
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach2)
      try {
        createNonEnumerableProperty3(CollectionPrototype, "forEach", forEach2);
      } catch (error) {
        CollectionPrototype.forEach = forEach2;
      }
  }
  var Collection;
  var CollectionPrototype;

  // node_modules/core-js/modules/es.object.entries.js
  var $10 = require_export();
  var $entries = require_object_to_array().entries;
  $10({ target: "Object", stat: true }, {
    entries: function entries(O) {
      return $entries(O);
    }
  });

  // node_modules/core-js/modules/es.string.starts-with.js
  "use strict";
  var $11 = require_export();
  var getOwnPropertyDescriptor2 = require_object_get_own_property_descriptor().f;
  var toLength = require_to_length();
  var notARegExp = require_not_a_regexp();
  var requireObjectCoercible = require_require_object_coercible();
  var correctIsRegExpLogic = require_correct_is_regexp_logic();
  var IS_PURE2 = require_is_pure();
  var $startsWith = "".startsWith;
  var min = Math.min;
  var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("startsWith");
  var MDN_POLYFILL_BUG = !IS_PURE2 && !CORRECT_IS_REGEXP_LOGIC && !!function() {
    var descriptor = getOwnPropertyDescriptor2(String.prototype, "startsWith");
    return descriptor && !descriptor.writable;
  }();
  $11({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
    startsWith: function startsWith(searchString) {
      var that = String(requireObjectCoercible(this));
      notARegExp(searchString);
      var index = toLength(min(arguments.length > 1 ? arguments[1] : void 0, that.length));
      var search = String(searchString);
      return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
    }
  });

  // node_modules/core-js/modules/es.array.is-array.js
  var $12 = require_export();
  var isArray2 = require_is_array();
  $12({ target: "Array", stat: true }, {
    isArray: isArray2
  });

  // utils.js
  var import_es_array_iterator = __toModule(require_es_array_iterator());

  // node_modules/core-js/modules/es.array.slice.js
  "use strict";
  var $13 = require_export();
  var isObject4 = require_is_object();
  var isArray3 = require_is_array();
  var toAbsoluteIndex = require_to_absolute_index();
  var toLength2 = require_to_length();
  var toIndexedObject2 = require_to_indexed_object();
  var createProperty = require_create_property();
  var wellKnownSymbol3 = require_well_known_symbol();
  var arrayMethodHasSpeciesSupport = require_array_method_has_species_support();
  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("slice");
  var SPECIES = wellKnownSymbol3("species");
  var nativeSlice = [].slice;
  var max = Math.max;
  $13({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    slice: function slice(start, end) {
      var O = toIndexedObject2(this);
      var length = toLength2(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === void 0 ? length : end, length);
      var Constructor, result, n;
      if (isArray3(O)) {
        Constructor = O.constructor;
        if (typeof Constructor == "function" && (Constructor === Array || isArray3(Constructor.prototype))) {
          Constructor = void 0;
        } else if (isObject4(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null)
            Constructor = void 0;
        }
        if (Constructor === Array || Constructor === void 0) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === void 0 ? Array : Constructor)(max(fin - k, 0));
      for (n = 0; k < fin; k++, n++)
        if (k in O)
          createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  // node_modules/core-js/modules/es.function.name.js
  var DESCRIPTORS4 = require_descriptors();
  var defineProperty3 = require_object_define_property().f;
  var FunctionPrototype = Function.prototype;
  var FunctionPrototypeToString = FunctionPrototype.toString;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = "name";
  if (DESCRIPTORS4 && !(NAME in FunctionPrototype)) {
    defineProperty3(FunctionPrototype, NAME, {
      configurable: true,
      get: function() {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
        } catch (error) {
          return "";
        }
      }
    });
  }

  // node_modules/core-js/modules/es.array.from.js
  var $14 = require_export();
  var from = require_array_from();
  var checkCorrectnessOfIteration = require_check_correctness_of_iteration();
  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
    Array.from(iterable);
  });
  $14({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
    from: from
  });

  // utils.js
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function tag(name2, attrs) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }
    var el = document.createElement(name2);
    Object.entries(attrs || {}).forEach(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), nm = _ref2[0], val = _ref2[1];
      nm.startsWith("on") && nm.toLowerCase() in window ? el.addEventListener(nm.toLowerCase().substr(2), val) : el.setAttribute(nm, val.toString());
    });
    if (!children) {
      return el;
    }
    children.forEach(function(x) {
      return appendChild(el, x);
    });
    return el;
  }
  function tagList() {
    for (var _len2 = arguments.length, children = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      children[_key2] = arguments[_key2];
    }
    return tag("template", {}, children).children;
  }
  function HTML(x) {
    var template = document.createElement("template");
    template.innerHTML = x;
    return template.content;
  }
  function appendChild(x, y) {
    if (y instanceof HTMLCollection) {
      while (y.length > 0) {
        x.appendChild(y[0]);
      }
    } else if (Array.isArray(y)) {
      y.forEach(function(z) {
        return appendChild(x, z);
      });
    } else {
      x.appendChild(y.nodeType ? y : document.createTextNode(y));
    }
  }

  // node_modules/core-js/modules/es.array.concat.js
  "use strict";
  var $15 = require_export();
  var fails5 = require_fails();
  var isArray4 = require_is_array();
  var isObject5 = require_is_object();
  var toObject3 = require_to_object();
  var toLength3 = require_to_length();
  var createProperty2 = require_create_property();
  var arraySpeciesCreate = require_array_species_create();
  var arrayMethodHasSpeciesSupport2 = require_array_method_has_species_support();
  var wellKnownSymbol4 = require_well_known_symbol();
  var V8_VERSION = require_engine_v8_version();
  var IS_CONCAT_SPREADABLE = wellKnownSymbol4("isConcatSpreadable");
  var MAX_SAFE_INTEGER = 9007199254740991;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = "Maximum allowed index exceeded";
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails5(function() {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport2("concat");
  var isConcatSpreadable = function(O) {
    if (!isObject5(O))
      return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== void 0 ? !!spreadable : isArray4(O);
  };
  var FORCED2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
  $15({ target: "Array", proto: true, forced: FORCED2 }, {
    concat: function concat(arg) {
      var O = toObject3(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength3(E.length);
          if (n + len > MAX_SAFE_INTEGER)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++)
            if (k in E)
              createProperty2(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER)
            throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty2(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  // nav-utils.js
  function createTabFragment(self2, className, tabset) {
    var ulAttrs = {
      "class": className,
      role: "tablist",
      "data-tabsetid": tabset.id
    };
    var id = self2.getAttribute("id");
    if (id) {
      ulAttrs.id = id;
      ulAttrs["class"] = ulAttrs["class"] + " shiny-tab-input";
    }
    var ulTag = tag("ul", ulAttrs, tabset.tabList);
    var contents = [];
    var header = self2.getAttribute("header");
    if (header)
      contents.push(HTML(header));
    contents.push(tabset.tabContent);
    var footer = self2.getAttribute("footer");
    if (footer)
      contents.push(HTML(footer));
    var divTag = tag("div", {
      "class": "tab-content",
      "data-tabsetid": tabset.id
    }, contents);
    return tagList(ulTag, divTag);
  }
  function buildTabset(navs, selected) {
    var tabList = new DocumentFragment();
    var tabContent = new DocumentFragment();
    var id = Math.floor(1e3 + Math.random() * 9e3);
    for (var i = 0; i < navs.length; i++) {
      var item = buildTabItem(navs[i], selected, id, i + 1);
      tabList.append(item.liTag);
      if (item.divTag)
        tabContent.append(item.divTag);
    }
    return {
      tabList: tabList,
      tabContent: tabContent,
      id: id
    };
  }
  function buildTabItem(nav, selected, id, index) {
    var liTag = document.createElement("li");
    if (nav.classList.contains("nav-spacer")) {
      liTag.classList.add("bslib-nav-spacer");
      return {
        liTag: liTag,
        divTag: void 0
      };
    }
    if (nav.classList.contains("nav-item")) {
      liTag.classList.add("form-inline");
      liTag.append(nav.content);
      return {
        liTag: liTag,
        divTag: void 0
      };
    }
    if (nav.classList.contains("nav-menu")) {
      liTag.classList.add("dropdown");
      var attrs = {
        href: "#",
        "class": "dropdown-toggle",
        "data-toggle": "dropdown",
        "data-value": nav.getAttribute("value")
      };
      var toggle = tag("a", attrs, HTML(nav.getAttribute("title")));
      var menu = tag("ul", {
        "data-tabsetid": id,
        "class": "dropdown-menu"
      });
      if (nav.getAttribute("align") === "right") {
        menu.classList.add("dropdown-menu-right");
      }
      var navMenu = buildTabset(nav.content.children, selected);
      menu.append(navMenu.tabList);
      liTag.append(toggle);
      liTag.append(menu);
      return {
        liTag: liTag,
        divTag: navMenu.tabContent
      };
    }
    if (nav.classList.contains("nav")) {
      var tabId = "tab-".concat(id, "-").concat(index);
      var aTag = tag("a", {
        href: "#" + tabId,
        role: "tab",
        "data-toggle": "tab",
        "data-value": nav.getAttribute("value")
      }, HTML(nav.getAttribute("title")));
      liTag.append(aTag);
      var divTag = tag("div", {
        id: tabId,
        "class": "tab-pane",
        role: "tabpanel"
      }, nav.content);
      if (selected === nav.getAttribute("value")) {
        liTag.classList.add("active");
        divTag.classList.add("active");
      }
      return {
        liTag: liTag,
        divTag: divTag
      };
    }
    throw new Error("A 'top-level' <".concat(name, "> tag within <bslib-navs-tab> is not supported"));
  }
  function getSelected(self2) {
    var selected = self2.getAttribute("selected");
    if (!selected) {
      selected = findFirstNav(self2.children).getAttribute("value");
    }
    return selected;
  }
  function findFirstNav(navs) {
    for (var i = 0; i < navs.length; i++) {
      var nav = navs[i];
      if (nav.classList.contains("nav")) {
        return nav;
      }
      if (nav.classList.contains("nav-menu")) {
        findFirstNav(nav);
      }
    }
  }
  function replaceChildren(x, y) {
    while (x.firstChild) {
      x.removeChild(x.lastChild);
    }
    appendChild(x, y);
  }

  // card.js
  function createCard(body, header, footer) {
    var card = tag("div", {
      "class": "card"
    });
    if (header) {
      card.append(tag("div", {
        "class": "card-header"
      }, header));
    }
    card.append(tag("div", {
      "class": "card-body"
    }, body));
    if (footer) {
      card.append(tag("div", {
        "class": "card-footer"
      }, footer));
    }
    return card;
  }

  // nav.js
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof2(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function _typeof2(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
    if (superClass)
      _setPrototypeOf(subClass, superClass);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _possibleConstructorReturn(self2, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }
    return _assertThisInitialized(self2);
  }
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : void 0;
    _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
      if (Class2 === null || !_isNativeFunction(Class2))
        return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
      return _setPrototypeOf(Wrapper, Class2);
    };
    return _wrapNativeSuper(Class);
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct2(Parent2, args2, Class2) {
        var a = [null];
        a.push.apply(a, args2);
        var Constructor = Function.bind.apply(Parent2, a);
        var instance = new Constructor();
        if (Class2)
          _setPrototypeOf(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf(o);
  }
  var NavsTab = /* @__PURE__ */ function(_HTMLElement) {
    _inherits(NavsTab2, _HTMLElement);
    var _super = _createSuper(NavsTab2);
    function NavsTab2() {
      var _this;
      _classCallCheck(this, NavsTab2);
      self = _this = _super.call(this);
      var selected = getSelected(self);
      var tabset = buildTabset(self.children, selected);
      var tabs = createTabFragment(self, "nav nav-tabs", tabset);
      replaceChildren(self, tabs);
      return _this;
    }
    return NavsTab2;
  }(/* @__PURE__ */ _wrapNativeSuper(HTMLElement));
  customElements.define("bslib-navs-tab", NavsTab);
  var NavsPill = /* @__PURE__ */ function(_HTMLElement2) {
    _inherits(NavsPill2, _HTMLElement2);
    var _super2 = _createSuper(NavsPill2);
    function NavsPill2() {
      var _this2;
      _classCallCheck(this, NavsPill2);
      self = _this2 = _super2.call(this);
      var selected = getSelected(self);
      var tabset = buildTabset(self.children, selected);
      var pills = createTabFragment(self, "nav nav-pills", tabset);
      replaceChildren(self, pills);
      return _this2;
    }
    return NavsPill2;
  }(/* @__PURE__ */ _wrapNativeSuper(HTMLElement));
  customElements.define("bslib-navs-pill", NavsPill);
  var NavsTabCard = /* @__PURE__ */ function(_HTMLElement3) {
    _inherits(NavsTabCard2, _HTMLElement3);
    var _super3 = _createSuper(NavsTabCard2);
    function NavsTabCard2() {
      var _this3;
      _classCallCheck(this, NavsTabCard2);
      self = _this3 = _super3.call(this);
      var selected = getSelected(self);
      var tabset = buildTabset(self.children, selected);
      var tabs = createTabFragment(self, "nav nav-tabs", tabset);
      var nav = tabs[0];
      var content = tabs[1];
      nav.classList.add("card-header-tabs");
      var card = createCard(content, nav);
      replaceChildren(self, card);
      return _this3;
    }
    return NavsTabCard2;
  }(/* @__PURE__ */ _wrapNativeSuper(HTMLElement));
  customElements.define("bslib-navs-tab-card", NavsTabCard);
  var NavsPillCard = /* @__PURE__ */ function(_HTMLElement4) {
    _inherits(NavsPillCard2, _HTMLElement4);
    var _super4 = _createSuper(NavsPillCard2);
    function NavsPillCard2() {
      var _this4;
      _classCallCheck(this, NavsPillCard2);
      self = _this4 = _super4.call(this);
      var selected = getSelected(self);
      var tabset = buildTabset(self.children, selected);
      var pills = createTabFragment(self, "nav nav-pills", tabset);
      var nav = pills[0];
      var content = pills[1];
      var above = self.getAttribute("placement") !== "below";
      if (above)
        nav.classList.add("card-header-pills");
      var card = above ? createCard(content, nav) : createCard(content, null, nav);
      replaceChildren(self, card);
      return _this4;
    }
    return NavsPillCard2;
  }(/* @__PURE__ */ _wrapNativeSuper(HTMLElement));
  customElements.define("bslib-navs-pill-card", NavsPillCard);
  var NavsPillList = /* @__PURE__ */ function(_HTMLElement5) {
    _inherits(NavsPillList2, _HTMLElement5);
    var _super5 = _createSuper(NavsPillList2);
    function NavsPillList2() {
      var _this5;
      _classCallCheck(this, NavsPillList2);
      self = _this5 = _super5.call(this);
      var selected = getSelected(self);
      var tabset = buildTabset(self.children, selected);
      var pills = createTabFragment(self, "nav nav-pills nav-stacked", tabset);
      var nav = pills[0];
      var content = pills[1];
      var navClass = "col-sm-" + self.getAttribute("widthNav");
      if (self.getAttribute("well")) {
        navClass = navClass + " well";
      }
      var row = tag("div", {
        "class": "row"
      }, tag("div", {
        "class": navClass
      }, nav), tag("div", {
        "class": "col-sm-" + self.getAttribute("widthContent")
      }, content));
      replaceChildren(self, row);
      return _this5;
    }
    return NavsPillList2;
  }(/* @__PURE__ */ _wrapNativeSuper(HTMLElement));
  customElements.define("bslib-navs-pill-list", NavsPillList);
  var NavsBar = /* @__PURE__ */ function(_HTMLElement6) {
    _inherits(NavsBar2, _HTMLElement6);
    var _super6 = _createSuper(NavsBar2);
    function NavsBar2() {
      var _this6;
      _classCallCheck(this, NavsBar2);
      self = _this6 = _super6.call(this);
      var selected = getSelected(self);
      var tabset = buildTabset(self.children, selected);
      var navbar = createTabFragment(self, "nav navbar-nav", tabset);
      return _this6;
    }
    return NavsBar2;
  }(/* @__PURE__ */ _wrapNativeSuper(HTMLElement));
  customElements.define("bslib-navs-bar", NavsBar);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLW9iamVjdC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHkuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LWdsb2JhbC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXB1cmUuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3BhdGguanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWludGVnZXIuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vd24ta2V5cy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZi5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXIuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtc3ltYm9sLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtZnVuY3Rpb24uanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2h0bWwuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLWl0ZXJhdG9yLWNvbnN0cnVjdG9yLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvci5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3IuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnJlZXppbmcuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtbWV0YWRhdGEuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtYXJyYXktaXRlcmF0b3ItbWV0aG9kLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9yLWNsb3NlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdGUuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4taW5zdGFuY2UuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2hlY2stY29ycmVjdG5lc3Mtb2YtaXRlcmF0aW9uLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luaGVyaXQtaWYtcmVxdWlyZWQuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29sbGVjdGlvbi5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWRlZmluZS1hbGwuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LXNwZWNpZXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29sbGVjdGlvbi1zdHJvbmcuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm1hcC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtYXJyYXkuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMtZXh0ZXJuYWwuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtd3JhcHBlZC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC10by1hcnJheS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1yZWdleHAuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbm90LWEtcmVnZXhwLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcnJlY3QtaXMtcmVnZXhwLWxvZ2ljLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jYWxsLXdpdGgtc2FmZS1pdGVyYXRpb24tY2xvc2luZy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1mcm9tLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmluZGV4LW9mLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5kYXRlLnRvLXN0cmluZy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnRvLXN0cmluZy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLnRvLXN0cmluZy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVmbGVjdC5jb25zdHJ1Y3QuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmZ1bmN0aW9uLmJpbmQuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9uYXYuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvci5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvci5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmNyZWF0ZS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuZGVzY3JpcHRpb24uanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN5bWJvbC5pdGVyYXRvci5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZm9yLWVhY2guanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuZm9yLWVhY2guanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5lbnRyaWVzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuc3RhcnRzLXdpdGguanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmlzLWFycmF5LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvdXRpbHMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LnNsaWNlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5mdW5jdGlvbi5uYW1lLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5mcm9tLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5jb25jYXQuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9uYXYtdXRpbHMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9jYXJkLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJ2YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1nbG9iYWwtdGhpcyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzIC0tIHNhZmVcbiAgY2hlY2sodHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuYyAtLSBmYWxsYmFja1xuICAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSkoKSB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwgIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCAidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgMSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSlbMV0gIT0gNztcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhJHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAxOiAyIH0sIDEpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUucHJvcGVydHlpc2VudW1lcmFibGVcbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwgIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCAidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwgInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyIHNwbGl0ID0gJycuc3BsaXQ7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwgIi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCAiLy8gdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEluZGV4ZWRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShpdCkpO1xufTtcbiIsICJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsICJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsICJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9vYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsICJ2YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5oYXNPd24gfHwgZnVuY3Rpb24gaGFzT3duKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwodG9PYmplY3QoaXQpLCBrZXkpO1xufTtcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBFWElTVFMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBFWElTVFMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsICJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aWVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsICJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCAidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsICJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gJGRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwgInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoZ2xvYmFsLCBrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBzZXRHbG9iYWwoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCAidmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnRvU3RyaW5nO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYGNvcmUtanNAMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAodHlwZW9mIHN0b3JlLmluc3BlY3RTb3VyY2UgIT0gJ2Z1bmN0aW9uJykge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcblxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoaW5zcGVjdFNvdXJjZShXZWFrTWFwKSk7XG4iLCAibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsICJ2YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiAnMy4xNS4yJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICdcdTAwQTkgMjAyMSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwgInZhciBpZCA9IDA7XG52YXIgcG9zdGZpeCA9IE1hdGgucmFuZG9tKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgU3RyaW5nKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArICgrK2lkICsgcG9zdGZpeCkudG9TdHJpbmcoMzYpO1xufTtcbiIsICJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCAibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsICJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgb2JqZWN0SGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEID0gJ09iamVjdCBhbHJlYWR5IGluaXRpYWxpemVkJztcbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG52YXIgc2V0LCBnZXQsIGhhcztcblxudmFyIGVuZm9yY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGhhcyhpdCkgPyBnZXQoaXQpIDogc2V0KGl0LCB7fSk7XG59O1xuXG52YXIgZ2V0dGVyRm9yID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoIWlzT2JqZWN0KGl0KSB8fCAoc3RhdGUgPSBnZXQoaXQpKS50eXBlICE9PSBUWVBFKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkJyk7XG4gICAgfSByZXR1cm4gc3RhdGU7XG4gIH07XG59O1xuXG5pZiAoTkFUSVZFX1dFQUtfTUFQIHx8IHNoYXJlZC5zdGF0ZSkge1xuICB2YXIgc3RvcmUgPSBzaGFyZWQuc3RhdGUgfHwgKHNoYXJlZC5zdGF0ZSA9IG5ldyBXZWFrTWFwKCkpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaWYgKHdtaGFzLmNhbGwoc3RvcmUsIGl0KSkgdGhyb3cgbmV3IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmIChvYmplY3RIYXMoaXQsIFNUQVRFKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwgInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgVEVNUExBVEUgPSBTdHJpbmcoU3RyaW5nKS5zcGxpdCgnU3RyaW5nJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciB1bnNhZmUgPSBvcHRpb25zID8gISFvcHRpb25zLnVuc2FmZSA6IGZhbHNlO1xuICB2YXIgc2ltcGxlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5lbnVtZXJhYmxlIDogZmFsc2U7XG4gIHZhciBub1RhcmdldEdldCA9IG9wdGlvbnMgPyAhIW9wdGlvbnMubm9UYXJnZXRHZXQgOiBmYWxzZTtcbiAgdmFyIHN0YXRlO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiAhaGFzKHZhbHVlLCAnbmFtZScpKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodmFsdWUsICduYW1lJywga2V5KTtcbiAgICB9XG4gICAgc3RhdGUgPSBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSk7XG4gICAgaWYgKCFzdGF0ZS5zb3VyY2UpIHtcbiAgICAgIHN0YXRlLnNvdXJjZSA9IFRFTVBMQVRFLmpvaW4odHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/IGtleSA6ICcnKTtcbiAgICB9XG4gIH1cbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2Ugc2V0R2xvYmFsKGtleSwgdmFsdWUpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICghdW5zYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgfSBlbHNlIGlmICghbm9UYXJnZXRHZXQgJiYgT1trZXldKSB7XG4gICAgc2ltcGxlID0gdHJ1ZTtcbiAgfVxuICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoTywga2V5LCB2YWx1ZSk7XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59KTtcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbiIsICJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT0gJ2Z1bmN0aW9uJyA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwgInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYFRvSW50ZWdlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvaW50ZWdlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzTmFOKGFyZ3VtZW50ID0gK2FyZ3VtZW50KSA/IDAgOiAoYXJndW1lbnQgPiAwID8gZmxvb3IgOiBjZWlsKShhcmd1bWVudCk7XG59O1xuIiwgInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlcihhcmd1bWVudCksIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsICJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwgInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCAidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXMoaGlkZGVuS2V5cywga2V5KSAmJiBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCAiLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCAidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHluYW1lcyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCAiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eXN5bWJvbHMgLS0gc2FmZVxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsICJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCAidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzKHRhcmdldCwga2V5KSkgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICB9XG59O1xuIiwgInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09IFBPTFlGSUxMID8gdHJ1ZVxuICAgIDogdmFsdWUgPT0gTkFUSVZFID8gZmFsc2VcbiAgICA6IHR5cGVvZiBkZXRlY3Rpb24gPT0gJ2Z1bmN0aW9uJyA/IGZhaWxzKGRldGVjdGlvbilcbiAgICA6ICEhZGV0ZWN0aW9uO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGlzRm9yY2VkLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVwbGFjZW1lbnQsICcuJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBkYXRhID0gaXNGb3JjZWQuZGF0YSA9IHt9O1xudmFyIE5BVElWRSA9IGlzRm9yY2VkLk5BVElWRSA9ICdOJztcbnZhciBQT0xZRklMTCA9IGlzRm9yY2VkLlBPTFlGSUxMID0gJ1AnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRm9yY2VkO1xuIiwgInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgc2V0R2xvYmFsKFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwgInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkgJiYgaXQgIT09IG51bGwpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBzZXQgXCIgKyBTdHJpbmcoaXQpICsgJyBhcyBhIHByb3RvdHlwZScpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCAiLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gLS0gc2FmZSAqL1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFQb3NzaWJsZVByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3Qtc2V0cHJvdG90eXBlb2YgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gZnVuY3Rpb24gKCkge1xuICB2YXIgQ09SUkVDVF9TRVRURVIgPSBmYWxzZTtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgdmFyIHNldHRlcjtcbiAgdHJ5IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG4gICAgc2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0O1xuICAgIHNldHRlci5jYWxsKHRlc3QsIFtdKTtcbiAgICBDT1JSRUNUX1NFVFRFUiA9IHRlc3QgaW5zdGFuY2VvZiBBcnJheTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICBhbk9iamVjdChPKTtcbiAgICBhUG9zc2libGVQcm90b3R5cGUocHJvdG8pO1xuICAgIGlmIChDT1JSRUNUX1NFVFRFUikgc2V0dGVyLmNhbGwoTywgcHJvdG8pO1xuICAgIGVsc2UgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICByZXR1cm4gTztcbiAgfTtcbn0oKSA6IHVuZGVmaW5lZCk7XG4iLCAidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRigpIHsgLyogZW1wdHkgKi8gfVxuICBGLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0cHJvdG90eXBlb2YgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgRigpKSAhPT0gRi5wcm90b3R5cGU7XG59KTtcbiIsICJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlcicpO1xuXG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLy8gYE9iamVjdC5nZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRwcm90b3R5cGVvZlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRwcm90b3R5cGVvZiAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90b3R5cGUgOiBudWxsO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCxuby10aHJvdy1saXRlcmFsIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwgInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ25hdmlnYXRvcicsICd1c2VyQWdlbnQnKSB8fCAnJztcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIHZlcnNpb24gPSBtYXRjaFswXSA8IDQgPyAxIDogbWF0Y2hbMF0gKyBtYXRjaFsxXTtcbn0gZWxzZSBpZiAodXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uICYmICt2ZXJzaW9uO1xuIiwgIi8qIGVzbGludC1kaXNhYmxlIGVzL25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xubW9kdWxlLmV4cG9ydHMgPSAhIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN5bWJvbCA9IFN5bWJvbCgpO1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBgZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzYCBwb2x5ZmlsbCBzeW1ib2xzIGNvbnZlcnRlZCB0byBvYmplY3QgYXJlIG5vdCBTeW1ib2wgaW5zdGFuY2VzXG4gIHJldHVybiAhU3RyaW5nKHN5bWJvbCkgfHwgIShPYmplY3Qoc3ltYm9sKSBpbnN0YW5jZW9mIFN5bWJvbCkgfHxcbiAgICAvLyBDaHJvbWUgMzgtNDAgc3ltYm9scyBhcmUgbm90IGluaGVyaXRlZCBmcm9tIERPTSBjb2xsZWN0aW9ucyBwcm90b3R5cGVzIHRvIGluc3RhbmNlc1xuICAgICFTeW1ib2wuc2hhbSAmJiBWOF9WRVJTSU9OICYmIFY4X1ZFUlNJT04gPCA0MTtcbn0pO1xuIiwgIi8qIGVzbGludC1kaXNhYmxlIGVzL25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9TWU1CT0xcbiAgJiYgIVN5bWJvbC5zaGFtXG4gICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCc7XG4iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhcyhXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpIHx8ICEoTkFUSVZFX1NZTUJPTCB8fCB0eXBlb2YgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID09ICdzdHJpbmcnKSkge1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhcyhTeW1ib2wsIG5hbWUpKSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IGNyZWF0ZVdlbGxLbm93blN5bWJvbCgnU3ltYm9sLicgKyBuYW1lKTtcbiAgICB9XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCAidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciB0ZXN0ID0ge307XG5cbnRlc3RbVE9fU1RSSU5HX1RBR10gPSAneic7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nKHRlc3QpID09PSAnW29iamVjdCB6XSc7XG4iLCAidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBDT1JSRUNUX0FSR1VNRU5UUyA9IGNsYXNzb2ZSYXcoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gRVM2KyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2Bcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8gY2xhc3NvZlJhdyA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgdGFnLCByZXN1bHQ7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mICh0YWcgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRPX1NUUklOR19UQUcpKSA9PSAnc3RyaW5nJyA/IHRhZ1xuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQ09SUkVDVF9BUkdVTUVOVFMgPyBjbGFzc29mUmF3KE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKHJlc3VsdCA9IGNsYXNzb2ZSYXcoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiByZXN1bHQ7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyB7fS50b1N0cmluZyA6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NgIGdldHRlciBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LmRvdEFsbCkgcmVzdWx0ICs9ICdzJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsICJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwgInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWtleXMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwgInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnRpZXMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSA9IGtleXNbaW5kZXgrK10sIFByb3BlcnRpZXNba2V5XSk7XG4gIHJldHVybiBPO1xufTtcbiIsICJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsICJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGRvY3VtZW50Q3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG5cbnZhciBHVCA9ICc+JztcbnZhciBMVCA9ICc8JztcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBTQ1JJUFQgPSAnc2NyaXB0JztcbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcblxudmFyIEVtcHR5Q29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cbnZhciBzY3JpcHRUYWcgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICByZXR1cm4gTFQgKyBTQ1JJUFQgKyBHVCArIGNvbnRlbnQgKyBMVCArICcvJyArIFNDUklQVCArIEdUO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIEFjdGl2ZVggT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYID0gZnVuY3Rpb24gKGFjdGl2ZVhEb2N1bWVudCkge1xuICBhY3RpdmVYRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCcnKSk7XG4gIGFjdGl2ZVhEb2N1bWVudC5jbG9zZSgpO1xuICB2YXIgdGVtcCA9IGFjdGl2ZVhEb2N1bWVudC5wYXJlbnRXaW5kb3cuT2JqZWN0O1xuICBhY3RpdmVYRG9jdW1lbnQgPSBudWxsOyAvLyBhdm9pZCBtZW1vcnkgbGVha1xuICByZXR1cm4gdGVtcDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudENyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICB2YXIgSlMgPSAnamF2YScgKyBTQ1JJUFQgKyAnOic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzQ3NVxuICBpZnJhbWUuc3JjID0gU3RyaW5nKEpTKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJ2RvY3VtZW50LkY9T2JqZWN0JykpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICByZXR1cm4gaWZyYW1lRG9jdW1lbnQuRjtcbn07XG5cbi8vIENoZWNrIGZvciBkb2N1bWVudC5kb21haW4gYW5kIGFjdGl2ZSB4IHN1cHBvcnRcbi8vIE5vIG5lZWQgdG8gdXNlIGFjdGl2ZSB4IGFwcHJvYWNoIHdoZW4gZG9jdW1lbnQuZG9tYWluIGlzIG5vdCBzZXRcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW0vaXNzdWVzLzE1MFxuLy8gdmFyaWF0aW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9raXRjYW1icmlkZ2UvZXM1LXNoaW0vY29tbWl0LzRmNzM4YWMwNjYzNDZcbi8vIGF2b2lkIElFIEdDIGJ1Z1xudmFyIGFjdGl2ZVhEb2N1bWVudDtcbnZhciBOdWxsUHJvdG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLyogZ2xvYmFsIEFjdGl2ZVhPYmplY3QgLS0gb2xkIElFICovXG4gICAgYWN0aXZlWERvY3VtZW50ID0gZG9jdW1lbnQuZG9tYWluICYmIG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBpZ25vcmUgKi8gfVxuICBOdWxsUHJvdG9PYmplY3QgPSBhY3RpdmVYRG9jdW1lbnQgPyBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYKGFjdGl2ZVhEb2N1bWVudCkgOiBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUoKTtcbiAgdmFyIGxlbmd0aCA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSBkZWxldGUgTnVsbFByb3RvT2JqZWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbbGVuZ3RoXV07XG4gIHJldHVybiBOdWxsUHJvdG9PYmplY3QoKTtcbn07XG5cbmhpZGRlbktleXNbSUVfUFJPVE9dID0gdHJ1ZTtcblxuLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHlDb25zdHJ1Y3RvcigpO1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gTnVsbFByb3RvT2JqZWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgc2xpY2UgPSBbXS5zbGljZTtcbnZhciBmYWN0b3JpZXMgPSB7fTtcblxudmFyIGNvbnN0cnVjdCA9IGZ1bmN0aW9uIChDLCBhcmdzTGVuZ3RoLCBhcmdzKSB7XG4gIGlmICghKGFyZ3NMZW5ndGggaW4gZmFjdG9yaWVzKSkge1xuICAgIGZvciAodmFyIGxpc3QgPSBbXSwgaSA9IDA7IGkgPCBhcmdzTGVuZ3RoOyBpKyspIGxpc3RbaV0gPSAnYVsnICsgaSArICddJztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmMgLS0gd2UgaGF2ZSBubyBwcm9wZXIgYWx0ZXJuYXRpdmVzLCBJRTgtIG9ubHlcbiAgICBmYWN0b3JpZXNbYXJnc0xlbmd0aF0gPSBGdW5jdGlvbignQyxhJywgJ3JldHVybiBuZXcgQygnICsgbGlzdC5qb2luKCcsJykgKyAnKScpO1xuICB9IHJldHVybiBmYWN0b3JpZXNbYXJnc0xlbmd0aF0oQywgYXJncyk7XG59O1xuXG4vLyBgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1mdW5jdGlvbi5wcm90b3R5cGUuYmluZFxubW9kdWxlLmV4cG9ydHMgPSBGdW5jdGlvbi5iaW5kIHx8IGZ1bmN0aW9uIGJpbmQodGhhdCAvKiAsIC4uLmFyZ3MgKi8pIHtcbiAgdmFyIGZuID0gYUZ1bmN0aW9uKHRoaXMpO1xuICB2YXIgcGFydEFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHZhciBib3VuZEZ1bmN0aW9uID0gZnVuY3Rpb24gYm91bmQoLyogYXJncy4uLiAqLykge1xuICAgIHZhciBhcmdzID0gcGFydEFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBib3VuZEZ1bmN0aW9uID8gY29uc3RydWN0KGZuLCBhcmdzLmxlbmd0aCwgYXJncykgOiBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbiAgfTtcbiAgaWYgKGlzT2JqZWN0KGZuLnByb3RvdHlwZSkpIGJvdW5kRnVuY3Rpb24ucHJvdG90eXBlID0gZm4ucHJvdG90eXBlO1xuICByZXR1cm4gYm91bmRGdW5jdGlvbjtcbn07XG4iLCAidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG52YXIgVU5TQ09QQUJMRVMgPSB3ZWxsS25vd25TeW1ib2woJ3Vuc2NvcGFibGVzJyk7XG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbi8vIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuaWYgKEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpIHtcbiAgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihBcnJheVByb3RvdHlwZSwgVU5TQ09QQUJMRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGNyZWF0ZShudWxsKVxuICB9KTtcbn1cblxuLy8gYWRkIGEga2V5IHRvIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCAibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gZmFsc2U7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxuLy8gYCVJdGVyYXRvclByb3RvdHlwZSVgIG9iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0laXRlcmF0b3Jwcm90b3R5cGUlLW9iamVjdFxudmFyIEl0ZXJhdG9yUHJvdG90eXBlLCBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUsIGFycmF5SXRlcmF0b3I7XG5cbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLWFycmF5LXByb3RvdHlwZS1rZXlzIC0tIHNhZmUgKi9cbmlmIChbXS5rZXlzKSB7XG4gIGFycmF5SXRlcmF0b3IgPSBbXS5rZXlzKCk7XG4gIC8vIFNhZmFyaSA4IGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICBpZiAoISgnbmV4dCcgaW4gYXJyYXlJdGVyYXRvcikpIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSB0cnVlO1xuICBlbHNlIHtcbiAgICBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihnZXRQcm90b3R5cGVPZihhcnJheUl0ZXJhdG9yKSk7XG4gICAgaWYgKFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkgSXRlcmF0b3JQcm90b3R5cGUgPSBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cbn1cblxudmFyIE5FV19JVEVSQVRPUl9QUk9UT1RZUEUgPSBJdGVyYXRvclByb3RvdHlwZSA9PSB1bmRlZmluZWQgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgdGVzdCA9IHt9O1xuICAvLyBGRjQ0LSBsZWdhY3kgaXRlcmF0b3JzIGNhc2VcbiAgcmV0dXJuIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXS5jYWxsKHRlc3QpICE9PSB0ZXN0O1xufSk7XG5cbmlmIChORVdfSVRFUkFUT1JfUFJPVE9UWVBFKSBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWl0ZXJhdG9ycHJvdG90eXBlJS1AQGl0ZXJhdG9yXG5pZiAoKCFJU19QVVJFIHx8IE5FV19JVEVSQVRPUl9QUk9UT1RZUEUpICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSkge1xuICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEl0ZXJhdG9yUHJvdG90eXBlOiBJdGVyYXRvclByb3RvdHlwZSxcbiAgQlVHR1lfU0FGQVJJX0lURVJBVE9SUzogQlVHR1lfU0FGQVJJX0lURVJBVE9SU1xufTtcbiIsICJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFRBRywgU1RBVElDKSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gU1RBVElDID8gaXQgOiBpdC5wcm90b3R5cGUsIFRPX1NUUklOR19UQUcpKSB7XG4gICAgZGVmaW5lUHJvcGVydHkoaXQsIFRPX1NUUklOR19UQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogVEFHIH0pO1xuICB9XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgSXRlcmF0b3JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3RvcicpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJdGVyYXRvcnNDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlJyk7XG5cbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IEl0ZXJhdG9yc0NvcmUuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IEl0ZXJhdG9yc0NvcmUuQlVHR1lfU0FGQVJJX0lURVJBVE9SUztcbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xudmFyIEVOVFJJRVMgPSAnZW50cmllcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmFibGUsIE5BTUUsIEl0ZXJhdG9yQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG5cbiAgdmFyIGdldEl0ZXJhdGlvbk1ldGhvZCA9IGZ1bmN0aW9uIChLSU5EKSB7XG4gICAgaWYgKEtJTkQgPT09IERFRkFVTFQgJiYgZGVmYXVsdEl0ZXJhdG9yKSByZXR1cm4gZGVmYXVsdEl0ZXJhdG9yO1xuICAgIGlmICghQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBLSU5EIGluIEl0ZXJhYmxlUHJvdG90eXBlKSByZXR1cm4gSXRlcmFibGVQcm90b3R5cGVbS0lORF07XG4gICAgc3dpdGNoIChLSU5EKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBFTlRSSUVTOiByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMpOyB9O1xuICB9O1xuXG4gIHZhciBUT19TVFJJTkdfVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gZmFsc2U7XG4gIHZhciBJdGVyYWJsZVByb3RvdHlwZSA9IEl0ZXJhYmxlLnByb3RvdHlwZTtcbiAgdmFyIG5hdGl2ZUl0ZXJhdG9yID0gSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdXG4gICAgfHwgSXRlcmFibGVQcm90b3R5cGVbJ0BAaXRlcmF0b3InXVxuICAgIHx8IERFRkFVTFQgJiYgSXRlcmFibGVQcm90b3R5cGVbREVGQVVMVF07XG4gIHZhciBkZWZhdWx0SXRlcmF0b3IgPSAhQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBuYXRpdmVJdGVyYXRvciB8fCBnZXRJdGVyYXRpb25NZXRob2QoREVGQVVMVCk7XG4gIHZhciBhbnlOYXRpdmVJdGVyYXRvciA9IE5BTUUgPT0gJ0FycmF5JyA/IEl0ZXJhYmxlUHJvdG90eXBlLmVudHJpZXMgfHwgbmF0aXZlSXRlcmF0b3IgOiBuYXRpdmVJdGVyYXRvcjtcbiAgdmFyIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgbWV0aG9kcywgS0VZO1xuXG4gIC8vIGZpeCBuYXRpdmVcbiAgaWYgKGFueU5hdGl2ZUl0ZXJhdG9yKSB7XG4gICAgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoYW55TmF0aXZlSXRlcmF0b3IuY2FsbChuZXcgSXRlcmFibGUoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgaWYgKCFJU19QVVJFICYmIGdldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSkgIT09IEl0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgICAgIGlmIChzZXRQcm90b3R5cGVPZikge1xuICAgICAgICAgIHNldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSXRlcmF0b3JQcm90b3R5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBpZiAoSVNfUFVSRSkgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgICB9XG4gIH1cblxuICAvLyBmaXggQXJyYXkucHJvdG90eXBlLnsgdmFsdWVzLCBAQGl0ZXJhdG9yIH0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZBVUxUID09IFZBTFVFUyAmJiBuYXRpdmVJdGVyYXRvciAmJiBuYXRpdmVJdGVyYXRvci5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSB0cnVlO1xuICAgIGRlZmF1bHRJdGVyYXRvciA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5hdGl2ZUl0ZXJhdG9yLmNhbGwodGhpcyk7IH07XG4gIH1cblxuICAvLyBkZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghSVNfUFVSRSB8fCBGT1JDRUQpICYmIEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXSAhPT0gZGVmYXVsdEl0ZXJhdG9yKSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEl0ZXJhYmxlUHJvdG90eXBlLCBJVEVSQVRPUiwgZGVmYXVsdEl0ZXJhdG9yKTtcbiAgfVxuICBJdGVyYXRvcnNbTkFNRV0gPSBkZWZhdWx0SXRlcmF0b3I7XG5cbiAgLy8gZXhwb3J0IGFkZGl0aW9uYWwgbWV0aG9kc1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gZGVmYXVsdEl0ZXJhdG9yIDogZ2V0SXRlcmF0aW9uTWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogZ2V0SXRlcmF0aW9uTWV0aG9kKEVOVFJJRVMpXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKEtFWSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfHwgIShLRVkgaW4gSXRlcmFibGVQcm90b3R5cGUpKSB7XG4gICAgICAgIHJlZGVmaW5lKEl0ZXJhYmxlUHJvdG90eXBlLCBLRVksIG1ldGhvZHNbS0VZXSk7XG4gICAgICB9XG4gICAgfSBlbHNlICQoeyB0YXJnZXQ6IE5BTUUsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIH0sIG1ldGhvZHMpO1xuICB9XG5cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBBUlJBWV9JVEVSQVRPUiA9ICdBcnJheSBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihBUlJBWV9JVEVSQVRPUik7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5lbnRyaWVzXG4vLyBgQXJyYXkucHJvdG90eXBlLmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUua2V5c1xuLy8gYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUudmFsdWVzXG4vLyBgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAaXRlcmF0b3Jcbi8vIGBDcmVhdGVBcnJheUl0ZXJhdG9yYCBpbnRlcm5hbCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRlYXJyYXlpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVJdGVyYXRvcihBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IEFSUkFZX0lURVJBVE9SLFxuICAgIHRhcmdldDogdG9JbmRleGVkT2JqZWN0KGl0ZXJhdGVkKSwgLy8gdGFyZ2V0XG4gICAgaW5kZXg6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gICAga2luZDoga2luZCAgICAgICAgICAgICAgICAgICAgICAgICAvLyBraW5kXG4gIH0pO1xuLy8gYCVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWFycmF5aXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHRhcmdldCA9IHN0YXRlLnRhcmdldDtcbiAgdmFyIGtpbmQgPSBzdGF0ZS5raW5kO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleCsrO1xuICBpZiAoIXRhcmdldCB8fCBpbmRleCA+PSB0YXJnZXQubGVuZ3RoKSB7XG4gICAgc3RhdGUudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiB7IHZhbHVlOiBpbmRleCwgZG9uZTogZmFsc2UgfTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiB7IHZhbHVlOiB0YXJnZXRbaW5kZXhdLCBkb25lOiBmYWxzZSB9O1xuICByZXR1cm4geyB2YWx1ZTogW2luZGV4LCB0YXJnZXRbaW5kZXhdXSwgZG9uZTogZmFsc2UgfTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZXVubWFwcGVkYXJndW1lbnRzb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZW1hcHBlZGFyZ3VtZW50c29iamVjdFxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCAidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1pc2V4dGVuc2libGUsIGVzL25vLW9iamVjdC1wcmV2ZW50ZXh0ZW5zaW9ucyAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xuIiwgInZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBGUkVFWklORyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mcmVlemluZycpO1xuXG52YXIgTUVUQURBVEEgPSB1aWQoJ21ldGEnKTtcbnZhciBpZCA9IDA7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtaXNleHRlbnNpYmxlIC0tIHNhZmVcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG52YXIgc2V0TWV0YWRhdGEgPSBmdW5jdGlvbiAoaXQpIHtcbiAgZGVmaW5lUHJvcGVydHkoaXQsIE1FVEFEQVRBLCB7IHZhbHVlOiB7XG4gICAgb2JqZWN0SUQ6ICdPJyArIGlkKyssIC8vIG9iamVjdCBJRFxuICAgIHdlYWtEYXRhOiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IH0pO1xufTtcblxudmFyIGZhc3RLZXkgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICAvLyByZXR1cm4gYSBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBREFUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YWRhdGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFEQVRBXS5vYmplY3RJRDtcbn07XG5cbnZhciBnZXRXZWFrRGF0YSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIGlmICghaGFzKGl0LCBNRVRBREFUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YWRhdGEoaXQpO1xuICAvLyByZXR1cm4gdGhlIHN0b3JlIG9mIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFEQVRBXS53ZWFrRGF0YTtcbn07XG5cbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWklORyAmJiBtZXRhLlJFUVVJUkVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQURBVEEpKSBzZXRNZXRhZGF0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFUVVJUkVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2Vha0RhdGE6IGdldFdlYWtEYXRhLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG5cbmhpZGRlbktleXNbTUVUQURBVEFdID0gdHJ1ZTtcbiIsICJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG90eXBlW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcbiIsICJ2YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcblxuLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0KTtcbiAgICB9O1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsICJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCAidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvcikge1xuICB2YXIgcmV0dXJuTWV0aG9kID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICBpZiAocmV0dXJuTWV0aG9kICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYW5PYmplY3QocmV0dXJuTWV0aG9kLmNhbGwoaXRlcmF0b3IpKS52YWx1ZTtcbiAgfVxufTtcbiIsICJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNBcnJheUl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgZ2V0SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIGl0ZXJhdG9yQ2xvc2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY2xvc2UnKTtcblxudmFyIFJlc3VsdCA9IGZ1bmN0aW9uIChzdG9wcGVkLCByZXN1bHQpIHtcbiAgdGhpcy5zdG9wcGVkID0gc3RvcHBlZDtcbiAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgdW5ib3VuZEZ1bmN0aW9uLCBvcHRpb25zKSB7XG4gIHZhciB0aGF0ID0gb3B0aW9ucyAmJiBvcHRpb25zLnRoYXQ7XG4gIHZhciBBU19FTlRSSUVTID0gISEob3B0aW9ucyAmJiBvcHRpb25zLkFTX0VOVFJJRVMpO1xuICB2YXIgSVNfSVRFUkFUT1IgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuSVNfSVRFUkFUT1IpO1xuICB2YXIgSU5URVJSVVBURUQgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuSU5URVJSVVBURUQpO1xuICB2YXIgZm4gPSBiaW5kKHVuYm91bmRGdW5jdGlvbiwgdGhhdCwgMSArIEFTX0VOVFJJRVMgKyBJTlRFUlJVUFRFRCk7XG4gIHZhciBpdGVyYXRvciwgaXRlckZuLCBpbmRleCwgbGVuZ3RoLCByZXN1bHQsIG5leHQsIHN0ZXA7XG5cbiAgdmFyIHN0b3AgPSBmdW5jdGlvbiAoY29uZGl0aW9uKSB7XG4gICAgaWYgKGl0ZXJhdG9yKSBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcbiAgICByZXR1cm4gbmV3IFJlc3VsdCh0cnVlLCBjb25kaXRpb24pO1xuICB9O1xuXG4gIHZhciBjYWxsRm4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoQVNfRU5UUklFUykge1xuICAgICAgYW5PYmplY3QodmFsdWUpO1xuICAgICAgcmV0dXJuIElOVEVSUlVQVEVEID8gZm4odmFsdWVbMF0sIHZhbHVlWzFdLCBzdG9wKSA6IGZuKHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG4gICAgfSByZXR1cm4gSU5URVJSVVBURUQgPyBmbih2YWx1ZSwgc3RvcCkgOiBmbih2YWx1ZSk7XG4gIH07XG5cbiAgaWYgKElTX0lURVJBVE9SKSB7XG4gICAgaXRlcmF0b3IgPSBpdGVyYWJsZTtcbiAgfSBlbHNlIHtcbiAgICBpdGVyRm4gPSBnZXRJdGVyYXRvck1ldGhvZChpdGVyYWJsZSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKCdUYXJnZXQgaXMgbm90IGl0ZXJhYmxlJyk7XG4gICAgLy8gb3B0aW1pc2F0aW9uIGZvciBhcnJheSBpdGVyYXRvcnNcbiAgICBpZiAoaXNBcnJheUl0ZXJhdG9yTWV0aG9kKGl0ZXJGbikpIHtcbiAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgICByZXN1bHQgPSBjYWxsRm4oaXRlcmFibGVbaW5kZXhdKTtcbiAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQgaW5zdGFuY2VvZiBSZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICB9IHJldHVybiBuZXcgUmVzdWx0KGZhbHNlKTtcbiAgICB9XG4gICAgaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7XG4gIH1cblxuICBuZXh0ID0gaXRlcmF0b3IubmV4dDtcbiAgd2hpbGUgKCEoc3RlcCA9IG5leHQuY2FsbChpdGVyYXRvcikpLmRvbmUpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gY2FsbEZuKHN0ZXAudmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAnb2JqZWN0JyAmJiByZXN1bHQgJiYgcmVzdWx0IGluc3RhbmNlb2YgUmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICB9IHJldHVybiBuZXcgUmVzdWx0KGZhbHNlKTtcbn07XG4iLCAibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvcnJlY3QgJyArIChuYW1lID8gbmFtZSArICcgJyA6ICcnKSArICdpbnZvY2F0aW9uJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsICJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIGNhbGxlZCA9IDA7XG4gIHZhciBpdGVyYXRvcldpdGhSZXR1cm4gPSB7XG4gICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHsgZG9uZTogISFjYWxsZWQrKyB9O1xuICAgIH0sXG4gICAgJ3JldHVybic6IGZ1bmN0aW9uICgpIHtcbiAgICAgIFNBRkVfQ0xPU0lORyA9IHRydWU7XG4gICAgfVxuICB9O1xuICBpdGVyYXRvcldpdGhSZXR1cm5bSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktZnJvbSwgbm8tdGhyb3ctbGl0ZXJhbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICBBcnJheS5mcm9tKGl0ZXJhdG9yV2l0aFJldHVybiwgZnVuY3Rpb24gKCkgeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYywgU0tJUF9DTE9TSU5HKSB7XG4gIGlmICghU0tJUF9DTE9TSU5HICYmICFTQUZFX0NMT1NJTkcpIHJldHVybiBmYWxzZTtcbiAgdmFyIElURVJBVElPTl9TVVBQT1JUID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIG9iamVjdCA9IHt9O1xuICAgIG9iamVjdFtJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHsgZG9uZTogSVRFUkFUSU9OX1NVUFBPUlQgPSB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICBleGVjKG9iamVjdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIElURVJBVElPTl9TVVBQT1JUO1xufTtcbiIsICJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcblxuLy8gbWFrZXMgc3ViY2xhc3Npbmcgd29yayBjb3JyZWN0IGZvciB3cmFwcGVkIGJ1aWx0LWluc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHRoaXMsIGR1bW15LCBXcmFwcGVyKSB7XG4gIHZhciBOZXdUYXJnZXQsIE5ld1RhcmdldFByb3RvdHlwZTtcbiAgaWYgKFxuICAgIC8vIGl0IGNhbiB3b3JrIG9ubHkgd2l0aCBuYXRpdmUgYHNldFByb3RvdHlwZU9mYFxuICAgIHNldFByb3RvdHlwZU9mICYmXG4gICAgLy8gd2UgaGF2ZW4ndCBjb21wbGV0ZWx5IGNvcnJlY3QgcHJlLUVTNiB3YXkgZm9yIGdldHRpbmcgYG5ldy50YXJnZXRgLCBzbyB1c2UgdGhpc1xuICAgIHR5cGVvZiAoTmV3VGFyZ2V0ID0gZHVtbXkuY29uc3RydWN0b3IpID09ICdmdW5jdGlvbicgJiZcbiAgICBOZXdUYXJnZXQgIT09IFdyYXBwZXIgJiZcbiAgICBpc09iamVjdChOZXdUYXJnZXRQcm90b3R5cGUgPSBOZXdUYXJnZXQucHJvdG90eXBlKSAmJlxuICAgIE5ld1RhcmdldFByb3RvdHlwZSAhPT0gV3JhcHBlci5wcm90b3R5cGVcbiAgKSBzZXRQcm90b3R5cGVPZigkdGhpcywgTmV3VGFyZ2V0UHJvdG90eXBlKTtcbiAgcmV0dXJuICR0aGlzO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBJbnRlcm5hbE1ldGFkYXRhTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLW1ldGFkYXRhJyk7XG52YXIgaXRlcmF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRlJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1pbnN0YW5jZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2hlY2tDb3JyZWN0bmVzc09mSXRlcmF0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbicpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5oZXJpdC1pZi1yZXF1aXJlZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDT05TVFJVQ1RPUl9OQU1FLCB3cmFwcGVyLCBjb21tb24pIHtcbiAgdmFyIElTX01BUCA9IENPTlNUUlVDVE9SX05BTUUuaW5kZXhPZignTWFwJykgIT09IC0xO1xuICB2YXIgSVNfV0VBSyA9IENPTlNUUlVDVE9SX05BTUUuaW5kZXhPZignV2VhaycpICE9PSAtMTtcbiAgdmFyIEFEREVSID0gSVNfTUFQID8gJ3NldCcgOiAnYWRkJztcbiAgdmFyIE5hdGl2ZUNvbnN0cnVjdG9yID0gZ2xvYmFsW0NPTlNUUlVDVE9SX05BTUVdO1xuICB2YXIgTmF0aXZlUHJvdG90eXBlID0gTmF0aXZlQ29uc3RydWN0b3IgJiYgTmF0aXZlQ29uc3RydWN0b3IucHJvdG90eXBlO1xuICB2YXIgQ29uc3RydWN0b3IgPSBOYXRpdmVDb25zdHJ1Y3RvcjtcbiAgdmFyIGV4cG9ydGVkID0ge307XG5cbiAgdmFyIGZpeE1ldGhvZCA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgICB2YXIgbmF0aXZlTWV0aG9kID0gTmF0aXZlUHJvdG90eXBlW0tFWV07XG4gICAgcmVkZWZpbmUoTmF0aXZlUHJvdG90eXBlLCBLRVksXG4gICAgICBLRVkgPT0gJ2FkZCcgPyBmdW5jdGlvbiBhZGQodmFsdWUpIHtcbiAgICAgICAgbmF0aXZlTWV0aG9kLmNhbGwodGhpcywgdmFsdWUgPT09IDAgPyAwIDogdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gOiBLRVkgPT0gJ2RlbGV0ZScgPyBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiBJU19XRUFLICYmICFpc09iamVjdChrZXkpID8gZmFsc2UgOiBuYXRpdmVNZXRob2QuY2FsbCh0aGlzLCBrZXkgPT09IDAgPyAwIDoga2V5KTtcbiAgICAgIH0gOiBLRVkgPT0gJ2dldCcgPyBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgIHJldHVybiBJU19XRUFLICYmICFpc09iamVjdChrZXkpID8gdW5kZWZpbmVkIDogbmF0aXZlTWV0aG9kLmNhbGwodGhpcywga2V5ID09PSAwID8gMCA6IGtleSk7XG4gICAgICB9IDogS0VZID09ICdoYXMnID8gZnVuY3Rpb24gaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3Qoa2V5KSA/IGZhbHNlIDogbmF0aXZlTWV0aG9kLmNhbGwodGhpcywga2V5ID09PSAwID8gMCA6IGtleSk7XG4gICAgICB9IDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgbmF0aXZlTWV0aG9kLmNhbGwodGhpcywga2V5ID09PSAwID8gMCA6IGtleSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICApO1xuICB9O1xuXG4gIHZhciBSRVBMQUNFID0gaXNGb3JjZWQoXG4gICAgQ09OU1RSVUNUT1JfTkFNRSxcbiAgICB0eXBlb2YgTmF0aXZlQ29uc3RydWN0b3IgIT0gJ2Z1bmN0aW9uJyB8fCAhKElTX1dFQUsgfHwgTmF0aXZlUHJvdG90eXBlLmZvckVhY2ggJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAgIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcigpLmVudHJpZXMoKS5uZXh0KCk7XG4gICAgfSkpXG4gICk7XG5cbiAgaWYgKFJFUExBQ0UpIHtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIENvbnN0cnVjdG9yID0gY29tbW9uLmdldENvbnN0cnVjdG9yKHdyYXBwZXIsIENPTlNUUlVDVE9SX05BTUUsIElTX01BUCwgQURERVIpO1xuICAgIEludGVybmFsTWV0YWRhdGFNb2R1bGUuUkVRVUlSRUQgPSB0cnVlO1xuICB9IGVsc2UgaWYgKGlzRm9yY2VkKENPTlNUUlVDVE9SX05BTUUsIHRydWUpKSB7XG4gICAgdmFyIGluc3RhbmNlID0gbmV3IENvbnN0cnVjdG9yKCk7XG4gICAgLy8gZWFybHkgaW1wbGVtZW50YXRpb25zIG5vdCBzdXBwb3J0cyBjaGFpbmluZ1xuICAgIHZhciBIQVNOVF9DSEFJTklORyA9IGluc3RhbmNlW0FEREVSXShJU19XRUFLID8ge30gOiAtMCwgMSkgIT0gaW5zdGFuY2U7XG4gICAgLy8gVjggfiBDaHJvbWl1bSA0MC0gd2Vhay1jb2xsZWN0aW9ucyB0aHJvd3Mgb24gcHJpbWl0aXZlcywgYnV0IHNob3VsZCByZXR1cm4gZmFsc2VcbiAgICB2YXIgVEhST1dTX09OX1BSSU1JVElWRVMgPSBmYWlscyhmdW5jdGlvbiAoKSB7IGluc3RhbmNlLmhhcygxKTsgfSk7XG4gICAgLy8gbW9zdCBlYXJseSBpbXBsZW1lbnRhdGlvbnMgZG9lc24ndCBzdXBwb3J0cyBpdGVyYWJsZXMsIG1vc3QgbW9kZXJuIC0gbm90IGNsb3NlIGl0IGNvcnJlY3RseVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXcgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgICB2YXIgQUNDRVBUX0lURVJBQkxFUyA9IGNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbihmdW5jdGlvbiAoaXRlcmFibGUpIHsgbmV3IE5hdGl2ZUNvbnN0cnVjdG9yKGl0ZXJhYmxlKTsgfSk7XG4gICAgLy8gZm9yIGVhcmx5IGltcGxlbWVudGF0aW9ucyAtMCBhbmQgKzAgbm90IHRoZSBzYW1lXG4gICAgdmFyIEJVR0dZX1pFUk8gPSAhSVNfV0VBSyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBWOCB+IENocm9taXVtIDQyLSBmYWlscyBvbmx5IHdpdGggNSsgZWxlbWVudHNcbiAgICAgIHZhciAkaW5zdGFuY2UgPSBuZXcgTmF0aXZlQ29uc3RydWN0b3IoKTtcbiAgICAgIHZhciBpbmRleCA9IDU7XG4gICAgICB3aGlsZSAoaW5kZXgtLSkgJGluc3RhbmNlW0FEREVSXShpbmRleCwgaW5kZXgpO1xuICAgICAgcmV0dXJuICEkaW5zdGFuY2UuaGFzKC0wKTtcbiAgICB9KTtcblxuICAgIGlmICghQUNDRVBUX0lURVJBQkxFUykge1xuICAgICAgQ29uc3RydWN0b3IgPSB3cmFwcGVyKGZ1bmN0aW9uIChkdW1teSwgaXRlcmFibGUpIHtcbiAgICAgICAgYW5JbnN0YW5jZShkdW1teSwgQ29uc3RydWN0b3IsIENPTlNUUlVDVE9SX05BTUUpO1xuICAgICAgICB2YXIgdGhhdCA9IGluaGVyaXRJZlJlcXVpcmVkKG5ldyBOYXRpdmVDb25zdHJ1Y3RvcigpLCBkdW1teSwgQ29uc3RydWN0b3IpO1xuICAgICAgICBpZiAoaXRlcmFibGUgIT0gdW5kZWZpbmVkKSBpdGVyYXRlKGl0ZXJhYmxlLCB0aGF0W0FEREVSXSwgeyB0aGF0OiB0aGF0LCBBU19FTlRSSUVTOiBJU19NQVAgfSk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgICAgfSk7XG4gICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBOYXRpdmVQcm90b3R5cGU7XG4gICAgICBOYXRpdmVQcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICB9XG5cbiAgICBpZiAoVEhST1dTX09OX1BSSU1JVElWRVMgfHwgQlVHR1lfWkVSTykge1xuICAgICAgZml4TWV0aG9kKCdkZWxldGUnKTtcbiAgICAgIGZpeE1ldGhvZCgnaGFzJyk7XG4gICAgICBJU19NQVAgJiYgZml4TWV0aG9kKCdnZXQnKTtcbiAgICB9XG5cbiAgICBpZiAoQlVHR1lfWkVSTyB8fCBIQVNOVF9DSEFJTklORykgZml4TWV0aG9kKEFEREVSKTtcblxuICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgc2hvdWxkIG5vdCBjb250YWlucyAuY2xlYXIgbWV0aG9kXG4gICAgaWYgKElTX1dFQUsgJiYgTmF0aXZlUHJvdG90eXBlLmNsZWFyKSBkZWxldGUgTmF0aXZlUHJvdG90eXBlLmNsZWFyO1xuICB9XG5cbiAgZXhwb3J0ZWRbQ09OU1RSVUNUT1JfTkFNRV0gPSBDb25zdHJ1Y3RvcjtcbiAgJCh7IGdsb2JhbDogdHJ1ZSwgZm9yY2VkOiBDb25zdHJ1Y3RvciAhPSBOYXRpdmVDb25zdHJ1Y3RvciB9LCBleHBvcnRlZCk7XG5cbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIENPTlNUUlVDVE9SX05BTUUpO1xuXG4gIGlmICghSVNfV0VBSykgY29tbW9uLnNldFN0cm9uZyhDb25zdHJ1Y3RvciwgQ09OU1RSVUNUT1JfTkFNRSwgSVNfTUFQKTtcblxuICByZXR1cm4gQ29uc3RydWN0b3I7XG59O1xuIiwgInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgb3B0aW9ucykge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSByZWRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0sIG9wdGlvbnMpO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09OU1RSVUNUT1JfTkFNRSkge1xuICB2YXIgQ29uc3RydWN0b3IgPSBnZXRCdWlsdEluKENPTlNUUlVDVE9SX05BTUUpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuXG4gIGlmIChERVNDUklQVE9SUyAmJiBDb25zdHJ1Y3RvciAmJiAhQ29uc3RydWN0b3JbU1BFQ0lFU10pIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgU1BFQ0lFUywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gICAgfSk7XG4gIH1cbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUtYWxsJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLWluc3RhbmNlJyk7XG52YXIgaXRlcmF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG52YXIgc2V0U3BlY2llcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtc3BlY2llcycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFzdEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1tZXRhZGF0YScpLmZhc3RLZXk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xuXG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGludGVybmFsU3RhdGVHZXR0ZXJGb3IgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvbnN0cnVjdG9yOiBmdW5jdGlvbiAod3JhcHBlciwgQ09OU1RSVUNUT1JfTkFNRSwgSVNfTUFQLCBBRERFUikge1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbiAodGhhdCwgaXRlcmFibGUpIHtcbiAgICAgIGFuSW5zdGFuY2UodGhhdCwgQywgQ09OU1RSVUNUT1JfTkFNRSk7XG4gICAgICBzZXRJbnRlcm5hbFN0YXRlKHRoYXQsIHtcbiAgICAgICAgdHlwZTogQ09OU1RSVUNUT1JfTkFNRSxcbiAgICAgICAgaW5kZXg6IGNyZWF0ZShudWxsKSxcbiAgICAgICAgZmlyc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgbGFzdDogdW5kZWZpbmVkLFxuICAgICAgICBzaXplOiAwXG4gICAgICB9KTtcbiAgICAgIGlmICghREVTQ1JJUFRPUlMpIHRoYXQuc2l6ZSA9IDA7XG4gICAgICBpZiAoaXRlcmFibGUgIT0gdW5kZWZpbmVkKSBpdGVyYXRlKGl0ZXJhYmxlLCB0aGF0W0FEREVSXSwgeyB0aGF0OiB0aGF0LCBBU19FTlRSSUVTOiBJU19NQVAgfSk7XG4gICAgfSk7XG5cbiAgICB2YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IGludGVybmFsU3RhdGVHZXR0ZXJGb3IoQ09OU1RSVUNUT1JfTkFNRSk7XG5cbiAgICB2YXIgZGVmaW5lID0gZnVuY3Rpb24gKHRoYXQsIGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhhdCk7XG4gICAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgdmFyIHByZXZpb3VzLCBpbmRleDtcbiAgICAgIC8vIGNoYW5nZSBleGlzdGluZyBlbnRyeVxuICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgIGVudHJ5LnZhbHVlID0gdmFsdWU7XG4gICAgICAvLyBjcmVhdGUgbmV3IGVudHJ5XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5sYXN0ID0gZW50cnkgPSB7XG4gICAgICAgICAgaW5kZXg6IGluZGV4ID0gZmFzdEtleShrZXksIHRydWUpLFxuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICBwcmV2aW91czogcHJldmlvdXMgPSBzdGF0ZS5sYXN0LFxuICAgICAgICAgIG5leHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICByZW1vdmVkOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICBpZiAoIXN0YXRlLmZpcnN0KSBzdGF0ZS5maXJzdCA9IGVudHJ5O1xuICAgICAgICBpZiAocHJldmlvdXMpIHByZXZpb3VzLm5leHQgPSBlbnRyeTtcbiAgICAgICAgaWYgKERFU0NSSVBUT1JTKSBzdGF0ZS5zaXplKys7XG4gICAgICAgIGVsc2UgdGhhdC5zaXplKys7XG4gICAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgICBpZiAoaW5kZXggIT09ICdGJykgc3RhdGUuaW5kZXhbaW5kZXhdID0gZW50cnk7XG4gICAgICB9IHJldHVybiB0aGF0O1xuICAgIH07XG5cbiAgICB2YXIgZ2V0RW50cnkgPSBmdW5jdGlvbiAodGhhdCwga2V5KSB7XG4gICAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoYXQpO1xuICAgICAgLy8gZmFzdCBjYXNlXG4gICAgICB2YXIgaW5kZXggPSBmYXN0S2V5KGtleSk7XG4gICAgICB2YXIgZW50cnk7XG4gICAgICBpZiAoaW5kZXggIT09ICdGJykgcmV0dXJuIHN0YXRlLmluZGV4W2luZGV4XTtcbiAgICAgIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICAgICAgZm9yIChlbnRyeSA9IHN0YXRlLmZpcnN0OyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uZXh0KSB7XG4gICAgICAgIGlmIChlbnRyeS5rZXkgPT0ga2V5KSByZXR1cm4gZW50cnk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyBgeyBNYXAsIFNldCB9LnByb3RvdHlwZS5jbGVhcigpYCBtZXRob2RzXG4gICAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW1hcC5wcm90b3R5cGUuY2xlYXJcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc2V0LnByb3RvdHlwZS5jbGVhclxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhhdCk7XG4gICAgICAgIHZhciBkYXRhID0gc3RhdGUuaW5kZXg7XG4gICAgICAgIHZhciBlbnRyeSA9IHN0YXRlLmZpcnN0O1xuICAgICAgICB3aGlsZSAoZW50cnkpIHtcbiAgICAgICAgICBlbnRyeS5yZW1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoZW50cnkucHJldmlvdXMpIGVudHJ5LnByZXZpb3VzID0gZW50cnkucHJldmlvdXMubmV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pbmRleF07XG4gICAgICAgICAgZW50cnkgPSBlbnRyeS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmZpcnN0ID0gc3RhdGUubGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKERFU0NSSVBUT1JTKSBzdGF0ZS5zaXplID0gMDtcbiAgICAgICAgZWxzZSB0aGF0LnNpemUgPSAwO1xuICAgICAgfSxcbiAgICAgIC8vIGB7IE1hcCwgU2V0IH0ucHJvdG90eXBlLmRlbGV0ZShrZXkpYCBtZXRob2RzXG4gICAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW1hcC5wcm90b3R5cGUuZGVsZXRlXG4gICAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXNldC5wcm90b3R5cGUuZGVsZXRlXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhhdCk7XG4gICAgICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSk7XG4gICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgIHZhciBuZXh0ID0gZW50cnkubmV4dDtcbiAgICAgICAgICB2YXIgcHJldiA9IGVudHJ5LnByZXZpb3VzO1xuICAgICAgICAgIGRlbGV0ZSBzdGF0ZS5pbmRleFtlbnRyeS5pbmRleF07XG4gICAgICAgICAgZW50cnkucmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKHByZXYpIHByZXYubmV4dCA9IG5leHQ7XG4gICAgICAgICAgaWYgKG5leHQpIG5leHQucHJldmlvdXMgPSBwcmV2O1xuICAgICAgICAgIGlmIChzdGF0ZS5maXJzdCA9PSBlbnRyeSkgc3RhdGUuZmlyc3QgPSBuZXh0O1xuICAgICAgICAgIGlmIChzdGF0ZS5sYXN0ID09IGVudHJ5KSBzdGF0ZS5sYXN0ID0gcHJldjtcbiAgICAgICAgICBpZiAoREVTQ1JJUFRPUlMpIHN0YXRlLnNpemUtLTtcbiAgICAgICAgICBlbHNlIHRoYXQuc2l6ZS0tO1xuICAgICAgICB9IHJldHVybiAhIWVudHJ5O1xuICAgICAgfSxcbiAgICAgIC8vIGB7IE1hcCwgU2V0IH0ucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClgIG1ldGhvZHNcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWFwLnByb3RvdHlwZS5mb3JlYWNoXG4gICAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXNldC5wcm90b3R5cGUuZm9yZWFjaFxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhhdCA9IHVuZGVmaW5lZCAqLykge1xuICAgICAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICAgICAgICB2YXIgYm91bmRGdW5jdGlvbiA9IGJpbmQoY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIDMpO1xuICAgICAgICB2YXIgZW50cnk7XG4gICAgICAgIHdoaWxlIChlbnRyeSA9IGVudHJ5ID8gZW50cnkubmV4dCA6IHN0YXRlLmZpcnN0KSB7XG4gICAgICAgICAgYm91bmRGdW5jdGlvbihlbnRyeS52YWx1ZSwgZW50cnkua2V5LCB0aGlzKTtcbiAgICAgICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgICAgICB3aGlsZSAoZW50cnkgJiYgZW50cnkucmVtb3ZlZCkgZW50cnkgPSBlbnRyeS5wcmV2aW91cztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIGB7IE1hcCwgU2V0fS5wcm90b3R5cGUuaGFzKGtleSlgIG1ldGhvZHNcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWFwLnByb3RvdHlwZS5oYXNcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc2V0LnByb3RvdHlwZS5oYXNcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gISFnZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIElTX01BUCA/IHtcbiAgICAgIC8vIGBNYXAucHJvdG90eXBlLmdldChrZXkpYCBtZXRob2RcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWFwLnByb3RvdHlwZS5nZXRcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnkudmFsdWU7XG4gICAgICB9LFxuICAgICAgLy8gYE1hcC5wcm90b3R5cGUuc2V0KGtleSwgdmFsdWUpYCBtZXRob2RcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWFwLnByb3RvdHlwZS5zZXRcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGRlZmluZSh0aGlzLCBrZXkgPT09IDAgPyAwIDoga2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSA6IHtcbiAgICAgIC8vIGBTZXQucHJvdG90eXBlLmFkZCh2YWx1ZSlgIG1ldGhvZFxuICAgICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zZXQucHJvdG90eXBlLmFkZFxuICAgICAgYWRkOiBmdW5jdGlvbiBhZGQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGRlZmluZSh0aGlzLCB2YWx1ZSA9IHZhbHVlID09PSAwID8gMCA6IHZhbHVlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKERFU0NSSVBUT1JTKSBkZWZpbmVQcm9wZXJ0eShDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdldEludGVybmFsU3RhdGUodGhpcykuc2l6ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgc2V0U3Ryb25nOiBmdW5jdGlvbiAoQywgQ09OU1RSVUNUT1JfTkFNRSwgSVNfTUFQKSB7XG4gICAgdmFyIElURVJBVE9SX05BTUUgPSBDT05TVFJVQ1RPUl9OQU1FICsgJyBJdGVyYXRvcic7XG4gICAgdmFyIGdldEludGVybmFsQ29sbGVjdGlvblN0YXRlID0gaW50ZXJuYWxTdGF0ZUdldHRlckZvcihDT05TVFJVQ1RPUl9OQU1FKTtcbiAgICB2YXIgZ2V0SW50ZXJuYWxJdGVyYXRvclN0YXRlID0gaW50ZXJuYWxTdGF0ZUdldHRlckZvcihJVEVSQVRPUl9OQU1FKTtcbiAgICAvLyBgeyBNYXAsIFNldCB9LnByb3RvdHlwZS57IGtleXMsIHZhbHVlcywgZW50cmllcywgQEBpdGVyYXRvciB9KClgIG1ldGhvZHNcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW1hcC5wcm90b3R5cGUuZW50cmllc1xuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWFwLnByb3RvdHlwZS5rZXlzXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXAucHJvdG90eXBlLnZhbHVlc1xuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWFwLnByb3RvdHlwZS1AQGl0ZXJhdG9yXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zZXQucHJvdG90eXBlLmVudHJpZXNcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXNldC5wcm90b3R5cGUua2V5c1xuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc2V0LnByb3RvdHlwZS52YWx1ZXNcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXNldC5wcm90b3R5cGUtQEBpdGVyYXRvclxuICAgIGRlZmluZUl0ZXJhdG9yKEMsIENPTlNUUlVDVE9SX05BTUUsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICAgICAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgICAgIHR5cGU6IElURVJBVE9SX05BTUUsXG4gICAgICAgIHRhcmdldDogaXRlcmF0ZWQsXG4gICAgICAgIHN0YXRlOiBnZXRJbnRlcm5hbENvbGxlY3Rpb25TdGF0ZShpdGVyYXRlZCksXG4gICAgICAgIGtpbmQ6IGtpbmQsXG4gICAgICAgIGxhc3Q6IHVuZGVmaW5lZFxuICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxJdGVyYXRvclN0YXRlKHRoaXMpO1xuICAgICAgdmFyIGtpbmQgPSBzdGF0ZS5raW5kO1xuICAgICAgdmFyIGVudHJ5ID0gc3RhdGUubGFzdDtcbiAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgd2hpbGUgKGVudHJ5ICYmIGVudHJ5LnJlbW92ZWQpIGVudHJ5ID0gZW50cnkucHJldmlvdXM7XG4gICAgICAvLyBnZXQgbmV4dCBlbnRyeVxuICAgICAgaWYgKCFzdGF0ZS50YXJnZXQgfHwgIShzdGF0ZS5sYXN0ID0gZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm5leHQgOiBzdGF0ZS5zdGF0ZS5maXJzdCkpIHtcbiAgICAgICAgLy8gb3IgZmluaXNoIHRoZSBpdGVyYXRpb25cbiAgICAgICAgc3RhdGUudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gc3RlcCBieSBraW5kXG4gICAgICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiB7IHZhbHVlOiBlbnRyeS5rZXksIGRvbmU6IGZhbHNlIH07XG4gICAgICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHsgdmFsdWU6IGVudHJ5LnZhbHVlLCBkb25lOiBmYWxzZSB9O1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IFtlbnRyeS5rZXksIGVudHJ5LnZhbHVlXSwgZG9uZTogZmFsc2UgfTtcbiAgICB9LCBJU19NQVAgPyAnZW50cmllcycgOiAndmFsdWVzJywgIUlTX01BUCwgdHJ1ZSk7XG5cbiAgICAvLyBgeyBNYXAsIFNldCB9LnByb3RvdHlwZVtAQHNwZWNpZXNdYCBhY2Nlc3NvcnNcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1tYXAtQEBzcGVjaWVzXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXQtc2V0LUBAc3BlY2llc1xuICAgIHNldFNwZWNpZXMoQ09OU1RSVUNUT1JfTkFNRSk7XG4gIH1cbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIGNvbGxlY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29sbGVjdGlvbicpO1xudmFyIGNvbGxlY3Rpb25TdHJvbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gYE1hcGAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWFwLW9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gY29sbGVjdGlvbignTWFwJywgZnVuY3Rpb24gKGluaXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIE1hcCgpIHsgcmV0dXJuIGluaXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCBjb2xsZWN0aW9uU3Ryb25nKTtcbiIsICJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IGNvZGVQb2ludEF0LCBhdCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKENPTlZFUlRfVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIHBvcykge1xuICAgIHZhciBTID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgc2l6ZSA9IFMubGVuZ3RoO1xuICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gc2l6ZSkgcmV0dXJuIENPTlZFUlRfVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgZmlyc3QgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24pO1xuICAgIHJldHVybiBmaXJzdCA8IDB4RDgwMCB8fCBmaXJzdCA+IDB4REJGRiB8fCBwb3NpdGlvbiArIDEgPT09IHNpemVcbiAgICAgIHx8IChzZWNvbmQgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24gKyAxKSkgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGXG4gICAgICAgID8gQ09OVkVSVF9UT19TVFJJTkcgPyBTLmNoYXJBdChwb3NpdGlvbikgOiBmaXJzdFxuICAgICAgICA6IENPTlZFUlRfVE9fU1RSSU5HID8gUy5zbGljZShwb3NpdGlvbiwgcG9zaXRpb24gKyAyKSA6IChmaXJzdCAtIDB4RDgwMCA8PCAxMCkgKyAoc2Vjb25kIC0gMHhEQzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUuY29kZXBvaW50YXRcbiAgY29kZUF0OiBjcmVhdGVNZXRob2QoZmFsc2UpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5hdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuYXRcbiAgY2hhckF0OiBjcmVhdGVNZXRob2QodHJ1ZSlcbn07XG4iLCAiLy8gaXRlcmFibGUgRE9NIGNvbGxlY3Rpb25zXG4vLyBmbGFnIC0gYGl0ZXJhYmxlYCBpbnRlcmZhY2UgLSAnZW50cmllcycsICdrZXlzJywgJ3ZhbHVlcycsICdmb3JFYWNoJyBtZXRob2RzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ1NTUnVsZUxpc3Q6IDAsXG4gIENTU1N0eWxlRGVjbGFyYXRpb246IDAsXG4gIENTU1ZhbHVlTGlzdDogMCxcbiAgQ2xpZW50UmVjdExpc3Q6IDAsXG4gIERPTVJlY3RMaXN0OiAwLFxuICBET01TdHJpbmdMaXN0OiAwLFxuICBET01Ub2tlbkxpc3Q6IDEsXG4gIERhdGFUcmFuc2Zlckl0ZW1MaXN0OiAwLFxuICBGaWxlTGlzdDogMCxcbiAgSFRNTEFsbENvbGxlY3Rpb246IDAsXG4gIEhUTUxDb2xsZWN0aW9uOiAwLFxuICBIVE1MRm9ybUVsZW1lbnQ6IDAsXG4gIEhUTUxTZWxlY3RFbGVtZW50OiAwLFxuICBNZWRpYUxpc3Q6IDAsXG4gIE1pbWVUeXBlQXJyYXk6IDAsXG4gIE5hbWVkTm9kZU1hcDogMCxcbiAgTm9kZUxpc3Q6IDEsXG4gIFBhaW50UmVxdWVzdExpc3Q6IDAsXG4gIFBsdWdpbjogMCxcbiAgUGx1Z2luQXJyYXk6IDAsXG4gIFNWR0xlbmd0aExpc3Q6IDAsXG4gIFNWR051bWJlckxpc3Q6IDAsXG4gIFNWR1BhdGhTZWdMaXN0OiAwLFxuICBTVkdQb2ludExpc3Q6IDAsXG4gIFNWR1N0cmluZ0xpc3Q6IDAsXG4gIFNWR1RyYW5zZm9ybUxpc3Q6IDAsXG4gIFNvdXJjZUJ1ZmZlckxpc3Q6IDAsXG4gIFN0eWxlU2hlZXRMaXN0OiAwLFxuICBUZXh0VHJhY2tDdWVMaXN0OiAwLFxuICBUZXh0VHJhY2tMaXN0OiAwLFxuICBUb3VjaExpc3Q6IDBcbn07XG4iLCAidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxuLy8gYElzQXJyYXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2FycmF5XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktaXNhcnJheSAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgcmV0dXJuIGNsYXNzb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHluYW1lcyAtLSBzYWZlICovXG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKS5mO1xuXG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uIChpdCkge1xuICB0cnkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlOYW1lcyhpdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJ1xuICAgID8gZ2V0V2luZG93TmFtZXMoaXQpXG4gICAgOiAkZ2V0T3duUHJvcGVydHlOYW1lcyh0b0luZGV4ZWRPYmplY3QoaXQpKTtcbn07XG4iLCAidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG5leHBvcnRzLmYgPSB3ZWxsS25vd25TeW1ib2w7XG4iLCAidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTkFNRSkge1xuICB2YXIgU3ltYm9sID0gcGF0aC5TeW1ib2wgfHwgKHBhdGguU3ltYm9sID0ge30pO1xuICBpZiAoIWhhcyhTeW1ib2wsIE5BTUUpKSBkZWZpbmVQcm9wZXJ0eShTeW1ib2wsIE5BTUUsIHtcbiAgICB2YWx1ZTogd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZS5mKE5BTUUpXG4gIH0pO1xufTtcbiIsICJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG4vLyBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXlzcGVjaWVzY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbEFycmF5LCBsZW5ndGgpIHtcbiAgdmFyIEM7XG4gIGlmIChpc0FycmF5KG9yaWdpbmFsQXJyYXkpKSB7XG4gICAgQyA9IG9yaWdpbmFsQXJyYXkuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZiAodHlwZW9mIEMgPT0gJ2Z1bmN0aW9uJyAmJiAoQyA9PT0gQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKSBDID0gdW5kZWZpbmVkO1xuICAgIGVsc2UgaWYgKGlzT2JqZWN0KEMpKSB7XG4gICAgICBDID0gQ1tTUEVDSUVTXTtcbiAgICAgIGlmIChDID09PSBudWxsKSBDID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSByZXR1cm4gbmV3IChDID09PSB1bmRlZmluZWQgPyBBcnJheSA6IEMpKGxlbmd0aCA9PT0gMCA/IDAgOiBsZW5ndGgpO1xufTtcbiIsICJ2YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5cbnZhciBwdXNoID0gW10ucHVzaDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGZvckVhY2gsIG1hcCwgZmlsdGVyLCBzb21lLCBldmVyeSwgZmluZCwgZmluZEluZGV4LCBmaWx0ZXJPdXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHZhciBJU19NQVAgPSBUWVBFID09IDE7XG4gIHZhciBJU19GSUxURVIgPSBUWVBFID09IDI7XG4gIHZhciBJU19TT01FID0gVFlQRSA9PSAzO1xuICB2YXIgSVNfRVZFUlkgPSBUWVBFID09IDQ7XG4gIHZhciBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2O1xuICB2YXIgSVNfRklMVEVSX09VVCA9IFRZUEUgPT0gNztcbiAgdmFyIE5PX0hPTEVTID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQsIHNwZWNpZmljQ3JlYXRlKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCgkdGhpcyk7XG4gICAgdmFyIHNlbGYgPSBJbmRleGVkT2JqZWN0KE8pO1xuICAgIHZhciBib3VuZEZ1bmN0aW9uID0gYmluZChjYWxsYmFja2ZuLCB0aGF0LCAzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGNyZWF0ZSA9IHNwZWNpZmljQ3JlYXRlIHx8IGFycmF5U3BlY2llc0NyZWF0ZTtcbiAgICB2YXIgdGFyZ2V0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSIHx8IElTX0ZJTFRFUl9PVVQgPyBjcmVhdGUoJHRoaXMsIDApIDogdW5kZWZpbmVkO1xuICAgIHZhciB2YWx1ZSwgcmVzdWx0O1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZikge1xuICAgICAgdmFsdWUgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlc3VsdCA9IGJvdW5kRnVuY3Rpb24odmFsdWUsIGluZGV4LCBPKTtcbiAgICAgIGlmIChUWVBFKSB7XG4gICAgICAgIGlmIChJU19NQVApIHRhcmdldFtpbmRleF0gPSByZXN1bHQ7IC8vIG1hcFxuICAgICAgICBlbHNlIGlmIChyZXN1bHQpIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsdWU7ICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiBwdXNoLmNhbGwodGFyZ2V0LCB2YWx1ZSk7IC8vIGZpbHRlclxuICAgICAgICB9IGVsc2Ugc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSA0OiByZXR1cm4gZmFsc2U7ICAgICAgICAgICAgIC8vIGV2ZXJ5XG4gICAgICAgICAgY2FzZSA3OiBwdXNoLmNhbGwodGFyZ2V0LCB2YWx1ZSk7IC8vIGZpbHRlck91dFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiB0YXJnZXQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuICBmb3JFYWNoOiBjcmVhdGVNZXRob2QoMCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUubWFwYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4gIG1hcDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbHRlclxuICBmaWx0ZXI6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5zb21lYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc29tZVxuICBzb21lOiBjcmVhdGVNZXRob2QoMyksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZXZlcnlgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5ldmVyeVxuICBldmVyeTogY3JlYXRlTWV0aG9kKDQpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbmRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kXG4gIGZpbmQ6IGNyZWF0ZU1ldGhvZCg1KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhcbiAgZmluZEluZGV4OiBjcmVhdGVNZXRob2QoNiksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyT3V0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtYXJyYXktZmlsdGVyaW5nXG4gIGZpbHRlck91dDogY3JlYXRlTWV0aG9kKDcpXG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5mb3JFYWNoO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2ZvckVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbm1vZHVsZS5leHBvcnRzID0gIVNUUklDVF9NRVRIT0QgPyBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gIHJldHVybiAkZm9yRWFjaCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWZvcmVhY2ggLS0gc2FmZVxufSA6IFtdLmZvckVhY2g7XG4iLCAidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJykuZjtcblxuLy8gYE9iamVjdC57IGVudHJpZXMsIHZhbHVlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRPX0VOVFJJRVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KGl0KTtcbiAgICB2YXIga2V5cyA9IG9iamVjdEtleXMoTyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaSkge1xuICAgICAga2V5ID0ga2V5c1tpKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKE8sIGtleSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goVE9fRU5UUklFUyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBPYmplY3QuZW50cmllc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmVudHJpZXNcbiAgZW50cmllczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgT2JqZWN0LnZhbHVlc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnZhbHVlc1xuICB2YWx1ZXM6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCAidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIE1BVENIID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuXG4vLyBgSXNSZWdFeHBgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc3JlZ2V4cFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGlzUmVnRXhwO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICgoaXNSZWdFeHAgPSBpdFtNQVRDSF0pICE9PSB1bmRlZmluZWQgPyAhIWlzUmVnRXhwIDogY2xhc3NvZihpdCkgPT0gJ1JlZ0V4cCcpO1xufTtcbiIsICJ2YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcmVnZXhwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpc1JlZ0V4cChpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJUaGUgbWV0aG9kIGRvZXNuJ3QgYWNjZXB0IHJlZ3VsYXIgZXhwcmVzc2lvbnNcIik7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsICJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBNQVRDSCA9IHdlbGxLbm93blN5bWJvbCgnbWF0Y2gnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUpIHtcbiAgdmFyIHJlZ2V4cCA9IC8uLztcbiAgdHJ5IHtcbiAgICAnLy4vJ1tNRVRIT0RfTkFNRV0ocmVnZXhwKTtcbiAgfSBjYXRjaCAoZXJyb3IxKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlZ2V4cFtNQVRDSF0gPSBmYWxzZTtcbiAgICAgIHJldHVybiAnLy4vJ1tNRVRIT0RfTkFNRV0ocmVnZXhwKTtcbiAgICB9IGNhdGNoIChlcnJvcjIpIHsgLyogZW1wdHkgKi8gfVxuICB9IHJldHVybiBmYWxzZTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBwcm9wZXJ0eUtleSA9IHRvUHJpbWl0aXZlKGtleSk7XG4gIGlmIChwcm9wZXJ0eUtleSBpbiBvYmplY3QpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBwcm9wZXJ0eUtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W3Byb3BlcnR5S2V5XSA9IHZhbHVlO1xufTtcbiIsICJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FKSB7XG4gIC8vIFdlIGNhbid0IHVzZSB0aGlzIGZlYXR1cmUgZGV0ZWN0aW9uIGluIFY4IHNpbmNlIGl0IGNhdXNlc1xuICAvLyBkZW9wdGltaXphdGlvbiBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc3XG4gIHJldHVybiBWOF9WRVJTSU9OID49IDUxIHx8ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gYXJyYXkuY29uc3RydWN0b3IgPSB7fTtcbiAgICBjb25zdHJ1Y3RvcltTUEVDSUVTXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7IGZvbzogMSB9O1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5W01FVEhPRF9OQU1FXShCb29sZWFuKS5mb28gIT09IDE7XG4gIH0pO1xufTtcbiIsICJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXRlcmF0b3JDbG9zZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvci1jbG9zZScpO1xuXG4vLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwgZm4sIHZhbHVlLCBFTlRSSUVTKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEVOVFJJRVMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBjYWxsV2l0aFNhZmVJdGVyYXRpb25DbG9zaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nJyk7XG52YXIgaXNBcnJheUl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcblxuLy8gYEFycmF5LmZyb21gIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5mcm9tXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICB2YXIgQyA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgbWFwZm4gPSBhcmd1bWVudHNMZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gIHZhciBpdGVyYXRvck1ldGhvZCA9IGdldEl0ZXJhdG9yTWV0aG9kKE8pO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yLCBuZXh0LCB2YWx1ZTtcbiAgaWYgKG1hcHBpbmcpIG1hcGZuID0gYmluZChtYXBmbiwgYXJndW1lbnRzTGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gIC8vIGlmIHRoZSB0YXJnZXQgaXMgbm90IGl0ZXJhYmxlIG9yIGl0J3MgYW4gYXJyYXkgd2l0aCB0aGUgZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBhIHNpbXBsZSBjYXNlXG4gIGlmIChpdGVyYXRvck1ldGhvZCAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyYXRvck1ldGhvZChpdGVyYXRvck1ldGhvZCkpKSB7XG4gICAgaXRlcmF0b3IgPSBpdGVyYXRvck1ldGhvZC5jYWxsKE8pO1xuICAgIG5leHQgPSBpdGVyYXRvci5uZXh0O1xuICAgIHJlc3VsdCA9IG5ldyBDKCk7XG4gICAgZm9yICg7IShzdGVwID0gbmV4dC5jYWxsKGl0ZXJhdG9yKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgdmFsdWUgPSBtYXBwaW5nID8gY2FsbFdpdGhTYWZlSXRlcmF0aW9uQ2xvc2luZyhpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZTtcbiAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIHZhbHVlID0gbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XTtcbiAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsICJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSB9LCB7XG4gIHNldFByb3RvdHlwZU9mOiBzZXRQcm90b3R5cGVPZlxufSk7XG4iLCAidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBuYXRpdmVHZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIEZBSUxTX09OX1BSSU1JVElWRVMgPSBmYWlscyhmdW5jdGlvbiAoKSB7IG5hdGl2ZUdldFByb3RvdHlwZU9mKDEpOyB9KTtcblxuLy8gYE9iamVjdC5nZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRwcm90b3R5cGVvZlxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogRkFJTFNfT05fUFJJTUlUSVZFUywgc2hhbTogIUNPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiB9LCB7XG4gIGdldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCkge1xuICAgIHJldHVybiBuYXRpdmVHZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9XG59KTtcblxuIiwgIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLWFycmF5LXByb3RvdHlwZS1pbmRleG9mIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG5cbnZhciBuYXRpdmVJbmRleE9mID0gW10uaW5kZXhPZjtcblxudmFyIE5FR0FUSVZFX1pFUk8gPSAhIW5hdGl2ZUluZGV4T2YgJiYgMSAvIFsxXS5pbmRleE9mKDEsIC0wKSA8IDA7XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2luZGV4T2YnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IE5FR0FUSVZFX1pFUk8gfHwgIVNUUklDVF9NRVRIT0QgfSwge1xuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgcmV0dXJuIE5FR0FUSVZFX1pFUk9cbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICAgID8gbmF0aXZlSW5kZXhPZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IDBcbiAgICAgIDogJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsICJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcblxudmFyIERhdGVQcm90b3R5cGUgPSBEYXRlLnByb3RvdHlwZTtcbnZhciBJTlZBTElEX0RBVEUgPSAnSW52YWxpZCBEYXRlJztcbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyIG5hdGl2ZURhdGVUb1N0cmluZyA9IERhdGVQcm90b3R5cGVbVE9fU1RSSU5HXTtcbnZhciBnZXRUaW1lID0gRGF0ZVByb3RvdHlwZS5nZXRUaW1lO1xuXG4vLyBgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1kYXRlLnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKG5ldyBEYXRlKE5hTikgKyAnJyAhPSBJTlZBTElEX0RBVEUpIHtcbiAgcmVkZWZpbmUoRGF0ZVByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICB2YXIgdmFsdWUgPSBnZXRUaW1lLmNhbGwodGhpcyk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gbmF0aXZlRGF0ZVRvU3RyaW5nLmNhbGwodGhpcykgOiBJTlZBTElEX0RBVEU7XG4gIH0pO1xufVxuIiwgInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKCFUT19TVFJJTkdfVEFHX1NVUFBPUlQpIHtcbiAgcmVkZWZpbmUoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgdG9TdHJpbmcsIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzJyk7XG5cbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG52YXIgbmF0aXZlVG9TdHJpbmcgPSBSZWdFeHBQcm90b3R5cGVbVE9fU1RSSU5HXTtcblxudmFyIE5PVF9HRU5FUklDID0gZmFpbHMoZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlVG9TdHJpbmcuY2FsbCh7IHNvdXJjZTogJ2EnLCBmbGFnczogJ2InIH0pICE9ICcvYS9iJzsgfSk7XG4vLyBGRjQ0LSBSZWdFeHAjdG9TdHJpbmcgaGFzIGEgd3JvbmcgbmFtZVxudmFyIElOQ09SUkVDVF9OQU1FID0gbmF0aXZlVG9TdHJpbmcubmFtZSAhPSBUT19TVFJJTkc7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKE5PVF9HRU5FUklDIHx8IElOQ09SUkVDVF9OQU1FKSB7XG4gIHJlZGVmaW5lKFJlZ0V4cC5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgdmFyIFIgPSBhbk9iamVjdCh0aGlzKTtcbiAgICB2YXIgcCA9IFN0cmluZyhSLnNvdXJjZSk7XG4gICAgdmFyIHJmID0gUi5mbGFncztcbiAgICB2YXIgZiA9IFN0cmluZyhyZiA9PT0gdW5kZWZpbmVkICYmIFIgaW5zdGFuY2VvZiBSZWdFeHAgJiYgISgnZmxhZ3MnIGluIFJlZ0V4cFByb3RvdHlwZSkgPyBmbGFncy5jYWxsKFIpIDogcmYpO1xuICAgIHJldHVybiAnLycgKyBwICsgJy8nICsgZjtcbiAgfSwgeyB1bnNhZmU6IHRydWUgfSk7XG59XG4iLCAidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIG5hdGl2ZUNvbnN0cnVjdCA9IGdldEJ1aWx0SW4oJ1JlZmxlY3QnLCAnY29uc3RydWN0Jyk7XG5cbi8vIGBSZWZsZWN0LmNvbnN0cnVjdGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZmxlY3QuY29uc3RydWN0XG4vLyBNUyBFZGdlIHN1cHBvcnRzIG9ubHkgMiBhcmd1bWVudHMgYW5kIGFyZ3VtZW50c0xpc3QgYXJndW1lbnQgaXMgb3B0aW9uYWxcbi8vIEZGIE5pZ2h0bHkgc2V0cyB0aGlyZCBhcmd1bWVudCBhcyBgbmV3LnRhcmdldGAsIGJ1dCBkb2VzIG5vdCBjcmVhdGUgYHRoaXNgIGZyb20gaXRcbnZhciBORVdfVEFSR0VUX0JVRyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRigpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gIShuYXRpdmVDb25zdHJ1Y3QoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCBbXSwgRikgaW5zdGFuY2VvZiBGKTtcbn0pO1xudmFyIEFSR1NfQlVHID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgbmF0aXZlQ29uc3RydWN0KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSk7XG59KTtcbnZhciBGT1JDRUQgPSBORVdfVEFSR0VUX0JVRyB8fCBBUkdTX0JVRztcblxuJCh7IHRhcmdldDogJ1JlZmxlY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCwgc2hhbTogRk9SQ0VEIH0sIHtcbiAgY29uc3RydWN0OiBmdW5jdGlvbiBjb25zdHJ1Y3QoVGFyZ2V0LCBhcmdzIC8qICwgbmV3VGFyZ2V0ICovKSB7XG4gICAgYUZ1bmN0aW9uKFRhcmdldCk7XG4gICAgYW5PYmplY3QoYXJncyk7XG4gICAgdmFyIG5ld1RhcmdldCA9IGFyZ3VtZW50cy5sZW5ndGggPCAzID8gVGFyZ2V0IDogYUZ1bmN0aW9uKGFyZ3VtZW50c1syXSk7XG4gICAgaWYgKEFSR1NfQlVHICYmICFORVdfVEFSR0VUX0JVRykgcmV0dXJuIG5hdGl2ZUNvbnN0cnVjdChUYXJnZXQsIGFyZ3MsIG5ld1RhcmdldCk7XG4gICAgaWYgKFRhcmdldCA9PSBuZXdUYXJnZXQpIHtcbiAgICAgIC8vIHcvbyBhbHRlcmVkIG5ld1RhcmdldCwgb3B0aW1pemF0aW9uIGZvciAwLTQgYXJndW1lbnRzXG4gICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBUYXJnZXQoKTtcbiAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdKTtcbiAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgY2FzZSAzOiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgY2FzZSA0OiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgICAgIH1cbiAgICAgIC8vIHcvbyBhbHRlcmVkIG5ld1RhcmdldCwgbG90IG9mIGFyZ3VtZW50cyBjYXNlXG4gICAgICB2YXIgJGFyZ3MgPSBbbnVsbF07XG4gICAgICAkYXJncy5wdXNoLmFwcGx5KCRhcmdzLCBhcmdzKTtcbiAgICAgIHJldHVybiBuZXcgKGJpbmQuYXBwbHkoVGFyZ2V0LCAkYXJncykpKCk7XG4gICAgfVxuICAgIC8vIHdpdGggYWx0ZXJlZCBuZXdUYXJnZXQsIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGNvbnN0cnVjdG9yc1xuICAgIHZhciBwcm90byA9IG5ld1RhcmdldC5wcm90b3R5cGU7XG4gICAgdmFyIGluc3RhbmNlID0gY3JlYXRlKGlzT2JqZWN0KHByb3RvKSA/IHByb3RvIDogT2JqZWN0LnByb3RvdHlwZSk7XG4gICAgdmFyIHJlc3VsdCA9IEZ1bmN0aW9uLmFwcGx5LmNhbGwoVGFyZ2V0LCBpbnN0YW5jZSwgYXJncyk7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHJlc3VsdCkgPyByZXN1bHQgOiBpbnN0YW5jZTtcbiAgfVxufSk7XG4iLCAidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kJyk7XG5cbi8vIGBGdW5jdGlvbi5wcm90b3R5cGUuYmluZGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG4kKHsgdGFyZ2V0OiAnRnVuY3Rpb24nLCBwcm90bzogdHJ1ZSB9LCB7XG4gIGJpbmQ6IGJpbmRcbn0pO1xuIiwgImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pbmRleC1vZi5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmRhdGUudG8tc3RyaW5nLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnRvLXN0cmluZy5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLnJlZ2V4cC50by1zdHJpbmcuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5yZWZsZWN0LmNvbnN0cnVjdC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmZ1bmN0aW9uLmJpbmQuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvci5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLm1hcC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvci5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3IuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuY3JlYXRlLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLmRlc2NyaXB0aW9uLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLml0ZXJhdG9yLmpzXCI7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpIHsgdmFyIF9jYWNoZSA9IHR5cGVvZiBNYXAgPT09IFwiZnVuY3Rpb25cIiA/IG5ldyBNYXAoKSA6IHVuZGVmaW5lZDsgX3dyYXBOYXRpdmVTdXBlciA9IGZ1bmN0aW9uIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpIHsgaWYgKENsYXNzID09PSBudWxsIHx8ICFfaXNOYXRpdmVGdW5jdGlvbihDbGFzcykpIHJldHVybiBDbGFzczsgaWYgKHR5cGVvZiBDbGFzcyAhPT0gXCJmdW5jdGlvblwiKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBpZiAodHlwZW9mIF9jYWNoZSAhPT0gXCJ1bmRlZmluZWRcIikgeyBpZiAoX2NhY2hlLmhhcyhDbGFzcykpIHJldHVybiBfY2FjaGUuZ2V0KENsYXNzKTsgX2NhY2hlLnNldChDbGFzcywgV3JhcHBlcik7IH0gZnVuY3Rpb24gV3JhcHBlcigpIHsgcmV0dXJuIF9jb25zdHJ1Y3QoQ2xhc3MsIGFyZ3VtZW50cywgX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yKTsgfSBXcmFwcGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBXcmFwcGVyLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyByZXR1cm4gX3NldFByb3RvdHlwZU9mKFdyYXBwZXIsIENsYXNzKTsgfTsgcmV0dXJuIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykgeyBpZiAoX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpKSB7IF9jb25zdHJ1Y3QgPSBSZWZsZWN0LmNvbnN0cnVjdDsgfSBlbHNlIHsgX2NvbnN0cnVjdCA9IGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykgeyB2YXIgYSA9IFtudWxsXTsgYS5wdXNoLmFwcGx5KGEsIGFyZ3MpOyB2YXIgQ29uc3RydWN0b3IgPSBGdW5jdGlvbi5iaW5kLmFwcGx5KFBhcmVudCwgYSk7IHZhciBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcigpOyBpZiAoQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgQ2xhc3MucHJvdG90eXBlKTsgcmV0dXJuIGluc3RhbmNlOyB9OyB9IHJldHVybiBfY29uc3RydWN0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZUZ1bmN0aW9uKGZuKSB7IHJldHVybiBGdW5jdGlvbi50b1N0cmluZy5jYWxsKGZuKS5pbmRleE9mKFwiW25hdGl2ZSBjb2RlXVwiKSAhPT0gLTE7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG4vLyBUT0RPOiBcbi8vIDEuIHNob3VsZC9jYW4gd2UgZ2V0IHJpZCBvZiBiczNjb21wYXQgZGVwZW5kZW5jeT9cbi8vIDIuIHNlbGVjdGVkIGF0dHJpYnV0ZSBpcyBncmVhdCBmb3IgdXNpbmcgY29tcG9uZW50IGRpcmVjdGx5LCBidXQgZG9lcyBpdCBtYWtlIHNlbnNlIGZvciBxbWQgdXNhZ2U/XG4vLyBVc2FnZTpcbi8vXG4vLyBFYWNoIDxic2xpYi1uYXZzLSo+IGNvbXBvbmVudCBleHBlY3RzIHRvcC1sZXZlbCA8dGVtcGxhdGU+cyB3aXRoIFxuLy8gc3BlY2lhbCBjbGFzc2VzOlxuLy8gICogbmF2OiB0aXRsZSBhdHRyIGRlZmluZXMgdGhlIG5hdiBpdGVtIGFuZCBjb250ZW50cyBhcmUgZGlzcGxheWVkIHdoZW4gYWN0aXZlXG4vLyAgKiBuYXYtaXRlbTogY29udGVudHMgYXJlIGRpc3BsYXllZCB2ZXJiYXRpbSBpbiB0aGUgbmF2XG4vLyAgKiBuYXYtc3BhY2VyOiBmb3IgYWRkIHNwYWNpbmcgYmV0d2VlbiBuYXYgaXRlbXMuXG4vLyAgKiBuYXYtbWVudTogYSBjb2xsZWN0aW9uIG9mIC5uYXYvLm5hdi1pdGVtc1xuLy9cbi8vIEV4YW1wbGU6XG4vL1xuLy8gPGJzbGliLW5hdnMtKiBzZWxlY3RlZD0ndHdvJz5cbi8vICAgPHRlbXBsYXRlIGNsYXNzPSduYXYnIHRpdGxlPSdUYWIgMScgdmFsdWU9J29uZSc+XG4vLyAgICAgVGFiIDEgY29udGVudFxuLy8gICA8L3RlbXBsYXRlPlxuLy8gICA8dGVtcGxhdGUgY2xhc3M9J25hdicgdGl0bGU9J1RhYiAyJyB2YWx1ZT0ndHdvJz5cbi8vICAgICBUYWIgMiBjb250ZW50XG4vLyAgIDwvdGVtcGxhdGU+XG4vLyAgIDx0ZW1wbGF0ZSBjbGFzcz0nbmF2LXNwYWNlcic+PC90ZW1wbGF0ZT5cbi8vICAgPHRlbXBsYXRlIGNsYXNzPSduYXYtaXRlbSc+XG4vLyAgICAgPGEgaHJlZj0naHR0cHM6Ly9nb29nbGUuY29tJz4gQW4gZXh0ZXJuYWwgbGluayA8L2E+XG4vLyAgIDwvdGVtcGxhdGU+XG4vLyAgIDx0ZW1wbGF0ZSBjbGFzcz0nbmF2LW1lbnUnIHRpdGxlPSdNZW51JyB2YWx1ZT0nbWVudSc+XG4vLyAgICAgPHRlbXBsYXRlIGNsYXNzPSduYXYnIHRpdGxlPSdUYWIgMycgdmFsdWU9J3RocmVlJz5cbi8vICAgICAgIFRhYiAzIGNvbnRlbnRcbi8vICAgICA8L3RlbXBsYXRlPlxuLy8gICA8L3RlbXBsYXRlPlxuLy8gPC9ic2xpYi1uYXZzLSo+XG5pbXBvcnQgeyB0YWcgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGNyZWF0ZVRhYkZyYWdtZW50LCBidWlsZFRhYnNldCwgZ2V0U2VsZWN0ZWQsIHJlcGxhY2VDaGlsZHJlbiB9IGZyb20gJy4vbmF2LXV0aWxzJztcbmltcG9ydCB7IGNyZWF0ZUNhcmQgfSBmcm9tICcuL2NhcmQnO1xuXG52YXIgTmF2c1RhYiA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0hUTUxFbGVtZW50KSB7XG4gIF9pbmhlcml0cyhOYXZzVGFiLCBfSFRNTEVsZW1lbnQpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoTmF2c1RhYik7XG5cbiAgZnVuY3Rpb24gTmF2c1RhYigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTmF2c1RhYik7XG5cbiAgICBzZWxmID0gX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICB2YXIgc2VsZWN0ZWQgPSBnZXRTZWxlY3RlZChzZWxmKTtcbiAgICB2YXIgdGFic2V0ID0gYnVpbGRUYWJzZXQoc2VsZi5jaGlsZHJlbiwgc2VsZWN0ZWQpO1xuICAgIHZhciB0YWJzID0gY3JlYXRlVGFiRnJhZ21lbnQoc2VsZiwgJ25hdiBuYXYtdGFicycsIHRhYnNldCk7XG4gICAgcmVwbGFjZUNoaWxkcmVuKHNlbGYsIHRhYnMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHJldHVybiBOYXZzVGFiO1xufSggLyojX19QVVJFX18qL193cmFwTmF0aXZlU3VwZXIoSFRNTEVsZW1lbnQpKTtcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdic2xpYi1uYXZzLXRhYicsIE5hdnNUYWIpO1xuXG52YXIgTmF2c1BpbGwgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9IVE1MRWxlbWVudDIpIHtcbiAgX2luaGVyaXRzKE5hdnNQaWxsLCBfSFRNTEVsZW1lbnQyKTtcblxuICB2YXIgX3N1cGVyMiA9IF9jcmVhdGVTdXBlcihOYXZzUGlsbCk7XG5cbiAgZnVuY3Rpb24gTmF2c1BpbGwoKSB7XG4gICAgdmFyIF90aGlzMjtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOYXZzUGlsbCk7XG5cbiAgICBzZWxmID0gX3RoaXMyID0gX3N1cGVyMi5jYWxsKHRoaXMpO1xuICAgIHZhciBzZWxlY3RlZCA9IGdldFNlbGVjdGVkKHNlbGYpO1xuICAgIHZhciB0YWJzZXQgPSBidWlsZFRhYnNldChzZWxmLmNoaWxkcmVuLCBzZWxlY3RlZCk7XG4gICAgdmFyIHBpbGxzID0gY3JlYXRlVGFiRnJhZ21lbnQoc2VsZiwgJ25hdiBuYXYtcGlsbHMnLCB0YWJzZXQpO1xuICAgIHJlcGxhY2VDaGlsZHJlbihzZWxmLCBwaWxscyk7XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuXG4gIHJldHVybiBOYXZzUGlsbDtcbn0oIC8qI19fUFVSRV9fKi9fd3JhcE5hdGl2ZVN1cGVyKEhUTUxFbGVtZW50KSk7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYnNsaWItbmF2cy1waWxsJywgTmF2c1BpbGwpO1xuXG52YXIgTmF2c1RhYkNhcmQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9IVE1MRWxlbWVudDMpIHtcbiAgX2luaGVyaXRzKE5hdnNUYWJDYXJkLCBfSFRNTEVsZW1lbnQzKTtcblxuICB2YXIgX3N1cGVyMyA9IF9jcmVhdGVTdXBlcihOYXZzVGFiQ2FyZCk7XG5cbiAgZnVuY3Rpb24gTmF2c1RhYkNhcmQoKSB7XG4gICAgdmFyIF90aGlzMztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOYXZzVGFiQ2FyZCk7XG5cbiAgICBzZWxmID0gX3RoaXMzID0gX3N1cGVyMy5jYWxsKHRoaXMpO1xuICAgIHZhciBzZWxlY3RlZCA9IGdldFNlbGVjdGVkKHNlbGYpO1xuICAgIHZhciB0YWJzZXQgPSBidWlsZFRhYnNldChzZWxmLmNoaWxkcmVuLCBzZWxlY3RlZCk7XG4gICAgdmFyIHRhYnMgPSBjcmVhdGVUYWJGcmFnbWVudChzZWxmLCAnbmF2IG5hdi10YWJzJywgdGFic2V0KTtcbiAgICB2YXIgbmF2ID0gdGFic1swXTtcbiAgICB2YXIgY29udGVudCA9IHRhYnNbMV07IC8vIGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzUuMC9jb21wb25lbnRzL2NhcmQvI25hdmlnYXRpb25cblxuICAgIG5hdi5jbGFzc0xpc3QuYWRkKCdjYXJkLWhlYWRlci10YWJzJyk7XG4gICAgdmFyIGNhcmQgPSBjcmVhdGVDYXJkKGNvbnRlbnQsIG5hdik7XG4gICAgcmVwbGFjZUNoaWxkcmVuKHNlbGYsIGNhcmQpO1xuICAgIHJldHVybiBfdGhpczM7XG4gIH1cblxuICByZXR1cm4gTmF2c1RhYkNhcmQ7XG59KCAvKiNfX1BVUkVfXyovX3dyYXBOYXRpdmVTdXBlcihIVE1MRWxlbWVudCkpO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2JzbGliLW5hdnMtdGFiLWNhcmQnLCBOYXZzVGFiQ2FyZCk7XG5cbnZhciBOYXZzUGlsbENhcmQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9IVE1MRWxlbWVudDQpIHtcbiAgX2luaGVyaXRzKE5hdnNQaWxsQ2FyZCwgX0hUTUxFbGVtZW50NCk7XG5cbiAgdmFyIF9zdXBlcjQgPSBfY3JlYXRlU3VwZXIoTmF2c1BpbGxDYXJkKTtcblxuICBmdW5jdGlvbiBOYXZzUGlsbENhcmQoKSB7XG4gICAgdmFyIF90aGlzNDtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOYXZzUGlsbENhcmQpO1xuXG4gICAgc2VsZiA9IF90aGlzNCA9IF9zdXBlcjQuY2FsbCh0aGlzKTtcbiAgICB2YXIgc2VsZWN0ZWQgPSBnZXRTZWxlY3RlZChzZWxmKTtcbiAgICB2YXIgdGFic2V0ID0gYnVpbGRUYWJzZXQoc2VsZi5jaGlsZHJlbiwgc2VsZWN0ZWQpO1xuICAgIHZhciBwaWxscyA9IGNyZWF0ZVRhYkZyYWdtZW50KHNlbGYsICduYXYgbmF2LXBpbGxzJywgdGFic2V0KTtcbiAgICB2YXIgbmF2ID0gcGlsbHNbMF07XG4gICAgdmFyIGNvbnRlbnQgPSBwaWxsc1sxXTtcbiAgICB2YXIgYWJvdmUgPSBzZWxmLmdldEF0dHJpYnV0ZSgncGxhY2VtZW50JykgIT09ICdiZWxvdyc7XG4gICAgaWYgKGFib3ZlKSBuYXYuY2xhc3NMaXN0LmFkZCgnY2FyZC1oZWFkZXItcGlsbHMnKTtcbiAgICB2YXIgY2FyZCA9IGFib3ZlID8gY3JlYXRlQ2FyZChjb250ZW50LCBuYXYpIDogY3JlYXRlQ2FyZChjb250ZW50LCBudWxsLCBuYXYpO1xuICAgIHJlcGxhY2VDaGlsZHJlbihzZWxmLCBjYXJkKTtcbiAgICByZXR1cm4gX3RoaXM0O1xuICB9XG5cbiAgcmV0dXJuIE5hdnNQaWxsQ2FyZDtcbn0oIC8qI19fUFVSRV9fKi9fd3JhcE5hdGl2ZVN1cGVyKEhUTUxFbGVtZW50KSk7XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYnNsaWItbmF2cy1waWxsLWNhcmQnLCBOYXZzUGlsbENhcmQpO1xuXG52YXIgTmF2c1BpbGxMaXN0ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfSFRNTEVsZW1lbnQ1KSB7XG4gIF9pbmhlcml0cyhOYXZzUGlsbExpc3QsIF9IVE1MRWxlbWVudDUpO1xuXG4gIHZhciBfc3VwZXI1ID0gX2NyZWF0ZVN1cGVyKE5hdnNQaWxsTGlzdCk7XG5cbiAgZnVuY3Rpb24gTmF2c1BpbGxMaXN0KCkge1xuICAgIHZhciBfdGhpczU7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTmF2c1BpbGxMaXN0KTtcblxuICAgIHNlbGYgPSBfdGhpczUgPSBfc3VwZXI1LmNhbGwodGhpcyk7XG4gICAgdmFyIHNlbGVjdGVkID0gZ2V0U2VsZWN0ZWQoc2VsZik7IC8vIFRPRE86IGltcGxlbWVudCB0ZXh0RmlsdGVyIVxuXG4gICAgdmFyIHRhYnNldCA9IGJ1aWxkVGFic2V0KHNlbGYuY2hpbGRyZW4sIHNlbGVjdGVkKTtcbiAgICB2YXIgcGlsbHMgPSBjcmVhdGVUYWJGcmFnbWVudChzZWxmLCAnbmF2IG5hdi1waWxscyBuYXYtc3RhY2tlZCcsIHRhYnNldCk7XG4gICAgdmFyIG5hdiA9IHBpbGxzWzBdO1xuICAgIHZhciBjb250ZW50ID0gcGlsbHNbMV07XG4gICAgdmFyIG5hdkNsYXNzID0gJ2NvbC1zbS0nICsgc2VsZi5nZXRBdHRyaWJ1dGUoJ3dpZHRoTmF2Jyk7XG5cbiAgICBpZiAoc2VsZi5nZXRBdHRyaWJ1dGUoJ3dlbGwnKSkge1xuICAgICAgbmF2Q2xhc3MgPSBuYXZDbGFzcyArICcgd2VsbCc7XG4gICAgfVxuXG4gICAgdmFyIHJvdyA9IHRhZygnZGl2Jywge1xuICAgICAgXCJjbGFzc1wiOiAncm93J1xuICAgIH0sIHRhZygnZGl2Jywge1xuICAgICAgXCJjbGFzc1wiOiBuYXZDbGFzc1xuICAgIH0sIG5hdiksIHRhZygnZGl2Jywge1xuICAgICAgXCJjbGFzc1wiOiAnY29sLXNtLScgKyBzZWxmLmdldEF0dHJpYnV0ZSgnd2lkdGhDb250ZW50JylcbiAgICB9LCBjb250ZW50KSk7XG4gICAgcmVwbGFjZUNoaWxkcmVuKHNlbGYsIHJvdyk7XG4gICAgcmV0dXJuIF90aGlzNTtcbiAgfVxuXG4gIHJldHVybiBOYXZzUGlsbExpc3Q7XG59KCAvKiNfX1BVUkVfXyovX3dyYXBOYXRpdmVTdXBlcihIVE1MRWxlbWVudCkpO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2JzbGliLW5hdnMtcGlsbC1saXN0JywgTmF2c1BpbGxMaXN0KTtcblxudmFyIE5hdnNCYXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9IVE1MRWxlbWVudDYpIHtcbiAgX2luaGVyaXRzKE5hdnNCYXIsIF9IVE1MRWxlbWVudDYpO1xuXG4gIHZhciBfc3VwZXI2ID0gX2NyZWF0ZVN1cGVyKE5hdnNCYXIpO1xuXG4gIGZ1bmN0aW9uIE5hdnNCYXIoKSB7XG4gICAgdmFyIF90aGlzNjtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOYXZzQmFyKTtcblxuICAgIHNlbGYgPSBfdGhpczYgPSBfc3VwZXI2LmNhbGwodGhpcyk7XG4gICAgdmFyIHNlbGVjdGVkID0gZ2V0U2VsZWN0ZWQoc2VsZik7XG4gICAgdmFyIHRhYnNldCA9IGJ1aWxkVGFic2V0KHNlbGYuY2hpbGRyZW4sIHNlbGVjdGVkKTtcbiAgICB2YXIgbmF2YmFyID0gY3JlYXRlVGFiRnJhZ21lbnQoc2VsZiwgJ25hdiBuYXZiYXItbmF2JywgdGFic2V0KTsgLy8gVE9ETzogaW1wbGVtZW50IVxuICAgIC8vY29uc3QgbmF2ID0gdGFnKCduYXYnLCB7cm9sZTogJ25hdmlnYXRpb24nLCBjbGFzczogbmF2YmFyQ2xhc3N9KTtcbiAgICAvL3JlcGxhY2VDaGlsZHJlbihzZWxmLCBuYXYpO1xuXG4gICAgcmV0dXJuIF90aGlzNjtcbiAgfVxuXG4gIHJldHVybiBOYXZzQmFyO1xufSggLyojX19QVVJFX18qL193cmFwTmF0aXZlU3VwZXIoSFRNTEVsZW1lbnQpKTtcblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdic2xpYi1uYXZzLWJhcicsIE5hdnNCYXIpOyIsICIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvcicpO1xuXG52YXIgU1RSSU5HX0lURVJBVE9SID0gJ1N0cmluZyBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihTVFJJTkdfSVRFUkFUT1IpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUtQEBpdGVyYXRvclxuZGVmaW5lSXRlcmF0b3IoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IFNUUklOR19JVEVSQVRPUixcbiAgICBzdHJpbmc6IFN0cmluZyhpdGVyYXRlZCksXG4gICAgaW5kZXg6IDBcbiAgfSk7XG4vLyBgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJXN0cmluZ2l0ZXJhdG9ycHJvdG90eXBlJS5uZXh0XG59LCBmdW5jdGlvbiBuZXh0KCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICB2YXIgc3RyaW5nID0gc3RhdGUuc3RyaW5nO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleDtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gc3RyaW5nLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9IGNoYXJBdChzdHJpbmcsIGluZGV4KTtcbiAgc3RhdGUuaW5kZXggKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERPTUl0ZXJhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb20taXRlcmFibGVzJyk7XG52YXIgQXJyYXlJdGVyYXRvck1ldGhvZHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciBBcnJheVZhbHVlcyA9IEFycmF5SXRlcmF0b3JNZXRob2RzLnZhbHVlcztcblxuZm9yICh2YXIgQ09MTEVDVElPTl9OQU1FIGluIERPTUl0ZXJhYmxlcykge1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtDT0xMRUNUSU9OX05BTUVdO1xuICB2YXIgQ29sbGVjdGlvblByb3RvdHlwZSA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlKSB7XG4gICAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gICAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGVbSVRFUkFUT1JdICE9PSBBcnJheVZhbHVlcykgdHJ5IHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCBJVEVSQVRPUiwgQXJyYXlWYWx1ZXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBDb2xsZWN0aW9uUHJvdG90eXBlW0lURVJBVE9SXSA9IEFycmF5VmFsdWVzO1xuICAgIH1cbiAgICBpZiAoIUNvbGxlY3Rpb25Qcm90b3R5cGVbVE9fU1RSSU5HX1RBR10pIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCBUT19TVFJJTkdfVEFHLCBDT0xMRUNUSU9OX05BTUUpO1xuICAgIH1cbiAgICBpZiAoRE9NSXRlcmFibGVzW0NPTExFQ1RJT05fTkFNRV0pIGZvciAodmFyIE1FVEhPRF9OQU1FIGluIEFycmF5SXRlcmF0b3JNZXRob2RzKSB7XG4gICAgICAvLyBzb21lIENocm9tZSB2ZXJzaW9ucyBoYXZlIG5vbi1jb25maWd1cmFibGUgbWV0aG9kcyBvbiBET01Ub2tlbkxpc3RcbiAgICAgIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlW01FVEhPRF9OQU1FXSAhPT0gQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdKSB0cnkge1xuICAgICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgTUVUSE9EX05BTUUsIEFycmF5SXRlcmF0b3JNZXRob2RzW01FVEhPRF9OQU1FXSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBDb2xsZWN0aW9uUHJvdG90eXBlW01FVEhPRF9OQU1FXSA9IEFycmF5SXRlcmF0b3JNZXRob2RzW01FVEhPRF9OQU1FXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsICJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG5cbi8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmNyZWF0ZVxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIGNyZWF0ZTogY3JlYXRlXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIG5hdGl2ZU9iamVjdENyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMtZXh0ZXJuYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcbnZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgJGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZm9yRWFjaDtcblxudmFyIEhJRERFTiA9IHNoYXJlZEtleSgnaGlkZGVuJyk7XG52YXIgU1lNQk9MID0gJ1N5bWJvbCc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgVE9fUFJJTUlUSVZFID0gd2VsbEtub3duU3ltYm9sKCd0b1ByaW1pdGl2ZScpO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoU1lNQk9MKTtcbnZhciBPYmplY3RQcm90b3R5cGUgPSBPYmplY3RbUFJPVE9UWVBFXTtcbnZhciAkU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciAkc3RyaW5naWZ5ID0gZ2V0QnVpbHRJbignSlNPTicsICdzdHJpbmdpZnknKTtcbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbC5mO1xudmFyIG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlID0gcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZjtcbnZhciBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJyk7XG52YXIgT2JqZWN0UHJvdG90eXBlU3ltYm9scyA9IHNoYXJlZCgnb3Atc3ltYm9scycpO1xudmFyIFN0cmluZ1RvU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N0cmluZy10by1zeW1ib2wtcmVnaXN0cnknKTtcbnZhciBTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtdG8tc3RyaW5nLXJlZ2lzdHJ5Jyk7XG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBRT2JqZWN0ID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBVU0VfU0VUVEVSID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzY3JpcHRvciA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdENyZWF0ZShuYXRpdmVEZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYScsIHsgdmFsdWU6IDcgfSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbiAoTywgUCwgQXR0cmlidXRlcykge1xuICB2YXIgT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvciA9IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3RQcm90b3R5cGUsIFApO1xuICBpZiAoT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvcikgZGVsZXRlIE9iamVjdFByb3RvdHlwZVtQXTtcbiAgbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIGlmIChPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yICYmIE8gIT09IE9iamVjdFByb3RvdHlwZSkge1xuICAgIG5hdGl2ZURlZmluZVByb3BlcnR5KE9iamVjdFByb3RvdHlwZSwgUCwgT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvcik7XG4gIH1cbn0gOiBuYXRpdmVEZWZpbmVQcm9wZXJ0eTtcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAodGFnLCBkZXNjcmlwdGlvbikge1xuICB2YXIgc3ltYm9sID0gQWxsU3ltYm9sc1t0YWddID0gbmF0aXZlT2JqZWN0Q3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHNldEludGVybmFsU3RhdGUoc3ltYm9sLCB7XG4gICAgdHlwZTogU1lNQk9MLFxuICAgIHRhZzogdGFnLFxuICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvblxuICB9KTtcbiAgaWYgKCFERVNDUklQVE9SUykgc3ltYm9sLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHJldHVybiBzeW1ib2w7XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGl0KSBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBpZiAoTyA9PT0gT2JqZWN0UHJvdG90eXBlKSAkZGVmaW5lUHJvcGVydHkoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgUCwgQXR0cmlidXRlcyk7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkpIHtcbiAgICBpZiAoIUF0dHJpYnV0ZXMuZW51bWVyYWJsZSkge1xuICAgICAgaWYgKCFoYXMoTywgSElEREVOKSkgbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgSElEREVOLCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwge30pKTtcbiAgICAgIE9bSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhcyhPLCBISURERU4pICYmIE9bSElEREVOXVtrZXldKSBPW0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgQXR0cmlidXRlcyA9IG5hdGl2ZU9iamVjdENyZWF0ZShBdHRyaWJ1dGVzLCB7IGVudW1lcmFibGU6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCBmYWxzZSkgfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzY3JpcHRvcihPLCBrZXksIEF0dHJpYnV0ZXMpO1xuICB9IHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBrZXksIEF0dHJpYnV0ZXMpO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIgcHJvcGVydGllcyA9IHRvSW5kZXhlZE9iamVjdChQcm9wZXJ0aWVzKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKHByb3BlcnRpZXMpLmNvbmNhdCgkZ2V0T3duUHJvcGVydHlTeW1ib2xzKHByb3BlcnRpZXMpKTtcbiAgJGZvckVhY2goa2V5cywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmICghREVTQ1JJUFRPUlMgfHwgJHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocHJvcGVydGllcywga2V5KSkgJGRlZmluZVByb3BlcnR5KE8sIGtleSwgcHJvcGVydGllc1trZXldKTtcbiAgfSk7XG4gIHJldHVybiBPO1xufTtcblxudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gbmF0aXZlT2JqZWN0Q3JlYXRlKE8pIDogJGRlZmluZVByb3BlcnRpZXMobmF0aXZlT2JqZWN0Q3JlYXRlKE8pLCBQcm9wZXJ0aWVzKTtcbn07XG5cbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBQID0gdG9QcmltaXRpdmUoViwgdHJ1ZSk7XG4gIHZhciBlbnVtZXJhYmxlID0gbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0aGlzLCBQKTtcbiAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvdHlwZSAmJiBoYXMoQWxsU3ltYm9scywgUCkgJiYgIWhhcyhPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBQKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gZW51bWVyYWJsZSB8fCAhaGFzKHRoaXMsIFApIHx8ICFoYXMoQWxsU3ltYm9scywgUCkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW1BdID8gZW51bWVyYWJsZSA6IHRydWU7XG59O1xuXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIHZhciBpdCA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvdHlwZSAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIGtleSkpIHJldHVybjtcbiAgdmFyIGRlc2NyaXB0b3IgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSk7XG4gIGlmIChkZXNjcmlwdG9yICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpIHtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSB0cnVlO1xuICB9XG4gIHJldHVybiBkZXNjcmlwdG9yO1xufTtcblxudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHZhciBuYW1lcyA9IG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXModG9JbmRleGVkT2JqZWN0KE8pKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICAkZm9yRWFjaChuYW1lcywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmICghaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhoaWRkZW5LZXlzLCBrZXkpKSByZXN1bHQucHVzaChrZXkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pIHtcbiAgdmFyIElTX09CSkVDVF9QUk9UT1RZUEUgPSBPID09PSBPYmplY3RQcm90b3R5cGU7XG4gIHZhciBuYW1lcyA9IG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMoSVNfT0JKRUNUX1BST1RPVFlQRSA/IE9iamVjdFByb3RvdHlwZVN5bWJvbHMgOiB0b0luZGV4ZWRPYmplY3QoTykpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gICRmb3JFYWNoKG5hbWVzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICghSVNfT0JKRUNUX1BST1RPVFlQRSB8fCBoYXMoT2JqZWN0UHJvdG90eXBlLCBrZXkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gYFN5bWJvbGAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLWNvbnN0cnVjdG9yXG5pZiAoIU5BVElWRV9TWU1CT0wpIHtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpIHRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG4gICAgdmFyIGRlc2NyaXB0aW9uID0gIWFyZ3VtZW50cy5sZW5ndGggfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBTdHJpbmcoYXJndW1lbnRzWzBdKTtcbiAgICB2YXIgdGFnID0gdWlkKGRlc2NyaXB0aW9uKTtcbiAgICB2YXIgc2V0dGVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG90eXBlKSBzZXR0ZXIuY2FsbChPYmplY3RQcm90b3R5cGVTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZiAoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSkgdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2NyaXB0b3IodGhpcywgdGFnLCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmIChERVNDUklQVE9SUyAmJiBVU0VfU0VUVEVSKSBzZXRTeW1ib2xEZXNjcmlwdG9yKE9iamVjdFByb3RvdHlwZSwgdGFnLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiBzZXR0ZXIgfSk7XG4gICAgcmV0dXJuIHdyYXAodGFnLCBkZXNjcmlwdGlvbik7XG4gIH07XG5cbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS50YWc7XG4gIH0pO1xuXG4gIHJlZGVmaW5lKCRTeW1ib2wsICd3aXRob3V0U2V0dGVyJywgZnVuY3Rpb24gKGRlc2NyaXB0aW9uKSB7XG4gICAgcmV0dXJuIHdyYXAodWlkKGRlc2NyaXB0aW9uKSwgZGVzY3JpcHRpb24pO1xuICB9KTtcblxuICBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mID0gJGRlZmluZVByb3BlcnR5O1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZiA9IGdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlLmYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiB3cmFwKHdlbGxLbm93blN5bWJvbChuYW1lKSwgbmFtZSk7XG4gIH07XG5cbiAgaWYgKERFU0NSSVBUT1JTKSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtU3ltYm9sLWRlc2NyaXB0aW9uXG4gICAgbmF0aXZlRGVmaW5lUHJvcGVydHkoJFN5bWJvbFtQUk9UT1RZUEVdLCAnZGVzY3JpcHRpb24nLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGRlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5kZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIUlTX1BVUkUpIHtcbiAgICAgIHJlZGVmaW5lKE9iamVjdFByb3RvdHlwZSwgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB7IHVuc2FmZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cbn1cblxuJCh7IGdsb2JhbDogdHJ1ZSwgd3JhcDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCwgc2hhbTogIU5BVElWRV9TWU1CT0wgfSwge1xuICBTeW1ib2w6ICRTeW1ib2xcbn0pO1xuXG4kZm9yRWFjaChvYmplY3RLZXlzKFdlbGxLbm93blN5bWJvbHNTdG9yZSksIGZ1bmN0aW9uIChuYW1lKSB7XG4gIGRlZmluZVdlbGxLbm93blN5bWJvbChuYW1lKTtcbn0pO1xuXG4kKHsgdGFyZ2V0OiBTWU1CT0wsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wgfSwge1xuICAvLyBgU3ltYm9sLmZvcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLmZvclxuICAnZm9yJzogZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcoa2V5KTtcbiAgICBpZiAoaGFzKFN0cmluZ1RvU3ltYm9sUmVnaXN0cnksIHN0cmluZykpIHJldHVybiBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5W3N0cmluZ107XG4gICAgdmFyIHN5bWJvbCA9ICRTeW1ib2woc3RyaW5nKTtcbiAgICBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5W3N0cmluZ10gPSBzeW1ib2w7XG4gICAgU3ltYm9sVG9TdHJpbmdSZWdpc3RyeVtzeW1ib2xdID0gc3RyaW5nO1xuICAgIHJldHVybiBzeW1ib2w7XG4gIH0sXG4gIC8vIGBTeW1ib2wua2V5Rm9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wua2V5Zm9yXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKHN5bSkge1xuICAgIGlmICghaXNTeW1ib2woc3ltKSkgdGhyb3cgVHlwZUVycm9yKHN5bSArICcgaXMgbm90IGEgc3ltYm9sJyk7XG4gICAgaWYgKGhhcyhTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5LCBzeW0pKSByZXR1cm4gU3ltYm9sVG9TdHJpbmdSZWdpc3RyeVtzeW1dO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uICgpIHsgVVNFX1NFVFRFUiA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24gKCkgeyBVU0VfU0VUVEVSID0gZmFsc2U7IH1cbn0pO1xuXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCwgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JzXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvclxufSk7XG5cbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MIH0sIHtcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eXN5bWJvbHNcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gQ2hyb21lIDM4IGFuZCAzOSBgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc2AgZmFpbHMgb24gcHJpbWl0aXZlc1xuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzQ0M1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogZmFpbHMoZnVuY3Rpb24gKCkgeyBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZigxKTsgfSkgfSwge1xuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkge1xuICAgIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZih0b09iamVjdChpdCkpO1xuICB9XG59KTtcblxuLy8gYEpTT04uc3RyaW5naWZ5YCBtZXRob2QgYmVoYXZpb3Igd2l0aCBzeW1ib2xzXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWpzb24uc3RyaW5naWZ5XG5pZiAoJHN0cmluZ2lmeSkge1xuICB2YXIgRk9SQ0VEX0pTT05fU1RSSU5HSUZZID0gIU5BVElWRV9TWU1CT0wgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBzeW1ib2wgPSAkU3ltYm9sKCk7XG4gICAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgICByZXR1cm4gJHN0cmluZ2lmeShbc3ltYm9sXSkgIT0gJ1tudWxsXSdcbiAgICAgIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAgICAgfHwgJHN0cmluZ2lmeSh7IGE6IHN5bWJvbCB9KSAhPSAne30nXG4gICAgICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICAgICAgfHwgJHN0cmluZ2lmeShPYmplY3Qoc3ltYm9sKSkgIT0gJ3t9JztcbiAgfSk7XG5cbiAgJCh7IHRhcmdldDogJ0pTT04nLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZPUkNFRF9KU09OX1NUUklOR0lGWSB9LCB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzIC0tIHJlcXVpcmVkIGZvciBgLmxlbmd0aGBcbiAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCwgcmVwbGFjZXIsIHNwYWNlKSB7XG4gICAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgICB2YXIgaW5kZXggPSAxO1xuICAgICAgdmFyICRyZXBsYWNlcjtcbiAgICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaW5kZXgpIGFyZ3MucHVzaChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgICAgJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgICBpZiAoIWlzT2JqZWN0KHJlcGxhY2VyKSAmJiBpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkgcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgICBpZiAoIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgJHJlcGxhY2VyID09ICdmdW5jdGlvbicpIHZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgICAgcmV0dXJuICRzdHJpbmdpZnkuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gYFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLUBAdG9wcmltaXRpdmVcbmlmICghJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0pIHtcbiAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG59XG4vLyBgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXWAgcHJvcGVydHlcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnByb3RvdHlwZS1AQHRvc3RyaW5ndGFnXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCBTWU1CT0wpO1xuXG5oaWRkZW5LZXlzW0hJRERFTl0gPSB0cnVlO1xuIiwgIi8vIGBTeW1ib2wucHJvdG90eXBlLmRlc2NyaXB0aW9uYCBnZXR0ZXJcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnByb3RvdHlwZS5kZXNjcmlwdGlvblxuJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzJyk7XG5cbnZhciBOYXRpdmVTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xuXG5pZiAoREVTQ1JJUFRPUlMgJiYgdHlwZW9mIE5hdGl2ZVN5bWJvbCA9PSAnZnVuY3Rpb24nICYmICghKCdkZXNjcmlwdGlvbicgaW4gTmF0aXZlU3ltYm9sLnByb3RvdHlwZSkgfHxcbiAgLy8gU2FmYXJpIDEyIGJ1Z1xuICBOYXRpdmVTeW1ib2woKS5kZXNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkXG4pKSB7XG4gIHZhciBFbXB0eVN0cmluZ0Rlc2NyaXB0aW9uU3RvcmUgPSB7fTtcbiAgLy8gd3JhcCBTeW1ib2wgY29uc3RydWN0b3IgZm9yIGNvcnJlY3Qgd29yayB3aXRoIHVuZGVmaW5lZCBkZXNjcmlwdGlvblxuICB2YXIgU3ltYm9sV3JhcHBlciA9IGZ1bmN0aW9uIFN5bWJvbCgpIHtcbiAgICB2YXIgZGVzY3JpcHRpb24gPSBhcmd1bWVudHMubGVuZ3RoIDwgMSB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IFN0cmluZyhhcmd1bWVudHNbMF0pO1xuICAgIHZhciByZXN1bHQgPSB0aGlzIGluc3RhbmNlb2YgU3ltYm9sV3JhcHBlclxuICAgICAgPyBuZXcgTmF0aXZlU3ltYm9sKGRlc2NyaXB0aW9uKVxuICAgICAgLy8gaW4gRWRnZSAxMywgU3RyaW5nKFN5bWJvbCh1bmRlZmluZWQpKSA9PT0gJ1N5bWJvbCh1bmRlZmluZWQpJ1xuICAgICAgOiBkZXNjcmlwdGlvbiA9PT0gdW5kZWZpbmVkID8gTmF0aXZlU3ltYm9sKCkgOiBOYXRpdmVTeW1ib2woZGVzY3JpcHRpb24pO1xuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gJycpIEVtcHR5U3RyaW5nRGVzY3JpcHRpb25TdG9yZVtyZXN1bHRdID0gdHJ1ZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKFN5bWJvbFdyYXBwZXIsIE5hdGl2ZVN5bWJvbCk7XG4gIHZhciBzeW1ib2xQcm90b3R5cGUgPSBTeW1ib2xXcmFwcGVyLnByb3RvdHlwZSA9IE5hdGl2ZVN5bWJvbC5wcm90b3R5cGU7XG4gIHN5bWJvbFByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN5bWJvbFdyYXBwZXI7XG5cbiAgdmFyIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgbmF0aXZlID0gU3RyaW5nKE5hdGl2ZVN5bWJvbCgndGVzdCcpKSA9PSAnU3ltYm9sKHRlc3QpJztcbiAgdmFyIHJlZ2V4cCA9IC9eU3ltYm9sXFwoKC4qKVxcKVteKV0rJC87XG4gIGRlZmluZVByb3BlcnR5KHN5bWJvbFByb3RvdHlwZSwgJ2Rlc2NyaXB0aW9uJywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGRlc2NyaXB0aW9uKCkge1xuICAgICAgdmFyIHN5bWJvbCA9IGlzT2JqZWN0KHRoaXMpID8gdGhpcy52YWx1ZU9mKCkgOiB0aGlzO1xuICAgICAgdmFyIHN0cmluZyA9IHN5bWJvbFRvU3RyaW5nLmNhbGwoc3ltYm9sKTtcbiAgICAgIGlmIChoYXMoRW1wdHlTdHJpbmdEZXNjcmlwdGlvblN0b3JlLCBzeW1ib2wpKSByZXR1cm4gJyc7XG4gICAgICB2YXIgZGVzYyA9IG5hdGl2ZSA/IHN0cmluZy5zbGljZSg3LCAtMSkgOiBzdHJpbmcucmVwbGFjZShyZWdleHAsICckMScpO1xuICAgICAgcmV0dXJuIGRlc2MgPT09ICcnID8gdW5kZWZpbmVkIDogZGVzYztcbiAgICB9XG4gIH0pO1xuXG4gICQoeyBnbG9iYWw6IHRydWUsIGZvcmNlZDogdHJ1ZSB9LCB7XG4gICAgU3ltYm9sOiBTeW1ib2xXcmFwcGVyXG4gIH0pO1xufVxuIiwgInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuaXRlcmF0b3JgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5pdGVyYXRvclxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1wcm90b3R5cGUtZm9yZWFjaCAtLSBzYWZlXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBbXS5mb3JFYWNoICE9IGZvckVhY2ggfSwge1xuICBmb3JFYWNoOiBmb3JFYWNoXG59KTtcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERPTUl0ZXJhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb20taXRlcmFibGVzJyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxuZm9yICh2YXIgQ09MTEVDVElPTl9OQU1FIGluIERPTUl0ZXJhYmxlcykge1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtDT0xMRUNUSU9OX05BTUVdO1xuICB2YXIgQ29sbGVjdGlvblByb3RvdHlwZSA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZSAmJiBDb2xsZWN0aW9uUHJvdG90eXBlLmZvckVhY2ggIT09IGZvckVhY2gpIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsICdmb3JFYWNoJywgZm9yRWFjaCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgQ29sbGVjdGlvblByb3RvdHlwZS5mb3JFYWNoID0gZm9yRWFjaDtcbiAgfVxufVxuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRlbnRyaWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC10by1hcnJheScpLmVudHJpZXM7XG5cbi8vIGBPYmplY3QuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5lbnRyaWVzXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSB9LCB7XG4gIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoTykge1xuICAgIHJldHVybiAkZW50cmllcyhPKTtcbiAgfVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIG5vdEFSZWdFeHAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbm90LWEtcmVnZXhwJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciBjb3JyZWN0SXNSZWdFeHBMb2dpYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LWlzLXJlZ2V4cC1sb2dpYycpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tc3RyaW5nLXByb3RvdHlwZS1zdGFydHN3aXRoIC0tIHNhZmVcbnZhciAkc3RhcnRzV2l0aCA9ICcnLnN0YXJ0c1dpdGg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbnZhciBDT1JSRUNUX0lTX1JFR0VYUF9MT0dJQyA9IGNvcnJlY3RJc1JlZ0V4cExvZ2ljKCdzdGFydHNXaXRoJyk7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9wdWxsLzcwMlxudmFyIE1ETl9QT0xZRklMTF9CVUcgPSAhSVNfUFVSRSAmJiAhQ09SUkVDVF9JU19SRUdFWFBfTE9HSUMgJiYgISFmdW5jdGlvbiAoKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFN0cmluZy5wcm90b3R5cGUsICdzdGFydHNXaXRoJyk7XG4gIHJldHVybiBkZXNjcmlwdG9yICYmICFkZXNjcmlwdG9yLndyaXRhYmxlO1xufSgpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5zdGFydHN3aXRoXG4kKHsgdGFyZ2V0OiAnU3RyaW5nJywgcHJvdG86IHRydWUsIGZvcmNlZDogIU1ETl9QT0xZRklMTF9CVUcgJiYgIUNPUlJFQ1RfSVNfUkVHRVhQX0xPR0lDIH0sIHtcbiAgc3RhcnRzV2l0aDogZnVuY3Rpb24gc3RhcnRzV2l0aChzZWFyY2hTdHJpbmcgLyogLCBwb3NpdGlvbiA9IDAgKi8pIHtcbiAgICB2YXIgdGhhdCA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKTtcbiAgICBub3RBUmVnRXhwKHNlYXJjaFN0cmluZyk7XG4gICAgdmFyIGluZGV4ID0gdG9MZW5ndGgobWluKGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCB0aGF0Lmxlbmd0aCkpO1xuICAgIHZhciBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoU3RyaW5nKTtcbiAgICByZXR1cm4gJHN0YXJ0c1dpdGhcbiAgICAgID8gJHN0YXJ0c1dpdGguY2FsbCh0aGF0LCBzZWFyY2gsIGluZGV4KVxuICAgICAgOiB0aGF0LnNsaWNlKGluZGV4LCBpbmRleCArIHNlYXJjaC5sZW5ndGgpID09PSBzZWFyY2g7XG4gIH1cbn0pO1xuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcblxuLy8gYEFycmF5LmlzQXJyYXlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5pc2FycmF5XG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBzdGF0OiB0cnVlIH0sIHtcbiAgaXNBcnJheTogaXNBcnJheVxufSk7XG4iLCAiZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZm9yLWVhY2guanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLmZvci1lYWNoLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmVudHJpZXMuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuc3RhcnRzLXdpdGguanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5kYXRlLnRvLXN0cmluZy5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC50by1zdHJpbmcuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAudG8tc3RyaW5nLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaXMtYXJyYXkuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuZGVzY3JpcHRpb24uanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuaXRlcmF0b3IuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvci5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvci5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3IuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5zbGljZS5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmZ1bmN0aW9uLm5hbWUuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5mcm9tLmpzXCI7XG5cbi8vIHNpbWlsYXIgdG8gaHRtbHRvb2xzOjp0YWcoKVxuLy8gbmFtZTogU3RyaW5nXG4vLyBhdHRyczoge31cbi8vIGNoaWxkcmVuOiBhbnk/XG5mdW5jdGlvbiB0YWcobmFtZSwgYXR0cnMpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNoaWxkcmVuID0gbmV3IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleSA9IDI7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBjaGlsZHJlbltfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xuICBPYmplY3QuZW50cmllcyhhdHRycyB8fCB7fSkuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBfcmVmMiA9IF9zbGljZWRUb0FycmF5KF9yZWYsIDIpLFxuICAgICAgICBubSA9IF9yZWYyWzBdLFxuICAgICAgICB2YWwgPSBfcmVmMlsxXTtcblxuICAgIG5tLnN0YXJ0c1dpdGgoJ29uJykgJiYgbm0udG9Mb3dlckNhc2UoKSBpbiB3aW5kb3cgPyBlbC5hZGRFdmVudExpc3RlbmVyKG5tLnRvTG93ZXJDYXNlKCkuc3Vic3RyKDIpLCB2YWwpIDogZWwuc2V0QXR0cmlidXRlKG5tLCB2YWwudG9TdHJpbmcoKSk7XG4gIH0pO1xuXG4gIGlmICghY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIGFwcGVuZENoaWxkKGVsLCB4KTtcbiAgfSk7XG4gIHJldHVybiBlbDtcbn0gLy8gc2ltaWxhciB0byBodG1sdG9vbHM6OnRhZ0xpc3QoKVxuXG5cbmZ1bmN0aW9uIHRhZ0xpc3QoKSB7XG4gIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgY2hpbGRyZW4gPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICBjaGlsZHJlbltfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICB9XG5cbiAgcmV0dXJuIHRhZyhcInRlbXBsYXRlXCIsIHt9LCBjaGlsZHJlbikuY2hpbGRyZW47XG59IC8vIHNpbWlsYXIgdG8gaHRtbHRvb2xzOjpIVE1MKClcbi8vIHg6IFN0cmluZ1xuXG5cbmZ1bmN0aW9uIEhUTUwoeCkge1xuICB2YXIgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG4gIHRlbXBsYXRlLmlubmVySFRNTCA9IHg7XG4gIHJldHVybiB0ZW1wbGF0ZS5jb250ZW50O1xufSAvLyBzaW1pbGFyIHRvIGh0bWx0b29sczo6dGFnQXBwZW5kQ2hpbGRyZW4oKVxuLy8geDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05vZGVcbi8vIHk6IGFueT9cblxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZCh4LCB5KSB7XG4gIGlmICh5IGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pIHtcbiAgICB3aGlsZSAoeS5sZW5ndGggPiAwKSB7XG4gICAgICB4LmFwcGVuZENoaWxkKHlbMF0pOyAvLyB4LmFwcGVuZENoaWxkKHkpIG1vZGlmaWVzIHlcbiAgICB9XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh5KSkge1xuICAgIHkuZm9yRWFjaChmdW5jdGlvbiAoeikge1xuICAgICAgcmV0dXJuIGFwcGVuZENoaWxkKHgsIHopO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHguYXBwZW5kQ2hpbGQoeS5ub2RlVHlwZSA/IHkgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh5KSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgdGFnLCB0YWdMaXN0LCBIVE1MLCBhcHBlbmRDaGlsZCB9OyIsICIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ3NsaWNlJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgbmF0aXZlU2xpY2UgPSBbXS5zbGljZTtcbnZhciBtYXggPSBNYXRoLm1heDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zbGljZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zbGljZVxuLy8gZmFsbGJhY2sgZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmdzIGFuZCBET00gb2JqZWN0c1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfSwge1xuICBzbGljZTogZnVuY3Rpb24gc2xpY2Uoc3RhcnQsIGVuZCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGsgPSB0b0Fic29sdXRlSW5kZXgoc3RhcnQsIGxlbmd0aCk7XG4gICAgdmFyIGZpbiA9IHRvQWJzb2x1dGVJbmRleChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IGVuZCwgbGVuZ3RoKTtcbiAgICAvLyBpbmxpbmUgYEFycmF5U3BlY2llc0NyZWF0ZWAgZm9yIHVzYWdlIG5hdGl2ZSBgQXJyYXkjc2xpY2VgIHdoZXJlIGl0J3MgcG9zc2libGVcbiAgICB2YXIgQ29uc3RydWN0b3IsIHJlc3VsdCwgbjtcbiAgICBpZiAoaXNBcnJheShPKSkge1xuICAgICAgQ29uc3RydWN0b3IgPSBPLmNvbnN0cnVjdG9yO1xuICAgICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICAgIGlmICh0eXBlb2YgQ29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAoQ29uc3RydWN0b3IgPT09IEFycmF5IHx8IGlzQXJyYXkoQ29uc3RydWN0b3IucHJvdG90eXBlKSkpIHtcbiAgICAgICAgQ29uc3RydWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KENvbnN0cnVjdG9yKSkge1xuICAgICAgICBDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yW1NQRUNJRVNdO1xuICAgICAgICBpZiAoQ29uc3RydWN0b3IgPT09IG51bGwpIENvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yID09PSBBcnJheSB8fCBDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVTbGljZS5jYWxsKE8sIGssIGZpbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCA9IG5ldyAoQ29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQ29uc3RydWN0b3IpKG1heChmaW4gLSBrLCAwKSk7XG4gICAgZm9yIChuID0gMDsgayA8IGZpbjsgaysrLCBuKyspIGlmIChrIGluIE8pIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgbiwgT1trXSk7XG4gICAgcmVzdWx0Lmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCAidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBGdW5jdGlvblByb3RvdHlwZVRvU3RyaW5nID0gRnVuY3Rpb25Qcm90b3R5cGUudG9TdHJpbmc7XG52YXIgbmFtZVJFID0gL15cXHMqZnVuY3Rpb24gKFteIChdKikvO1xudmFyIE5BTUUgPSAnbmFtZSc7XG5cbi8vIEZ1bmN0aW9uIGluc3RhbmNlcyBgLm5hbWVgIHByb3BlcnR5XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWZ1bmN0aW9uLWluc3RhbmNlcy1uYW1lXG5pZiAoREVTQ1JJUFRPUlMgJiYgIShOQU1FIGluIEZ1bmN0aW9uUHJvdG90eXBlKSkge1xuICBkZWZpbmVQcm9wZXJ0eShGdW5jdGlvblByb3RvdHlwZSwgTkFNRSwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBGdW5jdGlvblByb3RvdHlwZVRvU3RyaW5nLmNhbGwodGhpcykubWF0Y2gobmFtZVJFKVsxXTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZyb20gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZnJvbScpO1xudmFyIGNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24nKTtcblxudmFyIElOQ09SUkVDVF9JVEVSQVRJT04gPSAhY2hlY2tDb3JyZWN0bmVzc09mSXRlcmF0aW9uKGZ1bmN0aW9uIChpdGVyYWJsZSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktZnJvbSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICBBcnJheS5mcm9tKGl0ZXJhYmxlKTtcbn0pO1xuXG4vLyBgQXJyYXkuZnJvbWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LmZyb21cbiQoeyB0YXJnZXQ6ICdBcnJheScsIHN0YXQ6IHRydWUsIGZvcmNlZDogSU5DT1JSRUNUX0lURVJBVElPTiB9LCB7XG4gIGZyb206IGZyb21cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG5cbnZhciBJU19DT05DQVRfU1BSRUFEQUJMRSA9IHdlbGxLbm93blN5bWJvbCgnaXNDb25jYXRTcHJlYWRhYmxlJyk7XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDB4MUZGRkZGRkZGRkZGRkY7XG52YXIgTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEID0gJ01heGltdW0gYWxsb3dlZCBpbmRleCBleGNlZWRlZCc7XG5cbi8vIFdlIGNhbid0IHVzZSB0aGlzIGZlYXR1cmUgZGV0ZWN0aW9uIGluIFY4IHNpbmNlIGl0IGNhdXNlc1xuLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82NzlcbnZhciBJU19DT05DQVRfU1BSRUFEQUJMRV9TVVBQT1JUID0gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgYXJyYXkgPSBbXTtcbiAgYXJyYXlbSVNfQ09OQ0FUX1NQUkVBREFCTEVdID0gZmFsc2U7XG4gIHJldHVybiBhcnJheS5jb25jYXQoKVswXSAhPT0gYXJyYXk7XG59KTtcblxudmFyIFNQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ2NvbmNhdCcpO1xuXG52YXIgaXNDb25jYXRTcHJlYWRhYmxlID0gZnVuY3Rpb24gKE8pIHtcbiAgaWYgKCFpc09iamVjdChPKSkgcmV0dXJuIGZhbHNlO1xuICB2YXIgc3ByZWFkYWJsZSA9IE9bSVNfQ09OQ0FUX1NQUkVBREFCTEVdO1xuICByZXR1cm4gc3ByZWFkYWJsZSAhPT0gdW5kZWZpbmVkID8gISFzcHJlYWRhYmxlIDogaXNBcnJheShPKTtcbn07XG5cbnZhciBGT1JDRUQgPSAhSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCB8fCAhU1BFQ0lFU19TVVBQT1JUO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmNvbmNhdGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5jb25jYXRcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBpc0NvbmNhdFNwcmVhZGFibGUgYW5kIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzIC0tIHJlcXVpcmVkIGZvciBgLmxlbmd0aGBcbiAgY29uY2F0OiBmdW5jdGlvbiBjb25jYXQoYXJnKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCh0aGlzKTtcbiAgICB2YXIgQSA9IGFycmF5U3BlY2llc0NyZWF0ZShPLCAwKTtcbiAgICB2YXIgbiA9IDA7XG4gICAgdmFyIGksIGssIGxlbmd0aCwgbGVuLCBFO1xuICAgIGZvciAoaSA9IC0xLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIEUgPSBpID09PSAtMSA/IE8gOiBhcmd1bWVudHNbaV07XG4gICAgICBpZiAoaXNDb25jYXRTcHJlYWRhYmxlKEUpKSB7XG4gICAgICAgIGxlbiA9IHRvTGVuZ3RoKEUubGVuZ3RoKTtcbiAgICAgICAgaWYgKG4gKyBsZW4gPiBNQVhfU0FGRV9JTlRFR0VSKSB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEKTtcbiAgICAgICAgZm9yIChrID0gMDsgayA8IGxlbjsgaysrLCBuKyspIGlmIChrIGluIEUpIGNyZWF0ZVByb3BlcnR5KEEsIG4sIEVba10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG4gPj0gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KEEsIG4rKywgRSk7XG4gICAgICB9XG4gICAgfVxuICAgIEEubGVuZ3RoID0gbjtcbiAgICByZXR1cm4gQTtcbiAgfVxufSk7XG4iLCAiaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qc1wiO1xuaW1wb3J0IHsgdGFnLCB0YWdMaXN0LCBIVE1MLCBhcHBlbmRDaGlsZCB9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBjcmVhdGVUYWJGcmFnbWVudChzZWxmLCBjbGFzc05hbWUsIHRhYnNldCkge1xuICB2YXIgdWxBdHRycyA9IHtcbiAgICBcImNsYXNzXCI6IGNsYXNzTmFtZSxcbiAgICByb2xlOiAndGFibGlzdCcsXG4gICAgJ2RhdGEtdGFic2V0aWQnOiB0YWJzZXQuaWRcbiAgfTtcbiAgdmFyIGlkID0gc2VsZi5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgaWYgKGlkKSB7XG4gICAgdWxBdHRycy5pZCA9IGlkO1xuICAgIHVsQXR0cnNbXCJjbGFzc1wiXSA9IHVsQXR0cnNbXCJjbGFzc1wiXSArICcgc2hpbnktdGFiLWlucHV0JztcbiAgfVxuXG4gIHZhciB1bFRhZyA9IHRhZygndWwnLCB1bEF0dHJzLCB0YWJzZXQudGFiTGlzdCk7IC8vIFRPRE86IHNob3VsZCB3ZSBiZSB3cmFwcGluZyBpbiBhIHJvdz9cblxuICB2YXIgY29udGVudHMgPSBbXTtcbiAgdmFyIGhlYWRlciA9IHNlbGYuZ2V0QXR0cmlidXRlKCdoZWFkZXInKTtcbiAgaWYgKGhlYWRlcikgY29udGVudHMucHVzaChIVE1MKGhlYWRlcikpO1xuICBjb250ZW50cy5wdXNoKHRhYnNldC50YWJDb250ZW50KTtcbiAgdmFyIGZvb3RlciA9IHNlbGYuZ2V0QXR0cmlidXRlKCdmb290ZXInKTtcbiAgaWYgKGZvb3RlcikgY29udGVudHMucHVzaChIVE1MKGZvb3RlcikpO1xuICB2YXIgZGl2VGFnID0gdGFnKCdkaXYnLCB7XG4gICAgXCJjbGFzc1wiOiAndGFiLWNvbnRlbnQnLFxuICAgICdkYXRhLXRhYnNldGlkJzogdGFic2V0LmlkXG4gIH0sIGNvbnRlbnRzKTtcbiAgcmV0dXJuIHRhZ0xpc3QodWxUYWcsIGRpdlRhZyk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkVGFic2V0KG5hdnMsIHNlbGVjdGVkKSB7XG4gIC8vIFRPRE86IHV0aWxpemUgdGFnTGlzdCgpIVxuICB2YXIgdGFiTGlzdCA9IG5ldyBEb2N1bWVudEZyYWdtZW50KCk7XG4gIHZhciB0YWJDb250ZW50ID0gbmV3IERvY3VtZW50RnJhZ21lbnQoKTtcbiAgdmFyIGlkID0gTWF0aC5mbG9vcigxMDAwICsgTWF0aC5yYW5kb20oKSAqIDkwMDApO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbmF2cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gYnVpbGRUYWJJdGVtKG5hdnNbaV0sIHNlbGVjdGVkLCBpZCwgaSArIDEpOyAvLyAubmF2LWNvbnRlbnQgZG9lc24ndCBuZWVkIGxpVGFnXG5cbiAgICB0YWJMaXN0LmFwcGVuZChpdGVtLmxpVGFnKTsgLy8gLm5hdi1pdGVtLy5uYXYtc3BhY2VyIGRvbid0IGhhdmUgZGl2VGFnXG5cbiAgICBpZiAoaXRlbS5kaXZUYWcpIHRhYkNvbnRlbnQuYXBwZW5kKGl0ZW0uZGl2VGFnKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdGFiTGlzdDogdGFiTGlzdCxcbiAgICB0YWJDb250ZW50OiB0YWJDb250ZW50LFxuICAgIGlkOiBpZFxuICB9O1xufVxuXG5mdW5jdGlvbiBidWlsZFRhYkl0ZW0obmF2LCBzZWxlY3RlZCwgaWQsIGluZGV4KSB7XG4gIHZhciBsaVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7IC8vbGlUYWcuY2xhc3NMaXN0LmFkZCgnbmF2LWl0ZW0nKTtcblxuICBpZiAobmF2LmNsYXNzTGlzdC5jb250YWlucygnbmF2LXNwYWNlcicpKSB7XG4gICAgbGlUYWcuY2xhc3NMaXN0LmFkZCgnYnNsaWItbmF2LXNwYWNlcicpO1xuICAgIHJldHVybiB7XG4gICAgICBsaVRhZzogbGlUYWcsXG4gICAgICBkaXZUYWc6IHVuZGVmaW5lZFxuICAgIH07XG4gIH1cblxuICBpZiAobmF2LmNsYXNzTGlzdC5jb250YWlucygnbmF2LWl0ZW0nKSkge1xuICAgIC8vIFRPRE86IGRyb3AgZm9ybS1pbmxpbmUgc2luY2UgQlM1IGRyb3BwZWQgaXQ/XG4gICAgLy8gSWYgd2UgZG8gdGhhdCBkbyB3ZSBuZWVkIGJzbGliLW5hdnMtYmFyIHRvIGdlbmVyYXRlIHZhbGlkIEJTNSBtYXJrdXA/XG4gICAgbGlUYWcuY2xhc3NMaXN0LmFkZCgnZm9ybS1pbmxpbmUnKTtcbiAgICBsaVRhZy5hcHBlbmQobmF2LmNvbnRlbnQpO1xuICAgIHJldHVybiB7XG4gICAgICBsaVRhZzogbGlUYWcsXG4gICAgICBkaXZUYWc6IHVuZGVmaW5lZFxuICAgIH07XG4gIH1cblxuICBpZiAobmF2LmNsYXNzTGlzdC5jb250YWlucygnbmF2LW1lbnUnKSkge1xuICAgIGxpVGFnLmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duJyk7XG4gICAgdmFyIGF0dHJzID0ge1xuICAgICAgaHJlZjogJyMnLFxuICAgICAgXCJjbGFzc1wiOiAnZHJvcGRvd24tdG9nZ2xlJyxcbiAgICAgICdkYXRhLXRvZ2dsZSc6ICdkcm9wZG93bicsXG4gICAgICAnZGF0YS12YWx1ZSc6IG5hdi5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJylcbiAgICB9O1xuICAgIHZhciB0b2dnbGUgPSB0YWcoJ2EnLCBhdHRycywgSFRNTChuYXYuZ2V0QXR0cmlidXRlKCd0aXRsZScpKSk7IC8vdG9nZ2xlLmNsYXNzTGlzdC5hZGQoJ25hdi1saW5rJyk7XG5cbiAgICB2YXIgbWVudSA9IHRhZygndWwnLCB7XG4gICAgICAnZGF0YS10YWJzZXRpZCc6IGlkLFxuICAgICAgXCJjbGFzc1wiOiAnZHJvcGRvd24tbWVudSdcbiAgICB9KTtcblxuICAgIGlmIChuYXYuZ2V0QXR0cmlidXRlKCdhbGlnbicpID09PSAncmlnaHQnKSB7XG4gICAgICBtZW51LmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duLW1lbnUtcmlnaHQnKTtcbiAgICB9XG5cbiAgICB2YXIgbmF2TWVudSA9IGJ1aWxkVGFic2V0KG5hdi5jb250ZW50LmNoaWxkcmVuLCBzZWxlY3RlZCk7IC8vbmF2TWVudS50YWJMaXN0LmNoaWxkcmVuLmZvckVhY2goeCA9PiB7XG4gICAgLy8gIHguY2xhc3NMaXN0LnJlbW92ZSgnbmF2LWl0ZW0nKVxuICAgIC8vICBsZXQgbGluayA9IHgucXVlcnlTZWxlY3RvcignLm5hdi1saW5rJyk7XG4gICAgLy8gIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LWxpbmsnKTtcbiAgICAvLyAgbGluay5jbGFzc0xpc3QuYWRkKCdkcm9wZG93bi1pdGVtJyk7XG4gICAgLy99KVxuXG4gICAgbWVudS5hcHBlbmQobmF2TWVudS50YWJMaXN0KTtcbiAgICBsaVRhZy5hcHBlbmQodG9nZ2xlKTtcbiAgICBsaVRhZy5hcHBlbmQobWVudSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpVGFnOiBsaVRhZyxcbiAgICAgIGRpdlRhZzogbmF2TWVudS50YWJDb250ZW50XG4gICAgfTtcbiAgfVxuXG4gIGlmIChuYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXYnKSkge1xuICAgIHZhciB0YWJJZCA9IFwidGFiLVwiLmNvbmNhdChpZCwgXCItXCIpLmNvbmNhdChpbmRleCk7IC8vIE5PVEU6IHRoaXMgc2hvdWxkIHJlYWxseSBiZSA8YnV0dG9uPiAobm90IDxhPiksIGJ1dCBTaGlueSdzXG4gICAgLy8gdGFiIHVwZGF0aW5nIGxvZ2ljIHdvdWxkIG5lZWQgdXBkYXRpbmcgdG8gc3VwcG9ydCB0aGF0XG4gICAgLy8gTk9URTogcmVxdWlyZXMgY29tcGF0aWJpbGl0eSBsYXllci4uLlxuICAgIC8vYVRhZy5jbGFzc0xpc3QuYWRkKCduYXYtbGluaycpO1xuXG4gICAgdmFyIGFUYWcgPSB0YWcoJ2EnLCB7XG4gICAgICBocmVmOiAnIycgKyB0YWJJZCxcbiAgICAgIHJvbGU6ICd0YWInLFxuICAgICAgJ2RhdGEtdG9nZ2xlJzogJ3RhYicsXG4gICAgICAnZGF0YS12YWx1ZSc6IG5hdi5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJylcbiAgICB9LCBIVE1MKG5hdi5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpKTtcbiAgICBsaVRhZy5hcHBlbmQoYVRhZyk7XG4gICAgdmFyIGRpdlRhZyA9IHRhZygnZGl2Jywge1xuICAgICAgaWQ6IHRhYklkLFxuICAgICAgXCJjbGFzc1wiOiAndGFiLXBhbmUnLFxuICAgICAgcm9sZTogJ3RhYnBhbmVsJ1xuICAgIH0sIG5hdi5jb250ZW50KTsgLy8gTk9URTogcmVxdWlyZXMgY29tcGF0aWJpbGl0eSBsYXllci4uLlxuICAgIC8vIENhbGxpbmcgdGFiLnNob3coKSB3b3VsZCBiZSBiZXR0ZXIsIGJ1dCBwcm9iYWJseSBoYXMgdG8gYmUgaW5zZXJ0ZWQgaW50byBET00gdG8gd29yaz9cblxuICAgIGlmIChzZWxlY3RlZCA9PT0gbmF2LmdldEF0dHJpYnV0ZSgndmFsdWUnKSkge1xuICAgICAgbGlUYWcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBkaXZUYWcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxpVGFnOiBsaVRhZyxcbiAgICAgIGRpdlRhZzogZGl2VGFnXG4gICAgfTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihcIkEgJ3RvcC1sZXZlbCcgPFwiLmNvbmNhdChuYW1lLCBcIj4gdGFnIHdpdGhpbiA8YnNsaWItbmF2cy10YWI+IGlzIG5vdCBzdXBwb3J0ZWRcIikpO1xufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3RlZChzZWxmKSB7XG4gIHZhciBzZWxlY3RlZCA9IHNlbGYuZ2V0QXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuXG4gIGlmICghc2VsZWN0ZWQpIHtcbiAgICBzZWxlY3RlZCA9IGZpbmRGaXJzdE5hdihzZWxmLmNoaWxkcmVuKS5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gIH1cblxuICByZXR1cm4gc2VsZWN0ZWQ7XG59XG5cbmZ1bmN0aW9uIGZpbmRGaXJzdE5hdihuYXZzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbmF2cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBuYXYgPSBuYXZzW2ldO1xuXG4gICAgaWYgKG5hdi5jbGFzc0xpc3QuY29udGFpbnMoJ25hdicpKSB7XG4gICAgICByZXR1cm4gbmF2O1xuICAgIH1cblxuICAgIGlmIChuYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXYtbWVudScpKSB7XG4gICAgICBmaW5kRmlyc3ROYXYobmF2KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVwbGFjZUNoaWxkcmVuKHgsIHkpIHtcbiAgd2hpbGUgKHguZmlyc3RDaGlsZCkge1xuICAgIHgucmVtb3ZlQ2hpbGQoeC5sYXN0Q2hpbGQpO1xuICB9XG5cbiAgYXBwZW5kQ2hpbGQoeCwgeSk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVRhYkZyYWdtZW50LCBidWlsZFRhYnNldCwgZ2V0U2VsZWN0ZWQsIHJlcGxhY2VDaGlsZHJlbiB9OyIsICJpbXBvcnQgeyB0YWcgfSBmcm9tICcuL3V0aWxzJztcblxuZnVuY3Rpb24gY3JlYXRlQ2FyZChib2R5LCBoZWFkZXIsIGZvb3Rlcikge1xuICB2YXIgY2FyZCA9IHRhZygnZGl2Jywge1xuICAgIFwiY2xhc3NcIjogJ2NhcmQnXG4gIH0pO1xuXG4gIGlmIChoZWFkZXIpIHtcbiAgICBjYXJkLmFwcGVuZCh0YWcoJ2RpdicsIHtcbiAgICAgIFwiY2xhc3NcIjogJ2NhcmQtaGVhZGVyJ1xuICAgIH0sIGhlYWRlcikpO1xuICB9XG5cbiAgY2FyZC5hcHBlbmQodGFnKCdkaXYnLCB7XG4gICAgXCJjbGFzc1wiOiAnY2FyZC1ib2R5J1xuICB9LCBib2R5KSk7XG5cbiAgaWYgKGZvb3Rlcikge1xuICAgIGNhcmQuYXBwZW5kKHRhZygnZGl2Jywge1xuICAgICAgXCJjbGFzc1wiOiAnY2FyZC1mb290ZXInXG4gICAgfSwgZm9vdGVyKSk7XG4gIH1cblxuICByZXR1cm4gY2FyZDtcbn1c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S0FBSyxhQUFhLGlCQUFpQjtBQUMvQyxVQUFJO0FBQU8sWUFBSSxVQUFVLElBQUk7QUFDN0IsVUFBSSxPQUFPLFFBQVEsV0FBVyxTQUFTLE9BQU8sV0FBVyxTQUFTLE1BQU07QUFDeEUsc0JBQWdCLE1BQU07QUFDdEIsYUFBTztBQUFBO0FBR1QsV0FBTztBQUFBLElBQ08saUNBQWlCO0FBRWpDLGlCQUFlLE9BQU8sd0JBQXdCO0FBRTlDLE1BQUksZUFBNEIseUJBQVUsZUFBZTtBQUN2RCxjQUFVLGVBQWM7QUFFeEIsUUFBSSxVQUFVLGFBQWE7QUFFM0IsNkJBQXdCO0FBQ3RCLFVBQUk7QUFFSixzQkFBZ0IsTUFBTTtBQUV0QixhQUFPLFNBQVMsUUFBUSxLQUFLO0FBQzdCLFVBQUksV0FBVyxZQUFZO0FBRTNCLFVBQUksU0FBUyxZQUFZLEtBQUssVUFBVTtBQUN4QyxVQUFJLFFBQVEsa0JBQWtCLE1BQU0sNkJBQTZCO0FBQ2pFLFVBQUksTUFBTSxNQUFNO0FBQ2hCLFVBQUksVUFBVSxNQUFNO0FBQ3BCLFVBQUksV0FBVyxZQUFZLEtBQUssYUFBYTtBQUU3QyxVQUFJLEtBQUssYUFBYSxTQUFTO0FBQzdCLG1CQUFXLFdBQVc7QUFBQTtBQUd4QixVQUFJLE1BQU0sSUFBSSxPQUFPO0FBQUEsUUFDbkIsU0FBUztBQUFBLFNBQ1IsSUFBSSxPQUFPO0FBQUEsUUFDWixTQUFTO0FBQUEsU0FDUixNQUFNLElBQUksT0FBTztBQUFBLFFBQ2xCLFNBQVMsWUFBWSxLQUFLLGFBQWE7QUFBQSxTQUN0QztBQUNILHNCQUFnQixNQUFNO0FBQ3RCLGFBQU87QUFBQTtBQUdULFdBQU87QUFBQSxJQUNPLGlDQUFpQjtBQUVqQyxpQkFBZSxPQUFPLHdCQUF3QjtBQUU5QyxNQUFJLFVBQXVCLHlCQUFVLGVBQWU7QUFDbEQsY0FBVSxVQUFTO0FBRW5CLFFBQUksVUFBVSxhQUFhO0FBRTNCLHdCQUFtQjtBQUNqQixVQUFJO0FBRUosc0JBQWdCLE1BQU07QUFFdEIsYUFBTyxTQUFTLFFBQVEsS0FBSztBQUM3QixVQUFJLFdBQVcsWUFBWTtBQUMzQixVQUFJLFNBQVMsWUFBWSxLQUFLLFVBQVU7QUFDeEMsVUFBSSxTQUFTLGtCQUFrQixNQUFNLGtCQUFrQjtBQUl2RCxhQUFPO0FBQUE7QUFHVCxXQUFPO0FBQUEsSUFDTyxpQ0FBaUI7QUFFakMsaUJBQWUsT0FBTyxrQkFBa0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
