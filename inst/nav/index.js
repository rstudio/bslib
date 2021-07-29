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
  var __esm = function(fn, res) {
    return function __init() {
      return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
    };
  };
  var __commonJS = function(cb, mod) {
    return function __require() {
      return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
  };
  var __reExport = function(target, module, desc) {
    if (module && typeof module === "object" || typeof module === "function")
      for (var keys2 = __getOwnPropNames(module), i = 0, n = keys2.length, key; i < n; i++) {
        key = keys2[i];
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
      var fails13 = require_fails();
      module.exports = !fails13(function() {
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
      var fails13 = require_fails();
      var classof = require_classof_raw();
      var split = "".split;
      module.exports = fails13(function() {
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
      var IndexedObject2 = require_indexed_object();
      var requireObjectCoercible4 = require_require_object_coercible();
      module.exports = function(it) {
        return IndexedObject2(requireObjectCoercible4(it));
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
      var isObject7 = require_is_object();
      module.exports = function(input, PREFERRED_STRING) {
        if (!isObject7(input))
          return input;
        var fn, val;
        if (PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject7(val = fn.call(input)))
          return val;
        if (typeof (fn = input.valueOf) == "function" && !isObject7(val = fn.call(input)))
          return val;
        if (!PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject7(val = fn.call(input)))
          return val;
        throw TypeError("Can't convert object to primitive value");
      };
    }
  });

  // node_modules/core-js/internals/to-object.js
  var require_to_object = __commonJS({
    "node_modules/core-js/internals/to-object.js": function(exports, module) {
      var requireObjectCoercible4 = require_require_object_coercible();
      module.exports = function(argument) {
        return Object(requireObjectCoercible4(argument));
      };
    }
  });

  // node_modules/core-js/internals/has.js
  var require_has = __commonJS({
    "node_modules/core-js/internals/has.js": function(exports, module) {
      var toObject5 = require_to_object();
      var hasOwnProperty = {}.hasOwnProperty;
      module.exports = Object.hasOwn || function hasOwn(it, key) {
        return hasOwnProperty.call(toObject5(it), key);
      };
    }
  });

  // node_modules/core-js/internals/document-create-element.js
  var require_document_create_element = __commonJS({
    "node_modules/core-js/internals/document-create-element.js": function(exports, module) {
      var global6 = require_global();
      var isObject7 = require_is_object();
      var document2 = global6.document;
      var EXISTS = isObject7(document2) && isObject7(document2.createElement);
      module.exports = function(it) {
        return EXISTS ? document2.createElement(it) : {};
      };
    }
  });

  // node_modules/core-js/internals/ie8-dom-define.js
  var require_ie8_dom_define = __commonJS({
    "node_modules/core-js/internals/ie8-dom-define.js": function(exports, module) {
      var DESCRIPTORS8 = require_descriptors();
      var fails13 = require_fails();
      var createElement2 = require_document_create_element();
      module.exports = !DESCRIPTORS8 && !fails13(function() {
        return Object.defineProperty(createElement2("div"), "a", {
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
      var DESCRIPTORS8 = require_descriptors();
      var propertyIsEnumerableModule2 = require_object_property_is_enumerable();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      var toIndexedObject4 = require_to_indexed_object();
      var toPrimitive2 = require_to_primitive();
      var has3 = require_has();
      var IE8_DOM_DEFINE = require_ie8_dom_define();
      var $getOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
      exports.f = DESCRIPTORS8 ? $getOwnPropertyDescriptor2 : function getOwnPropertyDescriptor3(O, P) {
        O = toIndexedObject4(O);
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
      var isObject7 = require_is_object();
      module.exports = function(it) {
        if (!isObject7(it)) {
          throw TypeError(String(it) + " is not an object");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/object-define-property.js
  var require_object_define_property = __commonJS({
    "node_modules/core-js/internals/object-define-property.js": function(exports) {
      var DESCRIPTORS8 = require_descriptors();
      var IE8_DOM_DEFINE = require_ie8_dom_define();
      var anObject7 = require_an_object();
      var toPrimitive2 = require_to_primitive();
      var $defineProperty2 = Object.defineProperty;
      exports.f = DESCRIPTORS8 ? $defineProperty2 : function defineProperty4(O, P, Attributes) {
        anObject7(O);
        P = toPrimitive2(P, true);
        anObject7(Attributes);
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
      var DESCRIPTORS8 = require_descriptors();
      var definePropertyModule2 = require_object_define_property();
      var createPropertyDescriptor2 = require_create_property_descriptor();
      module.exports = DESCRIPTORS8 ? function(object, key, value) {
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
      var WeakMap2 = global6.WeakMap;
      module.exports = typeof WeakMap2 === "function" && /native code/.test(inspectSource(WeakMap2));
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
      var IS_PURE2 = require_is_pure();
      var store = require_shared_store();
      (module.exports = function(key, value) {
        return store[key] || (store[key] = value !== void 0 ? value : {});
      })("versions", []).push({
        version: "3.15.2",
        mode: IS_PURE2 ? "pure" : "global",
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
      var keys2 = shared2("keys");
      module.exports = function(key) {
        return keys2[key] || (keys2[key] = uid2(key));
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
      var isObject7 = require_is_object();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var objectHas = require_has();
      var shared2 = require_shared_store();
      var sharedKey2 = require_shared_key();
      var hiddenKeys2 = require_hidden_keys();
      var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
      var WeakMap2 = global6.WeakMap;
      var set;
      var get;
      var has3;
      var enforce = function(it) {
        return has3(it) ? get(it) : set(it, {});
      };
      var getterFor = function(TYPE) {
        return function(it) {
          var state;
          if (!isObject7(it) || (state = get(it)).type !== TYPE) {
            throw TypeError("Incompatible receiver, " + TYPE + " required");
          }
          return state;
        };
      };
      if (NATIVE_WEAK_MAP || shared2.state) {
        store = shared2.state || (shared2.state = new WeakMap2());
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
      var toInteger2 = require_to_integer();
      var min3 = Math.min;
      module.exports = function(argument) {
        return argument > 0 ? min3(toInteger2(argument), 9007199254740991) : 0;
      };
    }
  });

  // node_modules/core-js/internals/to-absolute-index.js
  var require_to_absolute_index = __commonJS({
    "node_modules/core-js/internals/to-absolute-index.js": function(exports, module) {
      var toInteger2 = require_to_integer();
      var max2 = Math.max;
      var min3 = Math.min;
      module.exports = function(index, length) {
        var integer = toInteger2(index);
        return integer < 0 ? max2(integer + length, 0) : min3(integer, length);
      };
    }
  });

  // node_modules/core-js/internals/array-includes.js
  var require_array_includes = __commonJS({
    "node_modules/core-js/internals/array-includes.js": function(exports, module) {
      var toIndexedObject4 = require_to_indexed_object();
      var toLength5 = require_to_length();
      var toAbsoluteIndex = require_to_absolute_index();
      var createMethod = function(IS_INCLUDES) {
        return function($this, el, fromIndex) {
          var O = toIndexedObject4($this);
          var length = toLength5(O.length);
          var index = toAbsoluteIndex(fromIndex, length);
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
      var toIndexedObject4 = require_to_indexed_object();
      var indexOf = require_array_includes().indexOf;
      var hiddenKeys2 = require_hidden_keys();
      module.exports = function(object, names) {
        var O = toIndexedObject4(object);
        var i = 0;
        var result = [];
        var key;
        for (key in O)
          !has3(hiddenKeys2, key) && has3(O, key) && result.push(key);
        while (names.length > i)
          if (has3(O, key = names[i++])) {
            ~indexOf(result, key) || result.push(key);
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
      exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames3(O) {
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
      var anObject7 = require_an_object();
      module.exports = getBuiltIn3("Reflect", "ownKeys") || function ownKeys(it) {
        var keys2 = getOwnPropertyNamesModule2.f(anObject7(it));
        var getOwnPropertySymbols3 = getOwnPropertySymbolsModule2.f;
        return getOwnPropertySymbols3 ? keys2.concat(getOwnPropertySymbols3(it)) : keys2;
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
        var keys2 = ownKeys(source);
        var defineProperty4 = definePropertyModule2.f;
        var getOwnPropertyDescriptor3 = getOwnPropertyDescriptorModule2.f;
        for (var i = 0; i < keys2.length; i++) {
          var key = keys2[i];
          if (!has3(target, key))
            defineProperty4(target, key, getOwnPropertyDescriptor3(source, key));
        }
      };
    }
  });

  // node_modules/core-js/internals/is-forced.js
  var require_is_forced = __commonJS({
    "node_modules/core-js/internals/is-forced.js": function(exports, module) {
      var fails13 = require_fails();
      var replacement = /#|\.prototype\./;
      var isForced = function(feature, detection) {
        var value = data[normalize(feature)];
        return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails13(detection) : !!detection;
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
        var FORCED4, target, key, targetProperty, sourceProperty, descriptor;
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
            FORCED4 = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
            if (!FORCED4 && targetProperty !== void 0) {
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

  // node_modules/core-js/internals/function-bind.js
  var require_function_bind = __commonJS({
    "node_modules/core-js/internals/function-bind.js": function(exports, module) {
      "use strict";
      var aFunction2 = require_a_function();
      var isObject7 = require_is_object();
      var slice = [].slice;
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
        var partArgs = slice.call(arguments, 1);
        var boundFunction = function bound() {
          var args = partArgs.concat(slice.call(arguments));
          return this instanceof boundFunction ? construct2(fn, args.length, args) : fn.apply(that, args);
        };
        if (isObject7(fn.prototype))
          boundFunction.prototype = fn.prototype;
        return boundFunction;
      };
    }
  });

  // node_modules/core-js/modules/es.function.bind.js
  var $, bind;
  var init_es_function_bind = __esm({
    "node_modules/core-js/modules/es.function.bind.js": function() {
      $ = require_export();
      bind = require_function_bind();
      $({ target: "Function", proto: true }, {
        bind: bind
      });
    }
  });

  // node_modules/core-js/internals/is-array.js
  var require_is_array = __commonJS({
    "node_modules/core-js/internals/is-array.js": function(exports, module) {
      var classof = require_classof_raw();
      module.exports = Array.isArray || function isArray4(arg) {
        return classof(arg) == "Array";
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
      var process2 = global6.process;
      var versions = process2 && process2.versions;
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
      var fails13 = require_fails();
      module.exports = !!Object.getOwnPropertySymbols && !fails13(function() {
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
      module.exports = function(name) {
        if (!has3(WellKnownSymbolsStore2, name) || !(NATIVE_SYMBOL2 || typeof WellKnownSymbolsStore2[name] == "string")) {
          if (NATIVE_SYMBOL2 && has3(Symbol2, name)) {
            WellKnownSymbolsStore2[name] = Symbol2[name];
          } else {
            WellKnownSymbolsStore2[name] = createWellKnownSymbol("Symbol." + name);
          }
        }
        return WellKnownSymbolsStore2[name];
      };
    }
  });

  // node_modules/core-js/internals/array-species-create.js
  var require_array_species_create = __commonJS({
    "node_modules/core-js/internals/array-species-create.js": function(exports, module) {
      var isObject7 = require_is_object();
      var isArray4 = require_is_array();
      var wellKnownSymbol5 = require_well_known_symbol();
      var SPECIES = wellKnownSymbol5("species");
      module.exports = function(originalArray, length) {
        var C;
        if (isArray4(originalArray)) {
          C = originalArray.constructor;
          if (typeof C == "function" && (C === Array || isArray4(C.prototype)))
            C = void 0;
          else if (isObject7(C)) {
            C = C[SPECIES];
            if (C === null)
              C = void 0;
          }
        }
        return new (C === void 0 ? Array : C)(length === 0 ? 0 : length);
      };
    }
  });

  // node_modules/core-js/internals/array-method-has-species-support.js
  var require_array_method_has_species_support = __commonJS({
    "node_modules/core-js/internals/array-method-has-species-support.js": function(exports, module) {
      var fails13 = require_fails();
      var wellKnownSymbol5 = require_well_known_symbol();
      var V8_VERSION2 = require_engine_v8_version();
      var SPECIES = wellKnownSymbol5("species");
      module.exports = function(METHOD_NAME) {
        return V8_VERSION2 >= 51 || !fails13(function() {
          var array = [];
          var constructor = array.constructor = {};
          constructor[SPECIES] = function() {
            return { foo: 1 };
          };
          return array[METHOD_NAME](Boolean).foo !== 1;
        });
      };
    }
  });

  // node_modules/core-js/modules/es.array.concat.js
  var $2, fails, isArray, isObject, toObject, toLength, createProperty, arraySpeciesCreate, arrayMethodHasSpeciesSupport, wellKnownSymbol, V8_VERSION, IS_CONCAT_SPREADABLE, MAX_SAFE_INTEGER, MAXIMUM_ALLOWED_INDEX_EXCEEDED, IS_CONCAT_SPREADABLE_SUPPORT, SPECIES_SUPPORT, isConcatSpreadable, FORCED;
  var init_es_array_concat = __esm({
    "node_modules/core-js/modules/es.array.concat.js": function() {
      "use strict";
      $2 = require_export();
      fails = require_fails();
      isArray = require_is_array();
      isObject = require_is_object();
      toObject = require_to_object();
      toLength = require_to_length();
      createProperty = require_create_property();
      arraySpeciesCreate = require_array_species_create();
      arrayMethodHasSpeciesSupport = require_array_method_has_species_support();
      wellKnownSymbol = require_well_known_symbol();
      V8_VERSION = require_engine_v8_version();
      IS_CONCAT_SPREADABLE = wellKnownSymbol("isConcatSpreadable");
      MAX_SAFE_INTEGER = 9007199254740991;
      MAXIMUM_ALLOWED_INDEX_EXCEEDED = "Maximum allowed index exceeded";
      IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function() {
        var array = [];
        array[IS_CONCAT_SPREADABLE] = false;
        return array.concat()[0] !== array;
      });
      SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("concat");
      isConcatSpreadable = function(O) {
        if (!isObject(O))
          return false;
        var spreadable = O[IS_CONCAT_SPREADABLE];
        return spreadable !== void 0 ? !!spreadable : isArray(O);
      };
      FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
      $2({ target: "Array", proto: true, forced: FORCED }, {
        concat: function concat(arg) {
          var O = toObject(this);
          var A = arraySpeciesCreate(O, 0);
          var n = 0;
          var i, k, length, len, E;
          for (i = -1, length = arguments.length; i < length; i++) {
            E = i === -1 ? O : arguments[i];
            if (isConcatSpreadable(E)) {
              len = toLength(E.length);
              if (n + len > MAX_SAFE_INTEGER)
                throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
              for (k = 0; k < len; k++, n++)
                if (k in E)
                  createProperty(A, n, E[k]);
            } else {
              if (n >= MAX_SAFE_INTEGER)
                throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
              createProperty(A, n++, E);
            }
          }
          A.length = n;
          return A;
        }
      });
    }
  });

  // node_modules/core-js/modules/es.function.name.js
  var DESCRIPTORS, defineProperty, FunctionPrototype, FunctionPrototypeToString, nameRE, NAME;
  var init_es_function_name = __esm({
    "node_modules/core-js/modules/es.function.name.js": function() {
      DESCRIPTORS = require_descriptors();
      defineProperty = require_object_define_property().f;
      FunctionPrototype = Function.prototype;
      FunctionPrototypeToString = FunctionPrototype.toString;
      nameRE = /^\s*function ([^ (]*)/;
      NAME = "name";
      if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
        defineProperty(FunctionPrototype, NAME, {
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

  // node_modules/core-js/internals/array-iteration.js
  var require_array_iteration = __commonJS({
    "node_modules/core-js/internals/array-iteration.js": function(exports, module) {
      var bind3 = require_function_bind_context();
      var IndexedObject2 = require_indexed_object();
      var toObject5 = require_to_object();
      var toLength5 = require_to_length();
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
          var O = toObject5($this);
          var self2 = IndexedObject2(O);
          var boundFunction = bind3(callbackfn, that, 3);
          var length = toLength5(self2.length);
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

  // node_modules/core-js/internals/array-method-is-strict.js
  var require_array_method_is_strict = __commonJS({
    "node_modules/core-js/internals/array-method-is-strict.js": function(exports, module) {
      "use strict";
      var fails13 = require_fails();
      module.exports = function(METHOD_NAME, argument) {
        var method = [][METHOD_NAME];
        return !!method && fails13(function() {
          method.call(null, argument || function() {
            throw 1;
          }, 1);
        });
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

  // node_modules/core-js/modules/es.array.for-each.js
  var $3, forEach;
  var init_es_array_for_each = __esm({
    "node_modules/core-js/modules/es.array.for-each.js": function() {
      "use strict";
      $3 = require_export();
      forEach = require_array_for_each();
      $3({ target: "Array", proto: true, forced: [].forEach != forEach }, {
        forEach: forEach
      });
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

  // node_modules/core-js/modules/es.array.map.js
  var $4, $map, arrayMethodHasSpeciesSupport2, HAS_SPECIES_SUPPORT;
  var init_es_array_map = __esm({
    "node_modules/core-js/modules/es.array.map.js": function() {
      "use strict";
      $4 = require_export();
      $map = require_array_iteration().map;
      arrayMethodHasSpeciesSupport2 = require_array_method_has_species_support();
      HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport2("map");
      $4({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT }, {
        map: function map(callbackfn) {
          return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
        }
      });
    }
  });

  // node_modules/core-js/internals/a-possible-prototype.js
  var require_a_possible_prototype = __commonJS({
    "node_modules/core-js/internals/a-possible-prototype.js": function(exports, module) {
      var isObject7 = require_is_object();
      module.exports = function(it) {
        if (!isObject7(it) && it !== null) {
          throw TypeError("Can't set " + String(it) + " as a prototype");
        }
        return it;
      };
    }
  });

  // node_modules/core-js/internals/object-set-prototype-of.js
  var require_object_set_prototype_of = __commonJS({
    "node_modules/core-js/internals/object-set-prototype-of.js": function(exports, module) {
      var anObject7 = require_an_object();
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
          anObject7(O);
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
      var fails13 = require_fails();
      module.exports = !fails13(function() {
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
      var toObject5 = require_to_object();
      var sharedKey2 = require_shared_key();
      var CORRECT_PROTOTYPE_GETTER2 = require_correct_prototype_getter();
      var IE_PROTO = sharedKey2("IE_PROTO");
      var ObjectPrototype2 = Object.prototype;
      module.exports = CORRECT_PROTOTYPE_GETTER2 ? Object.getPrototypeOf : function(O) {
        O = toObject5(O);
        if (has3(O, IE_PROTO))
          return O[IE_PROTO];
        if (typeof O.constructor == "function" && O instanceof O.constructor) {
          return O.constructor.prototype;
        }
        return O instanceof Object ? ObjectPrototype2 : null;
      };
    }
  });

  // node_modules/core-js/internals/object-keys.js
  var require_object_keys = __commonJS({
    "node_modules/core-js/internals/object-keys.js": function(exports, module) {
      var internalObjectKeys = require_object_keys_internal();
      var enumBugKeys = require_enum_bug_keys();
      module.exports = Object.keys || function keys2(O) {
        return internalObjectKeys(O, enumBugKeys);
      };
    }
  });

  // node_modules/core-js/internals/object-define-properties.js
  var require_object_define_properties = __commonJS({
    "node_modules/core-js/internals/object-define-properties.js": function(exports, module) {
      var DESCRIPTORS8 = require_descriptors();
      var definePropertyModule2 = require_object_define_property();
      var anObject7 = require_an_object();
      var objectKeys2 = require_object_keys();
      module.exports = DESCRIPTORS8 ? Object.defineProperties : function defineProperties3(O, Properties) {
        anObject7(O);
        var keys2 = objectKeys2(Properties);
        var length = keys2.length;
        var index = 0;
        var key;
        while (length > index)
          definePropertyModule2.f(O, key = keys2[index++], Properties[key]);
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
      var anObject7 = require_an_object();
      var defineProperties3 = require_object_define_properties();
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
          EmptyConstructor[PROTOTYPE2] = anObject7(O);
          result = new EmptyConstructor();
          EmptyConstructor[PROTOTYPE2] = null;
          result[IE_PROTO] = O;
        } else
          result = NullProtoObject();
        return Properties === void 0 ? result : defineProperties3(result, Properties);
      };
    }
  });

  // node_modules/core-js/modules/es.reflect.construct.js
  var $7, getBuiltIn, aFunction, anObject, isObject2, create, bind2, fails3, nativeConstruct, NEW_TARGET_BUG, ARGS_BUG, FORCED2;
  var init_es_reflect_construct = __esm({
    "node_modules/core-js/modules/es.reflect.construct.js": function() {
      $7 = require_export();
      getBuiltIn = require_get_built_in();
      aFunction = require_a_function();
      anObject = require_an_object();
      isObject2 = require_is_object();
      create = require_object_create();
      bind2 = require_function_bind();
      fails3 = require_fails();
      nativeConstruct = getBuiltIn("Reflect", "construct");
      NEW_TARGET_BUG = fails3(function() {
        function F() {
        }
        return !(nativeConstruct(function() {
        }, [], F) instanceof F);
      });
      ARGS_BUG = !fails3(function() {
        nativeConstruct(function() {
        });
      });
      FORCED2 = NEW_TARGET_BUG || ARGS_BUG;
      $7({ target: "Reflect", stat: true, forced: FORCED2, sham: FORCED2 }, {
        construct: function construct(Target, args) {
          aFunction(Target);
          anObject(args);
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
            return new (bind2.apply(Target, $args))();
          }
          var proto = newTarget.prototype;
          var instance = create(isObject2(proto) ? proto : Object.prototype);
          var result = Function.apply.call(Target, instance, args);
          return isObject2(result) ? result : instance;
        }
      });
    }
  });

  // node_modules/core-js/modules/es.object.define-property.js
  var $9, DESCRIPTORS3, objectDefinePropertyModile;
  var init_es_object_define_property = __esm({
    "node_modules/core-js/modules/es.object.define-property.js": function() {
      $9 = require_export();
      DESCRIPTORS3 = require_descriptors();
      objectDefinePropertyModile = require_object_define_property();
      $9({ target: "Object", stat: true, forced: !DESCRIPTORS3, sham: !DESCRIPTORS3 }, {
        defineProperty: objectDefinePropertyModile.f
      });
    }
  });

  // node_modules/core-js/internals/object-get-own-property-names-external.js
  var require_object_get_own_property_names_external = __commonJS({
    "node_modules/core-js/internals/object-get-own-property-names-external.js": function(exports, module) {
      var toIndexedObject4 = require_to_indexed_object();
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
      module.exports.f = function getOwnPropertyNames3(it) {
        return windowNames && toString2.call(it) == "[object Window]" ? getWindowNames(it) : $getOwnPropertyNames2(toIndexedObject4(it));
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

  // node_modules/core-js/modules/es.symbol.js
  var $10, global3, getBuiltIn2, IS_PURE, DESCRIPTORS4, NATIVE_SYMBOL, USE_SYMBOL_AS_UID, fails4, has, isArray2, isObject3, anObject2, toObject3, toIndexedObject, toPrimitive, createPropertyDescriptor, nativeObjectCreate, objectKeys, getOwnPropertyNamesModule, getOwnPropertyNamesExternal, getOwnPropertySymbolsModule, getOwnPropertyDescriptorModule, definePropertyModule, propertyIsEnumerableModule, createNonEnumerableProperty2, redefine, shared, sharedKey, hiddenKeys, uid, wellKnownSymbol2, wrappedWellKnownSymbolModule, defineWellKnownSymbol, setToStringTag, InternalStateModule, $forEach, HIDDEN, SYMBOL, PROTOTYPE, TO_PRIMITIVE, setInternalState, getInternalState, ObjectPrototype, $Symbol, $stringify, nativeGetOwnPropertyDescriptor, nativeDefineProperty, nativeGetOwnPropertyNames, nativePropertyIsEnumerable, AllSymbols, ObjectPrototypeSymbols, StringToSymbolRegistry, SymbolToStringRegistry, WellKnownSymbolsStore, QObject, USE_SETTER, setSymbolDescriptor, wrap, isSymbol, $defineProperty, $defineProperties, $create, $propertyIsEnumerable, $getOwnPropertyDescriptor, $getOwnPropertyNames, $getOwnPropertySymbols, FORCED_JSON_STRINGIFY;
  var init_es_symbol = __esm({
    "node_modules/core-js/modules/es.symbol.js": function() {
      "use strict";
      $10 = require_export();
      global3 = require_global();
      getBuiltIn2 = require_get_built_in();
      IS_PURE = require_is_pure();
      DESCRIPTORS4 = require_descriptors();
      NATIVE_SYMBOL = require_native_symbol();
      USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
      fails4 = require_fails();
      has = require_has();
      isArray2 = require_is_array();
      isObject3 = require_is_object();
      anObject2 = require_an_object();
      toObject3 = require_to_object();
      toIndexedObject = require_to_indexed_object();
      toPrimitive = require_to_primitive();
      createPropertyDescriptor = require_create_property_descriptor();
      nativeObjectCreate = require_object_create();
      objectKeys = require_object_keys();
      getOwnPropertyNamesModule = require_object_get_own_property_names();
      getOwnPropertyNamesExternal = require_object_get_own_property_names_external();
      getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
      getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor();
      definePropertyModule = require_object_define_property();
      propertyIsEnumerableModule = require_object_property_is_enumerable();
      createNonEnumerableProperty2 = require_create_non_enumerable_property();
      redefine = require_redefine();
      shared = require_shared();
      sharedKey = require_shared_key();
      hiddenKeys = require_hidden_keys();
      uid = require_uid();
      wellKnownSymbol2 = require_well_known_symbol();
      wrappedWellKnownSymbolModule = require_well_known_symbol_wrapped();
      defineWellKnownSymbol = require_define_well_known_symbol();
      setToStringTag = require_set_to_string_tag();
      InternalStateModule = require_internal_state();
      $forEach = require_array_iteration().forEach;
      HIDDEN = sharedKey("hidden");
      SYMBOL = "Symbol";
      PROTOTYPE = "prototype";
      TO_PRIMITIVE = wellKnownSymbol2("toPrimitive");
      setInternalState = InternalStateModule.set;
      getInternalState = InternalStateModule.getterFor(SYMBOL);
      ObjectPrototype = Object[PROTOTYPE];
      $Symbol = global3.Symbol;
      $stringify = getBuiltIn2("JSON", "stringify");
      nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
      nativeDefineProperty = definePropertyModule.f;
      nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
      nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
      AllSymbols = shared("symbols");
      ObjectPrototypeSymbols = shared("op-symbols");
      StringToSymbolRegistry = shared("string-to-symbol-registry");
      SymbolToStringRegistry = shared("symbol-to-string-registry");
      WellKnownSymbolsStore = shared("wks");
      QObject = global3.QObject;
      USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
      setSymbolDescriptor = DESCRIPTORS4 && fails4(function() {
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
      wrap = function(tag, description) {
        var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
        setInternalState(symbol, {
          type: SYMBOL,
          tag: tag,
          description: description
        });
        if (!DESCRIPTORS4)
          symbol.description = description;
        return symbol;
      };
      isSymbol = USE_SYMBOL_AS_UID ? function(it) {
        return typeof it == "symbol";
      } : function(it) {
        return Object(it) instanceof $Symbol;
      };
      $defineProperty = function defineProperty2(O, P, Attributes) {
        if (O === ObjectPrototype)
          $defineProperty(ObjectPrototypeSymbols, P, Attributes);
        anObject2(O);
        var key = toPrimitive(P, true);
        anObject2(Attributes);
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
      $defineProperties = function defineProperties(O, Properties) {
        anObject2(O);
        var properties = toIndexedObject(Properties);
        var keys2 = objectKeys(properties).concat($getOwnPropertySymbols(properties));
        $forEach(keys2, function(key) {
          if (!DESCRIPTORS4 || $propertyIsEnumerable.call(properties, key))
            $defineProperty(O, key, properties[key]);
        });
        return O;
      };
      $create = function create3(O, Properties) {
        return Properties === void 0 ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
      };
      $propertyIsEnumerable = function propertyIsEnumerable(V) {
        var P = toPrimitive(V, true);
        var enumerable = nativePropertyIsEnumerable.call(this, P);
        if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P))
          return false;
        return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
      };
      $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
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
      $getOwnPropertyNames = function getOwnPropertyNames(O) {
        var names = nativeGetOwnPropertyNames(toIndexedObject(O));
        var result = [];
        $forEach(names, function(key) {
          if (!has(AllSymbols, key) && !has(hiddenKeys, key))
            result.push(key);
        });
        return result;
      };
      $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
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
          var tag = uid(description);
          var setter = function(value) {
            if (this === ObjectPrototype)
              setter.call(ObjectPrototypeSymbols, value);
            if (has(this, HIDDEN) && has(this[HIDDEN], tag))
              this[HIDDEN][tag] = false;
            setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
          };
          if (DESCRIPTORS4 && USE_SETTER)
            setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
          return wrap(tag, description);
        };
        redefine($Symbol[PROTOTYPE], "toString", function toString2() {
          return getInternalState(this).tag;
        });
        redefine($Symbol, "withoutSetter", function(description) {
          return wrap(uid(description), description);
        });
        propertyIsEnumerableModule.f = $propertyIsEnumerable;
        definePropertyModule.f = $defineProperty;
        getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
        getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
        getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
        wrappedWellKnownSymbolModule.f = function(name) {
          return wrap(wellKnownSymbol2(name), name);
        };
        if (DESCRIPTORS4) {
          nativeDefineProperty($Symbol[PROTOTYPE], "description", {
            configurable: true,
            get: function description() {
              return getInternalState(this).description;
            }
          });
          if (!IS_PURE) {
            redefine(ObjectPrototype, "propertyIsEnumerable", $propertyIsEnumerable, { unsafe: true });
          }
        }
      }
      $10({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
        Symbol: $Symbol
      });
      $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
        defineWellKnownSymbol(name);
      });
      $10({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
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
      $10({ target: "Object", stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS4 }, {
        create: $create,
        defineProperty: $defineProperty,
        defineProperties: $defineProperties,
        getOwnPropertyDescriptor: $getOwnPropertyDescriptor
      });
      $10({ target: "Object", stat: true, forced: !NATIVE_SYMBOL }, {
        getOwnPropertyNames: $getOwnPropertyNames,
        getOwnPropertySymbols: $getOwnPropertySymbols
      });
      $10({ target: "Object", stat: true, forced: fails4(function() {
        getOwnPropertySymbolsModule.f(1);
      }) }, {
        getOwnPropertySymbols: function getOwnPropertySymbols2(it) {
          return getOwnPropertySymbolsModule.f(toObject3(it));
        }
      });
      if ($stringify) {
        FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails4(function() {
          var symbol = $Symbol();
          return $stringify([symbol]) != "[null]" || $stringify({ a: symbol }) != "{}" || $stringify(Object(symbol)) != "{}";
        });
        $10({ target: "JSON", stat: true, forced: FORCED_JSON_STRINGIFY }, {
          stringify: function stringify(it, replacer, space) {
            var args = [it];
            var index = 1;
            var $replacer;
            while (arguments.length > index)
              args.push(arguments[index++]);
            $replacer = replacer;
            if (!isObject3(replacer) && it === void 0 || isSymbol(it))
              return;
            if (!isArray2(replacer))
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
      if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
        createNonEnumerableProperty2($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
      }
      setToStringTag($Symbol, SYMBOL);
      hiddenKeys[HIDDEN] = true;
    }
  });

  // node_modules/core-js/modules/es.symbol.description.js
  var $11, DESCRIPTORS5, global4, has2, isObject4, defineProperty3, copyConstructorProperties, NativeSymbol, EmptyStringDescriptionStore, SymbolWrapper, symbolPrototype, symbolToString, native, regexp;
  var init_es_symbol_description = __esm({
    "node_modules/core-js/modules/es.symbol.description.js": function() {
      "use strict";
      $11 = require_export();
      DESCRIPTORS5 = require_descriptors();
      global4 = require_global();
      has2 = require_has();
      isObject4 = require_is_object();
      defineProperty3 = require_object_define_property().f;
      copyConstructorProperties = require_copy_constructor_properties();
      NativeSymbol = global4.Symbol;
      if (DESCRIPTORS5 && typeof NativeSymbol == "function" && (!("description" in NativeSymbol.prototype) || NativeSymbol().description !== void 0)) {
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
        defineProperty3(symbolPrototype, "description", {
          configurable: true,
          get: function description() {
            var symbol = isObject4(this) ? this.valueOf() : this;
            var string = symbolToString.call(symbol);
            if (has2(EmptyStringDescriptionStore, symbol))
              return "";
            var desc = native ? string.slice(7, -1) : string.replace(regexp, "$1");
            return desc === "" ? void 0 : desc;
          }
        });
        $11({ global: true, forced: true }, {
          Symbol: SymbolWrapper
        });
      }
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
        var O, tag, result;
        return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG2)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : result;
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

  // node_modules/core-js/modules/es.object.to-string.js
  var TO_STRING_TAG_SUPPORT, redefine2, toString;
  var init_es_object_to_string = __esm({
    "node_modules/core-js/modules/es.object.to-string.js": function() {
      TO_STRING_TAG_SUPPORT = require_to_string_tag_support();
      redefine2 = require_redefine();
      toString = require_object_to_string();
      if (!TO_STRING_TAG_SUPPORT) {
        redefine2(Object.prototype, "toString", toString, { unsafe: true });
      }
    }
  });

  // node_modules/core-js/modules/es.symbol.iterator.js
  var defineWellKnownSymbol2;
  var init_es_symbol_iterator = __esm({
    "node_modules/core-js/modules/es.symbol.iterator.js": function() {
      defineWellKnownSymbol2 = require_define_well_known_symbol();
      defineWellKnownSymbol2("iterator");
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
      var fails13 = require_fails();
      var getPrototypeOf2 = require_object_get_prototype_of();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var has3 = require_has();
      var wellKnownSymbol5 = require_well_known_symbol();
      var IS_PURE2 = require_is_pure();
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
      var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == void 0 || fails13(function() {
        var test = {};
        return IteratorPrototype[ITERATOR2].call(test) !== test;
      });
      if (NEW_ITERATOR_PROTOTYPE)
        IteratorPrototype = {};
      if ((!IS_PURE2 || NEW_ITERATOR_PROTOTYPE) && !has3(IteratorPrototype, ITERATOR2)) {
        createNonEnumerableProperty4(IteratorPrototype, ITERATOR2, returnThis);
      }
      module.exports = {
        IteratorPrototype: IteratorPrototype,
        BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
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
      var $22 = require_export();
      var createIteratorConstructor = require_create_iterator_constructor();
      var getPrototypeOf2 = require_object_get_prototype_of();
      var setPrototypeOf2 = require_object_set_prototype_of();
      var setToStringTag2 = require_set_to_string_tag();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var redefine5 = require_redefine();
      var wellKnownSymbol5 = require_well_known_symbol();
      var IS_PURE2 = require_is_pure();
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
      module.exports = function(Iterable, NAME2, IteratorConstructor, next2, DEFAULT, IS_SET, FORCED4) {
        createIteratorConstructor(IteratorConstructor, NAME2, next2);
        var getIterationMethod = function(KIND) {
          if (KIND === DEFAULT && defaultIterator)
            return defaultIterator;
          if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
            return IterablePrototype[KIND];
          switch (KIND) {
            case KEYS:
              return function keys2() {
                return new IteratorConstructor(this, KIND);
              };
            case VALUES:
              return function values() {
                return new IteratorConstructor(this, KIND);
              };
            case ENTRIES:
              return function entries() {
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
            if (!IS_PURE2 && getPrototypeOf2(CurrentIteratorPrototype) !== IteratorPrototype) {
              if (setPrototypeOf2) {
                setPrototypeOf2(CurrentIteratorPrototype, IteratorPrototype);
              } else if (typeof CurrentIteratorPrototype[ITERATOR2] != "function") {
                createNonEnumerableProperty4(CurrentIteratorPrototype, ITERATOR2, returnThis);
              }
            }
            setToStringTag2(CurrentIteratorPrototype, TO_STRING_TAG2, true, true);
            if (IS_PURE2)
              Iterators[TO_STRING_TAG2] = returnThis;
          }
        }
        if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
          INCORRECT_VALUES_NAME = true;
          defaultIterator = function values() {
            return nativeIterator.call(this);
          };
        }
        if ((!IS_PURE2 || FORCED4) && IterablePrototype[ITERATOR2] !== defaultIterator) {
          createNonEnumerableProperty4(IterablePrototype, ITERATOR2, defaultIterator);
        }
        Iterators[NAME2] = defaultIterator;
        if (DEFAULT) {
          methods = {
            values: getIterationMethod(VALUES),
            keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
            entries: getIterationMethod(ENTRIES)
          };
          if (FORCED4)
            for (KEY in methods) {
              if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                redefine5(IterablePrototype, KEY, methods[KEY]);
              }
            }
          else
            $22({ target: NAME2, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
        }
        return methods;
      };
    }
  });

  // node_modules/core-js/modules/es.array.iterator.js
  var require_es_array_iterator = __commonJS({
    "node_modules/core-js/modules/es.array.iterator.js": function(exports, module) {
      "use strict";
      var toIndexedObject4 = require_to_indexed_object();
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
          target: toIndexedObject4(iterated),
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

  // node_modules/core-js/internals/string-multibyte.js
  var require_string_multibyte = __commonJS({
    "node_modules/core-js/internals/string-multibyte.js": function(exports, module) {
      var toInteger2 = require_to_integer();
      var requireObjectCoercible4 = require_require_object_coercible();
      var createMethod = function(CONVERT_TO_STRING) {
        return function($this, pos) {
          var S = String(requireObjectCoercible4($this));
          var position = toInteger2(pos);
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

  // node_modules/core-js/modules/es.string.iterator.js
  var charAt, InternalStateModule2, defineIterator, STRING_ITERATOR, setInternalState2, getInternalState2;
  var init_es_string_iterator = __esm({
    "node_modules/core-js/modules/es.string.iterator.js": function() {
      "use strict";
      charAt = require_string_multibyte().charAt;
      InternalStateModule2 = require_internal_state();
      defineIterator = require_define_iterator();
      STRING_ITERATOR = "String Iterator";
      setInternalState2 = InternalStateModule2.set;
      getInternalState2 = InternalStateModule2.getterFor(STRING_ITERATOR);
      defineIterator(String, "String", function(iterated) {
        setInternalState2(this, {
          type: STRING_ITERATOR,
          string: String(iterated),
          index: 0
        });
      }, function next() {
        var state = getInternalState2(this);
        var string = state.string;
        var index = state.index;
        var point;
        if (index >= string.length)
          return { value: void 0, done: true };
        point = charAt(string, index);
        state.index += point.length;
        return { value: point, done: false };
      });
    }
  });

  // node_modules/core-js/modules/web.dom-collections.iterator.js
  var global5, DOMIterables2, ArrayIteratorMethods, createNonEnumerableProperty3, wellKnownSymbol3, ITERATOR, TO_STRING_TAG, ArrayValues, Collection, CollectionPrototype, METHOD_NAME;
  var init_web_dom_collections_iterator = __esm({
    "node_modules/core-js/modules/web.dom-collections.iterator.js": function() {
      global5 = require_global();
      DOMIterables2 = require_dom_iterables();
      ArrayIteratorMethods = require_es_array_iterator();
      createNonEnumerableProperty3 = require_create_non_enumerable_property();
      wellKnownSymbol3 = require_well_known_symbol();
      ITERATOR = wellKnownSymbol3("iterator");
      TO_STRING_TAG = wellKnownSymbol3("toStringTag");
      ArrayValues = ArrayIteratorMethods.values;
      for (var COLLECTION_NAME in DOMIterables2) {
        Collection = global5[COLLECTION_NAME];
        CollectionPrototype = Collection && Collection.prototype;
        if (CollectionPrototype) {
          if (CollectionPrototype[ITERATOR] !== ArrayValues)
            try {
              createNonEnumerableProperty3(CollectionPrototype, ITERATOR, ArrayValues);
            } catch (error) {
              CollectionPrototype[ITERATOR] = ArrayValues;
            }
          if (!CollectionPrototype[TO_STRING_TAG]) {
            createNonEnumerableProperty3(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
          }
          if (DOMIterables2[COLLECTION_NAME])
            for (METHOD_NAME in ArrayIteratorMethods) {
              if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
                try {
                  createNonEnumerableProperty3(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
                } catch (error) {
                  CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
                }
            }
        }
      }
    }
  });

  // node_modules/core-js/internals/freezing.js
  var require_freezing = __commonJS({
    "node_modules/core-js/internals/freezing.js": function(exports, module) {
      var fails13 = require_fails();
      module.exports = !fails13(function() {
        return Object.isExtensible(Object.preventExtensions({}));
      });
    }
  });

  // node_modules/core-js/internals/internal-metadata.js
  var require_internal_metadata = __commonJS({
    "node_modules/core-js/internals/internal-metadata.js": function(exports, module) {
      var hiddenKeys2 = require_hidden_keys();
      var isObject7 = require_is_object();
      var has3 = require_has();
      var defineProperty4 = require_object_define_property().f;
      var uid2 = require_uid();
      var FREEZING3 = require_freezing();
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
        if (!isObject7(it))
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
      var onFreeze3 = function(it) {
        if (FREEZING3 && meta.REQUIRED && isExtensible(it) && !has3(it, METADATA))
          setMetadata(it);
        return it;
      };
      var meta = module.exports = {
        REQUIRED: false,
        fastKey: fastKey,
        getWeakData: getWeakData,
        onFreeze: onFreeze3
      };
      hiddenKeys2[METADATA] = true;
    }
  });

  // node_modules/core-js/modules/es.object.freeze.js
  var $12, FREEZING, fails5, isObject5, onFreeze, $freeze, FAILS_ON_PRIMITIVES2;
  var init_es_object_freeze = __esm({
    "node_modules/core-js/modules/es.object.freeze.js": function() {
      $12 = require_export();
      FREEZING = require_freezing();
      fails5 = require_fails();
      isObject5 = require_is_object();
      onFreeze = require_internal_metadata().onFreeze;
      $freeze = Object.freeze;
      FAILS_ON_PRIMITIVES2 = fails5(function() {
        $freeze(1);
      });
      $12({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES2, sham: !FREEZING }, {
        freeze: function freeze(it) {
          return $freeze && isObject5(it) ? $freeze(onFreeze(it)) : it;
        }
      });
    }
  });

  // node_modules/core-js/modules/es.object.seal.js
  var $13, isObject6, onFreeze2, FREEZING2, fails6, $seal, FAILS_ON_PRIMITIVES3;
  var init_es_object_seal = __esm({
    "node_modules/core-js/modules/es.object.seal.js": function() {
      $13 = require_export();
      isObject6 = require_is_object();
      onFreeze2 = require_internal_metadata().onFreeze;
      FREEZING2 = require_freezing();
      fails6 = require_fails();
      $seal = Object.seal;
      FAILS_ON_PRIMITIVES3 = fails6(function() {
        $seal(1);
      });
      $13({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES3, sham: !FREEZING2 }, {
        seal: function seal(it) {
          return $seal && isObject6(it) ? $seal(onFreeze2(it)) : it;
        }
      });
    }
  });

  // node_modules/core-js/modules/es.object.get-own-property-descriptor.js
  var $14, fails7, toIndexedObject2, nativeGetOwnPropertyDescriptor2, DESCRIPTORS6, FAILS_ON_PRIMITIVES4, FORCED3;
  var init_es_object_get_own_property_descriptor = __esm({
    "node_modules/core-js/modules/es.object.get-own-property-descriptor.js": function() {
      $14 = require_export();
      fails7 = require_fails();
      toIndexedObject2 = require_to_indexed_object();
      nativeGetOwnPropertyDescriptor2 = require_object_get_own_property_descriptor().f;
      DESCRIPTORS6 = require_descriptors();
      FAILS_ON_PRIMITIVES4 = fails7(function() {
        nativeGetOwnPropertyDescriptor2(1);
      });
      FORCED3 = !DESCRIPTORS6 || FAILS_ON_PRIMITIVES4;
      $14({ target: "Object", stat: true, forced: FORCED3, sham: !DESCRIPTORS6 }, {
        getOwnPropertyDescriptor: function getOwnPropertyDescriptor2(it, key) {
          return nativeGetOwnPropertyDescriptor2(toIndexedObject2(it), key);
        }
      });
    }
  });

  // node_modules/core-js/internals/regexp-flags.js
  var require_regexp_flags = __commonJS({
    "node_modules/core-js/internals/regexp-flags.js": function(exports, module) {
      "use strict";
      var anObject7 = require_an_object();
      module.exports = function() {
        var that = anObject7(this);
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

  // node_modules/core-js/internals/regexp-sticky-helpers.js
  var require_regexp_sticky_helpers = __commonJS({
    "node_modules/core-js/internals/regexp-sticky-helpers.js": function(exports) {
      var fails13 = require_fails();
      var RE = function(s, f) {
        return RegExp(s, f);
      };
      exports.UNSUPPORTED_Y = fails13(function() {
        var re = RE("a", "y");
        re.lastIndex = 2;
        return re.exec("abcd") != null;
      });
      exports.BROKEN_CARET = fails13(function() {
        var re = RE("^r", "gy");
        re.lastIndex = 2;
        return re.exec("str") != null;
      });
    }
  });

  // node_modules/core-js/internals/regexp-unsupported-dot-all.js
  var require_regexp_unsupported_dot_all = __commonJS({
    "node_modules/core-js/internals/regexp-unsupported-dot-all.js": function(exports, module) {
      var fails13 = require_fails();
      module.exports = fails13(function() {
        var re = RegExp(".", "string".charAt(0));
        return !(re.dotAll && re.exec("\n") && re.flags === "s");
      });
    }
  });

  // node_modules/core-js/internals/regexp-unsupported-ncg.js
  var require_regexp_unsupported_ncg = __commonJS({
    "node_modules/core-js/internals/regexp-unsupported-ncg.js": function(exports, module) {
      var fails13 = require_fails();
      module.exports = fails13(function() {
        var re = RegExp("(?<a>b)", "string".charAt(5));
        return re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc";
      });
    }
  });

  // node_modules/core-js/internals/regexp-exec.js
  var require_regexp_exec = __commonJS({
    "node_modules/core-js/internals/regexp-exec.js": function(exports, module) {
      "use strict";
      var regexpFlags = require_regexp_flags();
      var stickyHelpers2 = require_regexp_sticky_helpers();
      var shared2 = require_shared();
      var create4 = require_object_create();
      var getInternalState3 = require_internal_state().get;
      var UNSUPPORTED_DOT_ALL = require_regexp_unsupported_dot_all();
      var UNSUPPORTED_NCG = require_regexp_unsupported_ncg();
      var nativeExec = RegExp.prototype.exec;
      var nativeReplace = shared2("native-string-replace", String.prototype.replace);
      var patchedExec = nativeExec;
      var UPDATES_LAST_INDEX_WRONG = function() {
        var re1 = /a/;
        var re2 = /b*/g;
        nativeExec.call(re1, "a");
        nativeExec.call(re2, "a");
        return re1.lastIndex !== 0 || re2.lastIndex !== 0;
      }();
      var UNSUPPORTED_Y2 = stickyHelpers2.UNSUPPORTED_Y || stickyHelpers2.BROKEN_CARET;
      var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
      var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y2 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
      if (PATCH) {
        patchedExec = function exec(str) {
          var re = this;
          var state = getInternalState3(re);
          var raw = state.raw;
          var result, reCopy, lastIndex, match, i, object, group;
          if (raw) {
            raw.lastIndex = re.lastIndex;
            result = patchedExec.call(raw, str);
            re.lastIndex = raw.lastIndex;
            return result;
          }
          var groups = state.groups;
          var sticky = UNSUPPORTED_Y2 && re.sticky;
          var flags2 = regexpFlags.call(re);
          var source = re.source;
          var charsAdded = 0;
          var strCopy = str;
          if (sticky) {
            flags2 = flags2.replace("y", "");
            if (flags2.indexOf("g") === -1) {
              flags2 += "g";
            }
            strCopy = String(str).slice(re.lastIndex);
            if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== "\n")) {
              source = "(?: " + source + ")";
              strCopy = " " + strCopy;
              charsAdded++;
            }
            reCopy = new RegExp("^(?:" + source + ")", flags2);
          }
          if (NPCG_INCLUDED) {
            reCopy = new RegExp("^" + source + "$(?!\\s)", flags2);
          }
          if (UPDATES_LAST_INDEX_WRONG)
            lastIndex = re.lastIndex;
          match = nativeExec.call(sticky ? reCopy : re, strCopy);
          if (sticky) {
            if (match) {
              match.input = match.input.slice(charsAdded);
              match[0] = match[0].slice(charsAdded);
              match.index = re.lastIndex;
              re.lastIndex += match[0].length;
            } else
              re.lastIndex = 0;
          } else if (UPDATES_LAST_INDEX_WRONG && match) {
            re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
          }
          if (NPCG_INCLUDED && match && match.length > 1) {
            nativeReplace.call(match[0], reCopy, function() {
              for (i = 1; i < arguments.length - 2; i++) {
                if (arguments[i] === void 0)
                  match[i] = void 0;
              }
            });
          }
          if (match && groups) {
            match.groups = object = create4(null);
            for (i = 0; i < groups.length; i++) {
              group = groups[i];
              object[group[0]] = match[group[1]];
            }
          }
          return match;
        };
      }
      module.exports = patchedExec;
    }
  });

  // node_modules/core-js/modules/es.regexp.exec.js
  var require_es_regexp_exec = __commonJS({
    "node_modules/core-js/modules/es.regexp.exec.js": function() {
      "use strict";
      var $22 = require_export();
      var exec = require_regexp_exec();
      $22({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
        exec: exec
      });
    }
  });

  // node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js
  var require_fix_regexp_well_known_symbol_logic = __commonJS({
    "node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js": function(exports, module) {
      "use strict";
      require_es_regexp_exec();
      var redefine5 = require_redefine();
      var regexpExec2 = require_regexp_exec();
      var fails13 = require_fails();
      var wellKnownSymbol5 = require_well_known_symbol();
      var createNonEnumerableProperty4 = require_create_non_enumerable_property();
      var SPECIES = wellKnownSymbol5("species");
      var RegExpPrototype2 = RegExp.prototype;
      module.exports = function(KEY, exec, FORCED4, SHAM) {
        var SYMBOL2 = wellKnownSymbol5(KEY);
        var DELEGATES_TO_SYMBOL = !fails13(function() {
          var O = {};
          O[SYMBOL2] = function() {
            return 7;
          };
          return ""[KEY](O) != 7;
        });
        var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails13(function() {
          var execCalled = false;
          var re = /a/;
          if (KEY === "split") {
            re = {};
            re.constructor = {};
            re.constructor[SPECIES] = function() {
              return re;
            };
            re.flags = "";
            re[SYMBOL2] = /./[SYMBOL2];
          }
          re.exec = function() {
            execCalled = true;
            return null;
          };
          re[SYMBOL2]("");
          return !execCalled;
        });
        if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED4) {
          var nativeRegExpMethod = /./[SYMBOL2];
          var methods = exec(SYMBOL2, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
            var $exec = regexp.exec;
            if ($exec === regexpExec2 || $exec === RegExpPrototype2.exec) {
              if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
              }
              return { done: true, value: nativeMethod.call(str, regexp, arg2) };
            }
            return { done: false };
          });
          redefine5(String.prototype, KEY, methods[0]);
          redefine5(RegExpPrototype2, SYMBOL2, methods[1]);
        }
        if (SHAM)
          createNonEnumerableProperty4(RegExpPrototype2[SYMBOL2], "sham", true);
      };
    }
  });

  // node_modules/core-js/internals/advance-string-index.js
  var require_advance_string_index = __commonJS({
    "node_modules/core-js/internals/advance-string-index.js": function(exports, module) {
      "use strict";
      var charAt2 = require_string_multibyte().charAt;
      module.exports = function(S, index, unicode) {
        return index + (unicode ? charAt2(S, index).length : 1);
      };
    }
  });

  // node_modules/core-js/internals/get-substitution.js
  var require_get_substitution = __commonJS({
    "node_modules/core-js/internals/get-substitution.js": function(exports, module) {
      var toObject5 = require_to_object();
      var floor = Math.floor;
      var replace = "".replace;
      var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
      var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
      module.exports = function(matched, str, position, captures, namedCaptures, replacement) {
        var tailPos = position + matched.length;
        var m = captures.length;
        var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
        if (namedCaptures !== void 0) {
          namedCaptures = toObject5(namedCaptures);
          symbols = SUBSTITUTION_SYMBOLS;
        }
        return replace.call(replacement, symbols, function(match, ch) {
          var capture;
          switch (ch.charAt(0)) {
            case "$":
              return "$";
            case "&":
              return matched;
            case "`":
              return str.slice(0, position);
            case "'":
              return str.slice(tailPos);
            case "<":
              capture = namedCaptures[ch.slice(1, -1)];
              break;
            default:
              var n = +ch;
              if (n === 0)
                return match;
              if (n > m) {
                var f = floor(n / 10);
                if (f === 0)
                  return match;
                if (f <= m)
                  return captures[f - 1] === void 0 ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                return match;
              }
              capture = captures[n - 1];
          }
          return capture === void 0 ? "" : capture;
        });
      };
    }
  });

  // node_modules/core-js/internals/regexp-exec-abstract.js
  var require_regexp_exec_abstract = __commonJS({
    "node_modules/core-js/internals/regexp-exec-abstract.js": function(exports, module) {
      var classof = require_classof_raw();
      var regexpExec2 = require_regexp_exec();
      module.exports = function(R, S) {
        var exec = R.exec;
        if (typeof exec === "function") {
          var result = exec.call(R, S);
          if (typeof result !== "object") {
            throw TypeError("RegExp exec method returned something other than an Object or null");
          }
          return result;
        }
        if (classof(R) !== "RegExp") {
          throw TypeError("RegExp#exec called on incompatible receiver");
        }
        return regexpExec2.call(R, S);
      };
    }
  });

  // node_modules/core-js/modules/es.string.replace.js
  var fixRegExpWellKnownSymbolLogic, fails8, anObject3, toLength2, toInteger, requireObjectCoercible, advanceStringIndex, getSubstitution, regExpExec, wellKnownSymbol4, REPLACE, max, min, maybeToString, REPLACE_KEEPS_$0, REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE, REPLACE_SUPPORTS_NAMED_GROUPS;
  var init_es_string_replace = __esm({
    "node_modules/core-js/modules/es.string.replace.js": function() {
      "use strict";
      fixRegExpWellKnownSymbolLogic = require_fix_regexp_well_known_symbol_logic();
      fails8 = require_fails();
      anObject3 = require_an_object();
      toLength2 = require_to_length();
      toInteger = require_to_integer();
      requireObjectCoercible = require_require_object_coercible();
      advanceStringIndex = require_advance_string_index();
      getSubstitution = require_get_substitution();
      regExpExec = require_regexp_exec_abstract();
      wellKnownSymbol4 = require_well_known_symbol();
      REPLACE = wellKnownSymbol4("replace");
      max = Math.max;
      min = Math.min;
      maybeToString = function(it) {
        return it === void 0 ? it : String(it);
      };
      REPLACE_KEEPS_$0 = function() {
        return "a".replace(/./, "$0") === "$0";
      }();
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
        if (/./[REPLACE]) {
          return /./[REPLACE]("a", "$0") === "";
        }
        return false;
      }();
      REPLACE_SUPPORTS_NAMED_GROUPS = !fails8(function() {
        var re = /./;
        re.exec = function() {
          var result = [];
          result.groups = { a: "7" };
          return result;
        };
        return "".replace(re, "$<a>") !== "7";
      });
      fixRegExpWellKnownSymbolLogic("replace", function(_, nativeReplace, maybeCallNative) {
        var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
        return [
          function replace(searchValue, replaceValue) {
            var O = requireObjectCoercible(this);
            var replacer = searchValue == void 0 ? void 0 : searchValue[REPLACE];
            return replacer !== void 0 ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
          },
          function(string, replaceValue) {
            if (typeof replaceValue === "string" && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 && replaceValue.indexOf("$<") === -1) {
              var res = maybeCallNative(nativeReplace, this, string, replaceValue);
              if (res.done)
                return res.value;
            }
            var rx = anObject3(this);
            var S = String(string);
            var functionalReplace = typeof replaceValue === "function";
            if (!functionalReplace)
              replaceValue = String(replaceValue);
            var global6 = rx.global;
            if (global6) {
              var fullUnicode = rx.unicode;
              rx.lastIndex = 0;
            }
            var results = [];
            while (true) {
              var result = regExpExec(rx, S);
              if (result === null)
                break;
              results.push(result);
              if (!global6)
                break;
              var matchStr = String(result[0]);
              if (matchStr === "")
                rx.lastIndex = advanceStringIndex(S, toLength2(rx.lastIndex), fullUnicode);
            }
            var accumulatedResult = "";
            var nextSourcePosition = 0;
            for (var i = 0; i < results.length; i++) {
              result = results[i];
              var matched = String(result[0]);
              var position = max(min(toInteger(result.index), S.length), 0);
              var captures = [];
              for (var j = 1; j < result.length; j++)
                captures.push(maybeToString(result[j]));
              var namedCaptures = result.groups;
              if (functionalReplace) {
                var replacerArgs = [matched].concat(captures, position, S);
                if (namedCaptures !== void 0)
                  replacerArgs.push(namedCaptures);
                var replacement = String(replaceValue.apply(void 0, replacerArgs));
              } else {
                replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
              }
              if (position >= nextSourcePosition) {
                accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
                nextSourcePosition = position + matched.length;
              }
            }
            return accumulatedResult + S.slice(nextSourcePosition);
          }
        ];
      }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);
    }
  });

  // node_modules/core-js/modules/es.date.to-string.js
  var redefine3, DatePrototype, INVALID_DATE, TO_STRING, nativeDateToString, getTime;
  var init_es_date_to_string = __esm({
    "node_modules/core-js/modules/es.date.to-string.js": function() {
      redefine3 = require_redefine();
      DatePrototype = Date.prototype;
      INVALID_DATE = "Invalid Date";
      TO_STRING = "toString";
      nativeDateToString = DatePrototype[TO_STRING];
      getTime = DatePrototype.getTime;
      if (new Date(NaN) + "" != INVALID_DATE) {
        redefine3(DatePrototype, TO_STRING, function toString2() {
          var value = getTime.call(this);
          return value === value ? nativeDateToString.call(this) : INVALID_DATE;
        });
      }
    }
  });

  // node_modules/core-js/modules/es.regexp.to-string.js
  var redefine4, anObject4, fails9, flags, TO_STRING2, RegExpPrototype, nativeToString, NOT_GENERIC, INCORRECT_NAME;
  var init_es_regexp_to_string = __esm({
    "node_modules/core-js/modules/es.regexp.to-string.js": function() {
      "use strict";
      redefine4 = require_redefine();
      anObject4 = require_an_object();
      fails9 = require_fails();
      flags = require_regexp_flags();
      TO_STRING2 = "toString";
      RegExpPrototype = RegExp.prototype;
      nativeToString = RegExpPrototype[TO_STRING2];
      NOT_GENERIC = fails9(function() {
        return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
      });
      INCORRECT_NAME = nativeToString.name != TO_STRING2;
      if (NOT_GENERIC || INCORRECT_NAME) {
        redefine4(RegExp.prototype, TO_STRING2, function toString2() {
          var R = anObject4(this);
          var p = String(R.source);
          var rf = R.flags;
          var f = String(rf === void 0 && R instanceof RegExp && !("flags" in RegExpPrototype) ? flags.call(R) : rf);
          return "/" + p + "/" + f;
        }, { unsafe: true });
      }
    }
  });

  // node_modules/core-js/modules/es.array.is-array.js
  var $15, isArray3;
  var init_es_array_is_array = __esm({
    "node_modules/core-js/modules/es.array.is-array.js": function() {
      $15 = require_export();
      isArray3 = require_is_array();
      $15({ target: "Array", stat: true }, {
        isArray: isArray3
      });
    }
  });

  // node_modules/core-js/modules/es.array.join.js
  var $16, IndexedObject, toIndexedObject3, arrayMethodIsStrict, nativeJoin, ES3_STRINGS, STRICT_METHOD;
  var init_es_array_join = __esm({
    "node_modules/core-js/modules/es.array.join.js": function() {
      "use strict";
      $16 = require_export();
      IndexedObject = require_indexed_object();
      toIndexedObject3 = require_to_indexed_object();
      arrayMethodIsStrict = require_array_method_is_strict();
      nativeJoin = [].join;
      ES3_STRINGS = IndexedObject != Object;
      STRICT_METHOD = arrayMethodIsStrict("join", ",");
      $16({ target: "Array", proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
        join: function join(separator) {
          return nativeJoin.call(toIndexedObject3(this), separator === void 0 ? "," : separator);
        }
      });
    }
  });

  // node_modules/core-js/modules/es.object.keys.js
  var $17, toObject4, nativeKeys, fails10, FAILS_ON_PRIMITIVES5;
  var init_es_object_keys = __esm({
    "node_modules/core-js/modules/es.object.keys.js": function() {
      $17 = require_export();
      toObject4 = require_to_object();
      nativeKeys = require_object_keys();
      fails10 = require_fails();
      FAILS_ON_PRIMITIVES5 = fails10(function() {
        nativeKeys(1);
      });
      $17({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES5 }, {
        keys: function keys(it) {
          return nativeKeys(toObject4(it));
        }
      });
    }
  });

  // node_modules/core-js/modules/es.object.define-properties.js
  var $18, DESCRIPTORS7, defineProperties2;
  var init_es_object_define_properties = __esm({
    "node_modules/core-js/modules/es.object.define-properties.js": function() {
      $18 = require_export();
      DESCRIPTORS7 = require_descriptors();
      defineProperties2 = require_object_define_properties();
      $18({ target: "Object", stat: true, forced: !DESCRIPTORS7, sham: !DESCRIPTORS7 }, {
        defineProperties: defineProperties2
      });
    }
  });

  // node_modules/core-js/modules/es.string.match.js
  var fixRegExpWellKnownSymbolLogic2, anObject5, toLength3, requireObjectCoercible2, advanceStringIndex2, regExpExec2;
  var init_es_string_match = __esm({
    "node_modules/core-js/modules/es.string.match.js": function() {
      "use strict";
      fixRegExpWellKnownSymbolLogic2 = require_fix_regexp_well_known_symbol_logic();
      anObject5 = require_an_object();
      toLength3 = require_to_length();
      requireObjectCoercible2 = require_require_object_coercible();
      advanceStringIndex2 = require_advance_string_index();
      regExpExec2 = require_regexp_exec_abstract();
      fixRegExpWellKnownSymbolLogic2("match", function(MATCH, nativeMatch, maybeCallNative) {
        return [
          function match(regexp) {
            var O = requireObjectCoercible2(this);
            var matcher = regexp == void 0 ? void 0 : regexp[MATCH];
            return matcher !== void 0 ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
          },
          function(string) {
            var res = maybeCallNative(nativeMatch, this, string);
            if (res.done)
              return res.value;
            var rx = anObject5(this);
            var S = String(string);
            if (!rx.global)
              return regExpExec2(rx, S);
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
            var A = [];
            var n = 0;
            var result;
            while ((result = regExpExec2(rx, S)) !== null) {
              var matchStr = String(result[0]);
              A[n] = matchStr;
              if (matchStr === "")
                rx.lastIndex = advanceStringIndex2(S, toLength3(rx.lastIndex), fullUnicode);
              n++;
            }
            return n === 0 ? null : A;
          }
        ];
      });
    }
  });

  // node_modules/core-js/internals/whitespaces.js
  var require_whitespaces = __commonJS({
    "node_modules/core-js/internals/whitespaces.js": function(exports, module) {
      module.exports = "	\n\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
    }
  });

  // node_modules/core-js/internals/string-trim.js
  var require_string_trim = __commonJS({
    "node_modules/core-js/internals/string-trim.js": function(exports, module) {
      var requireObjectCoercible4 = require_require_object_coercible();
      var whitespaces = require_whitespaces();
      var whitespace = "[" + whitespaces + "]";
      var ltrim = RegExp("^" + whitespace + whitespace + "*");
      var rtrim = RegExp(whitespace + whitespace + "*$");
      var createMethod = function(TYPE) {
        return function($this) {
          var string = String(requireObjectCoercible4($this));
          if (TYPE & 1)
            string = string.replace(ltrim, "");
          if (TYPE & 2)
            string = string.replace(rtrim, "");
          return string;
        };
      };
      module.exports = {
        start: createMethod(1),
        end: createMethod(2),
        trim: createMethod(3)
      };
    }
  });

  // node_modules/core-js/internals/string-trim-forced.js
  var require_string_trim_forced = __commonJS({
    "node_modules/core-js/internals/string-trim-forced.js": function(exports, module) {
      var fails13 = require_fails();
      var whitespaces = require_whitespaces();
      var non = "\u200B\x85\u180E";
      module.exports = function(METHOD_NAME) {
        return fails13(function() {
          return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
        });
      };
    }
  });

  // node_modules/core-js/modules/es.string.trim.js
  var $19, $trim, forcedStringTrimMethod;
  var init_es_string_trim = __esm({
    "node_modules/core-js/modules/es.string.trim.js": function() {
      "use strict";
      $19 = require_export();
      $trim = require_string_trim().trim;
      forcedStringTrimMethod = require_string_trim_forced();
      $19({ target: "String", proto: true, forced: forcedStringTrimMethod("trim") }, {
        trim: function trim() {
          return $trim(this);
        }
      });
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
      var anObject7 = require_an_object();
      module.exports = function(iterator) {
        var returnMethod = iterator["return"];
        if (returnMethod !== void 0) {
          return anObject7(returnMethod.call(iterator)).value;
        }
      };
    }
  });

  // node_modules/core-js/internals/iterate.js
  var require_iterate = __commonJS({
    "node_modules/core-js/internals/iterate.js": function(exports, module) {
      var anObject7 = require_an_object();
      var isArrayIteratorMethod = require_is_array_iterator_method();
      var toLength5 = require_to_length();
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
            anObject7(value);
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
            for (index = 0, length = toLength5(iterable.length); length > index; index++) {
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
      module.exports = function(it, Constructor, name) {
        if (!(it instanceof Constructor)) {
          throw TypeError("Incorrect " + (name ? name + " " : "") + "invocation");
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
      var isObject7 = require_is_object();
      var setPrototypeOf2 = require_object_set_prototype_of();
      module.exports = function($this, dummy, Wrapper) {
        var NewTarget, NewTargetPrototype;
        if (setPrototypeOf2 && typeof (NewTarget = dummy.constructor) == "function" && NewTarget !== Wrapper && isObject7(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype)
          setPrototypeOf2($this, NewTargetPrototype);
        return $this;
      };
    }
  });

  // node_modules/core-js/internals/collection.js
  var require_collection = __commonJS({
    "node_modules/core-js/internals/collection.js": function(exports, module) {
      "use strict";
      var $22 = require_export();
      var global6 = require_global();
      var isForced = require_is_forced();
      var redefine5 = require_redefine();
      var InternalMetadataModule = require_internal_metadata();
      var iterate = require_iterate();
      var anInstance = require_an_instance();
      var isObject7 = require_is_object();
      var fails13 = require_fails();
      var checkCorrectnessOfIteration = require_check_correctness_of_iteration();
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
            return IS_WEAK && !isObject7(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
          } : KEY == "get" ? function get(key) {
            return IS_WEAK && !isObject7(key) ? void 0 : nativeMethod.call(this, key === 0 ? 0 : key);
          } : KEY == "has" ? function has3(key) {
            return IS_WEAK && !isObject7(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
          } : function set(key, value) {
            nativeMethod.call(this, key === 0 ? 0 : key, value);
            return this;
          });
        };
        var REPLACE2 = isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != "function" || !(IS_WEAK || NativePrototype.forEach && !fails13(function() {
          new NativeConstructor().entries().next();
        })));
        if (REPLACE2) {
          Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
          InternalMetadataModule.REQUIRED = true;
        } else if (isForced(CONSTRUCTOR_NAME, true)) {
          var instance = new Constructor();
          var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
          var THROWS_ON_PRIMITIVES = fails13(function() {
            instance.has(1);
          });
          var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function(iterable) {
            new NativeConstructor(iterable);
          });
          var BUGGY_ZERO = !IS_WEAK && fails13(function() {
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
        $22({ global: true, forced: Constructor != NativeConstructor }, exported);
        setToStringTag2(Constructor, CONSTRUCTOR_NAME);
        if (!IS_WEAK)
          common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
        return Constructor;
      };
    }
  });

  // node_modules/core-js/internals/collection-weak.js
  var require_collection_weak = __commonJS({
    "node_modules/core-js/internals/collection-weak.js": function(exports, module) {
      "use strict";
      var redefineAll = require_redefine_all();
      var getWeakData = require_internal_metadata().getWeakData;
      var anObject7 = require_an_object();
      var isObject7 = require_is_object();
      var anInstance = require_an_instance();
      var iterate = require_iterate();
      var ArrayIterationModule = require_array_iteration();
      var $has = require_has();
      var InternalStateModule3 = require_internal_state();
      var setInternalState3 = InternalStateModule3.set;
      var internalStateGetterFor = InternalStateModule3.getterFor;
      var find = ArrayIterationModule.find;
      var findIndex = ArrayIterationModule.findIndex;
      var id = 0;
      var uncaughtFrozenStore = function(store) {
        return store.frozen || (store.frozen = new UncaughtFrozenStore());
      };
      var UncaughtFrozenStore = function() {
        this.entries = [];
      };
      var findUncaughtFrozen = function(store, key) {
        return find(store.entries, function(it) {
          return it[0] === key;
        });
      };
      UncaughtFrozenStore.prototype = {
        get: function(key) {
          var entry = findUncaughtFrozen(this, key);
          if (entry)
            return entry[1];
        },
        has: function(key) {
          return !!findUncaughtFrozen(this, key);
        },
        set: function(key, value) {
          var entry = findUncaughtFrozen(this, key);
          if (entry)
            entry[1] = value;
          else
            this.entries.push([key, value]);
        },
        "delete": function(key) {
          var index = findIndex(this.entries, function(it) {
            return it[0] === key;
          });
          if (~index)
            this.entries.splice(index, 1);
          return !!~index;
        }
      };
      module.exports = {
        getConstructor: function(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
          var C = wrapper(function(that, iterable) {
            anInstance(that, C, CONSTRUCTOR_NAME);
            setInternalState3(that, {
              type: CONSTRUCTOR_NAME,
              id: id++,
              frozen: void 0
            });
            if (iterable != void 0)
              iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          });
          var getInternalState3 = internalStateGetterFor(CONSTRUCTOR_NAME);
          var define = function(that, key, value) {
            var state = getInternalState3(that);
            var data = getWeakData(anObject7(key), true);
            if (data === true)
              uncaughtFrozenStore(state).set(key, value);
            else
              data[state.id] = value;
            return that;
          };
          redefineAll(C.prototype, {
            "delete": function(key) {
              var state = getInternalState3(this);
              if (!isObject7(key))
                return false;
              var data = getWeakData(key);
              if (data === true)
                return uncaughtFrozenStore(state)["delete"](key);
              return data && $has(data, state.id) && delete data[state.id];
            },
            has: function has3(key) {
              var state = getInternalState3(this);
              if (!isObject7(key))
                return false;
              var data = getWeakData(key);
              if (data === true)
                return uncaughtFrozenStore(state).has(key);
              return data && $has(data, state.id);
            }
          });
          redefineAll(C.prototype, IS_MAP ? {
            get: function get(key) {
              var state = getInternalState3(this);
              if (isObject7(key)) {
                var data = getWeakData(key);
                if (data === true)
                  return uncaughtFrozenStore(state).get(key);
                return data ? data[state.id] : void 0;
              }
            },
            set: function set(key, value) {
              return define(this, key, value);
            }
          } : {
            add: function add(value) {
              return define(this, value, true);
            }
          });
          return C;
        }
      };
    }
  });

  // node_modules/core-js/modules/es.weak-map.js
  var require_es_weak_map = __commonJS({
    "node_modules/core-js/modules/es.weak-map.js": function(exports, module) {
      "use strict";
      var global6 = require_global();
      var redefineAll = require_redefine_all();
      var InternalMetadataModule = require_internal_metadata();
      var collection = require_collection();
      var collectionWeak = require_collection_weak();
      var isObject7 = require_is_object();
      var enforceIternalState = require_internal_state().enforce;
      var NATIVE_WEAK_MAP = require_native_weak_map();
      var IS_IE11 = !global6.ActiveXObject && "ActiveXObject" in global6;
      var isExtensible = Object.isExtensible;
      var InternalWeakMap;
      var wrapper = function(init) {
        return function WeakMap2() {
          return init(this, arguments.length ? arguments[0] : void 0);
        };
      };
      var $WeakMap = module.exports = collection("WeakMap", wrapper, collectionWeak);
      if (NATIVE_WEAK_MAP && IS_IE11) {
        InternalWeakMap = collectionWeak.getConstructor(wrapper, "WeakMap", true);
        InternalMetadataModule.REQUIRED = true;
        WeakMapPrototype = $WeakMap.prototype;
        nativeDelete = WeakMapPrototype["delete"];
        nativeHas = WeakMapPrototype.has;
        nativeGet = WeakMapPrototype.get;
        nativeSet = WeakMapPrototype.set;
        redefineAll(WeakMapPrototype, {
          "delete": function(key) {
            if (isObject7(key) && !isExtensible(key)) {
              var state = enforceIternalState(this);
              if (!state.frozen)
                state.frozen = new InternalWeakMap();
              return nativeDelete.call(this, key) || state.frozen["delete"](key);
            }
            return nativeDelete.call(this, key);
          },
          has: function has3(key) {
            if (isObject7(key) && !isExtensible(key)) {
              var state = enforceIternalState(this);
              if (!state.frozen)
                state.frozen = new InternalWeakMap();
              return nativeHas.call(this, key) || state.frozen.has(key);
            }
            return nativeHas.call(this, key);
          },
          get: function get(key) {
            if (isObject7(key) && !isExtensible(key)) {
              var state = enforceIternalState(this);
              if (!state.frozen)
                state.frozen = new InternalWeakMap();
              return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
            }
            return nativeGet.call(this, key);
          },
          set: function set(key, value) {
            if (isObject7(key) && !isExtensible(key)) {
              var state = enforceIternalState(this);
              if (!state.frozen)
                state.frozen = new InternalWeakMap();
              nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
            } else
              nativeSet.call(this, key, value);
            return this;
          }
        });
      }
      var WeakMapPrototype;
      var nativeDelete;
      var nativeHas;
      var nativeGet;
      var nativeSet;
    }
  });

  // node_modules/core-js/internals/set-species.js
  var require_set_species = __commonJS({
    "node_modules/core-js/internals/set-species.js": function(exports, module) {
      "use strict";
      var getBuiltIn3 = require_get_built_in();
      var definePropertyModule2 = require_object_define_property();
      var wellKnownSymbol5 = require_well_known_symbol();
      var DESCRIPTORS8 = require_descriptors();
      var SPECIES = wellKnownSymbol5("species");
      module.exports = function(CONSTRUCTOR_NAME) {
        var Constructor = getBuiltIn3(CONSTRUCTOR_NAME);
        var defineProperty4 = definePropertyModule2.f;
        if (DESCRIPTORS8 && Constructor && !Constructor[SPECIES]) {
          defineProperty4(Constructor, SPECIES, {
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
      var DESCRIPTORS8 = require_descriptors();
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
            if (!DESCRIPTORS8)
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
              if (DESCRIPTORS8)
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
              if (DESCRIPTORS8)
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
                if (DESCRIPTORS8)
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
          if (DESCRIPTORS8)
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

  // node_modules/core-js/internals/is-regexp.js
  var require_is_regexp = __commonJS({
    "node_modules/core-js/internals/is-regexp.js": function(exports, module) {
      var isObject7 = require_is_object();
      var classof = require_classof_raw();
      var wellKnownSymbol5 = require_well_known_symbol();
      var MATCH = wellKnownSymbol5("match");
      module.exports = function(it) {
        var isRegExp2;
        return isObject7(it) && ((isRegExp2 = it[MATCH]) !== void 0 ? !!isRegExp2 : classof(it) == "RegExp");
      };
    }
  });

  // node_modules/core-js/internals/species-constructor.js
  var require_species_constructor = __commonJS({
    "node_modules/core-js/internals/species-constructor.js": function(exports, module) {
      var anObject7 = require_an_object();
      var aFunction2 = require_a_function();
      var wellKnownSymbol5 = require_well_known_symbol();
      var SPECIES = wellKnownSymbol5("species");
      module.exports = function(O, defaultConstructor) {
        var C = anObject7(O).constructor;
        var S;
        return C === void 0 || (S = anObject7(C)[SPECIES]) == void 0 ? defaultConstructor : aFunction2(S);
      };
    }
  });

  // node_modules/core-js/modules/es.string.split.js
  var fixRegExpWellKnownSymbolLogic3, isRegExp, anObject6, requireObjectCoercible3, speciesConstructor, advanceStringIndex3, toLength4, callRegExpExec, regexpExec, stickyHelpers, fails11, UNSUPPORTED_Y, arrayPush, min2, MAX_UINT32, SPLIT_WORKS_WITH_OVERWRITTEN_EXEC;
  var init_es_string_split = __esm({
    "node_modules/core-js/modules/es.string.split.js": function() {
      "use strict";
      fixRegExpWellKnownSymbolLogic3 = require_fix_regexp_well_known_symbol_logic();
      isRegExp = require_is_regexp();
      anObject6 = require_an_object();
      requireObjectCoercible3 = require_require_object_coercible();
      speciesConstructor = require_species_constructor();
      advanceStringIndex3 = require_advance_string_index();
      toLength4 = require_to_length();
      callRegExpExec = require_regexp_exec_abstract();
      regexpExec = require_regexp_exec();
      stickyHelpers = require_regexp_sticky_helpers();
      fails11 = require_fails();
      UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
      arrayPush = [].push;
      min2 = Math.min;
      MAX_UINT32 = 4294967295;
      SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails11(function() {
        var re = /(?:)/;
        var originalExec = re.exec;
        re.exec = function() {
          return originalExec.apply(this, arguments);
        };
        var result = "ab".split(re);
        return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
      });
      fixRegExpWellKnownSymbolLogic3("split", function(SPLIT, nativeSplit, maybeCallNative) {
        var internalSplit;
        if ("abbc".split(/(b)*/)[1] == "c" || "test".split(/(?:)/, -1).length != 4 || "ab".split(/(?:ab)*/).length != 2 || ".".split(/(.?)(.?)/).length != 4 || ".".split(/()()/).length > 1 || "".split(/.?/).length) {
          internalSplit = function(separator, limit) {
            var string = String(requireObjectCoercible3(this));
            var lim = limit === void 0 ? MAX_UINT32 : limit >>> 0;
            if (lim === 0)
              return [];
            if (separator === void 0)
              return [string];
            if (!isRegExp(separator)) {
              return nativeSplit.call(string, separator, lim);
            }
            var output = [];
            var flags2 = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.unicode ? "u" : "") + (separator.sticky ? "y" : "");
            var lastLastIndex = 0;
            var separatorCopy = new RegExp(separator.source, flags2 + "g");
            var match, lastIndex, lastLength;
            while (match = regexpExec.call(separatorCopy, string)) {
              lastIndex = separatorCopy.lastIndex;
              if (lastIndex > lastLastIndex) {
                output.push(string.slice(lastLastIndex, match.index));
                if (match.length > 1 && match.index < string.length)
                  arrayPush.apply(output, match.slice(1));
                lastLength = match[0].length;
                lastLastIndex = lastIndex;
                if (output.length >= lim)
                  break;
              }
              if (separatorCopy.lastIndex === match.index)
                separatorCopy.lastIndex++;
            }
            if (lastLastIndex === string.length) {
              if (lastLength || !separatorCopy.test(""))
                output.push("");
            } else
              output.push(string.slice(lastLastIndex));
            return output.length > lim ? output.slice(0, lim) : output;
          };
        } else if ("0".split(void 0, 0).length) {
          internalSplit = function(separator, limit) {
            return separator === void 0 && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
          };
        } else
          internalSplit = nativeSplit;
        return [
          function split(separator, limit) {
            var O = requireObjectCoercible3(this);
            var splitter = separator == void 0 ? void 0 : separator[SPLIT];
            return splitter !== void 0 ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
          },
          function(string, limit) {
            var res = maybeCallNative(internalSplit, this, string, limit, internalSplit !== nativeSplit);
            if (res.done)
              return res.value;
            var rx = anObject6(this);
            var S = String(string);
            var C = speciesConstructor(rx, RegExp);
            var unicodeMatching = rx.unicode;
            var flags2 = (rx.ignoreCase ? "i" : "") + (rx.multiline ? "m" : "") + (rx.unicode ? "u" : "") + (UNSUPPORTED_Y ? "g" : "y");
            var splitter = new C(UNSUPPORTED_Y ? "^(?:" + rx.source + ")" : rx, flags2);
            var lim = limit === void 0 ? MAX_UINT32 : limit >>> 0;
            if (lim === 0)
              return [];
            if (S.length === 0)
              return callRegExpExec(splitter, S) === null ? [S] : [];
            var p = 0;
            var q = 0;
            var A = [];
            while (q < S.length) {
              splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
              var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
              var e;
              if (z === null || (e = min2(toLength4(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p) {
                q = advanceStringIndex3(S, q, unicodeMatching);
              } else {
                A.push(S.slice(p, q));
                if (A.length === lim)
                  return A;
                for (var i = 1; i <= z.length - 1; i++) {
                  A.push(z[i]);
                  if (A.length === lim)
                    return A;
                }
                q = p = e;
              }
            }
            A.push(S.slice(p));
            return A;
          }
        ];
      }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);
    }
  });

  // node_modules/core-js/modules/es.set.js
  var require_es_set = __commonJS({
    "node_modules/core-js/modules/es.set.js": function(exports, module) {
      "use strict";
      var collection = require_collection();
      var collectionStrong = require_collection_strong();
      module.exports = collection("Set", function(init) {
        return function Set2() {
          return init(this, arguments.length ? arguments[0] : void 0);
        };
      }, collectionStrong);
    }
  });

  // node_modules/core-js/internals/object-assign.js
  var require_object_assign = __commonJS({
    "node_modules/core-js/internals/object-assign.js": function(exports, module) {
      "use strict";
      var DESCRIPTORS8 = require_descriptors();
      var fails13 = require_fails();
      var objectKeys2 = require_object_keys();
      var getOwnPropertySymbolsModule2 = require_object_get_own_property_symbols();
      var propertyIsEnumerableModule2 = require_object_property_is_enumerable();
      var toObject5 = require_to_object();
      var IndexedObject2 = require_indexed_object();
      var $assign = Object.assign;
      var defineProperty4 = Object.defineProperty;
      module.exports = !$assign || fails13(function() {
        if (DESCRIPTORS8 && $assign({ b: 1 }, $assign(defineProperty4({}, "a", {
          enumerable: true,
          get: function() {
            defineProperty4(this, "b", {
              value: 3,
              enumerable: false
            });
          }
        }), { b: 2 })).b !== 1)
          return true;
        var A = {};
        var B = {};
        var symbol = Symbol();
        var alphabet = "abcdefghijklmnopqrst";
        A[symbol] = 7;
        alphabet.split("").forEach(function(chr) {
          B[chr] = chr;
        });
        return $assign({}, A)[symbol] != 7 || objectKeys2($assign({}, B)).join("") != alphabet;
      }) ? function assign2(target, source) {
        var T = toObject5(target);
        var argumentsLength = arguments.length;
        var index = 1;
        var getOwnPropertySymbols3 = getOwnPropertySymbolsModule2.f;
        var propertyIsEnumerable2 = propertyIsEnumerableModule2.f;
        while (argumentsLength > index) {
          var S = IndexedObject2(arguments[index++]);
          var keys2 = getOwnPropertySymbols3 ? objectKeys2(S).concat(getOwnPropertySymbols3(S)) : objectKeys2(S);
          var length = keys2.length;
          var j = 0;
          var key;
          while (length > j) {
            key = keys2[j++];
            if (!DESCRIPTORS8 || propertyIsEnumerable2.call(S, key))
              T[key] = S[key];
          }
        }
        return T;
      } : $assign;
    }
  });

  // node_modules/core-js/modules/es.object.assign.js
  var $20, assign;
  var init_es_object_assign = __esm({
    "node_modules/core-js/modules/es.object.assign.js": function() {
      $20 = require_export();
      assign = require_object_assign();
      $20({ target: "Object", stat: true, forced: Object.assign !== assign }, {
        assign: assign
      });
    }
  });

  // node_modules/core-js/modules/es.object.get-own-property-names.js
  var $21, fails12, getOwnPropertyNames2, FAILS_ON_PRIMITIVES6;
  var init_es_object_get_own_property_names = __esm({
    "node_modules/core-js/modules/es.object.get-own-property-names.js": function() {
      $21 = require_export();
      fails12 = require_fails();
      getOwnPropertyNames2 = require_object_get_own_property_names_external().f;
      FAILS_ON_PRIMITIVES6 = fails12(function() {
        return !Object.getOwnPropertyNames(1);
      });
      $21({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES6 }, {
        getOwnPropertyNames: getOwnPropertyNames2
      });
    }
  });

  // node_modules/object-assign/index.js
  var require_object_assign2 = __commonJS({
    "node_modules/object-assign/index.js": function(exports, module) {
      init_es_symbol();
      init_es_object_assign();
      init_es_object_get_own_property_names();
      init_es_array_map();
      init_es_array_join();
      init_es_array_for_each();
      var import_es_regexp_exec = __toModule(require_es_regexp_exec());
      init_es_string_split();
      init_es_object_keys();
      "use strict";
      var getOwnPropertySymbols3 = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject5(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject5(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols3) {
            symbols = getOwnPropertySymbols3(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    }
  });

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js": function(exports) {
      init_es_symbol();
      init_es_symbol_description();
      init_es_object_to_string();
      init_es_symbol_iterator();
      var import_es_array_iterator2 = __toModule(require_es_array_iterator());
      init_es_string_iterator();
      init_web_dom_collections_iterator();
      init_es_array_concat();
      init_es_array_map();
      init_es_function_name();
      init_es_object_freeze();
      init_es_object_define_property();
      init_es_object_seal();
      init_es_object_get_own_property_descriptor();
      var import_es_regexp_exec = __toModule(require_es_regexp_exec());
      init_es_string_replace();
      init_es_date_to_string();
      init_es_regexp_to_string();
      init_es_array_is_array();
      init_es_array_join();
      init_es_object_keys();
      init_es_object_define_properties();
      init_es_string_match();
      init_es_string_trim();
      var import_es_weak_map = __toModule(require_es_weak_map());
      var import_es_map = __toModule(require_es_map());
      init_es_reflect_construct();
      init_es_string_split();
      init_es_function_bind();
      var import_es_set = __toModule(require_es_set());
      "use strict";
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
      if (true) {
        (function() {
          "use strict";
          var _assign = require_object_assign2();
          var ReactVersion = "17.0.2";
          var REACT_ELEMENT_TYPE = 60103;
          var REACT_PORTAL_TYPE = 60106;
          exports.Fragment = 60107;
          exports.StrictMode = 60108;
          exports.Profiler = 60114;
          var REACT_PROVIDER_TYPE = 60109;
          var REACT_CONTEXT_TYPE = 60110;
          var REACT_FORWARD_REF_TYPE = 60112;
          exports.Suspense = 60113;
          var REACT_SUSPENSE_LIST_TYPE = 60120;
          var REACT_MEMO_TYPE = 60115;
          var REACT_LAZY_TYPE = 60116;
          var REACT_BLOCK_TYPE = 60121;
          var REACT_SERVER_BLOCK_TYPE = 60122;
          var REACT_FUNDAMENTAL_TYPE = 60117;
          var REACT_SCOPE_TYPE = 60119;
          var REACT_OPAQUE_ID_TYPE = 60128;
          var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
          var REACT_OFFSCREEN_TYPE = 60130;
          var REACT_LEGACY_HIDDEN_TYPE = 60131;
          if (typeof Symbol === "function" && Symbol["for"]) {
            var symbolFor = Symbol["for"];
            REACT_ELEMENT_TYPE = symbolFor("react.element");
            REACT_PORTAL_TYPE = symbolFor("react.portal");
            exports.Fragment = symbolFor("react.fragment");
            exports.StrictMode = symbolFor("react.strict_mode");
            exports.Profiler = symbolFor("react.profiler");
            REACT_PROVIDER_TYPE = symbolFor("react.provider");
            REACT_CONTEXT_TYPE = symbolFor("react.context");
            REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
            exports.Suspense = symbolFor("react.suspense");
            REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
            REACT_MEMO_TYPE = symbolFor("react.memo");
            REACT_LAZY_TYPE = symbolFor("react.lazy");
            REACT_BLOCK_TYPE = symbolFor("react.block");
            REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
            REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
            REACT_SCOPE_TYPE = symbolFor("react.scope");
            REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
            REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
            REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
            REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
          }
          var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || _typeof(maybeIterable) !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactCurrentDispatcher = {
            current: null
          };
          var ReactCurrentBatchConfig = {
            transition: 0
          };
          var ReactCurrentOwner = {
            current: null
          };
          var ReactDebugCurrentFrame = {};
          var currentExtraStackFrame = null;
          function setExtraStackFrame(stack) {
            {
              currentExtraStackFrame = stack;
            }
          }
          {
            ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
              {
                currentExtraStackFrame = stack;
              }
            };
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function() {
              var stack = "";
              if (currentExtraStackFrame) {
                stack += currentExtraStackFrame;
              }
              var impl = ReactDebugCurrentFrame.getCurrentStack;
              if (impl) {
                stack += impl() || "";
              }
              return stack;
            };
          }
          var IsSomeRendererActing = {
            current: false
          };
          var ReactSharedInternals = {
            ReactCurrentDispatcher: ReactCurrentDispatcher,
            ReactCurrentBatchConfig: ReactCurrentBatchConfig,
            ReactCurrentOwner: ReactCurrentOwner,
            IsSomeRendererActing: IsSomeRendererActing,
            assign: _assign
          };
          {
            ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
          }
          function warn(format) {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
          function error(format) {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return "" + item;
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var didWarnStateUpdateForUnmountedComponent = {};
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                return;
              }
              error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
              didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
          }
          var ReactNoopUpdateQueue = {
            isMounted: function isMounted(publicInstance) {
              return false;
            },
            enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
              warnNoop(publicInstance, "forceUpdate");
            },
            enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
              warnNoop(publicInstance, "replaceState");
            },
            enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
              warnNoop(publicInstance, "setState");
            }
          };
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function Component2(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          Component2.prototype.isReactComponent = {};
          Component2.prototype.setState = function(partialState, callback) {
            if (!(_typeof(partialState) === "object" || typeof partialState === "function" || partialState == null)) {
              {
                throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
              }
            }
            this.updater.enqueueSetState(this, partialState, callback, "setState");
          };
          Component2.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
          };
          {
            var deprecatedAPIs = {
              isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
              replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
            };
            var defineDeprecationWarning = function defineDeprecationWarning2(methodName, info) {
              Object.defineProperty(Component2.prototype, methodName, {
                get: function get() {
                  warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                  return void 0;
                }
              });
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          function ComponentDummy() {
          }
          ComponentDummy.prototype = Component2.prototype;
          function PureComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
          pureComponentPrototype.constructor = PureComponent;
          _assign(pureComponentPrototype, Component2.prototype);
          pureComponentPrototype.isPureReactComponent = true;
          function createRef() {
            var refObject = {
              current: null
            };
            {
              Object.seal(refObject);
            }
            return refObject;
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var functionName = innerType.displayName || innerType.name || "";
            return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentName(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case exports.Fragment:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case exports.Profiler:
                return "Profiler";
              case exports.StrictMode:
                return "StrictMode";
              case exports.Suspense:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (_typeof(type) === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  return getComponentName(type.type);
                case REACT_BLOCK_TYPE:
                  return getComponentName(type._render);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentName(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function warnAboutAccessingKey2() {
              {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function warnAboutAccessingRef2() {
              {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
          function warnIfStringRefCannotBeAutoConverted(config) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
                var componentName = getComponentName(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          var ReactElement = function ReactElement2(type, key, ref, self2, source, owner, props) {
            var element = {
              $$typeof: REACT_ELEMENT_TYPE,
              type: type,
              key: key,
              ref: ref,
              props: props,
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self2
              });
              Object.defineProperty(element, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element.props);
                Object.freeze(element);
              }
            }
            return element;
          };
          function createElement2(type, config, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self2 = null;
            var source = null;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                {
                  warnIfStringRefCannotBeAutoConverted(config);
                }
              }
              if (hasValidKey(config)) {
                key = "" + config.key;
              }
              self2 = config.__self === void 0 ? null : config.__self;
              source = config.__source === void 0 ? null : config.__source;
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              {
                if (Object.freeze) {
                  Object.freeze(childArray);
                }
              }
              props.children = childArray;
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            {
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
            }
            return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
          }
          function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          }
          function cloneElement2(element, config, children) {
            if (!!(element === null || element === void 0)) {
              {
                throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
              }
            }
            var propName;
            var props = _assign({}, element.props);
            var key = element.key;
            var ref = element.ref;
            var self2 = element._self;
            var source = element._source;
            var owner = element._owner;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                owner = ReactCurrentOwner.current;
              }
              if (hasValidKey(config)) {
                key = "" + config.key;
              }
              var defaultProps;
              if (element.type && element.type.defaultProps) {
                defaultProps = element.type.defaultProps;
              }
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  if (config[propName] === void 0 && defaultProps !== void 0) {
                    props[propName] = defaultProps[propName];
                  } else {
                    props[propName] = config[propName];
                  }
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              props.children = childArray;
            }
            return ReactElement(element.type, key, ref, self2, source, owner, props);
          }
          function isValidElement(object) {
            return _typeof(object) === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          var SEPARATOR = ".";
          var SUBSEPARATOR = ":";
          function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
              "=": "=0",
              ":": "=2"
            };
            var escapedString = key.replace(escapeRegex, function(match) {
              return escaperLookup[match];
            });
            return "$" + escapedString;
          }
          var didWarnAboutMaps = false;
          var userProvidedKeyEscapeRegex = /\/+/g;
          function escapeUserProvidedKey(text) {
            return text.replace(userProvidedKeyEscapeRegex, "$&/");
          }
          function getElementKey(element, index) {
            if (_typeof(element) === "object" && element !== null && element.key != null) {
              return escape("" + element.key);
            }
            return index.toString(36);
          }
          function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
            var type = _typeof(children);
            if (type === "undefined" || type === "boolean") {
              children = null;
            }
            var invokeCallback = false;
            if (children === null) {
              invokeCallback = true;
            } else {
              switch (type) {
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                  }
              }
            }
            if (invokeCallback) {
              var _child = children;
              var mappedChild = callback(_child);
              var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
              if (Array.isArray(mappedChild)) {
                var escapedChildKey = "";
                if (childKey != null) {
                  escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                }
                mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                  return c;
                });
              } else if (mappedChild != null) {
                if (isValidElement(mappedChild)) {
                  mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
                }
                array.push(mappedChild);
              }
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (Array.isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                child = children[i];
                nextName = nextNamePrefix + getElementKey(child, i);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (typeof iteratorFn === "function") {
                var iterableChildren = children;
                {
                  if (iteratorFn === iterableChildren.entries) {
                    if (!didWarnAboutMaps) {
                      warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                    }
                    didWarnAboutMaps = true;
                  }
                }
                var iterator = iteratorFn.call(iterableChildren);
                var step;
                var ii = 0;
                while (!(step = iterator.next()).done) {
                  child = step.value;
                  nextName = nextNamePrefix + getElementKey(child, ii++);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
              } else if (type === "object") {
                var childrenString = "" + children;
                {
                  {
                    throw Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
                  }
                }
              }
            }
            return subtreeCount;
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, "", "", function(child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function countChildren(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
              forEachFunc.apply(this, arguments);
            }, forEachContext);
          }
          function toArray(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          }
          function onlyChild(children) {
            if (!isValidElement(children)) {
              {
                throw Error("React.Children.only expected to receive a single React element child.");
              }
            }
            return children;
          }
          function createContext(defaultValue, calculateChangedBits) {
            if (calculateChangedBits === void 0) {
              calculateChangedBits = null;
            } else {
              {
                if (calculateChangedBits !== null && typeof calculateChangedBits !== "function") {
                  error("createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
                }
              }
            }
            var context = {
              $$typeof: REACT_CONTEXT_TYPE,
              _calculateChangedBits: calculateChangedBits,
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              _threadCount: 0,
              Provider: null,
              Consumer: null
            };
            context.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: context
            };
            var hasWarnedAboutUsingNestedContextConsumers = false;
            var hasWarnedAboutUsingConsumerProvider = false;
            var hasWarnedAboutDisplayNameOnConsumer = false;
            {
              var Consumer = {
                $$typeof: REACT_CONTEXT_TYPE,
                _context: context,
                _calculateChangedBits: context._calculateChangedBits
              };
              Object.defineProperties(Consumer, {
                Provider: {
                  get: function get() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                      hasWarnedAboutUsingConsumerProvider = true;
                      error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                  },
                  set: function set(_Provider) {
                    context.Provider = _Provider;
                  }
                },
                _currentValue: {
                  get: function get() {
                    return context._currentValue;
                  },
                  set: function set(_currentValue) {
                    context._currentValue = _currentValue;
                  }
                },
                _currentValue2: {
                  get: function get() {
                    return context._currentValue2;
                  },
                  set: function set(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                  }
                },
                _threadCount: {
                  get: function get() {
                    return context._threadCount;
                  },
                  set: function set(_threadCount) {
                    context._threadCount = _threadCount;
                  }
                },
                Consumer: {
                  get: function get() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                      hasWarnedAboutUsingNestedContextConsumers = true;
                      error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                  }
                },
                displayName: {
                  get: function get() {
                    return context.displayName;
                  },
                  set: function set(displayName) {
                    if (!hasWarnedAboutDisplayNameOnConsumer) {
                      warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                      hasWarnedAboutDisplayNameOnConsumer = true;
                    }
                  }
                }
              });
              context.Consumer = Consumer;
            }
            {
              context._currentRenderer = null;
              context._currentRenderer2 = null;
            }
            return context;
          }
          var Uninitialized = -1;
          var Pending = 0;
          var Resolved = 1;
          var Rejected = 2;
          function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
              var ctor = payload._result;
              var thenable = ctor();
              var pending = payload;
              pending._status = Pending;
              pending._result = thenable;
              thenable.then(function(moduleObject) {
                if (payload._status === Pending) {
                  var defaultExport = moduleObject["default"];
                  {
                    if (defaultExport === void 0) {
                      error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                    }
                  }
                  var resolved = payload;
                  resolved._status = Resolved;
                  resolved._result = defaultExport;
                }
              }, function(error2) {
                if (payload._status === Pending) {
                  var rejected = payload;
                  rejected._status = Rejected;
                  rejected._result = error2;
                }
              });
            }
            if (payload._status === Resolved) {
              return payload._result;
            } else {
              throw payload._result;
            }
          }
          function lazy(ctor) {
            var payload = {
              _status: -1,
              _result: ctor
            };
            var lazyType = {
              $$typeof: REACT_LAZY_TYPE,
              _payload: payload,
              _init: lazyInitializer
            };
            {
              var defaultProps;
              var propTypes;
              Object.defineProperties(lazyType, {
                defaultProps: {
                  configurable: true,
                  get: function get() {
                    return defaultProps;
                  },
                  set: function set(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps;
                    Object.defineProperty(lazyType, "defaultProps", {
                      enumerable: true
                    });
                  }
                },
                propTypes: {
                  configurable: true,
                  get: function get() {
                    return propTypes;
                  },
                  set: function set(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes;
                    Object.defineProperty(lazyType, "propTypes", {
                      enumerable: true
                    });
                  }
                }
              });
            }
            return lazyType;
          }
          function forwardRef(render) {
            {
              if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
              } else if (typeof render !== "function") {
                error("forwardRef requires a render function but was given %s.", render === null ? "null" : _typeof(render));
              } else {
                if (render.length !== 0 && render.length !== 2) {
                  error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
                }
              }
              if (render != null) {
                if (render.defaultProps != null || render.propTypes != null) {
                  error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
                }
              }
            }
            var elementType = {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render: render
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function get() {
                  return ownName;
                },
                set: function set(name) {
                  ownName = name;
                  if (render.displayName == null) {
                    render.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          var enableScopeAPI = false;
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
              return true;
            }
            if (_typeof(type) === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
                return true;
              }
            }
            return false;
          }
          function memo(type, compare) {
            {
              if (!isValidElementType(type)) {
                error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : _typeof(type));
              }
            }
            var elementType = {
              $$typeof: REACT_MEMO_TYPE,
              type: type,
              compare: compare === void 0 ? null : compare
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function get() {
                  return ownName;
                },
                set: function set(name) {
                  ownName = name;
                  if (type.displayName == null) {
                    type.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          function resolveDispatcher() {
            var dispatcher = ReactCurrentDispatcher.current;
            if (!(dispatcher !== null)) {
              {
                throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            return dispatcher;
          }
          function useContext(Context, unstable_observedBits) {
            var dispatcher = resolveDispatcher();
            {
              if (unstable_observedBits !== void 0) {
                error("useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s", unstable_observedBits, typeof unstable_observedBits === "number" && Array.isArray(arguments[2]) ? "\n\nDid you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://reactjs.org/link/rules-of-hooks" : "");
              }
              if (Context._context !== void 0) {
                var realContext = Context._context;
                if (realContext.Consumer === Context) {
                  error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
                } else if (realContext.Provider === Context) {
                  error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
                }
              }
            }
            return dispatcher.useContext(Context, unstable_observedBits);
          }
          function useState(initialState) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useState(initialState);
          }
          function useReducer(reducer, initialArg, init) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useReducer(reducer, initialArg, init);
          }
          function useRef(initialValue) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useRef(initialValue);
          }
          function useEffect(create4, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useEffect(create4, deps);
          }
          function useLayoutEffect(create4, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useLayoutEffect(create4, deps);
          }
          function useCallback(callback, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback, deps);
          }
          function useMemo(create4, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create4, deps);
          }
          function useImperativeHandle(ref, create4, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useImperativeHandle(ref, create4, deps);
          }
          function useDebugValue(value, formatterFn) {
            {
              var dispatcher = resolveDispatcher();
              return dispatcher.useDebugValue(value, formatterFn);
            }
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: _assign({}, props, {
                    value: prevLog
                  }),
                  info: _assign({}, props, {
                    value: prevInfo
                  }),
                  warn: _assign({}, props, {
                    value: prevWarn
                  }),
                  error: _assign({}, props, {
                    value: prevError
                  }),
                  group: _assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: _assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: _assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct2) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = null;
              disableLogs();
            }
            try {
              if (construct2) {
                var Fake = function Fake2() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function set() {
                    throw Error();
                  }
                });
                if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher$1.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component3) {
            var prototype = Component3.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case exports.Suspense:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (_typeof(type) === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_BLOCK_TYPE:
                  return describeFunctionComponentFrame(type._render);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has3 = Function.call.bind(Object.prototype.hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has3(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + _typeof(typeSpecs[typeSpecName]) + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, _typeof(error$1));
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                setExtraStackFrame(stack);
              } else {
                setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = getComponentName(ReactCurrentOwner.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
          function getSourceInfoErrorAddendum(source) {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
          function getSourceInfoErrorAddendumForProps(elementProps) {
            if (elementProps !== null && elementProps !== void 0) {
              return getSourceInfoErrorAddendum(elementProps.__source);
            }
            return "";
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
          function validateExplicitKey(element, parentType) {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
              childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
            }
            {
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            if (_typeof(node) !== "object") {
              return;
            }
            if (Array.isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (_typeof(type) === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentName(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentName(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys2 = Object.keys(fragment.props);
              for (var i = 0; i < keys2.length; i++) {
                var key = keys2[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || _typeof(type) === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendumForProps(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (Array.isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentName(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = _typeof(type);
              }
              {
                error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
            }
            var element = createElement2.apply(this, arguments);
            if (element == null) {
              return element;
            }
            if (validType) {
              for (var i = 2; i < arguments.length; i++) {
                validateChildKeys(arguments[i], type);
              }
            }
            if (type === exports.Fragment) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
          var didWarnAboutDeprecatedCreateFactory = false;
          function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            validatedFactory.type = type;
            {
              if (!didWarnAboutDeprecatedCreateFactory) {
                didWarnAboutDeprecatedCreateFactory = true;
                warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
              }
              Object.defineProperty(validatedFactory, "type", {
                enumerable: false,
                get: function get() {
                  warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                  Object.defineProperty(this, "type", {
                    value: type
                  });
                  return type;
                }
              });
            }
            return validatedFactory;
          }
          function cloneElementWithValidation(element, props, children) {
            var newElement = cloneElement2.apply(this, arguments);
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], newElement.type);
            }
            validatePropTypes(newElement);
            return newElement;
          }
          {
            try {
              var frozenObject = Object.freeze({});
              new Map([[frozenObject, null]]);
              new Set([frozenObject]);
            } catch (e) {
            }
          }
          var createElement$1 = createElementWithValidation;
          var cloneElement$1 = cloneElementWithValidation;
          var createFactory = createFactoryWithValidation;
          var Children2 = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray: toArray,
            only: onlyChild
          };
          exports.Children = Children2;
          exports.Component = Component2;
          exports.PureComponent = PureComponent;
          exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
          exports.cloneElement = cloneElement$1;
          exports.createContext = createContext;
          exports.createElement = createElement$1;
          exports.createFactory = createFactory;
          exports.createRef = createRef;
          exports.forwardRef = forwardRef;
          exports.isValidElement = isValidElement;
          exports.lazy = lazy;
          exports.memo = memo;
          exports.useCallback = useCallback;
          exports.useContext = useContext;
          exports.useDebugValue = useDebugValue;
          exports.useEffect = useEffect;
          exports.useImperativeHandle = useImperativeHandle;
          exports.useLayoutEffect = useLayoutEffect;
          exports.useMemo = useMemo;
          exports.useReducer = useReducer;
          exports.useRef = useRef;
          exports.useState = useState;
          exports.version = ReactVersion;
        })();
      }
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js": function(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // nav.js
  init_es_function_bind();
  init_es_array_concat();
  init_es_function_name();
  init_es_array_for_each();

  // node_modules/core-js/modules/web.dom-collections.for-each.js
  var global2 = require_global();
  var DOMIterables = require_dom_iterables();
  var forEach2 = require_array_for_each();
  var createNonEnumerableProperty = require_create_non_enumerable_property();
  for (var COLLECTION_NAME in DOMIterables) {
    Collection = global2[COLLECTION_NAME];
    CollectionPrototype = Collection && Collection.prototype;
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach2)
      try {
        createNonEnumerableProperty(CollectionPrototype, "forEach", forEach2);
      } catch (error) {
        CollectionPrototype.forEach = forEach2;
      }
  }
  var Collection;
  var CollectionPrototype;

  // nav.js
  init_es_array_map();

  // node_modules/core-js/modules/es.object.set-prototype-of.js
  var $5 = require_export();
  var setPrototypeOf = require_object_set_prototype_of();
  $5({ target: "Object", stat: true }, {
    setPrototypeOf: setPrototypeOf
  });

  // node_modules/core-js/modules/es.object.get-prototype-of.js
  var $6 = require_export();
  var fails2 = require_fails();
  var toObject2 = require_to_object();
  var nativeGetPrototypeOf = require_object_get_prototype_of();
  var CORRECT_PROTOTYPE_GETTER = require_correct_prototype_getter();
  var FAILS_ON_PRIMITIVES = fails2(function() {
    nativeGetPrototypeOf(1);
  });
  $6({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
    getPrototypeOf: function getPrototypeOf(it) {
      return nativeGetPrototypeOf(toObject2(it));
    }
  });

  // nav.js
  init_es_reflect_construct();

  // node_modules/core-js/modules/es.object.create.js
  var $8 = require_export();
  var DESCRIPTORS2 = require_descriptors();
  var create2 = require_object_create();
  $8({ target: "Object", stat: true, sham: !DESCRIPTORS2 }, {
    create: create2
  });

  // nav.js
  init_es_object_define_property();
  init_es_symbol();
  init_es_symbol_description();
  init_es_object_to_string();
  init_es_symbol_iterator();
  var import_es_array_iterator = __toModule(require_es_array_iterator());
  init_es_string_iterator();
  init_web_dom_collections_iterator();
  var React = __toModule(require_react());
})();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLW9iamVjdC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHkuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LWdsb2JhbC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXB1cmUuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3BhdGguanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWludGVnZXIuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vd24ta2V5cy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWZ1bmN0aW9uLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmZ1bmN0aW9uLmJpbmQuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtYXJyYXkuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuZnVuY3Rpb24ubmFtZS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2guanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lm1hcC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZi5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXIuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2h0bWwuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVmbGVjdC5jb25zdHJ1Y3QuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMtZXh0ZXJuYWwuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtd3JhcHBlZC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN5bWJvbC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLmRlc2NyaXB0aW9uLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC50by1zdHJpbmcuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN5bWJvbC5pdGVyYXRvci5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3JzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3Rvci5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3IuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvci5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvci5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mcmVlemluZy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnRlcm5hbC1tZXRhZGF0YS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmZyZWV6ZS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnNlYWwuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1zdGlja3ktaGVscGVycy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtZG90LWFsbC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtbmNnLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuZXhlYy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1zdWJzdGl0dXRpb24uanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5yZXBsYWNlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5kYXRlLnRvLXN0cmluZy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLnRvLXN0cmluZy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaXMtYXJyYXkuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmpvaW4uanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5rZXlzLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuZGVmaW5lLXByb3BlcnRpZXMuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5tYXRjaC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93aGl0ZXNwYWNlcy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctdHJpbS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctdHJpbS1mb3JjZWQuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy50cmltLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLWFsbC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvci1jbG9zZS5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLWluc3RhbmNlLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbi5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmhlcml0LWlmLXJlcXVpcmVkLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvbGxlY3Rpb24uanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29sbGVjdGlvbi13ZWFrLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy53ZWFrLW1hcC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtc3BlY2llcy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb2xsZWN0aW9uLXN0cm9uZy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMubWFwLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXJlZ2V4cC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuc3BsaXQuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnNldC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtYXNzaWduLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuYXNzaWduLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL3JlYWN0L2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25hdi5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5mb3ItZWFjaC5qcyIsICIuLi8uLi9qYXZhc2NyaXB0L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCAiLi4vLi4vamF2YXNjcmlwdC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwgIi4uLy4uL2phdmFzY3JpcHQvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuY3JlYXRlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJ2YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1nbG9iYWwtdGhpcyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzIC0tIHNhZmVcbiAgY2hlY2sodHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuYyAtLSBmYWxsYmFja1xuICAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSkoKSB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwgIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCAidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgMSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSlbMV0gIT0gNztcbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhJHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAxOiAyIH0sIDEpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUucHJvcGVydHlpc2VudW1lcmFibGVcbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwgIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCAidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwgInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyIHNwbGl0ID0gJycuc3BsaXQ7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwgIi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCAiLy8gdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEluZGV4ZWRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShpdCkpO1xufTtcbiIsICJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsICJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsICJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9vYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsICJ2YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5oYXNPd24gfHwgZnVuY3Rpb24gaGFzT3duKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwodG9PYmplY3QoaXQpLCBrZXkpO1xufTtcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBFWElTVFMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBFWElTVFMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsICJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aWVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsICJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCAidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsICJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gJGRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwgInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoZ2xvYmFsLCBrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBzZXRHbG9iYWwoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCAidmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnRvU3RyaW5nO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYGNvcmUtanNAMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAodHlwZW9mIHN0b3JlLmluc3BlY3RTb3VyY2UgIT0gJ2Z1bmN0aW9uJykge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcblxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoaW5zcGVjdFNvdXJjZShXZWFrTWFwKSk7XG4iLCAibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsICJ2YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiAnMy4xNS4yJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICdcdTAwQTkgMjAyMSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwgInZhciBpZCA9IDA7XG52YXIgcG9zdGZpeCA9IE1hdGgucmFuZG9tKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgU3RyaW5nKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArICgrK2lkICsgcG9zdGZpeCkudG9TdHJpbmcoMzYpO1xufTtcbiIsICJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCAibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsICJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgb2JqZWN0SGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEID0gJ09iamVjdCBhbHJlYWR5IGluaXRpYWxpemVkJztcbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG52YXIgc2V0LCBnZXQsIGhhcztcblxudmFyIGVuZm9yY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGhhcyhpdCkgPyBnZXQoaXQpIDogc2V0KGl0LCB7fSk7XG59O1xuXG52YXIgZ2V0dGVyRm9yID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoIWlzT2JqZWN0KGl0KSB8fCAoc3RhdGUgPSBnZXQoaXQpKS50eXBlICE9PSBUWVBFKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkJyk7XG4gICAgfSByZXR1cm4gc3RhdGU7XG4gIH07XG59O1xuXG5pZiAoTkFUSVZFX1dFQUtfTUFQIHx8IHNoYXJlZC5zdGF0ZSkge1xuICB2YXIgc3RvcmUgPSBzaGFyZWQuc3RhdGUgfHwgKHNoYXJlZC5zdGF0ZSA9IG5ldyBXZWFrTWFwKCkpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaWYgKHdtaGFzLmNhbGwoc3RvcmUsIGl0KSkgdGhyb3cgbmV3IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmIChvYmplY3RIYXMoaXQsIFNUQVRFKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwgInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgVEVNUExBVEUgPSBTdHJpbmcoU3RyaW5nKS5zcGxpdCgnU3RyaW5nJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciB1bnNhZmUgPSBvcHRpb25zID8gISFvcHRpb25zLnVuc2FmZSA6IGZhbHNlO1xuICB2YXIgc2ltcGxlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5lbnVtZXJhYmxlIDogZmFsc2U7XG4gIHZhciBub1RhcmdldEdldCA9IG9wdGlvbnMgPyAhIW9wdGlvbnMubm9UYXJnZXRHZXQgOiBmYWxzZTtcbiAgdmFyIHN0YXRlO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiAhaGFzKHZhbHVlLCAnbmFtZScpKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodmFsdWUsICduYW1lJywga2V5KTtcbiAgICB9XG4gICAgc3RhdGUgPSBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSk7XG4gICAgaWYgKCFzdGF0ZS5zb3VyY2UpIHtcbiAgICAgIHN0YXRlLnNvdXJjZSA9IFRFTVBMQVRFLmpvaW4odHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/IGtleSA6ICcnKTtcbiAgICB9XG4gIH1cbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2Ugc2V0R2xvYmFsKGtleSwgdmFsdWUpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICghdW5zYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgfSBlbHNlIGlmICghbm9UYXJnZXRHZXQgJiYgT1trZXldKSB7XG4gICAgc2ltcGxlID0gdHJ1ZTtcbiAgfVxuICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoTywga2V5LCB2YWx1ZSk7XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59KTtcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbiIsICJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT0gJ2Z1bmN0aW9uJyA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwgInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYFRvSW50ZWdlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvaW50ZWdlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzTmFOKGFyZ3VtZW50ID0gK2FyZ3VtZW50KSA/IDAgOiAoYXJndW1lbnQgPiAwID8gZmxvb3IgOiBjZWlsKShhcmd1bWVudCk7XG59O1xuIiwgInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlcihhcmd1bWVudCksIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsICJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwgInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCAidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXMoaGlkZGVuS2V5cywga2V5KSAmJiBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCAiLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCAidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHluYW1lcyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCAiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eXN5bWJvbHMgLS0gc2FmZVxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsICJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCAidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzKHRhcmdldCwga2V5KSkgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICB9XG59O1xuIiwgInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09IFBPTFlGSUxMID8gdHJ1ZVxuICAgIDogdmFsdWUgPT0gTkFUSVZFID8gZmFsc2VcbiAgICA6IHR5cGVvZiBkZXRlY3Rpb24gPT0gJ2Z1bmN0aW9uJyA/IGZhaWxzKGRldGVjdGlvbilcbiAgICA6ICEhZGV0ZWN0aW9uO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGlzRm9yY2VkLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVwbGFjZW1lbnQsICcuJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBkYXRhID0gaXNGb3JjZWQuZGF0YSA9IHt9O1xudmFyIE5BVElWRSA9IGlzRm9yY2VkLk5BVElWRSA9ICdOJztcbnZhciBQT0xZRklMTCA9IGlzRm9yY2VkLlBPTFlGSUxMID0gJ1AnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRm9yY2VkO1xuIiwgInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgc2V0R2xvYmFsKFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwgIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBzbGljZSA9IFtdLnNsaWNlO1xudmFyIGZhY3RvcmllcyA9IHt9O1xuXG52YXIgY29uc3RydWN0ID0gZnVuY3Rpb24gKEMsIGFyZ3NMZW5ndGgsIGFyZ3MpIHtcbiAgaWYgKCEoYXJnc0xlbmd0aCBpbiBmYWN0b3JpZXMpKSB7XG4gICAgZm9yICh2YXIgbGlzdCA9IFtdLCBpID0gMDsgaSA8IGFyZ3NMZW5ndGg7IGkrKykgbGlzdFtpXSA9ICdhWycgKyBpICsgJ10nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuYyAtLSB3ZSBoYXZlIG5vIHByb3BlciBhbHRlcm5hdGl2ZXMsIElFOC0gb25seVxuICAgIGZhY3Rvcmllc1thcmdzTGVuZ3RoXSA9IEZ1bmN0aW9uKCdDLGEnLCAncmV0dXJuIG5ldyBDKCcgKyBsaXN0LmpvaW4oJywnKSArICcpJyk7XG4gIH0gcmV0dXJuIGZhY3Rvcmllc1thcmdzTGVuZ3RoXShDLCBhcmdzKTtcbn07XG5cbi8vIGBGdW5jdGlvbi5wcm90b3R5cGUuYmluZGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLmJpbmQgfHwgZnVuY3Rpb24gYmluZCh0aGF0IC8qICwgLi4uYXJncyAqLykge1xuICB2YXIgZm4gPSBhRnVuY3Rpb24odGhpcyk7XG4gIHZhciBwYXJ0QXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgdmFyIGJvdW5kRnVuY3Rpb24gPSBmdW5jdGlvbiBib3VuZCgvKiBhcmdzLi4uICovKSB7XG4gICAgdmFyIGFyZ3MgPSBwYXJ0QXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIGJvdW5kRnVuY3Rpb24gPyBjb25zdHJ1Y3QoZm4sIGFyZ3MubGVuZ3RoLCBhcmdzKSA6IGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9O1xuICBpZiAoaXNPYmplY3QoZm4ucHJvdG90eXBlKSkgYm91bmRGdW5jdGlvbi5wcm90b3R5cGUgPSBmbi5wcm90b3R5cGU7XG4gIHJldHVybiBib3VuZEZ1bmN0aW9uO1xufTtcbiIsICJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQnKTtcblxuLy8gYEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbiQoeyB0YXJnZXQ6ICdGdW5jdGlvbicsIHByb3RvOiB0cnVlIH0sIHtcbiAgYmluZDogYmluZFxufSk7XG4iLCAidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxuLy8gYElzQXJyYXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2FycmF5XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktaXNhcnJheSAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgcmV0dXJuIGNsYXNzb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIHByb3BlcnR5S2V5ID0gdG9QcmltaXRpdmUoa2V5KTtcbiAgaWYgKHByb3BlcnR5S2V5IGluIG9iamVjdCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIHByb3BlcnR5S2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbcHJvcGVydHlLZXldID0gdmFsdWU7XG59O1xuIiwgInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ25hdmlnYXRvcicsICd1c2VyQWdlbnQnKSB8fCAnJztcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIHZlcnNpb24gPSBtYXRjaFswXSA8IDQgPyAxIDogbWF0Y2hbMF0gKyBtYXRjaFsxXTtcbn0gZWxzZSBpZiAodXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uICYmICt2ZXJzaW9uO1xuIiwgIi8qIGVzbGludC1kaXNhYmxlIGVzL25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xubW9kdWxlLmV4cG9ydHMgPSAhIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN5bWJvbCA9IFN5bWJvbCgpO1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBgZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzYCBwb2x5ZmlsbCBzeW1ib2xzIGNvbnZlcnRlZCB0byBvYmplY3QgYXJlIG5vdCBTeW1ib2wgaW5zdGFuY2VzXG4gIHJldHVybiAhU3RyaW5nKHN5bWJvbCkgfHwgIShPYmplY3Qoc3ltYm9sKSBpbnN0YW5jZW9mIFN5bWJvbCkgfHxcbiAgICAvLyBDaHJvbWUgMzgtNDAgc3ltYm9scyBhcmUgbm90IGluaGVyaXRlZCBmcm9tIERPTSBjb2xsZWN0aW9ucyBwcm90b3R5cGVzIHRvIGluc3RhbmNlc1xuICAgICFTeW1ib2wuc2hhbSAmJiBWOF9WRVJTSU9OICYmIFY4X1ZFUlNJT04gPCA0MTtcbn0pO1xuIiwgIi8qIGVzbGludC1kaXNhYmxlIGVzL25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9TWU1CT0xcbiAgJiYgIVN5bWJvbC5zaGFtXG4gICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCc7XG4iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhcyhXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpIHx8ICEoTkFUSVZFX1NZTUJPTCB8fCB0eXBlb2YgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID09ICdzdHJpbmcnKSkge1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhcyhTeW1ib2wsIG5hbWUpKSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IGNyZWF0ZVdlbGxLbm93blN5bWJvbCgnU3ltYm9sLicgKyBuYW1lKTtcbiAgICB9XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCAidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5c3BlY2llc2NyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWxBcnJheSwgbGVuZ3RoKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbEFycmF5KSkge1xuICAgIEMgPSBvcmlnaW5hbEFycmF5LmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBlbHNlIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIG5ldyAoQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDKShsZW5ndGggPT09IDAgPyAwIDogbGVuZ3RoKTtcbn07XG4iLCAidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcblxudmFyIElTX0NPTkNBVF9TUFJFQURBQkxFID0gd2VsbEtub3duU3ltYm9sKCdpc0NvbmNhdFNwcmVhZGFibGUnKTtcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gMHgxRkZGRkZGRkZGRkZGRjtcbnZhciBNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQgPSAnTWF4aW11bSBhbGxvd2VkIGluZGV4IGV4Y2VlZGVkJztcblxuLy8gV2UgY2FuJ3QgdXNlIHRoaXMgZmVhdHVyZSBkZXRlY3Rpb24gaW4gVjggc2luY2UgaXQgY2F1c2VzXG4vLyBkZW9wdGltaXphdGlvbiBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3OVxudmFyIElTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgPSBWOF9WRVJTSU9OID49IDUxIHx8ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBhcnJheSA9IFtdO1xuICBhcnJheVtJU19DT05DQVRfU1BSRUFEQUJMRV0gPSBmYWxzZTtcbiAgcmV0dXJuIGFycmF5LmNvbmNhdCgpWzBdICE9PSBhcnJheTtcbn0pO1xuXG52YXIgU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnY29uY2F0Jyk7XG5cbnZhciBpc0NvbmNhdFNwcmVhZGFibGUgPSBmdW5jdGlvbiAoTykge1xuICBpZiAoIWlzT2JqZWN0KE8pKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzcHJlYWRhYmxlID0gT1tJU19DT05DQVRfU1BSRUFEQUJMRV07XG4gIHJldHVybiBzcHJlYWRhYmxlICE9PSB1bmRlZmluZWQgPyAhIXNwcmVhZGFibGUgOiBpc0FycmF5KE8pO1xufTtcblxudmFyIEZPUkNFRCA9ICFJU19DT05DQVRfU1BSRUFEQUJMRV9TVVBQT1JUIHx8ICFTUEVDSUVTX1NVUFBPUlQ7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuY29uY2F0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmNvbmNhdFxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQGlzQ29uY2F0U3ByZWFkYWJsZSBhbmQgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQgfSwge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnMgLS0gcmVxdWlyZWQgZm9yIGAubGVuZ3RoYFxuICBjb25jYXQ6IGZ1bmN0aW9uIGNvbmNhdChhcmcpIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBBID0gYXJyYXlTcGVjaWVzQ3JlYXRlKE8sIDApO1xuICAgIHZhciBuID0gMDtcbiAgICB2YXIgaSwgaywgbGVuZ3RoLCBsZW4sIEU7XG4gICAgZm9yIChpID0gLTEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgRSA9IGkgPT09IC0xID8gTyA6IGFyZ3VtZW50c1tpXTtcbiAgICAgIGlmIChpc0NvbmNhdFNwcmVhZGFibGUoRSkpIHtcbiAgICAgICAgbGVuID0gdG9MZW5ndGgoRS5sZW5ndGgpO1xuICAgICAgICBpZiAobiArIGxlbiA+IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgbGVuOyBrKyssIG4rKykgaWYgKGsgaW4gRSkgY3JlYXRlUHJvcGVydHkoQSwgbiwgRVtrXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobiA+PSBNQVhfU0FGRV9JTlRFR0VSKSB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEKTtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkoQSwgbisrLCBFKTtcbiAgICAgIH1cbiAgICB9XG4gICAgQS5sZW5ndGggPSBuO1xuICAgIHJldHVybiBBO1xuICB9XG59KTtcbiIsICJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIEZ1bmN0aW9uUHJvdG90eXBlVG9TdHJpbmcgPSBGdW5jdGlvblByb3RvdHlwZS50b1N0cmluZztcbnZhciBuYW1lUkUgPSAvXlxccypmdW5jdGlvbiAoW14gKF0qKS87XG52YXIgTkFNRSA9ICduYW1lJztcblxuLy8gRnVuY3Rpb24gaW5zdGFuY2VzIGAubmFtZWAgcHJvcGVydHlcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZnVuY3Rpb24taW5zdGFuY2VzLW5hbWVcbmlmIChERVNDUklQVE9SUyAmJiAhKE5BTUUgaW4gRnVuY3Rpb25Qcm90b3R5cGUpKSB7XG4gIGRlZmluZVByb3BlcnR5KEZ1bmN0aW9uUHJvdG90eXBlLCBOQU1FLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uUHJvdG90eXBlVG9TdHJpbmcuY2FsbCh0aGlzKS5tYXRjaChuYW1lUkUpWzFdO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iLCAidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCk7XG4gICAgfTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCAidmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xuXG52YXIgcHVzaCA9IFtdLnB1c2g7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBmb3JFYWNoLCBtYXAsIGZpbHRlciwgc29tZSwgZXZlcnksIGZpbmQsIGZpbmRJbmRleCwgZmlsdGVyT3V0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICB2YXIgSVNfTUFQID0gVFlQRSA9PSAxO1xuICB2YXIgSVNfRklMVEVSID0gVFlQRSA9PSAyO1xuICB2YXIgSVNfU09NRSA9IFRZUEUgPT0gMztcbiAgdmFyIElTX0VWRVJZID0gVFlQRSA9PSA0O1xuICB2YXIgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNjtcbiAgdmFyIElTX0ZJTFRFUl9PVVQgPSBUWVBFID09IDc7XG4gIHZhciBOT19IT0xFUyA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYO1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0LCBzcGVjaWZpY0NyZWF0ZSkge1xuICAgIHZhciBPID0gdG9PYmplY3QoJHRoaXMpO1xuICAgIHZhciBzZWxmID0gSW5kZXhlZE9iamVjdChPKTtcbiAgICB2YXIgYm91bmRGdW5jdGlvbiA9IGJpbmQoY2FsbGJhY2tmbiwgdGhhdCwgMyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBjcmVhdGUgPSBzcGVjaWZpY0NyZWF0ZSB8fCBhcnJheVNwZWNpZXNDcmVhdGU7XG4gICAgdmFyIHRhcmdldCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiB8fCBJU19GSUxURVJfT1VUID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgdmFsdWUsIHJlc3VsdDtcbiAgICBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpIHtcbiAgICAgIHZhbHVlID0gc2VsZltpbmRleF07XG4gICAgICByZXN1bHQgPSBib3VuZEZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgTyk7XG4gICAgICBpZiAoVFlQRSkge1xuICAgICAgICBpZiAoSVNfTUFQKSB0YXJnZXRbaW5kZXhdID0gcmVzdWx0OyAvLyBtYXBcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0KSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbHVlOyAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcHVzaC5jYWxsKHRhcmdldCwgdmFsdWUpOyAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgNDogcmV0dXJuIGZhbHNlOyAgICAgICAgICAgICAvLyBldmVyeVxuICAgICAgICAgIGNhc2UgNzogcHVzaC5jYWxsKHRhcmdldCwgdmFsdWUpOyAvLyBmaWx0ZXJPdXRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogdGFyZ2V0O1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbiAgZm9yRWFjaDogY3JlYXRlTWV0aG9kKDApLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLm1hcFxuICBtYXA6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maWx0ZXJcbiAgZmlsdGVyOiBjcmVhdGVNZXRob2QoMiksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuc29tZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNvbWVcbiAgc29tZTogY3JlYXRlTWV0aG9kKDMpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmV2ZXJ5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZXZlcnlcbiAgZXZlcnk6IGNyZWF0ZU1ldGhvZCg0KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZFxuICBmaW5kOiBjcmVhdGVNZXRob2QoNSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZEluZGV4XG4gIGZpbmRJbmRleDogY3JlYXRlTWV0aG9kKDYpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlck91dGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWFycmF5LWZpbHRlcmluZ1xuICBmaWx0ZXJPdXQ6IGNyZWF0ZU1ldGhvZCg3KVxufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCxuby10aHJvdy1saXRlcmFsIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5mb3JFYWNoO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2ZvckVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbm1vZHVsZS5leHBvcnRzID0gIVNUUklDVF9NRVRIT0QgPyBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gIHJldHVybiAkZm9yRWFjaCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWZvcmVhY2ggLS0gc2FmZVxufSA6IFtdLmZvckVhY2g7XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWFycmF5LXByb3RvdHlwZS1mb3JlYWNoIC0tIHNhZmVcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFtdLmZvckVhY2ggIT0gZm9yRWFjaCB9LCB7XG4gIGZvckVhY2g6IGZvckVhY2hcbn0pO1xuIiwgIi8vIGl0ZXJhYmxlIERPTSBjb2xsZWN0aW9uc1xuLy8gZmxhZyAtIGBpdGVyYWJsZWAgaW50ZXJmYWNlIC0gJ2VudHJpZXMnLCAna2V5cycsICd2YWx1ZXMnLCAnZm9yRWFjaCcgbWV0aG9kc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIENTU1J1bGVMaXN0OiAwLFxuICBDU1NTdHlsZURlY2xhcmF0aW9uOiAwLFxuICBDU1NWYWx1ZUxpc3Q6IDAsXG4gIENsaWVudFJlY3RMaXN0OiAwLFxuICBET01SZWN0TGlzdDogMCxcbiAgRE9NU3RyaW5nTGlzdDogMCxcbiAgRE9NVG9rZW5MaXN0OiAxLFxuICBEYXRhVHJhbnNmZXJJdGVtTGlzdDogMCxcbiAgRmlsZUxpc3Q6IDAsXG4gIEhUTUxBbGxDb2xsZWN0aW9uOiAwLFxuICBIVE1MQ29sbGVjdGlvbjogMCxcbiAgSFRNTEZvcm1FbGVtZW50OiAwLFxuICBIVE1MU2VsZWN0RWxlbWVudDogMCxcbiAgTWVkaWFMaXN0OiAwLFxuICBNaW1lVHlwZUFycmF5OiAwLFxuICBOYW1lZE5vZGVNYXA6IDAsXG4gIE5vZGVMaXN0OiAxLFxuICBQYWludFJlcXVlc3RMaXN0OiAwLFxuICBQbHVnaW46IDAsXG4gIFBsdWdpbkFycmF5OiAwLFxuICBTVkdMZW5ndGhMaXN0OiAwLFxuICBTVkdOdW1iZXJMaXN0OiAwLFxuICBTVkdQYXRoU2VnTGlzdDogMCxcbiAgU1ZHUG9pbnRMaXN0OiAwLFxuICBTVkdTdHJpbmdMaXN0OiAwLFxuICBTVkdUcmFuc2Zvcm1MaXN0OiAwLFxuICBTb3VyY2VCdWZmZXJMaXN0OiAwLFxuICBTdHlsZVNoZWV0TGlzdDogMCxcbiAgVGV4dFRyYWNrQ3VlTGlzdDogMCxcbiAgVGV4dFRyYWNrTGlzdDogMCxcbiAgVG91Y2hMaXN0OiAwXG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRtYXAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykubWFwO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdtYXAnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5tYXBgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfSwge1xuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkbWFwKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCAidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSAmJiBpdCAhPT0gbnVsbCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcIkNhbid0IHNldCBcIiArIFN0cmluZyhpdCkgKyAnIGFzIGEgcHJvdG90eXBlJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAtLSBzYWZlICovXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYVBvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Quc2V0cHJvdG90eXBlb2Zcbi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1zZXRwcm90b3R5cGVvZiAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbiAgICBzZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQ7XG4gICAgc2V0dGVyLmNhbGwodGVzdCwgW10pO1xuICAgIENPUlJFQ1RfU0VUVEVSID0gdGVzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgIGFuT2JqZWN0KE8pO1xuICAgIGFQb3NzaWJsZVByb3RvdHlwZShwcm90byk7XG4gICAgaWYgKENPUlJFQ1RfU0VUVEVSKSBzZXR0ZXIuY2FsbChPLCBwcm90byk7XG4gICAgZWxzZSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgIHJldHVybiBPO1xuICB9O1xufSgpIDogdW5kZWZpbmVkKTtcbiIsICJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGKCkgeyAvKiBlbXB0eSAqLyB9XG4gIEYucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRwcm90b3R5cGVvZiAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBGKCkpICE9PSBGLnByb3RvdHlwZTtcbn0pO1xuIiwgInZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyJyk7XG5cbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vLyBgT2JqZWN0LmdldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldHByb3RvdHlwZW9mXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldHByb3RvdHlwZW9mIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvdHlwZSA6IG51bGw7XG59O1xuIiwgInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWtleXMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwgInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnRpZXMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSA9IGtleXNbaW5kZXgrK10sIFByb3BlcnRpZXNba2V5XSk7XG4gIHJldHVybiBPO1xufTtcbiIsICJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsICJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGRvY3VtZW50Q3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG5cbnZhciBHVCA9ICc+JztcbnZhciBMVCA9ICc8JztcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBTQ1JJUFQgPSAnc2NyaXB0JztcbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcblxudmFyIEVtcHR5Q29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cbnZhciBzY3JpcHRUYWcgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICByZXR1cm4gTFQgKyBTQ1JJUFQgKyBHVCArIGNvbnRlbnQgKyBMVCArICcvJyArIFNDUklQVCArIEdUO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIEFjdGl2ZVggT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYID0gZnVuY3Rpb24gKGFjdGl2ZVhEb2N1bWVudCkge1xuICBhY3RpdmVYRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCcnKSk7XG4gIGFjdGl2ZVhEb2N1bWVudC5jbG9zZSgpO1xuICB2YXIgdGVtcCA9IGFjdGl2ZVhEb2N1bWVudC5wYXJlbnRXaW5kb3cuT2JqZWN0O1xuICBhY3RpdmVYRG9jdW1lbnQgPSBudWxsOyAvLyBhdm9pZCBtZW1vcnkgbGVha1xuICByZXR1cm4gdGVtcDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudENyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICB2YXIgSlMgPSAnamF2YScgKyBTQ1JJUFQgKyAnOic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzQ3NVxuICBpZnJhbWUuc3JjID0gU3RyaW5nKEpTKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJ2RvY3VtZW50LkY9T2JqZWN0JykpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICByZXR1cm4gaWZyYW1lRG9jdW1lbnQuRjtcbn07XG5cbi8vIENoZWNrIGZvciBkb2N1bWVudC5kb21haW4gYW5kIGFjdGl2ZSB4IHN1cHBvcnRcbi8vIE5vIG5lZWQgdG8gdXNlIGFjdGl2ZSB4IGFwcHJvYWNoIHdoZW4gZG9jdW1lbnQuZG9tYWluIGlzIG5vdCBzZXRcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW0vaXNzdWVzLzE1MFxuLy8gdmFyaWF0aW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9raXRjYW1icmlkZ2UvZXM1LXNoaW0vY29tbWl0LzRmNzM4YWMwNjYzNDZcbi8vIGF2b2lkIElFIEdDIGJ1Z1xudmFyIGFjdGl2ZVhEb2N1bWVudDtcbnZhciBOdWxsUHJvdG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLyogZ2xvYmFsIEFjdGl2ZVhPYmplY3QgLS0gb2xkIElFICovXG4gICAgYWN0aXZlWERvY3VtZW50ID0gZG9jdW1lbnQuZG9tYWluICYmIG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBpZ25vcmUgKi8gfVxuICBOdWxsUHJvdG9PYmplY3QgPSBhY3RpdmVYRG9jdW1lbnQgPyBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYKGFjdGl2ZVhEb2N1bWVudCkgOiBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUoKTtcbiAgdmFyIGxlbmd0aCA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSBkZWxldGUgTnVsbFByb3RvT2JqZWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbbGVuZ3RoXV07XG4gIHJldHVybiBOdWxsUHJvdG9PYmplY3QoKTtcbn07XG5cbmhpZGRlbktleXNbSUVfUFJPVE9dID0gdHJ1ZTtcblxuLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHlDb25zdHJ1Y3RvcigpO1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gTnVsbFByb3RvT2JqZWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciBuYXRpdmVDb25zdHJ1Y3QgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ2NvbnN0cnVjdCcpO1xuXG4vLyBgUmVmbGVjdC5jb25zdHJ1Y3RgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWZsZWN0LmNvbnN0cnVjdFxuLy8gTVMgRWRnZSBzdXBwb3J0cyBvbmx5IDIgYXJndW1lbnRzIGFuZCBhcmd1bWVudHNMaXN0IGFyZ3VtZW50IGlzIG9wdGlvbmFsXG4vLyBGRiBOaWdodGx5IHNldHMgdGhpcmQgYXJndW1lbnQgYXMgYG5ldy50YXJnZXRgLCBidXQgZG9lcyBub3QgY3JlYXRlIGB0aGlzYCBmcm9tIGl0XG52YXIgTkVXX1RBUkdFVF9CVUcgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuICEobmF0aXZlQ29uc3RydWN0KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgW10sIEYpIGluc3RhbmNlb2YgRik7XG59KTtcbnZhciBBUkdTX0JVRyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIG5hdGl2ZUNvbnN0cnVjdChmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pO1xufSk7XG52YXIgRk9SQ0VEID0gTkVXX1RBUkdFVF9CVUcgfHwgQVJHU19CVUc7XG5cbiQoeyB0YXJnZXQ6ICdSZWZsZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQsIHNoYW06IEZPUkNFRCB9LCB7XG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gY29uc3RydWN0KFRhcmdldCwgYXJncyAvKiAsIG5ld1RhcmdldCAqLykge1xuICAgIGFGdW5jdGlvbihUYXJnZXQpO1xuICAgIGFuT2JqZWN0KGFyZ3MpO1xuICAgIHZhciBuZXdUYXJnZXQgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IFRhcmdldCA6IGFGdW5jdGlvbihhcmd1bWVudHNbMl0pO1xuICAgIGlmIChBUkdTX0JVRyAmJiAhTkVXX1RBUkdFVF9CVUcpIHJldHVybiBuYXRpdmVDb25zdHJ1Y3QoVGFyZ2V0LCBhcmdzLCBuZXdUYXJnZXQpO1xuICAgIGlmIChUYXJnZXQgPT0gbmV3VGFyZ2V0KSB7XG4gICAgICAvLyB3L28gYWx0ZXJlZCBuZXdUYXJnZXQsIG9wdGltaXphdGlvbiBmb3IgMC00IGFyZ3VtZW50c1xuICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgVGFyZ2V0KCk7XG4gICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSk7XG4gICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgIGNhc2UgMzogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgIGNhc2UgNDogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gICAgICB9XG4gICAgICAvLyB3L28gYWx0ZXJlZCBuZXdUYXJnZXQsIGxvdCBvZiBhcmd1bWVudHMgY2FzZVxuICAgICAgdmFyICRhcmdzID0gW251bGxdO1xuICAgICAgJGFyZ3MucHVzaC5hcHBseSgkYXJncywgYXJncyk7XG4gICAgICByZXR1cm4gbmV3IChiaW5kLmFwcGx5KFRhcmdldCwgJGFyZ3MpKSgpO1xuICAgIH1cbiAgICAvLyB3aXRoIGFsdGVyZWQgbmV3VGFyZ2V0LCBub3Qgc3VwcG9ydCBidWlsdC1pbiBjb25zdHJ1Y3RvcnNcbiAgICB2YXIgcHJvdG8gPSBuZXdUYXJnZXQucHJvdG90eXBlO1xuICAgIHZhciBpbnN0YW5jZSA9IGNyZWF0ZShpc09iamVjdChwcm90bykgPyBwcm90byA6IE9iamVjdC5wcm90b3R5cGUpO1xuICAgIHZhciByZXN1bHQgPSBGdW5jdGlvbi5hcHBseS5jYWxsKFRhcmdldCwgaW5zdGFuY2UsIGFyZ3MpO1xuICAgIHJldHVybiBpc09iamVjdChyZXN1bHQpID8gcmVzdWx0IDogaW5zdGFuY2U7XG4gIH1cbn0pO1xuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgb2JqZWN0RGVmaW5lUHJvcGVydHlNb2RpbGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhREVTQ1JJUFRPUlMsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIGRlZmluZVByb3BlcnR5OiBvYmplY3REZWZpbmVQcm9wZXJ0eU1vZGlsZS5mXG59KTtcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHluYW1lcyAtLSBzYWZlICovXG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKS5mO1xuXG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uIChpdCkge1xuICB0cnkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlOYW1lcyhpdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJ1xuICAgID8gZ2V0V2luZG93TmFtZXMoaXQpXG4gICAgOiAkZ2V0T3duUHJvcGVydHlOYW1lcyh0b0luZGV4ZWRPYmplY3QoaXQpKTtcbn07XG4iLCAidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG5leHBvcnRzLmYgPSB3ZWxsS25vd25TeW1ib2w7XG4iLCAidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTkFNRSkge1xuICB2YXIgU3ltYm9sID0gcGF0aC5TeW1ib2wgfHwgKHBhdGguU3ltYm9sID0ge30pO1xuICBpZiAoIWhhcyhTeW1ib2wsIE5BTUUpKSBkZWZpbmVQcm9wZXJ0eShTeW1ib2wsIE5BTUUsIHtcbiAgICB2YWx1ZTogd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZS5mKE5BTUUpXG4gIH0pO1xufTtcbiIsICJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFRBRywgU1RBVElDKSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gU1RBVElDID8gaXQgOiBpdC5wcm90b3R5cGUsIFRPX1NUUklOR19UQUcpKSB7XG4gICAgZGVmaW5lUHJvcGVydHkoaXQsIFRPX1NUUklOR19UQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogVEFHIH0pO1xuICB9XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgbmF0aXZlT2JqZWN0Q3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy1leHRlcm5hbCcpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtd3JhcHBlZCcpO1xudmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciAkZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5mb3JFYWNoO1xuXG52YXIgSElEREVOID0gc2hhcmVkS2V5KCdoaWRkZW4nKTtcbnZhciBTWU1CT0wgPSAnU3ltYm9sJztcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBUT19QUklNSVRJVkUgPSB3ZWxsS25vd25TeW1ib2woJ3RvUHJpbWl0aXZlJyk7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihTWU1CT0wpO1xudmFyIE9iamVjdFByb3RvdHlwZSA9IE9iamVjdFtQUk9UT1RZUEVdO1xudmFyICRTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyICRzdHJpbmdpZnkgPSBnZXRCdWlsdEluKCdKU09OJywgJ3N0cmluZ2lmeScpO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mO1xudmFyIG5hdGl2ZURlZmluZVByb3BlcnR5ID0gZGVmaW5lUHJvcGVydHlNb2R1bGUuZjtcbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsLmY7XG52YXIgbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUgPSBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mO1xudmFyIEFsbFN5bWJvbHMgPSBzaGFyZWQoJ3N5bWJvbHMnKTtcbnZhciBPYmplY3RQcm90b3R5cGVTeW1ib2xzID0gc2hhcmVkKCdvcC1zeW1ib2xzJyk7XG52YXIgU3RyaW5nVG9TeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3RyaW5nLXRvLXN5bWJvbC1yZWdpc3RyeScpO1xudmFyIFN5bWJvbFRvU3RyaW5nUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC10by1zdHJpbmctcmVnaXN0cnknKTtcbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIFFPYmplY3QgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIFVTRV9TRVRURVIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjcmlwdG9yID0gREVTQ1JJUFRPUlMgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0Q3JlYXRlKG5hdGl2ZURlZmluZVByb3BlcnR5KHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5hdGl2ZURlZmluZVByb3BlcnR5KHRoaXMsICdhJywgeyB2YWx1ZTogNyB9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uIChPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIHZhciBPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yID0gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdFByb3RvdHlwZSwgUCk7XG4gIGlmIChPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yKSBkZWxldGUgT2JqZWN0UHJvdG90eXBlW1BdO1xuICBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgaWYgKE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IgJiYgTyAhPT0gT2JqZWN0UHJvdG90eXBlKSB7XG4gICAgbmF0aXZlRGVmaW5lUHJvcGVydHkoT2JqZWN0UHJvdG90eXBlLCBQLCBPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yKTtcbiAgfVxufSA6IG5hdGl2ZURlZmluZVByb3BlcnR5O1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uICh0YWcsIGRlc2NyaXB0aW9uKSB7XG4gIHZhciBzeW1ib2wgPSBBbGxTeW1ib2xzW3RhZ10gPSBuYXRpdmVPYmplY3RDcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc2V0SW50ZXJuYWxTdGF0ZShzeW1ib2wsIHtcbiAgICB0eXBlOiBTWU1CT0wsXG4gICAgdGFnOiB0YWcsXG4gICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uXG4gIH0pO1xuICBpZiAoIURFU0NSSVBUT1JTKSBzeW1ib2wuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgcmV0dXJuIHN5bWJvbDtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoaXQpIGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGlmIChPID09PSBPYmplY3RQcm90b3R5cGUpICRkZWZpbmVQcm9wZXJ0eShPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBQLCBBdHRyaWJ1dGVzKTtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSkge1xuICAgIGlmICghQXR0cmlidXRlcy5lbnVtZXJhYmxlKSB7XG4gICAgICBpZiAoIWhhcyhPLCBISURERU4pKSBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBISURERU4sIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB7fSkpO1xuICAgICAgT1tISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaGFzKE8sIEhJRERFTikgJiYgT1tISURERU5dW2tleV0pIE9bSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBBdHRyaWJ1dGVzID0gbmF0aXZlT2JqZWN0Q3JlYXRlKEF0dHJpYnV0ZXMsIHsgZW51bWVyYWJsZTogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIGZhbHNlKSB9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjcmlwdG9yKE8sIGtleSwgQXR0cmlidXRlcyk7XG4gIH0gcmV0dXJuIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIGtleSwgQXR0cmlidXRlcyk7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBwcm9wZXJ0aWVzID0gdG9JbmRleGVkT2JqZWN0KFByb3BlcnRpZXMpO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMocHJvcGVydGllcykuY29uY2F0KCRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMocHJvcGVydGllcykpO1xuICAkZm9yRWFjaChrZXlzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKCFERVNDUklQVE9SUyB8fCAkcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChwcm9wZXJ0aWVzLCBrZXkpKSAkZGVmaW5lUHJvcGVydHkoTywga2V5LCBwcm9wZXJ0aWVzW2tleV0pO1xuICB9KTtcbiAgcmV0dXJuIE87XG59O1xuXG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyBuYXRpdmVPYmplY3RDcmVhdGUoTykgOiAkZGVmaW5lUHJvcGVydGllcyhuYXRpdmVPYmplY3RDcmVhdGUoTyksIFByb3BlcnRpZXMpO1xufTtcblxudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIFAgPSB0b1ByaW1pdGl2ZShWLCB0cnVlKTtcbiAgdmFyIGVudW1lcmFibGUgPSBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHRoaXMsIFApO1xuICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG90eXBlICYmIGhhcyhBbGxTeW1ib2xzLCBQKSAmJiAhaGFzKE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIFApKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBlbnVtZXJhYmxlIHx8ICFoYXModGhpcywgUCkgfHwgIWhhcyhBbGxTeW1ib2xzLCBQKSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1bUF0gPyBlbnVtZXJhYmxlIDogdHJ1ZTtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgdmFyIGl0ID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG90eXBlICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT2JqZWN0UHJvdG90eXBlU3ltYm9scywga2V5KSkgcmV0dXJuO1xuICB2YXIgZGVzY3JpcHRvciA9IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KTtcbiAgaWYgKGRlc2NyaXB0b3IgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSkge1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIGRlc2NyaXB0b3I7XG59O1xuXG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgdmFyIG5hbWVzID0gbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyh0b0luZGV4ZWRPYmplY3QoTykpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gICRmb3JFYWNoKG5hbWVzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKCFoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKGhpZGRlbktleXMsIGtleSkpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTykge1xuICB2YXIgSVNfT0JKRUNUX1BST1RPVFlQRSA9IE8gPT09IE9iamVjdFByb3RvdHlwZTtcbiAgdmFyIG5hbWVzID0gbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyhJU19PQkpFQ1RfUFJPVE9UWVBFID8gT2JqZWN0UHJvdG90eXBlU3ltYm9scyA6IHRvSW5kZXhlZE9iamVjdChPKSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgJGZvckVhY2gobmFtZXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgKCFJU19PQkpFQ1RfUFJPVE9UWVBFIHx8IGhhcyhPYmplY3RQcm90b3R5cGUsIGtleSkpKSB7XG4gICAgICByZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyBgU3ltYm9sYCBjb25zdHJ1Y3RvclxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wtY29uc3RydWN0b3JcbmlmICghTkFUSVZFX1NZTUJPTCkge1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCkgdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbiAgICB2YXIgZGVzY3JpcHRpb24gPSAhYXJndW1lbnRzLmxlbmd0aCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IFN0cmluZyhhcmd1bWVudHNbMF0pO1xuICAgIHZhciB0YWcgPSB1aWQoZGVzY3JpcHRpb24pO1xuICAgIHZhciBzZXR0ZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzID09PSBPYmplY3RQcm90b3R5cGUpIHNldHRlci5jYWxsKE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmIChoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKSB0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzY3JpcHRvcih0aGlzLCB0YWcsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYgKERFU0NSSVBUT1JTICYmIFVTRV9TRVRURVIpIHNldFN5bWJvbERlc2NyaXB0b3IoT2JqZWN0UHJvdG90eXBlLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6IHNldHRlciB9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcsIGRlc2NyaXB0aW9uKTtcbiAgfTtcblxuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnRhZztcbiAgfSk7XG5cbiAgcmVkZWZpbmUoJFN5bWJvbCwgJ3dpdGhvdXRTZXR0ZXInLCBmdW5jdGlvbiAoZGVzY3JpcHRpb24pIHtcbiAgICByZXR1cm4gd3JhcCh1aWQoZGVzY3JpcHRpb24pLCBkZXNjcmlwdGlvbik7XG4gIH0pO1xuXG4gIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIGRlZmluZVByb3BlcnR5TW9kdWxlLmYgPSAkZGVmaW5lUHJvcGVydHk7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mID0gZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsLmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUuZiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHdyYXAod2VsbEtub3duU3ltYm9sKG5hbWUpLCBuYW1lKTtcbiAgfTtcblxuICBpZiAoREVTQ1JJUFRPUlMpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1TeW1ib2wtZGVzY3JpcHRpb25cbiAgICBuYXRpdmVEZWZpbmVQcm9wZXJ0eSgkU3ltYm9sW1BST1RPVFlQRV0sICdkZXNjcmlwdGlvbicsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gZGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLmRlc2NyaXB0aW9uO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghSVNfUFVSRSkge1xuICAgICAgcmVkZWZpbmUoT2JqZWN0UHJvdG90eXBlLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHsgdW5zYWZlOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxufVxuXG4kKHsgZ2xvYmFsOiB0cnVlLCB3cmFwOiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MLCBzaGFtOiAhTkFUSVZFX1NZTUJPTCB9LCB7XG4gIFN5bWJvbDogJFN5bWJvbFxufSk7XG5cbiRmb3JFYWNoKG9iamVjdEtleXMoV2VsbEtub3duU3ltYm9sc1N0b3JlKSwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgZGVmaW5lV2VsbEtub3duU3ltYm9sKG5hbWUpO1xufSk7XG5cbiQoeyB0YXJnZXQ6IFNZTUJPTCwgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCB9LCB7XG4gIC8vIGBTeW1ib2wuZm9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuZm9yXG4gICdmb3InOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyhrZXkpO1xuICAgIGlmIChoYXMoU3RyaW5nVG9TeW1ib2xSZWdpc3RyeSwgc3RyaW5nKSkgcmV0dXJuIFN0cmluZ1RvU3ltYm9sUmVnaXN0cnlbc3RyaW5nXTtcbiAgICB2YXIgc3ltYm9sID0gJFN5bWJvbChzdHJpbmcpO1xuICAgIFN0cmluZ1RvU3ltYm9sUmVnaXN0cnlbc3RyaW5nXSA9IHN5bWJvbDtcbiAgICBTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5W3N5bWJvbF0gPSBzdHJpbmc7XG4gICAgcmV0dXJuIHN5bWJvbDtcbiAgfSxcbiAgLy8gYFN5bWJvbC5rZXlGb3JgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5rZXlmb3JcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioc3ltKSB7XG4gICAgaWYgKCFpc1N5bWJvbChzeW0pKSB0aHJvdyBUeXBlRXJyb3Ioc3ltICsgJyBpcyBub3QgYSBzeW1ib2wnKTtcbiAgICBpZiAoaGFzKFN5bWJvbFRvU3RyaW5nUmVnaXN0cnksIHN5bSkpIHJldHVybiBTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5W3N5bV07XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24gKCkgeyBVU0VfU0VUVEVSID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbiAoKSB7IFVTRV9TRVRURVIgPSBmYWxzZTsgfVxufSk7XG5cbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MLCBzaGFtOiAhREVTQ1JJUFRPUlMgfSwge1xuICAvLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmNyZWF0ZVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyBgT2JqZWN0LmRlZmluZVByb3BlcnRpZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvcnNcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yXG59KTtcblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wgfSwge1xuICAvLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyBgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5c3ltYm9sc1xuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyBDaHJvbWUgMzggYW5kIDM5IGBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzYCBmYWlscyBvbiBwcmltaXRpdmVzXG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zNDQzXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBmYWlscyhmdW5jdGlvbiAoKSB7IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mKDEpOyB9KSB9LCB7XG4gIGdldE93blByb3BlcnR5U3ltYm9sczogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSB7XG4gICAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mKHRvT2JqZWN0KGl0KSk7XG4gIH1cbn0pO1xuXG4vLyBgSlNPTi5zdHJpbmdpZnlgIG1ldGhvZCBiZWhhdmlvciB3aXRoIHN5bWJvbHNcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtanNvbi5zdHJpbmdpZnlcbmlmICgkc3RyaW5naWZ5KSB7XG4gIHZhciBGT1JDRURfSlNPTl9TVFJJTkdJRlkgPSAhTkFUSVZFX1NZTUJPTCB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN5bWJvbCA9ICRTeW1ib2woKTtcbiAgICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAgIHJldHVybiAkc3RyaW5naWZ5KFtzeW1ib2xdKSAhPSAnW251bGxdJ1xuICAgICAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gICAgICB8fCAkc3RyaW5naWZ5KHsgYTogc3ltYm9sIH0pICE9ICd7fSdcbiAgICAgIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gICAgICB8fCAkc3RyaW5naWZ5KE9iamVjdChzeW1ib2wpKSAhPSAne30nO1xuICB9KTtcblxuICAkKHsgdGFyZ2V0OiAnSlNPTicsIHN0YXQ6IHRydWUsIGZvcmNlZDogRk9SQ0VEX0pTT05fU1RSSU5HSUZZIH0sIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnMgLS0gcmVxdWlyZWQgZm9yIGAubGVuZ3RoYFxuICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0LCByZXBsYWNlciwgc3BhY2UpIHtcbiAgICAgIHZhciBhcmdzID0gW2l0XTtcbiAgICAgIHZhciBpbmRleCA9IDE7XG4gICAgICB2YXIgJHJlcGxhY2VyO1xuICAgICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpbmRleCkgYXJncy5wdXNoKGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgICAkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICAgIGlmICghaXNPYmplY3QocmVwbGFjZXIpICYmIGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKSByZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICAgIGlmICghaXNBcnJheShyZXBsYWNlcikpIHJlcGxhY2VyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAkcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykgdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgICAgaWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgICByZXR1cm4gJHN0cmluZ2lmeS5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5wcm90b3R5cGUtQEB0b3ByaW1pdGl2ZVxuaWYgKCEkU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSkge1xuICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbn1cbi8vIGBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddYCBwcm9wZXJ0eVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLUBAdG9zdHJpbmd0YWdcbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsIFNZTUJPTCk7XG5cbmhpZGRlbktleXNbSElEREVOXSA9IHRydWU7XG4iLCAiLy8gYFN5bWJvbC5wcm90b3R5cGUuZGVzY3JpcHRpb25gIGdldHRlclxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLmRlc2NyaXB0aW9uXG4ndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcblxudmFyIE5hdGl2ZVN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG5cbmlmIChERVNDUklQVE9SUyAmJiB0eXBlb2YgTmF0aXZlU3ltYm9sID09ICdmdW5jdGlvbicgJiYgKCEoJ2Rlc2NyaXB0aW9uJyBpbiBOYXRpdmVTeW1ib2wucHJvdG90eXBlKSB8fFxuICAvLyBTYWZhcmkgMTIgYnVnXG4gIE5hdGl2ZVN5bWJvbCgpLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWRcbikpIHtcbiAgdmFyIEVtcHR5U3RyaW5nRGVzY3JpcHRpb25TdG9yZSA9IHt9O1xuICAvLyB3cmFwIFN5bWJvbCBjb25zdHJ1Y3RvciBmb3IgY29ycmVjdCB3b3JrIHdpdGggdW5kZWZpbmVkIGRlc2NyaXB0aW9uXG4gIHZhciBTeW1ib2xXcmFwcGVyID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIHZhciBkZXNjcmlwdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPCAxIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogU3RyaW5nKGFyZ3VtZW50c1swXSk7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMgaW5zdGFuY2VvZiBTeW1ib2xXcmFwcGVyXG4gICAgICA/IG5ldyBOYXRpdmVTeW1ib2woZGVzY3JpcHRpb24pXG4gICAgICAvLyBpbiBFZGdlIDEzLCBTdHJpbmcoU3ltYm9sKHVuZGVmaW5lZCkpID09PSAnU3ltYm9sKHVuZGVmaW5lZCknXG4gICAgICA6IGRlc2NyaXB0aW9uID09PSB1bmRlZmluZWQgPyBOYXRpdmVTeW1ib2woKSA6IE5hdGl2ZVN5bWJvbChkZXNjcmlwdGlvbik7XG4gICAgaWYgKGRlc2NyaXB0aW9uID09PSAnJykgRW1wdHlTdHJpbmdEZXNjcmlwdGlvblN0b3JlW3Jlc3VsdF0gPSB0cnVlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoU3ltYm9sV3JhcHBlciwgTmF0aXZlU3ltYm9sKTtcbiAgdmFyIHN5bWJvbFByb3RvdHlwZSA9IFN5bWJvbFdyYXBwZXIucHJvdG90eXBlID0gTmF0aXZlU3ltYm9sLnByb3RvdHlwZTtcbiAgc3ltYm9sUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ltYm9sV3JhcHBlcjtcblxuICB2YXIgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBuYXRpdmUgPSBTdHJpbmcoTmF0aXZlU3ltYm9sKCd0ZXN0JykpID09ICdTeW1ib2wodGVzdCknO1xuICB2YXIgcmVnZXhwID0gL15TeW1ib2xcXCgoLiopXFwpW14pXSskLztcbiAgZGVmaW5lUHJvcGVydHkoc3ltYm9sUHJvdG90eXBlLCAnZGVzY3JpcHRpb24nLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZGVzY3JpcHRpb24oKSB7XG4gICAgICB2YXIgc3ltYm9sID0gaXNPYmplY3QodGhpcykgPyB0aGlzLnZhbHVlT2YoKSA6IHRoaXM7XG4gICAgICB2YXIgc3RyaW5nID0gc3ltYm9sVG9TdHJpbmcuY2FsbChzeW1ib2wpO1xuICAgICAgaWYgKGhhcyhFbXB0eVN0cmluZ0Rlc2NyaXB0aW9uU3RvcmUsIHN5bWJvbCkpIHJldHVybiAnJztcbiAgICAgIHZhciBkZXNjID0gbmF0aXZlID8gc3RyaW5nLnNsaWNlKDcsIC0xKSA6IHN0cmluZy5yZXBsYWNlKHJlZ2V4cCwgJyQxJyk7XG4gICAgICByZXR1cm4gZGVzYyA9PT0gJycgPyB1bmRlZmluZWQgOiBkZXNjO1xuICAgIH1cbiAgfSk7XG5cbiAgJCh7IGdsb2JhbDogdHJ1ZSwgZm9yY2VkOiB0cnVlIH0sIHtcbiAgICBTeW1ib2w6IFN5bWJvbFdyYXBwZXJcbiAgfSk7XG59XG4iLCAidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciB0ZXN0ID0ge307XG5cbnRlc3RbVE9fU1RSSU5HX1RBR10gPSAneic7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nKHRlc3QpID09PSAnW29iamVjdCB6XSc7XG4iLCAidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBDT1JSRUNUX0FSR1VNRU5UUyA9IGNsYXNzb2ZSYXcoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gRVM2KyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2Bcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8gY2xhc3NvZlJhdyA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgdGFnLCByZXN1bHQ7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mICh0YWcgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRPX1NUUklOR19UQUcpKSA9PSAnc3RyaW5nJyA/IHRhZ1xuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQ09SUkVDVF9BUkdVTUVOVFMgPyBjbGFzc29mUmF3KE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKHJlc3VsdCA9IGNsYXNzb2ZSYXcoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiByZXN1bHQ7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyB7fS50b1N0cmluZyA6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG59O1xuIiwgInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKCFUT19TVFJJTkdfVEFHX1NVUFBPUlQpIHtcbiAgcmVkZWZpbmUoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgdG9TdHJpbmcsIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwgInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuaXRlcmF0b3JgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5pdGVyYXRvclxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xuIiwgInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxudmFyIFVOU0NPUEFCTEVTID0gd2VsbEtub3duU3ltYm9sKCd1bnNjb3BhYmxlcycpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmlmIChBcnJheVByb3RvdHlwZVtVTlNDT1BBQkxFU10gPT0gdW5kZWZpbmVkKSB7XG4gIGRlZmluZVByb3BlcnR5TW9kdWxlLmYoQXJyYXlQcm90b3R5cGUsIFVOU0NPUEFCTEVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBjcmVhdGUobnVsbClcbiAgfSk7XG59XG5cbi8vIGFkZCBhIGtleSB0byBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICBBcnJheVByb3RvdHlwZVtVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59O1xuIiwgIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IGZhbHNlO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbi8vIGAlSXRlcmF0b3JQcm90b3R5cGUlYCBvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWl0ZXJhdG9ycHJvdG90eXBlJS1vYmplY3RcbnZhciBJdGVyYXRvclByb3RvdHlwZSwgUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlLCBhcnJheUl0ZXJhdG9yO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1hcnJheS1wcm90b3R5cGUta2V5cyAtLSBzYWZlICovXG5pZiAoW10ua2V5cykge1xuICBhcnJheUl0ZXJhdG9yID0gW10ua2V5cygpO1xuICAvLyBTYWZhcmkgOCBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgaWYgKCEoJ25leHQnIGluIGFycmF5SXRlcmF0b3IpKSBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gdHJ1ZTtcbiAgZWxzZSB7XG4gICAgUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoZ2V0UHJvdG90eXBlT2YoYXJyYXlJdGVyYXRvcikpO1xuICAgIGlmIChQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpIEl0ZXJhdG9yUHJvdG90eXBlID0gUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG59XG5cbnZhciBORVdfSVRFUkFUT1JfUFJPVE9UWVBFID0gSXRlcmF0b3JQcm90b3R5cGUgPT0gdW5kZWZpbmVkIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgLy8gRkY0NC0gbGVnYWN5IGl0ZXJhdG9ycyBjYXNlXG4gIHJldHVybiBJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0uY2FsbCh0ZXN0KSAhPT0gdGVzdDtcbn0pO1xuXG5pZiAoTkVXX0lURVJBVE9SX1BST1RPVFlQRSkgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gYCVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVpdGVyYXRvcnByb3RvdHlwZSUtQEBpdGVyYXRvclxuaWYgKCghSVNfUFVSRSB8fCBORVdfSVRFUkFUT1JfUFJPVE9UWVBFKSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIHtcbiAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBJdGVyYXRvclByb3RvdHlwZTogSXRlcmF0b3JQcm90b3R5cGUsXG4gIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlM6IEJVR0dZX1NBRkFSSV9JVEVSQVRPUlNcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlJykuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIHZhciBUT19TVFJJTkdfVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICBJdGVyYXRvckNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yQ29uc3RydWN0b3IsIFRPX1NUUklOR19UQUcsIGZhbHNlLCB0cnVlKTtcbiAgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgcmV0dXJuIEl0ZXJhdG9yQ29uc3RydWN0b3I7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLWl0ZXJhdG9yLWNvbnN0cnVjdG9yJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIEl0ZXJhdG9yc0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUnKTtcblxudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gSXRlcmF0b3JzQ29yZS5JdGVyYXRvclByb3RvdHlwZTtcbnZhciBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gSXRlcmF0b3JzQ29yZS5CVUdHWV9TQUZBUklfSVRFUkFUT1JTO1xudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG52YXIgRU5UUklFUyA9ICdlbnRyaWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYWJsZSwgTkFNRSwgSXRlcmF0b3JDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvcihJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcblxuICB2YXIgZ2V0SXRlcmF0aW9uTWV0aG9kID0gZnVuY3Rpb24gKEtJTkQpIHtcbiAgICBpZiAoS0lORCA9PT0gREVGQVVMVCAmJiBkZWZhdWx0SXRlcmF0b3IpIHJldHVybiBkZWZhdWx0SXRlcmF0b3I7XG4gICAgaWYgKCFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIEtJTkQgaW4gSXRlcmFibGVQcm90b3R5cGUpIHJldHVybiBJdGVyYWJsZVByb3RvdHlwZVtLSU5EXTtcbiAgICBzd2l0Y2ggKEtJTkQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIEVOVFJJRVM6IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcyk7IH07XG4gIH07XG5cbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSBmYWxzZTtcbiAgdmFyIEl0ZXJhYmxlUHJvdG90eXBlID0gSXRlcmFibGUucHJvdG90eXBlO1xuICB2YXIgbmF0aXZlSXRlcmF0b3IgPSBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl1cbiAgICB8fCBJdGVyYWJsZVByb3RvdHlwZVsnQEBpdGVyYXRvciddXG4gICAgfHwgREVGQVVMVCAmJiBJdGVyYWJsZVByb3RvdHlwZVtERUZBVUxUXTtcbiAgdmFyIGRlZmF1bHRJdGVyYXRvciA9ICFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIG5hdGl2ZUl0ZXJhdG9yIHx8IGdldEl0ZXJhdGlvbk1ldGhvZChERUZBVUxUKTtcbiAgdmFyIGFueU5hdGl2ZUl0ZXJhdG9yID0gTkFNRSA9PSAnQXJyYXknID8gSXRlcmFibGVQcm90b3R5cGUuZW50cmllcyB8fCBuYXRpdmVJdGVyYXRvciA6IG5hdGl2ZUl0ZXJhdG9yO1xuICB2YXIgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBtZXRob2RzLCBLRVk7XG5cbiAgLy8gZml4IG5hdGl2ZVxuICBpZiAoYW55TmF0aXZlSXRlcmF0b3IpIHtcbiAgICBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihhbnlOYXRpdmVJdGVyYXRvci5jYWxsKG5ldyBJdGVyYWJsZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICBpZiAoIUlTX1BVUkUgJiYgZ2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlKSAhPT0gSXRlcmF0b3JQcm90b3R5cGUpIHtcbiAgICAgICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAgICAgc2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJdGVyYXRvclByb3RvdHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBUT19TVFJJTkdfVEFHLCB0cnVlLCB0cnVlKTtcbiAgICAgIGlmIChJU19QVVJFKSBJdGVyYXRvcnNbVE9fU1RSSU5HX1RBR10gPSByZXR1cm5UaGlzO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZpeCBBcnJheS5wcm90b3R5cGUueyB2YWx1ZXMsIEBAaXRlcmF0b3IgfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRkFVTFQgPT0gVkFMVUVTICYmIG5hdGl2ZUl0ZXJhdG9yICYmIG5hdGl2ZUl0ZXJhdG9yLm5hbWUgIT09IFZBTFVFUykge1xuICAgIElOQ09SUkVDVF9WQUxVRVNfTkFNRSA9IHRydWU7XG4gICAgZGVmYXVsdEl0ZXJhdG9yID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmF0aXZlSXRlcmF0b3IuY2FsbCh0aGlzKTsgfTtcbiAgfVxuXG4gIC8vIGRlZmluZSBpdGVyYXRvclxuICBpZiAoKCFJU19QVVJFIHx8IEZPUkNFRCkgJiYgSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdICE9PSBkZWZhdWx0SXRlcmF0b3IpIHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoSXRlcmFibGVQcm90b3R5cGUsIElURVJBVE9SLCBkZWZhdWx0SXRlcmF0b3IpO1xuICB9XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IGRlZmF1bHRJdGVyYXRvcjtcblxuICAvLyBleHBvcnQgYWRkaXRpb25hbCBtZXRob2RzXG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogZ2V0SXRlcmF0aW9uTWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyBkZWZhdWx0SXRlcmF0b3IgOiBnZXRJdGVyYXRpb25NZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiBnZXRJdGVyYXRpb25NZXRob2QoRU5UUklFUylcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoS0VZIGluIG1ldGhvZHMpIHtcbiAgICAgIGlmIChCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB8fCAhKEtFWSBpbiBJdGVyYWJsZVByb3RvdHlwZSkpIHtcbiAgICAgICAgcmVkZWZpbmUoSXRlcmFibGVQcm90b3R5cGUsIEtFWSwgbWV0aG9kc1tLRVldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgJCh7IHRhcmdldDogTkFNRSwgcHJvdG86IHRydWUsIGZvcmNlZDogQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfSwgbWV0aG9kcyk7XG4gIH1cblxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBkZWZpbmVJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3InKTtcblxudmFyIEFSUkFZX0lURVJBVE9SID0gJ0FycmF5IEl0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKEFSUkFZX0lURVJBVE9SKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5lbnRyaWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmVudHJpZXNcbi8vIGBBcnJheS5wcm90b3R5cGUua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5rZXlzXG4vLyBgQXJyYXkucHJvdG90eXBlLnZhbHVlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS52YWx1ZXNcbi8vIGBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEBpdGVyYXRvclxuLy8gYENyZWF0ZUFycmF5SXRlcmF0b3JgIGludGVybmFsIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGVhcnJheWl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZUl0ZXJhdG9yKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogQVJSQVlfSVRFUkFUT1IsXG4gICAgdGFyZ2V0OiB0b0luZGV4ZWRPYmplY3QoaXRlcmF0ZWQpLCAvLyB0YXJnZXRcbiAgICBpbmRleDogMCwgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgICBraW5kOiBraW5kICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtpbmRcbiAgfSk7XG4vLyBgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0lYXJyYXlpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICB2YXIgdGFyZ2V0ID0gc3RhdGUudGFyZ2V0O1xuICB2YXIga2luZCA9IHN0YXRlLmtpbmQ7XG4gIHZhciBpbmRleCA9IHN0YXRlLmluZGV4Kys7XG4gIGlmICghdGFyZ2V0IHx8IGluZGV4ID49IHRhcmdldC5sZW5ndGgpIHtcbiAgICBzdGF0ZS50YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHsgdmFsdWU6IGluZGV4LCBkb25lOiBmYWxzZSB9O1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHsgdmFsdWU6IHRhcmdldFtpbmRleF0sIGRvbmU6IGZhbHNlIH07XG4gIHJldHVybiB7IHZhbHVlOiBbaW5kZXgsIHRhcmdldFtpbmRleF1dLCBkb25lOiBmYWxzZSB9O1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyVcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRldW5tYXBwZWRhcmd1bWVudHNvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRlbWFwcGVkYXJndW1lbnRzb2JqZWN0XG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcbiIsICJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IGNvZGVQb2ludEF0LCBhdCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKENPTlZFUlRfVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIHBvcykge1xuICAgIHZhciBTID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgc2l6ZSA9IFMubGVuZ3RoO1xuICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gc2l6ZSkgcmV0dXJuIENPTlZFUlRfVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgZmlyc3QgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24pO1xuICAgIHJldHVybiBmaXJzdCA8IDB4RDgwMCB8fCBmaXJzdCA+IDB4REJGRiB8fCBwb3NpdGlvbiArIDEgPT09IHNpemVcbiAgICAgIHx8IChzZWNvbmQgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24gKyAxKSkgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGXG4gICAgICAgID8gQ09OVkVSVF9UT19TVFJJTkcgPyBTLmNoYXJBdChwb3NpdGlvbikgOiBmaXJzdFxuICAgICAgICA6IENPTlZFUlRfVE9fU1RSSU5HID8gUy5zbGljZShwb3NpdGlvbiwgcG9zaXRpb24gKyAyKSA6IChmaXJzdCAtIDB4RDgwMCA8PCAxMCkgKyAoc2Vjb25kIC0gMHhEQzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUuY29kZXBvaW50YXRcbiAgY29kZUF0OiBjcmVhdGVNZXRob2QoZmFsc2UpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5hdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuYXRcbiAgY2hhckF0OiBjcmVhdGVNZXRob2QodHJ1ZSlcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIGNoYXJBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY2hhckF0O1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBkZWZpbmVJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3InKTtcblxudmFyIFNUUklOR19JVEVSQVRPUiA9ICdTdHJpbmcgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoU1RSSU5HX0lURVJBVE9SKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLUBAaXRlcmF0b3JcbmRlZmluZUl0ZXJhdG9yKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBTVFJJTkdfSVRFUkFUT1IsXG4gICAgc3RyaW5nOiBTdHJpbmcoaXRlcmF0ZWQpLFxuICAgIGluZGV4OiAwXG4gIH0pO1xuLy8gYCVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVzdHJpbmdpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHN0cmluZyA9IHN0YXRlLnN0cmluZztcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXg7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IHN0cmluZy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSBjaGFyQXQoc3RyaW5nLCBpbmRleCk7XG4gIHN0YXRlLmluZGV4ICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIEFycmF5SXRlcmF0b3JNZXRob2RzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvcicpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgQXJyYXlWYWx1ZXMgPSBBcnJheUl0ZXJhdG9yTWV0aG9kcy52YWx1ZXM7XG5cbmZvciAodmFyIENPTExFQ1RJT05fTkFNRSBpbiBET01JdGVyYWJsZXMpIHtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbQ09MTEVDVElPTl9OQU1FXTtcbiAgdmFyIENvbGxlY3Rpb25Qcm90b3R5cGUgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZSkge1xuICAgIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICAgIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlW0lURVJBVE9SXSAhPT0gQXJyYXlWYWx1ZXMpIHRyeSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl0gPSBBcnJheVZhbHVlcztcbiAgICB9XG4gICAgaWYgKCFDb2xsZWN0aW9uUHJvdG90eXBlW1RPX1NUUklOR19UQUddKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgQ09MTEVDVElPTl9OQU1FKTtcbiAgICB9XG4gICAgaWYgKERPTUl0ZXJhYmxlc1tDT0xMRUNUSU9OX05BTUVdKSBmb3IgKHZhciBNRVRIT0RfTkFNRSBpbiBBcnJheUl0ZXJhdG9yTWV0aG9kcykge1xuICAgICAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gICAgICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZVtNRVRIT0RfTkFNRV0gIT09IEFycmF5SXRlcmF0b3JNZXRob2RzW01FVEhPRF9OQU1FXSkgdHJ5IHtcbiAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIE1FVEhPRF9OQU1FLCBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgQ29sbGVjdGlvblByb3RvdHlwZVtNRVRIT0RfTkFNRV0gPSBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCAidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1pc2V4dGVuc2libGUsIGVzL25vLW9iamVjdC1wcmV2ZW50ZXh0ZW5zaW9ucyAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xuIiwgInZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBGUkVFWklORyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mcmVlemluZycpO1xuXG52YXIgTUVUQURBVEEgPSB1aWQoJ21ldGEnKTtcbnZhciBpZCA9IDA7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtaXNleHRlbnNpYmxlIC0tIHNhZmVcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG52YXIgc2V0TWV0YWRhdGEgPSBmdW5jdGlvbiAoaXQpIHtcbiAgZGVmaW5lUHJvcGVydHkoaXQsIE1FVEFEQVRBLCB7IHZhbHVlOiB7XG4gICAgb2JqZWN0SUQ6ICdPJyArIGlkKyssIC8vIG9iamVjdCBJRFxuICAgIHdlYWtEYXRhOiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IH0pO1xufTtcblxudmFyIGZhc3RLZXkgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICAvLyByZXR1cm4gYSBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBREFUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YWRhdGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFEQVRBXS5vYmplY3RJRDtcbn07XG5cbnZhciBnZXRXZWFrRGF0YSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIGlmICghaGFzKGl0LCBNRVRBREFUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YWRhdGEoaXQpO1xuICAvLyByZXR1cm4gdGhlIHN0b3JlIG9mIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFEQVRBXS53ZWFrRGF0YTtcbn07XG5cbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWklORyAmJiBtZXRhLlJFUVVJUkVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQURBVEEpKSBzZXRNZXRhZGF0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFUVVJUkVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2Vha0RhdGE6IGdldFdlYWtEYXRhLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG5cbmhpZGRlbktleXNbTUVUQURBVEFdID0gdHJ1ZTtcbiIsICJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBGUkVFWklORyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mcmVlemluZycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgb25GcmVlemUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtbWV0YWRhdGEnKS5vbkZyZWV6ZTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1mcmVlemUgLS0gc2FmZVxudmFyICRmcmVlemUgPSBPYmplY3QuZnJlZXplO1xudmFyIEZBSUxTX09OX1BSSU1JVElWRVMgPSBmYWlscyhmdW5jdGlvbiAoKSB7ICRmcmVlemUoMSk7IH0pO1xuXG4vLyBgT2JqZWN0LmZyZWV6ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5mcmVlemVcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZBSUxTX09OX1BSSU1JVElWRVMsIHNoYW06ICFGUkVFWklORyB9LCB7XG4gIGZyZWV6ZTogZnVuY3Rpb24gZnJlZXplKGl0KSB7XG4gICAgcmV0dXJuICRmcmVlemUgJiYgaXNPYmplY3QoaXQpID8gJGZyZWV6ZShvbkZyZWV6ZShpdCkpIDogaXQ7XG4gIH1cbn0pO1xuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIG9uRnJlZXplID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLW1ldGFkYXRhJykub25GcmVlemU7XG52YXIgRlJFRVpJTkcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnJlZXppbmcnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LXNlYWwgLS0gc2FmZVxudmFyICRzZWFsID0gT2JqZWN0LnNlYWw7XG52YXIgRkFJTFNfT05fUFJJTUlUSVZFUyA9IGZhaWxzKGZ1bmN0aW9uICgpIHsgJHNlYWwoMSk7IH0pO1xuXG4vLyBgT2JqZWN0LnNlYWxgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Quc2VhbFxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogRkFJTFNfT05fUFJJTUlUSVZFUywgc2hhbTogIUZSRUVaSU5HIH0sIHtcbiAgc2VhbDogZnVuY3Rpb24gc2VhbChpdCkge1xuICAgIHJldHVybiAkc2VhbCAmJiBpc09iamVjdChpdCkgPyAkc2VhbChvbkZyZWV6ZShpdCkpIDogaXQ7XG4gIH1cbn0pO1xuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG5cbnZhciBGQUlMU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24gKCkgeyBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoMSk7IH0pO1xudmFyIEZPUkNFRCA9ICFERVNDUklQVE9SUyB8fCBGQUlMU19PTl9QUklNSVRJVkVTO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCwgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICAgIHJldHVybiBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodG9JbmRleGVkT2JqZWN0KGl0KSwga2V5KTtcbiAgfVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAucHJvdG90eXBlLmZsYWdzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRoYXQgPSBhbk9iamVjdCh0aGlzKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAodGhhdC5nbG9iYWwpIHJlc3VsdCArPSAnZyc7XG4gIGlmICh0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmICh0aGF0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKHRoYXQuZG90QWxsKSByZXN1bHQgKz0gJ3MnO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC5zdGlja3kpIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwgInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBiYWJlbC1taW5pZnkgdHJhbnNwaWxlcyBSZWdFeHAoJ2EnLCAneScpIC0+IC9hL3kgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvcixcbnZhciBSRSA9IGZ1bmN0aW9uIChzLCBmKSB7XG4gIHJldHVybiBSZWdFeHAocywgZik7XG59O1xuXG5leHBvcnRzLlVOU1VQUE9SVEVEX1kgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciByZSA9IFJFKCdhJywgJ3knKTtcbiAgcmUubGFzdEluZGV4ID0gMjtcbiAgcmV0dXJuIHJlLmV4ZWMoJ2FiY2QnKSAhPSBudWxsO1xufSk7XG5cbmV4cG9ydHMuQlJPS0VOX0NBUkVUID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD03NzM2ODdcbiAgdmFyIHJlID0gUkUoJ15yJywgJ2d5Jyk7XG4gIHJlLmxhc3RJbmRleCA9IDI7XG4gIHJldHVybiByZS5leGVjKCdzdHInKSAhPSBudWxsO1xufSk7XG4iLCAidmFyIGZhaWxzID0gcmVxdWlyZSgnLi9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCcuJywgJ3MnKSAtPiAvLi9zIGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbiAgdmFyIHJlID0gUmVnRXhwKCcuJywgKHR5cGVvZiAnJykuY2hhckF0KDApKTtcbiAgcmV0dXJuICEocmUuZG90QWxsICYmIHJlLmV4ZWMoJ1xcbicpICYmIHJlLmZsYWdzID09PSAncycpO1xufSk7XG4iLCAidmFyIGZhaWxzID0gcmVxdWlyZSgnLi9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCcuJywgJ2cnKSAtPiAvLi9nIGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbiAgdmFyIHJlID0gUmVnRXhwKCcoPzxhPmIpJywgKHR5cGVvZiAnJykuY2hhckF0KDUpKTtcbiAgcmV0dXJuIHJlLmV4ZWMoJ2InKS5ncm91cHMuYSAhPT0gJ2InIHx8XG4gICAgJ2InLnJlcGxhY2UocmUsICckPGE+YycpICE9PSAnYmMnO1xufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgcmVnZXhwL25vLWFzc2VydGlvbi1jYXB0dXJpbmctZ3JvdXAsIHJlZ2V4cC9uby1lbXB0eS1ncm91cCwgcmVnZXhwL25vLWxhenktZW5kcyAtLSB0ZXN0aW5nICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWdleHAvbm8tdXNlbGVzcy1xdWFudGlmaWVyIC0tIHRlc3RpbmcgKi9cbnZhciByZWdleHBGbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZmxhZ3MnKTtcbnZhciBzdGlja3lIZWxwZXJzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1zdGlja3ktaGVscGVycycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGdldEludGVybmFsU3RhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKS5nZXQ7XG52YXIgVU5TVVBQT1JURURfRE9UX0FMTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtZG90LWFsbCcpO1xudmFyIFVOU1VQUE9SVEVEX05DRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtbmNnJyk7XG5cbnZhciBuYXRpdmVFeGVjID0gUmVnRXhwLnByb3RvdHlwZS5leGVjO1xudmFyIG5hdGl2ZVJlcGxhY2UgPSBzaGFyZWQoJ25hdGl2ZS1zdHJpbmctcmVwbGFjZScsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG5cbnZhciBwYXRjaGVkRXhlYyA9IG5hdGl2ZUV4ZWM7XG5cbnZhciBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUxID0gL2EvO1xuICB2YXIgcmUyID0gL2IqL2c7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTEsICdhJyk7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTIsICdhJyk7XG4gIHJldHVybiByZTEubGFzdEluZGV4ICE9PSAwIHx8IHJlMi5sYXN0SW5kZXggIT09IDA7XG59KSgpO1xuXG52YXIgVU5TVVBQT1JURURfWSA9IHN0aWNreUhlbHBlcnMuVU5TVVBQT1JURURfWSB8fCBzdGlja3lIZWxwZXJzLkJST0tFTl9DQVJFVDtcblxuLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXAsIGNvcGllZCBmcm9tIGVzNS1zaGltJ3MgU3RyaW5nI3NwbGl0IHBhdGNoLlxudmFyIE5QQ0dfSU5DTFVERUQgPSAvKCk/Py8uZXhlYygnJylbMV0gIT09IHVuZGVmaW5lZDtcblxudmFyIFBBVENIID0gVVBEQVRFU19MQVNUX0lOREVYX1dST05HIHx8IE5QQ0dfSU5DTFVERUQgfHwgVU5TVVBQT1JURURfWSB8fCBVTlNVUFBPUlRFRF9ET1RfQUxMIHx8IFVOU1VQUE9SVEVEX05DRztcblxuaWYgKFBBVENIKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtc3RhdGVtZW50cyAtLSBUT0RPXG4gIHBhdGNoZWRFeGVjID0gZnVuY3Rpb24gZXhlYyhzdHIpIHtcbiAgICB2YXIgcmUgPSB0aGlzO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUocmUpO1xuICAgIHZhciByYXcgPSBzdGF0ZS5yYXc7XG4gICAgdmFyIHJlc3VsdCwgcmVDb3B5LCBsYXN0SW5kZXgsIG1hdGNoLCBpLCBvYmplY3QsIGdyb3VwO1xuXG4gICAgaWYgKHJhdykge1xuICAgICAgcmF3Lmxhc3RJbmRleCA9IHJlLmxhc3RJbmRleDtcbiAgICAgIHJlc3VsdCA9IHBhdGNoZWRFeGVjLmNhbGwocmF3LCBzdHIpO1xuICAgICAgcmUubGFzdEluZGV4ID0gcmF3Lmxhc3RJbmRleDtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdmFyIGdyb3VwcyA9IHN0YXRlLmdyb3VwcztcbiAgICB2YXIgc3RpY2t5ID0gVU5TVVBQT1JURURfWSAmJiByZS5zdGlja3k7XG4gICAgdmFyIGZsYWdzID0gcmVnZXhwRmxhZ3MuY2FsbChyZSk7XG4gICAgdmFyIHNvdXJjZSA9IHJlLnNvdXJjZTtcbiAgICB2YXIgY2hhcnNBZGRlZCA9IDA7XG4gICAgdmFyIHN0ckNvcHkgPSBzdHI7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBmbGFncyA9IGZsYWdzLnJlcGxhY2UoJ3knLCAnJyk7XG4gICAgICBpZiAoZmxhZ3MuaW5kZXhPZignZycpID09PSAtMSkge1xuICAgICAgICBmbGFncyArPSAnZyc7XG4gICAgICB9XG5cbiAgICAgIHN0ckNvcHkgPSBTdHJpbmcoc3RyKS5zbGljZShyZS5sYXN0SW5kZXgpO1xuICAgICAgLy8gU3VwcG9ydCBhbmNob3JlZCBzdGlja3kgYmVoYXZpb3IuXG4gICAgICBpZiAocmUubGFzdEluZGV4ID4gMCAmJiAoIXJlLm11bHRpbGluZSB8fCByZS5tdWx0aWxpbmUgJiYgc3RyW3JlLmxhc3RJbmRleCAtIDFdICE9PSAnXFxuJykpIHtcbiAgICAgICAgc291cmNlID0gJyg/OiAnICsgc291cmNlICsgJyknO1xuICAgICAgICBzdHJDb3B5ID0gJyAnICsgc3RyQ29weTtcbiAgICAgICAgY2hhcnNBZGRlZCsrO1xuICAgICAgfVxuICAgICAgLy8gXig/ICsgcnggKyApIGlzIG5lZWRlZCwgaW4gY29tYmluYXRpb24gd2l0aCBzb21lIHN0ciBzbGljaW5nLCB0b1xuICAgICAgLy8gc2ltdWxhdGUgdGhlICd5JyBmbGFnLlxuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXig/OicgKyBzb3VyY2UgKyAnKScsIGZsYWdzKTtcbiAgICB9XG5cbiAgICBpZiAoTlBDR19JTkNMVURFRCkge1xuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXicgKyBzb3VyY2UgKyAnJCg/IVxcXFxzKScsIGZsYWdzKTtcbiAgICB9XG4gICAgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORykgbGFzdEluZGV4ID0gcmUubGFzdEluZGV4O1xuXG4gICAgbWF0Y2ggPSBuYXRpdmVFeGVjLmNhbGwoc3RpY2t5ID8gcmVDb3B5IDogcmUsIHN0ckNvcHkpO1xuXG4gICAgaWYgKHN0aWNreSkge1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIG1hdGNoLmlucHV0ID0gbWF0Y2guaW5wdXQuc2xpY2UoY2hhcnNBZGRlZCk7XG4gICAgICAgIG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoY2hhcnNBZGRlZCk7XG4gICAgICAgIG1hdGNoLmluZGV4ID0gcmUubGFzdEluZGV4O1xuICAgICAgICByZS5sYXN0SW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgfSBlbHNlIHJlLmxhc3RJbmRleCA9IDA7XG4gICAgfSBlbHNlIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgJiYgbWF0Y2gpIHtcbiAgICAgIHJlLmxhc3RJbmRleCA9IHJlLmdsb2JhbCA/IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoIDogbGFzdEluZGV4O1xuICAgIH1cbiAgICBpZiAoTlBDR19JTkNMVURFRCAmJiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBGaXggYnJvd3NlcnMgd2hvc2UgYGV4ZWNgIG1ldGhvZHMgZG9uJ3QgY29uc2lzdGVudGx5IHJldHVybiBgdW5kZWZpbmVkYFxuICAgICAgLy8gZm9yIE5QQ0csIGxpa2UgSUU4LiBOT1RFOiBUaGlzIGRvZXNuJyB3b3JrIGZvciAvKC4/KT8vXG4gICAgICBuYXRpdmVSZXBsYWNlLmNhbGwobWF0Y2hbMF0sIHJlQ29weSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDI7IGkrKykge1xuICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0gPT09IHVuZGVmaW5lZCkgbWF0Y2hbaV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChtYXRjaCAmJiBncm91cHMpIHtcbiAgICAgIG1hdGNoLmdyb3VwcyA9IG9iamVjdCA9IGNyZWF0ZShudWxsKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZ3JvdXAgPSBncm91cHNbaV07XG4gICAgICAgIG9iamVjdFtncm91cFswXV0gPSBtYXRjaFtncm91cFsxXV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoZWRFeGVjO1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZXhlY2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUuZXhlY1xuJCh7IHRhcmdldDogJ1JlZ0V4cCcsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IC8uLy5leGVjICE9PSBleGVjIH0sIHtcbiAgZXhlYzogZXhlY1xufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogUmVtb3ZlIGZyb20gYGNvcmUtanNANGAgc2luY2UgaXQncyBtb3ZlZCB0byBlbnRyeSBwb2ludHNcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMucmVnZXhwLmV4ZWMnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBSZWdFeHBQcm90b3R5cGUgPSBSZWdFeHAucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGV4ZWMsIEZPUkNFRCwgU0hBTSkge1xuICB2YXIgU1lNQk9MID0gd2VsbEtub3duU3ltYm9sKEtFWSk7XG5cbiAgdmFyIERFTEVHQVRFU19UT19TWU1CT0wgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIFN0cmluZyBtZXRob2RzIGNhbGwgc3ltYm9sLW5hbWVkIFJlZ0VwIG1ldGhvZHNcbiAgICB2YXIgTyA9IHt9O1xuICAgIE9bU1lNQk9MXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH07XG4gICAgcmV0dXJuICcnW0tFWV0oTykgIT0gNztcbiAgfSk7XG5cbiAgdmFyIERFTEVHQVRFU19UT19FWEVDID0gREVMRUdBVEVTX1RPX1NZTUJPTCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIFN5bWJvbC1uYW1lZCBSZWdFeHAgbWV0aG9kcyBjYWxsIC5leGVjXG4gICAgdmFyIGV4ZWNDYWxsZWQgPSBmYWxzZTtcbiAgICB2YXIgcmUgPSAvYS87XG5cbiAgICBpZiAoS0VZID09PSAnc3BsaXQnKSB7XG4gICAgICAvLyBXZSBjYW4ndCB1c2UgcmVhbCByZWdleCBoZXJlIHNpbmNlIGl0IGNhdXNlcyBkZW9wdGltaXphdGlvblxuICAgICAgLy8gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb24gaW4gVjhcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMDZcbiAgICAgIHJlID0ge307XG4gICAgICAvLyBSZWdFeHBbQEBzcGxpdF0gZG9lc24ndCBjYWxsIHRoZSByZWdleCdzIGV4ZWMgbWV0aG9kLCBidXQgZmlyc3QgY3JlYXRlc1xuICAgICAgLy8gYSBuZXcgb25lLiBXZSBuZWVkIHRvIHJldHVybiB0aGUgcGF0Y2hlZCByZWdleCB3aGVuIGNyZWF0aW5nIHRoZSBuZXcgb25lLlxuICAgICAgcmUuY29uc3RydWN0b3IgPSB7fTtcbiAgICAgIHJlLmNvbnN0cnVjdG9yW1NQRUNJRVNdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmU7IH07XG4gICAgICByZS5mbGFncyA9ICcnO1xuICAgICAgcmVbU1lNQk9MXSA9IC8uL1tTWU1CT0xdO1xuICAgIH1cblxuICAgIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7IGV4ZWNDYWxsZWQgPSB0cnVlOyByZXR1cm4gbnVsbDsgfTtcblxuICAgIHJlW1NZTUJPTF0oJycpO1xuICAgIHJldHVybiAhZXhlY0NhbGxlZDtcbiAgfSk7XG5cbiAgaWYgKFxuICAgICFERUxFR0FURVNfVE9fU1lNQk9MIHx8XG4gICAgIURFTEVHQVRFU19UT19FWEVDIHx8XG4gICAgRk9SQ0VEXG4gICkge1xuICAgIHZhciBuYXRpdmVSZWdFeHBNZXRob2QgPSAvLi9bU1lNQk9MXTtcbiAgICB2YXIgbWV0aG9kcyA9IGV4ZWMoU1lNQk9MLCAnJ1tLRVldLCBmdW5jdGlvbiAobmF0aXZlTWV0aG9kLCByZWdleHAsIHN0ciwgYXJnMiwgZm9yY2VTdHJpbmdNZXRob2QpIHtcbiAgICAgIHZhciAkZXhlYyA9IHJlZ2V4cC5leGVjO1xuICAgICAgaWYgKCRleGVjID09PSByZWdleHBFeGVjIHx8ICRleGVjID09PSBSZWdFeHBQcm90b3R5cGUuZXhlYykge1xuICAgICAgICBpZiAoREVMRUdBVEVTX1RPX1NZTUJPTCAmJiAhZm9yY2VTdHJpbmdNZXRob2QpIHtcbiAgICAgICAgICAvLyBUaGUgbmF0aXZlIFN0cmluZyBtZXRob2QgYWxyZWFkeSBkZWxlZ2F0ZXMgdG8gQEBtZXRob2QgKHRoaXNcbiAgICAgICAgICAvLyBwb2x5ZmlsbGVkIGZ1bmN0aW9uKSwgbGVhc2luZyB0byBpbmZpbml0ZSByZWN1cnNpb24uXG4gICAgICAgICAgLy8gV2UgYXZvaWQgaXQgYnkgZGlyZWN0bHkgY2FsbGluZyB0aGUgbmF0aXZlIEBAbWV0aG9kIG1ldGhvZC5cbiAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlUmVnRXhwTWV0aG9kLmNhbGwocmVnZXhwLCBzdHIsIGFyZzIpIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IG5hdGl2ZU1ldGhvZC5jYWxsKHN0ciwgcmVnZXhwLCBhcmcyKSB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UgfTtcbiAgICB9KTtcblxuICAgIHJlZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIEtFWSwgbWV0aG9kc1swXSk7XG4gICAgcmVkZWZpbmUoUmVnRXhwUHJvdG90eXBlLCBTWU1CT0wsIG1ldGhvZHNbMV0pO1xuICB9XG5cbiAgaWYgKFNIQU0pIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShSZWdFeHBQcm90b3R5cGVbU1lNQk9MXSwgJ3NoYW0nLCB0cnVlKTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIGNoYXJBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY2hhckF0O1xuXG4vLyBgQWR2YW5jZVN0cmluZ0luZGV4YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYWR2YW5jZXN0cmluZ2luZGV4XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChTLCBpbmRleCwgdW5pY29kZSkge1xuICByZXR1cm4gaW5kZXggKyAodW5pY29kZSA/IGNoYXJBdChTLCBpbmRleCkubGVuZ3RoIDogMSk7XG59O1xuIiwgInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcblxudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbnZhciByZXBsYWNlID0gJycucmVwbGFjZTtcbnZhciBTVUJTVElUVVRJT05fU1lNQk9MUyA9IC9cXCQoWyQmJ2BdfFxcZHsxLDJ9fDxbXj5dKj4pL2c7XG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFNfTk9fTkFNRUQgPSAvXFwkKFskJidgXXxcXGR7MSwyfSkvZztcblxuLy8gYEdldFN1YnN0aXR1dGlvbmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldHN1YnN0aXR1dGlvblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWF0Y2hlZCwgc3RyLCBwb3NpdGlvbiwgY2FwdHVyZXMsIG5hbWVkQ2FwdHVyZXMsIHJlcGxhY2VtZW50KSB7XG4gIHZhciB0YWlsUG9zID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgdmFyIG0gPSBjYXB0dXJlcy5sZW5ndGg7XG4gIHZhciBzeW1ib2xzID0gU1VCU1RJVFVUSU9OX1NZTUJPTFNfTk9fTkFNRUQ7XG4gIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBuYW1lZENhcHR1cmVzID0gdG9PYmplY3QobmFtZWRDYXB0dXJlcyk7XG4gICAgc3ltYm9scyA9IFNVQlNUSVRVVElPTl9TWU1CT0xTO1xuICB9XG4gIHJldHVybiByZXBsYWNlLmNhbGwocmVwbGFjZW1lbnQsIHN5bWJvbHMsIGZ1bmN0aW9uIChtYXRjaCwgY2gpIHtcbiAgICB2YXIgY2FwdHVyZTtcbiAgICBzd2l0Y2ggKGNoLmNoYXJBdCgwKSkge1xuICAgICAgY2FzZSAnJCc6IHJldHVybiAnJCc7XG4gICAgICBjYXNlICcmJzogcmV0dXJuIG1hdGNoZWQ7XG4gICAgICBjYXNlICdgJzogcmV0dXJuIHN0ci5zbGljZSgwLCBwb3NpdGlvbik7XG4gICAgICBjYXNlIFwiJ1wiOiByZXR1cm4gc3RyLnNsaWNlKHRhaWxQb3MpO1xuICAgICAgY2FzZSAnPCc6XG4gICAgICAgIGNhcHR1cmUgPSBuYW1lZENhcHR1cmVzW2NoLnNsaWNlKDEsIC0xKV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogLy8gXFxkXFxkP1xuICAgICAgICB2YXIgbiA9ICtjaDtcbiAgICAgICAgaWYgKG4gPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgaWYgKG4gPiBtKSB7XG4gICAgICAgICAgdmFyIGYgPSBmbG9vcihuIC8gMTApO1xuICAgICAgICAgIGlmIChmID09PSAwKSByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgaWYgKGYgPD0gbSkgcmV0dXJuIGNhcHR1cmVzW2YgLSAxXSA9PT0gdW5kZWZpbmVkID8gY2guY2hhckF0KDEpIDogY2FwdHVyZXNbZiAtIDFdICsgY2guY2hhckF0KDEpO1xuICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuICAgICAgICBjYXB0dXJlID0gY2FwdHVyZXNbbiAtIDFdO1xuICAgIH1cbiAgICByZXR1cm4gY2FwdHVyZSA9PT0gdW5kZWZpbmVkID8gJycgOiBjYXB0dXJlO1xuICB9KTtcbn07XG4iLCAidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL2NsYXNzb2YtcmF3Jyk7XG52YXIgcmVnZXhwRXhlYyA9IHJlcXVpcmUoJy4vcmVnZXhwLWV4ZWMnKTtcblxuLy8gYFJlZ0V4cEV4ZWNgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHBleGVjXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChSLCBTKSB7XG4gIHZhciBleGVjID0gUi5leGVjO1xuICBpZiAodHlwZW9mIGV4ZWMgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgcmVzdWx0ID0gZXhlYy5jYWxsKFIsIFMpO1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdSZWdFeHAgZXhlYyBtZXRob2QgcmV0dXJuZWQgc29tZXRoaW5nIG90aGVyIHRoYW4gYW4gT2JqZWN0IG9yIG51bGwnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmIChjbGFzc29mKFIpICE9PSAnUmVnRXhwJykge1xuICAgIHRocm93IFR5cGVFcnJvcignUmVnRXhwI2V4ZWMgY2FsbGVkIG9uIGluY29tcGF0aWJsZSByZWNlaXZlcicpO1xuICB9XG5cbiAgcmV0dXJuIHJlZ2V4cEV4ZWMuY2FsbChSLCBTKTtcbn07XG5cbiIsICIndXNlIHN0cmljdCc7XG52YXIgZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleCcpO1xudmFyIGdldFN1YnN0aXR1dGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtc3Vic3RpdHV0aW9uJyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgUkVQTEFDRSA9IHdlbGxLbm93blN5bWJvbCgncmVwbGFjZScpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG52YXIgbWF5YmVUb1N0cmluZyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/IGl0IDogU3RyaW5nKGl0KTtcbn07XG5cbi8vIElFIDw9IDExIHJlcGxhY2VzICQwIHdpdGggdGhlIHdob2xlIG1hdGNoLCBhcyBpZiBpdCB3YXMgJCZcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYwMjQ2NjYvZ2V0dGluZy1pZS10by1yZXBsYWNlLWEtcmVnZXgtd2l0aC10aGUtbGl0ZXJhbC1zdHJpbmctMFxudmFyIFJFUExBQ0VfS0VFUFNfJDAgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL3ByZWZlci1lc2NhcGUtcmVwbGFjZW1lbnQtZG9sbGFyLWNoYXIgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuICdhJy5yZXBsYWNlKC8uLywgJyQwJykgPT09ICckMCc7XG59KSgpO1xuXG4vLyBTYWZhcmkgPD0gMTMuMC4zKD8pIHN1YnN0aXR1dGVzIG50aCBjYXB0dXJlIHdoZXJlIG4+bSB3aXRoIGFuIGVtcHR5IHN0cmluZ1xudmFyIFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFID0gKGZ1bmN0aW9uICgpIHtcbiAgaWYgKC8uL1tSRVBMQUNFXSkge1xuICAgIHJldHVybiAvLi9bUkVQTEFDRV0oJ2EnLCAnJDAnKSA9PT0gJyc7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxudmFyIFJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlID0gLy4vO1xuICByZS5leGVjID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICByZXN1bHQuZ3JvdXBzID0geyBhOiAnNycgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICByZXR1cm4gJycucmVwbGFjZShyZSwgJyQ8YT4nKSAhPT0gJzcnO1xufSk7XG5cbi8vIEBAcmVwbGFjZSBsb2dpY1xuZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMoJ3JlcGxhY2UnLCBmdW5jdGlvbiAoXywgbmF0aXZlUmVwbGFjZSwgbWF5YmVDYWxsTmF0aXZlKSB7XG4gIHZhciBVTlNBRkVfU1VCU1RJVFVURSA9IFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFID8gJyQnIDogJyQwJztcblxuICByZXR1cm4gW1xuICAgIC8vIGBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlXG4gICAgZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKSB7XG4gICAgICB2YXIgTyA9IHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcyk7XG4gICAgICB2YXIgcmVwbGFjZXIgPSBzZWFyY2hWYWx1ZSA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZWFyY2hWYWx1ZVtSRVBMQUNFXTtcbiAgICAgIHJldHVybiByZXBsYWNlciAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gcmVwbGFjZXIuY2FsbChzZWFyY2hWYWx1ZSwgTywgcmVwbGFjZVZhbHVlKVxuICAgICAgICA6IG5hdGl2ZVJlcGxhY2UuY2FsbChTdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAcmVwbGFjZVxuICAgIGZ1bmN0aW9uIChzdHJpbmcsIHJlcGxhY2VWYWx1ZSkge1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgcmVwbGFjZVZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgICByZXBsYWNlVmFsdWUuaW5kZXhPZihVTlNBRkVfU1VCU1RJVFVURSkgPT09IC0xICYmXG4gICAgICAgIHJlcGxhY2VWYWx1ZS5pbmRleE9mKCckPCcpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUobmF0aXZlUmVwbGFjZSwgdGhpcywgc3RyaW5nLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHRoaXMpO1xuICAgICAgdmFyIFMgPSBTdHJpbmcoc3RyaW5nKTtcblxuICAgICAgdmFyIGZ1bmN0aW9uYWxSZXBsYWNlID0gdHlwZW9mIHJlcGxhY2VWYWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIGlmICghZnVuY3Rpb25hbFJlcGxhY2UpIHJlcGxhY2VWYWx1ZSA9IFN0cmluZyhyZXBsYWNlVmFsdWUpO1xuXG4gICAgICB2YXIgZ2xvYmFsID0gcnguZ2xvYmFsO1xuICAgICAgaWYgKGdsb2JhbCkge1xuICAgICAgICB2YXIgZnVsbFVuaWNvZGUgPSByeC51bmljb2RlO1xuICAgICAgICByeC5sYXN0SW5kZXggPSAwO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWdFeHBFeGVjKHJ4LCBTKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgYnJlYWs7XG5cbiAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIGlmICghZ2xvYmFsKSBicmVhaztcblxuICAgICAgICB2YXIgbWF0Y2hTdHIgPSBTdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgaWYgKG1hdGNoU3RyID09PSAnJykgcngubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKHJ4Lmxhc3RJbmRleCksIGZ1bGxVbmljb2RlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjY3VtdWxhdGVkUmVzdWx0ID0gJyc7XG4gICAgICB2YXIgbmV4dFNvdXJjZVBvc2l0aW9uID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHRzW2ldO1xuXG4gICAgICAgIHZhciBtYXRjaGVkID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IG1heChtaW4odG9JbnRlZ2VyKHJlc3VsdC5pbmRleCksIFMubGVuZ3RoKSwgMCk7XG4gICAgICAgIHZhciBjYXB0dXJlcyA9IFtdO1xuICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGVxdWl2YWxlbnQgdG9cbiAgICAgICAgLy8gICBjYXB0dXJlcyA9IHJlc3VsdC5zbGljZSgxKS5tYXAobWF5YmVUb1N0cmluZylcbiAgICAgICAgLy8gYnV0IGZvciBzb21lIHJlYXNvbiBgbmF0aXZlU2xpY2UuY2FsbChyZXN1bHQsIDEsIHJlc3VsdC5sZW5ndGgpYCAoY2FsbGVkIGluXG4gICAgICAgIC8vIHRoZSBzbGljZSBwb2x5ZmlsbCB3aGVuIHNsaWNpbmcgbmF0aXZlIGFycmF5cykgXCJkb2Vzbid0IHdvcmtcIiBpbiBzYWZhcmkgOSBhbmRcbiAgICAgICAgLy8gY2F1c2VzIGEgY3Jhc2ggKGh0dHBzOi8vcGFzdGViaW4uY29tL04yMVF6ZVFBKSB3aGVuIHRyeWluZyB0byBkZWJ1ZyBpdC5cbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCByZXN1bHQubGVuZ3RoOyBqKyspIGNhcHR1cmVzLnB1c2gobWF5YmVUb1N0cmluZyhyZXN1bHRbal0pKTtcbiAgICAgICAgdmFyIG5hbWVkQ2FwdHVyZXMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICBpZiAoZnVuY3Rpb25hbFJlcGxhY2UpIHtcbiAgICAgICAgICB2YXIgcmVwbGFjZXJBcmdzID0gW21hdGNoZWRdLmNvbmNhdChjYXB0dXJlcywgcG9zaXRpb24sIFMpO1xuICAgICAgICAgIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHJlcGxhY2VyQXJncy5wdXNoKG5hbWVkQ2FwdHVyZXMpO1xuICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IFN0cmluZyhyZXBsYWNlVmFsdWUuYXBwbHkodW5kZWZpbmVkLCByZXBsYWNlckFyZ3MpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBsYWNlbWVudCA9IGdldFN1YnN0aXR1dGlvbihtYXRjaGVkLCBTLCBwb3NpdGlvbiwgY2FwdHVyZXMsIG5hbWVkQ2FwdHVyZXMsIHJlcGxhY2VWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc2l0aW9uID49IG5leHRTb3VyY2VQb3NpdGlvbikge1xuICAgICAgICAgIGFjY3VtdWxhdGVkUmVzdWx0ICs9IFMuc2xpY2UobmV4dFNvdXJjZVBvc2l0aW9uLCBwb3NpdGlvbikgKyByZXBsYWNlbWVudDtcbiAgICAgICAgICBuZXh0U291cmNlUG9zaXRpb24gPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjdW11bGF0ZWRSZXN1bHQgKyBTLnNsaWNlKG5leHRTb3VyY2VQb3NpdGlvbik7XG4gICAgfVxuICBdO1xufSwgIVJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTIHx8ICFSRVBMQUNFX0tFRVBTXyQwIHx8IFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFKTtcbiIsICJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcblxudmFyIERhdGVQcm90b3R5cGUgPSBEYXRlLnByb3RvdHlwZTtcbnZhciBJTlZBTElEX0RBVEUgPSAnSW52YWxpZCBEYXRlJztcbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyIG5hdGl2ZURhdGVUb1N0cmluZyA9IERhdGVQcm90b3R5cGVbVE9fU1RSSU5HXTtcbnZhciBnZXRUaW1lID0gRGF0ZVByb3RvdHlwZS5nZXRUaW1lO1xuXG4vLyBgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1kYXRlLnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKG5ldyBEYXRlKE5hTikgKyAnJyAhPSBJTlZBTElEX0RBVEUpIHtcbiAgcmVkZWZpbmUoRGF0ZVByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICB2YXIgdmFsdWUgPSBnZXRUaW1lLmNhbGwodGhpcyk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gbmF0aXZlRGF0ZVRvU3RyaW5nLmNhbGwodGhpcykgOiBJTlZBTElEX0RBVEU7XG4gIH0pO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzJyk7XG5cbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG52YXIgbmF0aXZlVG9TdHJpbmcgPSBSZWdFeHBQcm90b3R5cGVbVE9fU1RSSU5HXTtcblxudmFyIE5PVF9HRU5FUklDID0gZmFpbHMoZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlVG9TdHJpbmcuY2FsbCh7IHNvdXJjZTogJ2EnLCBmbGFnczogJ2InIH0pICE9ICcvYS9iJzsgfSk7XG4vLyBGRjQ0LSBSZWdFeHAjdG9TdHJpbmcgaGFzIGEgd3JvbmcgbmFtZVxudmFyIElOQ09SUkVDVF9OQU1FID0gbmF0aXZlVG9TdHJpbmcubmFtZSAhPSBUT19TVFJJTkc7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKE5PVF9HRU5FUklDIHx8IElOQ09SUkVDVF9OQU1FKSB7XG4gIHJlZGVmaW5lKFJlZ0V4cC5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgdmFyIFIgPSBhbk9iamVjdCh0aGlzKTtcbiAgICB2YXIgcCA9IFN0cmluZyhSLnNvdXJjZSk7XG4gICAgdmFyIHJmID0gUi5mbGFncztcbiAgICB2YXIgZiA9IFN0cmluZyhyZiA9PT0gdW5kZWZpbmVkICYmIFIgaW5zdGFuY2VvZiBSZWdFeHAgJiYgISgnZmxhZ3MnIGluIFJlZ0V4cFByb3RvdHlwZSkgPyBmbGFncy5jYWxsKFIpIDogcmYpO1xuICAgIHJldHVybiAnLycgKyBwICsgJy8nICsgZjtcbiAgfSwgeyB1bnNhZmU6IHRydWUgfSk7XG59XG4iLCAidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xuXG4vLyBgQXJyYXkuaXNBcnJheWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LmlzYXJyYXlcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHN0YXQ6IHRydWUgfSwge1xuICBpc0FycmF5OiBpc0FycmF5XG59KTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG5cbnZhciBuYXRpdmVKb2luID0gW10uam9pbjtcblxudmFyIEVTM19TVFJJTkdTID0gSW5kZXhlZE9iamVjdCAhPSBPYmplY3Q7XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2pvaW4nLCAnLCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmpvaW5gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuam9pblxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogRVMzX1NUUklOR1MgfHwgIVNUUklDVF9NRVRIT0QgfSwge1xuICBqb2luOiBmdW5jdGlvbiBqb2luKHNlcGFyYXRvcikge1xuICAgIHJldHVybiBuYXRpdmVKb2luLmNhbGwodG9JbmRleGVkT2JqZWN0KHRoaXMpLCBzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCA/ICcsJyA6IHNlcGFyYXRvcik7XG4gIH1cbn0pO1xuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIG5hdGl2ZUtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgRkFJTFNfT05fUFJJTUlUSVZFUyA9IGZhaWxzKGZ1bmN0aW9uICgpIHsgbmF0aXZlS2V5cygxKTsgfSk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGQUlMU19PTl9QUklNSVRJVkVTIH0sIHtcbiAga2V5czogZnVuY3Rpb24ga2V5cyhpdCkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH1cbn0pO1xuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFERVNDUklQVE9SUywgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgZGVmaW5lUHJvcGVydGllczogZGVmaW5lUHJvcGVydGllc1xufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIGZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleCcpO1xudmFyIHJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcblxuLy8gQEBtYXRjaCBsb2dpY1xuZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMoJ21hdGNoJywgZnVuY3Rpb24gKE1BVENILCBuYXRpdmVNYXRjaCwgbWF5YmVDYWxsTmF0aXZlKSB7XG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUubWF0Y2hgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5tYXRjaFxuICAgIGZ1bmN0aW9uIG1hdGNoKHJlZ2V4cCkge1xuICAgICAgdmFyIE8gPSByZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpO1xuICAgICAgdmFyIG1hdGNoZXIgPSByZWdleHAgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogcmVnZXhwW01BVENIXTtcbiAgICAgIHJldHVybiBtYXRjaGVyICE9PSB1bmRlZmluZWQgPyBtYXRjaGVyLmNhbGwocmVnZXhwLCBPKSA6IG5ldyBSZWdFeHAocmVnZXhwKVtNQVRDSF0oU3RyaW5nKE8pKTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAbWF0Y2hdYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUtQEBtYXRjaFxuICAgIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUobmF0aXZlTWF0Y2gsIHRoaXMsIHN0cmluZyk7XG4gICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG5cbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHRoaXMpO1xuICAgICAgdmFyIFMgPSBTdHJpbmcoc3RyaW5nKTtcblxuICAgICAgaWYgKCFyeC5nbG9iYWwpIHJldHVybiByZWdFeHBFeGVjKHJ4LCBTKTtcblxuICAgICAgdmFyIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgIHJ4Lmxhc3RJbmRleCA9IDA7XG4gICAgICB2YXIgQSA9IFtdO1xuICAgICAgdmFyIG4gPSAwO1xuICAgICAgdmFyIHJlc3VsdDtcbiAgICAgIHdoaWxlICgocmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUykpICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBtYXRjaFN0ciA9IFN0cmluZyhyZXN1bHRbMF0pO1xuICAgICAgICBBW25dID0gbWF0Y2hTdHI7XG4gICAgICAgIGlmIChtYXRjaFN0ciA9PT0gJycpIHJ4Lmxhc3RJbmRleCA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCB0b0xlbmd0aChyeC5sYXN0SW5kZXgpLCBmdWxsVW5pY29kZSk7XG4gICAgICAgIG4rKztcbiAgICAgIH1cbiAgICAgIHJldHVybiBuID09PSAwID8gbnVsbCA6IEE7XG4gICAgfVxuICBdO1xufSk7XG4iLCAiLy8gYSBzdHJpbmcgb2YgYWxsIHZhbGlkIHVuaWNvZGUgd2hpdGVzcGFjZXNcbm1vZHVsZS5leHBvcnRzID0gJ1xcdTAwMDlcXHUwMDBBXFx1MDAwQlxcdTAwMENcXHUwMDBEXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MjAwMFxcdTIwMDFcXHUyMDAyJyArXG4gICdcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRic7XG4iLCAidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyIHdoaXRlc3BhY2UgPSAnWycgKyB3aGl0ZXNwYWNlcyArICddJztcbnZhciBsdHJpbSA9IFJlZ0V4cCgnXicgKyB3aGl0ZXNwYWNlICsgd2hpdGVzcGFjZSArICcqJyk7XG52YXIgcnRyaW0gPSBSZWdFeHAod2hpdGVzcGFjZSArIHdoaXRlc3BhY2UgKyAnKiQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltLCB0cmltU3RhcnQsIHRyaW1FbmQsIHRyaW1MZWZ0LCB0cmltUmlnaHQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICBpZiAoVFlQRSAmIDEpIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGx0cmltLCAnJyk7XG4gICAgaWYgKFRZUEUgJiAyKSBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShydHJpbSwgJycpO1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltTGVmdCwgdHJpbVN0YXJ0IH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1zdGFydFxuICBzdGFydDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1SaWdodCwgdHJpbUVuZCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltZW5kXG4gIGVuZDogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS50cmltYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1cbiAgdHJpbTogY3JlYXRlTWV0aG9kKDMpXG59O1xuIiwgInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciBub24gPSAnXFx1MjAwQlxcdTAwODVcXHUxODBFJztcblxuLy8gY2hlY2sgdGhhdCBhIG1ldGhvZCB3b3JrcyB3aXRoIHRoZSBjb3JyZWN0IGxpc3Rcbi8vIG9mIHdoaXRlc3BhY2VzIGFuZCBoYXMgYSBjb3JyZWN0IG5hbWVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FKSB7XG4gIHJldHVybiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICEhd2hpdGVzcGFjZXNbTUVUSE9EX05BTUVdKCkgfHwgbm9uW01FVEhPRF9OQU1FXSgpICE9IG5vbiB8fCB3aGl0ZXNwYWNlc1tNRVRIT0RfTkFNRV0ubmFtZSAhPT0gTUVUSE9EX05BTUU7XG4gIH0pO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkdHJpbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbScpLnRyaW07XG52YXIgZm9yY2VkU3RyaW5nVHJpbU1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbS1mb3JjZWQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUudHJpbWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbVxuJCh7IHRhcmdldDogJ1N0cmluZycsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IGZvcmNlZFN0cmluZ1RyaW1NZXRob2QoJ3RyaW0nKSB9LCB7XG4gIHRyaW06IGZ1bmN0aW9uIHRyaW0oKSB7XG4gICAgcmV0dXJuICR0cmltKHRoaXMpO1xuICB9XG59KTtcbiIsICJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNyY1trZXldLCBvcHRpb25zKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07XG4iLCAidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvdHlwZVtJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCAidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgIT0gdW5kZWZpbmVkKSByZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuIiwgInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IpIHtcbiAgdmFyIHJldHVybk1ldGhvZCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgaWYgKHJldHVybk1ldGhvZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGFuT2JqZWN0KHJldHVybk1ldGhvZC5jYWxsKGl0ZXJhdG9yKSkudmFsdWU7XG4gIH1cbn07XG4iLCAidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzQXJyYXlJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBpdGVyYXRvckNsb3NlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWNsb3NlJyk7XG5cbnZhciBSZXN1bHQgPSBmdW5jdGlvbiAoc3RvcHBlZCwgcmVzdWx0KSB7XG4gIHRoaXMuc3RvcHBlZCA9IHN0b3BwZWQ7XG4gIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIHVuYm91bmRGdW5jdGlvbiwgb3B0aW9ucykge1xuICB2YXIgdGhhdCA9IG9wdGlvbnMgJiYgb3B0aW9ucy50aGF0O1xuICB2YXIgQVNfRU5UUklFUyA9ICEhKG9wdGlvbnMgJiYgb3B0aW9ucy5BU19FTlRSSUVTKTtcbiAgdmFyIElTX0lURVJBVE9SID0gISEob3B0aW9ucyAmJiBvcHRpb25zLklTX0lURVJBVE9SKTtcbiAgdmFyIElOVEVSUlVQVEVEID0gISEob3B0aW9ucyAmJiBvcHRpb25zLklOVEVSUlVQVEVEKTtcbiAgdmFyIGZuID0gYmluZCh1bmJvdW5kRnVuY3Rpb24sIHRoYXQsIDEgKyBBU19FTlRSSUVTICsgSU5URVJSVVBURUQpO1xuICB2YXIgaXRlcmF0b3IsIGl0ZXJGbiwgaW5kZXgsIGxlbmd0aCwgcmVzdWx0LCBuZXh0LCBzdGVwO1xuXG4gIHZhciBzdG9wID0gZnVuY3Rpb24gKGNvbmRpdGlvbikge1xuICAgIGlmIChpdGVyYXRvcikgaXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgcmV0dXJuIG5ldyBSZXN1bHQodHJ1ZSwgY29uZGl0aW9uKTtcbiAgfTtcblxuICB2YXIgY2FsbEZuID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKEFTX0VOVFJJRVMpIHtcbiAgICAgIGFuT2JqZWN0KHZhbHVlKTtcbiAgICAgIHJldHVybiBJTlRFUlJVUFRFRCA/IGZuKHZhbHVlWzBdLCB2YWx1ZVsxXSwgc3RvcCkgOiBmbih2YWx1ZVswXSwgdmFsdWVbMV0pO1xuICAgIH0gcmV0dXJuIElOVEVSUlVQVEVEID8gZm4odmFsdWUsIHN0b3ApIDogZm4odmFsdWUpO1xuICB9O1xuXG4gIGlmIChJU19JVEVSQVRPUikge1xuICAgIGl0ZXJhdG9yID0gaXRlcmFibGU7XG4gIH0gZWxzZSB7XG4gICAgaXRlckZuID0gZ2V0SXRlcmF0b3JNZXRob2QoaXRlcmFibGUpO1xuICAgIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcignVGFyZ2V0IGlzIG5vdCBpdGVyYWJsZScpO1xuICAgIC8vIG9wdGltaXNhdGlvbiBmb3IgYXJyYXkgaXRlcmF0b3JzXG4gICAgaWYgKGlzQXJyYXlJdGVyYXRvck1ldGhvZChpdGVyRm4pKSB7XG4gICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgcmVzdWx0ID0gY2FsbEZuKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0IGluc3RhbmNlb2YgUmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgfSByZXR1cm4gbmV3IFJlc3VsdChmYWxzZSk7XG4gICAgfVxuICAgIGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpO1xuICB9XG5cbiAgbmV4dCA9IGl0ZXJhdG9yLm5leHQ7XG4gIHdoaWxlICghKHN0ZXAgPSBuZXh0LmNhbGwoaXRlcmF0b3IpKS5kb25lKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGNhbGxGbihzdGVwLnZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ29iamVjdCcgJiYgcmVzdWx0ICYmIHJlc3VsdCBpbnN0YW5jZW9mIFJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgfSByZXR1cm4gbmV3IFJlc3VsdChmYWxzZSk7XG59O1xuIiwgIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSkge1xuICBpZiAoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignSW5jb3JyZWN0ICcgKyAobmFtZSA/IG5hbWUgKyAnICcgOiAnJykgKyAnaW52b2NhdGlvbicpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCAidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciBjYWxsZWQgPSAwO1xuICB2YXIgaXRlcmF0b3JXaXRoUmV0dXJuID0ge1xuICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7IGRvbmU6ICEhY2FsbGVkKysgfTtcbiAgICB9LFxuICAgICdyZXR1cm4nOiBmdW5jdGlvbiAoKSB7XG4gICAgICBTQUZFX0NMT1NJTkcgPSB0cnVlO1xuICAgIH1cbiAgfTtcbiAgaXRlcmF0b3JXaXRoUmV0dXJuW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWFycmF5LWZyb20sIG5vLXRocm93LWxpdGVyYWwgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgQXJyYXkuZnJvbShpdGVyYXRvcldpdGhSZXR1cm4sIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIFNLSVBfQ0xPU0lORykge1xuICBpZiAoIVNLSVBfQ0xPU0lORyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBJVEVSQVRJT05fU1VQUE9SVCA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICBvYmplY3RbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB7IGRvbmU6IElURVJBVElPTl9TVVBQT1JUID0gdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgZXhlYyhvYmplY3QpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBJVEVSQVRJT05fU1VQUE9SVDtcbn07XG4iLCAidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG5cbi8vIG1ha2VzIHN1YmNsYXNzaW5nIHdvcmsgY29ycmVjdCBmb3Igd3JhcHBlZCBidWlsdC1pbnNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCR0aGlzLCBkdW1teSwgV3JhcHBlcikge1xuICB2YXIgTmV3VGFyZ2V0LCBOZXdUYXJnZXRQcm90b3R5cGU7XG4gIGlmIChcbiAgICAvLyBpdCBjYW4gd29yayBvbmx5IHdpdGggbmF0aXZlIGBzZXRQcm90b3R5cGVPZmBcbiAgICBzZXRQcm90b3R5cGVPZiAmJlxuICAgIC8vIHdlIGhhdmVuJ3QgY29tcGxldGVseSBjb3JyZWN0IHByZS1FUzYgd2F5IGZvciBnZXR0aW5nIGBuZXcudGFyZ2V0YCwgc28gdXNlIHRoaXNcbiAgICB0eXBlb2YgKE5ld1RhcmdldCA9IGR1bW15LmNvbnN0cnVjdG9yKSA9PSAnZnVuY3Rpb24nICYmXG4gICAgTmV3VGFyZ2V0ICE9PSBXcmFwcGVyICYmXG4gICAgaXNPYmplY3QoTmV3VGFyZ2V0UHJvdG90eXBlID0gTmV3VGFyZ2V0LnByb3RvdHlwZSkgJiZcbiAgICBOZXdUYXJnZXRQcm90b3R5cGUgIT09IFdyYXBwZXIucHJvdG90eXBlXG4gICkgc2V0UHJvdG90eXBlT2YoJHRoaXMsIE5ld1RhcmdldFByb3RvdHlwZSk7XG4gIHJldHVybiAkdGhpcztcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgSW50ZXJuYWxNZXRhZGF0YU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1tZXRhZGF0YScpO1xudmFyIGl0ZXJhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0ZScpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4taW5zdGFuY2UnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24nKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luaGVyaXQtaWYtcmVxdWlyZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09OU1RSVUNUT1JfTkFNRSwgd3JhcHBlciwgY29tbW9uKSB7XG4gIHZhciBJU19NQVAgPSBDT05TVFJVQ1RPUl9OQU1FLmluZGV4T2YoJ01hcCcpICE9PSAtMTtcbiAgdmFyIElTX1dFQUsgPSBDT05TVFJVQ1RPUl9OQU1FLmluZGV4T2YoJ1dlYWsnKSAhPT0gLTE7XG4gIHZhciBBRERFUiA9IElTX01BUCA/ICdzZXQnIDogJ2FkZCc7XG4gIHZhciBOYXRpdmVDb25zdHJ1Y3RvciA9IGdsb2JhbFtDT05TVFJVQ1RPUl9OQU1FXTtcbiAgdmFyIE5hdGl2ZVByb3RvdHlwZSA9IE5hdGl2ZUNvbnN0cnVjdG9yICYmIE5hdGl2ZUNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgdmFyIENvbnN0cnVjdG9yID0gTmF0aXZlQ29uc3RydWN0b3I7XG4gIHZhciBleHBvcnRlZCA9IHt9O1xuXG4gIHZhciBmaXhNZXRob2QgPSBmdW5jdGlvbiAoS0VZKSB7XG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IE5hdGl2ZVByb3RvdHlwZVtLRVldO1xuICAgIHJlZGVmaW5lKE5hdGl2ZVByb3RvdHlwZSwgS0VZLFxuICAgICAgS0VZID09ICdhZGQnID8gZnVuY3Rpb24gYWRkKHZhbHVlKSB7XG4gICAgICAgIG5hdGl2ZU1ldGhvZC5jYWxsKHRoaXMsIHZhbHVlID09PSAwID8gMCA6IHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9IDogS0VZID09ICdkZWxldGUnID8gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3Qoa2V5KSA/IGZhbHNlIDogbmF0aXZlTWV0aG9kLmNhbGwodGhpcywga2V5ID09PSAwID8gMCA6IGtleSk7XG4gICAgICB9IDogS0VZID09ICdnZXQnID8gZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3Qoa2V5KSA/IHVuZGVmaW5lZCA6IG5hdGl2ZU1ldGhvZC5jYWxsKHRoaXMsIGtleSA9PT0gMCA/IDAgOiBrZXkpO1xuICAgICAgfSA6IEtFWSA9PSAnaGFzJyA/IGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIElTX1dFQUsgJiYgIWlzT2JqZWN0KGtleSkgPyBmYWxzZSA6IG5hdGl2ZU1ldGhvZC5jYWxsKHRoaXMsIGtleSA9PT0gMCA/IDAgOiBrZXkpO1xuICAgICAgfSA6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIG5hdGl2ZU1ldGhvZC5jYWxsKHRoaXMsIGtleSA9PT0gMCA/IDAgOiBrZXksIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgKTtcbiAgfTtcblxuICB2YXIgUkVQTEFDRSA9IGlzRm9yY2VkKFxuICAgIENPTlNUUlVDVE9SX05BTUUsXG4gICAgdHlwZW9mIE5hdGl2ZUNvbnN0cnVjdG9yICE9ICdmdW5jdGlvbicgfHwgIShJU19XRUFLIHx8IE5hdGl2ZVByb3RvdHlwZS5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgICBuZXcgTmF0aXZlQ29uc3RydWN0b3IoKS5lbnRyaWVzKCkubmV4dCgpO1xuICAgIH0pKVxuICApO1xuXG4gIGlmIChSRVBMQUNFKSB7XG4gICAgLy8gY3JlYXRlIGNvbGxlY3Rpb24gY29uc3RydWN0b3JcbiAgICBDb25zdHJ1Y3RvciA9IGNvbW1vbi5nZXRDb25zdHJ1Y3Rvcih3cmFwcGVyLCBDT05TVFJVQ1RPUl9OQU1FLCBJU19NQVAsIEFEREVSKTtcbiAgICBJbnRlcm5hbE1ldGFkYXRhTW9kdWxlLlJFUVVJUkVEID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0ZvcmNlZChDT05TVFJVQ1RPUl9OQU1FLCB0cnVlKSkge1xuICAgIHZhciBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgIC8vIGVhcmx5IGltcGxlbWVudGF0aW9ucyBub3Qgc3VwcG9ydHMgY2hhaW5pbmdcbiAgICB2YXIgSEFTTlRfQ0hBSU5JTkcgPSBpbnN0YW5jZVtBRERFUl0oSVNfV0VBSyA/IHt9IDogLTAsIDEpICE9IGluc3RhbmNlO1xuICAgIC8vIFY4IH4gQ2hyb21pdW0gNDAtIHdlYWstY29sbGVjdGlvbnMgdGhyb3dzIG9uIHByaW1pdGl2ZXMsIGJ1dCBzaG91bGQgcmV0dXJuIGZhbHNlXG4gICAgdmFyIFRIUk9XU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24gKCkgeyBpbnN0YW5jZS5oYXMoMSk7IH0pO1xuICAgIC8vIG1vc3QgZWFybHkgaW1wbGVtZW50YXRpb25zIGRvZXNuJ3Qgc3VwcG9ydHMgaXRlcmFibGVzLCBtb3N0IG1vZGVybiAtIG5vdCBjbG9zZSBpdCBjb3JyZWN0bHlcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgdmFyIEFDQ0VQVF9JVEVSQUJMRVMgPSBjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24oZnVuY3Rpb24gKGl0ZXJhYmxlKSB7IG5ldyBOYXRpdmVDb25zdHJ1Y3RvcihpdGVyYWJsZSk7IH0pO1xuICAgIC8vIGZvciBlYXJseSBpbXBsZW1lbnRhdGlvbnMgLTAgYW5kICswIG5vdCB0aGUgc2FtZVxuICAgIHZhciBCVUdHWV9aRVJPID0gIUlTX1dFQUsgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgICAgLy8gVjggfiBDaHJvbWl1bSA0Mi0gZmFpbHMgb25seSB3aXRoIDUrIGVsZW1lbnRzXG4gICAgICB2YXIgJGluc3RhbmNlID0gbmV3IE5hdGl2ZUNvbnN0cnVjdG9yKCk7XG4gICAgICB2YXIgaW5kZXggPSA1O1xuICAgICAgd2hpbGUgKGluZGV4LS0pICRpbnN0YW5jZVtBRERFUl0oaW5kZXgsIGluZGV4KTtcbiAgICAgIHJldHVybiAhJGluc3RhbmNlLmhhcygtMCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIUFDQ0VQVF9JVEVSQUJMRVMpIHtcbiAgICAgIENvbnN0cnVjdG9yID0gd3JhcHBlcihmdW5jdGlvbiAoZHVtbXksIGl0ZXJhYmxlKSB7XG4gICAgICAgIGFuSW5zdGFuY2UoZHVtbXksIENvbnN0cnVjdG9yLCBDT05TVFJVQ1RPUl9OQU1FKTtcbiAgICAgICAgdmFyIHRoYXQgPSBpbmhlcml0SWZSZXF1aXJlZChuZXcgTmF0aXZlQ29uc3RydWN0b3IoKSwgZHVtbXksIENvbnN0cnVjdG9yKTtcbiAgICAgICAgaWYgKGl0ZXJhYmxlICE9IHVuZGVmaW5lZCkgaXRlcmF0ZShpdGVyYWJsZSwgdGhhdFtBRERFUl0sIHsgdGhhdDogdGhhdCwgQVNfRU5UUklFUzogSVNfTUFQIH0pO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICAgIH0pO1xuICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gTmF0aXZlUHJvdG90eXBlO1xuICAgICAgTmF0aXZlUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29uc3RydWN0b3I7XG4gICAgfVxuXG4gICAgaWYgKFRIUk9XU19PTl9QUklNSVRJVkVTIHx8IEJVR0dZX1pFUk8pIHtcbiAgICAgIGZpeE1ldGhvZCgnZGVsZXRlJyk7XG4gICAgICBmaXhNZXRob2QoJ2hhcycpO1xuICAgICAgSVNfTUFQICYmIGZpeE1ldGhvZCgnZ2V0Jyk7XG4gICAgfVxuXG4gICAgaWYgKEJVR0dZX1pFUk8gfHwgSEFTTlRfQ0hBSU5JTkcpIGZpeE1ldGhvZChBRERFUik7XG5cbiAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIHNob3VsZCBub3QgY29udGFpbnMgLmNsZWFyIG1ldGhvZFxuICAgIGlmIChJU19XRUFLICYmIE5hdGl2ZVByb3RvdHlwZS5jbGVhcikgZGVsZXRlIE5hdGl2ZVByb3RvdHlwZS5jbGVhcjtcbiAgfVxuXG4gIGV4cG9ydGVkW0NPTlNUUlVDVE9SX05BTUVdID0gQ29uc3RydWN0b3I7XG4gICQoeyBnbG9iYWw6IHRydWUsIGZvcmNlZDogQ29uc3RydWN0b3IgIT0gTmF0aXZlQ29uc3RydWN0b3IgfSwgZXhwb3J0ZWQpO1xuXG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBDT05TVFJVQ1RPUl9OQU1FKTtcblxuICBpZiAoIUlTX1dFQUspIGNvbW1vbi5zZXRTdHJvbmcoQ29uc3RydWN0b3IsIENPTlNUUlVDVE9SX05BTUUsIElTX01BUCk7XG5cbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUtYWxsJyk7XG52YXIgZ2V0V2Vha0RhdGEgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtbWV0YWRhdGEnKS5nZXRXZWFrRGF0YTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLWluc3RhbmNlJyk7XG52YXIgaXRlcmF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRlJyk7XG52YXIgQXJyYXlJdGVyYXRpb25Nb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJyk7XG52YXIgJGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgaW50ZXJuYWxTdGF0ZUdldHRlckZvciA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yO1xudmFyIGZpbmQgPSBBcnJheUl0ZXJhdGlvbk1vZHVsZS5maW5kO1xudmFyIGZpbmRJbmRleCA9IEFycmF5SXRlcmF0aW9uTW9kdWxlLmZpbmRJbmRleDtcbnZhciBpZCA9IDA7XG5cbi8vIGZhbGxiYWNrIGZvciB1bmNhdWdodCBmcm96ZW4ga2V5c1xudmFyIHVuY2F1Z2h0RnJvemVuU3RvcmUgPSBmdW5jdGlvbiAoc3RvcmUpIHtcbiAgcmV0dXJuIHN0b3JlLmZyb3plbiB8fCAoc3RvcmUuZnJvemVuID0gbmV3IFVuY2F1Z2h0RnJvemVuU3RvcmUoKSk7XG59O1xuXG52YXIgVW5jYXVnaHRGcm96ZW5TdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbnRyaWVzID0gW107XG59O1xuXG52YXIgZmluZFVuY2F1Z2h0RnJvemVuID0gZnVuY3Rpb24gKHN0b3JlLCBrZXkpIHtcbiAgcmV0dXJuIGZpbmQoc3RvcmUuZW50cmllcywgZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGl0WzBdID09PSBrZXk7XG4gIH0pO1xufTtcblxuVW5jYXVnaHRGcm96ZW5TdG9yZS5wcm90b3R5cGUgPSB7XG4gIGdldDogZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBlbnRyeSA9IGZpbmRVbmNhdWdodEZyb3plbih0aGlzLCBrZXkpO1xuICAgIGlmIChlbnRyeSkgcmV0dXJuIGVudHJ5WzFdO1xuICB9LFxuICBoYXM6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gISFmaW5kVW5jYXVnaHRGcm96ZW4odGhpcywga2V5KTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgIHZhciBlbnRyeSA9IGZpbmRVbmNhdWdodEZyb3plbih0aGlzLCBrZXkpO1xuICAgIGlmIChlbnRyeSkgZW50cnlbMV0gPSB2YWx1ZTtcbiAgICBlbHNlIHRoaXMuZW50cmllcy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0sXG4gICdkZWxldGUnOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGluZGV4ID0gZmluZEluZGV4KHRoaXMuZW50cmllcywgZnVuY3Rpb24gKGl0KSB7XG4gICAgICByZXR1cm4gaXRbMF0gPT09IGtleTtcbiAgICB9KTtcbiAgICBpZiAofmluZGV4KSB0aGlzLmVudHJpZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gISF+aW5kZXg7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24gKHdyYXBwZXIsIENPTlNUUlVDVE9SX05BTUUsIElTX01BUCwgQURERVIpIHtcbiAgICB2YXIgQyA9IHdyYXBwZXIoZnVuY3Rpb24gKHRoYXQsIGl0ZXJhYmxlKSB7XG4gICAgICBhbkluc3RhbmNlKHRoYXQsIEMsIENPTlNUUlVDVE9SX05BTUUpO1xuICAgICAgc2V0SW50ZXJuYWxTdGF0ZSh0aGF0LCB7XG4gICAgICAgIHR5cGU6IENPTlNUUlVDVE9SX05BTUUsXG4gICAgICAgIGlkOiBpZCsrLFxuICAgICAgICBmcm96ZW46IHVuZGVmaW5lZFxuICAgICAgfSk7XG4gICAgICBpZiAoaXRlcmFibGUgIT0gdW5kZWZpbmVkKSBpdGVyYXRlKGl0ZXJhYmxlLCB0aGF0W0FEREVSXSwgeyB0aGF0OiB0aGF0LCBBU19FTlRSSUVTOiBJU19NQVAgfSk7XG4gICAgfSk7XG5cbiAgICB2YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IGludGVybmFsU3RhdGVHZXR0ZXJGb3IoQ09OU1RSVUNUT1JfTkFNRSk7XG5cbiAgICB2YXIgZGVmaW5lID0gZnVuY3Rpb24gKHRoYXQsIGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhhdCk7XG4gICAgICB2YXIgZGF0YSA9IGdldFdlYWtEYXRhKGFuT2JqZWN0KGtleSksIHRydWUpO1xuICAgICAgaWYgKGRhdGEgPT09IHRydWUpIHVuY2F1Z2h0RnJvemVuU3RvcmUoc3RhdGUpLnNldChrZXksIHZhbHVlKTtcbiAgICAgIGVsc2UgZGF0YVtzdGF0ZS5pZF0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG5cbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwge1xuICAgICAgLy8gYHsgV2Vha01hcCwgV2Vha1NldCB9LnByb3RvdHlwZS5kZWxldGUoa2V5KWAgbWV0aG9kc1xuICAgICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy13ZWFrbWFwLnByb3RvdHlwZS5kZWxldGVcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtd2Vha3NldC5wcm90b3R5cGUuZGVsZXRlXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICAgICAgICBpZiAoIWlzT2JqZWN0KGtleSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGRhdGEgPSBnZXRXZWFrRGF0YShrZXkpO1xuICAgICAgICBpZiAoZGF0YSA9PT0gdHJ1ZSkgcmV0dXJuIHVuY2F1Z2h0RnJvemVuU3RvcmUoc3RhdGUpWydkZWxldGUnXShrZXkpO1xuICAgICAgICByZXR1cm4gZGF0YSAmJiAkaGFzKGRhdGEsIHN0YXRlLmlkKSAmJiBkZWxldGUgZGF0YVtzdGF0ZS5pZF07XG4gICAgICB9LFxuICAgICAgLy8gYHsgV2Vha01hcCwgV2Vha1NldCB9LnByb3RvdHlwZS5oYXMoa2V5KWAgbWV0aG9kc1xuICAgICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy13ZWFrbWFwLnByb3RvdHlwZS5oYXNcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtd2Vha3NldC5wcm90b3R5cGUuaGFzXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgICAgICAgaWYgKCFpc09iamVjdChrZXkpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBkYXRhID0gZ2V0V2Vha0RhdGEoa2V5KTtcbiAgICAgICAgaWYgKGRhdGEgPT09IHRydWUpIHJldHVybiB1bmNhdWdodEZyb3plblN0b3JlKHN0YXRlKS5oYXMoa2V5KTtcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgJGhhcyhkYXRhLCBzdGF0ZS5pZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwgSVNfTUFQID8ge1xuICAgICAgLy8gYFdlYWtNYXAucHJvdG90eXBlLmdldChrZXkpYCBtZXRob2RcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtd2Vha21hcC5wcm90b3R5cGUuZ2V0XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgICAgICAgaWYgKGlzT2JqZWN0KGtleSkpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGdldFdlYWtEYXRhKGtleSk7XG4gICAgICAgICAgaWYgKGRhdGEgPT09IHRydWUpIHJldHVybiB1bmNhdWdodEZyb3plblN0b3JlKHN0YXRlKS5nZXQoa2V5KTtcbiAgICAgICAgICByZXR1cm4gZGF0YSA/IGRhdGFbc3RhdGUuaWRdIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gYFdlYWtNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKWAgbWV0aG9kXG4gICAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXdlYWttYXAucHJvdG90eXBlLnNldFxuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZGVmaW5lKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gOiB7XG4gICAgICAvLyBgV2Vha1NldC5wcm90b3R5cGUuYWRkKHZhbHVlKWAgbWV0aG9kXG4gICAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXdlYWtzZXQucHJvdG90eXBlLmFkZFxuICAgICAgYWRkOiBmdW5jdGlvbiBhZGQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGRlZmluZSh0aGlzLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gQztcbiAgfVxufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lLWFsbCcpO1xudmFyIEludGVybmFsTWV0YWRhdGFNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtbWV0YWRhdGEnKTtcbnZhciBjb2xsZWN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvbGxlY3Rpb24nKTtcbnZhciBjb2xsZWN0aW9uV2VhayA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb2xsZWN0aW9uLXdlYWsnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBlbmZvcmNlSXRlcm5hbFN0YXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJykuZW5mb3JjZTtcbnZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwJyk7XG5cbnZhciBJU19JRTExID0gIWdsb2JhbC5BY3RpdmVYT2JqZWN0ICYmICdBY3RpdmVYT2JqZWN0JyBpbiBnbG9iYWw7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWlzZXh0ZW5zaWJsZSAtLSBzYWZlXG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZTtcbnZhciBJbnRlcm5hbFdlYWtNYXA7XG5cbnZhciB3cmFwcGVyID0gZnVuY3Rpb24gKGluaXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIFdlYWtNYXAoKSB7XG4gICAgcmV0dXJuIGluaXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gIH07XG59O1xuXG4vLyBgV2Vha01hcGAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtd2Vha21hcC1jb25zdHJ1Y3RvclxudmFyICRXZWFrTWFwID0gbW9kdWxlLmV4cG9ydHMgPSBjb2xsZWN0aW9uKCdXZWFrTWFwJywgd3JhcHBlciwgY29sbGVjdGlvbldlYWspO1xuXG4vLyBJRTExIFdlYWtNYXAgZnJvemVuIGtleXMgZml4XG4vLyBXZSBjYW4ndCB1c2UgZmVhdHVyZSBkZXRlY3Rpb24gYmVjYXVzZSBpdCBjcmFzaCBzb21lIG9sZCBJRSBidWlsZHNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy80ODVcbmlmIChOQVRJVkVfV0VBS19NQVAgJiYgSVNfSUUxMSkge1xuICBJbnRlcm5hbFdlYWtNYXAgPSBjb2xsZWN0aW9uV2Vhay5nZXRDb25zdHJ1Y3Rvcih3cmFwcGVyLCAnV2Vha01hcCcsIHRydWUpO1xuICBJbnRlcm5hbE1ldGFkYXRhTW9kdWxlLlJFUVVJUkVEID0gdHJ1ZTtcbiAgdmFyIFdlYWtNYXBQcm90b3R5cGUgPSAkV2Vha01hcC5wcm90b3R5cGU7XG4gIHZhciBuYXRpdmVEZWxldGUgPSBXZWFrTWFwUHJvdG90eXBlWydkZWxldGUnXTtcbiAgdmFyIG5hdGl2ZUhhcyA9IFdlYWtNYXBQcm90b3R5cGUuaGFzO1xuICB2YXIgbmF0aXZlR2V0ID0gV2Vha01hcFByb3RvdHlwZS5nZXQ7XG4gIHZhciBuYXRpdmVTZXQgPSBXZWFrTWFwUHJvdG90eXBlLnNldDtcbiAgcmVkZWZpbmVBbGwoV2Vha01hcFByb3RvdHlwZSwge1xuICAgICdkZWxldGUnOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoaXNPYmplY3Qoa2V5KSAmJiAhaXNFeHRlbnNpYmxlKGtleSkpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gZW5mb3JjZUl0ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgICAgICAgaWYgKCFzdGF0ZS5mcm96ZW4pIHN0YXRlLmZyb3plbiA9IG5ldyBJbnRlcm5hbFdlYWtNYXAoKTtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZURlbGV0ZS5jYWxsKHRoaXMsIGtleSkgfHwgc3RhdGUuZnJvemVuWydkZWxldGUnXShrZXkpO1xuICAgICAgfSByZXR1cm4gbmF0aXZlRGVsZXRlLmNhbGwodGhpcywga2V5KTtcbiAgICB9LFxuICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSkge1xuICAgICAgaWYgKGlzT2JqZWN0KGtleSkgJiYgIWlzRXh0ZW5zaWJsZShrZXkpKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IGVuZm9yY2VJdGVybmFsU3RhdGUodGhpcyk7XG4gICAgICAgIGlmICghc3RhdGUuZnJvemVuKSBzdGF0ZS5mcm96ZW4gPSBuZXcgSW50ZXJuYWxXZWFrTWFwKCk7XG4gICAgICAgIHJldHVybiBuYXRpdmVIYXMuY2FsbCh0aGlzLCBrZXkpIHx8IHN0YXRlLmZyb3plbi5oYXMoa2V5KTtcbiAgICAgIH0gcmV0dXJuIG5hdGl2ZUhhcy5jYWxsKHRoaXMsIGtleSk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgIGlmIChpc09iamVjdChrZXkpICYmICFpc0V4dGVuc2libGUoa2V5KSkge1xuICAgICAgICB2YXIgc3RhdGUgPSBlbmZvcmNlSXRlcm5hbFN0YXRlKHRoaXMpO1xuICAgICAgICBpZiAoIXN0YXRlLmZyb3plbikgc3RhdGUuZnJvemVuID0gbmV3IEludGVybmFsV2Vha01hcCgpO1xuICAgICAgICByZXR1cm4gbmF0aXZlSGFzLmNhbGwodGhpcywga2V5KSA/IG5hdGl2ZUdldC5jYWxsKHRoaXMsIGtleSkgOiBzdGF0ZS5mcm96ZW4uZ2V0KGtleSk7XG4gICAgICB9IHJldHVybiBuYXRpdmVHZXQuY2FsbCh0aGlzLCBrZXkpO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKGlzT2JqZWN0KGtleSkgJiYgIWlzRXh0ZW5zaWJsZShrZXkpKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IGVuZm9yY2VJdGVybmFsU3RhdGUodGhpcyk7XG4gICAgICAgIGlmICghc3RhdGUuZnJvemVuKSBzdGF0ZS5mcm96ZW4gPSBuZXcgSW50ZXJuYWxXZWFrTWFwKCk7XG4gICAgICAgIG5hdGl2ZUhhcy5jYWxsKHRoaXMsIGtleSkgPyBuYXRpdmVTZXQuY2FsbCh0aGlzLCBrZXksIHZhbHVlKSA6IHN0YXRlLmZyb3plbi5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgbmF0aXZlU2V0LmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDT05TVFJVQ1RPUl9OQU1FKSB7XG4gIHZhciBDb25zdHJ1Y3RvciA9IGdldEJ1aWx0SW4oQ09OU1RSVUNUT1JfTkFNRSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG5cbiAgaWYgKERFU0NSSVBUT1JTICYmIENvbnN0cnVjdG9yICYmICFDb25zdHJ1Y3RvcltTUEVDSUVTXSkge1xuICAgIGRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBTUEVDSUVTLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICB9KTtcbiAgfVxufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciByZWRlZmluZUFsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZS1hbGwnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4taW5zdGFuY2UnKTtcbnZhciBpdGVyYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdGUnKTtcbnZhciBkZWZpbmVJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3InKTtcbnZhciBzZXRTcGVjaWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1zcGVjaWVzJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYXN0S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLW1ldGFkYXRhJykuZmFzdEtleTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgaW50ZXJuYWxTdGF0ZUdldHRlckZvciA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uICh3cmFwcGVyLCBDT05TVFJVQ1RPUl9OQU1FLCBJU19NQVAsIEFEREVSKSB7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uICh0aGF0LCBpdGVyYWJsZSkge1xuICAgICAgYW5JbnN0YW5jZSh0aGF0LCBDLCBDT05TVFJVQ1RPUl9OQU1FKTtcbiAgICAgIHNldEludGVybmFsU3RhdGUodGhhdCwge1xuICAgICAgICB0eXBlOiBDT05TVFJVQ1RPUl9OQU1FLFxuICAgICAgICBpbmRleDogY3JlYXRlKG51bGwpLFxuICAgICAgICBmaXJzdDogdW5kZWZpbmVkLFxuICAgICAgICBsYXN0OiB1bmRlZmluZWQsXG4gICAgICAgIHNpemU6IDBcbiAgICAgIH0pO1xuICAgICAgaWYgKCFERVNDUklQVE9SUykgdGhhdC5zaXplID0gMDtcbiAgICAgIGlmIChpdGVyYWJsZSAhPSB1bmRlZmluZWQpIGl0ZXJhdGUoaXRlcmFibGUsIHRoYXRbQURERVJdLCB7IHRoYXQ6IHRoYXQsIEFTX0VOVFJJRVM6IElTX01BUCB9KTtcbiAgICB9KTtcblxuICAgIHZhciBnZXRJbnRlcm5hbFN0YXRlID0gaW50ZXJuYWxTdGF0ZUdldHRlckZvcihDT05TVFJVQ1RPUl9OQU1FKTtcblxuICAgIHZhciBkZWZpbmUgPSBmdW5jdGlvbiAodGhhdCwga2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGF0KTtcbiAgICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSk7XG4gICAgICB2YXIgcHJldmlvdXMsIGluZGV4O1xuICAgICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgZW50cnkudmFsdWUgPSB2YWx1ZTtcbiAgICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLmxhc3QgPSBlbnRyeSA9IHtcbiAgICAgICAgICBpbmRleDogaW5kZXggPSBmYXN0S2V5KGtleSwgdHJ1ZSksXG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIHByZXZpb3VzOiBwcmV2aW91cyA9IHN0YXRlLmxhc3QsXG4gICAgICAgICAgbmV4dDogdW5kZWZpbmVkLFxuICAgICAgICAgIHJlbW92ZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIGlmICghc3RhdGUuZmlyc3QpIHN0YXRlLmZpcnN0ID0gZW50cnk7XG4gICAgICAgIGlmIChwcmV2aW91cykgcHJldmlvdXMubmV4dCA9IGVudHJ5O1xuICAgICAgICBpZiAoREVTQ1JJUFRPUlMpIHN0YXRlLnNpemUrKztcbiAgICAgICAgZWxzZSB0aGF0LnNpemUrKztcbiAgICAgICAgLy8gYWRkIHRvIGluZGV4XG4gICAgICAgIGlmIChpbmRleCAhPT0gJ0YnKSBzdGF0ZS5pbmRleFtpbmRleF0gPSBlbnRyeTtcbiAgICAgIH0gcmV0dXJuIHRoYXQ7XG4gICAgfTtcblxuICAgIHZhciBnZXRFbnRyeSA9IGZ1bmN0aW9uICh0aGF0LCBrZXkpIHtcbiAgICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhhdCk7XG4gICAgICAvLyBmYXN0IGNhc2VcbiAgICAgIHZhciBpbmRleCA9IGZhc3RLZXkoa2V5KTtcbiAgICAgIHZhciBlbnRyeTtcbiAgICAgIGlmIChpbmRleCAhPT0gJ0YnKSByZXR1cm4gc3RhdGUuaW5kZXhbaW5kZXhdO1xuICAgICAgLy8gZnJvemVuIG9iamVjdCBjYXNlXG4gICAgICBmb3IgKGVudHJ5ID0gc3RhdGUuZmlyc3Q7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm5leHQpIHtcbiAgICAgICAgaWYgKGVudHJ5LmtleSA9PSBrZXkpIHJldHVybiBlbnRyeTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIGB7IE1hcCwgU2V0IH0ucHJvdG90eXBlLmNsZWFyKClgIG1ldGhvZHNcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWFwLnByb3RvdHlwZS5jbGVhclxuICAgICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zZXQucHJvdG90eXBlLmNsZWFyXG4gICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGF0KTtcbiAgICAgICAgdmFyIGRhdGEgPSBzdGF0ZS5pbmRleDtcbiAgICAgICAgdmFyIGVudHJ5ID0gc3RhdGUuZmlyc3Q7XG4gICAgICAgIHdoaWxlIChlbnRyeSkge1xuICAgICAgICAgIGVudHJ5LnJlbW92ZWQgPSB0cnVlO1xuICAgICAgICAgIGlmIChlbnRyeS5wcmV2aW91cykgZW50cnkucHJldmlvdXMgPSBlbnRyeS5wcmV2aW91cy5uZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2VudHJ5LmluZGV4XTtcbiAgICAgICAgICBlbnRyeSA9IGVudHJ5Lm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUuZmlyc3QgPSBzdGF0ZS5sYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoREVTQ1JJUFRPUlMpIHN0YXRlLnNpemUgPSAwO1xuICAgICAgICBlbHNlIHRoYXQuc2l6ZSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gYHsgTWFwLCBTZXQgfS5wcm90b3R5cGUuZGVsZXRlKGtleSlgIG1ldGhvZHNcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWFwLnByb3RvdHlwZS5kZWxldGVcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc2V0LnByb3RvdHlwZS5kZWxldGVcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGF0KTtcbiAgICAgICAgdmFyIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KTtcbiAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uZXh0O1xuICAgICAgICAgIHZhciBwcmV2ID0gZW50cnkucHJldmlvdXM7XG4gICAgICAgICAgZGVsZXRlIHN0YXRlLmluZGV4W2VudHJ5LmluZGV4XTtcbiAgICAgICAgICBlbnRyeS5yZW1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAocHJldikgcHJldi5uZXh0ID0gbmV4dDtcbiAgICAgICAgICBpZiAobmV4dCkgbmV4dC5wcmV2aW91cyA9IHByZXY7XG4gICAgICAgICAgaWYgKHN0YXRlLmZpcnN0ID09IGVudHJ5KSBzdGF0ZS5maXJzdCA9IG5leHQ7XG4gICAgICAgICAgaWYgKHN0YXRlLmxhc3QgPT0gZW50cnkpIHN0YXRlLmxhc3QgPSBwcmV2O1xuICAgICAgICAgIGlmIChERVNDUklQVE9SUykgc3RhdGUuc2l6ZS0tO1xuICAgICAgICAgIGVsc2UgdGhhdC5zaXplLS07XG4gICAgICAgIH0gcmV0dXJuICEhZW50cnk7XG4gICAgICB9LFxuICAgICAgLy8gYHsgTWFwLCBTZXQgfS5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKWAgbWV0aG9kc1xuICAgICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXAucHJvdG90eXBlLmZvcmVhY2hcbiAgICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc2V0LnByb3RvdHlwZS5mb3JlYWNoXG4gICAgICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGF0ID0gdW5kZWZpbmVkICovKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gICAgICAgIHZhciBib3VuZEZ1bmN0aW9uID0gYmluZChjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMyk7XG4gICAgICAgIHZhciBlbnRyeTtcbiAgICAgICAgd2hpbGUgKGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uZXh0IDogc3RhdGUuZmlyc3QpIHtcbiAgICAgICAgICBib3VuZEZ1bmN0aW9uKGVudHJ5LnZhbHVlLCBlbnRyeS5rZXksIHRoaXMpO1xuICAgICAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgICAgIHdoaWxlIChlbnRyeSAmJiBlbnRyeS5yZW1vdmVkKSBlbnRyeSA9IGVudHJ5LnByZXZpb3VzO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gYHsgTWFwLCBTZXR9LnByb3RvdHlwZS5oYXMoa2V5KWAgbWV0aG9kc1xuICAgICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXAucHJvdG90eXBlLmhhc1xuICAgICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zZXQucHJvdG90eXBlLmhhc1xuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwgSVNfTUFQID8ge1xuICAgICAgLy8gYE1hcC5wcm90b3R5cGUuZ2V0KGtleSlgIG1ldGhvZFxuICAgICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXAucHJvdG90eXBlLmdldFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS52YWx1ZTtcbiAgICAgIH0sXG4gICAgICAvLyBgTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlgIG1ldGhvZFxuICAgICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXAucHJvdG90eXBlLnNldFxuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZGVmaW5lKHRoaXMsIGtleSA9PT0gMCA/IDAgOiBrZXksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IDoge1xuICAgICAgLy8gYFNldC5wcm90b3R5cGUuYWRkKHZhbHVlKWAgbWV0aG9kXG4gICAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXNldC5wcm90b3R5cGUuYWRkXG4gICAgICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZGVmaW5lKHRoaXMsIHZhbHVlID0gdmFsdWUgPT09IDAgPyAwIDogdmFsdWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoREVTQ1JJUFRPUlMpIGRlZmluZVByb3BlcnR5KEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zaXplO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBzZXRTdHJvbmc6IGZ1bmN0aW9uIChDLCBDT05TVFJVQ1RPUl9OQU1FLCBJU19NQVApIHtcbiAgICB2YXIgSVRFUkFUT1JfTkFNRSA9IENPTlNUUlVDVE9SX05BTUUgKyAnIEl0ZXJhdG9yJztcbiAgICB2YXIgZ2V0SW50ZXJuYWxDb2xsZWN0aW9uU3RhdGUgPSBpbnRlcm5hbFN0YXRlR2V0dGVyRm9yKENPTlNUUlVDVE9SX05BTUUpO1xuICAgIHZhciBnZXRJbnRlcm5hbEl0ZXJhdG9yU3RhdGUgPSBpbnRlcm5hbFN0YXRlR2V0dGVyRm9yKElURVJBVE9SX05BTUUpO1xuICAgIC8vIGB7IE1hcCwgU2V0IH0ucHJvdG90eXBlLnsga2V5cywgdmFsdWVzLCBlbnRyaWVzLCBAQGl0ZXJhdG9yIH0oKWAgbWV0aG9kc1xuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWFwLnByb3RvdHlwZS5lbnRyaWVzXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXAucHJvdG90eXBlLmtleXNcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW1hcC5wcm90b3R5cGUudmFsdWVzXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXAucHJvdG90eXBlLUBAaXRlcmF0b3JcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXNldC5wcm90b3R5cGUuZW50cmllc1xuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc2V0LnByb3RvdHlwZS5rZXlzXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zZXQucHJvdG90eXBlLnZhbHVlc1xuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc2V0LnByb3RvdHlwZS1AQGl0ZXJhdG9yXG4gICAgZGVmaW5lSXRlcmF0b3IoQywgQ09OU1RSVUNUT1JfTkFNRSwgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gICAgICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICAgICAgdHlwZTogSVRFUkFUT1JfTkFNRSxcbiAgICAgICAgdGFyZ2V0OiBpdGVyYXRlZCxcbiAgICAgICAgc3RhdGU6IGdldEludGVybmFsQ29sbGVjdGlvblN0YXRlKGl0ZXJhdGVkKSxcbiAgICAgICAga2luZDoga2luZCxcbiAgICAgICAgbGFzdDogdW5kZWZpbmVkXG4gICAgICB9KTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbEl0ZXJhdG9yU3RhdGUodGhpcyk7XG4gICAgICB2YXIga2luZCA9IHN0YXRlLmtpbmQ7XG4gICAgICB2YXIgZW50cnkgPSBzdGF0ZS5sYXN0O1xuICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICB3aGlsZSAoZW50cnkgJiYgZW50cnkucmVtb3ZlZCkgZW50cnkgPSBlbnRyeS5wcmV2aW91cztcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZiAoIXN0YXRlLnRhcmdldCB8fCAhKHN0YXRlLmxhc3QgPSBlbnRyeSA9IGVudHJ5ID8gZW50cnkubmV4dCA6IHN0YXRlLnN0YXRlLmZpcnN0KSkge1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICBzdGF0ZS50YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcbiAgICAgIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHsgdmFsdWU6IGVudHJ5LmtleSwgZG9uZTogZmFsc2UgfTtcbiAgICAgIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4geyB2YWx1ZTogZW50cnkudmFsdWUsIGRvbmU6IGZhbHNlIH07XG4gICAgICByZXR1cm4geyB2YWx1ZTogW2VudHJ5LmtleSwgZW50cnkudmFsdWVdLCBkb25lOiBmYWxzZSB9O1xuICAgIH0sIElTX01BUCA/ICdlbnRyaWVzJyA6ICd2YWx1ZXMnLCAhSVNfTUFQLCB0cnVlKTtcblxuICAgIC8vIGB7IE1hcCwgU2V0IH0ucHJvdG90eXBlW0BAc3BlY2llc11gIGFjY2Vzc29yc1xuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0LW1hcC1AQHNwZWNpZXNcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1zZXQtQEBzcGVjaWVzXG4gICAgc2V0U3BlY2llcyhDT05TVFJVQ1RPUl9OQU1FKTtcbiAgfVxufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgY29sbGVjdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb2xsZWN0aW9uJyk7XG52YXIgY29sbGVjdGlvblN0cm9uZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb2xsZWN0aW9uLXN0cm9uZycpO1xuXG4vLyBgTWFwYCBjb25zdHJ1Y3RvclxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXAtb2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSBjb2xsZWN0aW9uKCdNYXAnLCBmdW5jdGlvbiAoaW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gTWFwKCkgeyByZXR1cm4gaW5pdCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIGNvbGxlY3Rpb25TdHJvbmcpO1xuIiwgInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBNQVRDSCA9IHdlbGxLbm93blN5bWJvbCgnbWF0Y2gnKTtcblxuLy8gYElzUmVnRXhwYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNyZWdleHBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpc1JlZ0V4cDtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAoKGlzUmVnRXhwID0gaXRbTUFUQ0hdKSAhPT0gdW5kZWZpbmVkID8gISFpc1JlZ0V4cCA6IGNsYXNzb2YoaXQpID09ICdSZWdFeHAnKTtcbn07XG4iLCAidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbi8vIGBTcGVjaWVzQ29uc3RydWN0b3JgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zcGVjaWVzY29uc3RydWN0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGRlZmF1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBkZWZhdWx0Q29uc3RydWN0b3IgOiBhRnVuY3Rpb24oUyk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBmaXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljJyk7XG52YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcmVnZXhwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGNhbGxSZWdFeHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0Jyk7XG52YXIgcmVnZXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xudmFyIHN0aWNreUhlbHBlcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLXN0aWNreS1oZWxwZXJzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIFVOU1VQUE9SVEVEX1kgPSBzdGlja3lIZWxwZXJzLlVOU1VQUE9SVEVEX1k7XG52YXIgYXJyYXlQdXNoID0gW10ucHVzaDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbnZhciBNQVhfVUlOVDMyID0gMHhGRkZGRkZGRjtcblxuLy8gQ2hyb21lIDUxIGhhcyBhIGJ1Z2d5IFwic3BsaXRcIiBpbXBsZW1lbnRhdGlvbiB3aGVuIFJlZ0V4cCNleGVjICE9PSBuYXRpdmVFeGVjXG4vLyBXZWV4IEpTIGhhcyBmcm96ZW4gYnVpbHQtaW4gcHJvdG90eXBlcywgc28gdXNlIHRyeSAvIGNhdGNoIHdyYXBwZXJcbnZhciBTUExJVF9XT1JLU19XSVRIX09WRVJXUklUVEVOX0VYRUMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL25vLWVtcHR5LWdyb3VwIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHZhciByZSA9IC8oPzopLztcbiAgdmFyIG9yaWdpbmFsRXhlYyA9IHJlLmV4ZWM7XG4gIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBvcmlnaW5hbEV4ZWMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgdmFyIHJlc3VsdCA9ICdhYicuc3BsaXQocmUpO1xuICByZXR1cm4gcmVzdWx0Lmxlbmd0aCAhPT0gMiB8fCByZXN1bHRbMF0gIT09ICdhJyB8fCByZXN1bHRbMV0gIT09ICdiJztcbn0pO1xuXG4vLyBAQHNwbGl0IGxvZ2ljXG5maXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYygnc3BsaXQnLCBmdW5jdGlvbiAoU1BMSVQsIG5hdGl2ZVNwbGl0LCBtYXliZUNhbGxOYXRpdmUpIHtcbiAgdmFyIGludGVybmFsU3BsaXQ7XG4gIGlmIChcbiAgICAnYWJiYycuc3BsaXQoLyhiKSovKVsxXSA9PSAnYycgfHxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL25vLWVtcHR5LWdyb3VwIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgJ3Rlc3QnLnNwbGl0KC8oPzopLywgLTEpLmxlbmd0aCAhPSA0IHx8XG4gICAgJ2FiJy5zcGxpdCgvKD86YWIpKi8pLmxlbmd0aCAhPSAyIHx8XG4gICAgJy4nLnNwbGl0KC8oLj8pKC4/KS8pLmxlbmd0aCAhPSA0IHx8XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9uby1hc3NlcnRpb24tY2FwdHVyaW5nLWdyb3VwLCByZWdleHAvbm8tZW1wdHktZ3JvdXAgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgICAnLicuc3BsaXQoLygpKCkvKS5sZW5ndGggPiAxIHx8XG4gICAgJycuc3BsaXQoLy4/LykubGVuZ3RoXG4gICkge1xuICAgIC8vIGJhc2VkIG9uIGVzNS1zaGltIGltcGxlbWVudGF0aW9uLCBuZWVkIHRvIHJld29yayBpdFxuICAgIGludGVybmFsU3BsaXQgPSBmdW5jdGlvbiAoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgdmFyIHN0cmluZyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKTtcbiAgICAgIHZhciBsaW0gPSBsaW1pdCA9PT0gdW5kZWZpbmVkID8gTUFYX1VJTlQzMiA6IGxpbWl0ID4+PiAwO1xuICAgICAgaWYgKGxpbSA9PT0gMCkgcmV0dXJuIFtdO1xuICAgICAgaWYgKHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkKSByZXR1cm4gW3N0cmluZ107XG4gICAgICAvLyBJZiBgc2VwYXJhdG9yYCBpcyBub3QgYSByZWdleCwgdXNlIG5hdGl2ZSBzcGxpdFxuICAgICAgaWYgKCFpc1JlZ0V4cChzZXBhcmF0b3IpKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVTcGxpdC5jYWxsKHN0cmluZywgc2VwYXJhdG9yLCBsaW0pO1xuICAgICAgfVxuICAgICAgdmFyIG91dHB1dCA9IFtdO1xuICAgICAgdmFyIGZsYWdzID0gKHNlcGFyYXRvci5pZ25vcmVDYXNlID8gJ2knIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3IubXVsdGlsaW5lID8gJ20nIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3IudW5pY29kZSA/ICd1JyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLnN0aWNreSA/ICd5JyA6ICcnKTtcbiAgICAgIHZhciBsYXN0TGFzdEluZGV4ID0gMDtcbiAgICAgIC8vIE1ha2UgYGdsb2JhbGAgYW5kIGF2b2lkIGBsYXN0SW5kZXhgIGlzc3VlcyBieSB3b3JraW5nIHdpdGggYSBjb3B5XG4gICAgICB2YXIgc2VwYXJhdG9yQ29weSA9IG5ldyBSZWdFeHAoc2VwYXJhdG9yLnNvdXJjZSwgZmxhZ3MgKyAnZycpO1xuICAgICAgdmFyIG1hdGNoLCBsYXN0SW5kZXgsIGxhc3RMZW5ndGg7XG4gICAgICB3aGlsZSAobWF0Y2ggPSByZWdleHBFeGVjLmNhbGwoc2VwYXJhdG9yQ29weSwgc3RyaW5nKSkge1xuICAgICAgICBsYXN0SW5kZXggPSBzZXBhcmF0b3JDb3B5Lmxhc3RJbmRleDtcbiAgICAgICAgaWYgKGxhc3RJbmRleCA+IGxhc3RMYXN0SW5kZXgpIHtcbiAgICAgICAgICBvdXRwdXQucHVzaChzdHJpbmcuc2xpY2UobGFzdExhc3RJbmRleCwgbWF0Y2guaW5kZXgpKTtcbiAgICAgICAgICBpZiAobWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaC5pbmRleCA8IHN0cmluZy5sZW5ndGgpIGFycmF5UHVzaC5hcHBseShvdXRwdXQsIG1hdGNoLnNsaWNlKDEpKTtcbiAgICAgICAgICBsYXN0TGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgIGxhc3RMYXN0SW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgICAgaWYgKG91dHB1dC5sZW5ndGggPj0gbGltKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VwYXJhdG9yQ29weS5sYXN0SW5kZXggPT09IG1hdGNoLmluZGV4KSBzZXBhcmF0b3JDb3B5Lmxhc3RJbmRleCsrOyAvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wXG4gICAgICB9XG4gICAgICBpZiAobGFzdExhc3RJbmRleCA9PT0gc3RyaW5nLmxlbmd0aCkge1xuICAgICAgICBpZiAobGFzdExlbmd0aCB8fCAhc2VwYXJhdG9yQ29weS50ZXN0KCcnKSkgb3V0cHV0LnB1c2goJycpO1xuICAgICAgfSBlbHNlIG91dHB1dC5wdXNoKHN0cmluZy5zbGljZShsYXN0TGFzdEluZGV4KSk7XG4gICAgICByZXR1cm4gb3V0cHV0Lmxlbmd0aCA+IGxpbSA/IG91dHB1dC5zbGljZSgwLCBsaW0pIDogb3V0cHV0O1xuICAgIH07XG4gIC8vIENoYWtyYSwgVjhcbiAgfSBlbHNlIGlmICgnMCcuc3BsaXQodW5kZWZpbmVkLCAwKS5sZW5ndGgpIHtcbiAgICBpbnRlcm5hbFNwbGl0ID0gZnVuY3Rpb24gKHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgIHJldHVybiBzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCAmJiBsaW1pdCA9PT0gMCA/IFtdIDogbmF0aXZlU3BsaXQuY2FsbCh0aGlzLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9O1xuICB9IGVsc2UgaW50ZXJuYWxTcGxpdCA9IG5hdGl2ZVNwbGl0O1xuXG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUuc3BsaXRgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5zcGxpdFxuICAgIGZ1bmN0aW9uIHNwbGl0KHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICAgIHZhciBzcGxpdHRlciA9IHNlcGFyYXRvciA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZXBhcmF0b3JbU1BMSVRdO1xuICAgICAgcmV0dXJuIHNwbGl0dGVyICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBzcGxpdHRlci5jYWxsKHNlcGFyYXRvciwgTywgbGltaXQpXG4gICAgICAgIDogaW50ZXJuYWxTcGxpdC5jYWxsKFN0cmluZyhPKSwgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQHNwbGl0XWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAc3BsaXRcbiAgICAvL1xuICAgIC8vIE5PVEU6IFRoaXMgY2Fubm90IGJlIHByb3Blcmx5IHBvbHlmaWxsZWQgaW4gZW5naW5lcyB0aGF0IGRvbid0IHN1cHBvcnRcbiAgICAvLyB0aGUgJ3knIGZsYWcuXG4gICAgZnVuY3Rpb24gKHN0cmluZywgbGltaXQpIHtcbiAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUoaW50ZXJuYWxTcGxpdCwgdGhpcywgc3RyaW5nLCBsaW1pdCwgaW50ZXJuYWxTcGxpdCAhPT0gbmF0aXZlU3BsaXQpO1xuICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuXG4gICAgICB2YXIgcnggPSBhbk9iamVjdCh0aGlzKTtcbiAgICAgIHZhciBTID0gU3RyaW5nKHN0cmluZyk7XG4gICAgICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3RvcihyeCwgUmVnRXhwKTtcblxuICAgICAgdmFyIHVuaWNvZGVNYXRjaGluZyA9IHJ4LnVuaWNvZGU7XG4gICAgICB2YXIgZmxhZ3MgPSAocnguaWdub3JlQ2FzZSA/ICdpJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocngubXVsdGlsaW5lID8gJ20nIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyeC51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChVTlNVUFBPUlRFRF9ZID8gJ2cnIDogJ3knKTtcblxuICAgICAgLy8gXig/ICsgcnggKyApIGlzIG5lZWRlZCwgaW4gY29tYmluYXRpb24gd2l0aCBzb21lIFMgc2xpY2luZywgdG9cbiAgICAgIC8vIHNpbXVsYXRlIHRoZSAneScgZmxhZy5cbiAgICAgIHZhciBzcGxpdHRlciA9IG5ldyBDKFVOU1VQUE9SVEVEX1kgPyAnXig/OicgKyByeC5zb3VyY2UgKyAnKScgOiByeCwgZmxhZ3MpO1xuICAgICAgdmFyIGxpbSA9IGxpbWl0ID09PSB1bmRlZmluZWQgPyBNQVhfVUlOVDMyIDogbGltaXQgPj4+IDA7XG4gICAgICBpZiAobGltID09PSAwKSByZXR1cm4gW107XG4gICAgICBpZiAoUy5sZW5ndGggPT09IDApIHJldHVybiBjYWxsUmVnRXhwRXhlYyhzcGxpdHRlciwgUykgPT09IG51bGwgPyBbU10gOiBbXTtcbiAgICAgIHZhciBwID0gMDtcbiAgICAgIHZhciBxID0gMDtcbiAgICAgIHZhciBBID0gW107XG4gICAgICB3aGlsZSAocSA8IFMubGVuZ3RoKSB7XG4gICAgICAgIHNwbGl0dGVyLmxhc3RJbmRleCA9IFVOU1VQUE9SVEVEX1kgPyAwIDogcTtcbiAgICAgICAgdmFyIHogPSBjYWxsUmVnRXhwRXhlYyhzcGxpdHRlciwgVU5TVVBQT1JURURfWSA/IFMuc2xpY2UocSkgOiBTKTtcbiAgICAgICAgdmFyIGU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB6ID09PSBudWxsIHx8XG4gICAgICAgICAgKGUgPSBtaW4odG9MZW5ndGgoc3BsaXR0ZXIubGFzdEluZGV4ICsgKFVOU1VQUE9SVEVEX1kgPyBxIDogMCkpLCBTLmxlbmd0aCkpID09PSBwXG4gICAgICAgICkge1xuICAgICAgICAgIHEgPSBhZHZhbmNlU3RyaW5nSW5kZXgoUywgcSwgdW5pY29kZU1hdGNoaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBLnB1c2goUy5zbGljZShwLCBxKSk7XG4gICAgICAgICAgaWYgKEEubGVuZ3RoID09PSBsaW0pIHJldHVybiBBO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHoubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBBLnB1c2goeltpXSk7XG4gICAgICAgICAgICBpZiAoQS5sZW5ndGggPT09IGxpbSkgcmV0dXJuIEE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHEgPSBwID0gZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgQS5wdXNoKFMuc2xpY2UocCkpO1xuICAgICAgcmV0dXJuIEE7XG4gICAgfVxuICBdO1xufSwgIVNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQywgVU5TVVBQT1JURURfWSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIGNvbGxlY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29sbGVjdGlvbicpO1xudmFyIGNvbGxlY3Rpb25TdHJvbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gYFNldGAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc2V0LW9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gY29sbGVjdGlvbignU2V0JywgZnVuY3Rpb24gKGluaXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIFNldCgpIHsgcmV0dXJuIGluaXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCBjb2xsZWN0aW9uU3Ryb25nKTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWFzc2lnbiAtLSBzYWZlXG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbi8vIGBPYmplY3QuYXNzaWduYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmFzc2lnblxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHNob3VsZCBoYXZlIGNvcnJlY3Qgb3JkZXIgb2Ygb3BlcmF0aW9ucyAoRWRnZSBidWcpXG4gIGlmIChERVNDUklQVE9SUyAmJiAkYXNzaWduKHsgYjogMSB9LCAkYXNzaWduKGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGhpcywgJ2InLCB7XG4gICAgICAgIHZhbHVlOiAzLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9KSwgeyBiOiAyIH0pKS5iICE9PSAxKSByZXR1cm4gdHJ1ZTtcbiAgLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1zeW1ib2wgLS0gc2FmZVxuICB2YXIgc3ltYm9sID0gU3ltYm9sKCk7XG4gIHZhciBhbHBoYWJldCA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbc3ltYm9sXSA9IDc7XG4gIGFscGhhYmV0LnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChjaHIpIHsgQltjaHJdID0gY2hyOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW3N5bWJvbF0gIT0gNyB8fCBvYmplY3RLZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBhbHBoYWJldDtcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnMgLS0gcmVxdWlyZWQgZm9yIGAubGVuZ3RoYFxuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmY7XG4gIHdoaWxlIChhcmd1bWVudHNMZW5ndGggPiBpbmRleCkge1xuICAgIHZhciBTID0gSW5kZXhlZE9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gb2JqZWN0S2V5cyhTKS5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKFMpKSA6IG9iamVjdEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSB7XG4gICAgICBrZXkgPSBrZXlzW2orK107XG4gICAgICBpZiAoIURFU0NSSVBUT1JTIHx8IHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoUywga2V5KSkgVFtrZXldID0gU1trZXldO1xuICAgIH1cbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtYXNzaWduJyk7XG5cbi8vIGBPYmplY3QuYXNzaWduYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmFzc2lnblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1hc3NpZ24gLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IE9iamVjdC5hc3NpZ24gIT09IGFzc2lnbiB9LCB7XG4gIGFzc2lnbjogYXNzaWduXG59KTtcbiIsICJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMtZXh0ZXJuYWwnKS5mO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5bmFtZXMgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbnZhciBGQUlMU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24gKCkgeyByZXR1cm4gIU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKDEpOyB9KTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZBSUxTX09OX1BSSU1JVElWRVMgfSwge1xuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiBnZXRPd25Qcm9wZXJ0eU5hbWVzXG59KTtcbiIsICIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuYXNzaWduLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmdldC1vd24tcHJvcGVydHktbmFtZXMuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5tYXAuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5qb2luLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZm9yLWVhY2guanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuZXhlYy5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5zcGxpdC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5rZXlzLmpzXCI7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuICBpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuICB0cnkge1xuICAgIGlmICghT2JqZWN0LmFzc2lnbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gLy8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblxuXG4gICAgdmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cbiAgICB0ZXN0MVs1XSA9ICdkZSc7XG5cbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblxuXG4gICAgdmFyIHRlc3QyID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcbiAgICB9XG5cbiAgICB2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuICAgICAgcmV0dXJuIHRlc3QyW25dO1xuICAgIH0pO1xuXG4gICAgaWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cblxuICAgIHZhciB0ZXN0MyA9IHt9O1xuICAgICdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuICAgICAgdGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcbiAgICB9KTtcblxuICAgIGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBmcm9tO1xuICB2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgc3ltYm9scztcblxuICBmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuICAgIGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgc3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcbiAgICAgICAgICB0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG87XG59OyIsICIvKiogQGxpY2Vuc2UgUmVhY3QgdjE3LjAuMlxuICogcmVhY3QuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5zeW1ib2wuZGVzY3JpcHRpb24uanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QudG8tc3RyaW5nLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLml0ZXJhdG9yLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3IuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3IuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLml0ZXJhdG9yLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuY29uY2F0LmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkubWFwLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuZnVuY3Rpb24ubmFtZS5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5mcmVlemUuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnNlYWwuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLmV4ZWMuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcucmVwbGFjZS5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmRhdGUudG8tc3RyaW5nLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLnRvLXN0cmluZy5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmlzLWFycmF5LmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuam9pbi5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5rZXlzLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmRlZmluZS1wcm9wZXJ0aWVzLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLm1hdGNoLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLnRyaW0uanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy53ZWFrLW1hcC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLm1hcC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLnJlZmxlY3QuY29uc3RydWN0LmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLnNwbGl0LmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuZnVuY3Rpb24uYmluZC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLnNldC5qc1wiO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIChmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7IC8vIFRPRE86IHRoaXMgaXMgc3BlY2lhbCBiZWNhdXNlIGl0IGdldHMgaW1wb3J0ZWQgZHVyaW5nIGJ1aWxkLlxuXG5cbiAgICB2YXIgUmVhY3RWZXJzaW9uID0gJzE3LjAuMic7IC8vIEFUVEVOVElPTlxuICAgIC8vIFdoZW4gYWRkaW5nIG5ldyBzeW1ib2xzIHRvIHRoaXMgZmlsZSxcbiAgICAvLyBQbGVhc2UgY29uc2lkZXIgYWxzbyBhZGRpbmcgdG8gJ3JlYWN0LWRldnRvb2xzLXNoYXJlZC9zcmMvYmFja2VuZC9SZWFjdFN5bWJvbHMnXG4gICAgLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbiAgICAvLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG5cbiAgICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gMHhlYWM3O1xuICAgIHZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IDB4ZWFjYTtcbiAgICBleHBvcnRzLkZyYWdtZW50ID0gMHhlYWNiO1xuICAgIGV4cG9ydHMuU3RyaWN0TW9kZSA9IDB4ZWFjYztcbiAgICBleHBvcnRzLlByb2ZpbGVyID0gMHhlYWQyO1xuICAgIHZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gMHhlYWNkO1xuICAgIHZhciBSRUFDVF9DT05URVhUX1RZUEUgPSAweGVhY2U7XG4gICAgdmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSAweGVhZDA7XG4gICAgZXhwb3J0cy5TdXNwZW5zZSA9IDB4ZWFkMTtcbiAgICB2YXIgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFID0gMHhlYWQ4O1xuICAgIHZhciBSRUFDVF9NRU1PX1RZUEUgPSAweGVhZDM7XG4gICAgdmFyIFJFQUNUX0xBWllfVFlQRSA9IDB4ZWFkNDtcbiAgICB2YXIgUkVBQ1RfQkxPQ0tfVFlQRSA9IDB4ZWFkOTtcbiAgICB2YXIgUkVBQ1RfU0VSVkVSX0JMT0NLX1RZUEUgPSAweGVhZGE7XG4gICAgdmFyIFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgPSAweGVhZDU7XG4gICAgdmFyIFJFQUNUX1NDT1BFX1RZUEUgPSAweGVhZDc7XG4gICAgdmFyIFJFQUNUX09QQVFVRV9JRF9UWVBFID0gMHhlYWUwO1xuICAgIHZhciBSRUFDVF9ERUJVR19UUkFDSU5HX01PREVfVFlQRSA9IDB4ZWFlMTtcbiAgICB2YXIgUkVBQ1RfT0ZGU0NSRUVOX1RZUEUgPSAweGVhZTI7XG4gICAgdmFyIFJFQUNUX0xFR0FDWV9ISURERU5fVFlQRSA9IDB4ZWFlMztcblxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbFtcImZvclwiXSkge1xuICAgICAgdmFyIHN5bWJvbEZvciA9IFN5bWJvbFtcImZvclwiXTtcbiAgICAgIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHN5bWJvbEZvcigncmVhY3QuZWxlbWVudCcpO1xuICAgICAgUkVBQ1RfUE9SVEFMX1RZUEUgPSBzeW1ib2xGb3IoJ3JlYWN0LnBvcnRhbCcpO1xuICAgICAgZXhwb3J0cy5GcmFnbWVudCA9IHN5bWJvbEZvcigncmVhY3QuZnJhZ21lbnQnKTtcbiAgICAgIGV4cG9ydHMuU3RyaWN0TW9kZSA9IHN5bWJvbEZvcigncmVhY3Quc3RyaWN0X21vZGUnKTtcbiAgICAgIGV4cG9ydHMuUHJvZmlsZXIgPSBzeW1ib2xGb3IoJ3JlYWN0LnByb2ZpbGVyJyk7XG4gICAgICBSRUFDVF9QUk9WSURFUl9UWVBFID0gc3ltYm9sRm9yKCdyZWFjdC5wcm92aWRlcicpO1xuICAgICAgUkVBQ1RfQ09OVEVYVF9UWVBFID0gc3ltYm9sRm9yKCdyZWFjdC5jb250ZXh0Jyk7XG4gICAgICBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gc3ltYm9sRm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpO1xuICAgICAgZXhwb3J0cy5TdXNwZW5zZSA9IHN5bWJvbEZvcigncmVhY3Quc3VzcGVuc2UnKTtcbiAgICAgIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IHN5bWJvbEZvcigncmVhY3Quc3VzcGVuc2VfbGlzdCcpO1xuICAgICAgUkVBQ1RfTUVNT19UWVBFID0gc3ltYm9sRm9yKCdyZWFjdC5tZW1vJyk7XG4gICAgICBSRUFDVF9MQVpZX1RZUEUgPSBzeW1ib2xGb3IoJ3JlYWN0LmxhenknKTtcbiAgICAgIFJFQUNUX0JMT0NLX1RZUEUgPSBzeW1ib2xGb3IoJ3JlYWN0LmJsb2NrJyk7XG4gICAgICBSRUFDVF9TRVJWRVJfQkxPQ0tfVFlQRSA9IHN5bWJvbEZvcigncmVhY3Quc2VydmVyLmJsb2NrJyk7XG4gICAgICBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFID0gc3ltYm9sRm9yKCdyZWFjdC5mdW5kYW1lbnRhbCcpO1xuICAgICAgUkVBQ1RfU0NPUEVfVFlQRSA9IHN5bWJvbEZvcigncmVhY3Quc2NvcGUnKTtcbiAgICAgIFJFQUNUX09QQVFVRV9JRF9UWVBFID0gc3ltYm9sRm9yKCdyZWFjdC5vcGFxdWUuaWQnKTtcbiAgICAgIFJFQUNUX0RFQlVHX1RSQUNJTkdfTU9ERV9UWVBFID0gc3ltYm9sRm9yKCdyZWFjdC5kZWJ1Z190cmFjZV9tb2RlJyk7XG4gICAgICBSRUFDVF9PRkZTQ1JFRU5fVFlQRSA9IHN5bWJvbEZvcigncmVhY3Qub2Zmc2NyZWVuJyk7XG4gICAgICBSRUFDVF9MRUdBQ1lfSElEREVOX1RZUEUgPSBzeW1ib2xGb3IoJ3JlYWN0LmxlZ2FjeV9oaWRkZW4nKTtcbiAgICB9XG5cbiAgICB2YXIgTUFZQkVfSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gICAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InO1xuXG4gICAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgICBpZiAobWF5YmVJdGVyYWJsZSA9PT0gbnVsbCB8fCBfdHlwZW9mKG1heWJlSXRlcmFibGUpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIG1heWJlSXRlcmF0b3IgPSBNQVlCRV9JVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtNQVlCRV9JVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdO1xuXG4gICAgICBpZiAodHlwZW9mIG1heWJlSXRlcmF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlSXRlcmF0b3I7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBkaXNwYXRjaGVyLlxuICAgICAqL1xuXG5cbiAgICB2YXIgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciA9IHtcbiAgICAgIC8qKlxuICAgICAgICogQGludGVybmFsXG4gICAgICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAgICAgKi9cbiAgICAgIGN1cnJlbnQ6IG51bGxcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IGJhdGNoJ3MgY29uZmlndXJhdGlvbiBzdWNoIGFzIGhvdyBsb25nIGFuIHVwZGF0ZVxuICAgICAqIHNob3VsZCBzdXNwZW5kIGZvciBpZiBpdCBuZWVkcyB0by5cbiAgICAgKi9cblxuICAgIHZhciBSZWFjdEN1cnJlbnRCYXRjaENvbmZpZyA9IHtcbiAgICAgIHRyYW5zaXRpb246IDBcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IG93bmVyLlxuICAgICAqXG4gICAgICogVGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIGNvbXBvbmVudCB3aG8gc2hvdWxkIG93biBhbnkgY29tcG9uZW50cyB0aGF0IGFyZVxuICAgICAqIGN1cnJlbnRseSBiZWluZyBjb25zdHJ1Y3RlZC5cbiAgICAgKi9cblxuICAgIHZhciBSZWFjdEN1cnJlbnRPd25lciA9IHtcbiAgICAgIC8qKlxuICAgICAgICogQGludGVybmFsXG4gICAgICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAgICAgKi9cbiAgICAgIGN1cnJlbnQ6IG51bGxcbiAgICB9O1xuICAgIHZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0ge307XG4gICAgdmFyIGN1cnJlbnRFeHRyYVN0YWNrRnJhbWUgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gc2V0RXh0cmFTdGFja0ZyYW1lKHN0YWNrKSB7XG4gICAgICB7XG4gICAgICAgIGN1cnJlbnRFeHRyYVN0YWNrRnJhbWUgPSBzdGFjaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB7XG4gICAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLnNldEV4dHJhU3RhY2tGcmFtZSA9IGZ1bmN0aW9uIChzdGFjaykge1xuICAgICAgICB7XG4gICAgICAgICAgY3VycmVudEV4dHJhU3RhY2tGcmFtZSA9IHN0YWNrO1xuICAgICAgICB9XG4gICAgICB9OyAvLyBTdGFjayBpbXBsZW1lbnRhdGlvbiBpbmplY3RlZCBieSB0aGUgY3VycmVudCByZW5kZXJlci5cblxuXG4gICAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldEN1cnJlbnRTdGFjayA9IG51bGw7XG5cbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0YWNrID0gJyc7IC8vIEFkZCBhbiBleHRyYSB0b3AgZnJhbWUgd2hpbGUgYW4gZWxlbWVudCBpcyBiZWluZyB2YWxpZGF0ZWRcblxuICAgICAgICBpZiAoY3VycmVudEV4dHJhU3RhY2tGcmFtZSkge1xuICAgICAgICAgIHN0YWNrICs9IGN1cnJlbnRFeHRyYVN0YWNrRnJhbWU7XG4gICAgICAgIH0gLy8gRGVsZWdhdGUgdG8gdGhlIGluamVjdGVkIHJlbmRlcmVyLXNwZWNpZmljIGltcGxlbWVudGF0aW9uXG5cblxuICAgICAgICB2YXIgaW1wbCA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0Q3VycmVudFN0YWNrO1xuXG4gICAgICAgIGlmIChpbXBsKSB7XG4gICAgICAgICAgc3RhY2sgKz0gaW1wbCgpIHx8ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0YWNrO1xuICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCBieSBhY3QoKSB0byB0cmFjayB3aGV0aGVyIHlvdSdyZSBpbnNpZGUgYW4gYWN0KCkgc2NvcGUuXG4gICAgICovXG5cbiAgICB2YXIgSXNTb21lUmVuZGVyZXJBY3RpbmcgPSB7XG4gICAgICBjdXJyZW50OiBmYWxzZVxuICAgIH07XG4gICAgdmFyIFJlYWN0U2hhcmVkSW50ZXJuYWxzID0ge1xuICAgICAgUmVhY3RDdXJyZW50RGlzcGF0Y2hlcjogUmVhY3RDdXJyZW50RGlzcGF0Y2hlcixcbiAgICAgIFJlYWN0Q3VycmVudEJhdGNoQ29uZmlnOiBSZWFjdEN1cnJlbnRCYXRjaENvbmZpZyxcbiAgICAgIFJlYWN0Q3VycmVudE93bmVyOiBSZWFjdEN1cnJlbnRPd25lcixcbiAgICAgIElzU29tZVJlbmRlcmVyQWN0aW5nOiBJc1NvbWVSZW5kZXJlckFjdGluZyxcbiAgICAgIC8vIFVzZWQgYnkgcmVuZGVyZXJzIHRvIGF2b2lkIGJ1bmRsaW5nIG9iamVjdC1hc3NpZ24gdHdpY2UgaW4gVU1EIGJ1bmRsZXM6XG4gICAgICBhc3NpZ246IF9hc3NpZ25cbiAgICB9O1xuICAgIHtcbiAgICAgIFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0RGVidWdDdXJyZW50RnJhbWUgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lO1xuICAgIH0gLy8gYnkgY2FsbHMgdG8gdGhlc2UgbWV0aG9kcyBieSBhIEJhYmVsIHBsdWdpbi5cbiAgICAvL1xuICAgIC8vIEluIFBST0QgKG9yIGluIHBhY2thZ2VzIHdpdGhvdXQgYWNjZXNzIHRvIFJlYWN0IGludGVybmFscyksXG4gICAgLy8gdGhleSBhcmUgbGVmdCBhcyB0aGV5IGFyZSBpbnN0ZWFkLlxuXG4gICAgZnVuY3Rpb24gd2Fybihmb3JtYXQpIHtcbiAgICAgIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpbnRXYXJuaW5nKCd3YXJuJywgZm9ybWF0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvcihmb3JtYXQpIHtcbiAgICAgIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpbnRXYXJuaW5nKCdlcnJvcicsIGZvcm1hdCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGxldmVsLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICAgIC8vIFdoZW4gY2hhbmdpbmcgdGhpcyBsb2dpYywgeW91IG1pZ2h0IHdhbnQgdG8gYWxzb1xuICAgICAgLy8gdXBkYXRlIGNvbnNvbGVXaXRoU3RhY2tEZXYud3d3LmpzIGFzIHdlbGwuXG4gICAgICB7XG4gICAgICAgIHZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbiAgICAgICAgdmFyIHN0YWNrID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCk7XG5cbiAgICAgICAgaWYgKHN0YWNrICE9PSAnJykge1xuICAgICAgICAgIGZvcm1hdCArPSAnJXMnO1xuICAgICAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChbc3RhY2tdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhcmdzV2l0aEZvcm1hdCA9IGFyZ3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuICcnICsgaXRlbTtcbiAgICAgICAgfSk7IC8vIENhcmVmdWw6IFJOIGN1cnJlbnRseSBkZXBlbmRzIG9uIHRoaXMgcHJlZml4XG5cbiAgICAgICAgYXJnc1dpdGhGb3JtYXQudW5zaGlmdCgnV2FybmluZzogJyArIGZvcm1hdCk7IC8vIFdlIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIHNwcmVhZCAob3IgLmFwcGx5KSBkaXJlY3RseSBiZWNhdXNlIGl0XG4gICAgICAgIC8vIGJyZWFrcyBJRTk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMTM2MTBcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZ1xuXG4gICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGVbbGV2ZWxdLCBjb25zb2xlLCBhcmdzV2l0aEZvcm1hdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudCA9IHt9O1xuXG4gICAgZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAgICAgIHtcbiAgICAgICAgdmFyIF9jb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgICAgICB2YXIgY29tcG9uZW50TmFtZSA9IF9jb25zdHJ1Y3RvciAmJiAoX2NvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8IF9jb25zdHJ1Y3Rvci5uYW1lKSB8fCAnUmVhY3RDbGFzcyc7XG4gICAgICAgIHZhciB3YXJuaW5nS2V5ID0gY29tcG9uZW50TmFtZSArIFwiLlwiICsgY2FsbGVyTmFtZTtcblxuICAgICAgICBpZiAoZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50W3dhcm5pbmdLZXldKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXJyb3IoXCJDYW4ndCBjYWxsICVzIG9uIGEgY29tcG9uZW50IHRoYXQgaXMgbm90IHlldCBtb3VudGVkLiBcIiArICdUaGlzIGlzIGEgbm8tb3AsIGJ1dCBpdCBtaWdodCBpbmRpY2F0ZSBhIGJ1ZyBpbiB5b3VyIGFwcGxpY2F0aW9uLiAnICsgJ0luc3RlYWQsIGFzc2lnbiB0byBgdGhpcy5zdGF0ZWAgZGlyZWN0bHkgb3IgZGVmaW5lIGEgYHN0YXRlID0ge307YCAnICsgJ2NsYXNzIHByb3BlcnR5IHdpdGggdGhlIGRlc2lyZWQgc3RhdGUgaW4gdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjb21wb25lbnROYW1lKTtcbiAgICAgICAgZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50W3dhcm5pbmdLZXldID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gICAgICovXG5cblxuICAgIHZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcbiAgICAgIC8qKlxuICAgICAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgICAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2Ugd2Ugd2FudCB0byB0ZXN0LlxuICAgICAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgKiBAZmluYWxcbiAgICAgICAqL1xuICAgICAgaXNNb3VudGVkOiBmdW5jdGlvbiBpc01vdW50ZWQocHVibGljSW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gICAgICAgKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAgICAgICAqXG4gICAgICAgKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gICAgICAgKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAgICAgICAqXG4gICAgICAgKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gICAgICAgKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgICAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBjb21wb25lbnQgaXMgdXBkYXRlZC5cbiAgICAgICAqIEBwYXJhbSB7P3N0cmluZ30gY2FsbGVyTmFtZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgICAgICogQGludGVybmFsXG4gICAgICAgKi9cbiAgICAgIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gZW5xdWV1ZUZvcmNlVXBkYXRlKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgICAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFJlcGxhY2VzIGFsbCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyBvciBgc2V0U3RhdGVgIHRvIG11dGF0ZSBzdGF0ZS5cbiAgICAgICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICAgICAqXG4gICAgICAgKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICAgICAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAgICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgICAgICogQHBhcmFtIHs/c3RyaW5nfSBjYWxsZXJOYW1lIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAgICAgKiBAaW50ZXJuYWxcbiAgICAgICAqL1xuICAgICAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gZW5xdWV1ZVJlcGxhY2VTdGF0ZShwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICAgICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAgICAgKiBpbnRlcm5hbC4gVGhpcyBwcm92aWRlcyBhIG1lcmdpbmcgc3RyYXRlZ3kgdGhhdCBpcyBub3QgYXZhaWxhYmxlIHRvIGRlZXBcbiAgICAgICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgICAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgICAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBjb21wb25lbnQgaXMgdXBkYXRlZC5cbiAgICAgICAqIEBwYXJhbSB7P3N0cmluZ30gTmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICAgICAqIEBpbnRlcm5hbFxuICAgICAgICovXG4gICAgICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uIGVucXVldWVTZXRTdGF0ZShwdWJsaWNJbnN0YW5jZSwgcGFydGlhbFN0YXRlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgICAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZW1wdHlPYmplY3QgPSB7fTtcbiAgICB7XG4gICAgICBPYmplY3QuZnJlZXplKGVtcHR5T2JqZWN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7IC8vIElmIGEgY29tcG9uZW50IGhhcyBzdHJpbmcgcmVmcywgd2Ugd2lsbCBhc3NpZ24gYSBkaWZmZXJlbnQgb2JqZWN0IGxhdGVyLlxuXG4gICAgICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDsgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgICAgIC8vIHJlbmRlcmVyLlxuXG4gICAgICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xuICAgIH1cblxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuICAgIC8qKlxuICAgICAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgdG8gbXV0YXRlXG4gICAgICogc3RhdGUuIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICAgKlxuICAgICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gICAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAgd2lsbCBydW4gc3luY2hyb25vdXNseSxcbiAgICAgKiBhcyB0aGV5IG1heSBldmVudHVhbGx5IGJlIGJhdGNoZWQgdG9nZXRoZXIuICBZb3UgY2FuIHByb3ZpZGUgYW4gb3B0aW9uYWxcbiAgICAgKiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgY2FsbCB0byBzZXRTdGF0ZSBpcyBhY3R1YWxseVxuICAgICAqIGNvbXBsZXRlZC5cbiAgICAgKlxuICAgICAqIFdoZW4gYSBmdW5jdGlvbiBpcyBwcm92aWRlZCB0byBzZXRTdGF0ZSwgaXQgd2lsbCBiZSBjYWxsZWQgYXQgc29tZSBwb2ludCBpblxuICAgICAqIHRoZSBmdXR1cmUgKG5vdCBzeW5jaHJvbm91c2x5KS4gSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdXAgdG8gZGF0ZVxuICAgICAqIGNvbXBvbmVudCBhcmd1bWVudHMgKHN0YXRlLCBwcm9wcywgY29udGV4dCkuIFRoZXNlIHZhbHVlcyBjYW4gYmUgZGlmZmVyZW50XG4gICAgICogZnJvbSB0aGlzLiogYmVjYXVzZSB5b3VyIGZ1bmN0aW9uIG1heSBiZSBjYWxsZWQgYWZ0ZXIgcmVjZWl2ZVByb3BzIGJ1dCBiZWZvcmVcbiAgICAgKiBzaG91bGRDb21wb25lbnRVcGRhdGUsIGFuZCB0aGlzIG5ldyBzdGF0ZSwgcHJvcHMsIGFuZCBjb250ZXh0IHdpbGwgbm90IHlldCBiZVxuICAgICAqIGFzc2lnbmVkIHRvIHRoaXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSBvciBmdW5jdGlvbiB0b1xuICAgICAqICAgICAgICBwcm9kdWNlIG5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBjdXJyZW50IHN0YXRlLlxuICAgICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAgICAgKiBAZmluYWxcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG5cbiAgICBDb21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgICAgIGlmICghKF90eXBlb2YocGFydGlhbFN0YXRlKSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyB8fCBwYXJ0aWFsU3RhdGUgPT0gbnVsbCkpIHtcbiAgICAgICAge1xuICAgICAgICAgIHRocm93IEVycm9yKFwic2V0U3RhdGUoLi4uKTogdGFrZXMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcyB0byB1cGRhdGUgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMuXCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlU2V0U3RhdGUodGhpcywgcGFydGlhbFN0YXRlLCBjYWxsYmFjaywgJ3NldFN0YXRlJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gICAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAgICpcbiAgICAgKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gICAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gICAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICAgICAqIEBmaW5hbFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cblxuXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgdGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzLCBjYWxsYmFjaywgJ2ZvcmNlVXBkYXRlJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gICAgICogd2Ugd291bGQgbGlrZSB0byBkZXByZWNhdGUgdGhlbSwgd2UncmUgbm90IGdvaW5nIHRvIG1vdmUgdGhlbSBvdmVyIHRvIHRoaXNcbiAgICAgKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAgICAgKi9cblxuXG4gICAge1xuICAgICAgdmFyIGRlcHJlY2F0ZWRBUElzID0ge1xuICAgICAgICBpc01vdW50ZWQ6IFsnaXNNb3VudGVkJywgJ0luc3RlYWQsIG1ha2Ugc3VyZSB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluICcgKyAnY29tcG9uZW50V2lsbFVubW91bnQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuJ10sXG4gICAgICAgIHJlcGxhY2VTdGF0ZTogWydyZXBsYWNlU3RhdGUnLCAnUmVmYWN0b3IgeW91ciBjb2RlIHRvIHVzZSBzZXRTdGF0ZSBpbnN0ZWFkIChzZWUgJyArICdodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzMyMzYpLiddXG4gICAgICB9O1xuXG4gICAgICB2YXIgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nID0gZnVuY3Rpb24gZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nKG1ldGhvZE5hbWUsIGluZm8pIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbXBvbmVudC5wcm90b3R5cGUsIG1ldGhvZE5hbWUsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHdhcm4oJyVzKC4uLikgaXMgZGVwcmVjYXRlZCBpbiBwbGFpbiBKYXZhU2NyaXB0IFJlYWN0IGNsYXNzZXMuICVzJywgaW5mb1swXSwgaW5mb1sxXSk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBmb3IgKHZhciBmbk5hbWUgaW4gZGVwcmVjYXRlZEFQSXMpIHtcbiAgICAgICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgICAgICBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcoZm5OYW1lLCBkZXByZWNhdGVkQVBJc1tmbk5hbWVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIENvbXBvbmVudER1bW15KCkge31cblxuICAgIENvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IENvbXBvbmVudC5wcm90b3R5cGU7XG4gICAgLyoqXG4gICAgICogQ29udmVuaWVuY2UgY29tcG9uZW50IHdpdGggZGVmYXVsdCBzaGFsbG93IGVxdWFsaXR5IGNoZWNrIGZvciBzQ1UuXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBQdXJlQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0OyAvLyBJZiBhIGNvbXBvbmVudCBoYXMgc3RyaW5nIHJlZnMsIHdlIHdpbGwgYXNzaWduIGEgZGlmZmVyZW50IG9iamVjdCBsYXRlci5cblxuICAgICAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gICAgICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xuICAgIH1cblxuICAgIHZhciBwdXJlQ29tcG9uZW50UHJvdG90eXBlID0gUHVyZUNvbXBvbmVudC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50RHVtbXkoKTtcbiAgICBwdXJlQ29tcG9uZW50UHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUHVyZUNvbXBvbmVudDsgLy8gQXZvaWQgYW4gZXh0cmEgcHJvdG90eXBlIGp1bXAgZm9yIHRoZXNlIG1ldGhvZHMuXG5cbiAgICBfYXNzaWduKHB1cmVDb21wb25lbnRQcm90b3R5cGUsIENvbXBvbmVudC5wcm90b3R5cGUpO1xuXG4gICAgcHVyZUNvbXBvbmVudFByb3RvdHlwZS5pc1B1cmVSZWFjdENvbXBvbmVudCA9IHRydWU7IC8vIGFuIGltbXV0YWJsZSBvYmplY3Qgd2l0aCBhIHNpbmdsZSBtdXRhYmxlIHZhbHVlXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVSZWYoKSB7XG4gICAgICB2YXIgcmVmT2JqZWN0ID0ge1xuICAgICAgICBjdXJyZW50OiBudWxsXG4gICAgICB9O1xuICAgICAge1xuICAgICAgICBPYmplY3Quc2VhbChyZWZPYmplY3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlZk9iamVjdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVkTmFtZShvdXRlclR5cGUsIGlubmVyVHlwZSwgd3JhcHBlck5hbWUpIHtcbiAgICAgIHZhciBmdW5jdGlvbk5hbWUgPSBpbm5lclR5cGUuZGlzcGxheU5hbWUgfHwgaW5uZXJUeXBlLm5hbWUgfHwgJyc7XG4gICAgICByZXR1cm4gb3V0ZXJUeXBlLmRpc3BsYXlOYW1lIHx8IChmdW5jdGlvbk5hbWUgIT09ICcnID8gd3JhcHBlck5hbWUgKyBcIihcIiArIGZ1bmN0aW9uTmFtZSArIFwiKVwiIDogd3JhcHBlck5hbWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRleHROYW1lKHR5cGUpIHtcbiAgICAgIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8ICdDb250ZXh0JztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb21wb25lbnROYW1lKHR5cGUpIHtcbiAgICAgIGlmICh0eXBlID09IG51bGwpIHtcbiAgICAgICAgLy8gSG9zdCByb290LCB0ZXh0IG5vZGUgb3IganVzdCBpbnZhbGlkIHR5cGUuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB7XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZS50YWcgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgZXJyb3IoJ1JlY2VpdmVkIGFuIHVuZXhwZWN0ZWQgb2JqZWN0IGluIGdldENvbXBvbmVudE5hbWUoKS4gJyArICdUaGlzIGlzIGxpa2VseSBhIGJ1ZyBpbiBSZWFjdC4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBleHBvcnRzLkZyYWdtZW50OlxuICAgICAgICAgIHJldHVybiAnRnJhZ21lbnQnO1xuXG4gICAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgICAgcmV0dXJuICdQb3J0YWwnO1xuXG4gICAgICAgIGNhc2UgZXhwb3J0cy5Qcm9maWxlcjpcbiAgICAgICAgICByZXR1cm4gJ1Byb2ZpbGVyJztcblxuICAgICAgICBjYXNlIGV4cG9ydHMuU3RyaWN0TW9kZTpcbiAgICAgICAgICByZXR1cm4gJ1N0cmljdE1vZGUnO1xuXG4gICAgICAgIGNhc2UgZXhwb3J0cy5TdXNwZW5zZTpcbiAgICAgICAgICByZXR1cm4gJ1N1c3BlbnNlJztcblxuICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTpcbiAgICAgICAgICByZXR1cm4gJ1N1c3BlbnNlTGlzdCc7XG4gICAgICB9XG5cbiAgICAgIGlmIChfdHlwZW9mKHR5cGUpID09PSAnb2JqZWN0Jykge1xuICAgICAgICBzd2l0Y2ggKHR5cGUuJCR0eXBlb2YpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdHlwZTtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb250ZXh0TmFtZShjb250ZXh0KSArICcuQ29uc3VtZXInO1xuXG4gICAgICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICAgICAgdmFyIHByb3ZpZGVyID0gdHlwZTtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb250ZXh0TmFtZShwcm92aWRlci5fY29udGV4dCkgKyAnLlByb3ZpZGVyJztcblxuICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBnZXRXcmFwcGVkTmFtZSh0eXBlLCB0eXBlLnJlbmRlciwgJ0ZvcndhcmRSZWYnKTtcblxuICAgICAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIGdldENvbXBvbmVudE5hbWUodHlwZS50eXBlKTtcblxuICAgICAgICAgIGNhc2UgUkVBQ1RfQkxPQ0tfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lKHR5cGUuX3JlbmRlcik7XG5cbiAgICAgICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIGxhenlDb21wb25lbnQgPSB0eXBlO1xuICAgICAgICAgICAgICB2YXIgcGF5bG9hZCA9IGxhenlDb21wb25lbnQuX3BheWxvYWQ7XG4gICAgICAgICAgICAgIHZhciBpbml0ID0gbGF6eUNvbXBvbmVudC5faW5pdDtcblxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lKGluaXQocGF5bG9hZCkpO1xuICAgICAgICAgICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICAgIHZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAgICAgIGtleTogdHJ1ZSxcbiAgICAgIHJlZjogdHJ1ZSxcbiAgICAgIF9fc2VsZjogdHJ1ZSxcbiAgICAgIF9fc291cmNlOiB0cnVlXG4gICAgfTtcbiAgICB2YXIgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24sIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duLCBkaWRXYXJuQWJvdXRTdHJpbmdSZWZzO1xuICAgIHtcbiAgICAgIGRpZFdhcm5BYm91dFN0cmluZ1JlZnMgPSB7fTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNWYWxpZFJlZihjb25maWcpIHtcbiAgICAgIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAncmVmJykpIHtcbiAgICAgICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQ7XG5cbiAgICAgICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbmZpZy5yZWYgIT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAgICAgIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAna2V5JykpIHtcbiAgICAgICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdrZXknKS5nZXQ7XG5cbiAgICAgICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbmZpZy5rZXkgIT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgICAgIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkgPSBmdW5jdGlvbiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkoKSB7XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICAgICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICAgICAgICBlcnJvcignJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL3JlYWN0anMub3JnL2xpbmsvc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgICAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ0tleSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgICAgIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYoKSB7XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoIXNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duKSB7XG4gICAgICAgICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICAgICAgICBlcnJvcignJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL3JlYWN0anMub3JnL2xpbmsvc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgICAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ1JlZixcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YXJuSWZTdHJpbmdSZWZDYW5ub3RCZUF1dG9Db252ZXJ0ZWQoY29uZmlnKSB7XG4gICAgICB7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnJlZiA9PT0gJ3N0cmluZycgJiYgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCAmJiBjb25maWcuX19zZWxmICYmIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuc3RhdGVOb2RlICE9PSBjb25maWcuX19zZWxmKSB7XG4gICAgICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBnZXRDb21wb25lbnROYW1lKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQudHlwZSk7XG5cbiAgICAgICAgICBpZiAoIWRpZFdhcm5BYm91dFN0cmluZ1JlZnNbY29tcG9uZW50TmFtZV0pIHtcbiAgICAgICAgICAgIGVycm9yKCdDb21wb25lbnQgXCIlc1wiIGNvbnRhaW5zIHRoZSBzdHJpbmcgcmVmIFwiJXNcIi4gJyArICdTdXBwb3J0IGZvciBzdHJpbmcgcmVmcyB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gJyArICdUaGlzIGNhc2UgY2Fubm90IGJlIGF1dG9tYXRpY2FsbHkgY29udmVydGVkIHRvIGFuIGFycm93IGZ1bmN0aW9uLiAnICsgJ1dlIGFzayB5b3UgdG8gbWFudWFsbHkgZml4IHRoaXMgY2FzZSBieSB1c2luZyB1c2VSZWYoKSBvciBjcmVhdGVSZWYoKSBpbnN0ZWFkLiAnICsgJ0xlYXJuIG1vcmUgYWJvdXQgdXNpbmcgcmVmcyBzYWZlbHkgaGVyZTogJyArICdodHRwczovL3JlYWN0anMub3JnL2xpbmsvc3RyaWN0LW1vZGUtc3RyaW5nLXJlZicsIGNvbXBvbmVudE5hbWUsIGNvbmZpZy5yZWYpO1xuICAgICAgICAgICAgZGlkV2FybkFib3V0U3RyaW5nUmVmc1tjb21wb25lbnROYW1lXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gICAgICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIGluc3RhbmNlb2YgY2hlY2tcbiAgICAgKiB3aWxsIG5vdCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAgICAgKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSB0eXBlXG4gICAgICogQHBhcmFtIHsqfSBwcm9wc1xuICAgICAqIEBwYXJhbSB7Kn0ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAgICAgKiBAcGFyYW0geyp9IG93bmVyXG4gICAgICogQHBhcmFtIHsqfSBzZWxmIEEgKnRlbXBvcmFyeSogaGVscGVyIHRvIGRldGVjdCBwbGFjZXMgd2hlcmUgYHRoaXNgIGlzXG4gICAgICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICAgICAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gICAgICogZnVuY3Rpb25zLCBhbmQgYXMgbG9uZyBhcyBgdGhpc2AgYW5kIG93bmVyIGFyZSB0aGUgc2FtZSwgdGhlcmUgd2lsbCBiZSBub1xuICAgICAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAgICAgKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAgICAgKiBpbmRpY2F0aW5nIGZpbGVuYW1lLCBsaW5lIG51bWJlciwgYW5kL29yIG90aGVyIGluZm9ybWF0aW9uLlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuXG5cbiAgICB2YXIgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICAgICAgdmFyIGVsZW1lbnQgPSB7XG4gICAgICAgIC8vIFRoaXMgdGFnIGFsbG93cyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgRWxlbWVudFxuICAgICAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuICAgICAgICAvLyBCdWlsdC1pbiBwcm9wZXJ0aWVzIHRoYXQgYmVsb25nIG9uIHRoZSBlbGVtZW50XG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIGtleToga2V5LFxuICAgICAgICByZWY6IHJlZixcbiAgICAgICAgcHJvcHM6IHByb3BzLFxuICAgICAgICAvLyBSZWNvcmQgdGhlIGNvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhpcyBlbGVtZW50LlxuICAgICAgICBfb3duZXI6IG93bmVyXG4gICAgICB9O1xuICAgICAge1xuICAgICAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgICAgIC8vIGFuIGV4dGVybmFsIGJhY2tpbmcgc3RvcmUgc28gdGhhdCB3ZSBjYW4gZnJlZXplIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgICAgIC8vIFRoaXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggYSBXZWFrTWFwIG9uY2UgdGhleSBhcmUgaW1wbGVtZW50ZWQgaW5cbiAgICAgICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgICAgIGVsZW1lbnQuX3N0b3JlID0ge307IC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgICAgIC8vIHRoZSB2YWxpZGF0aW9uIGZsYWcgbm9uLWVudW1lcmFibGUgKHdoZXJlIHBvc3NpYmxlLCB3aGljaCBzaG91bGRcbiAgICAgICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAgICAgLy8gaWdub3JlcyBpdC5cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgICAgfSk7IC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zZWxmJywge1xuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgIHZhbHVlOiBzZWxmXG4gICAgICAgIH0pOyAvLyBUd28gZWxlbWVudHMgY3JlYXRlZCBpbiB0d28gZGlmZmVyZW50IHBsYWNlcyBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgICAgICAvLyBlcXVhbCBmb3IgdGVzdGluZyBwdXJwb3NlcyBhbmQgdGhlcmVmb3JlIHdlIGhpZGUgaXQgZnJvbSBlbnVtZXJhdGlvbi5cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zb3VyY2UnLCB7XG4gICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgdmFsdWU6IHNvdXJjZVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudC5wcm9wcyk7XG4gICAgICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gICAgICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjcmVhdGVlbGVtZW50XG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgY29uZmlnLCBjaGlsZHJlbikge1xuICAgICAgdmFyIHByb3BOYW1lOyAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG5cbiAgICAgIHZhciBwcm9wcyA9IHt9O1xuICAgICAgdmFyIGtleSA9IG51bGw7XG4gICAgICB2YXIgcmVmID0gbnVsbDtcbiAgICAgIHZhciBzZWxmID0gbnVsbDtcbiAgICAgIHZhciBzb3VyY2UgPSBudWxsO1xuXG4gICAgICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHdhcm5JZlN0cmluZ1JlZkNhbm5vdEJlQXV0b0NvbnZlcnRlZChjb25maWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZiA9IGNvbmZpZy5fX3NlbGYgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zZWxmO1xuICAgICAgICBzb3VyY2UgPSBjb25maWcuX19zb3VyY2UgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zb3VyY2U7IC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcblxuICAgICAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgICAgIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuXG5cbiAgICAgIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuXG4gICAgICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgICAgICB9XG5cbiAgICAgICAge1xuICAgICAgICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICAgICAgICBPYmplY3QuZnJlZXplKGNoaWxkQXJyYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gICAgICB9IC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuXG5cbiAgICAgIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcblxuICAgICAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAge1xuICAgICAgICBpZiAoa2V5IHx8IHJlZikge1xuICAgICAgICAgIHZhciBkaXNwbGF5TmFtZSA9IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nID8gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgJ1Vua25vd24nIDogdHlwZTtcblxuICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJlZikge1xuICAgICAgICAgICAgZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCwgcHJvcHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb25lQW5kUmVwbGFjZUtleShvbGRFbGVtZW50LCBuZXdLZXkpIHtcbiAgICAgIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50KG9sZEVsZW1lbnQudHlwZSwgbmV3S2V5LCBvbGRFbGVtZW50LnJlZiwgb2xkRWxlbWVudC5fc2VsZiwgb2xkRWxlbWVudC5fc291cmNlLCBvbGRFbGVtZW50Ll9vd25lciwgb2xkRWxlbWVudC5wcm9wcyk7XG4gICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvbmUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgdXNpbmcgZWxlbWVudCBhcyB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjbG9uZWVsZW1lbnRcbiAgICAgKi9cblxuXG4gICAgZnVuY3Rpb24gY2xvbmVFbGVtZW50KGVsZW1lbnQsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgICAgIGlmICghIShlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAge1xuICAgICAgICAgIHRocm93IEVycm9yKFwiUmVhY3QuY2xvbmVFbGVtZW50KC4uLik6IFRoZSBhcmd1bWVudCBtdXN0IGJlIGEgUmVhY3QgZWxlbWVudCwgYnV0IHlvdSBwYXNzZWQgXCIgKyBlbGVtZW50ICsgXCIuXCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBwcm9wTmFtZTsgLy8gT3JpZ2luYWwgcHJvcHMgYXJlIGNvcGllZFxuXG4gICAgICB2YXIgcHJvcHMgPSBfYXNzaWduKHt9LCBlbGVtZW50LnByb3BzKTsgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuXG5cbiAgICAgIHZhciBrZXkgPSBlbGVtZW50LmtleTtcbiAgICAgIHZhciByZWYgPSBlbGVtZW50LnJlZjsgLy8gU2VsZiBpcyBwcmVzZXJ2ZWQgc2luY2UgdGhlIG93bmVyIGlzIHByZXNlcnZlZC5cblxuICAgICAgdmFyIHNlbGYgPSBlbGVtZW50Ll9zZWxmOyAvLyBTb3VyY2UgaXMgcHJlc2VydmVkIHNpbmNlIGNsb25lRWxlbWVudCBpcyB1bmxpa2VseSB0byBiZSB0YXJnZXRlZCBieSBhXG4gICAgICAvLyB0cmFuc3BpbGVyLCBhbmQgdGhlIG9yaWdpbmFsIHNvdXJjZSBpcyBwcm9iYWJseSBhIGJldHRlciBpbmRpY2F0b3Igb2YgdGhlXG4gICAgICAvLyB0cnVlIG93bmVyLlxuXG4gICAgICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlOyAvLyBPd25lciB3aWxsIGJlIHByZXNlcnZlZCwgdW5sZXNzIHJlZiBpcyBvdmVycmlkZGVuXG5cbiAgICAgIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuXG4gICAgICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgICAgICAvLyBTaWxlbnRseSBzdGVhbCB0aGUgcmVmIGZyb20gdGhlIHBhcmVudC5cbiAgICAgICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgICAgIG93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgICAgICB9IC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIG92ZXJyaWRlIGV4aXN0aW5nIHByb3BzXG5cblxuICAgICAgICB2YXIgZGVmYXVsdFByb3BzO1xuXG4gICAgICAgIGlmIChlbGVtZW50LnR5cGUgJiYgZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcykge1xuICAgICAgICAgIGRlZmF1bHRQcm9wcyA9IGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgICAgIGlmIChjb25maWdbcHJvcE5hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gICAgICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gICAgICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cblxuXG4gICAgICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcblxuICAgICAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFJlYWN0RWxlbWVudChlbGVtZW50LnR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIHRoZSBvYmplY3QgaXMgYSBSZWFjdEVsZW1lbnQuXG4gICAgICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNpc3ZhbGlkZWxlbWVudFxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBgb2JqZWN0YCBpcyBhIFJlYWN0RWxlbWVudC5cbiAgICAgKiBAZmluYWxcbiAgICAgKi9cblxuXG4gICAgZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnQob2JqZWN0KSB7XG4gICAgICByZXR1cm4gX3R5cGVvZihvYmplY3QpID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG4gICAgfVxuXG4gICAgdmFyIFNFUEFSQVRPUiA9ICcuJztcbiAgICB2YXIgU1VCU0VQQVJBVE9SID0gJzonO1xuICAgIC8qKlxuICAgICAqIEVzY2FwZSBhbmQgd3JhcCBrZXkgc28gaXQgaXMgc2FmZSB0byB1c2UgYXMgYSByZWFjdGlkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGJlIGVzY2FwZWQuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgZXNjYXBlZCBrZXkuXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gICAgICB2YXIgZXNjYXBlUmVnZXggPSAvWz06XS9nO1xuICAgICAgdmFyIGVzY2FwZXJMb29rdXAgPSB7XG4gICAgICAgICc9JzogJz0wJyxcbiAgICAgICAgJzonOiAnPTInXG4gICAgICB9O1xuICAgICAgdmFyIGVzY2FwZWRTdHJpbmcgPSBrZXkucmVwbGFjZShlc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICckJyArIGVzY2FwZWRTdHJpbmc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRPRE86IFRlc3QgdGhhdCBhIHNpbmdsZSBjaGlsZCBhbmQgYW4gYXJyYXkgd2l0aCBvbmUgaXRlbSBoYXZlIHRoZSBzYW1lIGtleVxuICAgICAqIHBhdHRlcm4uXG4gICAgICovXG5cblxuICAgIHZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG4gICAgdmFyIHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4ID0gL1xcLysvZztcblxuICAgIGZ1bmN0aW9uIGVzY2FwZVVzZXJQcm92aWRlZEtleSh0ZXh0KSB7XG4gICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4LCAnJCYvJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBlbGVtZW50IHdpdGhpbiBhIHNldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudCBBIGVsZW1lbnQgdGhhdCBjb3VsZCBjb250YWluIGEgbWFudWFsIGtleS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBnZXRFbGVtZW50S2V5KGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICAvLyBEbyBzb21lIHR5cGVjaGVja2luZyBoZXJlIHNpbmNlIHdlIGNhbGwgdGhpcyBibGluZGx5LiBXZSB3YW50IHRvIGVuc3VyZVxuICAgICAgLy8gdGhhdCB3ZSBkb24ndCBibG9jayBwb3RlbnRpYWwgZnV0dXJlIEVTIEFQSXMuXG4gICAgICBpZiAoX3R5cGVvZihlbGVtZW50KSA9PT0gJ29iamVjdCcgJiYgZWxlbWVudCAhPT0gbnVsbCAmJiBlbGVtZW50LmtleSAhPSBudWxsKSB7XG4gICAgICAgIC8vIEV4cGxpY2l0IGtleVxuICAgICAgICByZXR1cm4gZXNjYXBlKCcnICsgZWxlbWVudC5rZXkpO1xuICAgICAgfSAvLyBJbXBsaWNpdCBrZXkgZGV0ZXJtaW5lZCBieSB0aGUgaW5kZXggaW4gdGhlIHNldFxuXG5cbiAgICAgIHJldHVybiBpbmRleC50b1N0cmluZygzNik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFwSW50b0FycmF5KGNoaWxkcmVuLCBhcnJheSwgZXNjYXBlZFByZWZpeCwgbmFtZVNvRmFyLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHR5cGUgPSBfdHlwZW9mKGNoaWxkcmVuKTtcblxuICAgICAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgICAvLyBBbGwgb2YgdGhlIGFib3ZlIGFyZSBwZXJjZWl2ZWQgYXMgbnVsbC5cbiAgICAgICAgY2hpbGRyZW4gPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgaW52b2tlQ2FsbGJhY2sgPSBmYWxzZTtcblxuICAgICAgaWYgKGNoaWxkcmVuID09PSBudWxsKSB7XG4gICAgICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgIHN3aXRjaCAoY2hpbGRyZW4uJCR0eXBlb2YpIHtcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgICAgICAgICAgaW52b2tlQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGludm9rZUNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBfY2hpbGQgPSBjaGlsZHJlbjtcbiAgICAgICAgdmFyIG1hcHBlZENoaWxkID0gY2FsbGJhY2soX2NoaWxkKTsgLy8gSWYgaXQncyB0aGUgb25seSBjaGlsZCwgdHJlYXQgdGhlIG5hbWUgYXMgaWYgaXQgd2FzIHdyYXBwZWQgaW4gYW4gYXJyYXlcbiAgICAgICAgLy8gc28gdGhhdCBpdCdzIGNvbnNpc3RlbnQgaWYgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBncm93czpcblxuICAgICAgICB2YXIgY2hpbGRLZXkgPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SICsgZ2V0RWxlbWVudEtleShfY2hpbGQsIDApIDogbmFtZVNvRmFyO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1hcHBlZENoaWxkKSkge1xuICAgICAgICAgIHZhciBlc2NhcGVkQ2hpbGRLZXkgPSAnJztcblxuICAgICAgICAgIGlmIChjaGlsZEtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICBlc2NhcGVkQ2hpbGRLZXkgPSBlc2NhcGVVc2VyUHJvdmlkZWRLZXkoY2hpbGRLZXkpICsgJy8nO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hcEludG9BcnJheShtYXBwZWRDaGlsZCwgYXJyYXksIGVzY2FwZWRDaGlsZEtleSwgJycsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgICAgICAgbWFwcGVkQ2hpbGQgPSBjbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsIC8vIEtlZXAgYm90aCB0aGUgKG1hcHBlZCkgYW5kIG9sZCBrZXlzIGlmIHRoZXkgZGlmZmVyLCBqdXN0IGFzXG4gICAgICAgICAgICAvLyB0cmF2ZXJzZUFsbENoaWxkcmVuIHVzZWQgdG8gZG8gZm9yIG9iamVjdHMgYXMgY2hpbGRyZW5cbiAgICAgICAgICAgIGVzY2FwZWRQcmVmaXggKyAoIC8vICRGbG93Rml4TWUgRmxvdyBpbmNvcnJlY3RseSB0aGlua3MgUmVhY3QuUG9ydGFsIGRvZXNuJ3QgaGF2ZSBhIGtleVxuICAgICAgICAgICAgbWFwcGVkQ2hpbGQua2V5ICYmICghX2NoaWxkIHx8IF9jaGlsZC5rZXkgIT09IG1hcHBlZENoaWxkLmtleSkgPyAvLyAkRmxvd0ZpeE1lIEZsb3cgaW5jb3JyZWN0bHkgdGhpbmtzIGV4aXN0aW5nIGVsZW1lbnQncyBrZXkgY2FuIGJlIGEgbnVtYmVyXG4gICAgICAgICAgICBlc2NhcGVVc2VyUHJvdmlkZWRLZXkoJycgKyBtYXBwZWRDaGlsZC5rZXkpICsgJy8nIDogJycpICsgY2hpbGRLZXkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFycmF5LnB1c2gobWFwcGVkQ2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaGlsZDtcbiAgICAgIHZhciBuZXh0TmFtZTtcbiAgICAgIHZhciBzdWJ0cmVlQ291bnQgPSAwOyAvLyBDb3VudCBvZiBjaGlsZHJlbiBmb3VuZCBpbiB0aGUgY3VycmVudCBzdWJ0cmVlLlxuXG4gICAgICB2YXIgbmV4dE5hbWVQcmVmaXggPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SIDogbmFtZVNvRmFyICsgU1VCU0VQQVJBVE9SO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldEVsZW1lbnRLZXkoY2hpbGQsIGkpO1xuICAgICAgICAgIHN1YnRyZWVDb3VudCArPSBtYXBJbnRvQXJyYXkoY2hpbGQsIGFycmF5LCBlc2NhcGVkUHJlZml4LCBuZXh0TmFtZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4oY2hpbGRyZW4pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBpdGVyYWJsZUNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gV2FybiBhYm91dCB1c2luZyBNYXBzIGFzIGNoaWxkcmVuXG4gICAgICAgICAgICBpZiAoaXRlcmF0b3JGbiA9PT0gaXRlcmFibGVDaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgICAgICAgIGlmICghZGlkV2FybkFib3V0TWFwcykge1xuICAgICAgICAgICAgICAgIHdhcm4oJ1VzaW5nIE1hcHMgYXMgY2hpbGRyZW4gaXMgbm90IHN1cHBvcnRlZC4gJyArICdVc2UgYW4gYXJyYXkgb2Yga2V5ZWQgUmVhY3RFbGVtZW50cyBpbnN0ZWFkLicpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZGlkV2FybkFib3V0TWFwcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChpdGVyYWJsZUNoaWxkcmVuKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICB2YXIgaWkgPSAwO1xuXG4gICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldEVsZW1lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICAgICAgc3VidHJlZUNvdW50ICs9IG1hcEludG9BcnJheShjaGlsZCwgYXJyYXksIGVzY2FwZWRQcmVmaXgsIG5leHROYW1lLCBjYWxsYmFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdmFyIGNoaWxkcmVuU3RyaW5nID0gJycgKyBjaGlsZHJlbjtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRocm93IEVycm9yKFwiT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiBcIiArIChjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcpICsgXCIpLiBJZiB5b3UgbWVhbnQgdG8gcmVuZGVyIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiwgdXNlIGFuIGFycmF5IGluc3RlYWQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3VidHJlZUNvdW50O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXBzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAgICAgKlxuICAgICAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbm1hcFxuICAgICAqXG4gICAgICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAgICAgKiBsZWFmIGNoaWxkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmdW5jIFRoZSBtYXAgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICAgICAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jLCBjb250ZXh0KSB7XG4gICAgICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgICB9XG5cbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICBtYXBJbnRvQXJyYXkoY2hpbGRyZW4sIHJlc3VsdCwgJycsICcnLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgY291bnQrKyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICAgICAqIGBwcm9wcy5jaGlsZHJlbmAuXG4gICAgICpcbiAgICAgKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5jb3VudFxuICAgICAqXG4gICAgICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuLlxuICAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBjb3VudENoaWxkcmVuKGNoaWxkcmVuKSB7XG4gICAgICB2YXIgbiA9IDA7XG4gICAgICBtYXBDaGlsZHJlbihjaGlsZHJlbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBuKys7IC8vIERvbid0IHJldHVybiBhbnl0aGluZ1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgdGhyb3VnaCBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gICAgICpcbiAgICAgKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5mb3JlYWNoXG4gICAgICpcbiAgICAgKiBUaGUgcHJvdmlkZWQgZm9yRWFjaEZ1bmMoY2hpbGQsIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICAgICAqIGxlYWYgY2hpbGQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZvckVhY2hGdW5jXG4gICAgICogQHBhcmFtIHsqfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IGZvciBmb3JFYWNoQ29udGV4dC5cbiAgICAgKi9cblxuXG4gICAgZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgICAgIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvckVhY2hGdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIERvbid0IHJldHVybiBhbnl0aGluZy5cbiAgICAgIH0sIGZvckVhY2hDb250ZXh0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmxhdHRlbiBhIGNoaWxkcmVuIG9iamVjdCAodHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gKSBhbmRcbiAgICAgKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGNoaWxkcmVudG9hcnJheVxuICAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiB0b0FycmF5KGNoaWxkcmVuKSB7XG4gICAgICByZXR1cm4gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICB9KSB8fCBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZmlyc3QgY2hpbGQgaW4gYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuIGFuZCB2ZXJpZmllcyB0aGF0IHRoZXJlXG4gICAgICogaXMgb25seSBvbmUgY2hpbGQgaW4gdGhlIGNvbGxlY3Rpb24uXG4gICAgICpcbiAgICAgKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5vbmx5XG4gICAgICpcbiAgICAgKiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBhIHNpbmdsZSBjaGlsZCBnZXRzXG4gICAgICogcGFzc2VkIHdpdGhvdXQgYSB3cmFwcGVyLCBidXQgdGhlIHB1cnBvc2Ugb2YgdGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdG9cbiAgICAgKiBhYnN0cmFjdCBhd2F5IHRoZSBwYXJ0aWN1bGFyIHN0cnVjdHVyZSBvZiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gY2hpbGRyZW4gQ2hpbGQgY29sbGVjdGlvbiBzdHJ1Y3R1cmUuXG4gICAgICogQHJldHVybiB7UmVhY3RFbGVtZW50fSBUaGUgZmlyc3QgYW5kIG9ubHkgYFJlYWN0RWxlbWVudGAgY29udGFpbmVkIGluIHRoZVxuICAgICAqIHN0cnVjdHVyZS5cbiAgICAgKi9cblxuXG4gICAgZnVuY3Rpb24gb25seUNoaWxkKGNoaWxkcmVuKSB7XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgICAgICB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoXCJSZWFjdC5DaGlsZHJlbi5vbmx5IGV4cGVjdGVkIHRvIHJlY2VpdmUgYSBzaW5nbGUgUmVhY3QgZWxlbWVudCBjaGlsZC5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoZGVmYXVsdFZhbHVlLCBjYWxjdWxhdGVDaGFuZ2VkQml0cykge1xuICAgICAgaWYgKGNhbGN1bGF0ZUNoYW5nZWRCaXRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2FsY3VsYXRlQ2hhbmdlZEJpdHMgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAge1xuICAgICAgICAgIGlmIChjYWxjdWxhdGVDaGFuZ2VkQml0cyAhPT0gbnVsbCAmJiB0eXBlb2YgY2FsY3VsYXRlQ2hhbmdlZEJpdHMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGVycm9yKCdjcmVhdGVDb250ZXh0OiBFeHBlY3RlZCB0aGUgb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGEgJyArICdmdW5jdGlvbi4gSW5zdGVhZCByZWNlaXZlZDogJXMnLCBjYWxjdWxhdGVDaGFuZ2VkQml0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0ge1xuICAgICAgICAkJHR5cGVvZjogUkVBQ1RfQ09OVEVYVF9UWVBFLFxuICAgICAgICBfY2FsY3VsYXRlQ2hhbmdlZEJpdHM6IGNhbGN1bGF0ZUNoYW5nZWRCaXRzLFxuICAgICAgICAvLyBBcyBhIHdvcmthcm91bmQgdG8gc3VwcG9ydCBtdWx0aXBsZSBjb25jdXJyZW50IHJlbmRlcmVycywgd2UgY2F0ZWdvcml6ZVxuICAgICAgICAvLyBzb21lIHJlbmRlcmVycyBhcyBwcmltYXJ5IGFuZCBvdGhlcnMgYXMgc2Vjb25kYXJ5LiBXZSBvbmx5IGV4cGVjdFxuICAgICAgICAvLyB0aGVyZSB0byBiZSB0d28gY29uY3VycmVudCByZW5kZXJlcnMgYXQgbW9zdDogUmVhY3QgTmF0aXZlIChwcmltYXJ5KSBhbmRcbiAgICAgICAgLy8gRmFicmljIChzZWNvbmRhcnkpOyBSZWFjdCBET00gKHByaW1hcnkpIGFuZCBSZWFjdCBBUlQgKHNlY29uZGFyeSkuXG4gICAgICAgIC8vIFNlY29uZGFyeSByZW5kZXJlcnMgc3RvcmUgdGhlaXIgY29udGV4dCB2YWx1ZXMgb24gc2VwYXJhdGUgZmllbGRzLlxuICAgICAgICBfY3VycmVudFZhbHVlOiBkZWZhdWx0VmFsdWUsXG4gICAgICAgIF9jdXJyZW50VmFsdWUyOiBkZWZhdWx0VmFsdWUsXG4gICAgICAgIC8vIFVzZWQgdG8gdHJhY2sgaG93IG1hbnkgY29uY3VycmVudCByZW5kZXJlcnMgdGhpcyBjb250ZXh0IGN1cnJlbnRseVxuICAgICAgICAvLyBzdXBwb3J0cyB3aXRoaW4gaW4gYSBzaW5nbGUgcmVuZGVyZXIuIFN1Y2ggYXMgcGFyYWxsZWwgc2VydmVyIHJlbmRlcmluZy5cbiAgICAgICAgX3RocmVhZENvdW50OiAwLFxuICAgICAgICAvLyBUaGVzZSBhcmUgY2lyY3VsYXJcbiAgICAgICAgUHJvdmlkZXI6IG51bGwsXG4gICAgICAgIENvbnN1bWVyOiBudWxsXG4gICAgICB9O1xuICAgICAgY29udGV4dC5Qcm92aWRlciA9IHtcbiAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX1BST1ZJREVSX1RZUEUsXG4gICAgICAgIF9jb250ZXh0OiBjb250ZXh0XG4gICAgICB9O1xuICAgICAgdmFyIGhhc1dhcm5lZEFib3V0VXNpbmdOZXN0ZWRDb250ZXh0Q29uc3VtZXJzID0gZmFsc2U7XG4gICAgICB2YXIgaGFzV2FybmVkQWJvdXRVc2luZ0NvbnN1bWVyUHJvdmlkZXIgPSBmYWxzZTtcbiAgICAgIHZhciBoYXNXYXJuZWRBYm91dERpc3BsYXlOYW1lT25Db25zdW1lciA9IGZhbHNlO1xuICAgICAge1xuICAgICAgICAvLyBBIHNlcGFyYXRlIG9iamVjdCwgYnV0IHByb3hpZXMgYmFjayB0byB0aGUgb3JpZ2luYWwgY29udGV4dCBvYmplY3QgZm9yXG4gICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LiBJdCBoYXMgYSBkaWZmZXJlbnQgJCR0eXBlb2YsIHNvIHdlIGNhbiBwcm9wZXJseVxuICAgICAgICAvLyB3YXJuIGZvciB0aGUgaW5jb3JyZWN0IHVzYWdlIG9mIENvbnRleHQgYXMgYSBDb25zdW1lci5cbiAgICAgICAgdmFyIENvbnN1bWVyID0ge1xuICAgICAgICAgICQkdHlwZW9mOiBSRUFDVF9DT05URVhUX1RZUEUsXG4gICAgICAgICAgX2NvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgX2NhbGN1bGF0ZUNoYW5nZWRCaXRzOiBjb250ZXh0Ll9jYWxjdWxhdGVDaGFuZ2VkQml0c1xuICAgICAgICB9OyAvLyAkRmxvd0ZpeE1lOiBGbG93IGNvbXBsYWlucyBhYm91dCBub3Qgc2V0dGluZyBhIHZhbHVlLCB3aGljaCBpcyBpbnRlbnRpb25hbCBoZXJlXG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQ29uc3VtZXIsIHtcbiAgICAgICAgICBQcm92aWRlcjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgIGlmICghaGFzV2FybmVkQWJvdXRVc2luZ0NvbnN1bWVyUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgICBoYXNXYXJuZWRBYm91dFVzaW5nQ29uc3VtZXJQcm92aWRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgZXJyb3IoJ1JlbmRlcmluZyA8Q29udGV4dC5Db25zdW1lci5Qcm92aWRlcj4gaXMgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluICcgKyAnYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gRGlkIHlvdSBtZWFuIHRvIHJlbmRlciA8Q29udGV4dC5Qcm92aWRlcj4gaW5zdGVhZD8nKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LlByb3ZpZGVyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KF9Qcm92aWRlcikge1xuICAgICAgICAgICAgICBjb250ZXh0LlByb3ZpZGVyID0gX1Byb3ZpZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgX2N1cnJlbnRWYWx1ZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb250ZXh0Ll9jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoX2N1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICBjb250ZXh0Ll9jdXJyZW50VmFsdWUgPSBfY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgX2N1cnJlbnRWYWx1ZTI6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5fY3VycmVudFZhbHVlMjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChfY3VycmVudFZhbHVlMikge1xuICAgICAgICAgICAgICBjb250ZXh0Ll9jdXJyZW50VmFsdWUyID0gX2N1cnJlbnRWYWx1ZTI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfdGhyZWFkQ291bnQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5fdGhyZWFkQ291bnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoX3RocmVhZENvdW50KSB7XG4gICAgICAgICAgICAgIGNvbnRleHQuX3RocmVhZENvdW50ID0gX3RocmVhZENvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgQ29uc3VtZXI6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICBpZiAoIWhhc1dhcm5lZEFib3V0VXNpbmdOZXN0ZWRDb250ZXh0Q29uc3VtZXJzKSB7XG4gICAgICAgICAgICAgICAgaGFzV2FybmVkQWJvdXRVc2luZ05lc3RlZENvbnRleHRDb25zdW1lcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVycm9yKCdSZW5kZXJpbmcgPENvbnRleHQuQ29uc3VtZXIuQ29uc3VtZXI+IGlzIG5vdCBzdXBwb3J0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAnICsgJ2EgZnV0dXJlIG1ham9yIHJlbGVhc2UuIERpZCB5b3UgbWVhbiB0byByZW5kZXIgPENvbnRleHQuQ29uc3VtZXI+IGluc3RlYWQ/Jyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5Db25zdW1lcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGRpc3BsYXlOYW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuZGlzcGxheU5hbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICAgICAgaWYgKCFoYXNXYXJuZWRBYm91dERpc3BsYXlOYW1lT25Db25zdW1lcikge1xuICAgICAgICAgICAgICAgIHdhcm4oJ1NldHRpbmcgYGRpc3BsYXlOYW1lYCBvbiBDb250ZXh0LkNvbnN1bWVyIGhhcyBubyBlZmZlY3QuICcgKyBcIllvdSBzaG91bGQgc2V0IGl0IGRpcmVjdGx5IG9uIHRoZSBjb250ZXh0IHdpdGggQ29udGV4dC5kaXNwbGF5TmFtZSA9ICclcycuXCIsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgICAgICBoYXNXYXJuZWRBYm91dERpc3BsYXlOYW1lT25Db25zdW1lciA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pOyAvLyAkRmxvd0ZpeE1lOiBGbG93IGNvbXBsYWlucyBhYm91dCBtaXNzaW5nIHByb3BlcnRpZXMgYmVjYXVzZSBpdCBkb2Vzbid0IHVuZGVyc3RhbmQgZGVmaW5lUHJvcGVydHlcblxuICAgICAgICBjb250ZXh0LkNvbnN1bWVyID0gQ29uc3VtZXI7XG4gICAgICB9XG4gICAgICB7XG4gICAgICAgIGNvbnRleHQuX2N1cnJlbnRSZW5kZXJlciA9IG51bGw7XG4gICAgICAgIGNvbnRleHQuX2N1cnJlbnRSZW5kZXJlcjIgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuXG4gICAgdmFyIFVuaW5pdGlhbGl6ZWQgPSAtMTtcbiAgICB2YXIgUGVuZGluZyA9IDA7XG4gICAgdmFyIFJlc29sdmVkID0gMTtcbiAgICB2YXIgUmVqZWN0ZWQgPSAyO1xuXG4gICAgZnVuY3Rpb24gbGF6eUluaXRpYWxpemVyKHBheWxvYWQpIHtcbiAgICAgIGlmIChwYXlsb2FkLl9zdGF0dXMgPT09IFVuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdmFyIGN0b3IgPSBwYXlsb2FkLl9yZXN1bHQ7XG4gICAgICAgIHZhciB0aGVuYWJsZSA9IGN0b3IoKTsgLy8gVHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzdGF0ZS5cblxuICAgICAgICB2YXIgcGVuZGluZyA9IHBheWxvYWQ7XG4gICAgICAgIHBlbmRpbmcuX3N0YXR1cyA9IFBlbmRpbmc7XG4gICAgICAgIHBlbmRpbmcuX3Jlc3VsdCA9IHRoZW5hYmxlO1xuICAgICAgICB0aGVuYWJsZS50aGVuKGZ1bmN0aW9uIChtb2R1bGVPYmplY3QpIHtcbiAgICAgICAgICBpZiAocGF5bG9hZC5fc3RhdHVzID09PSBQZW5kaW5nKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdEV4cG9ydCA9IG1vZHVsZU9iamVjdFtcImRlZmF1bHRcIl07XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlmIChkZWZhdWx0RXhwb3J0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBlcnJvcignbGF6eTogRXhwZWN0ZWQgdGhlIHJlc3VsdCBvZiBhIGR5bmFtaWMgaW1wb3J0KCkgY2FsbC4gJyArICdJbnN0ZWFkIHJlY2VpdmVkOiAlc1xcblxcbllvdXIgY29kZSBzaG91bGQgbG9vayBsaWtlOiBcXG4gICcgKyAvLyBCcmVhayB1cCBpbXBvcnRzIHRvIGF2b2lkIGFjY2lkZW50YWxseSBwYXJzaW5nIHRoZW0gYXMgZGVwZW5kZW5jaWVzLlxuICAgICAgICAgICAgICAgICdjb25zdCBNeUNvbXBvbmVudCA9IGxhenkoKCkgPT4gaW1wJyArIFwib3J0KCcuL015Q29tcG9uZW50JykpXCIsIG1vZHVsZU9iamVjdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLy8gVHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzdGF0ZS5cblxuICAgICAgICAgICAgdmFyIHJlc29sdmVkID0gcGF5bG9hZDtcbiAgICAgICAgICAgIHJlc29sdmVkLl9zdGF0dXMgPSBSZXNvbHZlZDtcbiAgICAgICAgICAgIHJlc29sdmVkLl9yZXN1bHQgPSBkZWZhdWx0RXhwb3J0O1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgaWYgKHBheWxvYWQuX3N0YXR1cyA9PT0gUGVuZGluZykge1xuICAgICAgICAgICAgLy8gVHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzdGF0ZS5cbiAgICAgICAgICAgIHZhciByZWplY3RlZCA9IHBheWxvYWQ7XG4gICAgICAgICAgICByZWplY3RlZC5fc3RhdHVzID0gUmVqZWN0ZWQ7XG4gICAgICAgICAgICByZWplY3RlZC5fcmVzdWx0ID0gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBheWxvYWQuX3N0YXR1cyA9PT0gUmVzb2x2ZWQpIHtcbiAgICAgICAgcmV0dXJuIHBheWxvYWQuX3Jlc3VsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IHBheWxvYWQuX3Jlc3VsdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYXp5KGN0b3IpIHtcbiAgICAgIHZhciBwYXlsb2FkID0ge1xuICAgICAgICAvLyBXZSB1c2UgdGhlc2UgZmllbGRzIHRvIHN0b3JlIHRoZSByZXN1bHQuXG4gICAgICAgIF9zdGF0dXM6IC0xLFxuICAgICAgICBfcmVzdWx0OiBjdG9yXG4gICAgICB9O1xuICAgICAgdmFyIGxhenlUeXBlID0ge1xuICAgICAgICAkJHR5cGVvZjogUkVBQ1RfTEFaWV9UWVBFLFxuICAgICAgICBfcGF5bG9hZDogcGF5bG9hZCxcbiAgICAgICAgX2luaXQ6IGxhenlJbml0aWFsaXplclxuICAgICAgfTtcbiAgICAgIHtcbiAgICAgICAgLy8gSW4gcHJvZHVjdGlvbiwgdGhpcyB3b3VsZCBqdXN0IHNldCBpdCBvbiB0aGUgb2JqZWN0LlxuICAgICAgICB2YXIgZGVmYXVsdFByb3BzO1xuICAgICAgICB2YXIgcHJvcFR5cGVzOyAvLyAkRmxvd0ZpeE1lXG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobGF6eVR5cGUsIHtcbiAgICAgICAgICBkZWZhdWx0UHJvcHM6IHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdFByb3BzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KG5ld0RlZmF1bHRQcm9wcykge1xuICAgICAgICAgICAgICBlcnJvcignUmVhY3QubGF6eSguLi4pOiBJdCBpcyBub3Qgc3VwcG9ydGVkIHRvIGFzc2lnbiBgZGVmYXVsdFByb3BzYCB0byAnICsgJ2EgbGF6eSBjb21wb25lbnQgaW1wb3J0LiBFaXRoZXIgc3BlY2lmeSB0aGVtIHdoZXJlIHRoZSBjb21wb25lbnQgJyArICdpcyBkZWZpbmVkLCBvciBjcmVhdGUgYSB3cmFwcGluZyBjb21wb25lbnQgYXJvdW5kIGl0LicpO1xuICAgICAgICAgICAgICBkZWZhdWx0UHJvcHMgPSBuZXdEZWZhdWx0UHJvcHM7IC8vIE1hdGNoIHByb2R1Y3Rpb24gYmVoYXZpb3IgbW9yZSBjbG9zZWx5OlxuICAgICAgICAgICAgICAvLyAkRmxvd0ZpeE1lXG5cbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGxhenlUeXBlLCAnZGVmYXVsdFByb3BzJywge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvcFR5cGVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KG5ld1Byb3BUeXBlcykge1xuICAgICAgICAgICAgICBlcnJvcignUmVhY3QubGF6eSguLi4pOiBJdCBpcyBub3Qgc3VwcG9ydGVkIHRvIGFzc2lnbiBgcHJvcFR5cGVzYCB0byAnICsgJ2EgbGF6eSBjb21wb25lbnQgaW1wb3J0LiBFaXRoZXIgc3BlY2lmeSB0aGVtIHdoZXJlIHRoZSBjb21wb25lbnQgJyArICdpcyBkZWZpbmVkLCBvciBjcmVhdGUgYSB3cmFwcGluZyBjb21wb25lbnQgYXJvdW5kIGl0LicpO1xuICAgICAgICAgICAgICBwcm9wVHlwZXMgPSBuZXdQcm9wVHlwZXM7IC8vIE1hdGNoIHByb2R1Y3Rpb24gYmVoYXZpb3IgbW9yZSBjbG9zZWx5OlxuICAgICAgICAgICAgICAvLyAkRmxvd0ZpeE1lXG5cbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGxhenlUeXBlLCAncHJvcFR5cGVzJywge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsYXp5VHlwZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3J3YXJkUmVmKHJlbmRlcikge1xuICAgICAge1xuICAgICAgICBpZiAocmVuZGVyICE9IG51bGwgJiYgcmVuZGVyLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUpIHtcbiAgICAgICAgICBlcnJvcignZm9yd2FyZFJlZiByZXF1aXJlcyBhIHJlbmRlciBmdW5jdGlvbiBidXQgcmVjZWl2ZWQgYSBgbWVtb2AgJyArICdjb21wb25lbnQuIEluc3RlYWQgb2YgZm9yd2FyZFJlZihtZW1vKC4uLikpLCB1c2UgJyArICdtZW1vKGZvcndhcmRSZWYoLi4uKSkuJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlbmRlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGVycm9yKCdmb3J3YXJkUmVmIHJlcXVpcmVzIGEgcmVuZGVyIGZ1bmN0aW9uIGJ1dCB3YXMgZ2l2ZW4gJXMuJywgcmVuZGVyID09PSBudWxsID8gJ251bGwnIDogX3R5cGVvZihyZW5kZXIpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocmVuZGVyLmxlbmd0aCAhPT0gMCAmJiByZW5kZXIubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgICAgICBlcnJvcignZm9yd2FyZFJlZiByZW5kZXIgZnVuY3Rpb25zIGFjY2VwdCBleGFjdGx5IHR3byBwYXJhbWV0ZXJzOiBwcm9wcyBhbmQgcmVmLiAlcycsIHJlbmRlci5sZW5ndGggPT09IDEgPyAnRGlkIHlvdSBmb3JnZXQgdG8gdXNlIHRoZSByZWYgcGFyYW1ldGVyPycgOiAnQW55IGFkZGl0aW9uYWwgcGFyYW1ldGVyIHdpbGwgYmUgdW5kZWZpbmVkLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZW5kZXIgIT0gbnVsbCkge1xuICAgICAgICAgIGlmIChyZW5kZXIuZGVmYXVsdFByb3BzICE9IG51bGwgfHwgcmVuZGVyLnByb3BUeXBlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBlcnJvcignZm9yd2FyZFJlZiByZW5kZXIgZnVuY3Rpb25zIGRvIG5vdCBzdXBwb3J0IHByb3BUeXBlcyBvciBkZWZhdWx0UHJvcHMuICcgKyAnRGlkIHlvdSBhY2NpZGVudGFsbHkgcGFzcyBhIFJlYWN0IGNvbXBvbmVudD8nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBlbGVtZW50VHlwZSA9IHtcbiAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUsXG4gICAgICAgIHJlbmRlcjogcmVuZGVyXG4gICAgICB9O1xuICAgICAge1xuICAgICAgICB2YXIgb3duTmFtZTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnRUeXBlLCAnZGlzcGxheU5hbWUnLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIG93bk5hbWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChuYW1lKSB7XG4gICAgICAgICAgICBvd25OYW1lID0gbmFtZTtcblxuICAgICAgICAgICAgaWYgKHJlbmRlci5kaXNwbGF5TmFtZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJlbmRlci5kaXNwbGF5TmFtZSA9IG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbGVtZW50VHlwZTtcbiAgICB9IC8vIEZpbHRlciBjZXJ0YWluIERPTSBhdHRyaWJ1dGVzIChlLmcuIHNyYywgaHJlZikgaWYgdGhlaXIgdmFsdWVzIGFyZSBlbXB0eSBzdHJpbmdzLlxuXG5cbiAgICB2YXIgZW5hYmxlU2NvcGVBUEkgPSBmYWxzZTsgLy8gRXhwZXJpbWVudGFsIENyZWF0ZSBFdmVudCBIYW5kbGUgQVBJLlxuXG4gICAgZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IC8vIE5vdGU6IHR5cGVvZiBtaWdodCBiZSBvdGhlciB0aGFuICdzeW1ib2wnIG9yICdudW1iZXInIChlLmcuIGlmIGl0J3MgYSBwb2x5ZmlsbCkuXG5cblxuICAgICAgaWYgKHR5cGUgPT09IGV4cG9ydHMuRnJhZ21lbnQgfHwgdHlwZSA9PT0gZXhwb3J0cy5Qcm9maWxlciB8fCB0eXBlID09PSBSRUFDVF9ERUJVR19UUkFDSU5HX01PREVfVFlQRSB8fCB0eXBlID09PSBleHBvcnRzLlN0cmljdE1vZGUgfHwgdHlwZSA9PT0gZXhwb3J0cy5TdXNwZW5zZSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfTEVHQUNZX0hJRERFTl9UWVBFIHx8IGVuYWJsZVNjb3BlQVBJKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3R5cGVvZih0eXBlKSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9QUk9WSURFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlRFWFRfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQkxPQ0tfVFlQRSB8fCB0eXBlWzBdID09PSBSRUFDVF9TRVJWRVJfQkxPQ0tfVFlQRSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZW1vKHR5cGUsIGNvbXBhcmUpIHtcbiAgICAgIHtcbiAgICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkpIHtcbiAgICAgICAgICBlcnJvcignbWVtbzogVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBjb21wb25lbnQuIEluc3RlYWQgJyArICdyZWNlaXZlZDogJXMnLCB0eXBlID09PSBudWxsID8gJ251bGwnIDogX3R5cGVvZih0eXBlKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBlbGVtZW50VHlwZSA9IHtcbiAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX01FTU9fVFlQRSxcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgY29tcGFyZTogY29tcGFyZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbXBhcmVcbiAgICAgIH07XG4gICAgICB7XG4gICAgICAgIHZhciBvd25OYW1lO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudFR5cGUsICdkaXNwbGF5TmFtZScsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gb3duTmFtZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KG5hbWUpIHtcbiAgICAgICAgICAgIG93bk5hbWUgPSBuYW1lO1xuXG4gICAgICAgICAgICBpZiAodHlwZS5kaXNwbGF5TmFtZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHR5cGUuZGlzcGxheU5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudFR5cGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZURpc3BhdGNoZXIoKSB7XG4gICAgICB2YXIgZGlzcGF0Y2hlciA9IFJlYWN0Q3VycmVudERpc3BhdGNoZXIuY3VycmVudDtcblxuICAgICAgaWYgKCEoZGlzcGF0Y2hlciAhPT0gbnVsbCkpIHtcbiAgICAgICAge1xuICAgICAgICAgIHRocm93IEVycm9yKFwiSW52YWxpZCBob29rIGNhbGwuIEhvb2tzIGNhbiBvbmx5IGJlIGNhbGxlZCBpbnNpZGUgb2YgdGhlIGJvZHkgb2YgYSBmdW5jdGlvbiBjb21wb25lbnQuIFRoaXMgY291bGQgaGFwcGVuIGZvciBvbmUgb2YgdGhlIGZvbGxvd2luZyByZWFzb25zOlxcbjEuIFlvdSBtaWdodCBoYXZlIG1pc21hdGNoaW5nIHZlcnNpb25zIG9mIFJlYWN0IGFuZCB0aGUgcmVuZGVyZXIgKHN1Y2ggYXMgUmVhY3QgRE9NKVxcbjIuIFlvdSBtaWdodCBiZSBicmVha2luZyB0aGUgUnVsZXMgb2YgSG9va3NcXG4zLiBZb3UgbWlnaHQgaGF2ZSBtb3JlIHRoYW4gb25lIGNvcHkgb2YgUmVhY3QgaW4gdGhlIHNhbWUgYXBwXFxuU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvbGluay9pbnZhbGlkLWhvb2stY2FsbCBmb3IgdGlwcyBhYm91dCBob3cgdG8gZGVidWcgYW5kIGZpeCB0aGlzIHByb2JsZW0uXCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkaXNwYXRjaGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVzZUNvbnRleHQoQ29udGV4dCwgdW5zdGFibGVfb2JzZXJ2ZWRCaXRzKSB7XG4gICAgICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gICAgICB7XG4gICAgICAgIGlmICh1bnN0YWJsZV9vYnNlcnZlZEJpdHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGVycm9yKCd1c2VDb250ZXh0KCkgc2Vjb25kIGFyZ3VtZW50IGlzIHJlc2VydmVkIGZvciBmdXR1cmUgJyArICd1c2UgaW4gUmVhY3QuIFBhc3NpbmcgaXQgaXMgbm90IHN1cHBvcnRlZC4gJyArICdZb3UgcGFzc2VkOiAlcy4lcycsIHVuc3RhYmxlX29ic2VydmVkQml0cywgdHlwZW9mIHVuc3RhYmxlX29ic2VydmVkQml0cyA9PT0gJ251bWJlcicgJiYgQXJyYXkuaXNBcnJheShhcmd1bWVudHNbMl0pID8gJ1xcblxcbkRpZCB5b3UgY2FsbCBhcnJheS5tYXAodXNlQ29udGV4dCk/ICcgKyAnQ2FsbGluZyBIb29rcyBpbnNpZGUgYSBsb29wIGlzIG5vdCBzdXBwb3J0ZWQuICcgKyAnTGVhcm4gbW9yZSBhdCBodHRwczovL3JlYWN0anMub3JnL2xpbmsvcnVsZXMtb2YtaG9va3MnIDogJycpO1xuICAgICAgICB9IC8vIFRPRE86IGFkZCBhIG1vcmUgZ2VuZXJpYyB3YXJuaW5nIGZvciBpbnZhbGlkIHZhbHVlcy5cblxuXG4gICAgICAgIGlmIChDb250ZXh0Ll9jb250ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgcmVhbENvbnRleHQgPSBDb250ZXh0Ll9jb250ZXh0OyAvLyBEb24ndCBkZWR1cGxpY2F0ZSBiZWNhdXNlIHRoaXMgbGVnaXRpbWF0ZWx5IGNhdXNlcyBidWdzXG4gICAgICAgICAgLy8gYW5kIG5vYm9keSBzaG91bGQgYmUgdXNpbmcgdGhpcyBpbiBleGlzdGluZyBjb2RlLlxuXG4gICAgICAgICAgaWYgKHJlYWxDb250ZXh0LkNvbnN1bWVyID09PSBDb250ZXh0KSB7XG4gICAgICAgICAgICBlcnJvcignQ2FsbGluZyB1c2VDb250ZXh0KENvbnRleHQuQ29uc3VtZXIpIGlzIG5vdCBzdXBwb3J0ZWQsIG1heSBjYXVzZSBidWdzLCBhbmQgd2lsbCBiZSAnICsgJ3JlbW92ZWQgaW4gYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gRGlkIHlvdSBtZWFuIHRvIGNhbGwgdXNlQ29udGV4dChDb250ZXh0KSBpbnN0ZWFkPycpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVhbENvbnRleHQuUHJvdmlkZXIgPT09IENvbnRleHQpIHtcbiAgICAgICAgICAgIGVycm9yKCdDYWxsaW5nIHVzZUNvbnRleHQoQ29udGV4dC5Qcm92aWRlcikgaXMgbm90IHN1cHBvcnRlZC4gJyArICdEaWQgeW91IG1lYW4gdG8gY2FsbCB1c2VDb250ZXh0KENvbnRleHQpIGluc3RlYWQ/Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VDb250ZXh0KENvbnRleHQsIHVuc3RhYmxlX29ic2VydmVkQml0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXNlU3RhdGUoaW5pdGlhbFN0YXRlKSB7XG4gICAgICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gICAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VTdGF0ZShpbml0aWFsU3RhdGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbEFyZywgaW5pdCkge1xuICAgICAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICAgICAgcmV0dXJuIGRpc3BhdGNoZXIudXNlUmVkdWNlcihyZWR1Y2VyLCBpbml0aWFsQXJnLCBpbml0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1c2VSZWYoaW5pdGlhbFZhbHVlKSB7XG4gICAgICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gICAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VSZWYoaW5pdGlhbFZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1c2VFZmZlY3QoY3JlYXRlLCBkZXBzKSB7XG4gICAgICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gICAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VFZmZlY3QoY3JlYXRlLCBkZXBzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1c2VMYXlvdXRFZmZlY3QoY3JlYXRlLCBkZXBzKSB7XG4gICAgICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gICAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VMYXlvdXRFZmZlY3QoY3JlYXRlLCBkZXBzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1c2VDYWxsYmFjayhjYWxsYmFjaywgZGVwcykge1xuICAgICAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICAgICAgcmV0dXJuIGRpc3BhdGNoZXIudXNlQ2FsbGJhY2soY2FsbGJhY2ssIGRlcHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVzZU1lbW8oY3JlYXRlLCBkZXBzKSB7XG4gICAgICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gICAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VNZW1vKGNyZWF0ZSwgZGVwcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsIGNyZWF0ZSwgZGVwcykge1xuICAgICAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICAgICAgcmV0dXJuIGRpc3BhdGNoZXIudXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsIGNyZWF0ZSwgZGVwcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXNlRGVidWdWYWx1ZSh2YWx1ZSwgZm9ybWF0dGVyRm4pIHtcbiAgICAgIHtcbiAgICAgICAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICAgICAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VEZWJ1Z1ZhbHVlKHZhbHVlLCBmb3JtYXR0ZXJGbik7XG4gICAgICB9XG4gICAgfSAvLyBIZWxwZXJzIHRvIHBhdGNoIGNvbnNvbGUubG9ncyB0byBhdm9pZCBsb2dnaW5nIGR1cmluZyBzaWRlLWVmZmVjdCBmcmVlXG4gICAgLy8gcmVwbGF5aW5nIG9uIHJlbmRlciBmdW5jdGlvbi4gVGhpcyBjdXJyZW50bHkgb25seSBwYXRjaGVzIHRoZSBvYmplY3RcbiAgICAvLyBsYXppbHkgd2hpY2ggd29uJ3QgY292ZXIgaWYgdGhlIGxvZyBmdW5jdGlvbiB3YXMgZXh0cmFjdGVkIGVhZ2VybHkuXG4gICAgLy8gV2UgY291bGQgYWxzbyBlYWdlcmx5IHBhdGNoIHRoZSBtZXRob2QuXG5cblxuICAgIHZhciBkaXNhYmxlZERlcHRoID0gMDtcbiAgICB2YXIgcHJldkxvZztcbiAgICB2YXIgcHJldkluZm87XG4gICAgdmFyIHByZXZXYXJuO1xuICAgIHZhciBwcmV2RXJyb3I7XG4gICAgdmFyIHByZXZHcm91cDtcbiAgICB2YXIgcHJldkdyb3VwQ29sbGFwc2VkO1xuICAgIHZhciBwcmV2R3JvdXBFbmQ7XG5cbiAgICBmdW5jdGlvbiBkaXNhYmxlZExvZygpIHt9XG5cbiAgICBkaXNhYmxlZExvZy5fX3JlYWN0RGlzYWJsZWRMb2cgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gZGlzYWJsZUxvZ3MoKSB7XG4gICAgICB7XG4gICAgICAgIGlmIChkaXNhYmxlZERlcHRoID09PSAwKSB7XG4gICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgICAgICAgcHJldkxvZyA9IGNvbnNvbGUubG9nO1xuICAgICAgICAgIHByZXZJbmZvID0gY29uc29sZS5pbmZvO1xuICAgICAgICAgIHByZXZXYXJuID0gY29uc29sZS53YXJuO1xuICAgICAgICAgIHByZXZFcnJvciA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICAgICAgcHJldkdyb3VwID0gY29uc29sZS5ncm91cDtcbiAgICAgICAgICBwcmV2R3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkO1xuICAgICAgICAgIHByZXZHcm91cEVuZCA9IGNvbnNvbGUuZ3JvdXBFbmQ7IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMTkwOTlcblxuICAgICAgICAgIHZhciBwcm9wcyA9IHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogZGlzYWJsZWRMb2csXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgIH07IC8vICRGbG93Rml4TWUgRmxvdyB0aGlua3MgY29uc29sZSBpcyBpbW11dGFibGUuXG5cbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjb25zb2xlLCB7XG4gICAgICAgICAgICBpbmZvOiBwcm9wcyxcbiAgICAgICAgICAgIGxvZzogcHJvcHMsXG4gICAgICAgICAgICB3YXJuOiBwcm9wcyxcbiAgICAgICAgICAgIGVycm9yOiBwcm9wcyxcbiAgICAgICAgICAgIGdyb3VwOiBwcm9wcyxcbiAgICAgICAgICAgIGdyb3VwQ29sbGFwc2VkOiBwcm9wcyxcbiAgICAgICAgICAgIGdyb3VwRW5kOiBwcm9wc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgICAgIH1cblxuICAgICAgICBkaXNhYmxlZERlcHRoKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVlbmFibGVMb2dzKCkge1xuICAgICAge1xuICAgICAgICBkaXNhYmxlZERlcHRoLS07XG5cbiAgICAgICAgaWYgKGRpc2FibGVkRGVwdGggPT09IDApIHtcbiAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC1pbnRlcm5hbC9uby1wcm9kdWN0aW9uLWxvZ2dpbmcgKi9cbiAgICAgICAgICB2YXIgcHJvcHMgPSB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgICB9OyAvLyAkRmxvd0ZpeE1lIEZsb3cgdGhpbmtzIGNvbnNvbGUgaXMgaW1tdXRhYmxlLlxuXG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY29uc29sZSwge1xuICAgICAgICAgICAgbG9nOiBfYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgICAgICB2YWx1ZTogcHJldkxvZ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBpbmZvOiBfYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgICAgICB2YWx1ZTogcHJldkluZm9cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgd2FybjogX2Fzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHByZXZXYXJuXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGVycm9yOiBfYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgICAgICB2YWx1ZTogcHJldkVycm9yXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGdyb3VwOiBfYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgICAgICB2YWx1ZTogcHJldkdyb3VwXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGdyb3VwQ29sbGFwc2VkOiBfYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgICAgICB2YWx1ZTogcHJldkdyb3VwQ29sbGFwc2VkXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGdyb3VwRW5kOiBfYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgICAgICB2YWx1ZTogcHJldkdyb3VwRW5kXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGlzYWJsZWREZXB0aCA8IDApIHtcbiAgICAgICAgICBlcnJvcignZGlzYWJsZWREZXB0aCBmZWxsIGJlbG93IHplcm8uICcgKyAnVGhpcyBpcyBhIGJ1ZyBpbiBSZWFjdC4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciQxID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3RDdXJyZW50RGlzcGF0Y2hlcjtcbiAgICB2YXIgcHJlZml4O1xuXG4gICAgZnVuY3Rpb24gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUobmFtZSwgc291cmNlLCBvd25lckZuKSB7XG4gICAgICB7XG4gICAgICAgIGlmIChwcmVmaXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIEV4dHJhY3QgdGhlIFZNIHNwZWNpZmljIHByZWZpeCB1c2VkIGJ5IGVhY2ggbGluZS5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSB4LnN0YWNrLnRyaW0oKS5tYXRjaCgvXFxuKCAqKGF0ICk/KS8pO1xuICAgICAgICAgICAgcHJlZml4ID0gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vIFdlIHVzZSB0aGUgcHJlZml4IHRvIGVuc3VyZSBvdXIgc3RhY2tzIGxpbmUgdXAgd2l0aCBuYXRpdmUgc3RhY2sgZnJhbWVzLlxuXG5cbiAgICAgICAgcmV0dXJuICdcXG4nICsgcHJlZml4ICsgbmFtZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcmVlbnRyeSA9IGZhbHNlO1xuICAgIHZhciBjb21wb25lbnRGcmFtZUNhY2hlO1xuICAgIHtcbiAgICAgIHZhciBQb3NzaWJseVdlYWtNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyA/IFdlYWtNYXAgOiBNYXA7XG4gICAgICBjb21wb25lbnRGcmFtZUNhY2hlID0gbmV3IFBvc3NpYmx5V2Vha01hcCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc2NyaWJlTmF0aXZlQ29tcG9uZW50RnJhbWUoZm4sIGNvbnN0cnVjdCkge1xuICAgICAgLy8gSWYgc29tZXRoaW5nIGFza2VkIGZvciBhIHN0YWNrIGluc2lkZSBhIGZha2UgcmVuZGVyLCBpdCBzaG91bGQgZ2V0IGlnbm9yZWQuXG4gICAgICBpZiAoIWZuIHx8IHJlZW50cnkpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuXG4gICAgICB7XG4gICAgICAgIHZhciBmcmFtZSA9IGNvbXBvbmVudEZyYW1lQ2FjaGUuZ2V0KGZuKTtcblxuICAgICAgICBpZiAoZnJhbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBmcmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGNvbnRyb2w7XG4gICAgICByZWVudHJ5ID0gdHJ1ZTtcbiAgICAgIHZhciBwcmV2aW91c1ByZXBhcmVTdGFja1RyYWNlID0gRXJyb3IucHJlcGFyZVN0YWNrVHJhY2U7IC8vICRGbG93Rml4TWUgSXQgZG9lcyBhY2NlcHQgdW5kZWZpbmVkLlxuXG4gICAgICBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZSA9IHVuZGVmaW5lZDtcbiAgICAgIHZhciBwcmV2aW91c0Rpc3BhdGNoZXI7XG4gICAgICB7XG4gICAgICAgIHByZXZpb3VzRGlzcGF0Y2hlciA9IFJlYWN0Q3VycmVudERpc3BhdGNoZXIkMS5jdXJyZW50OyAvLyBTZXQgdGhlIGRpc3BhdGNoZXIgaW4gREVWIGJlY2F1c2UgdGhpcyBtaWdodCBiZSBjYWxsIGluIHRoZSByZW5kZXIgZnVuY3Rpb25cbiAgICAgICAgLy8gZm9yIHdhcm5pbmdzLlxuXG4gICAgICAgIFJlYWN0Q3VycmVudERpc3BhdGNoZXIkMS5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgZGlzYWJsZUxvZ3MoKTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyBzaG91bGQgdGhyb3cuXG4gICAgICAgIGlmIChjb25zdHJ1Y3QpIHtcbiAgICAgICAgICAvLyBTb21ldGhpbmcgc2hvdWxkIGJlIHNldHRpbmcgdGhlIHByb3BzIGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICB2YXIgRmFrZSA9IGZ1bmN0aW9uIEZha2UoKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICAgIH07IC8vICRGbG93Rml4TWVcblxuXG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZha2UucHJvdG90eXBlLCAncHJvcHMnLCB7XG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCgpIHtcbiAgICAgICAgICAgICAgLy8gV2UgdXNlIGEgdGhyb3dpbmcgc2V0dGVyIGluc3RlYWQgb2YgZnJvemVuIG9yIG5vbi13cml0YWJsZSBwcm9wc1xuICAgICAgICAgICAgICAvLyBiZWNhdXNlIHRoYXQgd29uJ3QgdGhyb3cgaW4gYSBub24tc3RyaWN0IG1vZGUgZnVuY3Rpb24uXG4gICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoUmVmbGVjdCkpID09PSAnb2JqZWN0JyAmJiBSZWZsZWN0LmNvbnN0cnVjdCkge1xuICAgICAgICAgICAgLy8gV2UgY29uc3RydWN0IGEgZGlmZmVyZW50IGNvbnRyb2wgZm9yIHRoaXMgY2FzZSB0byBpbmNsdWRlIGFueSBleHRyYVxuICAgICAgICAgICAgLy8gZnJhbWVzIGFkZGVkIGJ5IHRoZSBjb25zdHJ1Y3QgY2FsbC5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIFJlZmxlY3QuY29uc3RydWN0KEZha2UsIFtdKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKHgpIHtcbiAgICAgICAgICAgICAgY29udHJvbCA9IHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFJlZmxlY3QuY29uc3RydWN0KGZuLCBbXSwgRmFrZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIEZha2UuY2FsbCgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgICAgICBjb250cm9sID0geDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm4uY2FsbChGYWtlLnByb3RvdHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICAgIH0gY2F0Y2ggKHgpIHtcbiAgICAgICAgICAgIGNvbnRyb2wgPSB4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZuKCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKHNhbXBsZSkge1xuICAgICAgICAvLyBUaGlzIGlzIGlubGluZWQgbWFudWFsbHkgYmVjYXVzZSBjbG9zdXJlIGRvZXNuJ3QgZG8gaXQgZm9yIHVzLlxuICAgICAgICBpZiAoc2FtcGxlICYmIGNvbnRyb2wgJiYgdHlwZW9mIHNhbXBsZS5zdGFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvLyBUaGlzIGV4dHJhY3RzIHRoZSBmaXJzdCBmcmFtZSBmcm9tIHRoZSBzYW1wbGUgdGhhdCBpc24ndCBhbHNvIGluIHRoZSBjb250cm9sLlxuICAgICAgICAgIC8vIFNraXBwaW5nIG9uZSBmcmFtZSB0aGF0IHdlIGFzc3VtZSBpcyB0aGUgZnJhbWUgdGhhdCBjYWxscyB0aGUgdHdvLlxuICAgICAgICAgIHZhciBzYW1wbGVMaW5lcyA9IHNhbXBsZS5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgdmFyIGNvbnRyb2xMaW5lcyA9IGNvbnRyb2wuc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgICAgICAgIHZhciBzID0gc2FtcGxlTGluZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICB2YXIgYyA9IGNvbnRyb2xMaW5lcy5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgd2hpbGUgKHMgPj0gMSAmJiBjID49IDAgJiYgc2FtcGxlTGluZXNbc10gIT09IGNvbnRyb2xMaW5lc1tjXSkge1xuICAgICAgICAgICAgLy8gV2UgZXhwZWN0IGF0IGxlYXN0IG9uZSBzdGFjayBmcmFtZSB0byBiZSBzaGFyZWQuXG4gICAgICAgICAgICAvLyBUeXBpY2FsbHkgdGhpcyB3aWxsIGJlIHRoZSByb290IG1vc3Qgb25lLiBIb3dldmVyLCBzdGFjayBmcmFtZXMgbWF5IGJlXG4gICAgICAgICAgICAvLyBjdXQgb2ZmIGR1ZSB0byBtYXhpbXVtIHN0YWNrIGxpbWl0cy4gSW4gdGhpcyBjYXNlLCBvbmUgbWF5YmUgY3V0IG9mZlxuICAgICAgICAgICAgLy8gZWFybGllciB0aGFuIHRoZSBvdGhlci4gV2UgYXNzdW1lIHRoYXQgdGhlIHNhbXBsZSBpcyBsb25nZXIgb3IgdGhlIHNhbWVcbiAgICAgICAgICAgIC8vIGFuZCB0aGVyZSBmb3IgY3V0IG9mZiBlYXJsaWVyLiBTbyB3ZSBzaG91bGQgZmluZCB0aGUgcm9vdCBtb3N0IGZyYW1lIGluXG4gICAgICAgICAgICAvLyB0aGUgc2FtcGxlIHNvbWV3aGVyZSBpbiB0aGUgY29udHJvbC5cbiAgICAgICAgICAgIGMtLTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKDsgcyA+PSAxICYmIGMgPj0gMDsgcy0tLCBjLS0pIHtcbiAgICAgICAgICAgIC8vIE5leHQgd2UgZmluZCB0aGUgZmlyc3Qgb25lIHRoYXQgaXNuJ3QgdGhlIHNhbWUgd2hpY2ggc2hvdWxkIGJlIHRoZVxuICAgICAgICAgICAgLy8gZnJhbWUgdGhhdCBjYWxsZWQgb3VyIHNhbXBsZSBmdW5jdGlvbiBhbmQgdGhlIGNvbnRyb2wuXG4gICAgICAgICAgICBpZiAoc2FtcGxlTGluZXNbc10gIT09IGNvbnRyb2xMaW5lc1tjXSkge1xuICAgICAgICAgICAgICAvLyBJbiBWOCwgdGhlIGZpcnN0IGxpbmUgaXMgZGVzY3JpYmluZyB0aGUgbWVzc2FnZSBidXQgb3RoZXIgVk1zIGRvbid0LlxuICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBhYm91dCB0byByZXR1cm4gdGhlIGZpcnN0IGxpbmUsIGFuZCB0aGUgY29udHJvbCBpcyBhbHNvIG9uIHRoZSBzYW1lXG4gICAgICAgICAgICAgIC8vIGxpbmUsIHRoYXQncyBhIHByZXR0eSBnb29kIGluZGljYXRvciB0aGF0IG91ciBzYW1wbGUgdGhyZXcgYXQgc2FtZSBsaW5lIGFzXG4gICAgICAgICAgICAgIC8vIHRoZSBjb250cm9sLiBJLmUuIGJlZm9yZSB3ZSBlbnRlcmVkIHRoZSBzYW1wbGUgZnJhbWUuIFNvIHdlIGlnbm9yZSB0aGlzIHJlc3VsdC5cbiAgICAgICAgICAgICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIHlvdSBwYXNzZWQgYSBjbGFzcyB0byBmdW5jdGlvbiBjb21wb25lbnQsIG9yIG5vbi1mdW5jdGlvbi5cbiAgICAgICAgICAgICAgaWYgKHMgIT09IDEgfHwgYyAhPT0gMSkge1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgIHMtLTtcbiAgICAgICAgICAgICAgICAgIGMtLTsgLy8gV2UgbWF5IHN0aWxsIGhhdmUgc2ltaWxhciBpbnRlcm1lZGlhdGUgZnJhbWVzIGZyb20gdGhlIGNvbnN0cnVjdCBjYWxsLlxuICAgICAgICAgICAgICAgICAgLy8gVGhlIG5leHQgb25lIHRoYXQgaXNuJ3QgdGhlIHNhbWUgc2hvdWxkIGJlIG91ciBtYXRjaCB0aG91Z2guXG5cbiAgICAgICAgICAgICAgICAgIGlmIChjIDwgMCB8fCBzYW1wbGVMaW5lc1tzXSAhPT0gY29udHJvbExpbmVzW2NdKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFY4IGFkZHMgYSBcIm5ld1wiIHByZWZpeCBmb3IgbmF0aXZlIGNsYXNzZXMuIExldCdzIHJlbW92ZSBpdCB0byBtYWtlIGl0IHByZXR0aWVyLlxuICAgICAgICAgICAgICAgICAgICB2YXIgX2ZyYW1lID0gJ1xcbicgKyBzYW1wbGVMaW5lc1tzXS5yZXBsYWNlKCcgYXQgbmV3ICcsICcgYXQgJyk7XG5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudEZyYW1lQ2FjaGUuc2V0KGZuLCBfZnJhbWUpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSAvLyBSZXR1cm4gdGhlIGxpbmUgd2UgZm91bmQuXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9mcmFtZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IHdoaWxlIChzID49IDEgJiYgYyA+PSAwKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgcmVlbnRyeSA9IGZhbHNlO1xuICAgICAgICB7XG4gICAgICAgICAgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciQxLmN1cnJlbnQgPSBwcmV2aW91c0Rpc3BhdGNoZXI7XG4gICAgICAgICAgcmVlbmFibGVMb2dzKCk7XG4gICAgICAgIH1cbiAgICAgICAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSBwcmV2aW91c1ByZXBhcmVTdGFja1RyYWNlO1xuICAgICAgfSAvLyBGYWxsYmFjayB0byBqdXN0IHVzaW5nIHRoZSBuYW1lIGlmIHdlIGNvdWxkbid0IG1ha2UgaXQgdGhyb3cuXG5cblxuICAgICAgdmFyIG5hbWUgPSBmbiA/IGZuLmRpc3BsYXlOYW1lIHx8IGZuLm5hbWUgOiAnJztcbiAgICAgIHZhciBzeW50aGV0aWNGcmFtZSA9IG5hbWUgPyBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZShuYW1lKSA6ICcnO1xuICAgICAge1xuICAgICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY29tcG9uZW50RnJhbWVDYWNoZS5zZXQoZm4sIHN5bnRoZXRpY0ZyYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN5bnRoZXRpY0ZyYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc2NyaWJlRnVuY3Rpb25Db21wb25lbnRGcmFtZShmbiwgc291cmNlLCBvd25lckZuKSB7XG4gICAgICB7XG4gICAgICAgIHJldHVybiBkZXNjcmliZU5hdGl2ZUNvbXBvbmVudEZyYW1lKGZuLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvdWxkQ29uc3RydWN0KENvbXBvbmVudCkge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IENvbXBvbmVudC5wcm90b3R5cGU7XG4gICAgICByZXR1cm4gISEocHJvdG90eXBlICYmIHByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYodHlwZSwgc291cmNlLCBvd25lckZuKSB7XG4gICAgICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHtcbiAgICAgICAgICByZXR1cm4gZGVzY3JpYmVOYXRpdmVDb21wb25lbnRGcmFtZSh0eXBlLCBzaG91bGRDb25zdHJ1Y3QodHlwZSkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKHR5cGUpO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBleHBvcnRzLlN1c3BlbnNlOlxuICAgICAgICAgIHJldHVybiBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZSgnU3VzcGVuc2UnKTtcblxuICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTpcbiAgICAgICAgICByZXR1cm4gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUoJ1N1c3BlbnNlTGlzdCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3R5cGVvZih0eXBlKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlLiQkdHlwZW9mKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaWJlRnVuY3Rpb25Db21wb25lbnRGcmFtZSh0eXBlLnJlbmRlcik7XG5cbiAgICAgICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgICAgIC8vIE1lbW8gbWF5IGNvbnRhaW4gYW55IGNvbXBvbmVudCB0eXBlIHNvIHdlIHJlY3Vyc2l2ZWx5IHJlc29sdmUgaXQuXG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKHR5cGUudHlwZSwgc291cmNlLCBvd25lckZuKTtcblxuICAgICAgICAgIGNhc2UgUkVBQ1RfQkxPQ0tfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBkZXNjcmliZUZ1bmN0aW9uQ29tcG9uZW50RnJhbWUodHlwZS5fcmVuZGVyKTtcblxuICAgICAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB2YXIgbGF6eUNvbXBvbmVudCA9IHR5cGU7XG4gICAgICAgICAgICAgIHZhciBwYXlsb2FkID0gbGF6eUNvbXBvbmVudC5fcGF5bG9hZDtcbiAgICAgICAgICAgICAgdmFyIGluaXQgPSBsYXp5Q29tcG9uZW50Ll9pbml0O1xuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gTGF6eSBtYXkgY29udGFpbiBhbnkgY29tcG9uZW50IHR5cGUgc28gd2UgcmVjdXJzaXZlbHkgcmVzb2x2ZSBpdC5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKGluaXQocGF5bG9hZCksIHNvdXJjZSwgb3duZXJGbik7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbiAgICB2YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQxID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcblxuICAgIGZ1bmN0aW9uIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcbiAgICAgICAgICB2YXIgc3RhY2sgPSBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYoZWxlbWVudC50eXBlLCBlbGVtZW50Ll9zb3VyY2UsIG93bmVyID8gb3duZXIudHlwZSA6IG51bGwpO1xuICAgICAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMS5zZXRFeHRyYVN0YWNrRnJhbWUoc3RhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMS5zZXRFeHRyYVN0YWNrRnJhbWUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGVsZW1lbnQpIHtcbiAgICAgIHtcbiAgICAgICAgLy8gJEZsb3dGaXhNZSBUaGlzIGlzIG9rYXkgYnV0IEZsb3cgZG9lc24ndCBrbm93IGl0LlxuICAgICAgICB2YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuXG4gICAgICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgICAgICBpZiAoaGFzKHR5cGVTcGVjcywgdHlwZVNwZWNOYW1lKSkge1xuICAgICAgICAgICAgdmFyIGVycm9yJDEgPSB2b2lkIDA7IC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiAnICsgbG9jYXRpb24gKyAnIHR5cGUgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyAnICsgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgX3R5cGVvZih0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSkgKyAnYC4nICsgJ1RoaXMgb2Z0ZW4gaGFwcGVucyBiZWNhdXNlIG9mIHR5cG9zIHN1Y2ggYXMgYFByb3BUeXBlcy5mdW5jdGlvbmAgaW5zdGVhZCBvZiBgUHJvcFR5cGVzLmZ1bmNgLicpO1xuICAgICAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGVycm9yJDEgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCcpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgZXJyb3IkMSA9IGV4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXJyb3IkMSAmJiAhKGVycm9yJDEgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICAgIGVycm9yKCclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzJyArICcgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgX3R5cGVvZihlcnJvciQxKSk7XG4gICAgICAgICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KG51bGwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXJyb3IkMSBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IkMS5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvciQxLm1lc3NhZ2VdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICAgIGVycm9yKCdGYWlsZWQgJXMgdHlwZTogJXMnLCBsb2NhdGlvbiwgZXJyb3IkMS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQkMShlbGVtZW50KSB7XG4gICAgICB7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG4gICAgICAgICAgdmFyIHN0YWNrID0gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKGVsZW1lbnQudHlwZSwgZWxlbWVudC5fc291cmNlLCBvd25lciA/IG93bmVyLnR5cGUgOiBudWxsKTtcbiAgICAgICAgICBzZXRFeHRyYVN0YWNrRnJhbWUoc3RhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldEV4dHJhU3RhY2tGcmFtZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93bjtcbiAgICB7XG4gICAgICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpIHtcbiAgICAgIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZShSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnR5cGUpO1xuXG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuICdcXG5cXG5DaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bShzb3VyY2UpIHtcbiAgICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgZmlsZU5hbWUgPSBzb3VyY2UuZmlsZU5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpO1xuICAgICAgICB2YXIgbGluZU51bWJlciA9IHNvdXJjZS5saW5lTnVtYmVyO1xuICAgICAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHlvdXIgY29kZSBhdCAnICsgZmlsZU5hbWUgKyAnOicgKyBsaW5lTnVtYmVyICsgJy4nO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW1Gb3JQcm9wcyhlbGVtZW50UHJvcHMpIHtcbiAgICAgIGlmIChlbGVtZW50UHJvcHMgIT09IG51bGwgJiYgZWxlbWVudFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtKGVsZW1lbnRQcm9wcy5fX3NvdXJjZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2FybiBpZiB0aGVyZSdzIG5vIGtleSBleHBsaWNpdGx5IHNldCBvbiBkeW5hbWljIGFycmF5cyBvZiBjaGlsZHJlbiBvclxuICAgICAqIG9iamVjdCBrZXlzIGFyZSBub3QgdmFsaWQuIFRoaXMgYWxsb3dzIHVzIHRvIGtlZXAgdHJhY2sgb2YgY2hpbGRyZW4gYmV0d2VlblxuICAgICAqIHVwZGF0ZXMuXG4gICAgICovXG5cblxuICAgIHZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSkge1xuICAgICAgdmFyIGluZm8gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcblxuICAgICAgaWYgKCFpbmZvKSB7XG4gICAgICAgIHZhciBwYXJlbnROYW1lID0gdHlwZW9mIHBhcmVudFR5cGUgPT09ICdzdHJpbmcnID8gcGFyZW50VHlwZSA6IHBhcmVudFR5cGUuZGlzcGxheU5hbWUgfHwgcGFyZW50VHlwZS5uYW1lO1xuXG4gICAgICAgIGlmIChwYXJlbnROYW1lKSB7XG4gICAgICAgICAgaW5mbyA9IFwiXFxuXFxuQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8XCIgKyBwYXJlbnROYW1lICsgXCI+LlwiO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gICAgICogVGhpcyBlbGVtZW50IGlzIGluIGFuIGFycmF5LiBUaGUgYXJyYXkgY291bGQgZ3JvdyBhbmQgc2hyaW5rIG9yIGJlXG4gICAgICogcmVvcmRlcmVkLiBBbGwgY2hpbGRyZW4gdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiB2YWxpZGF0ZWQgYXJlIHJlcXVpcmVkIHRvXG4gICAgICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gICAgICogd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gICAgICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUV4cGxpY2l0S2V5KGVsZW1lbnQsIHBhcmVudFR5cGUpIHtcbiAgICAgIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgdmFyIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8gPSBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpO1xuXG4gICAgICBpZiAob3duZXJIYXNLZXlVc2VXYXJuaW5nW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgb3duZXJIYXNLZXlVc2VXYXJuaW5nW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dID0gdHJ1ZTsgLy8gVXN1YWxseSB0aGUgY3VycmVudCBvd25lciBpcyB0aGUgb2ZmZW5kZXIsIGJ1dCBpZiBpdCBhY2NlcHRzIGNoaWxkcmVuIGFzIGFcbiAgICAgIC8vIHByb3BlcnR5LCBpdCBtYXkgYmUgdGhlIGNyZWF0b3Igb2YgdGhlIGNoaWxkIHRoYXQncyByZXNwb25zaWJsZSBmb3JcbiAgICAgIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cblxuICAgICAgdmFyIGNoaWxkT3duZXIgPSAnJztcblxuICAgICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgICAgIGNoaWxkT3duZXIgPSBcIiBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSBcIiArIGdldENvbXBvbmVudE5hbWUoZWxlbWVudC5fb3duZXIudHlwZSkgKyBcIi5cIjtcbiAgICAgIH1cblxuICAgICAge1xuICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKGVsZW1lbnQpO1xuICAgICAgICBlcnJvcignRWFjaCBjaGlsZCBpbiBhIGxpc3Qgc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9saW5rL3dhcm5pbmcta2V5cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nLCBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvLCBjaGlsZE93bmVyKTtcbiAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQkMShudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICAgICAqIGFycmF5IHdpdGggYW4gZXhwbGljaXQga2V5cyBwcm9wZXJ0eSBkZWZpbmVkLCBvciBpbiBhbiBvYmplY3QgbGl0ZXJhbFxuICAgICAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gICAgICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gICAgICBpZiAoX3R5cGVvZihub2RlKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY2hpbGQgPSBub2RlW2ldO1xuXG4gICAgICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShjaGlsZCwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzVmFsaWRFbGVtZW50KG5vZGUpKSB7XG4gICAgICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgICAgIG5vZGUuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobm9kZSkge1xuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obm9kZSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgLy8gRW50cnkgaXRlcmF0b3JzIHVzZWQgdG8gcHJvdmlkZSBpbXBsaWNpdCBrZXlzLFxuICAgICAgICAgIC8vIGJ1dCBub3cgd2UgcHJpbnQgYSBzZXBhcmF0ZSB3YXJuaW5nIGZvciB0aGVtIGxhdGVyLlxuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBub2RlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgICAgIHZhciBzdGVwO1xuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmIChpc1ZhbGlkRWxlbWVudChzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoc3RlcC52YWx1ZSwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAgICAgKiBwcm92aWRlZCBieSB0aGUgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAgICAgIHtcbiAgICAgICAgdmFyIHR5cGUgPSBlbGVtZW50LnR5cGU7XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwcm9wVHlwZXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcHJvcFR5cGVzID0gdHlwZS5wcm9wVHlwZXM7XG4gICAgICAgIH0gZWxzZSBpZiAoX3R5cGVvZih0eXBlKSA9PT0gJ29iamVjdCcgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgLy8gTm90ZTogTWVtbyBvbmx5IGNoZWNrcyBvdXRlciBwcm9wcyBoZXJlLlxuICAgICAgICAvLyBJbm5lciBwcm9wcyBhcmUgY2hlY2tlZCBpbiB0aGUgcmVjb25jaWxlci5cbiAgICAgICAgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFKSkge1xuICAgICAgICAgIHByb3BUeXBlcyA9IHR5cGUucHJvcFR5cGVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wVHlwZXMpIHtcbiAgICAgICAgICAvLyBJbnRlbnRpb25hbGx5IGluc2lkZSB0byBhdm9pZCB0cmlnZ2VyaW5nIGxhenkgaW5pdGlhbGl6ZXJzOlxuICAgICAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZSh0eXBlKTtcbiAgICAgICAgICBjaGVja1Byb3BUeXBlcyhwcm9wVHlwZXMsIGVsZW1lbnQucHJvcHMsICdwcm9wJywgbmFtZSwgZWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZS5Qcm9wVHlwZXMgIT09IHVuZGVmaW5lZCAmJiAhcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IHRydWU7IC8vIEludGVudGlvbmFsbHkgaW5zaWRlIHRvIGF2b2lkIHRyaWdnZXJpbmcgbGF6eSBpbml0aWFsaXplcnM6XG5cbiAgICAgICAgICB2YXIgX25hbWUgPSBnZXRDb21wb25lbnROYW1lKHR5cGUpO1xuXG4gICAgICAgICAgZXJyb3IoJ0NvbXBvbmVudCAlcyBkZWNsYXJlZCBgUHJvcFR5cGVzYCBpbnN0ZWFkIG9mIGBwcm9wVHlwZXNgLiBEaWQgeW91IG1pc3NwZWxsIHRoZSBwcm9wZXJ0eSBhc3NpZ25tZW50PycsIF9uYW1lIHx8ICdVbmtub3duJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHR5cGUuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nICYmICF0eXBlLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCkge1xuICAgICAgICAgIGVycm9yKCdnZXREZWZhdWx0UHJvcHMgaXMgb25seSB1c2VkIG9uIGNsYXNzaWMgUmVhY3QuY3JlYXRlQ2xhc3MgJyArICdkZWZpbml0aW9ucy4gVXNlIGEgc3RhdGljIHByb3BlcnR5IG5hbWVkIGBkZWZhdWx0UHJvcHNgIGluc3RlYWQuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBmcmFnbWVudCwgdmFsaWRhdGUgdGhhdCBpdCBjYW4gb25seSBiZSBwcm92aWRlZCB3aXRoIGZyYWdtZW50IHByb3BzXG4gICAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGZyYWdtZW50XG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlRnJhZ21lbnRQcm9wcyhmcmFnbWVudCkge1xuICAgICAge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGZyYWdtZW50LnByb3BzKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcblxuICAgICAgICAgIGlmIChrZXkgIT09ICdjaGlsZHJlbicgJiYga2V5ICE9PSAna2V5Jykge1xuICAgICAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQkMShmcmFnbWVudCk7XG4gICAgICAgICAgICBlcnJvcignSW52YWxpZCBwcm9wIGAlc2Agc3VwcGxpZWQgdG8gYFJlYWN0LkZyYWdtZW50YC4gJyArICdSZWFjdC5GcmFnbWVudCBjYW4gb25seSBoYXZlIGBrZXlgIGFuZCBgY2hpbGRyZW5gIHByb3BzLicsIGtleSk7XG4gICAgICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKG51bGwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyYWdtZW50LnJlZiAhPT0gbnVsbCkge1xuICAgICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEoZnJhZ21lbnQpO1xuICAgICAgICAgIGVycm9yKCdJbnZhbGlkIGF0dHJpYnV0ZSBgcmVmYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLicpO1xuICAgICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24odHlwZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgICB2YXIgdmFsaWRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpOyAvLyBXZSB3YXJuIGluIHRoaXMgY2FzZSBidXQgZG9uJ3QgdGhyb3cuIFdlIGV4cGVjdCB0aGUgZWxlbWVudCBjcmVhdGlvbiB0b1xuICAgICAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cblxuICAgICAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICAgICAgdmFyIGluZm8gPSAnJztcblxuICAgICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkIHx8IF90eXBlb2YodHlwZSkgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaW5mbyArPSAnIFlvdSBsaWtlbHkgZm9yZ290IHRvIGV4cG9ydCB5b3VyIGNvbXBvbmVudCBmcm9tIHRoZSBmaWxlICcgKyBcIml0J3MgZGVmaW5lZCBpbiwgb3IgeW91IG1pZ2h0IGhhdmUgbWl4ZWQgdXAgZGVmYXVsdCBhbmQgbmFtZWQgaW1wb3J0cy5cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzb3VyY2VJbmZvID0gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW1Gb3JQcm9wcyhwcm9wcyk7XG5cbiAgICAgICAgaWYgKHNvdXJjZUluZm8pIHtcbiAgICAgICAgICBpbmZvICs9IHNvdXJjZUluZm87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5mbyArPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0eXBlU3RyaW5nO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBudWxsKSB7XG4gICAgICAgICAgdHlwZVN0cmluZyA9ICdudWxsJztcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICAgICAgdHlwZVN0cmluZyA9ICdhcnJheSc7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSAhPT0gdW5kZWZpbmVkICYmIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRSkge1xuICAgICAgICAgIHR5cGVTdHJpbmcgPSBcIjxcIiArIChnZXRDb21wb25lbnROYW1lKHR5cGUudHlwZSkgfHwgJ1Vua25vd24nKSArIFwiIC8+XCI7XG4gICAgICAgICAgaW5mbyA9ICcgRGlkIHlvdSBhY2NpZGVudGFsbHkgZXhwb3J0IGEgSlNYIGxpdGVyYWwgaW5zdGVhZCBvZiBhIGNvbXBvbmVudD8nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHR5cGVTdHJpbmcgPSBfdHlwZW9mKHR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAge1xuICAgICAgICAgIGVycm9yKCdSZWFjdC5jcmVhdGVFbGVtZW50OiB0eXBlIGlzIGludmFsaWQgLS0gZXhwZWN0ZWQgYSBzdHJpbmcgKGZvciAnICsgJ2J1aWx0LWluIGNvbXBvbmVudHMpIG9yIGEgY2xhc3MvZnVuY3Rpb24gKGZvciBjb21wb3NpdGUgJyArICdjb21wb25lbnRzKSBidXQgZ290OiAlcy4lcycsIHR5cGVTdHJpbmcsIGluZm8pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyAvLyBUaGUgcmVzdWx0IGNhbiBiZSBudWxsaXNoIGlmIGEgbW9jayBvciBhIGN1c3RvbSBmdW5jdGlvbiBpcyB1c2VkLlxuICAgICAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuXG4gICAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgfSAvLyBTa2lwIGtleSB3YXJuaW5nIGlmIHRoZSB0eXBlIGlzbid0IHZhbGlkIHNpbmNlIG91ciBrZXkgdmFsaWRhdGlvbiBsb2dpY1xuICAgICAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAgICAgLy8gV2UgZG9uJ3Qgd2FudCBleGNlcHRpb24gYmVoYXZpb3IgdG8gZGlmZmVyIGJldHdlZW4gZGV2IGFuZCBwcm9kLlxuICAgICAgLy8gKFJlbmRlcmluZyB3aWxsIHRocm93IHdpdGggYSBoZWxwZnVsIG1lc3NhZ2UgYW5kIGFzIHNvb24gYXMgdGhlIHR5cGUgaXNcbiAgICAgIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcblxuXG4gICAgICBpZiAodmFsaWRUeXBlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCB0eXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZSA9PT0gZXhwb3J0cy5GcmFnbWVudCkge1xuICAgICAgICB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZWxlbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgdmFyIGRpZFdhcm5BYm91dERlcHJlY2F0ZWRDcmVhdGVGYWN0b3J5ID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVGYWN0b3J5V2l0aFZhbGlkYXRpb24odHlwZSkge1xuICAgICAgdmFyIHZhbGlkYXRlZEZhY3RvcnkgPSBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24uYmluZChudWxsLCB0eXBlKTtcbiAgICAgIHZhbGlkYXRlZEZhY3RvcnkudHlwZSA9IHR5cGU7XG4gICAgICB7XG4gICAgICAgIGlmICghZGlkV2FybkFib3V0RGVwcmVjYXRlZENyZWF0ZUZhY3RvcnkpIHtcbiAgICAgICAgICBkaWRXYXJuQWJvdXREZXByZWNhdGVkQ3JlYXRlRmFjdG9yeSA9IHRydWU7XG4gICAgICAgICAgd2FybignUmVhY3QuY3JlYXRlRmFjdG9yeSgpIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAnICsgJ2EgZnV0dXJlIG1ham9yIHJlbGVhc2UuIENvbnNpZGVyIHVzaW5nIEpTWCAnICsgJ29yIHVzZSBSZWFjdC5jcmVhdGVFbGVtZW50KCkgZGlyZWN0bHkgaW5zdGVhZC4nKTtcbiAgICAgICAgfSAvLyBMZWdhY3kgaG9vazogcmVtb3ZlIGl0XG5cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsaWRhdGVkRmFjdG9yeSwgJ3R5cGUnLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICB3YXJuKCdGYWN0b3J5LnR5cGUgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHRoZSBjbGFzcyBkaXJlY3RseSAnICsgJ2JlZm9yZSBwYXNzaW5nIGl0IHRvIGNyZWF0ZUZhY3RvcnkuJyk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3R5cGUnLCB7XG4gICAgICAgICAgICAgIHZhbHVlOiB0eXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9uZUVsZW1lbnRXaXRoVmFsaWRhdGlvbihlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICAgIHZhciBuZXdFbGVtZW50ID0gY2xvbmVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgbmV3RWxlbWVudC50eXBlKTtcbiAgICAgIH1cblxuICAgICAgdmFsaWRhdGVQcm9wVHlwZXMobmV3RWxlbWVudCk7XG4gICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG5cbiAgICB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgZnJvemVuT2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW5ldyAqL1xuXG4gICAgICAgIG5ldyBNYXAoW1tmcm96ZW5PYmplY3QsIG51bGxdXSk7XG4gICAgICAgIG5ldyBTZXQoW2Zyb3plbk9iamVjdF0pO1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLW5ldyAqL1xuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG4gICAgdmFyIGNyZWF0ZUVsZW1lbnQkMSA9IGNyZWF0ZUVsZW1lbnRXaXRoVmFsaWRhdGlvbjtcbiAgICB2YXIgY2xvbmVFbGVtZW50JDEgPSBjbG9uZUVsZW1lbnRXaXRoVmFsaWRhdGlvbjtcbiAgICB2YXIgY3JlYXRlRmFjdG9yeSA9IGNyZWF0ZUZhY3RvcnlXaXRoVmFsaWRhdGlvbjtcbiAgICB2YXIgQ2hpbGRyZW4gPSB7XG4gICAgICBtYXA6IG1hcENoaWxkcmVuLFxuICAgICAgZm9yRWFjaDogZm9yRWFjaENoaWxkcmVuLFxuICAgICAgY291bnQ6IGNvdW50Q2hpbGRyZW4sXG4gICAgICB0b0FycmF5OiB0b0FycmF5LFxuICAgICAgb25seTogb25seUNoaWxkXG4gICAgfTtcbiAgICBleHBvcnRzLkNoaWxkcmVuID0gQ2hpbGRyZW47XG4gICAgZXhwb3J0cy5Db21wb25lbnQgPSBDb21wb25lbnQ7XG4gICAgZXhwb3J0cy5QdXJlQ29tcG9uZW50ID0gUHVyZUNvbXBvbmVudDtcbiAgICBleHBvcnRzLl9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEID0gUmVhY3RTaGFyZWRJbnRlcm5hbHM7XG4gICAgZXhwb3J0cy5jbG9uZUVsZW1lbnQgPSBjbG9uZUVsZW1lbnQkMTtcbiAgICBleHBvcnRzLmNyZWF0ZUNvbnRleHQgPSBjcmVhdGVDb250ZXh0O1xuICAgIGV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQkMTtcbiAgICBleHBvcnRzLmNyZWF0ZUZhY3RvcnkgPSBjcmVhdGVGYWN0b3J5O1xuICAgIGV4cG9ydHMuY3JlYXRlUmVmID0gY3JlYXRlUmVmO1xuICAgIGV4cG9ydHMuZm9yd2FyZFJlZiA9IGZvcndhcmRSZWY7XG4gICAgZXhwb3J0cy5pc1ZhbGlkRWxlbWVudCA9IGlzVmFsaWRFbGVtZW50O1xuICAgIGV4cG9ydHMubGF6eSA9IGxhenk7XG4gICAgZXhwb3J0cy5tZW1vID0gbWVtbztcbiAgICBleHBvcnRzLnVzZUNhbGxiYWNrID0gdXNlQ2FsbGJhY2s7XG4gICAgZXhwb3J0cy51c2VDb250ZXh0ID0gdXNlQ29udGV4dDtcbiAgICBleHBvcnRzLnVzZURlYnVnVmFsdWUgPSB1c2VEZWJ1Z1ZhbHVlO1xuICAgIGV4cG9ydHMudXNlRWZmZWN0ID0gdXNlRWZmZWN0O1xuICAgIGV4cG9ydHMudXNlSW1wZXJhdGl2ZUhhbmRsZSA9IHVzZUltcGVyYXRpdmVIYW5kbGU7XG4gICAgZXhwb3J0cy51c2VMYXlvdXRFZmZlY3QgPSB1c2VMYXlvdXRFZmZlY3Q7XG4gICAgZXhwb3J0cy51c2VNZW1vID0gdXNlTWVtbztcbiAgICBleHBvcnRzLnVzZVJlZHVjZXIgPSB1c2VSZWR1Y2VyO1xuICAgIGV4cG9ydHMudXNlUmVmID0gdXNlUmVmO1xuICAgIGV4cG9ydHMudXNlU3RhdGUgPSB1c2VTdGF0ZTtcbiAgICBleHBvcnRzLnZlcnNpb24gPSBSZWFjdFZlcnNpb247XG4gIH0pKCk7XG59IiwgIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcycpO1xufSIsICJmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5mdW5jdGlvbi5iaW5kLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuY29uY2F0LmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuZnVuY3Rpb24ubmFtZS5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5mb3ItZWFjaC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lm1hcC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5yZWZsZWN0LmNvbnN0cnVjdC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5jcmVhdGUuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLmRlc2NyaXB0aW9uLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnRvLXN0cmluZy5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLnN5bWJvbC5pdGVyYXRvci5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvci5qc1wiO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxudmFyIE5hdnMgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKE5hdnMsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoTmF2cyk7XG5cbiAgZnVuY3Rpb24gTmF2cyhwcm9wcykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOYXZzKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcHJvcHMpO1xuICAgIF90aGlzLmZpcnN0TmF2VmFsdWUgPSBfdGhpcy5maXJzdE5hdlZhbHVlLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLmFkZENoaWxkUHJvcHMgPSBfdGhpcy5hZGRDaGlsZFByb3BzLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLmdldENvbnRlbnQgPSBfdGhpcy5nZXRDb250ZW50LmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuXG4gICAgdmFyIHRhYnNldElkID0gX3RoaXMubmV3SWQoKTtcblxuICAgIHZhciBzZWxlY3RlZCA9IHByb3BzLnNlbGVjdGVkID8gcHJvcHMuc2VsZWN0ZWQgOiBfdGhpcy5maXJzdE5hdlZhbHVlKHByb3BzLmNoaWxkcmVuKTtcblxuICAgIHZhciBjaGlsZHJlbiA9IF90aGlzLmFkZENoaWxkUHJvcHMocHJvcHMuY2hpbGRyZW4sIHRhYnNldElkLCBzZWxlY3RlZCk7XG5cbiAgICB2YXIgY29udGVudCA9IF90aGlzLmdldENvbnRlbnQoY2hpbGRyZW4pO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICB0YWJzZXRJZDogdGFic2V0SWQsXG4gICAgICBzZWxlY3RlZDogc2VsZWN0ZWQsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICBjb250ZW50OiBjb250ZW50XG4gICAgfTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTmF2cywgW3tcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgdWxDbGFzcyA9IFwibmF2IG5hdi1cIi5jb25jYXQocHJvcHMudHlwZSwgXCIgXCIpLmNvbmNhdChwcm9wcy5pZCA/ICdzaGlueS10YWItaW5wdXQnIDogJycpO1xuICAgICAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtcbiAgICAgICAgaWQ6IHByb3BzLmlkLFxuICAgICAgICBjbGFzc05hbWU6IHVsQ2xhc3MsXG4gICAgICAgIHJvbGU6IFwidGFibGlzdFwiLFxuICAgICAgICBcImRhdGEtdGFic2V0aWRcIjogdGhpcy5zdGF0ZS50YWJzZXRJZFxuICAgICAgfSwgdGhpcy5zdGF0ZS5jaGlsZHJlbiksIFwiLFwiLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJ0YWItY29udGVudFwiLFxuICAgICAgICBcImRhdGEtdGFic2V0aWRcIjogdGhpcy5zdGF0ZS50YWJzZXRJZFxuICAgICAgfSwgcHJvcHMuaGVhZGVyLCB0aGlzLnN0YXRlLmNvbnRlbnQsIHByb3BzLmZvb3RlcikpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmaXJzdE5hdlZhbHVlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZpcnN0TmF2VmFsdWUobmF2cykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBuYXYgPSBuYXZzW2ldO1xuXG4gICAgICAgIGlmIChuYXYudHlwZS5uYW1lID09PSAnTmF2Jykge1xuICAgICAgICAgIHJldHVybiBuYXYucHJvcHMudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmF2LnR5cGUubmFtZSA9PT0gJ05hdk1lbnUnKSB7XG4gICAgICAgICAgdGhpcy5maXJzdE5hdlZhbHVlKG5hdik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q29udGVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDb250ZW50KG5hdnMpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoKG5hdnMsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICh4LnR5cGUubmFtZSA9PT0gJ05hdk1lbnUnKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goX3RoaXMyLmdldENvbnRlbnQoeC5wcm9wcy5jaGlsZHJlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHgudHlwZS5uYW1lID09PSAnTmF2Jykge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgICAgICBpZDogeC5wcm9wcy5pZCxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0YWItcGFuZVwiLFxuICAgICAgICAgICAgcm9sZTogXCJ0YWJwYW5lbFwiXG4gICAgICAgICAgfSwgeC5wcm9wcy5jaGlsZHJlbikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFkZENoaWxkUHJvcHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkQ2hpbGRQcm9wcyhjaGlsZHJlbiwgdGFic2V0SWQsIHNlbGVjdGVkKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgZnVuY3Rpb24gKHgsIGlkeCkge1xuICAgICAgICBpZiAoeC50eXBlLm5hbWUgPT09ICdOYXZNZW51Jykge1xuICAgICAgICAgIHZhciBfdGFic2V0SWQgPSBfdGhpczMubmV3SWQoKTtcblxuICAgICAgICAgIHZhciBjaGlsZHJlbl8gPSBfdGhpczMuYWRkQ2hpbGRQcm9wcyh4LnByb3BzLmNoaWxkcmVuLCBfdGFic2V0SWQsIHNlbGVjdGVkKTtcblxuICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoeCwge1xuICAgICAgICAgICAgdGFic2V0SWQ6IF90YWJzZXRJZCxcbiAgICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZFxuICAgICAgICAgIH0sIGNoaWxkcmVuXyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaWQgPSBcInRhYi1cIi5jb25jYXQodGFic2V0SWQsIFwiLVwiKS5jb25jYXQoaWR4ICsgMSk7XG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoeCwge1xuICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICBzZWxlY3RlZDogc2VsZWN0ZWRcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibmV3SWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbmV3SWQoKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcigxMDAwICsgTWF0aC5yYW5kb20oKSAqIDkwMDApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBOYXZzO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG52YXIgTmF2c0NhcmQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9OYXZzKSB7XG4gIF9pbmhlcml0cyhOYXZzQ2FyZCwgX05hdnMpO1xuXG4gIHZhciBfc3VwZXIyID0gX2NyZWF0ZVN1cGVyKE5hdnNDYXJkKTtcblxuICBmdW5jdGlvbiBOYXZzQ2FyZCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTmF2c0NhcmQpO1xuXG4gICAgcmV0dXJuIF9zdXBlcjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhOYXZzQ2FyZCwgW3tcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgdWxDbGFzcyA9IFwibmF2IG5hdi1cIi5jb25jYXQocHJvcHMudHlwZSwgXCIgY2FyZC1oZWFkZXItXCIpLmNvbmNhdChwcm9wcy50eXBlLCBcIiBcIikuY29uY2F0KHByb3BzLmlkID8gJ3NoaW55LXRhYi1pbnB1dCcgOiAnJyk7XG4gICAgICB2YXIgdWxUYWcgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtcbiAgICAgICAgaWQ6IHByb3BzLmlkLFxuICAgICAgICBjbGFzc05hbWU6IHVsQ2xhc3MsXG4gICAgICAgIHJvbGU6IFwidGFibGlzdFwiLFxuICAgICAgICBcImRhdGEtdGFic2V0aWRcIjogdGhpcy5zdGF0ZS50YWJzZXRJZFxuICAgICAgfSwgdGhpcy5zdGF0ZS5jaGlsZHJlbik7XG4gICAgICB2YXIgZGl2VGFnID0gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICBjbGFzc05hbWU6IFwidGFiLWNvbnRlbnRcIixcbiAgICAgICAgXCJkYXRhLXRhYnNldGlkXCI6IHRoaXMuc3RhdGUudGFic2V0SWRcbiAgICAgIH0sIHByb3BzLmhlYWRlciwgdGhpcy5zdGF0ZS5jb250ZW50LCBwcm9wcy5mb290ZXIpO1xuICAgICAgdmFyIGJlbG93ID0gcHJvcHMucGxhY2VtZW50ID09PSBcImJlbG93XCI7XG4gICAgICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICBjbGFzc05hbWU6IFwiY2FyZFwiXG4gICAgICB9LCBiZWxvdyA/IG51bGwgOiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJjYXJkLWhlYWRlclwiXG4gICAgICB9LCBcIiBcIiwgdWxUYWcsIFwiIFwiKSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICBjbGFzc05hbWU6IFwiY2FyZC1ib2R5XCJcbiAgICAgIH0sIFwiIFwiLCBkaXZUYWcsIFwiIFwiKSwgYmVsb3cgPyAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJjYXJkLWZvb3RlclwiXG4gICAgICB9LCBcIiBcIiwgdWxUYWcsIFwiIFwiKSA6IG51bGwpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBOYXZzQ2FyZDtcbn0oTmF2cyk7XG5cbmZ1bmN0aW9uIE5hdihwcm9wcykge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7XG4gICAga2V5OiBwcm9wcy5pZCxcbiAgICBjbGFzc05hbWU6IHByb3BzLnNlbGVjdGVkID09PSBwcm9wcy52YWx1ZSA/ICdhY3RpdmUnIDogJydcbiAgfSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtcbiAgICBocmVmOiAnIycgKyBwcm9wcy5pZCxcbiAgICByb2xlOiBcInRhYlwiLFxuICAgIFwiZGF0YS10b2dnbGVcIjogXCJ0YWJcIixcbiAgICBcImRhdGEtdmFsdWVcIjogcHJvcHMudmFsdWVcbiAgfSwgcHJvcHMudGl0bGUpKTtcbn1cblxuZnVuY3Rpb24gTmF2U3BhY2VyKHByb3BzKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImJzbGliLW5hdi1zcGFjZXJcIlxuICB9KTtcbn1cblxuZnVuY3Rpb24gTmF2SXRlbShwcm9wcykge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImZvcm0taW5saW5lXCIsXG4gICAga2V5OiBwcm9wcy5pZFxuICB9LCBwcm9wcy5jaGlsZHJlbik7XG59XG5cbmZ1bmN0aW9uIE5hdk1lbnUocHJvcHMpIHtcbiAgdmFyIHRvZ2dsZUNsYXNzID0gXCJkcm9wZG93bi10b2dnbGVcIi5jb25jYXQocHJvcHMuc2VsZWN0ZWQgPT09IHByb3BzLnZhbHVlID8gJyBhY3RpdmUnIDogJycpO1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImRyb3Bkb3duXCIsXG4gICAga2V5OiBwcm9wcy50YWJzZXRJZFxuICB9LCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwge1xuICAgIGNsYXNzTmFtZTogdG9nZ2xlQ2xhc3MsXG4gICAgXCJkYXRhLXRvZ2dsZVwiOiBcImRyb3Bkb3duXCIsXG4gICAgaHJlZjogXCIjXCIsXG4gICAgcm9sZTogXCJidXR0b25cIixcbiAgICBcImFyaWEtZXhwYW5kZWRcIjogXCJmYWxzZVwiXG4gIH0sIHByb3BzLnRpdGxlKSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImRyb3Bkb3duLW1lbnVcIixcbiAgICBcImRhdGEtdGFic2V0aWRcIjogcHJvcHMudGFic2V0SWRcbiAgfSwgcHJvcHMuY2hpbGRyZW4pKTtcbn0iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2gnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbmZvciAodmFyIENPTExFQ1RJT05fTkFNRSBpbiBET01JdGVyYWJsZXMpIHtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbQ09MTEVDVElPTl9OQU1FXTtcbiAgdmFyIENvbGxlY3Rpb25Qcm90b3R5cGUgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICAvLyBzb21lIENocm9tZSB2ZXJzaW9ucyBoYXZlIG5vbi1jb25maWd1cmFibGUgbWV0aG9kcyBvbiBET01Ub2tlbkxpc3RcbiAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGUgJiYgQ29sbGVjdGlvblByb3RvdHlwZS5mb3JFYWNoICE9PSBmb3JFYWNoKSB0cnkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCAnZm9yRWFjaCcsIGZvckVhY2gpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIENvbGxlY3Rpb25Qcm90b3R5cGUuZm9yRWFjaCA9IGZvckVhY2g7XG4gIH1cbn1cbiIsICJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSB9LCB7XG4gIHNldFByb3RvdHlwZU9mOiBzZXRQcm90b3R5cGVPZlxufSk7XG4iLCAidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBuYXRpdmVHZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIEZBSUxTX09OX1BSSU1JVElWRVMgPSBmYWlscyhmdW5jdGlvbiAoKSB7IG5hdGl2ZUdldFByb3RvdHlwZU9mKDEpOyB9KTtcblxuLy8gYE9iamVjdC5nZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRwcm90b3R5cGVvZlxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogRkFJTFNfT05fUFJJTUlUSVZFUywgc2hhbTogIUNPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiB9LCB7XG4gIGdldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCkge1xuICAgIHJldHVybiBuYXRpdmVHZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9XG59KTtcblxuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcblxuLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgY3JlYXRlOiBjcmVhdGVcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsVUFBSSxRQUFRLFNBQVUsSUFBSTtBQUN4QixlQUFPLE1BQU0sR0FBRyxRQUFRLFFBQVE7QUFBQTtBQUlsQyxhQUFPLFVBRUwsTUFBTSxPQUFPLGNBQWMsWUFBWSxlQUN2QyxNQUFNLE9BQU8sVUFBVSxZQUFZLFdBRW5DLE1BQU0sT0FBTyxRQUFRLFlBQVksU0FDakMsTUFBTSxPQUFPLFVBQVUsWUFBWSxXQUVsQyxXQUFZO0FBQUUsZUFBTztBQUFBLGFBQWMsU0FBUztBQUFBO0FBQUE7OztBQ2IvQztB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
