var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// node_modules/core-js/internals/global.js
var require_global = __commonJS({
  "node_modules/core-js/internals/global.js"(exports, module) {
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
  "node_modules/core-js/internals/fails.js"(exports, module) {
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
  "node_modules/core-js/internals/descriptors.js"(exports, module) {
    var fails7 = require_fails();
    module.exports = !fails7(function() {
      return Object.defineProperty({}, 1, { get: function() {
        return 7;
      } })[1] != 7;
    });
  }
});

// node_modules/core-js/internals/object-property-is-enumerable.js
var require_object_property_is_enumerable = __commonJS({
  "node_modules/core-js/internals/object-property-is-enumerable.js"(exports) {
    "use strict";
    var $propertyIsEnumerable2 = {}.propertyIsEnumerable;
    var getOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
    var NASHORN_BUG = getOwnPropertyDescriptor2 && !$propertyIsEnumerable2.call({ 1: 2 }, 1);
    exports.f = NASHORN_BUG ? function propertyIsEnumerable2(V) {
      var descriptor = getOwnPropertyDescriptor2(this, V);
      return !!descriptor && descriptor.enumerable;
    } : $propertyIsEnumerable2;
  }
});

// node_modules/core-js/internals/create-property-descriptor.js
var require_create_property_descriptor = __commonJS({
  "node_modules/core-js/internals/create-property-descriptor.js"(exports, module) {
    module.exports = function(bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value
      };
    };
  }
});

// node_modules/core-js/internals/classof-raw.js
var require_classof_raw = __commonJS({
  "node_modules/core-js/internals/classof-raw.js"(exports, module) {
    var toString5 = {}.toString;
    module.exports = function(it) {
      return toString5.call(it).slice(8, -1);
    };
  }
});

// node_modules/core-js/internals/indexed-object.js
var require_indexed_object = __commonJS({
  "node_modules/core-js/internals/indexed-object.js"(exports, module) {
    var fails7 = require_fails();
    var classof = require_classof_raw();
    var split = "".split;
    module.exports = fails7(function() {
      return !Object("z").propertyIsEnumerable(0);
    }) ? function(it) {
      return classof(it) == "String" ? split.call(it, "") : Object(it);
    } : Object;
  }
});

// node_modules/core-js/internals/require-object-coercible.js
var require_require_object_coercible = __commonJS({
  "node_modules/core-js/internals/require-object-coercible.js"(exports, module) {
    module.exports = function(it) {
      if (it == void 0)
        throw TypeError("Can't call method on " + it);
      return it;
    };
  }
});

// node_modules/core-js/internals/to-indexed-object.js
var require_to_indexed_object = __commonJS({
  "node_modules/core-js/internals/to-indexed-object.js"(exports, module) {
    var IndexedObject = require_indexed_object();
    var requireObjectCoercible2 = require_require_object_coercible();
    module.exports = function(it) {
      return IndexedObject(requireObjectCoercible2(it));
    };
  }
});

// node_modules/core-js/internals/is-object.js
var require_is_object = __commonJS({
  "node_modules/core-js/internals/is-object.js"(exports, module) {
    module.exports = function(it) {
      return typeof it === "object" ? it !== null : typeof it === "function";
    };
  }
});

// node_modules/core-js/internals/get-built-in.js
var require_get_built_in = __commonJS({
  "node_modules/core-js/internals/get-built-in.js"(exports, module) {
    var global8 = require_global();
    var aFunction4 = function(variable) {
      return typeof variable == "function" ? variable : void 0;
    };
    module.exports = function(namespace, method) {
      return arguments.length < 2 ? aFunction4(global8[namespace]) : global8[namespace] && global8[namespace][method];
    };
  }
});

// node_modules/core-js/internals/engine-user-agent.js
var require_engine_user_agent = __commonJS({
  "node_modules/core-js/internals/engine-user-agent.js"(exports, module) {
    var getBuiltIn4 = require_get_built_in();
    module.exports = getBuiltIn4("navigator", "userAgent") || "";
  }
});

// node_modules/core-js/internals/engine-v8-version.js
var require_engine_v8_version = __commonJS({
  "node_modules/core-js/internals/engine-v8-version.js"(exports, module) {
    var global8 = require_global();
    var userAgent2 = require_engine_user_agent();
    var process2 = global8.process;
    var Deno = global8.Deno;
    var versions = process2 && process2.versions || Deno && Deno.version;
    var v8 = versions && versions.v8;
    var match;
    var version;
    if (v8) {
      match = v8.split(".");
      version = match[0] < 4 ? 1 : match[0] + match[1];
    } else if (userAgent2) {
      match = userAgent2.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = userAgent2.match(/Chrome\/(\d+)/);
        if (match)
          version = match[1];
      }
    }
    module.exports = version && +version;
  }
});

// node_modules/core-js/internals/native-symbol.js
var require_native_symbol = __commonJS({
  "node_modules/core-js/internals/native-symbol.js"(exports, module) {
    var V8_VERSION3 = require_engine_v8_version();
    var fails7 = require_fails();
    module.exports = !!Object.getOwnPropertySymbols && !fails7(function() {
      var symbol = Symbol();
      return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION3 && V8_VERSION3 < 41;
    });
  }
});

// node_modules/core-js/internals/use-symbol-as-uid.js
var require_use_symbol_as_uid = __commonJS({
  "node_modules/core-js/internals/use-symbol-as-uid.js"(exports, module) {
    var NATIVE_SYMBOL2 = require_native_symbol();
    module.exports = NATIVE_SYMBOL2 && !Symbol.sham && typeof Symbol.iterator == "symbol";
  }
});

// node_modules/core-js/internals/is-symbol.js
var require_is_symbol = __commonJS({
  "node_modules/core-js/internals/is-symbol.js"(exports, module) {
    var getBuiltIn4 = require_get_built_in();
    var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
    module.exports = USE_SYMBOL_AS_UID ? function(it) {
      return typeof it == "symbol";
    } : function(it) {
      var $Symbol2 = getBuiltIn4("Symbol");
      return typeof $Symbol2 == "function" && Object(it) instanceof $Symbol2;
    };
  }
});

// node_modules/core-js/internals/ordinary-to-primitive.js
var require_ordinary_to_primitive = __commonJS({
  "node_modules/core-js/internals/ordinary-to-primitive.js"(exports, module) {
    var isObject7 = require_is_object();
    module.exports = function(input, pref) {
      var fn, val;
      if (pref === "string" && typeof (fn = input.toString) == "function" && !isObject7(val = fn.call(input)))
        return val;
      if (typeof (fn = input.valueOf) == "function" && !isObject7(val = fn.call(input)))
        return val;
      if (pref !== "string" && typeof (fn = input.toString) == "function" && !isObject7(val = fn.call(input)))
        return val;
      throw TypeError("Can't convert object to primitive value");
    };
  }
});

// node_modules/core-js/internals/is-pure.js
var require_is_pure = __commonJS({
  "node_modules/core-js/internals/is-pure.js"(exports, module) {
    module.exports = false;
  }
});

// node_modules/core-js/internals/set-global.js
var require_set_global = __commonJS({
  "node_modules/core-js/internals/set-global.js"(exports, module) {
    var global8 = require_global();
    module.exports = function(key, value) {
      try {
        Object.defineProperty(global8, key, { value, configurable: true, writable: true });
      } catch (error) {
        global8[key] = value;
      }
      return value;
    };
  }
});

// node_modules/core-js/internals/shared-store.js
var require_shared_store = __commonJS({
  "node_modules/core-js/internals/shared-store.js"(exports, module) {
    var global8 = require_global();
    var setGlobal = require_set_global();
    var SHARED = "__core-js_shared__";
    var store = global8[SHARED] || setGlobal(SHARED, {});
    module.exports = store;
  }
});

// node_modules/core-js/internals/shared.js
var require_shared = __commonJS({
  "node_modules/core-js/internals/shared.js"(exports, module) {
    var IS_PURE3 = require_is_pure();
    var store = require_shared_store();
    (module.exports = function(key, value) {
      return store[key] || (store[key] = value !== void 0 ? value : {});
    })("versions", []).push({
      version: "3.16.1",
      mode: IS_PURE3 ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)"
    });
  }
});

// node_modules/core-js/internals/to-object.js
var require_to_object = __commonJS({
  "node_modules/core-js/internals/to-object.js"(exports, module) {
    var requireObjectCoercible2 = require_require_object_coercible();
    module.exports = function(argument) {
      return Object(requireObjectCoercible2(argument));
    };
  }
});

// node_modules/core-js/internals/has.js
var require_has = __commonJS({
  "node_modules/core-js/internals/has.js"(exports, module) {
    var toObject6 = require_to_object();
    var hasOwnProperty = {}.hasOwnProperty;
    module.exports = Object.hasOwn || function hasOwn(it, key) {
      return hasOwnProperty.call(toObject6(it), key);
    };
  }
});

// node_modules/core-js/internals/uid.js
var require_uid = __commonJS({
  "node_modules/core-js/internals/uid.js"(exports, module) {
    var id = 0;
    var postfix = Math.random();
    module.exports = function(key) {
      return "Symbol(" + String(key === void 0 ? "" : key) + ")_" + (++id + postfix).toString(36);
    };
  }
});

// node_modules/core-js/internals/well-known-symbol.js
var require_well_known_symbol = __commonJS({
  "node_modules/core-js/internals/well-known-symbol.js"(exports, module) {
    var global8 = require_global();
    var shared2 = require_shared();
    var has3 = require_has();
    var uid2 = require_uid();
    var NATIVE_SYMBOL2 = require_native_symbol();
    var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
    var WellKnownSymbolsStore2 = shared2("wks");
    var Symbol2 = global8.Symbol;
    var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid2;
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

// node_modules/core-js/internals/to-primitive.js
var require_to_primitive = __commonJS({
  "node_modules/core-js/internals/to-primitive.js"(exports, module) {
    var isObject7 = require_is_object();
    var isSymbol2 = require_is_symbol();
    var ordinaryToPrimitive = require_ordinary_to_primitive();
    var wellKnownSymbol7 = require_well_known_symbol();
    var TO_PRIMITIVE2 = wellKnownSymbol7("toPrimitive");
    module.exports = function(input, pref) {
      if (!isObject7(input) || isSymbol2(input))
        return input;
      var exoticToPrim = input[TO_PRIMITIVE2];
      var result;
      if (exoticToPrim !== void 0) {
        if (pref === void 0)
          pref = "default";
        result = exoticToPrim.call(input, pref);
        if (!isObject7(result) || isSymbol2(result))
          return result;
        throw TypeError("Can't convert object to primitive value");
      }
      if (pref === void 0)
        pref = "number";
      return ordinaryToPrimitive(input, pref);
    };
  }
});

// node_modules/core-js/internals/to-property-key.js
var require_to_property_key = __commonJS({
  "node_modules/core-js/internals/to-property-key.js"(exports, module) {
    var toPrimitive = require_to_primitive();
    var isSymbol2 = require_is_symbol();
    module.exports = function(argument) {
      var key = toPrimitive(argument, "string");
      return isSymbol2(key) ? key : String(key);
    };
  }
});

// node_modules/core-js/internals/document-create-element.js
var require_document_create_element = __commonJS({
  "node_modules/core-js/internals/document-create-element.js"(exports, module) {
    var global8 = require_global();
    var isObject7 = require_is_object();
    var document3 = global8.document;
    var EXISTS = isObject7(document3) && isObject7(document3.createElement);
    module.exports = function(it) {
      return EXISTS ? document3.createElement(it) : {};
    };
  }
});

// node_modules/core-js/internals/ie8-dom-define.js
var require_ie8_dom_define = __commonJS({
  "node_modules/core-js/internals/ie8-dom-define.js"(exports, module) {
    var DESCRIPTORS6 = require_descriptors();
    var fails7 = require_fails();
    var createElement = require_document_create_element();
    module.exports = !DESCRIPTORS6 && !fails7(function() {
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
  "node_modules/core-js/internals/object-get-own-property-descriptor.js"(exports) {
    var DESCRIPTORS6 = require_descriptors();
    var propertyIsEnumerableModule2 = require_object_property_is_enumerable();
    var createPropertyDescriptor2 = require_create_property_descriptor();
    var toIndexedObject3 = require_to_indexed_object();
    var toPropertyKey2 = require_to_property_key();
    var has3 = require_has();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var $getOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
    exports.f = DESCRIPTORS6 ? $getOwnPropertyDescriptor2 : function getOwnPropertyDescriptor2(O2, P2) {
      O2 = toIndexedObject3(O2);
      P2 = toPropertyKey2(P2);
      if (IE8_DOM_DEFINE)
        try {
          return $getOwnPropertyDescriptor2(O2, P2);
        } catch (error) {
        }
      if (has3(O2, P2))
        return createPropertyDescriptor2(!propertyIsEnumerableModule2.f.call(O2, P2), O2[P2]);
    };
  }
});

// node_modules/core-js/internals/an-object.js
var require_an_object = __commonJS({
  "node_modules/core-js/internals/an-object.js"(exports, module) {
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
  "node_modules/core-js/internals/object-define-property.js"(exports) {
    var DESCRIPTORS6 = require_descriptors();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var anObject4 = require_an_object();
    var toPropertyKey2 = require_to_property_key();
    var $defineProperty2 = Object.defineProperty;
    exports.f = DESCRIPTORS6 ? $defineProperty2 : function defineProperty4(O2, P2, Attributes) {
      anObject4(O2);
      P2 = toPropertyKey2(P2);
      anObject4(Attributes);
      if (IE8_DOM_DEFINE)
        try {
          return $defineProperty2(O2, P2, Attributes);
        } catch (error) {
        }
      if ("get" in Attributes || "set" in Attributes)
        throw TypeError("Accessors not supported");
      if ("value" in Attributes)
        O2[P2] = Attributes.value;
      return O2;
    };
  }
});

// node_modules/core-js/internals/create-non-enumerable-property.js
var require_create_non_enumerable_property = __commonJS({
  "node_modules/core-js/internals/create-non-enumerable-property.js"(exports, module) {
    var DESCRIPTORS6 = require_descriptors();
    var definePropertyModule2 = require_object_define_property();
    var createPropertyDescriptor2 = require_create_property_descriptor();
    module.exports = DESCRIPTORS6 ? function(object, key, value) {
      return definePropertyModule2.f(object, key, createPropertyDescriptor2(1, value));
    } : function(object, key, value) {
      object[key] = value;
      return object;
    };
  }
});

// node_modules/core-js/internals/inspect-source.js
var require_inspect_source = __commonJS({
  "node_modules/core-js/internals/inspect-source.js"(exports, module) {
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
  "node_modules/core-js/internals/native-weak-map.js"(exports, module) {
    var global8 = require_global();
    var inspectSource2 = require_inspect_source();
    var WeakMap = global8.WeakMap;
    module.exports = typeof WeakMap === "function" && /native code/.test(inspectSource2(WeakMap));
  }
});

// node_modules/core-js/internals/shared-key.js
var require_shared_key = __commonJS({
  "node_modules/core-js/internals/shared-key.js"(exports, module) {
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
  "node_modules/core-js/internals/hidden-keys.js"(exports, module) {
    module.exports = {};
  }
});

// node_modules/core-js/internals/internal-state.js
var require_internal_state = __commonJS({
  "node_modules/core-js/internals/internal-state.js"(exports, module) {
    var NATIVE_WEAK_MAP = require_native_weak_map();
    var global8 = require_global();
    var isObject7 = require_is_object();
    var createNonEnumerableProperty4 = require_create_non_enumerable_property();
    var objectHas = require_has();
    var shared2 = require_shared_store();
    var sharedKey2 = require_shared_key();
    var hiddenKeys2 = require_hidden_keys();
    var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
    var WeakMap = global8.WeakMap;
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
      set,
      get,
      has: has3,
      enforce,
      getterFor
    };
  }
});

// node_modules/core-js/internals/redefine.js
var require_redefine = __commonJS({
  "node_modules/core-js/internals/redefine.js"(exports, module) {
    var global8 = require_global();
    var createNonEnumerableProperty4 = require_create_non_enumerable_property();
    var has3 = require_has();
    var setGlobal = require_set_global();
    var inspectSource2 = require_inspect_source();
    var InternalStateModule4 = require_internal_state();
    var getInternalState4 = InternalStateModule4.get;
    var enforceInternalState = InternalStateModule4.enforce;
    var TEMPLATE = String(String).split("String");
    (module.exports = function(O2, key, value, options) {
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
      if (O2 === global8) {
        if (simple)
          O2[key] = value;
        else
          setGlobal(key, value);
        return;
      } else if (!unsafe) {
        delete O2[key];
      } else if (!noTargetGet && O2[key]) {
        simple = true;
      }
      if (simple)
        O2[key] = value;
      else
        createNonEnumerableProperty4(O2, key, value);
    })(Function.prototype, "toString", function toString5() {
      return typeof this == "function" && getInternalState4(this).source || inspectSource2(this);
    });
  }
});

// node_modules/core-js/internals/to-integer.js
var require_to_integer = __commonJS({
  "node_modules/core-js/internals/to-integer.js"(exports, module) {
    var ceil = Math.ceil;
    var floor = Math.floor;
    module.exports = function(argument) {
      return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
    };
  }
});

// node_modules/core-js/internals/to-length.js
var require_to_length = __commonJS({
  "node_modules/core-js/internals/to-length.js"(exports, module) {
    var toInteger3 = require_to_integer();
    var min3 = Math.min;
    module.exports = function(argument) {
      return argument > 0 ? min3(toInteger3(argument), 9007199254740991) : 0;
    };
  }
});

// node_modules/core-js/internals/to-absolute-index.js
var require_to_absolute_index = __commonJS({
  "node_modules/core-js/internals/to-absolute-index.js"(exports, module) {
    var toInteger3 = require_to_integer();
    var max4 = Math.max;
    var min3 = Math.min;
    module.exports = function(index, length) {
      var integer = toInteger3(index);
      return integer < 0 ? max4(integer + length, 0) : min3(integer, length);
    };
  }
});

// node_modules/core-js/internals/array-includes.js
var require_array_includes = __commonJS({
  "node_modules/core-js/internals/array-includes.js"(exports, module) {
    var toIndexedObject3 = require_to_indexed_object();
    var toLength6 = require_to_length();
    var toAbsoluteIndex3 = require_to_absolute_index();
    var createMethod = function(IS_INCLUDES) {
      return function($this, el, fromIndex) {
        var O2 = toIndexedObject3($this);
        var length = toLength6(O2.length);
        var index = toAbsoluteIndex3(fromIndex, length);
        var value;
        if (IS_INCLUDES && el != el)
          while (length > index) {
            value = O2[index++];
            if (value != value)
              return true;
          }
        else
          for (; length > index; index++) {
            if ((IS_INCLUDES || index in O2) && O2[index] === el)
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
  "node_modules/core-js/internals/object-keys-internal.js"(exports, module) {
    var has3 = require_has();
    var toIndexedObject3 = require_to_indexed_object();
    var indexOf2 = require_array_includes().indexOf;
    var hiddenKeys2 = require_hidden_keys();
    module.exports = function(object, names) {
      var O2 = toIndexedObject3(object);
      var i3 = 0;
      var result = [];
      var key;
      for (key in O2)
        !has3(hiddenKeys2, key) && has3(O2, key) && result.push(key);
      while (names.length > i3)
        if (has3(O2, key = names[i3++])) {
          ~indexOf2(result, key) || result.push(key);
        }
      return result;
    };
  }
});

// node_modules/core-js/internals/enum-bug-keys.js
var require_enum_bug_keys = __commonJS({
  "node_modules/core-js/internals/enum-bug-keys.js"(exports, module) {
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
  "node_modules/core-js/internals/object-get-own-property-names.js"(exports) {
    var internalObjectKeys = require_object_keys_internal();
    var enumBugKeys = require_enum_bug_keys();
    var hiddenKeys2 = enumBugKeys.concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames2(O2) {
      return internalObjectKeys(O2, hiddenKeys2);
    };
  }
});

// node_modules/core-js/internals/object-get-own-property-symbols.js
var require_object_get_own_property_symbols = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-symbols.js"(exports) {
    exports.f = Object.getOwnPropertySymbols;
  }
});

// node_modules/core-js/internals/own-keys.js
var require_own_keys = __commonJS({
  "node_modules/core-js/internals/own-keys.js"(exports, module) {
    var getBuiltIn4 = require_get_built_in();
    var getOwnPropertyNamesModule2 = require_object_get_own_property_names();
    var getOwnPropertySymbolsModule2 = require_object_get_own_property_symbols();
    var anObject4 = require_an_object();
    module.exports = getBuiltIn4("Reflect", "ownKeys") || function ownKeys(it) {
      var keys = getOwnPropertyNamesModule2.f(anObject4(it));
      var getOwnPropertySymbols3 = getOwnPropertySymbolsModule2.f;
      return getOwnPropertySymbols3 ? keys.concat(getOwnPropertySymbols3(it)) : keys;
    };
  }
});

// node_modules/core-js/internals/copy-constructor-properties.js
var require_copy_constructor_properties = __commonJS({
  "node_modules/core-js/internals/copy-constructor-properties.js"(exports, module) {
    var has3 = require_has();
    var ownKeys = require_own_keys();
    var getOwnPropertyDescriptorModule2 = require_object_get_own_property_descriptor();
    var definePropertyModule2 = require_object_define_property();
    module.exports = function(target, source) {
      var keys = ownKeys(source);
      var defineProperty4 = definePropertyModule2.f;
      var getOwnPropertyDescriptor2 = getOwnPropertyDescriptorModule2.f;
      for (var i3 = 0; i3 < keys.length; i3++) {
        var key = keys[i3];
        if (!has3(target, key))
          defineProperty4(target, key, getOwnPropertyDescriptor2(source, key));
      }
    };
  }
});

// node_modules/core-js/internals/is-forced.js
var require_is_forced = __commonJS({
  "node_modules/core-js/internals/is-forced.js"(exports, module) {
    var fails7 = require_fails();
    var replacement = /#|\.prototype\./;
    var isForced2 = function(feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails7(detection) : !!detection;
    };
    var normalize = isForced2.normalize = function(string) {
      return String(string).replace(replacement, ".").toLowerCase();
    };
    var data = isForced2.data = {};
    var NATIVE = isForced2.NATIVE = "N";
    var POLYFILL = isForced2.POLYFILL = "P";
    module.exports = isForced2;
  }
});

// node_modules/core-js/internals/export.js
var require_export = __commonJS({
  "node_modules/core-js/internals/export.js"(exports, module) {
    var global8 = require_global();
    var getOwnPropertyDescriptor2 = require_object_get_own_property_descriptor().f;
    var createNonEnumerableProperty4 = require_create_non_enumerable_property();
    var redefine4 = require_redefine();
    var setGlobal = require_set_global();
    var copyConstructorProperties2 = require_copy_constructor_properties();
    var isForced2 = require_is_forced();
    module.exports = function(options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED5, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global8;
      } else if (STATIC) {
        target = global8[TARGET] || setGlobal(TARGET, {});
      } else {
        target = (global8[TARGET] || {}).prototype;
      }
      if (target)
        for (key in source) {
          sourceProperty = source[key];
          if (options.noTargetGet) {
            descriptor = getOwnPropertyDescriptor2(target, key);
            targetProperty = descriptor && descriptor.value;
          } else
            targetProperty = target[key];
          FORCED5 = isForced2(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
          if (!FORCED5 && targetProperty !== void 0) {
            if (typeof sourceProperty === typeof targetProperty)
              continue;
            copyConstructorProperties2(sourceProperty, targetProperty);
          }
          if (options.sham || targetProperty && targetProperty.sham) {
            createNonEnumerableProperty4(sourceProperty, "sham", true);
          }
          redefine4(target, key, sourceProperty, options);
        }
    };
  }
});

// node_modules/core-js/internals/a-function.js
var require_a_function = __commonJS({
  "node_modules/core-js/internals/a-function.js"(exports, module) {
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
  "node_modules/core-js/internals/function-bind.js"(exports, module) {
    "use strict";
    var aFunction4 = require_a_function();
    var isObject7 = require_is_object();
    var slice3 = [].slice;
    var factories = {};
    var construct2 = function(C2, argsLength, args) {
      if (!(argsLength in factories)) {
        for (var list = [], i3 = 0; i3 < argsLength; i3++)
          list[i3] = "a[" + i3 + "]";
        factories[argsLength] = Function("C,a", "return new C(" + list.join(",") + ")");
      }
      return factories[argsLength](C2, args);
    };
    module.exports = Function.bind || function bind4(that) {
      var fn = aFunction4(this);
      var partArgs = slice3.call(arguments, 1);
      var boundFunction = function bound() {
        var args = partArgs.concat(slice3.call(arguments));
        return this instanceof boundFunction ? construct2(fn, args.length, args) : fn.apply(that, args);
      };
      if (isObject7(fn.prototype))
        boundFunction.prototype = fn.prototype;
      return boundFunction;
    };
  }
});

// node_modules/core-js/internals/is-array.js
var require_is_array = __commonJS({
  "node_modules/core-js/internals/is-array.js"(exports, module) {
    var classof = require_classof_raw();
    module.exports = Array.isArray || function isArray5(arg) {
      return classof(arg) == "Array";
    };
  }
});

// node_modules/core-js/internals/create-property.js
var require_create_property = __commonJS({
  "node_modules/core-js/internals/create-property.js"(exports, module) {
    "use strict";
    var toPropertyKey2 = require_to_property_key();
    var definePropertyModule2 = require_object_define_property();
    var createPropertyDescriptor2 = require_create_property_descriptor();
    module.exports = function(object, key, value) {
      var propertyKey = toPropertyKey2(key);
      if (propertyKey in object)
        definePropertyModule2.f(object, propertyKey, createPropertyDescriptor2(0, value));
      else
        object[propertyKey] = value;
    };
  }
});

// node_modules/core-js/internals/array-species-constructor.js
var require_array_species_constructor = __commonJS({
  "node_modules/core-js/internals/array-species-constructor.js"(exports, module) {
    var isObject7 = require_is_object();
    var isArray5 = require_is_array();
    var wellKnownSymbol7 = require_well_known_symbol();
    var SPECIES3 = wellKnownSymbol7("species");
    module.exports = function(originalArray) {
      var C2;
      if (isArray5(originalArray)) {
        C2 = originalArray.constructor;
        if (typeof C2 == "function" && (C2 === Array || isArray5(C2.prototype)))
          C2 = void 0;
        else if (isObject7(C2)) {
          C2 = C2[SPECIES3];
          if (C2 === null)
            C2 = void 0;
        }
      }
      return C2 === void 0 ? Array : C2;
    };
  }
});

// node_modules/core-js/internals/array-species-create.js
var require_array_species_create = __commonJS({
  "node_modules/core-js/internals/array-species-create.js"(exports, module) {
    var arraySpeciesConstructor = require_array_species_constructor();
    module.exports = function(originalArray, length) {
      return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
    };
  }
});

// node_modules/core-js/internals/array-method-has-species-support.js
var require_array_method_has_species_support = __commonJS({
  "node_modules/core-js/internals/array-method-has-species-support.js"(exports, module) {
    var fails7 = require_fails();
    var wellKnownSymbol7 = require_well_known_symbol();
    var V8_VERSION3 = require_engine_v8_version();
    var SPECIES3 = wellKnownSymbol7("species");
    module.exports = function(METHOD_NAME) {
      return V8_VERSION3 >= 51 || !fails7(function() {
        var array = [];
        var constructor = array.constructor = {};
        constructor[SPECIES3] = function() {
          return { foo: 1 };
        };
        return array[METHOD_NAME](Boolean).foo !== 1;
      });
    };
  }
});

// node_modules/core-js/internals/function-bind-context.js
var require_function_bind_context = __commonJS({
  "node_modules/core-js/internals/function-bind-context.js"(exports, module) {
    var aFunction4 = require_a_function();
    module.exports = function(fn, that, length) {
      aFunction4(fn);
      if (that === void 0)
        return fn;
      switch (length) {
        case 0:
          return function() {
            return fn.call(that);
          };
        case 1:
          return function(a2) {
            return fn.call(that, a2);
          };
        case 2:
          return function(a2, b2) {
            return fn.call(that, a2, b2);
          };
        case 3:
          return function(a2, b2, c2) {
            return fn.call(that, a2, b2, c2);
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
  "node_modules/core-js/internals/array-iteration.js"(exports, module) {
    var bind4 = require_function_bind_context();
    var IndexedObject = require_indexed_object();
    var toObject6 = require_to_object();
    var toLength6 = require_to_length();
    var arraySpeciesCreate3 = require_array_species_create();
    var push = [].push;
    var createMethod = function(TYPE) {
      var IS_MAP = TYPE == 1;
      var IS_FILTER = TYPE == 2;
      var IS_SOME = TYPE == 3;
      var IS_EVERY = TYPE == 4;
      var IS_FIND_INDEX = TYPE == 6;
      var IS_FILTER_REJECT = TYPE == 7;
      var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
      return function($this, callbackfn, that, specificCreate) {
        var O2 = toObject6($this);
        var self2 = IndexedObject(O2);
        var boundFunction = bind4(callbackfn, that, 3);
        var length = toLength6(self2.length);
        var index = 0;
        var create4 = specificCreate || arraySpeciesCreate3;
        var target = IS_MAP ? create4($this, length) : IS_FILTER || IS_FILTER_REJECT ? create4($this, 0) : void 0;
        var value, result;
        for (; length > index; index++)
          if (NO_HOLES || index in self2) {
            value = self2[index];
            result = boundFunction(value, index, O2);
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
      filterReject: createMethod(7)
    };
  }
});

// node_modules/core-js/internals/array-method-is-strict.js
var require_array_method_is_strict = __commonJS({
  "node_modules/core-js/internals/array-method-is-strict.js"(exports, module) {
    "use strict";
    var fails7 = require_fails();
    module.exports = function(METHOD_NAME, argument) {
      var method = [][METHOD_NAME];
      return !!method && fails7(function() {
        method.call(null, argument || function() {
          throw 1;
        }, 1);
      });
    };
  }
});

// node_modules/core-js/internals/array-for-each.js
var require_array_for_each = __commonJS({
  "node_modules/core-js/internals/array-for-each.js"(exports, module) {
    "use strict";
    var $forEach2 = require_array_iteration().forEach;
    var arrayMethodIsStrict4 = require_array_method_is_strict();
    var STRICT_METHOD4 = arrayMethodIsStrict4("forEach");
    module.exports = !STRICT_METHOD4 ? function forEach3(callbackfn) {
      return $forEach2(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    } : [].forEach;
  }
});

// node_modules/core-js/internals/dom-iterables.js
var require_dom_iterables = __commonJS({
  "node_modules/core-js/internals/dom-iterables.js"(exports, module) {
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

// node_modules/core-js/internals/a-possible-prototype.js
var require_a_possible_prototype = __commonJS({
  "node_modules/core-js/internals/a-possible-prototype.js"(exports, module) {
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
  "node_modules/core-js/internals/object-set-prototype-of.js"(exports, module) {
    var anObject4 = require_an_object();
    var aPossiblePrototype = require_a_possible_prototype();
    module.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
      var CORRECT_SETTER = false;
      var test2 = {};
      var setter;
      try {
        setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set;
        setter.call(test2, []);
        CORRECT_SETTER = test2 instanceof Array;
      } catch (error) {
      }
      return function setPrototypeOf3(O2, proto) {
        anObject4(O2);
        aPossiblePrototype(proto);
        if (CORRECT_SETTER)
          setter.call(O2, proto);
        else
          O2.__proto__ = proto;
        return O2;
      };
    }() : void 0);
  }
});

// node_modules/core-js/internals/correct-prototype-getter.js
var require_correct_prototype_getter = __commonJS({
  "node_modules/core-js/internals/correct-prototype-getter.js"(exports, module) {
    var fails7 = require_fails();
    module.exports = !fails7(function() {
      function F() {
      }
      F.prototype.constructor = null;
      return Object.getPrototypeOf(new F()) !== F.prototype;
    });
  }
});

// node_modules/core-js/internals/object-get-prototype-of.js
var require_object_get_prototype_of = __commonJS({
  "node_modules/core-js/internals/object-get-prototype-of.js"(exports, module) {
    var has3 = require_has();
    var toObject6 = require_to_object();
    var sharedKey2 = require_shared_key();
    var CORRECT_PROTOTYPE_GETTER2 = require_correct_prototype_getter();
    var IE_PROTO = sharedKey2("IE_PROTO");
    var ObjectPrototype2 = Object.prototype;
    module.exports = CORRECT_PROTOTYPE_GETTER2 ? Object.getPrototypeOf : function(O2) {
      O2 = toObject6(O2);
      if (has3(O2, IE_PROTO))
        return O2[IE_PROTO];
      if (typeof O2.constructor == "function" && O2 instanceof O2.constructor) {
        return O2.constructor.prototype;
      }
      return O2 instanceof Object ? ObjectPrototype2 : null;
    };
  }
});

// node_modules/core-js/internals/object-keys.js
var require_object_keys = __commonJS({
  "node_modules/core-js/internals/object-keys.js"(exports, module) {
    var internalObjectKeys = require_object_keys_internal();
    var enumBugKeys = require_enum_bug_keys();
    module.exports = Object.keys || function keys(O2) {
      return internalObjectKeys(O2, enumBugKeys);
    };
  }
});

// node_modules/core-js/internals/object-define-properties.js
var require_object_define_properties = __commonJS({
  "node_modules/core-js/internals/object-define-properties.js"(exports, module) {
    var DESCRIPTORS6 = require_descriptors();
    var definePropertyModule2 = require_object_define_property();
    var anObject4 = require_an_object();
    var objectKeys2 = require_object_keys();
    module.exports = DESCRIPTORS6 ? Object.defineProperties : function defineProperties2(O2, Properties) {
      anObject4(O2);
      var keys = objectKeys2(Properties);
      var length = keys.length;
      var index = 0;
      var key;
      while (length > index)
        definePropertyModule2.f(O2, key = keys[index++], Properties[key]);
      return O2;
    };
  }
});

// node_modules/core-js/internals/html.js
var require_html = __commonJS({
  "node_modules/core-js/internals/html.js"(exports, module) {
    var getBuiltIn4 = require_get_built_in();
    module.exports = getBuiltIn4("document", "documentElement");
  }
});

// node_modules/core-js/internals/object-create.js
var require_object_create = __commonJS({
  "node_modules/core-js/internals/object-create.js"(exports, module) {
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
      if (iframe.style) {
        iframe.style.display = "none";
        html.appendChild(iframe);
        iframe.src = String(JS);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(scriptTag("document.F=Object"));
        iframeDocument.close();
        return iframeDocument.F;
      }
    };
    var activeXDocument;
    var NullProtoObject = function() {
      try {
        activeXDocument = new ActiveXObject("htmlfile");
      } catch (error) {
      }
      NullProtoObject = document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() || NullProtoObjectViaActiveX(activeXDocument);
      var length = enumBugKeys.length;
      while (length--)
        delete NullProtoObject[PROTOTYPE2][enumBugKeys[length]];
      return NullProtoObject();
    };
    hiddenKeys2[IE_PROTO] = true;
    module.exports = Object.create || function create4(O2, Properties) {
      var result;
      if (O2 !== null) {
        EmptyConstructor[PROTOTYPE2] = anObject4(O2);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE2] = null;
        result[IE_PROTO] = O2;
      } else
        result = NullProtoObject();
      return Properties === void 0 ? result : defineProperties2(result, Properties);
    };
  }
});

// node_modules/core-js/internals/to-string.js
var require_to_string = __commonJS({
  "node_modules/core-js/internals/to-string.js"(exports, module) {
    var isSymbol2 = require_is_symbol();
    module.exports = function(argument) {
      if (isSymbol2(argument))
        throw TypeError("Cannot convert a Symbol value to a string");
      return String(argument);
    };
  }
});

// node_modules/core-js/internals/object-get-own-property-names-external.js
var require_object_get_own_property_names_external = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-names-external.js"(exports, module) {
    var toIndexedObject3 = require_to_indexed_object();
    var $getOwnPropertyNames2 = require_object_get_own_property_names().f;
    var toString5 = {}.toString;
    var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    var getWindowNames = function(it) {
      try {
        return $getOwnPropertyNames2(it);
      } catch (error) {
        return windowNames.slice();
      }
    };
    module.exports.f = function getOwnPropertyNames2(it) {
      return windowNames && toString5.call(it) == "[object Window]" ? getWindowNames(it) : $getOwnPropertyNames2(toIndexedObject3(it));
    };
  }
});

// node_modules/core-js/internals/well-known-symbol-wrapped.js
var require_well_known_symbol_wrapped = __commonJS({
  "node_modules/core-js/internals/well-known-symbol-wrapped.js"(exports) {
    var wellKnownSymbol7 = require_well_known_symbol();
    exports.f = wellKnownSymbol7;
  }
});

// node_modules/core-js/internals/path.js
var require_path = __commonJS({
  "node_modules/core-js/internals/path.js"(exports, module) {
    var global8 = require_global();
    module.exports = global8;
  }
});

// node_modules/core-js/internals/define-well-known-symbol.js
var require_define_well_known_symbol = __commonJS({
  "node_modules/core-js/internals/define-well-known-symbol.js"(exports, module) {
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
  "node_modules/core-js/internals/set-to-string-tag.js"(exports, module) {
    var defineProperty4 = require_object_define_property().f;
    var has3 = require_has();
    var wellKnownSymbol7 = require_well_known_symbol();
    var TO_STRING_TAG2 = wellKnownSymbol7("toStringTag");
    module.exports = function(it, TAG, STATIC) {
      if (it && !has3(it = STATIC ? it : it.prototype, TO_STRING_TAG2)) {
        defineProperty4(it, TO_STRING_TAG2, { configurable: true, value: TAG });
      }
    };
  }
});

// node_modules/core-js/internals/to-string-tag-support.js
var require_to_string_tag_support = __commonJS({
  "node_modules/core-js/internals/to-string-tag-support.js"(exports, module) {
    var wellKnownSymbol7 = require_well_known_symbol();
    var TO_STRING_TAG2 = wellKnownSymbol7("toStringTag");
    var test2 = {};
    test2[TO_STRING_TAG2] = "z";
    module.exports = String(test2) === "[object z]";
  }
});

// node_modules/core-js/internals/classof.js
var require_classof = __commonJS({
  "node_modules/core-js/internals/classof.js"(exports, module) {
    var TO_STRING_TAG_SUPPORT2 = require_to_string_tag_support();
    var classofRaw = require_classof_raw();
    var wellKnownSymbol7 = require_well_known_symbol();
    var TO_STRING_TAG2 = wellKnownSymbol7("toStringTag");
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
      var O2, tag, result;
      return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O2 = Object(it), TO_STRING_TAG2)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O2) : (result = classofRaw(O2)) == "Object" && typeof O2.callee == "function" ? "Arguments" : result;
    };
  }
});

// node_modules/core-js/internals/object-to-string.js
var require_object_to_string = __commonJS({
  "node_modules/core-js/internals/object-to-string.js"(exports, module) {
    "use strict";
    var TO_STRING_TAG_SUPPORT2 = require_to_string_tag_support();
    var classof = require_classof();
    module.exports = TO_STRING_TAG_SUPPORT2 ? {}.toString : function toString5() {
      return "[object " + classof(this) + "]";
    };
  }
});

// node_modules/core-js/internals/add-to-unscopables.js
var require_add_to_unscopables = __commonJS({
  "node_modules/core-js/internals/add-to-unscopables.js"(exports, module) {
    var wellKnownSymbol7 = require_well_known_symbol();
    var create4 = require_object_create();
    var definePropertyModule2 = require_object_define_property();
    var UNSCOPABLES = wellKnownSymbol7("unscopables");
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
  "node_modules/core-js/internals/iterators.js"(exports, module) {
    module.exports = {};
  }
});

// node_modules/core-js/internals/iterators-core.js
var require_iterators_core = __commonJS({
  "node_modules/core-js/internals/iterators-core.js"(exports, module) {
    "use strict";
    var fails7 = require_fails();
    var getPrototypeOf2 = require_object_get_prototype_of();
    var createNonEnumerableProperty4 = require_create_non_enumerable_property();
    var has3 = require_has();
    var wellKnownSymbol7 = require_well_known_symbol();
    var IS_PURE3 = require_is_pure();
    var ITERATOR2 = wellKnownSymbol7("iterator");
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
    var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == void 0 || fails7(function() {
      var test2 = {};
      return IteratorPrototype[ITERATOR2].call(test2) !== test2;
    });
    if (NEW_ITERATOR_PROTOTYPE)
      IteratorPrototype = {};
    if ((!IS_PURE3 || NEW_ITERATOR_PROTOTYPE) && !has3(IteratorPrototype, ITERATOR2)) {
      createNonEnumerableProperty4(IteratorPrototype, ITERATOR2, returnThis);
    }
    module.exports = {
      IteratorPrototype,
      BUGGY_SAFARI_ITERATORS
    };
  }
});

// node_modules/core-js/internals/create-iterator-constructor.js
var require_create_iterator_constructor = __commonJS({
  "node_modules/core-js/internals/create-iterator-constructor.js"(exports, module) {
    "use strict";
    var IteratorPrototype = require_iterators_core().IteratorPrototype;
    var create4 = require_object_create();
    var createPropertyDescriptor2 = require_create_property_descriptor();
    var setToStringTag3 = require_set_to_string_tag();
    var Iterators = require_iterators();
    var returnThis = function() {
      return this;
    };
    module.exports = function(IteratorConstructor, NAME2, next2) {
      var TO_STRING_TAG2 = NAME2 + " Iterator";
      IteratorConstructor.prototype = create4(IteratorPrototype, { next: createPropertyDescriptor2(1, next2) });
      setToStringTag3(IteratorConstructor, TO_STRING_TAG2, false, true);
      Iterators[TO_STRING_TAG2] = returnThis;
      return IteratorConstructor;
    };
  }
});

// node_modules/core-js/internals/define-iterator.js
var require_define_iterator = __commonJS({
  "node_modules/core-js/internals/define-iterator.js"(exports, module) {
    "use strict";
    var $22 = require_export();
    var createIteratorConstructor = require_create_iterator_constructor();
    var getPrototypeOf2 = require_object_get_prototype_of();
    var setPrototypeOf3 = require_object_set_prototype_of();
    var setToStringTag3 = require_set_to_string_tag();
    var createNonEnumerableProperty4 = require_create_non_enumerable_property();
    var redefine4 = require_redefine();
    var wellKnownSymbol7 = require_well_known_symbol();
    var IS_PURE3 = require_is_pure();
    var Iterators = require_iterators();
    var IteratorsCore = require_iterators_core();
    var IteratorPrototype = IteratorsCore.IteratorPrototype;
    var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
    var ITERATOR2 = wellKnownSymbol7("iterator");
    var KEYS = "keys";
    var VALUES = "values";
    var ENTRIES = "entries";
    var returnThis = function() {
      return this;
    };
    module.exports = function(Iterable, NAME2, IteratorConstructor, next2, DEFAULT, IS_SET, FORCED5) {
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
          if (!IS_PURE3 && getPrototypeOf2(CurrentIteratorPrototype) !== IteratorPrototype) {
            if (setPrototypeOf3) {
              setPrototypeOf3(CurrentIteratorPrototype, IteratorPrototype);
            } else if (typeof CurrentIteratorPrototype[ITERATOR2] != "function") {
              createNonEnumerableProperty4(CurrentIteratorPrototype, ITERATOR2, returnThis);
            }
          }
          setToStringTag3(CurrentIteratorPrototype, TO_STRING_TAG2, true, true);
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
      if ((!IS_PURE3 || FORCED5) && IterablePrototype[ITERATOR2] !== defaultIterator) {
        createNonEnumerableProperty4(IterablePrototype, ITERATOR2, defaultIterator);
      }
      Iterators[NAME2] = defaultIterator;
      if (DEFAULT) {
        methods = {
          values: getIterationMethod(VALUES),
          keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
          entries: getIterationMethod(ENTRIES)
        };
        if (FORCED5)
          for (KEY in methods) {
            if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
              redefine4(IterablePrototype, KEY, methods[KEY]);
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
  "node_modules/core-js/modules/es.array.iterator.js"(exports, module) {
    "use strict";
    var toIndexedObject3 = require_to_indexed_object();
    var addToUnscopables = require_add_to_unscopables();
    var Iterators = require_iterators();
    var InternalStateModule4 = require_internal_state();
    var defineIterator2 = require_define_iterator();
    var ARRAY_ITERATOR = "Array Iterator";
    var setInternalState4 = InternalStateModule4.set;
    var getInternalState4 = InternalStateModule4.getterFor(ARRAY_ITERATOR);
    module.exports = defineIterator2(Array, "Array", function(iterated, kind) {
      setInternalState4(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject3(iterated),
        index: 0,
        kind
      });
    }, function() {
      var state = getInternalState4(this);
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
  "node_modules/core-js/internals/string-multibyte.js"(exports, module) {
    var toInteger3 = require_to_integer();
    var toString5 = require_to_string();
    var requireObjectCoercible2 = require_require_object_coercible();
    var createMethod = function(CONVERT_TO_STRING) {
      return function($this, pos) {
        var S = toString5(requireObjectCoercible2($this));
        var position = toInteger3(pos);
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

// node_modules/core-js/internals/array-sort.js
var require_array_sort = __commonJS({
  "node_modules/core-js/internals/array-sort.js"(exports, module) {
    var floor = Math.floor;
    var mergeSort = function(array, comparefn) {
      var length = array.length;
      var middle = floor(length / 2);
      return length < 8 ? insertionSort(array, comparefn) : merge(mergeSort(array.slice(0, middle), comparefn), mergeSort(array.slice(middle), comparefn), comparefn);
    };
    var insertionSort = function(array, comparefn) {
      var length = array.length;
      var i3 = 1;
      var element, j2;
      while (i3 < length) {
        j2 = i3;
        element = array[i3];
        while (j2 && comparefn(array[j2 - 1], element) > 0) {
          array[j2] = array[--j2];
        }
        if (j2 !== i3++)
          array[j2] = element;
      }
      return array;
    };
    var merge = function(left, right, comparefn) {
      var llength = left.length;
      var rlength = right.length;
      var lindex = 0;
      var rindex = 0;
      var result = [];
      while (lindex < llength || rindex < rlength) {
        if (lindex < llength && rindex < rlength) {
          result.push(comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]);
        } else {
          result.push(lindex < llength ? left[lindex++] : right[rindex++]);
        }
      }
      return result;
    };
    module.exports = mergeSort;
  }
});

// node_modules/core-js/internals/engine-ff-version.js
var require_engine_ff_version = __commonJS({
  "node_modules/core-js/internals/engine-ff-version.js"(exports, module) {
    var userAgent2 = require_engine_user_agent();
    var firefox = userAgent2.match(/firefox\/(\d+)/i);
    module.exports = !!firefox && +firefox[1];
  }
});

// node_modules/core-js/internals/engine-is-ie-or-edge.js
var require_engine_is_ie_or_edge = __commonJS({
  "node_modules/core-js/internals/engine-is-ie-or-edge.js"(exports, module) {
    var UA = require_engine_user_agent();
    module.exports = /MSIE|Trident/.test(UA);
  }
});

// node_modules/core-js/internals/engine-webkit-version.js
var require_engine_webkit_version = __commonJS({
  "node_modules/core-js/internals/engine-webkit-version.js"(exports, module) {
    var userAgent2 = require_engine_user_agent();
    var webkit = userAgent2.match(/AppleWebKit\/(\d+)\./);
    module.exports = !!webkit && +webkit[1];
  }
});

// node_modules/core-js/internals/regexp-flags.js
var require_regexp_flags = __commonJS({
  "node_modules/core-js/internals/regexp-flags.js"(exports, module) {
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

// node_modules/core-js/internals/regexp-sticky-helpers.js
var require_regexp_sticky_helpers = __commonJS({
  "node_modules/core-js/internals/regexp-sticky-helpers.js"(exports) {
    var fails7 = require_fails();
    var RE = function(s2, f2) {
      return RegExp(s2, f2);
    };
    exports.UNSUPPORTED_Y = fails7(function() {
      var re = RE("a", "y");
      re.lastIndex = 2;
      return re.exec("abcd") != null;
    });
    exports.BROKEN_CARET = fails7(function() {
      var re = RE("^r", "gy");
      re.lastIndex = 2;
      return re.exec("str") != null;
    });
  }
});

// node_modules/core-js/internals/regexp-unsupported-dot-all.js
var require_regexp_unsupported_dot_all = __commonJS({
  "node_modules/core-js/internals/regexp-unsupported-dot-all.js"(exports, module) {
    var fails7 = require_fails();
    module.exports = fails7(function() {
      var re = RegExp(".", "string".charAt(0));
      return !(re.dotAll && re.exec("\n") && re.flags === "s");
    });
  }
});

// node_modules/core-js/internals/regexp-unsupported-ncg.js
var require_regexp_unsupported_ncg = __commonJS({
  "node_modules/core-js/internals/regexp-unsupported-ncg.js"(exports, module) {
    var fails7 = require_fails();
    module.exports = fails7(function() {
      var re = RegExp("(?<a>b)", "string".charAt(5));
      return re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc";
    });
  }
});

// node_modules/core-js/internals/regexp-exec.js
var require_regexp_exec = __commonJS({
  "node_modules/core-js/internals/regexp-exec.js"(exports, module) {
    "use strict";
    var toString5 = require_to_string();
    var regexpFlags = require_regexp_flags();
    var stickyHelpers = require_regexp_sticky_helpers();
    var shared2 = require_shared();
    var create4 = require_object_create();
    var getInternalState4 = require_internal_state().get;
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
    var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;
    var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
    var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
    if (PATCH) {
      patchedExec = function exec(string) {
        var re = this;
        var state = getInternalState4(re);
        var str = toString5(string);
        var raw = state.raw;
        var result, reCopy, lastIndex, match, i3, object, group;
        if (raw) {
          raw.lastIndex = re.lastIndex;
          result = patchedExec.call(raw, str);
          re.lastIndex = raw.lastIndex;
          return result;
        }
        var groups = state.groups;
        var sticky = UNSUPPORTED_Y && re.sticky;
        var flags = regexpFlags.call(re);
        var source = re.source;
        var charsAdded = 0;
        var strCopy = str;
        if (sticky) {
          flags = flags.replace("y", "");
          if (flags.indexOf("g") === -1) {
            flags += "g";
          }
          strCopy = str.slice(re.lastIndex);
          if (re.lastIndex > 0 && (!re.multiline || re.multiline && str.charAt(re.lastIndex - 1) !== "\n")) {
            source = "(?: " + source + ")";
            strCopy = " " + strCopy;
            charsAdded++;
          }
          reCopy = new RegExp("^(?:" + source + ")", flags);
        }
        if (NPCG_INCLUDED) {
          reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
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
            for (i3 = 1; i3 < arguments.length - 2; i3++) {
              if (arguments[i3] === void 0)
                match[i3] = void 0;
            }
          });
        }
        if (match && groups) {
          match.groups = object = create4(null);
          for (i3 = 0; i3 < groups.length; i3++) {
            group = groups[i3];
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
  "node_modules/core-js/modules/es.regexp.exec.js"() {
    "use strict";
    var $22 = require_export();
    var exec = require_regexp_exec();
    $22({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
      exec
    });
  }
});

// node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js
var require_fix_regexp_well_known_symbol_logic = __commonJS({
  "node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js"(exports, module) {
    "use strict";
    require_es_regexp_exec();
    var redefine4 = require_redefine();
    var regexpExec = require_regexp_exec();
    var fails7 = require_fails();
    var wellKnownSymbol7 = require_well_known_symbol();
    var createNonEnumerableProperty4 = require_create_non_enumerable_property();
    var SPECIES3 = wellKnownSymbol7("species");
    var RegExpPrototype = RegExp.prototype;
    module.exports = function(KEY, exec, FORCED5, SHAM) {
      var SYMBOL2 = wellKnownSymbol7(KEY);
      var DELEGATES_TO_SYMBOL = !fails7(function() {
        var O2 = {};
        O2[SYMBOL2] = function() {
          return 7;
        };
        return ""[KEY](O2) != 7;
      });
      var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails7(function() {
        var execCalled = false;
        var re = /a/;
        if (KEY === "split") {
          re = {};
          re.constructor = {};
          re.constructor[SPECIES3] = function() {
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
      if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED5) {
        var nativeRegExpMethod = /./[SYMBOL2];
        var methods = exec(SYMBOL2, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
          var $exec = regexp.exec;
          if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        });
        redefine4(String.prototype, KEY, methods[0]);
        redefine4(RegExpPrototype, SYMBOL2, methods[1]);
      }
      if (SHAM)
        createNonEnumerableProperty4(RegExpPrototype[SYMBOL2], "sham", true);
    };
  }
});

// node_modules/core-js/internals/advance-string-index.js
var require_advance_string_index = __commonJS({
  "node_modules/core-js/internals/advance-string-index.js"(exports, module) {
    "use strict";
    var charAt2 = require_string_multibyte().charAt;
    module.exports = function(S, index, unicode) {
      return index + (unicode ? charAt2(S, index).length : 1);
    };
  }
});

// node_modules/core-js/internals/get-substitution.js
var require_get_substitution = __commonJS({
  "node_modules/core-js/internals/get-substitution.js"(exports, module) {
    var toObject6 = require_to_object();
    var floor = Math.floor;
    var replace = "".replace;
    var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
    var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
    module.exports = function(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m2 = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== void 0) {
        namedCaptures = toObject6(namedCaptures);
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
            var n2 = +ch;
            if (n2 === 0)
              return match;
            if (n2 > m2) {
              var f2 = floor(n2 / 10);
              if (f2 === 0)
                return match;
              if (f2 <= m2)
                return captures[f2 - 1] === void 0 ? ch.charAt(1) : captures[f2 - 1] + ch.charAt(1);
              return match;
            }
            capture = captures[n2 - 1];
        }
        return capture === void 0 ? "" : capture;
      });
    };
  }
});

// node_modules/core-js/internals/regexp-exec-abstract.js
var require_regexp_exec_abstract = __commonJS({
  "node_modules/core-js/internals/regexp-exec-abstract.js"(exports, module) {
    var classof = require_classof_raw();
    var regexpExec = require_regexp_exec();
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
      return regexpExec.call(R, S);
    };
  }
});

// node_modules/core-js/internals/create-html.js
var require_create_html = __commonJS({
  "node_modules/core-js/internals/create-html.js"(exports, module) {
    var requireObjectCoercible2 = require_require_object_coercible();
    var toString5 = require_to_string();
    var quot = /"/g;
    module.exports = function(string, tag, attribute, value) {
      var S = toString5(requireObjectCoercible2(string));
      var p1 = "<" + tag;
      if (attribute !== "")
        p1 += " " + attribute + '="' + toString5(value).replace(quot, "&quot;") + '"';
      return p1 + ">" + S + "</" + tag + ">";
    };
  }
});

// node_modules/core-js/internals/string-html-forced.js
var require_string_html_forced = __commonJS({
  "node_modules/core-js/internals/string-html-forced.js"(exports, module) {
    var fails7 = require_fails();
    module.exports = function(METHOD_NAME) {
      return fails7(function() {
        var test2 = ""[METHOD_NAME]('"');
        return test2 !== test2.toLowerCase() || test2.split('"').length > 3;
      });
    };
  }
});

// node_modules/core-js/internals/native-promise-constructor.js
var require_native_promise_constructor = __commonJS({
  "node_modules/core-js/internals/native-promise-constructor.js"(exports, module) {
    var global8 = require_global();
    module.exports = global8.Promise;
  }
});

// node_modules/core-js/internals/redefine-all.js
var require_redefine_all = __commonJS({
  "node_modules/core-js/internals/redefine-all.js"(exports, module) {
    var redefine4 = require_redefine();
    module.exports = function(target, src, options) {
      for (var key in src)
        redefine4(target, key, src[key], options);
      return target;
    };
  }
});

// node_modules/core-js/internals/set-species.js
var require_set_species = __commonJS({
  "node_modules/core-js/internals/set-species.js"(exports, module) {
    "use strict";
    var getBuiltIn4 = require_get_built_in();
    var definePropertyModule2 = require_object_define_property();
    var wellKnownSymbol7 = require_well_known_symbol();
    var DESCRIPTORS6 = require_descriptors();
    var SPECIES3 = wellKnownSymbol7("species");
    module.exports = function(CONSTRUCTOR_NAME) {
      var Constructor = getBuiltIn4(CONSTRUCTOR_NAME);
      var defineProperty4 = definePropertyModule2.f;
      if (DESCRIPTORS6 && Constructor && !Constructor[SPECIES3]) {
        defineProperty4(Constructor, SPECIES3, {
          configurable: true,
          get: function() {
            return this;
          }
        });
      }
    };
  }
});

// node_modules/core-js/internals/an-instance.js
var require_an_instance = __commonJS({
  "node_modules/core-js/internals/an-instance.js"(exports, module) {
    module.exports = function(it, Constructor, name) {
      if (!(it instanceof Constructor)) {
        throw TypeError("Incorrect " + (name ? name + " " : "") + "invocation");
      }
      return it;
    };
  }
});

// node_modules/core-js/internals/is-array-iterator-method.js
var require_is_array_iterator_method = __commonJS({
  "node_modules/core-js/internals/is-array-iterator-method.js"(exports, module) {
    var wellKnownSymbol7 = require_well_known_symbol();
    var Iterators = require_iterators();
    var ITERATOR2 = wellKnownSymbol7("iterator");
    var ArrayPrototype = Array.prototype;
    module.exports = function(it) {
      return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR2] === it);
    };
  }
});

// node_modules/core-js/internals/get-iterator-method.js
var require_get_iterator_method = __commonJS({
  "node_modules/core-js/internals/get-iterator-method.js"(exports, module) {
    var classof = require_classof();
    var Iterators = require_iterators();
    var wellKnownSymbol7 = require_well_known_symbol();
    var ITERATOR2 = wellKnownSymbol7("iterator");
    module.exports = function(it) {
      if (it != void 0)
        return it[ITERATOR2] || it["@@iterator"] || Iterators[classof(it)];
    };
  }
});

// node_modules/core-js/internals/iterator-close.js
var require_iterator_close = __commonJS({
  "node_modules/core-js/internals/iterator-close.js"(exports, module) {
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
  "node_modules/core-js/internals/iterate.js"(exports, module) {
    var anObject4 = require_an_object();
    var isArrayIteratorMethod = require_is_array_iterator_method();
    var toLength6 = require_to_length();
    var bind4 = require_function_bind_context();
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
      var fn = bind4(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
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
          for (index = 0, length = toLength6(iterable.length); length > index; index++) {
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

// node_modules/core-js/internals/check-correctness-of-iteration.js
var require_check_correctness_of_iteration = __commonJS({
  "node_modules/core-js/internals/check-correctness-of-iteration.js"(exports, module) {
    var wellKnownSymbol7 = require_well_known_symbol();
    var ITERATOR2 = wellKnownSymbol7("iterator");
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

// node_modules/core-js/internals/species-constructor.js
var require_species_constructor = __commonJS({
  "node_modules/core-js/internals/species-constructor.js"(exports, module) {
    var anObject4 = require_an_object();
    var aFunction4 = require_a_function();
    var wellKnownSymbol7 = require_well_known_symbol();
    var SPECIES3 = wellKnownSymbol7("species");
    module.exports = function(O2, defaultConstructor) {
      var C2 = anObject4(O2).constructor;
      var S;
      return C2 === void 0 || (S = anObject4(C2)[SPECIES3]) == void 0 ? defaultConstructor : aFunction4(S);
    };
  }
});

// node_modules/core-js/internals/engine-is-ios.js
var require_engine_is_ios = __commonJS({
  "node_modules/core-js/internals/engine-is-ios.js"(exports, module) {
    var userAgent2 = require_engine_user_agent();
    module.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent2);
  }
});

// node_modules/core-js/internals/engine-is-node.js
var require_engine_is_node = __commonJS({
  "node_modules/core-js/internals/engine-is-node.js"(exports, module) {
    var classof = require_classof_raw();
    var global8 = require_global();
    module.exports = classof(global8.process) == "process";
  }
});

// node_modules/core-js/internals/task.js
var require_task = __commonJS({
  "node_modules/core-js/internals/task.js"(exports, module) {
    var global8 = require_global();
    var fails7 = require_fails();
    var bind4 = require_function_bind_context();
    var html = require_html();
    var createElement = require_document_create_element();
    var IS_IOS = require_engine_is_ios();
    var IS_NODE2 = require_engine_is_node();
    var set = global8.setImmediate;
    var clear = global8.clearImmediate;
    var process2 = global8.process;
    var MessageChannel = global8.MessageChannel;
    var Dispatch = global8.Dispatch;
    var counter = 0;
    var queue = {};
    var ONREADYSTATECHANGE = "onreadystatechange";
    var location;
    var defer;
    var channel;
    var port;
    try {
      location = global8.location;
    } catch (error) {
    }
    var run = function(id) {
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var runner = function(id) {
      return function() {
        run(id);
      };
    };
    var listener = function(event) {
      run(event.data);
    };
    var post = function(id) {
      global8.postMessage(String(id), location.protocol + "//" + location.host);
    };
    if (!set || !clear) {
      set = function setImmediate(fn) {
        var args = [];
        var argumentsLength = arguments.length;
        var i3 = 1;
        while (argumentsLength > i3)
          args.push(arguments[i3++]);
        queue[++counter] = function() {
          (typeof fn == "function" ? fn : Function(fn)).apply(void 0, args);
        };
        defer(counter);
        return counter;
      };
      clear = function clearImmediate(id) {
        delete queue[id];
      };
      if (IS_NODE2) {
        defer = function(id) {
          process2.nextTick(runner(id));
        };
      } else if (Dispatch && Dispatch.now) {
        defer = function(id) {
          Dispatch.now(runner(id));
        };
      } else if (MessageChannel && !IS_IOS) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listener;
        defer = bind4(port.postMessage, port, 1);
      } else if (global8.addEventListener && typeof postMessage == "function" && !global8.importScripts && location && location.protocol !== "file:" && !fails7(post)) {
        defer = post;
        global8.addEventListener("message", listener, false);
      } else if (ONREADYSTATECHANGE in createElement("script")) {
        defer = function(id) {
          html.appendChild(createElement("script"))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run(id);
          };
        };
      } else {
        defer = function(id) {
          setTimeout(runner(id), 0);
        };
      }
    }
    module.exports = {
      set,
      clear
    };
  }
});

// node_modules/core-js/internals/engine-is-ios-pebble.js
var require_engine_is_ios_pebble = __commonJS({
  "node_modules/core-js/internals/engine-is-ios-pebble.js"(exports, module) {
    var userAgent2 = require_engine_user_agent();
    var global8 = require_global();
    module.exports = /iphone|ipod|ipad/i.test(userAgent2) && global8.Pebble !== void 0;
  }
});

// node_modules/core-js/internals/engine-is-webos-webkit.js
var require_engine_is_webos_webkit = __commonJS({
  "node_modules/core-js/internals/engine-is-webos-webkit.js"(exports, module) {
    var userAgent2 = require_engine_user_agent();
    module.exports = /web0s(?!.*chrome)/i.test(userAgent2);
  }
});

// node_modules/core-js/internals/microtask.js
var require_microtask = __commonJS({
  "node_modules/core-js/internals/microtask.js"(exports, module) {
    var global8 = require_global();
    var getOwnPropertyDescriptor2 = require_object_get_own_property_descriptor().f;
    var macrotask = require_task().set;
    var IS_IOS = require_engine_is_ios();
    var IS_IOS_PEBBLE = require_engine_is_ios_pebble();
    var IS_WEBOS_WEBKIT = require_engine_is_webos_webkit();
    var IS_NODE2 = require_engine_is_node();
    var MutationObserver = global8.MutationObserver || global8.WebKitMutationObserver;
    var document3 = global8.document;
    var process2 = global8.process;
    var Promise2 = global8.Promise;
    var queueMicrotaskDescriptor = getOwnPropertyDescriptor2(global8, "queueMicrotask");
    var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
    var flush;
    var head;
    var last;
    var notify2;
    var toggle;
    var node;
    var promise;
    var then;
    if (!queueMicrotask) {
      flush = function() {
        var parent, fn;
        if (IS_NODE2 && (parent = process2.domain))
          parent.exit();
        while (head) {
          fn = head.fn;
          head = head.next;
          try {
            fn();
          } catch (error) {
            if (head)
              notify2();
            else
              last = void 0;
            throw error;
          }
        }
        last = void 0;
        if (parent)
          parent.enter();
      };
      if (!IS_IOS && !IS_NODE2 && !IS_WEBOS_WEBKIT && MutationObserver && document3) {
        toggle = true;
        node = document3.createTextNode("");
        new MutationObserver(flush).observe(node, { characterData: true });
        notify2 = function() {
          node.data = toggle = !toggle;
        };
      } else if (!IS_IOS_PEBBLE && Promise2 && Promise2.resolve) {
        promise = Promise2.resolve(void 0);
        promise.constructor = Promise2;
        then = promise.then;
        notify2 = function() {
          then.call(promise, flush);
        };
      } else if (IS_NODE2) {
        notify2 = function() {
          process2.nextTick(flush);
        };
      } else {
        notify2 = function() {
          macrotask.call(global8, flush);
        };
      }
    }
    module.exports = queueMicrotask || function(fn) {
      var task2 = { fn, next: void 0 };
      if (last)
        last.next = task2;
      if (!head) {
        head = task2;
        notify2();
      }
      last = task2;
    };
  }
});

// node_modules/core-js/internals/new-promise-capability.js
var require_new_promise_capability = __commonJS({
  "node_modules/core-js/internals/new-promise-capability.js"(exports, module) {
    "use strict";
    var aFunction4 = require_a_function();
    var PromiseCapability = function(C2) {
      var resolve2, reject2;
      this.promise = new C2(function($$resolve, $$reject) {
        if (resolve2 !== void 0 || reject2 !== void 0)
          throw TypeError("Bad Promise constructor");
        resolve2 = $$resolve;
        reject2 = $$reject;
      });
      this.resolve = aFunction4(resolve2);
      this.reject = aFunction4(reject2);
    };
    module.exports.f = function(C2) {
      return new PromiseCapability(C2);
    };
  }
});

// node_modules/core-js/internals/promise-resolve.js
var require_promise_resolve = __commonJS({
  "node_modules/core-js/internals/promise-resolve.js"(exports, module) {
    var anObject4 = require_an_object();
    var isObject7 = require_is_object();
    var newPromiseCapability2 = require_new_promise_capability();
    module.exports = function(C2, x2) {
      anObject4(C2);
      if (isObject7(x2) && x2.constructor === C2)
        return x2;
      var promiseCapability = newPromiseCapability2.f(C2);
      var resolve2 = promiseCapability.resolve;
      resolve2(x2);
      return promiseCapability.promise;
    };
  }
});

// node_modules/core-js/internals/host-report-errors.js
var require_host_report_errors = __commonJS({
  "node_modules/core-js/internals/host-report-errors.js"(exports, module) {
    var global8 = require_global();
    module.exports = function(a2, b2) {
      var console = global8.console;
      if (console && console.error) {
        arguments.length === 1 ? console.error(a2) : console.error(a2, b2);
      }
    };
  }
});

// node_modules/core-js/internals/perform.js
var require_perform = __commonJS({
  "node_modules/core-js/internals/perform.js"(exports, module) {
    module.exports = function(exec) {
      try {
        return { error: false, value: exec() };
      } catch (error) {
        return { error: true, value: error };
      }
    };
  }
});

// node_modules/core-js/internals/engine-is-browser.js
var require_engine_is_browser = __commonJS({
  "node_modules/core-js/internals/engine-is-browser.js"(exports, module) {
    module.exports = typeof window == "object";
  }
});

// node_modules/core-js/modules/es.function.bind.js
var $ = require_export();
var bind = require_function_bind();
$({ target: "Function", proto: true }, {
  bind
});

// node_modules/core-js/modules/es.array.concat.js
"use strict";
var $2 = require_export();
var fails = require_fails();
var isArray = require_is_array();
var isObject = require_is_object();
var toObject = require_to_object();
var toLength = require_to_length();
var createProperty = require_create_property();
var arraySpeciesCreate = require_array_species_create();
var arrayMethodHasSpeciesSupport = require_array_method_has_species_support();
var wellKnownSymbol = require_well_known_symbol();
var V8_VERSION = require_engine_v8_version();
var IS_CONCAT_SPREADABLE = wellKnownSymbol("isConcatSpreadable");
var MAX_SAFE_INTEGER = 9007199254740991;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = "Maximum allowed index exceeded";
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function() {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("concat");
var isConcatSpreadable = function(O2) {
  if (!isObject(O2))
    return false;
  var spreadable = O2[IS_CONCAT_SPREADABLE];
  return spreadable !== void 0 ? !!spreadable : isArray(O2);
};
var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
$2({ target: "Array", proto: true, forced: FORCED }, {
  concat: function concat(arg) {
    var O2 = toObject(this);
    var A = arraySpeciesCreate(O2, 0);
    var n2 = 0;
    var i3, k2, length, len, E;
    for (i3 = -1, length = arguments.length; i3 < length; i3++) {
      E = i3 === -1 ? O2 : arguments[i3];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n2 + len > MAX_SAFE_INTEGER)
          throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k2 = 0; k2 < len; k2++, n2++)
          if (k2 in E)
            createProperty(A, n2, E[k2]);
      } else {
        if (n2 >= MAX_SAFE_INTEGER)
          throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n2++, E);
      }
    }
    A.length = n2;
    return A;
  }
});

// node_modules/core-js/modules/es.function.name.js
var DESCRIPTORS = require_descriptors();
var defineProperty = require_object_define_property().f;
var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = "name";
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

// node_modules/core-js/modules/es.array.for-each.js
"use strict";
var $3 = require_export();
var forEach = require_array_for_each();
$3({ target: "Array", proto: true, forced: [].forEach != forEach }, {
  forEach
});

// node_modules/core-js/modules/web.dom-collections.for-each.js
var global2 = require_global();
var DOMIterables = require_dom_iterables();
var forEach2 = require_array_for_each();
var createNonEnumerableProperty = require_create_non_enumerable_property();
for (COLLECTION_NAME in DOMIterables) {
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
var COLLECTION_NAME;

// node_modules/core-js/modules/es.array.map.js
"use strict";
var $4 = require_export();
var $map = require_array_iteration().map;
var arrayMethodHasSpeciesSupport2 = require_array_method_has_species_support();
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport2("map");
$4({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});

// node_modules/core-js/modules/es.object.set-prototype-of.js
var $5 = require_export();
var setPrototypeOf = require_object_set_prototype_of();
$5({ target: "Object", stat: true }, {
  setPrototypeOf
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

// node_modules/core-js/modules/es.reflect.construct.js
var $7 = require_export();
var getBuiltIn = require_get_built_in();
var aFunction = require_a_function();
var anObject = require_an_object();
var isObject2 = require_is_object();
var create = require_object_create();
var bind2 = require_function_bind();
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
var FORCED2 = NEW_TARGET_BUG || ARGS_BUG;
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

// node_modules/core-js/modules/es.object.create.js
var $8 = require_export();
var DESCRIPTORS2 = require_descriptors();
var create2 = require_object_create();
$8({ target: "Object", stat: true, sham: !DESCRIPTORS2 }, {
  create: create2
});

// node_modules/core-js/modules/es.object.define-property.js
var $9 = require_export();
var DESCRIPTORS3 = require_descriptors();
var objectDefinePropertyModile = require_object_define_property();
$9({ target: "Object", stat: true, forced: !DESCRIPTORS3, sham: !DESCRIPTORS3 }, {
  defineProperty: objectDefinePropertyModile.f
});

// node_modules/core-js/modules/es.symbol.js
"use strict";
var $10 = require_export();
var global3 = require_global();
var getBuiltIn2 = require_get_built_in();
var IS_PURE = require_is_pure();
var DESCRIPTORS4 = require_descriptors();
var NATIVE_SYMBOL = require_native_symbol();
var fails4 = require_fails();
var has = require_has();
var isArray2 = require_is_array();
var isObject3 = require_is_object();
var isSymbol = require_is_symbol();
var anObject2 = require_an_object();
var toObject3 = require_to_object();
var toIndexedObject = require_to_indexed_object();
var toPropertyKey = require_to_property_key();
var $toString = require_to_string();
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
var redefine = require_redefine();
var shared = require_shared();
var sharedKey = require_shared_key();
var hiddenKeys = require_hidden_keys();
var uid = require_uid();
var wellKnownSymbol2 = require_well_known_symbol();
var wrappedWellKnownSymbolModule = require_well_known_symbol_wrapped();
var defineWellKnownSymbol = require_define_well_known_symbol();
var setToStringTag = require_set_to_string_tag();
var InternalStateModule = require_internal_state();
var $forEach = require_array_iteration().forEach;
var HIDDEN = sharedKey("hidden");
var SYMBOL = "Symbol";
var PROTOTYPE = "prototype";
var TO_PRIMITIVE = wellKnownSymbol2("toPrimitive");
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
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
var setSymbolDescriptor = DESCRIPTORS4 && fails4(function() {
  return nativeObjectCreate(nativeDefineProperty({}, "a", {
    get: function() {
      return nativeDefineProperty(this, "a", { value: 7 }).a;
    }
  })).a != 7;
}) ? function(O2, P2, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P2);
  if (ObjectPrototypeDescriptor)
    delete ObjectPrototype[P2];
  nativeDefineProperty(O2, P2, Attributes);
  if (ObjectPrototypeDescriptor && O2 !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P2, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;
var wrap = function(tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag,
    description
  });
  if (!DESCRIPTORS4)
    symbol.description = description;
  return symbol;
};
var $defineProperty = function defineProperty2(O2, P2, Attributes) {
  if (O2 === ObjectPrototype)
    $defineProperty(ObjectPrototypeSymbols, P2, Attributes);
  anObject2(O2);
  var key = toPropertyKey(P2);
  anObject2(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O2, HIDDEN))
        nativeDefineProperty(O2, HIDDEN, createPropertyDescriptor(1, {}));
      O2[HIDDEN][key] = true;
    } else {
      if (has(O2, HIDDEN) && O2[HIDDEN][key])
        O2[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    }
    return setSymbolDescriptor(O2, key, Attributes);
  }
  return nativeDefineProperty(O2, key, Attributes);
};
var $defineProperties = function defineProperties(O2, Properties) {
  anObject2(O2);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function(key) {
    if (!DESCRIPTORS4 || $propertyIsEnumerable.call(properties, key))
      $defineProperty(O2, key, properties[key]);
  });
  return O2;
};
var $create = function create3(O2, Properties) {
  return Properties === void 0 ? nativeObjectCreate(O2) : $defineProperties(nativeObjectCreate(O2), Properties);
};
var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P2 = toPropertyKey(V);
  var enumerable = nativePropertyIsEnumerable.call(this, P2);
  if (this === ObjectPrototype && has(AllSymbols, P2) && !has(ObjectPrototypeSymbols, P2))
    return false;
  return enumerable || !has(this, P2) || !has(AllSymbols, P2) || has(this, HIDDEN) && this[HIDDEN][P2] ? enumerable : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O2, P2) {
  var it = toIndexedObject(O2);
  var key = toPropertyKey(P2);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key))
    return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};
var $getOwnPropertyNames = function getOwnPropertyNames(O2) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O2));
  var result = [];
  $forEach(names, function(key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key))
      result.push(key);
  });
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(O2) {
  var IS_OBJECT_PROTOTYPE = O2 === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O2));
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
    var description = !arguments.length || arguments[0] === void 0 ? void 0 : $toString(arguments[0]);
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
  redefine($Symbol[PROTOTYPE], "toString", function toString5() {
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
    var string = $toString(key);
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
var FORCED_JSON_STRINGIFY;
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty2($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;

// node_modules/core-js/modules/es.symbol.description.js
"use strict";
var $11 = require_export();
var DESCRIPTORS5 = require_descriptors();
var global4 = require_global();
var has2 = require_has();
var isObject4 = require_is_object();
var defineProperty3 = require_object_define_property().f;
var copyConstructorProperties = require_copy_constructor_properties();
var NativeSymbol = global4.Symbol;
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
var EmptyStringDescriptionStore;
var SymbolWrapper;
var symbolPrototype;
var symbolToString;
var native;
var regexp;

// node_modules/core-js/modules/es.object.to-string.js
var TO_STRING_TAG_SUPPORT = require_to_string_tag_support();
var redefine2 = require_redefine();
var toString = require_object_to_string();
if (!TO_STRING_TAG_SUPPORT) {
  redefine2(Object.prototype, "toString", toString, { unsafe: true });
}

// node_modules/core-js/modules/es.symbol.iterator.js
var defineWellKnownSymbol2 = require_define_well_known_symbol();
defineWellKnownSymbol2("iterator");

// src/index.js
var import_es_array_iterator = __toModule(require_es_array_iterator());

// node_modules/core-js/modules/es.string.iterator.js
"use strict";
var charAt = require_string_multibyte().charAt;
var toString2 = require_to_string();
var InternalStateModule2 = require_internal_state();
var defineIterator = require_define_iterator();
var STRING_ITERATOR = "String Iterator";
var setInternalState2 = InternalStateModule2.set;
var getInternalState2 = InternalStateModule2.getterFor(STRING_ITERATOR);
defineIterator(String, "String", function(iterated) {
  setInternalState2(this, {
    type: STRING_ITERATOR,
    string: toString2(iterated),
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

// node_modules/core-js/modules/web.dom-collections.iterator.js
var global5 = require_global();
var DOMIterables2 = require_dom_iterables();
var ArrayIteratorMethods = require_es_array_iterator();
var createNonEnumerableProperty3 = require_create_non_enumerable_property();
var wellKnownSymbol3 = require_well_known_symbol();
var ITERATOR = wellKnownSymbol3("iterator");
var TO_STRING_TAG = wellKnownSymbol3("toStringTag");
var ArrayValues = ArrayIteratorMethods.values;
for (COLLECTION_NAME in DOMIterables2) {
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
var Collection;
var CollectionPrototype;
var METHOD_NAME;
var COLLECTION_NAME;

// node_modules/core-js/modules/es.array.index-of.js
"use strict";
var $12 = require_export();
var $indexOf = require_array_includes().indexOf;
var arrayMethodIsStrict = require_array_method_is_strict();
var nativeIndexOf = [].indexOf;
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict("indexOf");
$12({ target: "Array", proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
  indexOf: function indexOf(searchElement) {
    return NEGATIVE_ZERO ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : void 0);
  }
});

// node_modules/core-js/modules/es.array.sort.js
"use strict";
var $13 = require_export();
var aFunction2 = require_a_function();
var toObject4 = require_to_object();
var toLength2 = require_to_length();
var toString3 = require_to_string();
var fails5 = require_fails();
var internalSort = require_array_sort();
var arrayMethodIsStrict2 = require_array_method_is_strict();
var FF = require_engine_ff_version();
var IE_OR_EDGE = require_engine_is_ie_or_edge();
var V8 = require_engine_v8_version();
var WEBKIT = require_engine_webkit_version();
var test = [];
var nativeSort = test.sort;
var FAILS_ON_UNDEFINED = fails5(function() {
  test.sort(void 0);
});
var FAILS_ON_NULL = fails5(function() {
  test.sort(null);
});
var STRICT_METHOD2 = arrayMethodIsStrict2("sort");
var STABLE_SORT = !fails5(function() {
  if (V8)
    return V8 < 70;
  if (FF && FF > 3)
    return;
  if (IE_OR_EDGE)
    return true;
  if (WEBKIT)
    return WEBKIT < 603;
  var result = "";
  var code, chr, value, index;
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);
    switch (code) {
      case 66:
      case 69:
      case 70:
      case 72:
        value = 3;
        break;
      case 68:
      case 71:
        value = 4;
        break;
      default:
        value = 2;
    }
    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }
  test.sort(function(a2, b2) {
    return b2.v - a2.v;
  });
  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr)
      result += chr;
  }
  return result !== "DGBEFHACIJK";
});
var FORCED3 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD2 || !STABLE_SORT;
var getSortCompare = function(comparefn) {
  return function(x2, y2) {
    if (y2 === void 0)
      return -1;
    if (x2 === void 0)
      return 1;
    if (comparefn !== void 0)
      return +comparefn(x2, y2) || 0;
    return toString3(x2) > toString3(y2) ? 1 : -1;
  };
};
$13({ target: "Array", proto: true, forced: FORCED3 }, {
  sort: function sort(comparefn) {
    if (comparefn !== void 0)
      aFunction2(comparefn);
    var array = toObject4(this);
    if (STABLE_SORT)
      return comparefn === void 0 ? nativeSort.call(array) : nativeSort.call(array, comparefn);
    var items = [];
    var arrayLength = toLength2(array.length);
    var itemsLength, index;
    for (index = 0; index < arrayLength; index++) {
      if (index in array)
        items.push(array[index]);
    }
    items = internalSort(items, getSortCompare(comparefn));
    itemsLength = items.length;
    index = 0;
    while (index < itemsLength)
      array[index] = items[index++];
    while (index < arrayLength)
      delete array[index++];
    return array;
  }
});

// node_modules/core-js/modules/es.array.some.js
"use strict";
var $14 = require_export();
var $some = require_array_iteration().some;
var arrayMethodIsStrict3 = require_array_method_is_strict();
var STRICT_METHOD3 = arrayMethodIsStrict3("some");
$14({ target: "Array", proto: true, forced: !STRICT_METHOD3 }, {
  some: function some(callbackfn) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});

// node_modules/core-js/modules/es.array.is-array.js
var $15 = require_export();
var isArray3 = require_is_array();
$15({ target: "Array", stat: true }, {
  isArray: isArray3
});

// node_modules/preact/dist/preact.module.js
var import_es_regexp_exec = __toModule(require_es_regexp_exec());

// node_modules/core-js/modules/es.string.replace.js
"use strict";
var fixRegExpWellKnownSymbolLogic = require_fix_regexp_well_known_symbol_logic();
var fails6 = require_fails();
var anObject3 = require_an_object();
var toInteger = require_to_integer();
var toLength3 = require_to_length();
var toString4 = require_to_string();
var requireObjectCoercible = require_require_object_coercible();
var advanceStringIndex = require_advance_string_index();
var getSubstitution = require_get_substitution();
var regExpExec = require_regexp_exec_abstract();
var wellKnownSymbol4 = require_well_known_symbol();
var REPLACE = wellKnownSymbol4("replace");
var max = Math.max;
var min = Math.min;
var maybeToString = function(it) {
  return it === void 0 ? it : String(it);
};
var REPLACE_KEEPS_$0 = function() {
  return "a".replace(/./, "$0") === "$0";
}();
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
  if (/./[REPLACE]) {
    return /./[REPLACE]("a", "$0") === "";
  }
  return false;
}();
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails6(function() {
  var re = /./;
  re.exec = function() {
    var result = [];
    result.groups = { a: "7" };
    return result;
  };
  return "".replace(re, "$<a>") !== "7";
});
fixRegExpWellKnownSymbolLogic("replace", function(_2, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
  return [
    function replace(searchValue, replaceValue) {
      var O2 = requireObjectCoercible(this);
      var replacer = searchValue == void 0 ? void 0 : searchValue[REPLACE];
      return replacer !== void 0 ? replacer.call(searchValue, O2, replaceValue) : nativeReplace.call(toString4(O2), searchValue, replaceValue);
    },
    function(string, replaceValue) {
      var rx = anObject3(this);
      var S = toString4(string);
      if (typeof replaceValue === "string" && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 && replaceValue.indexOf("$<") === -1) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done)
          return res.value;
      }
      var functionalReplace = typeof replaceValue === "function";
      if (!functionalReplace)
        replaceValue = toString4(replaceValue);
      var global8 = rx.global;
      if (global8) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null)
          break;
        results.push(result);
        if (!global8)
          break;
        var matchStr = toString4(result[0]);
        if (matchStr === "")
          rx.lastIndex = advanceStringIndex(S, toLength3(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = "";
      var nextSourcePosition = 0;
      for (var i3 = 0; i3 < results.length; i3++) {
        result = results[i3];
        var matched = toString4(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        for (var j2 = 1; j2 < result.length; j2++)
          captures.push(maybeToString(result[j2]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== void 0)
            replacerArgs.push(namedCaptures);
          var replacement = toString4(replaceValue.apply(void 0, replacerArgs));
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

// node_modules/core-js/modules/es.array.slice.js
"use strict";
var $16 = require_export();
var isObject5 = require_is_object();
var isArray4 = require_is_array();
var toAbsoluteIndex = require_to_absolute_index();
var toLength4 = require_to_length();
var toIndexedObject2 = require_to_indexed_object();
var createProperty2 = require_create_property();
var wellKnownSymbol5 = require_well_known_symbol();
var arrayMethodHasSpeciesSupport3 = require_array_method_has_species_support();
var HAS_SPECIES_SUPPORT2 = arrayMethodHasSpeciesSupport3("slice");
var SPECIES = wellKnownSymbol5("species");
var nativeSlice = [].slice;
var max2 = Math.max;
$16({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT2 }, {
  slice: function slice(start, end) {
    var O2 = toIndexedObject2(this);
    var length = toLength4(O2.length);
    var k2 = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === void 0 ? length : end, length);
    var Constructor, result, n2;
    if (isArray4(O2)) {
      Constructor = O2.constructor;
      if (typeof Constructor == "function" && (Constructor === Array || isArray4(Constructor.prototype))) {
        Constructor = void 0;
      } else if (isObject5(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null)
          Constructor = void 0;
      }
      if (Constructor === Array || Constructor === void 0) {
        return nativeSlice.call(O2, k2, fin);
      }
    }
    result = new (Constructor === void 0 ? Array : Constructor)(max2(fin - k2, 0));
    for (n2 = 0; k2 < fin; k2++, n2++)
      if (k2 in O2)
        createProperty2(result, n2, O2[k2]);
    result.length = n2;
    return result;
  }
});

// node_modules/core-js/modules/es.string.sub.js
"use strict";
var $17 = require_export();
var createHTML = require_create_html();
var forcedStringHTMLMethod = require_string_html_forced();
$17({ target: "String", proto: true, forced: forcedStringHTMLMethod("sub") }, {
  sub: function sub() {
    return createHTML(this, "sub", "", "");
  }
});

// node_modules/core-js/modules/es.array.splice.js
"use strict";
var $18 = require_export();
var toAbsoluteIndex2 = require_to_absolute_index();
var toInteger2 = require_to_integer();
var toLength5 = require_to_length();
var toObject5 = require_to_object();
var arraySpeciesCreate2 = require_array_species_create();
var createProperty3 = require_create_property();
var arrayMethodHasSpeciesSupport4 = require_array_method_has_species_support();
var HAS_SPECIES_SUPPORT3 = arrayMethodHasSpeciesSupport4("splice");
var max3 = Math.max;
var min2 = Math.min;
var MAX_SAFE_INTEGER2 = 9007199254740991;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = "Maximum allowed length exceeded";
$18({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT3 }, {
  splice: function splice(start, deleteCount) {
    var O2 = toObject5(this);
    var len = toLength5(O2.length);
    var actualStart = toAbsoluteIndex2(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k2, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min2(max3(toInteger2(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER2) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate2(O2, actualDeleteCount);
    for (k2 = 0; k2 < actualDeleteCount; k2++) {
      from = actualStart + k2;
      if (from in O2)
        createProperty3(A, k2, O2[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k2 = actualStart; k2 < len - actualDeleteCount; k2++) {
        from = k2 + actualDeleteCount;
        to = k2 + insertCount;
        if (from in O2)
          O2[to] = O2[from];
        else
          delete O2[to];
      }
      for (k2 = len; k2 > len - actualDeleteCount + insertCount; k2--)
        delete O2[k2 - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k2 = len - actualDeleteCount; k2 > actualStart; k2--) {
        from = k2 + actualDeleteCount - 1;
        to = k2 + insertCount - 1;
        if (from in O2)
          O2[to] = O2[from];
        else
          delete O2[to];
      }
    }
    for (k2 = 0; k2 < insertCount; k2++) {
      O2[k2 + actualStart] = arguments[k2 + 2];
    }
    O2.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

// node_modules/core-js/modules/es.promise.js
"use strict";
var $19 = require_export();
var IS_PURE2 = require_is_pure();
var global6 = require_global();
var getBuiltIn3 = require_get_built_in();
var NativePromise = require_native_promise_constructor();
var redefine3 = require_redefine();
var redefineAll = require_redefine_all();
var setPrototypeOf2 = require_object_set_prototype_of();
var setToStringTag2 = require_set_to_string_tag();
var setSpecies = require_set_species();
var isObject6 = require_is_object();
var aFunction3 = require_a_function();
var anInstance = require_an_instance();
var inspectSource = require_inspect_source();
var iterate = require_iterate();
var checkCorrectnessOfIteration = require_check_correctness_of_iteration();
var speciesConstructor = require_species_constructor();
var task = require_task().set;
var microtask = require_microtask();
var promiseResolve = require_promise_resolve();
var hostReportErrors = require_host_report_errors();
var newPromiseCapabilityModule = require_new_promise_capability();
var perform = require_perform();
var InternalStateModule3 = require_internal_state();
var isForced = require_is_forced();
var wellKnownSymbol6 = require_well_known_symbol();
var IS_BROWSER = require_engine_is_browser();
var IS_NODE = require_engine_is_node();
var V8_VERSION2 = require_engine_v8_version();
var SPECIES2 = wellKnownSymbol6("species");
var PROMISE = "Promise";
var getInternalState3 = InternalStateModule3.get;
var setInternalState3 = InternalStateModule3.set;
var getInternalPromiseState = InternalStateModule3.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError2 = global6.TypeError;
var document2 = global6.document;
var process = global6.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document2 && document2.createEvent && global6.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == "function";
var UNHANDLED_REJECTION = "unhandledrejection";
var REJECTION_HANDLED = "rejectionhandled";
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal;
var OwnPromiseCapability;
var PromiseWrapper;
var nativeThen;
var FORCED4 = isForced(PROMISE, function() {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION2 === 66)
    return true;
  if (IS_PURE2 && !PromiseConstructorPrototype["finally"])
    return true;
  if (V8_VERSION2 >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE))
    return false;
  var promise = new PromiseConstructor(function(resolve2) {
    resolve2(1);
  });
  var FakePromise = function(exec) {
    exec(function() {
    }, function() {
    });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES2] = FakePromise;
  SUBCLASSING = promise.then(function() {
  }) instanceof FakePromise;
  if (!SUBCLASSING)
    return true;
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});
var INCORRECT_ITERATION = FORCED4 || !checkCorrectnessOfIteration(function(iterable) {
  PromiseConstructor.all(iterable)["catch"](function() {
  });
});
var isThenable = function(it) {
  var then;
  return isObject6(it) && typeof (then = it.then) == "function" ? then : false;
};
var notify = function(state, isReject) {
  if (state.notified)
    return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function() {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve2 = reaction.resolve;
      var reject2 = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED)
              onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true)
            result = value;
          else {
            if (domain)
              domain.enter();
            result = handler(value);
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject2(TypeError2("Promise-chain cycle"));
          } else if (then = isThenable(result)) {
            then.call(result, resolve2, reject2);
          } else
            resolve2(result);
        } else
          reject2(value);
      } catch (error) {
        if (domain && !exited)
          domain.exit();
        reject2(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection)
      onUnhandled(state);
  });
};
var dispatchEvent = function(name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document2.createEvent("Event");
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global6.dispatchEvent(event);
  } else
    event = { promise, reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global6["on" + name]))
    handler(event);
  else if (name === UNHANDLED_REJECTION)
    hostReportErrors("Unhandled promise rejection", reason);
};
var onUnhandled = function(state) {
  task.call(global6, function() {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function() {
        if (IS_NODE) {
          process.emit("unhandledRejection", value, promise);
        } else
          dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error)
        throw result.value;
    }
  });
};
var isUnhandled = function(state) {
  return state.rejection !== HANDLED && !state.parent;
};
var onHandleUnhandled = function(state) {
  task.call(global6, function() {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit("rejectionHandled", promise);
    } else
      dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};
var bind3 = function(fn, state, unwrap) {
  return function(value) {
    fn(state, value, unwrap);
  };
};
var internalReject = function(state, value, unwrap) {
  if (state.done)
    return;
  state.done = true;
  if (unwrap)
    state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};
var internalResolve = function(state, value, unwrap) {
  if (state.done)
    return;
  state.done = true;
  if (unwrap)
    state = unwrap;
  try {
    if (state.facade === value)
      throw TypeError2("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function() {
        var wrapper = { done: false };
        try {
          then.call(value, bind3(internalResolve, wrapper, state), bind3(internalReject, wrapper, state));
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};
if (FORCED4) {
  PromiseConstructor = function Promise2(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction3(executor);
    Internal.call(this);
    var state = getInternalState3(this);
    try {
      executor(bind3(internalResolve, state), bind3(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  Internal = function Promise2(executor) {
    setInternalState3(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: void 0
    });
  };
  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == "function" ? onFulfilled : true;
      reaction.fail = typeof onRejected == "function" && onRejected;
      reaction.domain = IS_NODE ? process.domain : void 0;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING)
        notify(state, false);
      return reaction.promise;
    },
    "catch": function(onRejected) {
      return this.then(void 0, onRejected);
    }
  });
  OwnPromiseCapability = function() {
    var promise = new Internal();
    var state = getInternalState3(promise);
    this.promise = promise;
    this.resolve = bind3(internalResolve, state);
    this.reject = bind3(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function(C2) {
    return C2 === PromiseConstructor || C2 === PromiseWrapper ? new OwnPromiseCapability(C2) : newGenericPromiseCapability(C2);
  };
  if (!IS_PURE2 && typeof NativePromise == "function" && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;
    if (!SUBCLASSING) {
      redefine3(NativePromisePrototype, "then", function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function(resolve2, reject2) {
          nativeThen.call(that, resolve2, reject2);
        }).then(onFulfilled, onRejected);
      }, { unsafe: true });
      redefine3(NativePromisePrototype, "catch", PromiseConstructorPrototype["catch"], { unsafe: true });
    }
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) {
    }
    if (setPrototypeOf2) {
      setPrototypeOf2(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}
$19({ global: true, wrap: true, forced: FORCED4 }, {
  Promise: PromiseConstructor
});
setToStringTag2(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);
PromiseWrapper = getBuiltIn3(PROMISE);
$19({ target: PROMISE, stat: true, forced: FORCED4 }, {
  reject: function reject(r2) {
    var capability = newPromiseCapability(this);
    capability.reject.call(void 0, r2);
    return capability.promise;
  }
});
$19({ target: PROMISE, stat: true, forced: IS_PURE2 || FORCED4 }, {
  resolve: function resolve(x2) {
    return promiseResolve(IS_PURE2 && this === PromiseWrapper ? PromiseConstructor : this, x2);
  }
});
$19({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  all: function all(iterable) {
    var C2 = this;
    var capability = newPromiseCapability(C2);
    var resolve2 = capability.resolve;
    var reject2 = capability.reject;
    var result = perform(function() {
      var $promiseResolve = aFunction3(C2.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function(promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(void 0);
        remaining++;
        $promiseResolve.call(C2, promise).then(function(value) {
          if (alreadyCalled)
            return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve2(values);
        }, reject2);
      });
      --remaining || resolve2(values);
    });
    if (result.error)
      reject2(result.value);
    return capability.promise;
  },
  race: function race(iterable) {
    var C2 = this;
    var capability = newPromiseCapability(C2);
    var reject2 = capability.reject;
    var result = perform(function() {
      var $promiseResolve = aFunction3(C2.resolve);
      iterate(iterable, function(promise) {
        $promiseResolve.call(C2, promise).then(capability.resolve, reject2);
      });
    });
    if (result.error)
      reject2(result.value);
    return capability.promise;
  }
});

// node_modules/core-js/modules/web.timers.js
var $20 = require_export();
var global7 = require_global();
var userAgent = require_engine_user_agent();
var slice2 = [].slice;
var MSIE = /MSIE .\./.test(userAgent);
var wrap2 = function(scheduler) {
  return function(handler, timeout) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice2.call(arguments, 2) : void 0;
    return scheduler(boundArgs ? function() {
      (typeof handler == "function" ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};
$20({ global: true, bind: true, forced: MSIE }, {
  setTimeout: wrap2(global7.setTimeout),
  setInterval: wrap2(global7.setInterval)
});

// node_modules/preact/dist/preact.module.js
var n;
var l;
var u;
var i;
var t;
var o;
var r;
var f;
var e = {};
var c = [];
var s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function a(n2, l2) {
  for (var u2 in l2) {
    n2[u2] = l2[u2];
  }
  return n2;
}
function h(n2) {
  var l2 = n2.parentNode;
  l2 && l2.removeChild(n2);
}
function y(n2, i3, t2, o2, r2) {
  var f2 = {
    type: n2,
    props: i3,
    key: t2,
    ref: o2,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: r2 == null ? ++u : r2
  };
  return l.vnode != null && l.vnode(f2), f2;
}
function d(n2) {
  return n2.children;
}
function _(n2, l2) {
  this.props = n2, this.context = l2;
}
function k(n2, l2) {
  if (l2 == null)
    return n2.__ ? k(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
  for (var u2; l2 < n2.__k.length; l2++) {
    if ((u2 = n2.__k[l2]) != null && u2.__e != null)
      return u2.__e;
  }
  return typeof n2.type == "function" ? k(n2) : null;
}
function b(n2) {
  var l2, u2;
  if ((n2 = n2.__) != null && n2.__c != null) {
    for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++) {
      if ((u2 = n2.__k[l2]) != null && u2.__e != null) {
        n2.__e = n2.__c.base = u2.__e;
        break;
      }
    }
    return b(n2);
  }
}
function m(n2) {
  (!n2.__d && (n2.__d = true) && t.push(n2) && !g.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(g);
}
function g() {
  for (var n2; g.__r = t.length; ) {
    n2 = t.sort(function(n3, l2) {
      return n3.__v.__b - l2.__v.__b;
    }), t = [], n2.some(function(n3) {
      var l2, u2, i3, t2, o2, r2;
      n3.__d && (o2 = (t2 = (l2 = n3).__v).__e, (r2 = l2.__P) && (u2 = [], (i3 = a({}, t2)).__v = t2.__v + 1, j(r2, t2, i3, l2.__n, r2.ownerSVGElement !== void 0, t2.__h != null ? [o2] : null, u2, o2 == null ? k(t2) : o2, t2.__h), z(u2, t2), t2.__e != o2 && b(t2)));
    });
  }
}
function w(n2, l2, u2, i3, t2, o2, r2, f2, s2, a2) {
  var h2, v, p, _2, b2, m2, g2, w2 = i3 && i3.__k || c, A = w2.length;
  for (u2.__k = [], h2 = 0; h2 < l2.length; h2++) {
    if ((_2 = u2.__k[h2] = (_2 = l2[h2]) == null || typeof _2 == "boolean" ? null : typeof _2 == "string" || typeof _2 == "number" || typeof _2 == "bigint" ? y(null, _2, null, null, _2) : Array.isArray(_2) ? y(d, {
      children: _2
    }, null, null, null) : _2.__b > 0 ? y(_2.type, _2.props, _2.key, null, _2.__v) : _2) != null) {
      if (_2.__ = u2, _2.__b = u2.__b + 1, (p = w2[h2]) === null || p && _2.key == p.key && _2.type === p.type)
        w2[h2] = void 0;
      else
        for (v = 0; v < A; v++) {
          if ((p = w2[v]) && _2.key == p.key && _2.type === p.type) {
            w2[v] = void 0;
            break;
          }
          p = null;
        }
      j(n2, _2, p = p || e, t2, o2, r2, f2, s2, a2), b2 = _2.__e, (v = _2.ref) && p.ref != v && (g2 || (g2 = []), p.ref && g2.push(p.ref, null, _2), g2.push(v, _2.__c || b2, _2)), b2 != null ? (m2 == null && (m2 = b2), typeof _2.type == "function" && _2.__k != null && _2.__k === p.__k ? _2.__d = s2 = x(_2, s2, n2) : s2 = P(n2, _2, p, w2, b2, s2), a2 || u2.type !== "option" ? typeof u2.type == "function" && (u2.__d = s2) : n2.value = "") : s2 && p.__e == s2 && s2.parentNode != n2 && (s2 = k(p));
    }
  }
  for (u2.__e = m2, h2 = A; h2--; ) {
    w2[h2] != null && (typeof u2.type == "function" && w2[h2].__e != null && w2[h2].__e == u2.__d && (u2.__d = k(i3, h2 + 1)), N(w2[h2], w2[h2]));
  }
  if (g2)
    for (h2 = 0; h2 < g2.length; h2++) {
      M(g2[h2], g2[++h2], g2[++h2]);
    }
}
function x(n2, l2, u2) {
  var i3, t2;
  for (i3 = 0; i3 < n2.__k.length; i3++) {
    (t2 = n2.__k[i3]) && (t2.__ = n2, l2 = typeof t2.type == "function" ? x(t2, l2, u2) : P(u2, t2, t2, n2.__k, t2.__e, l2));
  }
  return l2;
}
function P(n2, l2, u2, i3, t2, o2) {
  var r2, f2, e2;
  if (l2.__d !== void 0)
    r2 = l2.__d, l2.__d = void 0;
  else if (u2 == null || t2 != o2 || t2.parentNode == null)
    n:
      if (o2 == null || o2.parentNode !== n2)
        n2.appendChild(t2), r2 = null;
      else {
        for (f2 = o2, e2 = 0; (f2 = f2.nextSibling) && e2 < i3.length; e2 += 2) {
          if (f2 == t2)
            break n;
        }
        n2.insertBefore(t2, o2), r2 = o2;
      }
  return r2 !== void 0 ? r2 : t2.nextSibling;
}
function C(n2, l2, u2, i3, t2) {
  var o2;
  for (o2 in u2) {
    o2 === "children" || o2 === "key" || o2 in l2 || H(n2, o2, null, u2[o2], i3);
  }
  for (o2 in l2) {
    t2 && typeof l2[o2] != "function" || o2 === "children" || o2 === "key" || o2 === "value" || o2 === "checked" || u2[o2] === l2[o2] || H(n2, o2, l2[o2], u2[o2], i3);
  }
}
function $21(n2, l2, u2) {
  l2[0] === "-" ? n2.setProperty(l2, u2) : n2[l2] = u2 == null ? "" : typeof u2 != "number" || s.test(l2) ? u2 : u2 + "px";
}
function H(n2, l2, u2, i3, t2) {
  var o2;
  n:
    if (l2 === "style") {
      if (typeof u2 == "string")
        n2.style.cssText = u2;
      else {
        if (typeof i3 == "string" && (n2.style.cssText = i3 = ""), i3)
          for (l2 in i3) {
            u2 && l2 in u2 || $21(n2.style, l2, "");
          }
        if (u2)
          for (l2 in u2) {
            i3 && u2[l2] === i3[l2] || $21(n2.style, l2, u2[l2]);
          }
      }
    } else if (l2[0] === "o" && l2[1] === "n")
      o2 = l2 !== (l2 = l2.replace(/Capture$/, "")), l2 = l2.toLowerCase() in n2 ? l2.toLowerCase().slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + o2] = u2, u2 ? i3 || n2.addEventListener(l2, o2 ? T : I, o2) : n2.removeEventListener(l2, o2 ? T : I, o2);
    else if (l2 !== "dangerouslySetInnerHTML") {
      if (t2)
        l2 = l2.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
      else if (l2 !== "href" && l2 !== "list" && l2 !== "form" && l2 !== "tabIndex" && l2 !== "download" && l2 in n2)
        try {
          n2[l2] = u2 == null ? "" : u2;
          break n;
        } catch (n3) {
        }
      typeof u2 == "function" || (u2 != null && (u2 !== false || l2[0] === "a" && l2[1] === "r") ? n2.setAttribute(l2, u2) : n2.removeAttribute(l2));
    }
}
function I(n2) {
  this.l[n2.type + false](l.event ? l.event(n2) : n2);
}
function T(n2) {
  this.l[n2.type + true](l.event ? l.event(n2) : n2);
}
function j(n2, u2, i3, t2, o2, r2, f2, e2, c2) {
  var s2, h2, v, y2, p, k2, b2, m2, g2, x2, A, P2 = u2.type;
  if (u2.constructor !== void 0)
    return null;
  i3.__h != null && (c2 = i3.__h, e2 = u2.__e = i3.__e, u2.__h = null, r2 = [e2]), (s2 = l.__b) && s2(u2);
  try {
    n:
      if (typeof P2 == "function") {
        if (m2 = u2.props, g2 = (s2 = P2.contextType) && t2[s2.__c], x2 = s2 ? g2 ? g2.props.value : s2.__ : t2, i3.__c ? b2 = (h2 = u2.__c = i3.__c).__ = h2.__E : ("prototype" in P2 && P2.prototype.render ? u2.__c = h2 = new P2(m2, x2) : (u2.__c = h2 = new _(m2, x2), h2.constructor = P2, h2.render = O), g2 && g2.sub(h2), h2.props = m2, h2.state || (h2.state = {}), h2.context = x2, h2.__n = t2, v = h2.__d = true, h2.__h = []), h2.__s == null && (h2.__s = h2.state), P2.getDerivedStateFromProps != null && (h2.__s == h2.state && (h2.__s = a({}, h2.__s)), a(h2.__s, P2.getDerivedStateFromProps(m2, h2.__s))), y2 = h2.props, p = h2.state, v)
          P2.getDerivedStateFromProps == null && h2.componentWillMount != null && h2.componentWillMount(), h2.componentDidMount != null && h2.__h.push(h2.componentDidMount);
        else {
          if (P2.getDerivedStateFromProps == null && m2 !== y2 && h2.componentWillReceiveProps != null && h2.componentWillReceiveProps(m2, x2), !h2.__e && h2.shouldComponentUpdate != null && h2.shouldComponentUpdate(m2, h2.__s, x2) === false || u2.__v === i3.__v) {
            h2.props = m2, h2.state = h2.__s, u2.__v !== i3.__v && (h2.__d = false), h2.__v = u2, u2.__e = i3.__e, u2.__k = i3.__k, u2.__k.forEach(function(n3) {
              n3 && (n3.__ = u2);
            }), h2.__h.length && f2.push(h2);
            break n;
          }
          h2.componentWillUpdate != null && h2.componentWillUpdate(m2, h2.__s, x2), h2.componentDidUpdate != null && h2.__h.push(function() {
            h2.componentDidUpdate(y2, p, k2);
          });
        }
        h2.context = x2, h2.props = m2, h2.state = h2.__s, (s2 = l.__r) && s2(u2), h2.__d = false, h2.__v = u2, h2.__P = n2, s2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s, h2.getChildContext != null && (t2 = a(a({}, t2), h2.getChildContext())), v || h2.getSnapshotBeforeUpdate == null || (k2 = h2.getSnapshotBeforeUpdate(y2, p)), A = s2 != null && s2.type === d && s2.key == null ? s2.props.children : s2, w(n2, Array.isArray(A) ? A : [A], u2, i3, t2, o2, r2, f2, e2, c2), h2.base = u2.__e, u2.__h = null, h2.__h.length && f2.push(h2), b2 && (h2.__E = h2.__ = null), h2.__e = false;
      } else
        r2 == null && u2.__v === i3.__v ? (u2.__k = i3.__k, u2.__e = i3.__e) : u2.__e = L(i3.__e, u2, i3, t2, o2, r2, f2, c2);
    (s2 = l.diffed) && s2(u2);
  } catch (n3) {
    u2.__v = null, (c2 || r2 != null) && (u2.__e = e2, u2.__h = !!c2, r2[r2.indexOf(e2)] = null), l.__e(n3, u2, i3);
  }
}
function z(n2, u2) {
  l.__c && l.__c(u2, n2), n2.some(function(u3) {
    try {
      n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
        n3.call(u3);
      });
    } catch (n3) {
      l.__e(n3, u3.__v);
    }
  });
}
function L(l2, u2, i3, t2, o2, r2, f2, c2) {
  var s2, a2, v, y2 = i3.props, p = u2.props, d2 = u2.type, _2 = 0;
  if (d2 === "svg" && (o2 = true), r2 != null)
    for (; _2 < r2.length; _2++) {
      if ((s2 = r2[_2]) && (s2 === l2 || (d2 ? s2.localName == d2 : s2.nodeType == 3))) {
        l2 = s2, r2[_2] = null;
        break;
      }
    }
  if (l2 == null) {
    if (d2 === null)
      return document.createTextNode(p);
    l2 = o2 ? document.createElementNS("http://www.w3.org/2000/svg", d2) : document.createElement(d2, p.is && p), r2 = null, c2 = false;
  }
  if (d2 === null)
    y2 === p || c2 && l2.data === p || (l2.data = p);
  else {
    if (r2 = r2 && n.call(l2.childNodes), a2 = (y2 = i3.props || e).dangerouslySetInnerHTML, v = p.dangerouslySetInnerHTML, !c2) {
      if (r2 != null)
        for (y2 = {}, _2 = 0; _2 < l2.attributes.length; _2++) {
          y2[l2.attributes[_2].name] = l2.attributes[_2].value;
        }
      (v || a2) && (v && (a2 && v.__html == a2.__html || v.__html === l2.innerHTML) || (l2.innerHTML = v && v.__html || ""));
    }
    if (C(l2, p, y2, o2, c2), v)
      u2.__k = [];
    else if (_2 = u2.props.children, w(l2, Array.isArray(_2) ? _2 : [_2], u2, i3, t2, o2 && d2 !== "foreignObject", r2, f2, r2 ? r2[0] : i3.__k && k(i3, 0), c2), r2 != null)
      for (_2 = r2.length; _2--; ) {
        r2[_2] != null && h(r2[_2]);
      }
    c2 || ("value" in p && (_2 = p.value) !== void 0 && (_2 !== l2.value || d2 === "progress" && !_2) && H(l2, "value", _2, y2.value, false), "checked" in p && (_2 = p.checked) !== void 0 && _2 !== l2.checked && H(l2, "checked", _2, y2.checked, false));
  }
  return l2;
}
function M(n2, u2, i3) {
  try {
    typeof n2 == "function" ? n2(u2) : n2.current = u2;
  } catch (n3) {
    l.__e(n3, i3);
  }
}
function N(n2, u2, i3) {
  var t2, o2;
  if (l.unmount && l.unmount(n2), (t2 = n2.ref) && (t2.current && t2.current !== n2.__e || M(t2, null, u2)), (t2 = n2.__c) != null) {
    if (t2.componentWillUnmount)
      try {
        t2.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u2);
      }
    t2.base = t2.__P = null;
  }
  if (t2 = n2.__k)
    for (o2 = 0; o2 < t2.length; o2++) {
      t2[o2] && N(t2[o2], u2, typeof n2.type != "function");
    }
  i3 || n2.__e == null || h(n2.__e), n2.__e = n2.__d = void 0;
}
function O(n2, l2, u2) {
  return this.constructor(n2, u2);
}
function B(l2, u2, i3) {
  var t2, o2, r2, f2 = a({}, l2.props);
  for (r2 in u2) {
    r2 == "key" ? t2 = u2[r2] : r2 == "ref" ? o2 = u2[r2] : f2[r2] = u2[r2];
  }
  return arguments.length > 2 && (f2.children = arguments.length > 3 ? n.call(arguments, 2) : i3), y(l2.type, f2, t2 || l2.key, o2 || l2.ref, null);
}
n = c.slice, l = {
  __e: function __e(n2, l2) {
    for (var u2, i3, t2; l2 = l2.__; ) {
      if ((u2 = l2.__c) && !u2.__)
        try {
          if ((i3 = u2.constructor) && i3.getDerivedStateFromError != null && (u2.setState(i3.getDerivedStateFromError(n2)), t2 = u2.__d), u2.componentDidCatch != null && (u2.componentDidCatch(n2), t2 = u2.__d), t2)
            return u2.__E = u2;
        } catch (l3) {
          n2 = l3;
        }
    }
    throw n2;
  }
}, u = 0, i = function i2(n2) {
  return n2 != null && n2.constructor === void 0;
}, _.prototype.setState = function(n2, l2) {
  var u2;
  u2 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), typeof n2 == "function" && (n2 = n2(a({}, u2), this.props)), n2 && a(u2, n2), n2 != null && this.__v && (l2 && this.__h.push(l2), m(this));
}, _.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), m(this));
}, _.prototype.render = d, t = [], o = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;

// src/index.js
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
function _defineProperties(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o2, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p2) {
    o3.__proto__ = p2;
    return o3;
  };
  return _setPrototypeOf(o2, p);
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
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
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
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
var Navs = /* @__PURE__ */ function(_Component) {
  _inherits(Navs2, _Component);
  var _super = _createSuper(Navs2);
  function Navs2(props) {
    var _this;
    _classCallCheck(this, Navs2);
    _this = _super.call(this, props);
    _this.firstNavValue = _this.firstNavValue.bind(_assertThisInitialized(_this));
    _this.addChildProps = _this.addChildProps.bind(_assertThisInitialized(_this));
    _this.getContent = _this.getContent.bind(_assertThisInitialized(_this));
    var tabsetId = _this.newId();
    var selected = props.selected ? props.selected : _this.firstNavValue(props.children);
    var children = _this.addChildProps(props.children, tabsetId, selected);
    var content = _this.getContent(children);
    _this.state = {
      tabsetId,
      selected,
      children,
      content
    };
    return _this;
  }
  _createClass(Navs2, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var ulClass = "nav nav-".concat(props.type, " ").concat(props.id ? "shiny-tab-input" : "");
      return /* @__PURE__ */ React.createElement(d, null, /* @__PURE__ */ React.createElement("ul", {
        id: props.id,
        className: ulClass,
        role: "tablist",
        "data-tabsetid": this.state.tabsetId
      }, this.state.children), /* @__PURE__ */ React.createElement("div", {
        className: "tab-content",
        "data-tabsetid": this.state.tabsetId
      }, props.header, this.state.content, props.footer));
    }
  }, {
    key: "firstNavValue",
    value: function firstNavValue(navs) {
      for (var i3 = 0; i3 < navs.length; i3++) {
        var nav = navs[i3];
        if (nav.type.name === "Nav") {
          return nav.props.value;
        }
        if (nav.type.name === "NavMenu") {
          this.firstNavValue(nav);
        }
      }
    }
  }, {
    key: "getContent",
    value: function getContent(navs) {
      var _this2 = this;
      var result = [];
      toChildArray(navs).forEach(function(x2) {
        if (x2.type.name === "NavMenu") {
          result.push(_this2.getContent(x2.props.children));
        }
        if (x2.type.name === "Nav") {
          var className = "tab-pane ".concat(x2.props.selected === x2.props.value ? "active" : "");
          result.push(/* @__PURE__ */ React.createElement("div", {
            id: x2.props.id,
            role: "tabpanel",
            className,
            key: x2.props.id
          }, x2.props.children));
        }
      });
      return result;
    }
  }, {
    key: "addChildProps",
    value: function addChildProps(children, tabsetId, selected) {
      return toChildArray(children).map(function(x2, idx) {
        if (x2.type.name === "NavMenu") {
          var _tabsetId = this.newId();
          var children_ = this.addChildProps(x2.props.children, _tabsetId, selected);
          return B(x2, {
            tabsetId: _tabsetId,
            selected
          }, children_);
        }
        var id = "tab-".concat(tabsetId, "-").concat(idx + 1);
        return B(x2, {
          id,
          selected
        });
      });
    }
  }, {
    key: "newId",
    value: function newId() {
      return Math.floor(1e3 + Math.random() * 9e3);
    }
  }]);
  return Navs2;
}(_);
var NavsCard = /* @__PURE__ */ function(_Navs) {
  _inherits(NavsCard2, _Navs);
  var _super2 = _createSuper(NavsCard2);
  function NavsCard2() {
    _classCallCheck(this, NavsCard2);
    return _super2.apply(this, arguments);
  }
  _createClass(NavsCard2, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var ulClass = "nav nav-".concat(props.type, " card-header-").concat(props.type, " ").concat(props.id ? "shiny-tab-input" : "");
      var ulTag = /* @__PURE__ */ React.createElement("ul", {
        id: props.id,
        className: ulClass,
        role: "tablist",
        "data-tabsetid": this.state.tabsetId
      }, this.state.children);
      var divTag = /* @__PURE__ */ React.createElement("div", {
        className: "tab-content",
        "data-tabsetid": this.state.tabsetId
      }, props.header, this.state.content, props.footer);
      var below = props.placement === "below";
      return /* @__PURE__ */ React.createElement("div", {
        className: "card"
      }, below ? null : /* @__PURE__ */ React.createElement("div", {
        className: "card-header"
      }, " ", ulTag, " "), /* @__PURE__ */ React.createElement("div", {
        className: "card-body"
      }, " ", divTag, " "), below ? /* @__PURE__ */ React.createElement("div", {
        className: "card-footer"
      }, " ", ulTag, " ") : null);
    }
  }]);
  return NavsCard2;
}(Navs);
function Nav(props) {
  return /* @__PURE__ */ React.createElement("li", {
    key: props.id,
    className: props.selected === props.value ? "active" : ""
  }, /* @__PURE__ */ React.createElement("a", {
    href: "#" + props.id,
    role: "tab",
    "data-toggle": "tab",
    "data-value": props.value
  }, props.title));
}
function NavSpacer(props) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "bslib-nav-spacer"
  });
}
function NavItem(props) {
  return /* @__PURE__ */ React.createElement("li", {
    className: "form-inline",
    key: props.id
  }, props.children);
}
function NavMenu(props) {
  var toggleClass = "dropdown-toggle".concat(props.selected === props.value ? " active" : "");
  return /* @__PURE__ */ React.createElement("li", {
    className: "dropdown",
    key: props.tabsetId
  }, /* @__PURE__ */ React.createElement("a", {
    className: toggleClass,
    "data-toggle": "dropdown",
    href: "#",
    role: "button",
    "aria-expanded": "false"
  }, props.title), /* @__PURE__ */ React.createElement("ul", {
    className: "dropdown-menu",
    "data-tabsetid": props.tabsetId
  }, props.children));
}
window.Nav = Nav;
window.NavSpacer = NavSpacer;
window.NavItem = NavItem;
window.NavMenu = NavMenu;
window.Navs = Navs;
window.NavsCard = NavsCard;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dsb2JhbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZmFpbHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXN5bWJvbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1wdXJlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtZ2xvYmFsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pbmNsdWRlcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vd24ta2V5cy5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1mdW5jdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtYXJyYXkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2guanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZi5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZi5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaHRtbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy1leHRlcm5hbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtd3JhcHBlZC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcGF0aC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZy5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9ycy5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3Rvci5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LXNvcnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1mZi12ZXJzaW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtaXMtaWUtb3ItZWRnZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXdlYmtpdC12ZXJzaW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZmxhZ3MuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1zdGlja3ktaGVscGVycy5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLXVuc3VwcG9ydGVkLWRvdC1hbGwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC11bnN1cHBvcnRlZC1uY2cuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLmV4ZWMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtc3Vic3RpdHV0aW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLWh0bWwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1odG1sLWZvcmNlZC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXByb21pc2UtY29uc3RydWN0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLWFsbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LXNwZWNpZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLWluc3RhbmNlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9yLWNsb3NlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90YXNrLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtaXMtaW9zLXBlYmJsZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLXdlYm9zLXdlYmtpdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbWljcm90YXNrLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wcm9taXNlLXJlc29sdmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hvc3QtcmVwb3J0LWVycm9ycy5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcGVyZm9ybS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLWJyb3dzZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5mdW5jdGlvbi5iaW5kLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuY29uY2F0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuZnVuY3Rpb24ubmFtZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5mb3ItZWFjaC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lm1hcC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWZsZWN0LmNvbnN0cnVjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5jcmVhdGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLmRlc2NyaXB0aW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnRvLXN0cmluZy5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN5bWJvbC5pdGVyYXRvci5qcyIsICIuLi9zcmMvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLml0ZXJhdG9yLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaW5kZXgtb2YuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5zb3J0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuc29tZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmlzLWFycmF5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcmVhY3QvZGlzdC9wcmVhY3QubW9kdWxlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLnJlcGxhY2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5zbGljZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5zdWIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5zcGxpY2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5wcm9taXNlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLnRpbWVycy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tZ2xvYmFsLXRoaXMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFscyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmMgLS0gZmFsbGJhY2tcbiAgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pKCkgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsICJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwgInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBEZXRlY3QgSUU4J3MgaW5jb21wbGV0ZSBkZWZpbmVQcm9wZXJ0eSBpbXBsZW1lbnRhdGlvblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9IDc7XG59KTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgISRwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsICJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwgInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsICJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciBzcGxpdCA9ICcnLnNwbGl0O1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiAhT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCk7XG59KSA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY2xhc3NvZihpdCkgPT0gJ1N0cmluZycgPyBzcGxpdC5jYWxsKGl0LCAnJykgOiBPYmplY3QoaXQpO1xufSA6IE9iamVjdDtcbiIsICIvLyBgUmVxdWlyZU9iamVjdENvZXJjaWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlcXVpcmVvYmplY3Rjb2VyY2libGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwgIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCAibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09ICdmdW5jdGlvbicgPyB2YXJpYWJsZSA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSkgOiBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsICJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCduYXZpZ2F0b3InLCAndXNlckFnZW50JykgfHwgJyc7XG4iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBEZW5vID0gZ2xvYmFsLkRlbm87XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnMgfHwgRGVubyAmJiBEZW5vLnZlcnNpb247XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52ODtcbnZhciBtYXRjaCwgdmVyc2lvbjtcblxuaWYgKHY4KSB7XG4gIG1hdGNoID0gdjguc3BsaXQoJy4nKTtcbiAgdmVyc2lvbiA9IG1hdGNoWzBdIDwgNCA/IDEgOiBtYXRjaFswXSArIG1hdGNoWzFdO1xufSBlbHNlIGlmICh1c2VyQWdlbnQpIHtcbiAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykvKTtcbiAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA+PSA3NCkge1xuICAgIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICBpZiAobWF0Y2gpIHZlcnNpb24gPSBtYXRjaFsxXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnNpb24gJiYgK3ZlcnNpb247XG4iLCAiLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgc3ltYm9sID0gU3ltYm9sKCk7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGBnZXQtb3duLXByb3BlcnR5LXN5bWJvbHNgIHBvbHlmaWxsIHN5bWJvbHMgY29udmVydGVkIHRvIG9iamVjdCBhcmUgbm90IFN5bWJvbCBpbnN0YW5jZXNcbiAgcmV0dXJuICFTdHJpbmcoc3ltYm9sKSB8fCAhKE9iamVjdChzeW1ib2wpIGluc3RhbmNlb2YgU3ltYm9sKSB8fFxuICAgIC8vIENocm9tZSAzOC00MCBzeW1ib2xzIGFyZSBub3QgaW5oZXJpdGVkIGZyb20gRE9NIGNvbGxlY3Rpb25zIHByb3RvdHlwZXMgdG8gaW5zdGFuY2VzXG4gICAgIVN5bWJvbC5zaGFtICYmIFY4X1ZFUlNJT04gJiYgVjhfVkVSU0lPTiA8IDQxO1xufSk7XG4iLCAiLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAmJiAhU3ltYm9sLnNoYW1cbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsICJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVTRV9TWU1CT0xfQVNfVUlEID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciAkU3ltYm9sID0gZ2V0QnVpbHRJbignU3ltYm9sJyk7XG4gIHJldHVybiB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nICYmIE9iamVjdChpdCkgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcbiIsICJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbi8vIGBPcmRpbmFyeVRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb3JkaW5hcnl0b3ByaW1pdGl2ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIHByZWYpIHtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChwcmVmID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmIChwcmVmICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsICJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuIiwgInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZ2xvYmFsLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IHNldEdsb2JhbChTSEFSRUQsIHt9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZTtcbiIsICJ2YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiAnMy4xNi4xJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICdcdTAwQTkgMjAyMSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwgInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwgInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcblxudmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0Lmhhc093biB8fCBmdW5jdGlvbiBoYXNPd24oaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbCh0b09iamVjdChpdCksIGtleSk7XG59O1xuIiwgInZhciBpZCA9IDA7XG52YXIgcG9zdGZpeCA9IE1hdGgucmFuZG9tKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgU3RyaW5nKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArICgrK2lkICsgcG9zdGZpeCkudG9TdHJpbmcoMzYpO1xufTtcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgY3JlYXRlV2VsbEtub3duU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBTeW1ib2wgOiBTeW1ib2wgJiYgU3ltYm9sLndpdGhvdXRTZXR0ZXIgfHwgdWlkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghaGFzKFdlbGxLbm93blN5bWJvbHNTdG9yZSwgbmFtZSkgfHwgIShOQVRJVkVfU1lNQk9MIHx8IHR5cGVvZiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPT0gJ3N0cmluZycpKSB7XG4gICAgaWYgKE5BVElWRV9TWU1CT0wgJiYgaGFzKFN5bWJvbCwgbmFtZSkpIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IFN5bWJvbFtuYW1lXTtcbiAgICB9IGVsc2Uge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gY3JlYXRlV2VsbEtub3duU3ltYm9sKCdTeW1ib2wuJyArIG5hbWUpO1xuICAgIH1cbiAgfSByZXR1cm4gV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdO1xufTtcbiIsICJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG52YXIgb3JkaW5hcnlUb1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vcmRpbmFyeS10by1wcmltaXRpdmUnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1BSSU1JVElWRSA9IHdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBwcmVmKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpIHx8IGlzU3ltYm9sKGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICB2YXIgZXhvdGljVG9QcmltID0gaW5wdXRbVE9fUFJJTUlUSVZFXTtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGV4b3RpY1RvUHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHByZWYgPT09IHVuZGVmaW5lZCkgcHJlZiA9ICdkZWZhdWx0JztcbiAgICByZXN1bHQgPSBleG90aWNUb1ByaW0uY2FsbChpbnB1dCwgcHJlZik7XG4gICAgaWYgKCFpc09iamVjdChyZXN1bHQpIHx8IGlzU3ltYm9sKHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xuICB9XG4gIGlmIChwcmVmID09PSB1bmRlZmluZWQpIHByZWYgPSAnbnVtYmVyJztcbiAgcmV0dXJuIG9yZGluYXJ5VG9QcmltaXRpdmUoaW5wdXQsIHByZWYpO1xufTtcbiIsICJ2YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG5cbi8vIGBUb1Byb3BlcnR5S2V5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcm9wZXJ0eWtleVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZ3VtZW50LCAnc3RyaW5nJyk7XG4gIHJldHVybiBpc1N5bWJvbChrZXkpID8ga2V5IDogU3RyaW5nKGtleSk7XG59O1xuIiwgInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwgInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xuXG4vLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwgInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCAidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsICJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyAkZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gJGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsICJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwgInZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSBGdW5jdGlvbi50b1N0cmluZztcblxuLy8gdGhpcyBoZWxwZXIgYnJva2VuIGluIGBjb3JlLWpzQDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKHR5cGVvZiBzdG9yZS5pbnNwZWN0U291cmNlICE9ICdmdW5jdGlvbicpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nLmNhbGwoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KGluc3BlY3RTb3VyY2UoV2Vha01hcCkpO1xuIiwgInZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xuXG52YXIga2V5cyA9IHNoYXJlZCgna2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGtleXNba2V5XSB8fCAoa2V5c1trZXldID0gdWlkKGtleSkpO1xufTtcbiIsICJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwgInZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBvYmplY3RIYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQgPSAnT2JqZWN0IGFscmVhZHkgaW5pdGlhbGl6ZWQnO1xudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcbnZhciBzZXQsIGdldCwgaGFzO1xuXG52YXIgZW5mb3JjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaGFzKGl0KSA/IGdldChpdCkgOiBzZXQoaXQsIHt9KTtcbn07XG5cbnZhciBnZXR0ZXJGb3IgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmICghaXNPYmplY3QoaXQpIHx8IChzdGF0ZSA9IGdldChpdCkpLnR5cGUgIT09IFRZUEUpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVAgfHwgc2hhcmVkLnN0YXRlKSB7XG4gIHZhciBzdG9yZSA9IHNoYXJlZC5zdGF0ZSB8fCAoc2hhcmVkLnN0YXRlID0gbmV3IFdlYWtNYXAoKSk7XG4gIHZhciB3bWdldCA9IHN0b3JlLmdldDtcbiAgdmFyIHdtaGFzID0gc3RvcmUuaGFzO1xuICB2YXIgd21zZXQgPSBzdG9yZS5zZXQ7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBpZiAod21oYXMuY2FsbChzdG9yZSwgaXQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEKTtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICB3bXNldC5jYWxsKHN0b3JlLCBpdCwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtZ2V0LmNhbGwoc3RvcmUsIGl0KSB8fCB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtaGFzLmNhbGwoc3RvcmUsIGl0KTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBTVEFURSA9IHNoYXJlZEtleSgnc3RhdGUnKTtcbiAgaGlkZGVuS2V5c1tTVEFURV0gPSB0cnVlO1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaWYgKG9iamVjdEhhcyhpdCwgU1RBVEUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEKTtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoaXQsIFNUQVRFLCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSkgPyBpdFtTVEFURV0gOiB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGdldDogZ2V0LFxuICBoYXM6IGhhcyxcbiAgZW5mb3JjZTogZW5mb3JjZSxcbiAgZ2V0dGVyRm9yOiBnZXR0ZXJGb3Jcbn07XG4iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBURU1QTEFURSA9IFN0cmluZyhTdHJpbmcpLnNwbGl0KCdTdHJpbmcnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHVuc2FmZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMudW5zYWZlIDogZmFsc2U7XG4gIHZhciBzaW1wbGUgPSBvcHRpb25zID8gISFvcHRpb25zLmVudW1lcmFibGUgOiBmYWxzZTtcbiAgdmFyIG5vVGFyZ2V0R2V0ID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5ub1RhcmdldEdldCA6IGZhbHNlO1xuICB2YXIgc3RhdGU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnICYmICFoYXModmFsdWUsICduYW1lJykpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh2YWx1ZSwgJ25hbWUnLCBrZXkpO1xuICAgIH1cbiAgICBzdGF0ZSA9IGVuZm9yY2VJbnRlcm5hbFN0YXRlKHZhbHVlKTtcbiAgICBpZiAoIXN0YXRlLnNvdXJjZSkge1xuICAgICAgc3RhdGUuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8ga2V5IDogJycpO1xuICAgIH1cbiAgfVxuICBpZiAoTyA9PT0gZ2xvYmFsKSB7XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBzZXRHbG9iYWwoa2V5LCB2YWx1ZSk7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKCF1bnNhZmUpIHtcbiAgICBkZWxldGUgT1trZXldO1xuICB9IGVsc2UgaWYgKCFub1RhcmdldEdldCAmJiBPW2tleV0pIHtcbiAgICBzaW1wbGUgPSB0cnVlO1xuICB9XG4gIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICBlbHNlIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShPLCBrZXksIHZhbHVlKTtcbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgaW5zcGVjdFNvdXJjZSh0aGlzKTtcbn0pO1xuIiwgInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYFRvSW50ZWdlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvaW50ZWdlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzTmFOKGFyZ3VtZW50ID0gK2FyZ3VtZW50KSA/IDAgOiAoYXJndW1lbnQgPiAwID8gZmxvb3IgOiBjZWlsKShhcmd1bWVudCk7XG59O1xuIiwgInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlcihhcmd1bWVudCksIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsICJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwgInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCAidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXMoaGlkZGVuS2V5cywga2V5KSAmJiBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCAiLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCAidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHluYW1lcyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCAiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eXN5bWJvbHMgLS0gc2FmZVxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsICJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCAidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzKHRhcmdldCwga2V5KSkgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICB9XG59O1xuIiwgInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09IFBPTFlGSUxMID8gdHJ1ZVxuICAgIDogdmFsdWUgPT0gTkFUSVZFID8gZmFsc2VcbiAgICA6IHR5cGVvZiBkZXRlY3Rpb24gPT0gJ2Z1bmN0aW9uJyA/IGZhaWxzKGRldGVjdGlvbilcbiAgICA6ICEhZGV0ZWN0aW9uO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGlzRm9yY2VkLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVwbGFjZW1lbnQsICcuJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBkYXRhID0gaXNGb3JjZWQuZGF0YSA9IHt9O1xudmFyIE5BVElWRSA9IGlzRm9yY2VkLk5BVElWRSA9ICdOJztcbnZhciBQT0xZRklMTCA9IGlzRm9yY2VkLlBPTFlGSUxMID0gJ1AnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRm9yY2VkO1xuIiwgInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgc2V0R2xvYmFsKFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwgIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBzbGljZSA9IFtdLnNsaWNlO1xudmFyIGZhY3RvcmllcyA9IHt9O1xuXG52YXIgY29uc3RydWN0ID0gZnVuY3Rpb24gKEMsIGFyZ3NMZW5ndGgsIGFyZ3MpIHtcbiAgaWYgKCEoYXJnc0xlbmd0aCBpbiBmYWN0b3JpZXMpKSB7XG4gICAgZm9yICh2YXIgbGlzdCA9IFtdLCBpID0gMDsgaSA8IGFyZ3NMZW5ndGg7IGkrKykgbGlzdFtpXSA9ICdhWycgKyBpICsgJ10nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuYyAtLSB3ZSBoYXZlIG5vIHByb3BlciBhbHRlcm5hdGl2ZXMsIElFOC0gb25seVxuICAgIGZhY3Rvcmllc1thcmdzTGVuZ3RoXSA9IEZ1bmN0aW9uKCdDLGEnLCAncmV0dXJuIG5ldyBDKCcgKyBsaXN0LmpvaW4oJywnKSArICcpJyk7XG4gIH0gcmV0dXJuIGZhY3Rvcmllc1thcmdzTGVuZ3RoXShDLCBhcmdzKTtcbn07XG5cbi8vIGBGdW5jdGlvbi5wcm90b3R5cGUuYmluZGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLmJpbmQgfHwgZnVuY3Rpb24gYmluZCh0aGF0IC8qICwgLi4uYXJncyAqLykge1xuICB2YXIgZm4gPSBhRnVuY3Rpb24odGhpcyk7XG4gIHZhciBwYXJ0QXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgdmFyIGJvdW5kRnVuY3Rpb24gPSBmdW5jdGlvbiBib3VuZCgvKiBhcmdzLi4uICovKSB7XG4gICAgdmFyIGFyZ3MgPSBwYXJ0QXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIGJvdW5kRnVuY3Rpb24gPyBjb25zdHJ1Y3QoZm4sIGFyZ3MubGVuZ3RoLCBhcmdzKSA6IGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9O1xuICBpZiAoaXNPYmplY3QoZm4ucHJvdG90eXBlKSkgYm91bmRGdW5jdGlvbi5wcm90b3R5cGUgPSBmbi5wcm90b3R5cGU7XG4gIHJldHVybiBib3VuZEZ1bmN0aW9uO1xufTtcbiIsICJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG4vLyBgSXNBcnJheWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzYXJyYXlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1pc2FycmF5IC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZykge1xuICByZXR1cm4gY2xhc3NvZihhcmcpID09ICdBcnJheSc7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBwcm9wZXJ0eUtleSA9IHRvUHJvcGVydHlLZXkoa2V5KTtcbiAgaWYgKHByb3BlcnR5S2V5IGluIG9iamVjdCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIHByb3BlcnR5S2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbcHJvcGVydHlLZXldID0gdmFsdWU7XG59O1xuIiwgInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbi8vIGEgcGFydCBvZiBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXlzcGVjaWVzY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbEFycmF5KSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbEFycmF5KSkge1xuICAgIEMgPSBvcmlnaW5hbEFycmF5LmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBlbHNlIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQztcbn07XG4iLCAidmFyIGFycmF5U3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3InKTtcblxuLy8gYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5c3BlY2llc2NyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWxBcnJheSwgbGVuZ3RoKSB7XG4gIHJldHVybiBuZXcgKGFycmF5U3BlY2llc0NvbnN0cnVjdG9yKG9yaWdpbmFsQXJyYXkpKShsZW5ndGggPT09IDAgPyAwIDogbGVuZ3RoKTtcbn07XG4iLCAidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCAidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCk7XG4gICAgfTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCAidmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xuXG52YXIgcHVzaCA9IFtdLnB1c2g7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBmb3JFYWNoLCBtYXAsIGZpbHRlciwgc29tZSwgZXZlcnksIGZpbmQsIGZpbmRJbmRleCwgZmlsdGVyUmVqZWN0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICB2YXIgSVNfTUFQID0gVFlQRSA9PSAxO1xuICB2YXIgSVNfRklMVEVSID0gVFlQRSA9PSAyO1xuICB2YXIgSVNfU09NRSA9IFRZUEUgPT0gMztcbiAgdmFyIElTX0VWRVJZID0gVFlQRSA9PSA0O1xuICB2YXIgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNjtcbiAgdmFyIElTX0ZJTFRFUl9SRUpFQ1QgPSBUWVBFID09IDc7XG4gIHZhciBOT19IT0xFUyA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYO1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0LCBzcGVjaWZpY0NyZWF0ZSkge1xuICAgIHZhciBPID0gdG9PYmplY3QoJHRoaXMpO1xuICAgIHZhciBzZWxmID0gSW5kZXhlZE9iamVjdChPKTtcbiAgICB2YXIgYm91bmRGdW5jdGlvbiA9IGJpbmQoY2FsbGJhY2tmbiwgdGhhdCwgMyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBjcmVhdGUgPSBzcGVjaWZpY0NyZWF0ZSB8fCBhcnJheVNwZWNpZXNDcmVhdGU7XG4gICAgdmFyIHRhcmdldCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiB8fCBJU19GSUxURVJfUkVKRUNUID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgdmFsdWUsIHJlc3VsdDtcbiAgICBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpIHtcbiAgICAgIHZhbHVlID0gc2VsZltpbmRleF07XG4gICAgICByZXN1bHQgPSBib3VuZEZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgTyk7XG4gICAgICBpZiAoVFlQRSkge1xuICAgICAgICBpZiAoSVNfTUFQKSB0YXJnZXRbaW5kZXhdID0gcmVzdWx0OyAvLyBtYXBcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0KSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbHVlOyAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcHVzaC5jYWxsKHRhcmdldCwgdmFsdWUpOyAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgNDogcmV0dXJuIGZhbHNlOyAgICAgICAgICAgICAvLyBldmVyeVxuICAgICAgICAgIGNhc2UgNzogcHVzaC5jYWxsKHRhcmdldCwgdmFsdWUpOyAvLyBmaWx0ZXJSZWplY3RcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogdGFyZ2V0O1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbiAgZm9yRWFjaDogY3JlYXRlTWV0aG9kKDApLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLm1hcFxuICBtYXA6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maWx0ZXJcbiAgZmlsdGVyOiBjcmVhdGVNZXRob2QoMiksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuc29tZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNvbWVcbiAgc29tZTogY3JlYXRlTWV0aG9kKDMpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmV2ZXJ5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZXZlcnlcbiAgZXZlcnk6IGNyZWF0ZU1ldGhvZCg0KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZFxuICBmaW5kOiBjcmVhdGVNZXRob2QoNSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZEluZGV4XG4gIGZpbmRJbmRleDogY3JlYXRlTWV0aG9kKDYpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlclJlamVjdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWFycmF5LWZpbHRlcmluZ1xuICBmaWx0ZXJSZWplY3Q6IGNyZWF0ZU1ldGhvZCg3KVxufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCxuby10aHJvdy1saXRlcmFsIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5mb3JFYWNoO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2ZvckVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbm1vZHVsZS5leHBvcnRzID0gIVNUUklDVF9NRVRIT0QgPyBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gIHJldHVybiAkZm9yRWFjaCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWZvcmVhY2ggLS0gc2FmZVxufSA6IFtdLmZvckVhY2g7XG4iLCAiLy8gaXRlcmFibGUgRE9NIGNvbGxlY3Rpb25zXG4vLyBmbGFnIC0gYGl0ZXJhYmxlYCBpbnRlcmZhY2UgLSAnZW50cmllcycsICdrZXlzJywgJ3ZhbHVlcycsICdmb3JFYWNoJyBtZXRob2RzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ1NTUnVsZUxpc3Q6IDAsXG4gIENTU1N0eWxlRGVjbGFyYXRpb246IDAsXG4gIENTU1ZhbHVlTGlzdDogMCxcbiAgQ2xpZW50UmVjdExpc3Q6IDAsXG4gIERPTVJlY3RMaXN0OiAwLFxuICBET01TdHJpbmdMaXN0OiAwLFxuICBET01Ub2tlbkxpc3Q6IDEsXG4gIERhdGFUcmFuc2Zlckl0ZW1MaXN0OiAwLFxuICBGaWxlTGlzdDogMCxcbiAgSFRNTEFsbENvbGxlY3Rpb246IDAsXG4gIEhUTUxDb2xsZWN0aW9uOiAwLFxuICBIVE1MRm9ybUVsZW1lbnQ6IDAsXG4gIEhUTUxTZWxlY3RFbGVtZW50OiAwLFxuICBNZWRpYUxpc3Q6IDAsXG4gIE1pbWVUeXBlQXJyYXk6IDAsXG4gIE5hbWVkTm9kZU1hcDogMCxcbiAgTm9kZUxpc3Q6IDEsXG4gIFBhaW50UmVxdWVzdExpc3Q6IDAsXG4gIFBsdWdpbjogMCxcbiAgUGx1Z2luQXJyYXk6IDAsXG4gIFNWR0xlbmd0aExpc3Q6IDAsXG4gIFNWR051bWJlckxpc3Q6IDAsXG4gIFNWR1BhdGhTZWdMaXN0OiAwLFxuICBTVkdQb2ludExpc3Q6IDAsXG4gIFNWR1N0cmluZ0xpc3Q6IDAsXG4gIFNWR1RyYW5zZm9ybUxpc3Q6IDAsXG4gIFNvdXJjZUJ1ZmZlckxpc3Q6IDAsXG4gIFN0eWxlU2hlZXRMaXN0OiAwLFxuICBUZXh0VHJhY2tDdWVMaXN0OiAwLFxuICBUZXh0VHJhY2tMaXN0OiAwLFxuICBUb3VjaExpc3Q6IDBcbn07XG4iLCAidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSAmJiBpdCAhPT0gbnVsbCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcIkNhbid0IHNldCBcIiArIFN0cmluZyhpdCkgKyAnIGFzIGEgcHJvdG90eXBlJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAtLSBzYWZlICovXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYVBvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Quc2V0cHJvdG90eXBlb2Zcbi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1zZXRwcm90b3R5cGVvZiAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbiAgICBzZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQ7XG4gICAgc2V0dGVyLmNhbGwodGVzdCwgW10pO1xuICAgIENPUlJFQ1RfU0VUVEVSID0gdGVzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgIGFuT2JqZWN0KE8pO1xuICAgIGFQb3NzaWJsZVByb3RvdHlwZShwcm90byk7XG4gICAgaWYgKENPUlJFQ1RfU0VUVEVSKSBzZXR0ZXIuY2FsbChPLCBwcm90byk7XG4gICAgZWxzZSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgIHJldHVybiBPO1xuICB9O1xufSgpIDogdW5kZWZpbmVkKTtcbiIsICJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGKCkgeyAvKiBlbXB0eSAqLyB9XG4gIEYucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRwcm90b3R5cGVvZiAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBGKCkpICE9PSBGLnByb3RvdHlwZTtcbn0pO1xuIiwgInZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyJyk7XG5cbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vLyBgT2JqZWN0LmdldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldHByb3RvdHlwZW9mXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldHByb3RvdHlwZW9mIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvdHlwZSA6IG51bGw7XG59O1xuIiwgInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWtleXMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwgInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnRpZXMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSA9IGtleXNbaW5kZXgrK10sIFByb3BlcnRpZXNba2V5XSk7XG4gIHJldHVybiBPO1xufTtcbiIsICJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsICIvKiBnbG9iYWwgQWN0aXZlWE9iamVjdCAtLSBvbGQgSUUsIFdTSCAqL1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGRlZmluZVByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBkb2N1bWVudENyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xuXG52YXIgR1QgPSAnPic7XG52YXIgTFQgPSAnPCc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgU0NSSVBUID0gJ3NjcmlwdCc7XG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG5cbnZhciBFbXB0eUNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuXG52YXIgc2NyaXB0VGFnID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgcmV0dXJuIExUICsgU0NSSVBUICsgR1QgKyBjb250ZW50ICsgTFQgKyAnLycgKyBTQ1JJUFQgKyBHVDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBBY3RpdmVYIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWCA9IGZ1bmN0aW9uIChhY3RpdmVYRG9jdW1lbnQpIHtcbiAgYWN0aXZlWERvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnJykpO1xuICBhY3RpdmVYRG9jdW1lbnQuY2xvc2UoKTtcbiAgdmFyIHRlbXAgPSBhY3RpdmVYRG9jdW1lbnQucGFyZW50V2luZG93Lk9iamVjdDtcbiAgYWN0aXZlWERvY3VtZW50ID0gbnVsbDsgLy8gYXZvaWQgbWVtb3J5IGxlYWtcbiAgcmV0dXJuIHRlbXA7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gZG9jdW1lbnRDcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgdmFyIEpTID0gJ2phdmEnICsgU0NSSVBUICsgJzonO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmIChpZnJhbWUuc3R5bGUpIHtcbiAgICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBodG1sLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzQ3NVxuICAgIGlmcmFtZS5zcmMgPSBTdHJpbmcoSlMpO1xuICAgIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gICAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICAgIGlmcmFtZURvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnZG9jdW1lbnQuRj1PYmplY3QnKSk7XG4gICAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgICByZXR1cm4gaWZyYW1lRG9jdW1lbnQuRjtcbiAgfVxufTtcblxuLy8gQ2hlY2sgZm9yIGRvY3VtZW50LmRvbWFpbiBhbmQgYWN0aXZlIHggc3VwcG9ydFxuLy8gTm8gbmVlZCB0byB1c2UgYWN0aXZlIHggYXBwcm9hY2ggd2hlbiBkb2N1bWVudC5kb21haW4gaXMgbm90IHNldFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbS9pc3N1ZXMvMTUwXG4vLyB2YXJpYXRpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL2tpdGNhbWJyaWRnZS9lczUtc2hpbS9jb21taXQvNGY3MzhhYzA2NjM0NlxuLy8gYXZvaWQgSUUgR0MgYnVnXG52YXIgYWN0aXZlWERvY3VtZW50O1xudmFyIE51bGxQcm90b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBhY3RpdmVYRG9jdW1lbnQgPSBuZXcgQWN0aXZlWE9iamVjdCgnaHRtbGZpbGUnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogaWdub3JlICovIH1cbiAgTnVsbFByb3RvT2JqZWN0ID0gZG9jdW1lbnQuZG9tYWluICYmIGFjdGl2ZVhEb2N1bWVudCA/XG4gICAgTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWChhY3RpdmVYRG9jdW1lbnQpIDogLy8gb2xkIElFXG4gICAgTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lKCkgfHxcbiAgICBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYKGFjdGl2ZVhEb2N1bWVudCk7IC8vIFdTSFxuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIGRlbGV0ZSBOdWxsUHJvdG9PYmplY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIE51bGxQcm90b09iamVjdCgpO1xufTtcblxuaGlkZGVuS2V5c1tJRV9QUk9UT10gPSB0cnVlO1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eUNvbnN0cnVjdG9yKCk7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBOdWxsUHJvdG9PYmplY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCAidmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXN5bWJvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNTeW1ib2woYXJndW1lbnQpKSB0aHJvdyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGEgU3ltYm9sIHZhbHVlIHRvIGEgc3RyaW5nJyk7XG4gIHJldHVybiBTdHJpbmcoYXJndW1lbnQpO1xufTtcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHluYW1lcyAtLSBzYWZlICovXG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKS5mO1xuXG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uIChpdCkge1xuICB0cnkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlOYW1lcyhpdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJ1xuICAgID8gZ2V0V2luZG93TmFtZXMoaXQpXG4gICAgOiAkZ2V0T3duUHJvcGVydHlOYW1lcyh0b0luZGV4ZWRPYmplY3QoaXQpKTtcbn07XG4iLCAidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG5leHBvcnRzLmYgPSB3ZWxsS25vd25TeW1ib2w7XG4iLCAidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG4iLCAidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTkFNRSkge1xuICB2YXIgU3ltYm9sID0gcGF0aC5TeW1ib2wgfHwgKHBhdGguU3ltYm9sID0ge30pO1xuICBpZiAoIWhhcyhTeW1ib2wsIE5BTUUpKSBkZWZpbmVQcm9wZXJ0eShTeW1ib2wsIE5BTUUsIHtcbiAgICB2YWx1ZTogd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZS5mKE5BTUUpXG4gIH0pO1xufTtcbiIsICJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFRBRywgU1RBVElDKSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gU1RBVElDID8gaXQgOiBpdC5wcm90b3R5cGUsIFRPX1NUUklOR19UQUcpKSB7XG4gICAgZGVmaW5lUHJvcGVydHkoaXQsIFRPX1NUUklOR19UQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogVEFHIH0pO1xuICB9XG59O1xuIiwgInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgdGVzdCA9IHt9O1xuXG50ZXN0W1RPX1NUUklOR19UQUddID0gJ3onO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZyh0ZXN0KSA9PT0gJ1tvYmplY3Qgel0nO1xuIiwgInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQ09SUkVDVF9BUkdVTUVOVFMgPSBjbGFzc29mUmF3KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG4vLyBnZXR0aW5nIHRhZyBmcm9tIEVTNisgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IGNsYXNzb2ZSYXcgOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIHRhZywgcmVzdWx0O1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAodGFnID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUT19TVFJJTkdfVEFHKSkgPT0gJ3N0cmluZycgPyB0YWdcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IENPUlJFQ1RfQVJHVU1FTlRTID8gY2xhc3NvZlJhdyhPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChyZXN1bHQgPSBjbGFzc29mUmF3KE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogcmVzdWx0O1xufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8ge30udG9TdHJpbmcgOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdbb2JqZWN0ICcgKyBjbGFzc29mKHRoaXMpICsgJ10nO1xufTtcbiIsICJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbnZhciBVTlNDT1BBQkxFUyA9IHdlbGxLbm93blN5bWJvbCgndW5zY29wYWJsZXMnKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxuLy8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5pZiAoQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZCkge1xuICBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKEFycmF5UHJvdG90eXBlLCBVTlNDT1BBQkxFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogY3JlYXRlKG51bGwpXG4gIH0pO1xufVxuXG4vLyBhZGQgYSBrZXkgdG8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcbiIsICJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBmYWxzZTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJWAgb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVpdGVyYXRvcnByb3RvdHlwZSUtb2JqZWN0XG52YXIgSXRlcmF0b3JQcm90b3R5cGUsIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSwgYXJyYXlJdGVyYXRvcjtcblxuLyogZXNsaW50LWRpc2FibGUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWtleXMgLS0gc2FmZSAqL1xuaWYgKFtdLmtleXMpIHtcbiAgYXJyYXlJdGVyYXRvciA9IFtdLmtleXMoKTtcbiAgLy8gU2FmYXJpIDggaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gIGlmICghKCduZXh0JyBpbiBhcnJheUl0ZXJhdG9yKSkgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IHRydWU7XG4gIGVsc2Uge1xuICAgIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGdldFByb3RvdHlwZU9mKGFycmF5SXRlcmF0b3IpKTtcbiAgICBpZiAoUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSBJdGVyYXRvclByb3RvdHlwZSA9IFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxufVxuXG52YXIgTkVXX0lURVJBVE9SX1BST1RPVFlQRSA9IEl0ZXJhdG9yUHJvdG90eXBlID09IHVuZGVmaW5lZCB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXN0ID0ge307XG4gIC8vIEZGNDQtIGxlZ2FjeSBpdGVyYXRvcnMgY2FzZVxuICByZXR1cm4gSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdLmNhbGwodGVzdCkgIT09IHRlc3Q7XG59KTtcblxuaWYgKE5FV19JVEVSQVRPUl9QUk9UT1RZUEUpIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIGAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0laXRlcmF0b3Jwcm90b3R5cGUlLUBAaXRlcmF0b3JcbmlmICgoIUlTX1BVUkUgfHwgTkVXX0lURVJBVE9SX1BST1RPVFlQRSkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKSB7XG4gIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSXRlcmF0b3JQcm90b3R5cGU6IEl0ZXJhdG9yUHJvdG90eXBlLFxuICBCVUdHWV9TQUZBUklfSVRFUkFUT1JTOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTXG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgSXRlcmF0b3JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3RvcicpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJdGVyYXRvcnNDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlJyk7XG5cbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IEl0ZXJhdG9yc0NvcmUuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IEl0ZXJhdG9yc0NvcmUuQlVHR1lfU0FGQVJJX0lURVJBVE9SUztcbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xudmFyIEVOVFJJRVMgPSAnZW50cmllcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmFibGUsIE5BTUUsIEl0ZXJhdG9yQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG5cbiAgdmFyIGdldEl0ZXJhdGlvbk1ldGhvZCA9IGZ1bmN0aW9uIChLSU5EKSB7XG4gICAgaWYgKEtJTkQgPT09IERFRkFVTFQgJiYgZGVmYXVsdEl0ZXJhdG9yKSByZXR1cm4gZGVmYXVsdEl0ZXJhdG9yO1xuICAgIGlmICghQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBLSU5EIGluIEl0ZXJhYmxlUHJvdG90eXBlKSByZXR1cm4gSXRlcmFibGVQcm90b3R5cGVbS0lORF07XG4gICAgc3dpdGNoIChLSU5EKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBFTlRSSUVTOiByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMpOyB9O1xuICB9O1xuXG4gIHZhciBUT19TVFJJTkdfVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gZmFsc2U7XG4gIHZhciBJdGVyYWJsZVByb3RvdHlwZSA9IEl0ZXJhYmxlLnByb3RvdHlwZTtcbiAgdmFyIG5hdGl2ZUl0ZXJhdG9yID0gSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdXG4gICAgfHwgSXRlcmFibGVQcm90b3R5cGVbJ0BAaXRlcmF0b3InXVxuICAgIHx8IERFRkFVTFQgJiYgSXRlcmFibGVQcm90b3R5cGVbREVGQVVMVF07XG4gIHZhciBkZWZhdWx0SXRlcmF0b3IgPSAhQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBuYXRpdmVJdGVyYXRvciB8fCBnZXRJdGVyYXRpb25NZXRob2QoREVGQVVMVCk7XG4gIHZhciBhbnlOYXRpdmVJdGVyYXRvciA9IE5BTUUgPT0gJ0FycmF5JyA/IEl0ZXJhYmxlUHJvdG90eXBlLmVudHJpZXMgfHwgbmF0aXZlSXRlcmF0b3IgOiBuYXRpdmVJdGVyYXRvcjtcbiAgdmFyIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgbWV0aG9kcywgS0VZO1xuXG4gIC8vIGZpeCBuYXRpdmVcbiAgaWYgKGFueU5hdGl2ZUl0ZXJhdG9yKSB7XG4gICAgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoYW55TmF0aXZlSXRlcmF0b3IuY2FsbChuZXcgSXRlcmFibGUoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgaWYgKCFJU19QVVJFICYmIGdldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSkgIT09IEl0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgICAgIGlmIChzZXRQcm90b3R5cGVPZikge1xuICAgICAgICAgIHNldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSXRlcmF0b3JQcm90b3R5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBpZiAoSVNfUFVSRSkgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgICB9XG4gIH1cblxuICAvLyBmaXggQXJyYXkucHJvdG90eXBlLnsgdmFsdWVzLCBAQGl0ZXJhdG9yIH0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZBVUxUID09IFZBTFVFUyAmJiBuYXRpdmVJdGVyYXRvciAmJiBuYXRpdmVJdGVyYXRvci5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSB0cnVlO1xuICAgIGRlZmF1bHRJdGVyYXRvciA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5hdGl2ZUl0ZXJhdG9yLmNhbGwodGhpcyk7IH07XG4gIH1cblxuICAvLyBkZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghSVNfUFVSRSB8fCBGT1JDRUQpICYmIEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXSAhPT0gZGVmYXVsdEl0ZXJhdG9yKSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEl0ZXJhYmxlUHJvdG90eXBlLCBJVEVSQVRPUiwgZGVmYXVsdEl0ZXJhdG9yKTtcbiAgfVxuICBJdGVyYXRvcnNbTkFNRV0gPSBkZWZhdWx0SXRlcmF0b3I7XG5cbiAgLy8gZXhwb3J0IGFkZGl0aW9uYWwgbWV0aG9kc1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gZGVmYXVsdEl0ZXJhdG9yIDogZ2V0SXRlcmF0aW9uTWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogZ2V0SXRlcmF0aW9uTWV0aG9kKEVOVFJJRVMpXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKEtFWSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfHwgIShLRVkgaW4gSXRlcmFibGVQcm90b3R5cGUpKSB7XG4gICAgICAgIHJlZGVmaW5lKEl0ZXJhYmxlUHJvdG90eXBlLCBLRVksIG1ldGhvZHNbS0VZXSk7XG4gICAgICB9XG4gICAgfSBlbHNlICQoeyB0YXJnZXQ6IE5BTUUsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIH0sIG1ldGhvZHMpO1xuICB9XG5cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBBUlJBWV9JVEVSQVRPUiA9ICdBcnJheSBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihBUlJBWV9JVEVSQVRPUik7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5lbnRyaWVzXG4vLyBgQXJyYXkucHJvdG90eXBlLmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUua2V5c1xuLy8gYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUudmFsdWVzXG4vLyBgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAaXRlcmF0b3Jcbi8vIGBDcmVhdGVBcnJheUl0ZXJhdG9yYCBpbnRlcm5hbCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRlYXJyYXlpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVJdGVyYXRvcihBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IEFSUkFZX0lURVJBVE9SLFxuICAgIHRhcmdldDogdG9JbmRleGVkT2JqZWN0KGl0ZXJhdGVkKSwgLy8gdGFyZ2V0XG4gICAgaW5kZXg6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gICAga2luZDoga2luZCAgICAgICAgICAgICAgICAgICAgICAgICAvLyBraW5kXG4gIH0pO1xuLy8gYCVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWFycmF5aXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHRhcmdldCA9IHN0YXRlLnRhcmdldDtcbiAgdmFyIGtpbmQgPSBzdGF0ZS5raW5kO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleCsrO1xuICBpZiAoIXRhcmdldCB8fCBpbmRleCA+PSB0YXJnZXQubGVuZ3RoKSB7XG4gICAgc3RhdGUudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiB7IHZhbHVlOiBpbmRleCwgZG9uZTogZmFsc2UgfTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiB7IHZhbHVlOiB0YXJnZXRbaW5kZXhdLCBkb25lOiBmYWxzZSB9O1xuICByZXR1cm4geyB2YWx1ZTogW2luZGV4LCB0YXJnZXRbaW5kZXhdXSwgZG9uZTogZmFsc2UgfTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZXVubWFwcGVkYXJndW1lbnRzb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZW1hcHBlZGFyZ3VtZW50c29iamVjdFxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCAidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXRgIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoQ09OVkVSVF9UT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgcG9zKSB7XG4gICAgdmFyIFMgPSB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIHBvc2l0aW9uID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgICB8fCAoc2Vjb25kID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSkpIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRlxuICAgICAgICA/IENPTlZFUlRfVE9fU1RSSU5HID8gUy5jaGFyQXQocG9zaXRpb24pIDogZmlyc3RcbiAgICAgICAgOiBDT05WRVJUX1RPX1NUUklORyA/IFMuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMikgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLmNvZGVwb2ludGF0XG4gIGNvZGVBdDogY3JlYXRlTWV0aG9kKGZhbHNlKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuYXRgIG1ldGhvZFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmF0XG4gIGNoYXJBdDogY3JlYXRlTWV0aG9kKHRydWUpXG59O1xuIiwgIi8vIFRPRE86IHVzZSBzb21ldGhpbmcgbW9yZSBjb21wbGV4IGxpa2UgdGltc29ydD9cbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbnZhciBtZXJnZVNvcnQgPSBmdW5jdGlvbiAoYXJyYXksIGNvbXBhcmVmbikge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB2YXIgbWlkZGxlID0gZmxvb3IobGVuZ3RoIC8gMik7XG4gIHJldHVybiBsZW5ndGggPCA4ID8gaW5zZXJ0aW9uU29ydChhcnJheSwgY29tcGFyZWZuKSA6IG1lcmdlKFxuICAgIG1lcmdlU29ydChhcnJheS5zbGljZSgwLCBtaWRkbGUpLCBjb21wYXJlZm4pLFxuICAgIG1lcmdlU29ydChhcnJheS5zbGljZShtaWRkbGUpLCBjb21wYXJlZm4pLFxuICAgIGNvbXBhcmVmblxuICApO1xufTtcblxudmFyIGluc2VydGlvblNvcnQgPSBmdW5jdGlvbiAoYXJyYXksIGNvbXBhcmVmbikge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB2YXIgaSA9IDE7XG4gIHZhciBlbGVtZW50LCBqO1xuXG4gIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgaiA9IGk7XG4gICAgZWxlbWVudCA9IGFycmF5W2ldO1xuICAgIHdoaWxlIChqICYmIGNvbXBhcmVmbihhcnJheVtqIC0gMV0sIGVsZW1lbnQpID4gMCkge1xuICAgICAgYXJyYXlbal0gPSBhcnJheVstLWpdO1xuICAgIH1cbiAgICBpZiAoaiAhPT0gaSsrKSBhcnJheVtqXSA9IGVsZW1lbnQ7XG4gIH0gcmV0dXJuIGFycmF5O1xufTtcblxudmFyIG1lcmdlID0gZnVuY3Rpb24gKGxlZnQsIHJpZ2h0LCBjb21wYXJlZm4pIHtcbiAgdmFyIGxsZW5ndGggPSBsZWZ0Lmxlbmd0aDtcbiAgdmFyIHJsZW5ndGggPSByaWdodC5sZW5ndGg7XG4gIHZhciBsaW5kZXggPSAwO1xuICB2YXIgcmluZGV4ID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlIChsaW5kZXggPCBsbGVuZ3RoIHx8IHJpbmRleCA8IHJsZW5ndGgpIHtcbiAgICBpZiAobGluZGV4IDwgbGxlbmd0aCAmJiByaW5kZXggPCBybGVuZ3RoKSB7XG4gICAgICByZXN1bHQucHVzaChjb21wYXJlZm4obGVmdFtsaW5kZXhdLCByaWdodFtyaW5kZXhdKSA8PSAwID8gbGVmdFtsaW5kZXgrK10gOiByaWdodFtyaW5kZXgrK10pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChsaW5kZXggPCBsbGVuZ3RoID8gbGVmdFtsaW5kZXgrK10gOiByaWdodFtyaW5kZXgrK10pO1xuICAgIH1cbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZVNvcnQ7XG4iLCAidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgZmlyZWZveCA9IHVzZXJBZ2VudC5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS9pKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhIWZpcmVmb3ggJiYgK2ZpcmVmb3hbMV07XG4iLCAidmFyIFVBID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gL01TSUV8VHJpZGVudC8udGVzdChVQSk7XG4iLCAidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgd2Via2l0ID0gdXNlckFnZW50Lm1hdGNoKC9BcHBsZVdlYktpdFxcLyhcXGQrKVxcLi8pO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICEhd2Via2l0ICYmICt3ZWJraXRbMV07XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAucHJvdG90eXBlLmZsYWdzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRoYXQgPSBhbk9iamVjdCh0aGlzKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAodGhhdC5nbG9iYWwpIHJlc3VsdCArPSAnZyc7XG4gIGlmICh0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmICh0aGF0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKHRoYXQuZG90QWxsKSByZXN1bHQgKz0gJ3MnO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC5zdGlja3kpIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwgInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBiYWJlbC1taW5pZnkgdHJhbnNwaWxlcyBSZWdFeHAoJ2EnLCAneScpIC0+IC9hL3kgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvcixcbnZhciBSRSA9IGZ1bmN0aW9uIChzLCBmKSB7XG4gIHJldHVybiBSZWdFeHAocywgZik7XG59O1xuXG5leHBvcnRzLlVOU1VQUE9SVEVEX1kgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciByZSA9IFJFKCdhJywgJ3knKTtcbiAgcmUubGFzdEluZGV4ID0gMjtcbiAgcmV0dXJuIHJlLmV4ZWMoJ2FiY2QnKSAhPSBudWxsO1xufSk7XG5cbmV4cG9ydHMuQlJPS0VOX0NBUkVUID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD03NzM2ODdcbiAgdmFyIHJlID0gUkUoJ15yJywgJ2d5Jyk7XG4gIHJlLmxhc3RJbmRleCA9IDI7XG4gIHJldHVybiByZS5leGVjKCdzdHInKSAhPSBudWxsO1xufSk7XG4iLCAidmFyIGZhaWxzID0gcmVxdWlyZSgnLi9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCcuJywgJ3MnKSAtPiAvLi9zIGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbiAgdmFyIHJlID0gUmVnRXhwKCcuJywgKHR5cGVvZiAnJykuY2hhckF0KDApKTtcbiAgcmV0dXJuICEocmUuZG90QWxsICYmIHJlLmV4ZWMoJ1xcbicpICYmIHJlLmZsYWdzID09PSAncycpO1xufSk7XG4iLCAidmFyIGZhaWxzID0gcmVxdWlyZSgnLi9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCcuJywgJ2cnKSAtPiAvLi9nIGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbiAgdmFyIHJlID0gUmVnRXhwKCcoPzxhPmIpJywgKHR5cGVvZiAnJykuY2hhckF0KDUpKTtcbiAgcmV0dXJuIHJlLmV4ZWMoJ2InKS5ncm91cHMuYSAhPT0gJ2InIHx8XG4gICAgJ2InLnJlcGxhY2UocmUsICckPGE+YycpICE9PSAnYmMnO1xufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgcmVnZXhwL25vLWFzc2VydGlvbi1jYXB0dXJpbmctZ3JvdXAsIHJlZ2V4cC9uby1lbXB0eS1ncm91cCwgcmVnZXhwL25vLWxhenktZW5kcyAtLSB0ZXN0aW5nICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWdleHAvbm8tdXNlbGVzcy1xdWFudGlmaWVyIC0tIHRlc3RpbmcgKi9cbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciByZWdleHBGbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZmxhZ3MnKTtcbnZhciBzdGlja3lIZWxwZXJzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1zdGlja3ktaGVscGVycycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGdldEludGVybmFsU3RhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKS5nZXQ7XG52YXIgVU5TVVBQT1JURURfRE9UX0FMTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtZG90LWFsbCcpO1xudmFyIFVOU1VQUE9SVEVEX05DRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtbmNnJyk7XG5cbnZhciBuYXRpdmVFeGVjID0gUmVnRXhwLnByb3RvdHlwZS5leGVjO1xudmFyIG5hdGl2ZVJlcGxhY2UgPSBzaGFyZWQoJ25hdGl2ZS1zdHJpbmctcmVwbGFjZScsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG5cbnZhciBwYXRjaGVkRXhlYyA9IG5hdGl2ZUV4ZWM7XG5cbnZhciBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUxID0gL2EvO1xuICB2YXIgcmUyID0gL2IqL2c7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTEsICdhJyk7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTIsICdhJyk7XG4gIHJldHVybiByZTEubGFzdEluZGV4ICE9PSAwIHx8IHJlMi5sYXN0SW5kZXggIT09IDA7XG59KSgpO1xuXG52YXIgVU5TVVBQT1JURURfWSA9IHN0aWNreUhlbHBlcnMuVU5TVVBQT1JURURfWSB8fCBzdGlja3lIZWxwZXJzLkJST0tFTl9DQVJFVDtcblxuLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXAsIGNvcGllZCBmcm9tIGVzNS1zaGltJ3MgU3RyaW5nI3NwbGl0IHBhdGNoLlxudmFyIE5QQ0dfSU5DTFVERUQgPSAvKCk/Py8uZXhlYygnJylbMV0gIT09IHVuZGVmaW5lZDtcblxudmFyIFBBVENIID0gVVBEQVRFU19MQVNUX0lOREVYX1dST05HIHx8IE5QQ0dfSU5DTFVERUQgfHwgVU5TVVBQT1JURURfWSB8fCBVTlNVUFBPUlRFRF9ET1RfQUxMIHx8IFVOU1VQUE9SVEVEX05DRztcblxuaWYgKFBBVENIKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtc3RhdGVtZW50cyAtLSBUT0RPXG4gIHBhdGNoZWRFeGVjID0gZnVuY3Rpb24gZXhlYyhzdHJpbmcpIHtcbiAgICB2YXIgcmUgPSB0aGlzO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUocmUpO1xuICAgIHZhciBzdHIgPSB0b1N0cmluZyhzdHJpbmcpO1xuICAgIHZhciByYXcgPSBzdGF0ZS5yYXc7XG4gICAgdmFyIHJlc3VsdCwgcmVDb3B5LCBsYXN0SW5kZXgsIG1hdGNoLCBpLCBvYmplY3QsIGdyb3VwO1xuXG4gICAgaWYgKHJhdykge1xuICAgICAgcmF3Lmxhc3RJbmRleCA9IHJlLmxhc3RJbmRleDtcbiAgICAgIHJlc3VsdCA9IHBhdGNoZWRFeGVjLmNhbGwocmF3LCBzdHIpO1xuICAgICAgcmUubGFzdEluZGV4ID0gcmF3Lmxhc3RJbmRleDtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdmFyIGdyb3VwcyA9IHN0YXRlLmdyb3VwcztcbiAgICB2YXIgc3RpY2t5ID0gVU5TVVBQT1JURURfWSAmJiByZS5zdGlja3k7XG4gICAgdmFyIGZsYWdzID0gcmVnZXhwRmxhZ3MuY2FsbChyZSk7XG4gICAgdmFyIHNvdXJjZSA9IHJlLnNvdXJjZTtcbiAgICB2YXIgY2hhcnNBZGRlZCA9IDA7XG4gICAgdmFyIHN0ckNvcHkgPSBzdHI7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBmbGFncyA9IGZsYWdzLnJlcGxhY2UoJ3knLCAnJyk7XG4gICAgICBpZiAoZmxhZ3MuaW5kZXhPZignZycpID09PSAtMSkge1xuICAgICAgICBmbGFncyArPSAnZyc7XG4gICAgICB9XG5cbiAgICAgIHN0ckNvcHkgPSBzdHIuc2xpY2UocmUubGFzdEluZGV4KTtcbiAgICAgIC8vIFN1cHBvcnQgYW5jaG9yZWQgc3RpY2t5IGJlaGF2aW9yLlxuICAgICAgaWYgKHJlLmxhc3RJbmRleCA+IDAgJiYgKCFyZS5tdWx0aWxpbmUgfHwgcmUubXVsdGlsaW5lICYmIHN0ci5jaGFyQXQocmUubGFzdEluZGV4IC0gMSkgIT09ICdcXG4nKSkge1xuICAgICAgICBzb3VyY2UgPSAnKD86ICcgKyBzb3VyY2UgKyAnKSc7XG4gICAgICAgIHN0ckNvcHkgPSAnICcgKyBzdHJDb3B5O1xuICAgICAgICBjaGFyc0FkZGVkKys7XG4gICAgICB9XG4gICAgICAvLyBeKD8gKyByeCArICkgaXMgbmVlZGVkLCBpbiBjb21iaW5hdGlvbiB3aXRoIHNvbWUgc3RyIHNsaWNpbmcsIHRvXG4gICAgICAvLyBzaW11bGF0ZSB0aGUgJ3knIGZsYWcuXG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeKD86JyArIHNvdXJjZSArICcpJywgZmxhZ3MpO1xuICAgIH1cblxuICAgIGlmIChOUENHX0lOQ0xVREVEKSB7XG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZSArICckKD8hXFxcXHMpJywgZmxhZ3MpO1xuICAgIH1cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HKSBsYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG5cbiAgICBtYXRjaCA9IG5hdGl2ZUV4ZWMuY2FsbChzdGlja3kgPyByZUNvcHkgOiByZSwgc3RyQ29weSk7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgbWF0Y2guaW5wdXQgPSBtYXRjaC5pbnB1dC5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2guaW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICAgIHJlLmxhc3RJbmRleCArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICB9IGVsc2UgcmUubGFzdEluZGV4ID0gMDtcbiAgICB9IGVsc2UgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyAmJiBtYXRjaCkge1xuICAgICAgcmUubGFzdEluZGV4ID0gcmUuZ2xvYmFsID8gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggOiBsYXN0SW5kZXg7XG4gICAgfVxuICAgIGlmIChOUENHX0lOQ0xVREVEICYmIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgXG4gICAgICAvLyBmb3IgTlBDRywgbGlrZSBJRTguIE5PVEU6IFRoaXMgZG9lc24nIHdvcmsgZm9yIC8oLj8pPy9cbiAgICAgIG5hdGl2ZVJlcGxhY2UuY2FsbChtYXRjaFswXSwgcmVDb3B5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKSBtYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG1hdGNoICYmIGdyb3Vwcykge1xuICAgICAgbWF0Y2guZ3JvdXBzID0gb2JqZWN0ID0gY3JlYXRlKG51bGwpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBncm91cCA9IGdyb3Vwc1tpXTtcbiAgICAgICAgb2JqZWN0W2dyb3VwWzBdXSA9IG1hdGNoW2dyb3VwWzFdXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0Y2hlZEV4ZWM7XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5leGVjYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS5leGVjXG4kKHsgdGFyZ2V0OiAnUmVnRXhwJywgcHJvdG86IHRydWUsIGZvcmNlZDogLy4vLmV4ZWMgIT09IGV4ZWMgfSwge1xuICBleGVjOiBleGVjXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiBSZW1vdmUgZnJvbSBgY29yZS1qc0A0YCBzaW5jZSBpdCdzIG1vdmVkIHRvIGVudHJ5IHBvaW50c1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5yZWdleHAuZXhlYycpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgcmVnZXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgZXhlYywgRk9SQ0VELCBTSEFNKSB7XG4gIHZhciBTWU1CT0wgPSB3ZWxsS25vd25TeW1ib2woS0VZKTtcblxuICB2YXIgREVMRUdBVEVTX1RPX1NZTUJPTCA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3RyaW5nIG1ldGhvZHMgY2FsbCBzeW1ib2wtbmFtZWQgUmVnRXAgbWV0aG9kc1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KTtcblxuICB2YXIgREVMRUdBVEVTX1RPX0VYRUMgPSBERUxFR0FURVNfVE9fU1lNQk9MICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3ltYm9sLW5hbWVkIFJlZ0V4cCBtZXRob2RzIGNhbGwgLmV4ZWNcbiAgICB2YXIgZXhlY0NhbGxlZCA9IGZhbHNlO1xuICAgIHZhciByZSA9IC9hLztcblxuICAgIGlmIChLRVkgPT09ICdzcGxpdCcpIHtcbiAgICAgIC8vIFdlIGNhbid0IHVzZSByZWFsIHJlZ2V4IGhlcmUgc2luY2UgaXQgY2F1c2VzIGRlb3B0aW1pemF0aW9uXG4gICAgICAvLyBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvbiBpbiBWOFxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMwNlxuICAgICAgcmUgPSB7fTtcbiAgICAgIC8vIFJlZ0V4cFtAQHNwbGl0XSBkb2Vzbid0IGNhbGwgdGhlIHJlZ2V4J3MgZXhlYyBtZXRob2QsIGJ1dCBmaXJzdCBjcmVhdGVzXG4gICAgICAvLyBhIG5ldyBvbmUuIFdlIG5lZWQgdG8gcmV0dXJuIHRoZSBwYXRjaGVkIHJlZ2V4IHdoZW4gY3JlYXRpbmcgdGhlIG5ldyBvbmUuXG4gICAgICByZS5jb25zdHJ1Y3RvciA9IHt9O1xuICAgICAgcmUuY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiByZTsgfTtcbiAgICAgIHJlLmZsYWdzID0gJyc7XG4gICAgICByZVtTWU1CT0xdID0gLy4vW1NZTUJPTF07XG4gICAgfVxuXG4gICAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgZXhlY0NhbGxlZCA9IHRydWU7IHJldHVybiBudWxsOyB9O1xuXG4gICAgcmVbU1lNQk9MXSgnJyk7XG4gICAgcmV0dXJuICFleGVjQ2FsbGVkO1xuICB9KTtcblxuICBpZiAoXG4gICAgIURFTEVHQVRFU19UT19TWU1CT0wgfHxcbiAgICAhREVMRUdBVEVTX1RPX0VYRUMgfHxcbiAgICBGT1JDRURcbiAgKSB7XG4gICAgdmFyIG5hdGl2ZVJlZ0V4cE1ldGhvZCA9IC8uL1tTWU1CT0xdO1xuICAgIHZhciBtZXRob2RzID0gZXhlYyhTWU1CT0wsICcnW0tFWV0sIGZ1bmN0aW9uIChuYXRpdmVNZXRob2QsIHJlZ2V4cCwgc3RyLCBhcmcyLCBmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgdmFyICRleGVjID0gcmVnZXhwLmV4ZWM7XG4gICAgICBpZiAoJGV4ZWMgPT09IHJlZ2V4cEV4ZWMgfHwgJGV4ZWMgPT09IFJlZ0V4cFByb3RvdHlwZS5leGVjKSB7XG4gICAgICAgIGlmIChERUxFR0FURVNfVE9fU1lNQk9MICYmICFmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICAgIC8vIFRoZSBuYXRpdmUgU3RyaW5nIG1ldGhvZCBhbHJlYWR5IGRlbGVnYXRlcyB0byBAQG1ldGhvZCAodGhpc1xuICAgICAgICAgIC8vIHBvbHlmaWxsZWQgZnVuY3Rpb24pLCBsZWFzaW5nIHRvIGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgICAgICAgICAvLyBXZSBhdm9pZCBpdCBieSBkaXJlY3RseSBjYWxsaW5nIHRoZSBuYXRpdmUgQEBtZXRob2QgbWV0aG9kLlxuICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVSZWdFeHBNZXRob2QuY2FsbChyZWdleHAsIHN0ciwgYXJnMikgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlTWV0aG9kLmNhbGwoc3RyLCByZWdleHAsIGFyZzIpIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBkb25lOiBmYWxzZSB9O1xuICAgIH0pO1xuXG4gICAgcmVkZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgS0VZLCBtZXRob2RzWzBdKTtcbiAgICByZWRlZmluZShSZWdFeHBQcm90b3R5cGUsIFNZTUJPTCwgbWV0aG9kc1sxXSk7XG4gIH1cblxuICBpZiAoU0hBTSkgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KFJlZ0V4cFByb3RvdHlwZVtTWU1CT0xdLCAnc2hhbScsIHRydWUpO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG5cbi8vIGBBZHZhbmNlU3RyaW5nSW5kZXhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hZHZhbmNlc3RyaW5naW5kZXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFMsIGluZGV4LCB1bmljb2RlKSB7XG4gIHJldHVybiBpbmRleCArICh1bmljb2RlID8gY2hhckF0KFMsIGluZGV4KS5sZW5ndGggOiAxKTtcbn07XG4iLCAidmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xuXG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIHJlcGxhY2UgPSAnJy5yZXBsYWNlO1xudmFyIFNVQlNUSVRVVElPTl9TWU1CT0xTID0gL1xcJChbJCYnYF18XFxkezEsMn18PFtePl0qPikvZztcbnZhciBTVUJTVElUVVRJT05fU1lNQk9MU19OT19OQU1FRCA9IC9cXCQoWyQmJ2BdfFxcZHsxLDJ9KS9nO1xuXG4vLyBgR2V0U3Vic3RpdHV0aW9uYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0c3Vic3RpdHV0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtYXRjaGVkLCBzdHIsIHBvc2l0aW9uLCBjYXB0dXJlcywgbmFtZWRDYXB0dXJlcywgcmVwbGFjZW1lbnQpIHtcbiAgdmFyIHRhaWxQb3MgPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICB2YXIgbSA9IGNhcHR1cmVzLmxlbmd0aDtcbiAgdmFyIHN5bWJvbHMgPSBTVUJTVElUVVRJT05fU1lNQk9MU19OT19OQU1FRDtcbiAgaWYgKG5hbWVkQ2FwdHVyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIG5hbWVkQ2FwdHVyZXMgPSB0b09iamVjdChuYW1lZENhcHR1cmVzKTtcbiAgICBzeW1ib2xzID0gU1VCU1RJVFVUSU9OX1NZTUJPTFM7XG4gIH1cbiAgcmV0dXJuIHJlcGxhY2UuY2FsbChyZXBsYWNlbWVudCwgc3ltYm9scywgZnVuY3Rpb24gKG1hdGNoLCBjaCkge1xuICAgIHZhciBjYXB0dXJlO1xuICAgIHN3aXRjaCAoY2guY2hhckF0KDApKSB7XG4gICAgICBjYXNlICckJzogcmV0dXJuICckJztcbiAgICAgIGNhc2UgJyYnOiByZXR1cm4gbWF0Y2hlZDtcbiAgICAgIGNhc2UgJ2AnOiByZXR1cm4gc3RyLnNsaWNlKDAsIHBvc2l0aW9uKTtcbiAgICAgIGNhc2UgXCInXCI6IHJldHVybiBzdHIuc2xpY2UodGFpbFBvcyk7XG4gICAgICBjYXNlICc8JzpcbiAgICAgICAgY2FwdHVyZSA9IG5hbWVkQ2FwdHVyZXNbY2guc2xpY2UoMSwgLTEpXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBcXGRcXGQ/XG4gICAgICAgIHZhciBuID0gK2NoO1xuICAgICAgICBpZiAobiA9PT0gMCkgcmV0dXJuIG1hdGNoO1xuICAgICAgICBpZiAobiA+IG0pIHtcbiAgICAgICAgICB2YXIgZiA9IGZsb29yKG4gLyAxMCk7XG4gICAgICAgICAgaWYgKGYgPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgICBpZiAoZiA8PSBtKSByZXR1cm4gY2FwdHVyZXNbZiAtIDFdID09PSB1bmRlZmluZWQgPyBjaC5jaGFyQXQoMSkgOiBjYXB0dXJlc1tmIC0gMV0gKyBjaC5jaGFyQXQoMSk7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICB9XG4gICAgICAgIGNhcHR1cmUgPSBjYXB0dXJlc1tuIC0gMV07XG4gICAgfVxuICAgIHJldHVybiBjYXB0dXJlID09PSB1bmRlZmluZWQgPyAnJyA6IGNhcHR1cmU7XG4gIH0pO1xufTtcbiIsICJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vY2xhc3NvZi1yYXcnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi9yZWdleHAtZXhlYycpO1xuXG4vLyBgUmVnRXhwRXhlY2AgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cGV4ZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFIsIFMpIHtcbiAgdmFyIGV4ZWMgPSBSLmV4ZWM7XG4gIGlmICh0eXBlb2YgZXhlYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciByZXN1bHQgPSBleGVjLmNhbGwoUiwgUyk7XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZ0V4cCBleGVjIG1ldGhvZCByZXR1cm5lZCBzb21ldGhpbmcgb3RoZXIgdGhhbiBhbiBPYmplY3Qgb3IgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKGNsYXNzb2YoUikgIT09ICdSZWdFeHAnKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdSZWdFeHAjZXhlYyBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHJlY2VpdmVyJyk7XG4gIH1cblxuICByZXR1cm4gcmVnZXhwRXhlYy5jYWxsKFIsIFMpO1xufTtcblxuIiwgInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xuXG52YXIgcXVvdCA9IC9cIi9nO1xuXG4vLyBgQ3JlYXRlSFRNTGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZWh0bWxcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cmluZywgdGFnLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gIHZhciBTID0gdG9TdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZShzdHJpbmcpKTtcbiAgdmFyIHAxID0gJzwnICsgdGFnO1xuICBpZiAoYXR0cmlidXRlICE9PSAnJykgcDEgKz0gJyAnICsgYXR0cmlidXRlICsgJz1cIicgKyB0b1N0cmluZyh2YWx1ZSkucmVwbGFjZShxdW90LCAnJnF1b3Q7JykgKyAnXCInO1xuICByZXR1cm4gcDEgKyAnPicgKyBTICsgJzwvJyArIHRhZyArICc+Jztcbn07XG4iLCAidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIGNoZWNrIHRoZSBleGlzdGVuY2Ugb2YgYSBtZXRob2QsIGxvd2VyY2FzZVxuLy8gb2YgYSB0YWcgYW5kIGVzY2FwaW5nIHF1b3RlcyBpbiBhcmd1bWVudHNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FKSB7XG4gIHJldHVybiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRlc3QgPSAnJ1tNRVRIT0RfTkFNRV0oJ1wiJyk7XG4gICAgcmV0dXJuIHRlc3QgIT09IHRlc3QudG9Mb3dlckNhc2UoKSB8fCB0ZXN0LnNwbGl0KCdcIicpLmxlbmd0aCA+IDM7XG4gIH0pO1xufTtcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5Qcm9taXNlO1xuIiwgInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgb3B0aW9ucykge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSByZWRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0sIG9wdGlvbnMpO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09OU1RSVUNUT1JfTkFNRSkge1xuICB2YXIgQ29uc3RydWN0b3IgPSBnZXRCdWlsdEluKENPTlNUUlVDVE9SX05BTUUpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuXG4gIGlmIChERVNDUklQVE9SUyAmJiBDb25zdHJ1Y3RvciAmJiAhQ29uc3RydWN0b3JbU1BFQ0lFU10pIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgU1BFQ0lFUywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gICAgfSk7XG4gIH1cbn07XG4iLCAibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvcnJlY3QgJyArIChuYW1lID8gbmFtZSArICcgJyA6ICcnKSArICdpbnZvY2F0aW9uJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsICJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG90eXBlW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcbiIsICJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCAidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvcikge1xuICB2YXIgcmV0dXJuTWV0aG9kID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICBpZiAocmV0dXJuTWV0aG9kICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYW5PYmplY3QocmV0dXJuTWV0aG9kLmNhbGwoaXRlcmF0b3IpKS52YWx1ZTtcbiAgfVxufTtcbiIsICJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNBcnJheUl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgZ2V0SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIGl0ZXJhdG9yQ2xvc2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY2xvc2UnKTtcblxudmFyIFJlc3VsdCA9IGZ1bmN0aW9uIChzdG9wcGVkLCByZXN1bHQpIHtcbiAgdGhpcy5zdG9wcGVkID0gc3RvcHBlZDtcbiAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgdW5ib3VuZEZ1bmN0aW9uLCBvcHRpb25zKSB7XG4gIHZhciB0aGF0ID0gb3B0aW9ucyAmJiBvcHRpb25zLnRoYXQ7XG4gIHZhciBBU19FTlRSSUVTID0gISEob3B0aW9ucyAmJiBvcHRpb25zLkFTX0VOVFJJRVMpO1xuICB2YXIgSVNfSVRFUkFUT1IgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuSVNfSVRFUkFUT1IpO1xuICB2YXIgSU5URVJSVVBURUQgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuSU5URVJSVVBURUQpO1xuICB2YXIgZm4gPSBiaW5kKHVuYm91bmRGdW5jdGlvbiwgdGhhdCwgMSArIEFTX0VOVFJJRVMgKyBJTlRFUlJVUFRFRCk7XG4gIHZhciBpdGVyYXRvciwgaXRlckZuLCBpbmRleCwgbGVuZ3RoLCByZXN1bHQsIG5leHQsIHN0ZXA7XG5cbiAgdmFyIHN0b3AgPSBmdW5jdGlvbiAoY29uZGl0aW9uKSB7XG4gICAgaWYgKGl0ZXJhdG9yKSBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcbiAgICByZXR1cm4gbmV3IFJlc3VsdCh0cnVlLCBjb25kaXRpb24pO1xuICB9O1xuXG4gIHZhciBjYWxsRm4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoQVNfRU5UUklFUykge1xuICAgICAgYW5PYmplY3QodmFsdWUpO1xuICAgICAgcmV0dXJuIElOVEVSUlVQVEVEID8gZm4odmFsdWVbMF0sIHZhbHVlWzFdLCBzdG9wKSA6IGZuKHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG4gICAgfSByZXR1cm4gSU5URVJSVVBURUQgPyBmbih2YWx1ZSwgc3RvcCkgOiBmbih2YWx1ZSk7XG4gIH07XG5cbiAgaWYgKElTX0lURVJBVE9SKSB7XG4gICAgaXRlcmF0b3IgPSBpdGVyYWJsZTtcbiAgfSBlbHNlIHtcbiAgICBpdGVyRm4gPSBnZXRJdGVyYXRvck1ldGhvZChpdGVyYWJsZSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKCdUYXJnZXQgaXMgbm90IGl0ZXJhYmxlJyk7XG4gICAgLy8gb3B0aW1pc2F0aW9uIGZvciBhcnJheSBpdGVyYXRvcnNcbiAgICBpZiAoaXNBcnJheUl0ZXJhdG9yTWV0aG9kKGl0ZXJGbikpIHtcbiAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgICByZXN1bHQgPSBjYWxsRm4oaXRlcmFibGVbaW5kZXhdKTtcbiAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQgaW5zdGFuY2VvZiBSZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICB9IHJldHVybiBuZXcgUmVzdWx0KGZhbHNlKTtcbiAgICB9XG4gICAgaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7XG4gIH1cblxuICBuZXh0ID0gaXRlcmF0b3IubmV4dDtcbiAgd2hpbGUgKCEoc3RlcCA9IG5leHQuY2FsbChpdGVyYXRvcikpLmRvbmUpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gY2FsbEZuKHN0ZXAudmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAnb2JqZWN0JyAmJiByZXN1bHQgJiYgcmVzdWx0IGluc3RhbmNlb2YgUmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICB9IHJldHVybiBuZXcgUmVzdWx0KGZhbHNlKTtcbn07XG4iLCAidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciBjYWxsZWQgPSAwO1xuICB2YXIgaXRlcmF0b3JXaXRoUmV0dXJuID0ge1xuICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7IGRvbmU6ICEhY2FsbGVkKysgfTtcbiAgICB9LFxuICAgICdyZXR1cm4nOiBmdW5jdGlvbiAoKSB7XG4gICAgICBTQUZFX0NMT1NJTkcgPSB0cnVlO1xuICAgIH1cbiAgfTtcbiAgaXRlcmF0b3JXaXRoUmV0dXJuW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWFycmF5LWZyb20sIG5vLXRocm93LWxpdGVyYWwgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgQXJyYXkuZnJvbShpdGVyYXRvcldpdGhSZXR1cm4sIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIFNLSVBfQ0xPU0lORykge1xuICBpZiAoIVNLSVBfQ0xPU0lORyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBJVEVSQVRJT05fU1VQUE9SVCA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICBvYmplY3RbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB7IGRvbmU6IElURVJBVElPTl9TVVBQT1JUID0gdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgZXhlYyhvYmplY3QpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBJVEVSQVRJT05fU1VQUE9SVDtcbn07XG4iLCAidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbi8vIGBTcGVjaWVzQ29uc3RydWN0b3JgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zcGVjaWVzY29uc3RydWN0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGRlZmF1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBkZWZhdWx0Q29uc3RydWN0b3IgOiBhRnVuY3Rpb24oUyk7XG59O1xuIiwgInZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAvKD86aXBob25lfGlwb2R8aXBhZCkuKmFwcGxld2Via2l0L2kudGVzdCh1c2VyQWdlbnQpO1xuIiwgInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzb2YoZ2xvYmFsLnByb2Nlc3MpID09ICdwcm9jZXNzJztcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgSVNfSU9TID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MnKTtcbnZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG5cbnZhciBzZXQgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xudmFyIGNsZWFyID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBNZXNzYWdlQ2hhbm5lbCA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbDtcbnZhciBEaXNwYXRjaCA9IGdsb2JhbC5EaXNwYXRjaDtcbnZhciBjb3VudGVyID0gMDtcbnZhciBxdWV1ZSA9IHt9O1xudmFyIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xudmFyIGxvY2F0aW9uLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcblxudHJ5IHtcbiAgLy8gRGVubyB0aHJvd3MgYSBSZWZlcmVuY2VFcnJvciBvbiBgbG9jYXRpb25gIGFjY2VzcyB3aXRob3V0IGAtLWxvY2F0aW9uYCBmbGFnXG4gIGxvY2F0aW9uID0gZ2xvYmFsLmxvY2F0aW9uO1xufSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuXG52YXIgcnVuID0gZnVuY3Rpb24gKGlkKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcblxudmFyIHJ1bm5lciA9IGZ1bmN0aW9uIChpZCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJ1bihpZCk7XG4gIH07XG59O1xuXG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcnVuKGV2ZW50LmRhdGEpO1xufTtcblxudmFyIHBvc3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgLy8gb2xkIGVuZ2luZXMgaGF2ZSBub3QgbG9jYXRpb24ub3JpZ2luXG4gIGdsb2JhbC5wb3N0TWVzc2FnZShTdHJpbmcoaWQpLCBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBsb2NhdGlvbi5ob3N0KTtcbn07XG5cbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmICghc2V0IHx8ICFjbGVhcikge1xuICBzZXQgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBpID0gMTtcbiAgICB3aGlsZSAoYXJndW1lbnRzTGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIHNwZWMgcmVxdWlyZW1lbnRcbiAgICAgICh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pKS5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKElTX05PREUpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhydW5uZXIoaWQpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KHJ1bm5lcihpZCkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgLy8gZXhjZXB0IGlPUyAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82MjRcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCAmJiAhSVNfSU9TKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBiaW5kKHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJlxuICAgIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmXG4gICAgIWdsb2JhbC5pbXBvcnRTY3JpcHRzICYmXG4gICAgbG9jYXRpb24gJiYgbG9jYXRpb24ucHJvdG9jb2wgIT09ICdmaWxlOicgJiZcbiAgICAhZmFpbHMocG9zdClcbiAgKSB7XG4gICAgZGVmZXIgPSBwb3N0O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjcmVhdGVFbGVtZW50KCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4oaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KHJ1bm5lcihpZCksIDApO1xuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBjbGVhcjogY2xlYXJcbn07XG4iLCAidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAvaXBob25lfGlwb2R8aXBhZC9pLnRlc3QodXNlckFnZW50KSAmJiBnbG9iYWwuUGViYmxlICE9PSB1bmRlZmluZWQ7XG4iLCAidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IC93ZWIwcyg/IS4qY2hyb21lKS9pLnRlc3QodXNlckFnZW50KTtcbiIsICJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdGFzaycpLnNldDtcbnZhciBJU19JT1MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLWlvcycpO1xudmFyIElTX0lPU19QRUJCTEUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLWlvcy1wZWJibGUnKTtcbnZhciBJU19XRUJPU19XRUJLSVQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLXdlYm9zLXdlYmtpdCcpO1xudmFyIElTX05PREUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUnKTtcblxudmFyIE11dGF0aW9uT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuLy8gTm9kZS5qcyAxMSBzaG93cyBFeHBlcmltZW50YWxXYXJuaW5nIG9uIGdldHRpbmcgYHF1ZXVlTWljcm90YXNrYFxudmFyIHF1ZXVlTWljcm90YXNrRGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihnbG9iYWwsICdxdWV1ZU1pY3JvdGFzaycpO1xudmFyIHF1ZXVlTWljcm90YXNrID0gcXVldWVNaWNyb3Rhc2tEZXNjcmlwdG9yICYmIHF1ZXVlTWljcm90YXNrRGVzY3JpcHRvci52YWx1ZTtcblxudmFyIGZsdXNoLCBoZWFkLCBsYXN0LCBub3RpZnksIHRvZ2dsZSwgbm9kZSwgcHJvbWlzZSwgdGhlbjtcblxuLy8gbW9kZXJuIGVuZ2luZXMgaGF2ZSBxdWV1ZU1pY3JvdGFzayBtZXRob2RcbmlmICghcXVldWVNaWNyb3Rhc2spIHtcbiAgZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYgKElTX05PREUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoaGVhZCkgbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlciwgZXhjZXB0IGlPUyAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMzlcbiAgLy8gYWxzbyBleGNlcHQgV2ViT1MgV2Via2l0IGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84OThcbiAgaWYgKCFJU19JT1MgJiYgIUlTX05PREUgJiYgIUlTX1dFQk9TX1dFQktJVCAmJiBNdXRhdGlvbk9ic2VydmVyICYmIGRvY3VtZW50KSB7XG4gICAgdG9nZ2xlID0gdHJ1ZTtcbiAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBNdXRhdGlvbk9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoIUlTX0lPU19QRUJCTEUgJiYgUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICAvLyBQcm9taXNlLnJlc29sdmUgd2l0aG91dCBhbiBhcmd1bWVudCB0aHJvd3MgYW4gZXJyb3IgaW4gTEcgV2ViT1MgMlxuICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAvLyB3b3JrYXJvdW5kIG9mIFdlYktpdCB+IGlPUyBTYWZhcmkgMTAuMSBidWdcbiAgICBwcm9taXNlLmNvbnN0cnVjdG9yID0gUHJvbWlzZTtcbiAgICB0aGVuID0gcHJvbWlzZS50aGVuO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoZW4uY2FsbChwcm9taXNlLCBmbHVzaCk7XG4gICAgfTtcbiAgLy8gTm9kZS5qcyB3aXRob3V0IHByb21pc2VzXG4gIH0gZWxzZSBpZiAoSVNfTk9ERSkge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcXVldWVNaWNyb3Rhc2sgfHwgZnVuY3Rpb24gKGZuKSB7XG4gIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgaWYgKCFoZWFkKSB7XG4gICAgaGVhZCA9IHRhc2s7XG4gICAgbm90aWZ5KCk7XG4gIH0gbGFzdCA9IHRhc2s7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xuXG52YXIgUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufTtcblxuLy8gYE5ld1Byb21pc2VDYXBhYmlsaXR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbmV3cHJvbWlzZWNhcGFiaWxpdHlcbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcbiIsICJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuIiwgInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgdmFyIGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZTtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcikge1xuICAgIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBjb25zb2xlLmVycm9yKGEpIDogY29uc29sZS5lcnJvcihhLCBiKTtcbiAgfVxufTtcbiIsICJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6IGZhbHNlLCB2YWx1ZTogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6IHRydWUsIHZhbHVlOiBlcnJvciB9O1xuICB9XG59O1xuIiwgIm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JztcbiIsICJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQnKTtcblxuLy8gYEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbiQoeyB0YXJnZXQ6ICdGdW5jdGlvbicsIHByb3RvOiB0cnVlIH0sIHtcbiAgYmluZDogYmluZFxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcblxudmFyIElTX0NPTkNBVF9TUFJFQURBQkxFID0gd2VsbEtub3duU3ltYm9sKCdpc0NvbmNhdFNwcmVhZGFibGUnKTtcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gMHgxRkZGRkZGRkZGRkZGRjtcbnZhciBNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQgPSAnTWF4aW11bSBhbGxvd2VkIGluZGV4IGV4Y2VlZGVkJztcblxuLy8gV2UgY2FuJ3QgdXNlIHRoaXMgZmVhdHVyZSBkZXRlY3Rpb24gaW4gVjggc2luY2UgaXQgY2F1c2VzXG4vLyBkZW9wdGltaXphdGlvbiBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3OVxudmFyIElTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgPSBWOF9WRVJTSU9OID49IDUxIHx8ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBhcnJheSA9IFtdO1xuICBhcnJheVtJU19DT05DQVRfU1BSRUFEQUJMRV0gPSBmYWxzZTtcbiAgcmV0dXJuIGFycmF5LmNvbmNhdCgpWzBdICE9PSBhcnJheTtcbn0pO1xuXG52YXIgU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnY29uY2F0Jyk7XG5cbnZhciBpc0NvbmNhdFNwcmVhZGFibGUgPSBmdW5jdGlvbiAoTykge1xuICBpZiAoIWlzT2JqZWN0KE8pKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzcHJlYWRhYmxlID0gT1tJU19DT05DQVRfU1BSRUFEQUJMRV07XG4gIHJldHVybiBzcHJlYWRhYmxlICE9PSB1bmRlZmluZWQgPyAhIXNwcmVhZGFibGUgOiBpc0FycmF5KE8pO1xufTtcblxudmFyIEZPUkNFRCA9ICFJU19DT05DQVRfU1BSRUFEQUJMRV9TVVBQT1JUIHx8ICFTUEVDSUVTX1NVUFBPUlQ7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuY29uY2F0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmNvbmNhdFxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQGlzQ29uY2F0U3ByZWFkYWJsZSBhbmQgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQgfSwge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnMgLS0gcmVxdWlyZWQgZm9yIGAubGVuZ3RoYFxuICBjb25jYXQ6IGZ1bmN0aW9uIGNvbmNhdChhcmcpIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBBID0gYXJyYXlTcGVjaWVzQ3JlYXRlKE8sIDApO1xuICAgIHZhciBuID0gMDtcbiAgICB2YXIgaSwgaywgbGVuZ3RoLCBsZW4sIEU7XG4gICAgZm9yIChpID0gLTEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgRSA9IGkgPT09IC0xID8gTyA6IGFyZ3VtZW50c1tpXTtcbiAgICAgIGlmIChpc0NvbmNhdFNwcmVhZGFibGUoRSkpIHtcbiAgICAgICAgbGVuID0gdG9MZW5ndGgoRS5sZW5ndGgpO1xuICAgICAgICBpZiAobiArIGxlbiA+IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgbGVuOyBrKyssIG4rKykgaWYgKGsgaW4gRSkgY3JlYXRlUHJvcGVydHkoQSwgbiwgRVtrXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobiA+PSBNQVhfU0FGRV9JTlRFR0VSKSB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEKTtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkoQSwgbisrLCBFKTtcbiAgICAgIH1cbiAgICB9XG4gICAgQS5sZW5ndGggPSBuO1xuICAgIHJldHVybiBBO1xuICB9XG59KTtcbiIsICJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIEZ1bmN0aW9uUHJvdG90eXBlVG9TdHJpbmcgPSBGdW5jdGlvblByb3RvdHlwZS50b1N0cmluZztcbnZhciBuYW1lUkUgPSAvXlxccypmdW5jdGlvbiAoW14gKF0qKS87XG52YXIgTkFNRSA9ICduYW1lJztcblxuLy8gRnVuY3Rpb24gaW5zdGFuY2VzIGAubmFtZWAgcHJvcGVydHlcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZnVuY3Rpb24taW5zdGFuY2VzLW5hbWVcbmlmIChERVNDUklQVE9SUyAmJiAhKE5BTUUgaW4gRnVuY3Rpb25Qcm90b3R5cGUpKSB7XG4gIGRlZmluZVByb3BlcnR5KEZ1bmN0aW9uUHJvdG90eXBlLCBOQU1FLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uUHJvdG90eXBlVG9TdHJpbmcuY2FsbCh0aGlzKS5tYXRjaChuYW1lUkUpWzFdO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWFycmF5LXByb3RvdHlwZS1mb3JlYWNoIC0tIHNhZmVcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFtdLmZvckVhY2ggIT0gZm9yRWFjaCB9LCB7XG4gIGZvckVhY2g6IGZvckVhY2hcbn0pO1xuIiwgInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgRE9NSXRlcmFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMnKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uUHJvdG90eXBlID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlICYmIENvbGxlY3Rpb25Qcm90b3R5cGUuZm9yRWFjaCAhPT0gZm9yRWFjaCkgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgJ2ZvckVhY2gnLCBmb3JFYWNoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBDb2xsZWN0aW9uUHJvdG90eXBlLmZvckVhY2ggPSBmb3JFYWNoO1xuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJG1hcCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5tYXA7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ21hcCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB9LCB7XG4gIG1hcDogZnVuY3Rpb24gbWFwKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRtYXAodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsICJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSB9LCB7XG4gIHNldFByb3RvdHlwZU9mOiBzZXRQcm90b3R5cGVPZlxufSk7XG4iLCAidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBuYXRpdmVHZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIEZBSUxTX09OX1BSSU1JVElWRVMgPSBmYWlscyhmdW5jdGlvbiAoKSB7IG5hdGl2ZUdldFByb3RvdHlwZU9mKDEpOyB9KTtcblxuLy8gYE9iamVjdC5nZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRwcm90b3R5cGVvZlxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogRkFJTFNfT05fUFJJTUlUSVZFUywgc2hhbTogIUNPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiB9LCB7XG4gIGdldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCkge1xuICAgIHJldHVybiBuYXRpdmVHZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9XG59KTtcblxuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciBuYXRpdmVDb25zdHJ1Y3QgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ2NvbnN0cnVjdCcpO1xuXG4vLyBgUmVmbGVjdC5jb25zdHJ1Y3RgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWZsZWN0LmNvbnN0cnVjdFxuLy8gTVMgRWRnZSBzdXBwb3J0cyBvbmx5IDIgYXJndW1lbnRzIGFuZCBhcmd1bWVudHNMaXN0IGFyZ3VtZW50IGlzIG9wdGlvbmFsXG4vLyBGRiBOaWdodGx5IHNldHMgdGhpcmQgYXJndW1lbnQgYXMgYG5ldy50YXJnZXRgLCBidXQgZG9lcyBub3QgY3JlYXRlIGB0aGlzYCBmcm9tIGl0XG52YXIgTkVXX1RBUkdFVF9CVUcgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuICEobmF0aXZlQ29uc3RydWN0KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgW10sIEYpIGluc3RhbmNlb2YgRik7XG59KTtcbnZhciBBUkdTX0JVRyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIG5hdGl2ZUNvbnN0cnVjdChmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pO1xufSk7XG52YXIgRk9SQ0VEID0gTkVXX1RBUkdFVF9CVUcgfHwgQVJHU19CVUc7XG5cbiQoeyB0YXJnZXQ6ICdSZWZsZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQsIHNoYW06IEZPUkNFRCB9LCB7XG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gY29uc3RydWN0KFRhcmdldCwgYXJncyAvKiAsIG5ld1RhcmdldCAqLykge1xuICAgIGFGdW5jdGlvbihUYXJnZXQpO1xuICAgIGFuT2JqZWN0KGFyZ3MpO1xuICAgIHZhciBuZXdUYXJnZXQgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IFRhcmdldCA6IGFGdW5jdGlvbihhcmd1bWVudHNbMl0pO1xuICAgIGlmIChBUkdTX0JVRyAmJiAhTkVXX1RBUkdFVF9CVUcpIHJldHVybiBuYXRpdmVDb25zdHJ1Y3QoVGFyZ2V0LCBhcmdzLCBuZXdUYXJnZXQpO1xuICAgIGlmIChUYXJnZXQgPT0gbmV3VGFyZ2V0KSB7XG4gICAgICAvLyB3L28gYWx0ZXJlZCBuZXdUYXJnZXQsIG9wdGltaXphdGlvbiBmb3IgMC00IGFyZ3VtZW50c1xuICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgVGFyZ2V0KCk7XG4gICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSk7XG4gICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgIGNhc2UgMzogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgIGNhc2UgNDogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gICAgICB9XG4gICAgICAvLyB3L28gYWx0ZXJlZCBuZXdUYXJnZXQsIGxvdCBvZiBhcmd1bWVudHMgY2FzZVxuICAgICAgdmFyICRhcmdzID0gW251bGxdO1xuICAgICAgJGFyZ3MucHVzaC5hcHBseSgkYXJncywgYXJncyk7XG4gICAgICByZXR1cm4gbmV3IChiaW5kLmFwcGx5KFRhcmdldCwgJGFyZ3MpKSgpO1xuICAgIH1cbiAgICAvLyB3aXRoIGFsdGVyZWQgbmV3VGFyZ2V0LCBub3Qgc3VwcG9ydCBidWlsdC1pbiBjb25zdHJ1Y3RvcnNcbiAgICB2YXIgcHJvdG8gPSBuZXdUYXJnZXQucHJvdG90eXBlO1xuICAgIHZhciBpbnN0YW5jZSA9IGNyZWF0ZShpc09iamVjdChwcm90bykgPyBwcm90byA6IE9iamVjdC5wcm90b3R5cGUpO1xuICAgIHZhciByZXN1bHQgPSBGdW5jdGlvbi5hcHBseS5jYWxsKFRhcmdldCwgaW5zdGFuY2UsIGFyZ3MpO1xuICAgIHJldHVybiBpc09iamVjdChyZXN1bHQpID8gcmVzdWx0IDogaW5zdGFuY2U7XG4gIH1cbn0pO1xuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcblxuLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgY3JlYXRlOiBjcmVhdGVcbn0pO1xuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgb2JqZWN0RGVmaW5lUHJvcGVydHlNb2RpbGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhREVTQ1JJUFRPUlMsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIGRlZmluZVByb3BlcnR5OiBvYmplY3REZWZpbmVQcm9wZXJ0eU1vZGlsZS5mXG59KTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xudmFyICR0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBuYXRpdmVPYmplY3RDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLWV4dGVybmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkJyk7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG5cbnZhciBISURERU4gPSBzaGFyZWRLZXkoJ2hpZGRlbicpO1xudmFyIFNZTUJPTCA9ICdTeW1ib2wnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFRPX1BSSU1JVElWRSA9IHdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNZTUJPTCk7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJHN0cmluZ2lmeSA9IGdldEJ1aWx0SW4oJ0pTT04nLCAnc3RyaW5naWZ5Jyk7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwuZjtcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmY7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvdHlwZVN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzdHJpbmctdG8tc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXRvLXN0cmluZy1yZWdpc3RyeScpO1xudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgVVNFX1NFVFRFUiA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2NyaXB0b3IgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RDcmVhdGUobmF0aXZlRGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24gKE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgdmFyIE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0UHJvdG90eXBlLCBQKTtcbiAgaWYgKE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IpIGRlbGV0ZSBPYmplY3RQcm90b3R5cGVbUF07XG4gIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICBpZiAoT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvciAmJiBPICE9PSBPYmplY3RQcm90b3R5cGUpIHtcbiAgICBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPYmplY3RQcm90b3R5cGUsIFAsIE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IpO1xuICB9XG59IDogbmF0aXZlRGVmaW5lUHJvcGVydHk7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24gKHRhZywgZGVzY3JpcHRpb24pIHtcbiAgdmFyIHN5bWJvbCA9IEFsbFN5bWJvbHNbdGFnXSA9IG5hdGl2ZU9iamVjdENyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzZXRJbnRlcm5hbFN0YXRlKHN5bWJvbCwge1xuICAgIHR5cGU6IFNZTUJPTCxcbiAgICB0YWc6IHRhZyxcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25cbiAgfSk7XG4gIGlmICghREVTQ1JJUFRPUlMpIHN5bWJvbC5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICByZXR1cm4gc3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgaWYgKE8gPT09IE9iamVjdFByb3RvdHlwZSkgJGRlZmluZVByb3BlcnR5KE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIFAsIEF0dHJpYnV0ZXMpO1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleSA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkpIHtcbiAgICBpZiAoIUF0dHJpYnV0ZXMuZW51bWVyYWJsZSkge1xuICAgICAgaWYgKCFoYXMoTywgSElEREVOKSkgbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgSElEREVOLCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwge30pKTtcbiAgICAgIE9bSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhcyhPLCBISURERU4pICYmIE9bSElEREVOXVtrZXldKSBPW0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgQXR0cmlidXRlcyA9IG5hdGl2ZU9iamVjdENyZWF0ZShBdHRyaWJ1dGVzLCB7IGVudW1lcmFibGU6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCBmYWxzZSkgfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzY3JpcHRvcihPLCBrZXksIEF0dHJpYnV0ZXMpO1xuICB9IHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBrZXksIEF0dHJpYnV0ZXMpO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIgcHJvcGVydGllcyA9IHRvSW5kZXhlZE9iamVjdChQcm9wZXJ0aWVzKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKHByb3BlcnRpZXMpLmNvbmNhdCgkZ2V0T3duUHJvcGVydHlTeW1ib2xzKHByb3BlcnRpZXMpKTtcbiAgJGZvckVhY2goa2V5cywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmICghREVTQ1JJUFRPUlMgfHwgJHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocHJvcGVydGllcywga2V5KSkgJGRlZmluZVByb3BlcnR5KE8sIGtleSwgcHJvcGVydGllc1trZXldKTtcbiAgfSk7XG4gIHJldHVybiBPO1xufTtcblxudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gbmF0aXZlT2JqZWN0Q3JlYXRlKE8pIDogJGRlZmluZVByb3BlcnRpZXMobmF0aXZlT2JqZWN0Q3JlYXRlKE8pLCBQcm9wZXJ0aWVzKTtcbn07XG5cbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBQID0gdG9Qcm9wZXJ0eUtleShWKTtcbiAgdmFyIGVudW1lcmFibGUgPSBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHRoaXMsIFApO1xuICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG90eXBlICYmIGhhcyhBbGxTeW1ib2xzLCBQKSAmJiAhaGFzKE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIFApKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBlbnVtZXJhYmxlIHx8ICFoYXModGhpcywgUCkgfHwgIWhhcyhBbGxTeW1ib2xzLCBQKSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1bUF0gPyBlbnVtZXJhYmxlIDogdHJ1ZTtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgdmFyIGl0ID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICB2YXIga2V5ID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90b3R5cGUgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBkZXNjcmlwdG9yID0gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpO1xuICBpZiAoZGVzY3JpcHRvciAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSB7XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICB2YXIgbmFtZXMgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKHRvSW5kZXhlZE9iamVjdChPKSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgJGZvckVhY2gobmFtZXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoaGlkZGVuS2V5cywga2V5KSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhPKSB7XG4gIHZhciBJU19PQkpFQ1RfUFJPVE9UWVBFID0gTyA9PT0gT2JqZWN0UHJvdG90eXBlO1xuICB2YXIgbmFtZXMgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKElTX09CSkVDVF9QUk9UT1RZUEUgPyBPYmplY3RQcm90b3R5cGVTeW1ib2xzIDogdG9JbmRleGVkT2JqZWN0KE8pKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICAkZm9yRWFjaChuYW1lcywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSAmJiAoIUlTX09CSkVDVF9QUk9UT1RZUEUgfHwgaGFzKE9iamVjdFByb3RvdHlwZSwga2V5KSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIGBTeW1ib2xgIGNvbnN0cnVjdG9yXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC1jb25zdHJ1Y3RvclxuaWYgKCFOQVRJVkVfU1lNQk9MKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKSB0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuICAgIHZhciBkZXNjcmlwdGlvbiA9ICFhcmd1bWVudHMubGVuZ3RoIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogJHRvU3RyaW5nKGFyZ3VtZW50c1swXSk7XG4gICAgdmFyIHRhZyA9IHVpZChkZXNjcmlwdGlvbik7XG4gICAgdmFyIHNldHRlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvdHlwZSkgc2V0dGVyLmNhbGwoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYgKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpIHRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjcmlwdG9yKHRoaXMsIHRhZywgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZiAoREVTQ1JJUFRPUlMgJiYgVVNFX1NFVFRFUikgc2V0U3ltYm9sRGVzY3JpcHRvcihPYmplY3RQcm90b3R5cGUsIHRhZywgeyBjb25maWd1cmFibGU6IHRydWUsIHNldDogc2V0dGVyIH0pO1xuICAgIHJldHVybiB3cmFwKHRhZywgZGVzY3JpcHRpb24pO1xuICB9O1xuXG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGdldEludGVybmFsU3RhdGUodGhpcykudGFnO1xuICB9KTtcblxuICByZWRlZmluZSgkU3ltYm9sLCAnd2l0aG91dFNldHRlcicsIGZ1bmN0aW9uIChkZXNjcmlwdGlvbikge1xuICAgIHJldHVybiB3cmFwKHVpZChkZXNjcmlwdGlvbiksIGRlc2NyaXB0aW9uKTtcbiAgfSk7XG5cbiAgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZiA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgZGVmaW5lUHJvcGVydHlNb2R1bGUuZiA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlLmYgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZS5mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd3JhcCh3ZWxsS25vd25TeW1ib2wobmFtZSksIG5hbWUpO1xuICB9O1xuXG4gIGlmIChERVNDUklQVE9SUykge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLVN5bWJvbC1kZXNjcmlwdGlvblxuICAgIG5hdGl2ZURlZmluZVByb3BlcnR5KCRTeW1ib2xbUFJPVE9UWVBFXSwgJ2Rlc2NyaXB0aW9uJywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBkZXNjcmlwdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGdldEludGVybmFsU3RhdGUodGhpcykuZGVzY3JpcHRpb247XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFJU19QVVJFKSB7XG4gICAgICByZWRlZmluZShPYmplY3RQcm90b3R5cGUsICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgeyB1bnNhZmU6IHRydWUgfSk7XG4gICAgfVxuICB9XG59XG5cbiQoeyBnbG9iYWw6IHRydWUsIHdyYXA6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wsIHNoYW06ICFOQVRJVkVfU1lNQk9MIH0sIHtcbiAgU3ltYm9sOiAkU3ltYm9sXG59KTtcblxuJGZvckVhY2gob2JqZWN0S2V5cyhXZWxsS25vd25TeW1ib2xzU3RvcmUpLCBmdW5jdGlvbiAobmFtZSkge1xuICBkZWZpbmVXZWxsS25vd25TeW1ib2wobmFtZSk7XG59KTtcblxuJCh7IHRhcmdldDogU1lNQk9MLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MIH0sIHtcbiAgLy8gYFN5bWJvbC5mb3JgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5mb3JcbiAgJ2Zvcic6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgc3RyaW5nID0gJHRvU3RyaW5nKGtleSk7XG4gICAgaWYgKGhhcyhTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5LCBzdHJpbmcpKSByZXR1cm4gU3RyaW5nVG9TeW1ib2xSZWdpc3RyeVtzdHJpbmddO1xuICAgIHZhciBzeW1ib2wgPSAkU3ltYm9sKHN0cmluZyk7XG4gICAgU3RyaW5nVG9TeW1ib2xSZWdpc3RyeVtzdHJpbmddID0gc3ltYm9sO1xuICAgIFN5bWJvbFRvU3RyaW5nUmVnaXN0cnlbc3ltYm9sXSA9IHN0cmluZztcbiAgICByZXR1cm4gc3ltYm9sO1xuICB9LFxuICAvLyBgU3ltYm9sLmtleUZvcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLmtleWZvclxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCcpO1xuICAgIGlmIChoYXMoU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSwgc3ltKSkgcmV0dXJuIFN5bWJvbFRvU3RyaW5nUmVnaXN0cnlbc3ltXTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbiAoKSB7IFVTRV9TRVRURVIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgVVNFX1NFVFRFUiA9IGZhbHNlOyB9XG59KTtcblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIC8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yc1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Jcbn0pO1xuXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCB9LCB7XG4gIC8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlzeW1ib2xzXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIENocm9tZSAzOCBhbmQgMzkgYE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNgIGZhaWxzIG9uIHByaW1pdGl2ZXNcbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTM0NDNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IGZhaWxzKGZ1bmN0aW9uICgpIHsgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYoMSk7IH0pIH0sIHtcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYodG9PYmplY3QoaXQpKTtcbiAgfVxufSk7XG5cbi8vIGBKU09OLnN0cmluZ2lmeWAgbWV0aG9kIGJlaGF2aW9yIHdpdGggc3ltYm9sc1xuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1qc29uLnN0cmluZ2lmeVxuaWYgKCRzdHJpbmdpZnkpIHtcbiAgdmFyIEZPUkNFRF9KU09OX1NUUklOR0lGWSA9ICFOQVRJVkVfU1lNQk9MIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3ltYm9sID0gJFN5bWJvbCgpO1xuICAgIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gICAgcmV0dXJuICRzdHJpbmdpZnkoW3N5bWJvbF0pICE9ICdbbnVsbF0nXG4gICAgICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgICAgIHx8ICRzdHJpbmdpZnkoeyBhOiBzeW1ib2wgfSkgIT0gJ3t9J1xuICAgICAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgICAgIHx8ICRzdHJpbmdpZnkoT2JqZWN0KHN5bWJvbCkpICE9ICd7fSc7XG4gIH0pO1xuXG4gICQoeyB0YXJnZXQ6ICdKU09OJywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGT1JDRURfSlNPTl9TVFJJTkdJRlkgfSwge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycyAtLSByZXF1aXJlZCBmb3IgYC5sZW5ndGhgXG4gICAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQsIHJlcGxhY2VyLCBzcGFjZSkge1xuICAgICAgdmFyIGFyZ3MgPSBbaXRdO1xuICAgICAgdmFyIGluZGV4ID0gMTtcbiAgICAgIHZhciAkcmVwbGFjZXI7XG4gICAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGluZGV4KSBhcmdzLnB1c2goYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICAgICRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgICAgaWYgKCFpc09iamVjdChyZXBsYWNlcikgJiYgaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpIHJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgICAgaWYgKCFpc0FycmF5KHJlcGxhY2VyKSkgcmVwbGFjZXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mICRyZXBsYWNlciA9PSAnZnVuY3Rpb24nKSB2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgICBpZiAoIWlzU3ltYm9sKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICAgIHJldHVybiAkc3RyaW5naWZ5LmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIGBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnByb3RvdHlwZS1AQHRvcHJpbWl0aXZlXG5pZiAoISRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdKSB7XG4gIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xufVxuLy8gYFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11gIHByb3BlcnR5XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5wcm90b3R5cGUtQEB0b3N0cmluZ3RhZ1xuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgU1lNQk9MKTtcblxuaGlkZGVuS2V5c1tISURERU5dID0gdHJ1ZTtcbiIsICIvLyBgU3ltYm9sLnByb3RvdHlwZS5kZXNjcmlwdGlvbmAgZ2V0dGVyXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5wcm90b3R5cGUuZGVzY3JpcHRpb25cbid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcbnZhciBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcycpO1xuXG52YXIgTmF0aXZlU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcblxuaWYgKERFU0NSSVBUT1JTICYmIHR5cGVvZiBOYXRpdmVTeW1ib2wgPT0gJ2Z1bmN0aW9uJyAmJiAoISgnZGVzY3JpcHRpb24nIGluIE5hdGl2ZVN5bWJvbC5wcm90b3R5cGUpIHx8XG4gIC8vIFNhZmFyaSAxMiBidWdcbiAgTmF0aXZlU3ltYm9sKCkuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZFxuKSkge1xuICB2YXIgRW1wdHlTdHJpbmdEZXNjcmlwdGlvblN0b3JlID0ge307XG4gIC8vIHdyYXAgU3ltYm9sIGNvbnN0cnVjdG9yIGZvciBjb3JyZWN0IHdvcmsgd2l0aCB1bmRlZmluZWQgZGVzY3JpcHRpb25cbiAgdmFyIFN5bWJvbFdyYXBwZXIgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgdmFyIGRlc2NyaXB0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA8IDEgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBTdHJpbmcoYXJndW1lbnRzWzBdKTtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcyBpbnN0YW5jZW9mIFN5bWJvbFdyYXBwZXJcbiAgICAgID8gbmV3IE5hdGl2ZVN5bWJvbChkZXNjcmlwdGlvbilcbiAgICAgIC8vIGluIEVkZ2UgMTMsIFN0cmluZyhTeW1ib2wodW5kZWZpbmVkKSkgPT09ICdTeW1ib2wodW5kZWZpbmVkKSdcbiAgICAgIDogZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCA/IE5hdGl2ZVN5bWJvbCgpIDogTmF0aXZlU3ltYm9sKGRlc2NyaXB0aW9uKTtcbiAgICBpZiAoZGVzY3JpcHRpb24gPT09ICcnKSBFbXB0eVN0cmluZ0Rlc2NyaXB0aW9uU3RvcmVbcmVzdWx0XSA9IHRydWU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyhTeW1ib2xXcmFwcGVyLCBOYXRpdmVTeW1ib2wpO1xuICB2YXIgc3ltYm9sUHJvdG90eXBlID0gU3ltYm9sV3JhcHBlci5wcm90b3R5cGUgPSBOYXRpdmVTeW1ib2wucHJvdG90eXBlO1xuICBzeW1ib2xQcm90b3R5cGUuY29uc3RydWN0b3IgPSBTeW1ib2xXcmFwcGVyO1xuXG4gIHZhciBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIG5hdGl2ZSA9IFN0cmluZyhOYXRpdmVTeW1ib2woJ3Rlc3QnKSkgPT0gJ1N5bWJvbCh0ZXN0KSc7XG4gIHZhciByZWdleHAgPSAvXlN5bWJvbFxcKCguKilcXClbXildKyQvO1xuICBkZWZpbmVQcm9wZXJ0eShzeW1ib2xQcm90b3R5cGUsICdkZXNjcmlwdGlvbicsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBkZXNjcmlwdGlvbigpIHtcbiAgICAgIHZhciBzeW1ib2wgPSBpc09iamVjdCh0aGlzKSA/IHRoaXMudmFsdWVPZigpIDogdGhpcztcbiAgICAgIHZhciBzdHJpbmcgPSBzeW1ib2xUb1N0cmluZy5jYWxsKHN5bWJvbCk7XG4gICAgICBpZiAoaGFzKEVtcHR5U3RyaW5nRGVzY3JpcHRpb25TdG9yZSwgc3ltYm9sKSkgcmV0dXJuICcnO1xuICAgICAgdmFyIGRlc2MgPSBuYXRpdmUgPyBzdHJpbmcuc2xpY2UoNywgLTEpIDogc3RyaW5nLnJlcGxhY2UocmVnZXhwLCAnJDEnKTtcbiAgICAgIHJldHVybiBkZXNjID09PSAnJyA/IHVuZGVmaW5lZCA6IGRlc2M7XG4gICAgfVxuICB9KTtcblxuICAkKHsgZ2xvYmFsOiB0cnVlLCBmb3JjZWQ6IHRydWUgfSwge1xuICAgIFN5bWJvbDogU3ltYm9sV3JhcHBlclxuICB9KTtcbn1cbiIsICJ2YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXRvLXN0cmluZycpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbmlmICghVE9fU1RSSU5HX1RBR19TVVBQT1JUKSB7XG4gIHJlZGVmaW5lKE9iamVjdC5wcm90b3R5cGUsICd0b1N0cmluZycsIHRvU3RyaW5nLCB7IHVuc2FmZTogdHJ1ZSB9KTtcbn1cbiIsICJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLml0ZXJhdG9yYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuaXRlcmF0b3JcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbiIsICJmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5mdW5jdGlvbi5iaW5kLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuY29uY2F0LmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuZnVuY3Rpb24ubmFtZS5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5mb3ItZWFjaC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lm1hcC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5yZWZsZWN0LmNvbnN0cnVjdC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC5jcmVhdGUuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3ltYm9sLmRlc2NyaXB0aW9uLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnRvLXN0cmluZy5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLnN5bWJvbC5pdGVyYXRvci5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvci5qc1wiO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gZWxzZSBpZiAoY2FsbCAhPT0gdm9pZCAwKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJEZXJpdmVkIGNvbnN0cnVjdG9ycyBtYXkgb25seSByZXR1cm4gb2JqZWN0IG9yIHVuZGVmaW5lZFwiKTsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBjbG9uZUVsZW1lbnQsIEZyYWdtZW50IH0gZnJvbSAncHJlYWN0JztcblxudmFyIE5hdnMgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKE5hdnMsIF9Db21wb25lbnQpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoTmF2cyk7XG5cbiAgZnVuY3Rpb24gTmF2cyhwcm9wcykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOYXZzKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcHJvcHMpO1xuICAgIF90aGlzLmZpcnN0TmF2VmFsdWUgPSBfdGhpcy5maXJzdE5hdlZhbHVlLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLmFkZENoaWxkUHJvcHMgPSBfdGhpcy5hZGRDaGlsZFByb3BzLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLmdldENvbnRlbnQgPSBfdGhpcy5nZXRDb250ZW50LmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuXG4gICAgdmFyIHRhYnNldElkID0gX3RoaXMubmV3SWQoKTtcblxuICAgIHZhciBzZWxlY3RlZCA9IHByb3BzLnNlbGVjdGVkID8gcHJvcHMuc2VsZWN0ZWQgOiBfdGhpcy5maXJzdE5hdlZhbHVlKHByb3BzLmNoaWxkcmVuKTtcblxuICAgIHZhciBjaGlsZHJlbiA9IF90aGlzLmFkZENoaWxkUHJvcHMocHJvcHMuY2hpbGRyZW4sIHRhYnNldElkLCBzZWxlY3RlZCk7XG5cbiAgICB2YXIgY29udGVudCA9IF90aGlzLmdldENvbnRlbnQoY2hpbGRyZW4pO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICB0YWJzZXRJZDogdGFic2V0SWQsXG4gICAgICBzZWxlY3RlZDogc2VsZWN0ZWQsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICBjb250ZW50OiBjb250ZW50XG4gICAgfTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTmF2cywgW3tcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgdWxDbGFzcyA9IFwibmF2IG5hdi1cIi5jb25jYXQocHJvcHMudHlwZSwgXCIgXCIpLmNvbmNhdChwcm9wcy5pZCA/ICdzaGlueS10YWItaW5wdXQnIDogJycpO1xuICAgICAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEZyYWdtZW50LCBudWxsLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtcbiAgICAgICAgaWQ6IHByb3BzLmlkLFxuICAgICAgICBjbGFzc05hbWU6IHVsQ2xhc3MsXG4gICAgICAgIHJvbGU6IFwidGFibGlzdFwiLFxuICAgICAgICBcImRhdGEtdGFic2V0aWRcIjogdGhpcy5zdGF0ZS50YWJzZXRJZFxuICAgICAgfSwgdGhpcy5zdGF0ZS5jaGlsZHJlbiksIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBcInRhYi1jb250ZW50XCIsXG4gICAgICAgIFwiZGF0YS10YWJzZXRpZFwiOiB0aGlzLnN0YXRlLnRhYnNldElkXG4gICAgICB9LCBwcm9wcy5oZWFkZXIsIHRoaXMuc3RhdGUuY29udGVudCwgcHJvcHMuZm9vdGVyKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZpcnN0TmF2VmFsdWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmlyc3ROYXZWYWx1ZShuYXZzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG5hdiA9IG5hdnNbaV07XG5cbiAgICAgICAgaWYgKG5hdi50eXBlLm5hbWUgPT09ICdOYXYnKSB7XG4gICAgICAgICAgcmV0dXJuIG5hdi5wcm9wcy52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYXYudHlwZS5uYW1lID09PSAnTmF2TWVudScpIHtcbiAgICAgICAgICB0aGlzLmZpcnN0TmF2VmFsdWUobmF2KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDb250ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvbnRlbnQobmF2cykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIHRvQ2hpbGRBcnJheShuYXZzKS5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICh4LnR5cGUubmFtZSA9PT0gJ05hdk1lbnUnKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goX3RoaXMyLmdldENvbnRlbnQoeC5wcm9wcy5jaGlsZHJlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHgudHlwZS5uYW1lID09PSAnTmF2Jykge1xuICAgICAgICAgIHZhciBjbGFzc05hbWUgPSBcInRhYi1wYW5lIFwiLmNvbmNhdCh4LnByb3BzLnNlbGVjdGVkID09PSB4LnByb3BzLnZhbHVlID8gJ2FjdGl2ZScgOiAnJyk7XG4gICAgICAgICAgcmVzdWx0LnB1c2goIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgICAgIGlkOiB4LnByb3BzLmlkLFxuICAgICAgICAgICAgcm9sZTogXCJ0YWJwYW5lbFwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICAgICAgICBrZXk6IHgucHJvcHMuaWRcbiAgICAgICAgICB9LCB4LnByb3BzLmNoaWxkcmVuKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkQ2hpbGRQcm9wc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRDaGlsZFByb3BzKGNoaWxkcmVuLCB0YWJzZXRJZCwgc2VsZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0b0NoaWxkQXJyYXkoY2hpbGRyZW4pLm1hcChmdW5jdGlvbiAoeCwgaWR4KSB7XG4gICAgICAgIGlmICh4LnR5cGUubmFtZSA9PT0gJ05hdk1lbnUnKSB7XG4gICAgICAgICAgdmFyIF90YWJzZXRJZCA9IHRoaXMubmV3SWQoKTtcblxuICAgICAgICAgIHZhciBjaGlsZHJlbl8gPSB0aGlzLmFkZENoaWxkUHJvcHMoeC5wcm9wcy5jaGlsZHJlbiwgX3RhYnNldElkLCBzZWxlY3RlZCk7XG4gICAgICAgICAgcmV0dXJuIGNsb25lRWxlbWVudCh4LCB7XG4gICAgICAgICAgICB0YWJzZXRJZDogX3RhYnNldElkLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkXG4gICAgICAgICAgfSwgY2hpbGRyZW5fKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpZCA9IFwidGFiLVwiLmNvbmNhdCh0YWJzZXRJZCwgXCItXCIpLmNvbmNhdChpZHggKyAxKTtcbiAgICAgICAgcmV0dXJuIGNsb25lRWxlbWVudCh4LCB7XG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJuZXdJZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBuZXdJZCgpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKDEwMDAgKyBNYXRoLnJhbmRvbSgpICogOTAwMCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE5hdnM7XG59KENvbXBvbmVudCk7XG5cbnZhciBOYXZzQ2FyZCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX05hdnMpIHtcbiAgX2luaGVyaXRzKE5hdnNDYXJkLCBfTmF2cyk7XG5cbiAgdmFyIF9zdXBlcjIgPSBfY3JlYXRlU3VwZXIoTmF2c0NhcmQpO1xuXG4gIGZ1bmN0aW9uIE5hdnNDYXJkKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOYXZzQ2FyZCk7XG5cbiAgICByZXR1cm4gX3N1cGVyMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE5hdnNDYXJkLCBbe1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIHByb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciB1bENsYXNzID0gXCJuYXYgbmF2LVwiLmNvbmNhdChwcm9wcy50eXBlLCBcIiBjYXJkLWhlYWRlci1cIikuY29uY2F0KHByb3BzLnR5cGUsIFwiIFwiKS5jb25jYXQocHJvcHMuaWQgPyAnc2hpbnktdGFiLWlucHV0JyA6ICcnKTtcbiAgICAgIHZhciB1bFRhZyA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwge1xuICAgICAgICBpZDogcHJvcHMuaWQsXG4gICAgICAgIGNsYXNzTmFtZTogdWxDbGFzcyxcbiAgICAgICAgcm9sZTogXCJ0YWJsaXN0XCIsXG4gICAgICAgIFwiZGF0YS10YWJzZXRpZFwiOiB0aGlzLnN0YXRlLnRhYnNldElkXG4gICAgICB9LCB0aGlzLnN0YXRlLmNoaWxkcmVuKTtcbiAgICAgIHZhciBkaXZUYWcgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJ0YWItY29udGVudFwiLFxuICAgICAgICBcImRhdGEtdGFic2V0aWRcIjogdGhpcy5zdGF0ZS50YWJzZXRJZFxuICAgICAgfSwgcHJvcHMuaGVhZGVyLCB0aGlzLnN0YXRlLmNvbnRlbnQsIHByb3BzLmZvb3Rlcik7XG4gICAgICB2YXIgYmVsb3cgPSBwcm9wcy5wbGFjZW1lbnQgPT09IFwiYmVsb3dcIjtcbiAgICAgIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJjYXJkXCJcbiAgICAgIH0sIGJlbG93ID8gbnVsbCA6IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBcImNhcmQtaGVhZGVyXCJcbiAgICAgIH0sIFwiIFwiLCB1bFRhZywgXCIgXCIpLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJjYXJkLWJvZHlcIlxuICAgICAgfSwgXCIgXCIsIGRpdlRhZywgXCIgXCIpLCBiZWxvdyA/IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBcImNhcmQtZm9vdGVyXCJcbiAgICAgIH0sIFwiIFwiLCB1bFRhZywgXCIgXCIpIDogbnVsbCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE5hdnNDYXJkO1xufShOYXZzKTtcblxuZnVuY3Rpb24gTmF2KHByb3BzKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtcbiAgICBrZXk6IHByb3BzLmlkLFxuICAgIGNsYXNzTmFtZTogcHJvcHMuc2VsZWN0ZWQgPT09IHByb3BzLnZhbHVlID8gJ2FjdGl2ZScgOiAnJ1xuICB9LCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwge1xuICAgIGhyZWY6ICcjJyArIHByb3BzLmlkLFxuICAgIHJvbGU6IFwidGFiXCIsXG4gICAgXCJkYXRhLXRvZ2dsZVwiOiBcInRhYlwiLFxuICAgIFwiZGF0YS12YWx1ZVwiOiBwcm9wcy52YWx1ZVxuICB9LCBwcm9wcy50aXRsZSkpO1xufVxuXG5mdW5jdGlvbiBOYXZTcGFjZXIocHJvcHMpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6IFwiYnNsaWItbmF2LXNwYWNlclwiXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBOYXZJdGVtKHByb3BzKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtcbiAgICBjbGFzc05hbWU6IFwiZm9ybS1pbmxpbmVcIixcbiAgICBrZXk6IHByb3BzLmlkXG4gIH0sIHByb3BzLmNoaWxkcmVuKTtcbn1cblxuZnVuY3Rpb24gTmF2TWVudShwcm9wcykge1xuICB2YXIgdG9nZ2xlQ2xhc3MgPSBcImRyb3Bkb3duLXRvZ2dsZVwiLmNvbmNhdChwcm9wcy5zZWxlY3RlZCA9PT0gcHJvcHMudmFsdWUgPyAnIGFjdGl2ZScgOiAnJyk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtcbiAgICBjbGFzc05hbWU6IFwiZHJvcGRvd25cIixcbiAgICBrZXk6IHByb3BzLnRhYnNldElkXG4gIH0sIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7XG4gICAgY2xhc3NOYW1lOiB0b2dnbGVDbGFzcyxcbiAgICBcImRhdGEtdG9nZ2xlXCI6IFwiZHJvcGRvd25cIixcbiAgICBocmVmOiBcIiNcIixcbiAgICByb2xlOiBcImJ1dHRvblwiLFxuICAgIFwiYXJpYS1leHBhbmRlZFwiOiBcImZhbHNlXCJcbiAgfSwgcHJvcHMudGl0bGUpLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtcbiAgICBjbGFzc05hbWU6IFwiZHJvcGRvd24tbWVudVwiLFxuICAgIFwiZGF0YS10YWJzZXRpZFwiOiBwcm9wcy50YWJzZXRJZFxuICB9LCBwcm9wcy5jaGlsZHJlbikpO1xufVxuXG53aW5kb3cuTmF2ID0gTmF2O1xud2luZG93Lk5hdlNwYWNlciA9IE5hdlNwYWNlcjtcbndpbmRvdy5OYXZJdGVtID0gTmF2SXRlbTtcbndpbmRvdy5OYXZNZW51ID0gTmF2TWVudTtcbndpbmRvdy5OYXZzID0gTmF2cztcbndpbmRvdy5OYXZzQ2FyZCA9IE5hdnNDYXJkOyIsICIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvcicpO1xuXG52YXIgU1RSSU5HX0lURVJBVE9SID0gJ1N0cmluZyBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihTVFJJTkdfSVRFUkFUT1IpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUtQEBpdGVyYXRvclxuZGVmaW5lSXRlcmF0b3IoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IFNUUklOR19JVEVSQVRPUixcbiAgICBzdHJpbmc6IHRvU3RyaW5nKGl0ZXJhdGVkKSxcbiAgICBpbmRleDogMFxuICB9KTtcbi8vIGAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0lc3RyaW5naXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uIG5leHQoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciBzdHJpbmcgPSBzdGF0ZS5zdHJpbmc7XG4gIHZhciBpbmRleCA9IHN0YXRlLmluZGV4O1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBzdHJpbmcubGVuZ3RoKSByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIHBvaW50ID0gY2hhckF0KHN0cmluZywgaW5kZXgpO1xuICBzdGF0ZS5pbmRleCArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7IHZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2UgfTtcbn0pO1xuIiwgInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgRE9NSXRlcmFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMnKTtcbnZhciBBcnJheUl0ZXJhdG9yTWV0aG9kcyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIEFycmF5VmFsdWVzID0gQXJyYXlJdGVyYXRvck1ldGhvZHMudmFsdWVzO1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uUHJvdG90eXBlID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGUpIHtcbiAgICAvLyBzb21lIENocm9tZSB2ZXJzaW9ucyBoYXZlIG5vbi1jb25maWd1cmFibGUgbWV0aG9kcyBvbiBET01Ub2tlbkxpc3RcbiAgICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl0gIT09IEFycmF5VmFsdWVzKSB0cnkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIENvbGxlY3Rpb25Qcm90b3R5cGVbSVRFUkFUT1JdID0gQXJyYXlWYWx1ZXM7XG4gICAgfVxuICAgIGlmICghQ29sbGVjdGlvblByb3RvdHlwZVtUT19TVFJJTkdfVEFHXSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIENPTExFQ1RJT05fTkFNRSk7XG4gICAgfVxuICAgIGlmIChET01JdGVyYWJsZXNbQ09MTEVDVElPTl9OQU1FXSkgZm9yICh2YXIgTUVUSE9EX05BTUUgaW4gQXJyYXlJdGVyYXRvck1ldGhvZHMpIHtcbiAgICAgIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICAgICAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGVbTUVUSE9EX05BTUVdICE9PSBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV0pIHRyeSB7XG4gICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCBNRVRIT0RfTkFNRSwgQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIENvbGxlY3Rpb25Qcm90b3R5cGVbTUVUSE9EX05BTUVdID0gQXJyYXlJdGVyYXRvck1ldGhvZHNbTUVUSE9EX05BTUVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwgIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLWFycmF5LXByb3RvdHlwZS1pbmRleG9mIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG5cbnZhciBuYXRpdmVJbmRleE9mID0gW10uaW5kZXhPZjtcblxudmFyIE5FR0FUSVZFX1pFUk8gPSAhIW5hdGl2ZUluZGV4T2YgJiYgMSAvIFsxXS5pbmRleE9mKDEsIC0wKSA8IDA7XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2luZGV4T2YnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IE5FR0FUSVZFX1pFUk8gfHwgIVNUUklDVF9NRVRIT0QgfSwge1xuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgcmV0dXJuIE5FR0FUSVZFX1pFUk9cbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICAgID8gbmF0aXZlSW5kZXhPZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IDBcbiAgICAgIDogJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaW50ZXJuYWxTb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNvcnQnKTtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcbnZhciBGRiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtZmYtdmVyc2lvbicpO1xudmFyIElFX09SX0VER0UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLWllLW9yLWVkZ2UnKTtcbnZhciBWOCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIFdFQktJVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtd2Via2l0LXZlcnNpb24nKTtcblxudmFyIHRlc3QgPSBbXTtcbnZhciBuYXRpdmVTb3J0ID0gdGVzdC5zb3J0O1xuXG4vLyBJRTgtXG52YXIgRkFJTFNfT05fVU5ERUZJTkVEID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICB0ZXN0LnNvcnQodW5kZWZpbmVkKTtcbn0pO1xuLy8gVjggYnVnXG52YXIgRkFJTFNfT05fTlVMTCA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdGVzdC5zb3J0KG51bGwpO1xufSk7XG4vLyBPbGQgV2ViS2l0XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ3NvcnQnKTtcblxudmFyIFNUQUJMRV9TT1JUID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZmVhdHVyZSBkZXRlY3Rpb24gY2FuIGJlIHRvbyBzbG93LCBzbyBjaGVjayBlbmdpbmVzIHZlcnNpb25zXG4gIGlmIChWOCkgcmV0dXJuIFY4IDwgNzA7XG4gIGlmIChGRiAmJiBGRiA+IDMpIHJldHVybjtcbiAgaWYgKElFX09SX0VER0UpIHJldHVybiB0cnVlO1xuICBpZiAoV0VCS0lUKSByZXR1cm4gV0VCS0lUIDwgNjAzO1xuXG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIGNvZGUsIGNociwgdmFsdWUsIGluZGV4O1xuXG4gIC8vIGdlbmVyYXRlIGFuIGFycmF5IHdpdGggbW9yZSA1MTIgZWxlbWVudHMgKENoYWtyYSBhbmQgb2xkIFY4IGZhaWxzIG9ubHkgaW4gdGhpcyBjYXNlKVxuICBmb3IgKGNvZGUgPSA2NTsgY29kZSA8IDc2OyBjb2RlKyspIHtcbiAgICBjaHIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuXG4gICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICBjYXNlIDY2OiBjYXNlIDY5OiBjYXNlIDcwOiBjYXNlIDcyOiB2YWx1ZSA9IDM7IGJyZWFrO1xuICAgICAgY2FzZSA2ODogY2FzZSA3MTogdmFsdWUgPSA0OyBicmVhaztcbiAgICAgIGRlZmF1bHQ6IHZhbHVlID0gMjtcbiAgICB9XG5cbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCA0NzsgaW5kZXgrKykge1xuICAgICAgdGVzdC5wdXNoKHsgazogY2hyICsgaW5kZXgsIHY6IHZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHRlc3Quc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYi52IC0gYS52OyB9KTtcblxuICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCB0ZXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNociA9IHRlc3RbaW5kZXhdLmsuY2hhckF0KDApO1xuICAgIGlmIChyZXN1bHQuY2hhckF0KHJlc3VsdC5sZW5ndGggLSAxKSAhPT0gY2hyKSByZXN1bHQgKz0gY2hyO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdCAhPT0gJ0RHQkVGSEFDSUpLJztcbn0pO1xuXG52YXIgRk9SQ0VEID0gRkFJTFNfT05fVU5ERUZJTkVEIHx8ICFGQUlMU19PTl9OVUxMIHx8ICFTVFJJQ1RfTUVUSE9EIHx8ICFTVEFCTEVfU09SVDtcblxudmFyIGdldFNvcnRDb21wYXJlID0gZnVuY3Rpb24gKGNvbXBhcmVmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICBpZiAoeSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gLTE7XG4gICAgaWYgKHggPT09IHVuZGVmaW5lZCkgcmV0dXJuIDE7XG4gICAgaWYgKGNvbXBhcmVmbiAhPT0gdW5kZWZpbmVkKSByZXR1cm4gK2NvbXBhcmVmbih4LCB5KSB8fCAwO1xuICAgIHJldHVybiB0b1N0cmluZyh4KSA+IHRvU3RyaW5nKHkpID8gMSA6IC0xO1xuICB9O1xufTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zb3J0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNvcnRcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIHNvcnQ6IGZ1bmN0aW9uIHNvcnQoY29tcGFyZWZuKSB7XG4gICAgaWYgKGNvbXBhcmVmbiAhPT0gdW5kZWZpbmVkKSBhRnVuY3Rpb24oY29tcGFyZWZuKTtcblxuICAgIHZhciBhcnJheSA9IHRvT2JqZWN0KHRoaXMpO1xuXG4gICAgaWYgKFNUQUJMRV9TT1JUKSByZXR1cm4gY29tcGFyZWZuID09PSB1bmRlZmluZWQgPyBuYXRpdmVTb3J0LmNhbGwoYXJyYXkpIDogbmF0aXZlU29ydC5jYWxsKGFycmF5LCBjb21wYXJlZm4pO1xuXG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdmFyIGFycmF5TGVuZ3RoID0gdG9MZW5ndGgoYXJyYXkubGVuZ3RoKTtcbiAgICB2YXIgaXRlbXNMZW5ndGgsIGluZGV4O1xuXG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgYXJyYXlMZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGlmIChpbmRleCBpbiBhcnJheSkgaXRlbXMucHVzaChhcnJheVtpbmRleF0pO1xuICAgIH1cblxuICAgIGl0ZW1zID0gaW50ZXJuYWxTb3J0KGl0ZW1zLCBnZXRTb3J0Q29tcGFyZShjb21wYXJlZm4pKTtcbiAgICBpdGVtc0xlbmd0aCA9IGl0ZW1zLmxlbmd0aDtcbiAgICBpbmRleCA9IDA7XG5cbiAgICB3aGlsZSAoaW5kZXggPCBpdGVtc0xlbmd0aCkgYXJyYXlbaW5kZXhdID0gaXRlbXNbaW5kZXgrK107XG4gICAgd2hpbGUgKGluZGV4IDwgYXJyYXlMZW5ndGgpIGRlbGV0ZSBhcnJheVtpbmRleCsrXTtcblxuICAgIHJldHVybiBhcnJheTtcbiAgfVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJHNvbWUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuc29tZTtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcblxudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdzb21lJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuc29tZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zb21lXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhU1RSSUNUX01FVEhPRCB9LCB7XG4gIHNvbWU6IGZ1bmN0aW9uIHNvbWUoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICByZXR1cm4gJHNvbWUodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsICJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG5cbi8vIGBBcnJheS5pc0FycmF5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkuaXNhcnJheVxuJCh7IHRhcmdldDogJ0FycmF5Jywgc3RhdDogdHJ1ZSB9LCB7XG4gIGlzQXJyYXk6IGlzQXJyYXlcbn0pO1xuIiwgImltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pbmRleC1vZi5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LnNvcnQuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5zb21lLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaXMtYXJyYXkuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuZXhlYy5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5yZXBsYWNlLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuc2xpY2UuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuc3ViLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZm9yLWVhY2guanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLmZvci1lYWNoLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuZnVuY3Rpb24ubmFtZS5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LnNwbGljZS5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL2VzLm9iamVjdC50by1zdHJpbmcuanNcIjtcbmltcG9ydCBcImNvcmUtanMvbW9kdWxlcy9lcy5wcm9taXNlLmpzXCI7XG5pbXBvcnQgXCJjb3JlLWpzL21vZHVsZXMvZXMuZnVuY3Rpb24uYmluZC5qc1wiO1xuaW1wb3J0IFwiY29yZS1qcy9tb2R1bGVzL3dlYi50aW1lcnMuanNcIjtcbnZhciBuLFxuICAgIGwsXG4gICAgdSxcbiAgICBpLFxuICAgIHQsXG4gICAgbyxcbiAgICByLFxuICAgIGYsXG4gICAgZSA9IHt9LFxuICAgIGMgPSBbXSxcbiAgICBzID0gL2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaTtcblxuZnVuY3Rpb24gYShuLCBsKSB7XG4gIGZvciAodmFyIHUgaW4gbCkge1xuICAgIG5bdV0gPSBsW3VdO1xuICB9XG5cbiAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIGgobikge1xuICB2YXIgbCA9IG4ucGFyZW50Tm9kZTtcbiAgbCAmJiBsLnJlbW92ZUNoaWxkKG4pO1xufVxuXG5mdW5jdGlvbiB2KGwsIHUsIGkpIHtcbiAgdmFyIHQsXG4gICAgICBvLFxuICAgICAgcixcbiAgICAgIGYgPSB7fTtcblxuICBmb3IgKHIgaW4gdSkge1xuICAgIFwia2V5XCIgPT0gciA/IHQgPSB1W3JdIDogXCJyZWZcIiA9PSByID8gbyA9IHVbcl0gOiBmW3JdID0gdVtyXTtcbiAgfVxuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMiAmJiAoZi5jaGlsZHJlbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAzID8gbi5jYWxsKGFyZ3VtZW50cywgMikgOiBpKSwgXCJmdW5jdGlvblwiID09IHR5cGVvZiBsICYmIG51bGwgIT0gbC5kZWZhdWx0UHJvcHMpIGZvciAociBpbiBsLmRlZmF1bHRQcm9wcykge1xuICAgIHZvaWQgMCA9PT0gZltyXSAmJiAoZltyXSA9IGwuZGVmYXVsdFByb3BzW3JdKTtcbiAgfVxuICByZXR1cm4geShsLCBmLCB0LCBvLCBudWxsKTtcbn1cblxuZnVuY3Rpb24geShuLCBpLCB0LCBvLCByKSB7XG4gIHZhciBmID0ge1xuICAgIHR5cGU6IG4sXG4gICAgcHJvcHM6IGksXG4gICAga2V5OiB0LFxuICAgIHJlZjogbyxcbiAgICBfX2s6IG51bGwsXG4gICAgX186IG51bGwsXG4gICAgX19iOiAwLFxuICAgIF9fZTogbnVsbCxcbiAgICBfX2Q6IHZvaWQgMCxcbiAgICBfX2M6IG51bGwsXG4gICAgX19oOiBudWxsLFxuICAgIGNvbnN0cnVjdG9yOiB2b2lkIDAsXG4gICAgX192OiBudWxsID09IHIgPyArK3UgOiByXG4gIH07XG4gIHJldHVybiBudWxsICE9IGwudm5vZGUgJiYgbC52bm9kZShmKSwgZjtcbn1cblxuZnVuY3Rpb24gcCgpIHtcbiAgcmV0dXJuIHtcbiAgICBjdXJyZW50OiBudWxsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGQobikge1xuICByZXR1cm4gbi5jaGlsZHJlbjtcbn1cblxuZnVuY3Rpb24gXyhuLCBsKSB7XG4gIHRoaXMucHJvcHMgPSBuLCB0aGlzLmNvbnRleHQgPSBsO1xufVxuXG5mdW5jdGlvbiBrKG4sIGwpIHtcbiAgaWYgKG51bGwgPT0gbCkgcmV0dXJuIG4uX18gPyBrKG4uX18sIG4uX18uX19rLmluZGV4T2YobikgKyAxKSA6IG51bGw7XG5cbiAgZm9yICh2YXIgdTsgbCA8IG4uX19rLmxlbmd0aDsgbCsrKSB7XG4gICAgaWYgKG51bGwgIT0gKHUgPSBuLl9fa1tsXSkgJiYgbnVsbCAhPSB1Ll9fZSkgcmV0dXJuIHUuX19lO1xuICB9XG5cbiAgcmV0dXJuIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2Ygbi50eXBlID8gayhuKSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGIobikge1xuICB2YXIgbCwgdTtcblxuICBpZiAobnVsbCAhPSAobiA9IG4uX18pICYmIG51bGwgIT0gbi5fX2MpIHtcbiAgICBmb3IgKG4uX19lID0gbi5fX2MuYmFzZSA9IG51bGwsIGwgPSAwOyBsIDwgbi5fX2subGVuZ3RoOyBsKyspIHtcbiAgICAgIGlmIChudWxsICE9ICh1ID0gbi5fX2tbbF0pICYmIG51bGwgIT0gdS5fX2UpIHtcbiAgICAgICAgbi5fX2UgPSBuLl9fYy5iYXNlID0gdS5fX2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBiKG4pO1xuICB9XG59XG5cbmZ1bmN0aW9uIG0obikge1xuICAoIW4uX19kICYmIChuLl9fZCA9ICEwKSAmJiB0LnB1c2gobikgJiYgIWcuX19yKysgfHwgciAhPT0gbC5kZWJvdW5jZVJlbmRlcmluZykgJiYgKChyID0gbC5kZWJvdW5jZVJlbmRlcmluZykgfHwgbykoZyk7XG59XG5cbmZ1bmN0aW9uIGcoKSB7XG4gIGZvciAodmFyIG47IGcuX19yID0gdC5sZW5ndGg7KSB7XG4gICAgbiA9IHQuc29ydChmdW5jdGlvbiAobiwgbCkge1xuICAgICAgcmV0dXJuIG4uX192Ll9fYiAtIGwuX192Ll9fYjtcbiAgICB9KSwgdCA9IFtdLCBuLnNvbWUoZnVuY3Rpb24gKG4pIHtcbiAgICAgIHZhciBsLCB1LCBpLCB0LCBvLCByO1xuICAgICAgbi5fX2QgJiYgKG8gPSAodCA9IChsID0gbikuX192KS5fX2UsIChyID0gbC5fX1ApICYmICh1ID0gW10sIChpID0gYSh7fSwgdCkpLl9fdiA9IHQuX192ICsgMSwgaihyLCB0LCBpLCBsLl9fbiwgdm9pZCAwICE9PSByLm93bmVyU1ZHRWxlbWVudCwgbnVsbCAhPSB0Ll9faCA/IFtvXSA6IG51bGwsIHUsIG51bGwgPT0gbyA/IGsodCkgOiBvLCB0Ll9faCksIHoodSwgdCksIHQuX19lICE9IG8gJiYgYih0KSkpO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHcobiwgbCwgdSwgaSwgdCwgbywgciwgZiwgcywgYSkge1xuICB2YXIgaCxcbiAgICAgIHYsXG4gICAgICBwLFxuICAgICAgXyxcbiAgICAgIGIsXG4gICAgICBtLFxuICAgICAgZyxcbiAgICAgIHcgPSBpICYmIGkuX19rIHx8IGMsXG4gICAgICBBID0gdy5sZW5ndGg7XG5cbiAgZm9yICh1Ll9fayA9IFtdLCBoID0gMDsgaCA8IGwubGVuZ3RoOyBoKyspIHtcbiAgICBpZiAobnVsbCAhPSAoXyA9IHUuX19rW2hdID0gbnVsbCA9PSAoXyA9IGxbaF0pIHx8IFwiYm9vbGVhblwiID09IHR5cGVvZiBfID8gbnVsbCA6IFwic3RyaW5nXCIgPT0gdHlwZW9mIF8gfHwgXCJudW1iZXJcIiA9PSB0eXBlb2YgXyB8fCBcImJpZ2ludFwiID09IHR5cGVvZiBfID8geShudWxsLCBfLCBudWxsLCBudWxsLCBfKSA6IEFycmF5LmlzQXJyYXkoXykgPyB5KGQsIHtcbiAgICAgIGNoaWxkcmVuOiBfXG4gICAgfSwgbnVsbCwgbnVsbCwgbnVsbCkgOiBfLl9fYiA+IDAgPyB5KF8udHlwZSwgXy5wcm9wcywgXy5rZXksIG51bGwsIF8uX192KSA6IF8pKSB7XG4gICAgICBpZiAoXy5fXyA9IHUsIF8uX19iID0gdS5fX2IgKyAxLCBudWxsID09PSAocCA9IHdbaF0pIHx8IHAgJiYgXy5rZXkgPT0gcC5rZXkgJiYgXy50eXBlID09PSBwLnR5cGUpIHdbaF0gPSB2b2lkIDA7ZWxzZSBmb3IgKHYgPSAwOyB2IDwgQTsgdisrKSB7XG4gICAgICAgIGlmICgocCA9IHdbdl0pICYmIF8ua2V5ID09IHAua2V5ICYmIF8udHlwZSA9PT0gcC50eXBlKSB7XG4gICAgICAgICAgd1t2XSA9IHZvaWQgMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHAgPSBudWxsO1xuICAgICAgfVxuICAgICAgaihuLCBfLCBwID0gcCB8fCBlLCB0LCBvLCByLCBmLCBzLCBhKSwgYiA9IF8uX19lLCAodiA9IF8ucmVmKSAmJiBwLnJlZiAhPSB2ICYmIChnIHx8IChnID0gW10pLCBwLnJlZiAmJiBnLnB1c2gocC5yZWYsIG51bGwsIF8pLCBnLnB1c2godiwgXy5fX2MgfHwgYiwgXykpLCBudWxsICE9IGIgPyAobnVsbCA9PSBtICYmIChtID0gYiksIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgXy50eXBlICYmIG51bGwgIT0gXy5fX2sgJiYgXy5fX2sgPT09IHAuX19rID8gXy5fX2QgPSBzID0geChfLCBzLCBuKSA6IHMgPSBQKG4sIF8sIHAsIHcsIGIsIHMpLCBhIHx8IFwib3B0aW9uXCIgIT09IHUudHlwZSA/IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdS50eXBlICYmICh1Ll9fZCA9IHMpIDogbi52YWx1ZSA9IFwiXCIpIDogcyAmJiBwLl9fZSA9PSBzICYmIHMucGFyZW50Tm9kZSAhPSBuICYmIChzID0gayhwKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yICh1Ll9fZSA9IG0sIGggPSBBOyBoLS07KSB7XG4gICAgbnVsbCAhPSB3W2hdICYmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHUudHlwZSAmJiBudWxsICE9IHdbaF0uX19lICYmIHdbaF0uX19lID09IHUuX19kICYmICh1Ll9fZCA9IGsoaSwgaCArIDEpKSwgTih3W2hdLCB3W2hdKSk7XG4gIH1cblxuICBpZiAoZykgZm9yIChoID0gMDsgaCA8IGcubGVuZ3RoOyBoKyspIHtcbiAgICBNKGdbaF0sIGdbKytoXSwgZ1srK2hdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB4KG4sIGwsIHUpIHtcbiAgdmFyIGksIHQ7XG5cbiAgZm9yIChpID0gMDsgaSA8IG4uX19rLmxlbmd0aDsgaSsrKSB7XG4gICAgKHQgPSBuLl9fa1tpXSkgJiYgKHQuX18gPSBuLCBsID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiB0LnR5cGUgPyB4KHQsIGwsIHUpIDogUCh1LCB0LCB0LCBuLl9faywgdC5fX2UsIGwpKTtcbiAgfVxuXG4gIHJldHVybiBsO1xufVxuXG5mdW5jdGlvbiBBKG4sIGwpIHtcbiAgcmV0dXJuIGwgPSBsIHx8IFtdLCBudWxsID09IG4gfHwgXCJib29sZWFuXCIgPT0gdHlwZW9mIG4gfHwgKEFycmF5LmlzQXJyYXkobikgPyBuLnNvbWUoZnVuY3Rpb24gKG4pIHtcbiAgICBBKG4sIGwpO1xuICB9KSA6IGwucHVzaChuKSksIGw7XG59XG5cbmZ1bmN0aW9uIFAobiwgbCwgdSwgaSwgdCwgbykge1xuICB2YXIgciwgZiwgZTtcbiAgaWYgKHZvaWQgMCAhPT0gbC5fX2QpIHIgPSBsLl9fZCwgbC5fX2QgPSB2b2lkIDA7ZWxzZSBpZiAobnVsbCA9PSB1IHx8IHQgIT0gbyB8fCBudWxsID09IHQucGFyZW50Tm9kZSkgbjogaWYgKG51bGwgPT0gbyB8fCBvLnBhcmVudE5vZGUgIT09IG4pIG4uYXBwZW5kQ2hpbGQodCksIHIgPSBudWxsO2Vsc2Uge1xuICAgIGZvciAoZiA9IG8sIGUgPSAwOyAoZiA9IGYubmV4dFNpYmxpbmcpICYmIGUgPCBpLmxlbmd0aDsgZSArPSAyKSB7XG4gICAgICBpZiAoZiA9PSB0KSBicmVhayBuO1xuICAgIH1cblxuICAgIG4uaW5zZXJ0QmVmb3JlKHQsIG8pLCByID0gbztcbiAgfVxuICByZXR1cm4gdm9pZCAwICE9PSByID8gciA6IHQubmV4dFNpYmxpbmc7XG59XG5cbmZ1bmN0aW9uIEMobiwgbCwgdSwgaSwgdCkge1xuICB2YXIgbztcblxuICBmb3IgKG8gaW4gdSkge1xuICAgIFwiY2hpbGRyZW5cIiA9PT0gbyB8fCBcImtleVwiID09PSBvIHx8IG8gaW4gbCB8fCBIKG4sIG8sIG51bGwsIHVbb10sIGkpO1xuICB9XG5cbiAgZm9yIChvIGluIGwpIHtcbiAgICB0ICYmIFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgbFtvXSB8fCBcImNoaWxkcmVuXCIgPT09IG8gfHwgXCJrZXlcIiA9PT0gbyB8fCBcInZhbHVlXCIgPT09IG8gfHwgXCJjaGVja2VkXCIgPT09IG8gfHwgdVtvXSA9PT0gbFtvXSB8fCBIKG4sIG8sIGxbb10sIHVbb10sIGkpO1xuICB9XG59XG5cbmZ1bmN0aW9uICQobiwgbCwgdSkge1xuICBcIi1cIiA9PT0gbFswXSA/IG4uc2V0UHJvcGVydHkobCwgdSkgOiBuW2xdID0gbnVsbCA9PSB1ID8gXCJcIiA6IFwibnVtYmVyXCIgIT0gdHlwZW9mIHUgfHwgcy50ZXN0KGwpID8gdSA6IHUgKyBcInB4XCI7XG59XG5cbmZ1bmN0aW9uIEgobiwgbCwgdSwgaSwgdCkge1xuICB2YXIgbztcblxuICBuOiBpZiAoXCJzdHlsZVwiID09PSBsKSB7XG4gICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIHUpIG4uc3R5bGUuY3NzVGV4dCA9IHU7ZWxzZSB7XG4gICAgICBpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgaSAmJiAobi5zdHlsZS5jc3NUZXh0ID0gaSA9IFwiXCIpLCBpKSBmb3IgKGwgaW4gaSkge1xuICAgICAgICB1ICYmIGwgaW4gdSB8fCAkKG4uc3R5bGUsIGwsIFwiXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHUpIGZvciAobCBpbiB1KSB7XG4gICAgICAgIGkgJiYgdVtsXSA9PT0gaVtsXSB8fCAkKG4uc3R5bGUsIGwsIHVbbF0pO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChcIm9cIiA9PT0gbFswXSAmJiBcIm5cIiA9PT0gbFsxXSkgbyA9IGwgIT09IChsID0gbC5yZXBsYWNlKC9DYXB0dXJlJC8sIFwiXCIpKSwgbCA9IGwudG9Mb3dlckNhc2UoKSBpbiBuID8gbC50b0xvd2VyQ2FzZSgpLnNsaWNlKDIpIDogbC5zbGljZSgyKSwgbi5sIHx8IChuLmwgPSB7fSksIG4ubFtsICsgb10gPSB1LCB1ID8gaSB8fCBuLmFkZEV2ZW50TGlzdGVuZXIobCwgbyA/IFQgOiBJLCBvKSA6IG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsLCBvID8gVCA6IEksIG8pO2Vsc2UgaWYgKFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIiAhPT0gbCkge1xuICAgIGlmICh0KSBsID0gbC5yZXBsYWNlKC94bGlua1tIOmhdLywgXCJoXCIpLnJlcGxhY2UoL3NOYW1lJC8sIFwic1wiKTtlbHNlIGlmIChcImhyZWZcIiAhPT0gbCAmJiBcImxpc3RcIiAhPT0gbCAmJiBcImZvcm1cIiAhPT0gbCAmJiBcInRhYkluZGV4XCIgIT09IGwgJiYgXCJkb3dubG9hZFwiICE9PSBsICYmIGwgaW4gbikgdHJ5IHtcbiAgICAgIG5bbF0gPSBudWxsID09IHUgPyBcIlwiIDogdTtcbiAgICAgIGJyZWFrIG47XG4gICAgfSBjYXRjaCAobikge31cbiAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHUgfHwgKG51bGwgIT0gdSAmJiAoITEgIT09IHUgfHwgXCJhXCIgPT09IGxbMF0gJiYgXCJyXCIgPT09IGxbMV0pID8gbi5zZXRBdHRyaWJ1dGUobCwgdSkgOiBuLnJlbW92ZUF0dHJpYnV0ZShsKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gSShuKSB7XG4gIHRoaXMubFtuLnR5cGUgKyAhMV0obC5ldmVudCA/IGwuZXZlbnQobikgOiBuKTtcbn1cblxuZnVuY3Rpb24gVChuKSB7XG4gIHRoaXMubFtuLnR5cGUgKyAhMF0obC5ldmVudCA/IGwuZXZlbnQobikgOiBuKTtcbn1cblxuZnVuY3Rpb24gaihuLCB1LCBpLCB0LCBvLCByLCBmLCBlLCBjKSB7XG4gIHZhciBzLFxuICAgICAgaCxcbiAgICAgIHYsXG4gICAgICB5LFxuICAgICAgcCxcbiAgICAgIGssXG4gICAgICBiLFxuICAgICAgbSxcbiAgICAgIGcsXG4gICAgICB4LFxuICAgICAgQSxcbiAgICAgIFAgPSB1LnR5cGU7XG4gIGlmICh2b2lkIDAgIT09IHUuY29uc3RydWN0b3IpIHJldHVybiBudWxsO1xuICBudWxsICE9IGkuX19oICYmIChjID0gaS5fX2gsIGUgPSB1Ll9fZSA9IGkuX19lLCB1Ll9faCA9IG51bGwsIHIgPSBbZV0pLCAocyA9IGwuX19iKSAmJiBzKHUpO1xuXG4gIHRyeSB7XG4gICAgbjogaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgUCkge1xuICAgICAgaWYgKG0gPSB1LnByb3BzLCBnID0gKHMgPSBQLmNvbnRleHRUeXBlKSAmJiB0W3MuX19jXSwgeCA9IHMgPyBnID8gZy5wcm9wcy52YWx1ZSA6IHMuX18gOiB0LCBpLl9fYyA/IGIgPSAoaCA9IHUuX19jID0gaS5fX2MpLl9fID0gaC5fX0UgOiAoXCJwcm90b3R5cGVcIiBpbiBQICYmIFAucHJvdG90eXBlLnJlbmRlciA/IHUuX19jID0gaCA9IG5ldyBQKG0sIHgpIDogKHUuX19jID0gaCA9IG5ldyBfKG0sIHgpLCBoLmNvbnN0cnVjdG9yID0gUCwgaC5yZW5kZXIgPSBPKSwgZyAmJiBnLnN1YihoKSwgaC5wcm9wcyA9IG0sIGguc3RhdGUgfHwgKGguc3RhdGUgPSB7fSksIGguY29udGV4dCA9IHgsIGguX19uID0gdCwgdiA9IGguX19kID0gITAsIGguX19oID0gW10pLCBudWxsID09IGguX19zICYmIChoLl9fcyA9IGguc3RhdGUpLCBudWxsICE9IFAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzICYmIChoLl9fcyA9PSBoLnN0YXRlICYmIChoLl9fcyA9IGEoe30sIGguX19zKSksIGEoaC5fX3MsIFAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKG0sIGguX19zKSkpLCB5ID0gaC5wcm9wcywgcCA9IGguc3RhdGUsIHYpIG51bGwgPT0gUC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgJiYgbnVsbCAhPSBoLmNvbXBvbmVudFdpbGxNb3VudCAmJiBoLmNvbXBvbmVudFdpbGxNb3VudCgpLCBudWxsICE9IGguY29tcG9uZW50RGlkTW91bnQgJiYgaC5fX2gucHVzaChoLmNvbXBvbmVudERpZE1vdW50KTtlbHNlIHtcbiAgICAgICAgaWYgKG51bGwgPT0gUC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgJiYgbSAhPT0geSAmJiBudWxsICE9IGguY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAmJiBoLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobSwgeCksICFoLl9fZSAmJiBudWxsICE9IGguc2hvdWxkQ29tcG9uZW50VXBkYXRlICYmICExID09PSBoLnNob3VsZENvbXBvbmVudFVwZGF0ZShtLCBoLl9fcywgeCkgfHwgdS5fX3YgPT09IGkuX192KSB7XG4gICAgICAgICAgaC5wcm9wcyA9IG0sIGguc3RhdGUgPSBoLl9fcywgdS5fX3YgIT09IGkuX192ICYmIChoLl9fZCA9ICExKSwgaC5fX3YgPSB1LCB1Ll9fZSA9IGkuX19lLCB1Ll9fayA9IGkuX19rLCB1Ll9fay5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICBuICYmIChuLl9fID0gdSk7XG4gICAgICAgICAgfSksIGguX19oLmxlbmd0aCAmJiBmLnB1c2goaCk7XG4gICAgICAgICAgYnJlYWsgbjtcbiAgICAgICAgfVxuXG4gICAgICAgIG51bGwgIT0gaC5jb21wb25lbnRXaWxsVXBkYXRlICYmIGguY29tcG9uZW50V2lsbFVwZGF0ZShtLCBoLl9fcywgeCksIG51bGwgIT0gaC5jb21wb25lbnREaWRVcGRhdGUgJiYgaC5fX2gucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaC5jb21wb25lbnREaWRVcGRhdGUoeSwgcCwgayk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaC5jb250ZXh0ID0geCwgaC5wcm9wcyA9IG0sIGguc3RhdGUgPSBoLl9fcywgKHMgPSBsLl9fcikgJiYgcyh1KSwgaC5fX2QgPSAhMSwgaC5fX3YgPSB1LCBoLl9fUCA9IG4sIHMgPSBoLnJlbmRlcihoLnByb3BzLCBoLnN0YXRlLCBoLmNvbnRleHQpLCBoLnN0YXRlID0gaC5fX3MsIG51bGwgIT0gaC5nZXRDaGlsZENvbnRleHQgJiYgKHQgPSBhKGEoe30sIHQpLCBoLmdldENoaWxkQ29udGV4dCgpKSksIHYgfHwgbnVsbCA9PSBoLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlIHx8IChrID0gaC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSh5LCBwKSksIEEgPSBudWxsICE9IHMgJiYgcy50eXBlID09PSBkICYmIG51bGwgPT0gcy5rZXkgPyBzLnByb3BzLmNoaWxkcmVuIDogcywgdyhuLCBBcnJheS5pc0FycmF5KEEpID8gQSA6IFtBXSwgdSwgaSwgdCwgbywgciwgZiwgZSwgYyksIGguYmFzZSA9IHUuX19lLCB1Ll9faCA9IG51bGwsIGguX19oLmxlbmd0aCAmJiBmLnB1c2goaCksIGIgJiYgKGguX19FID0gaC5fXyA9IG51bGwpLCBoLl9fZSA9ICExO1xuICAgIH0gZWxzZSBudWxsID09IHIgJiYgdS5fX3YgPT09IGkuX192ID8gKHUuX19rID0gaS5fX2ssIHUuX19lID0gaS5fX2UpIDogdS5fX2UgPSBMKGkuX19lLCB1LCBpLCB0LCBvLCByLCBmLCBjKTtcblxuICAgIChzID0gbC5kaWZmZWQpICYmIHModSk7XG4gIH0gY2F0Y2ggKG4pIHtcbiAgICB1Ll9fdiA9IG51bGwsIChjIHx8IG51bGwgIT0gcikgJiYgKHUuX19lID0gZSwgdS5fX2ggPSAhIWMsIHJbci5pbmRleE9mKGUpXSA9IG51bGwpLCBsLl9fZShuLCB1LCBpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB6KG4sIHUpIHtcbiAgbC5fX2MgJiYgbC5fX2ModSwgbiksIG4uc29tZShmdW5jdGlvbiAodSkge1xuICAgIHRyeSB7XG4gICAgICBuID0gdS5fX2gsIHUuX19oID0gW10sIG4uc29tZShmdW5jdGlvbiAobikge1xuICAgICAgICBuLmNhbGwodSk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChuKSB7XG4gICAgICBsLl9fZShuLCB1Ll9fdik7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gTChsLCB1LCBpLCB0LCBvLCByLCBmLCBjKSB7XG4gIHZhciBzLFxuICAgICAgYSxcbiAgICAgIHYsXG4gICAgICB5ID0gaS5wcm9wcyxcbiAgICAgIHAgPSB1LnByb3BzLFxuICAgICAgZCA9IHUudHlwZSxcbiAgICAgIF8gPSAwO1xuICBpZiAoXCJzdmdcIiA9PT0gZCAmJiAobyA9ICEwKSwgbnVsbCAhPSByKSBmb3IgKDsgXyA8IHIubGVuZ3RoOyBfKyspIHtcbiAgICBpZiAoKHMgPSByW19dKSAmJiAocyA9PT0gbCB8fCAoZCA/IHMubG9jYWxOYW1lID09IGQgOiAzID09IHMubm9kZVR5cGUpKSkge1xuICAgICAgbCA9IHMsIHJbX10gPSBudWxsO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKG51bGwgPT0gbCkge1xuICAgIGlmIChudWxsID09PSBkKSByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocCk7XG4gICAgbCA9IG8gPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBkKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZCwgcC5pcyAmJiBwKSwgciA9IG51bGwsIGMgPSAhMTtcbiAgfVxuXG4gIGlmIChudWxsID09PSBkKSB5ID09PSBwIHx8IGMgJiYgbC5kYXRhID09PSBwIHx8IChsLmRhdGEgPSBwKTtlbHNlIHtcbiAgICBpZiAociA9IHIgJiYgbi5jYWxsKGwuY2hpbGROb2RlcyksIGEgPSAoeSA9IGkucHJvcHMgfHwgZSkuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwsIHYgPSBwLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLCAhYykge1xuICAgICAgaWYgKG51bGwgIT0gcikgZm9yICh5ID0ge30sIF8gPSAwOyBfIDwgbC5hdHRyaWJ1dGVzLmxlbmd0aDsgXysrKSB7XG4gICAgICAgIHlbbC5hdHRyaWJ1dGVzW19dLm5hbWVdID0gbC5hdHRyaWJ1dGVzW19dLnZhbHVlO1xuICAgICAgfVxuICAgICAgKHYgfHwgYSkgJiYgKHYgJiYgKGEgJiYgdi5fX2h0bWwgPT0gYS5fX2h0bWwgfHwgdi5fX2h0bWwgPT09IGwuaW5uZXJIVE1MKSB8fCAobC5pbm5lckhUTUwgPSB2ICYmIHYuX19odG1sIHx8IFwiXCIpKTtcbiAgICB9XG5cbiAgICBpZiAoQyhsLCBwLCB5LCBvLCBjKSwgdikgdS5fX2sgPSBbXTtlbHNlIGlmIChfID0gdS5wcm9wcy5jaGlsZHJlbiwgdyhsLCBBcnJheS5pc0FycmF5KF8pID8gXyA6IFtfXSwgdSwgaSwgdCwgbyAmJiBcImZvcmVpZ25PYmplY3RcIiAhPT0gZCwgciwgZiwgciA/IHJbMF0gOiBpLl9fayAmJiBrKGksIDApLCBjKSwgbnVsbCAhPSByKSBmb3IgKF8gPSByLmxlbmd0aDsgXy0tOykge1xuICAgICAgbnVsbCAhPSByW19dICYmIGgocltfXSk7XG4gICAgfVxuICAgIGMgfHwgKFwidmFsdWVcIiBpbiBwICYmIHZvaWQgMCAhPT0gKF8gPSBwLnZhbHVlKSAmJiAoXyAhPT0gbC52YWx1ZSB8fCBcInByb2dyZXNzXCIgPT09IGQgJiYgIV8pICYmIEgobCwgXCJ2YWx1ZVwiLCBfLCB5LnZhbHVlLCAhMSksIFwiY2hlY2tlZFwiIGluIHAgJiYgdm9pZCAwICE9PSAoXyA9IHAuY2hlY2tlZCkgJiYgXyAhPT0gbC5jaGVja2VkICYmIEgobCwgXCJjaGVja2VkXCIsIF8sIHkuY2hlY2tlZCwgITEpKTtcbiAgfVxuICByZXR1cm4gbDtcbn1cblxuZnVuY3Rpb24gTShuLCB1LCBpKSB7XG4gIHRyeSB7XG4gICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBuID8gbih1KSA6IG4uY3VycmVudCA9IHU7XG4gIH0gY2F0Y2ggKG4pIHtcbiAgICBsLl9fZShuLCBpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBOKG4sIHUsIGkpIHtcbiAgdmFyIHQsIG87XG5cbiAgaWYgKGwudW5tb3VudCAmJiBsLnVubW91bnQobiksICh0ID0gbi5yZWYpICYmICh0LmN1cnJlbnQgJiYgdC5jdXJyZW50ICE9PSBuLl9fZSB8fCBNKHQsIG51bGwsIHUpKSwgbnVsbCAhPSAodCA9IG4uX19jKSkge1xuICAgIGlmICh0LmNvbXBvbmVudFdpbGxVbm1vdW50KSB0cnkge1xuICAgICAgdC5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuICAgIH0gY2F0Y2ggKG4pIHtcbiAgICAgIGwuX19lKG4sIHUpO1xuICAgIH1cbiAgICB0LmJhc2UgPSB0Ll9fUCA9IG51bGw7XG4gIH1cblxuICBpZiAodCA9IG4uX19rKSBmb3IgKG8gPSAwOyBvIDwgdC5sZW5ndGg7IG8rKykge1xuICAgIHRbb10gJiYgTih0W29dLCB1LCBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIG4udHlwZSk7XG4gIH1cbiAgaSB8fCBudWxsID09IG4uX19lIHx8IGgobi5fX2UpLCBuLl9fZSA9IG4uX19kID0gdm9pZCAwO1xufVxuXG5mdW5jdGlvbiBPKG4sIGwsIHUpIHtcbiAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IobiwgdSk7XG59XG5cbmZ1bmN0aW9uIFModSwgaSwgdCkge1xuICB2YXIgbywgciwgZjtcbiAgbC5fXyAmJiBsLl9fKHUsIGkpLCByID0gKG8gPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHQpID8gbnVsbCA6IHQgJiYgdC5fX2sgfHwgaS5fX2ssIGYgPSBbXSwgaihpLCB1ID0gKCFvICYmIHQgfHwgaSkuX19rID0gdihkLCBudWxsLCBbdV0pLCByIHx8IGUsIGUsIHZvaWQgMCAhPT0gaS5vd25lclNWR0VsZW1lbnQsICFvICYmIHQgPyBbdF0gOiByID8gbnVsbCA6IGkuZmlyc3RDaGlsZCA/IG4uY2FsbChpLmNoaWxkTm9kZXMpIDogbnVsbCwgZiwgIW8gJiYgdCA/IHQgOiByID8gci5fX2UgOiBpLmZpcnN0Q2hpbGQsIG8pLCB6KGYsIHUpO1xufVxuXG5mdW5jdGlvbiBxKG4sIGwpIHtcbiAgUyhuLCBsLCBxKTtcbn1cblxuZnVuY3Rpb24gQihsLCB1LCBpKSB7XG4gIHZhciB0LFxuICAgICAgbyxcbiAgICAgIHIsXG4gICAgICBmID0gYSh7fSwgbC5wcm9wcyk7XG5cbiAgZm9yIChyIGluIHUpIHtcbiAgICBcImtleVwiID09IHIgPyB0ID0gdVtyXSA6IFwicmVmXCIgPT0gciA/IG8gPSB1W3JdIDogZltyXSA9IHVbcl07XG4gIH1cblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgKGYuY2hpbGRyZW4gPSBhcmd1bWVudHMubGVuZ3RoID4gMyA/IG4uY2FsbChhcmd1bWVudHMsIDIpIDogaSksIHkobC50eXBlLCBmLCB0IHx8IGwua2V5LCBvIHx8IGwucmVmLCBudWxsKTtcbn1cblxuZnVuY3Rpb24gRChuLCBsKSB7XG4gIHZhciB1ID0ge1xuICAgIF9fYzogbCA9IFwiX19jQ1wiICsgZisrLFxuICAgIF9fOiBuLFxuICAgIENvbnN1bWVyOiBmdW5jdGlvbiBDb25zdW1lcihuLCBsKSB7XG4gICAgICByZXR1cm4gbi5jaGlsZHJlbihsKTtcbiAgICB9LFxuICAgIFByb3ZpZGVyOiBmdW5jdGlvbiBQcm92aWRlcihuKSB7XG4gICAgICB2YXIgdSwgaTtcbiAgICAgIHJldHVybiB0aGlzLmdldENoaWxkQ29udGV4dCB8fCAodSA9IFtdLCAoaSA9IHt9KVtsXSA9IHRoaXMsIHRoaXMuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH0sIHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgdGhpcy5wcm9wcy52YWx1ZSAhPT0gbi52YWx1ZSAmJiB1LnNvbWUobSk7XG4gICAgICB9LCB0aGlzLnN1YiA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHUucHVzaChuKTtcbiAgICAgICAgdmFyIGwgPSBuLmNvbXBvbmVudFdpbGxVbm1vdW50O1xuXG4gICAgICAgIG4uY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdS5zcGxpY2UodS5pbmRleE9mKG4pLCAxKSwgbCAmJiBsLmNhbGwobik7XG4gICAgICAgIH07XG4gICAgICB9KSwgbi5jaGlsZHJlbjtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1LlByb3ZpZGVyLl9fID0gdS5Db25zdW1lci5jb250ZXh0VHlwZSA9IHU7XG59XG5cbm4gPSBjLnNsaWNlLCBsID0ge1xuICBfX2U6IGZ1bmN0aW9uIF9fZShuLCBsKSB7XG4gICAgZm9yICh2YXIgdSwgaSwgdDsgbCA9IGwuX187KSB7XG4gICAgICBpZiAoKHUgPSBsLl9fYykgJiYgIXUuX18pIHRyeSB7XG4gICAgICAgIGlmICgoaSA9IHUuY29uc3RydWN0b3IpICYmIG51bGwgIT0gaS5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IgJiYgKHUuc2V0U3RhdGUoaS5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IobikpLCB0ID0gdS5fX2QpLCBudWxsICE9IHUuY29tcG9uZW50RGlkQ2F0Y2ggJiYgKHUuY29tcG9uZW50RGlkQ2F0Y2gobiksIHQgPSB1Ll9fZCksIHQpIHJldHVybiB1Ll9fRSA9IHU7XG4gICAgICB9IGNhdGNoIChsKSB7XG4gICAgICAgIG4gPSBsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRocm93IG47XG4gIH1cbn0sIHUgPSAwLCBpID0gZnVuY3Rpb24gaShuKSB7XG4gIHJldHVybiBudWxsICE9IG4gJiYgdm9pZCAwID09PSBuLmNvbnN0cnVjdG9yO1xufSwgXy5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAobiwgbCkge1xuICB2YXIgdTtcbiAgdSA9IG51bGwgIT0gdGhpcy5fX3MgJiYgdGhpcy5fX3MgIT09IHRoaXMuc3RhdGUgPyB0aGlzLl9fcyA6IHRoaXMuX19zID0gYSh7fSwgdGhpcy5zdGF0ZSksIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgbiAmJiAobiA9IG4oYSh7fSwgdSksIHRoaXMucHJvcHMpKSwgbiAmJiBhKHUsIG4pLCBudWxsICE9IG4gJiYgdGhpcy5fX3YgJiYgKGwgJiYgdGhpcy5fX2gucHVzaChsKSwgbSh0aGlzKSk7XG59LCBfLnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChuKSB7XG4gIHRoaXMuX192ICYmICh0aGlzLl9fZSA9ICEwLCBuICYmIHRoaXMuX19oLnB1c2gobiksIG0odGhpcykpO1xufSwgXy5wcm90b3R5cGUucmVuZGVyID0gZCwgdCA9IFtdLCBvID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBQcm9taXNlID8gUHJvbWlzZS5wcm90b3R5cGUudGhlbi5iaW5kKFByb21pc2UucmVzb2x2ZSgpKSA6IHNldFRpbWVvdXQsIGcuX19yID0gMCwgZiA9IDA7XG5leHBvcnQgeyBTIGFzIHJlbmRlciwgcSBhcyBoeWRyYXRlLCB2IGFzIGNyZWF0ZUVsZW1lbnQsIHYgYXMgaCwgZCBhcyBGcmFnbWVudCwgcCBhcyBjcmVhdGVSZWYsIGkgYXMgaXNWYWxpZEVsZW1lbnQsIF8gYXMgQ29tcG9uZW50LCBCIGFzIGNsb25lRWxlbWVudCwgRCBhcyBjcmVhdGVDb250ZXh0LCBBIGFzIHRvQ2hpbGRBcnJheSwgbCBhcyBvcHRpb25zIH07IiwgIid1c2Ugc3RyaWN0JztcbnZhciBmaXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgZ2V0U3Vic3RpdHV0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1zdWJzdGl0dXRpb24nKTtcbnZhciByZWdFeHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBSRVBMQUNFID0gd2VsbEtub3duU3ltYm9sKCdyZXBsYWNlJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbnZhciBtYXliZVRvU3RyaW5nID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gaXQgOiBTdHJpbmcoaXQpO1xufTtcblxuLy8gSUUgPD0gMTEgcmVwbGFjZXMgJDAgd2l0aCB0aGUgd2hvbGUgbWF0Y2gsIGFzIGlmIGl0IHdhcyAkJlxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjAyNDY2Ni9nZXR0aW5nLWllLXRvLXJlcGxhY2UtYS1yZWdleC13aXRoLXRoZS1saXRlcmFsLXN0cmluZy0wXG52YXIgUkVQTEFDRV9LRUVQU18kMCA9IChmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvcHJlZmVyLWVzY2FwZS1yZXBsYWNlbWVudC1kb2xsYXItY2hhciAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gJ2EnLnJlcGxhY2UoLy4vLCAnJDAnKSA9PT0gJyQwJztcbn0pKCk7XG5cbi8vIFNhZmFyaSA8PSAxMy4wLjMoPykgc3Vic3RpdHV0ZXMgbnRoIGNhcHR1cmUgd2hlcmUgbj5tIHdpdGggYW4gZW1wdHkgc3RyaW5nXG52YXIgUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkUgPSAoZnVuY3Rpb24gKCkge1xuICBpZiAoLy4vW1JFUExBQ0VdKSB7XG4gICAgcmV0dXJuIC8uL1tSRVBMQUNFXSgnYScsICckMCcpID09PSAnJztcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG52YXIgUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUgPSAvLi87XG4gIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHJlc3VsdC5ncm91cHMgPSB7IGE6ICc3JyB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHJldHVybiAnJy5yZXBsYWNlKHJlLCAnJDxhPicpICE9PSAnNyc7XG59KTtcblxuLy8gQEByZXBsYWNlIGxvZ2ljXG5maXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYygncmVwbGFjZScsIGZ1bmN0aW9uIChfLCBuYXRpdmVSZXBsYWNlLCBtYXliZUNhbGxOYXRpdmUpIHtcbiAgdmFyIFVOU0FGRV9TVUJTVElUVVRFID0gUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkUgPyAnJCcgOiAnJDAnO1xuXG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUucmVwbGFjZWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnJlcGxhY2VcbiAgICBmdW5jdGlvbiByZXBsYWNlKHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICAgIHZhciByZXBsYWNlciA9IHNlYXJjaFZhbHVlID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlYXJjaFZhbHVlW1JFUExBQ0VdO1xuICAgICAgcmV0dXJuIHJlcGxhY2VyICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyByZXBsYWNlci5jYWxsKHNlYXJjaFZhbHVlLCBPLCByZXBsYWNlVmFsdWUpXG4gICAgICAgIDogbmF0aXZlUmVwbGFjZS5jYWxsKHRvU3RyaW5nKE8pLCBzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAcmVwbGFjZV1gIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHJlcGxhY2VcbiAgICBmdW5jdGlvbiAoc3RyaW5nLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHRoaXMpO1xuICAgICAgdmFyIFMgPSB0b1N0cmluZyhzdHJpbmcpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiByZXBsYWNlVmFsdWUgPT09ICdzdHJpbmcnICYmXG4gICAgICAgIHJlcGxhY2VWYWx1ZS5pbmRleE9mKFVOU0FGRV9TVUJTVElUVVRFKSA9PT0gLTEgJiZcbiAgICAgICAgcmVwbGFjZVZhbHVlLmluZGV4T2YoJyQ8JykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZShuYXRpdmVSZXBsYWNlLCByeCwgUywgcmVwbGFjZVZhbHVlKTtcbiAgICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgZnVuY3Rpb25hbFJlcGxhY2UgPSB0eXBlb2YgcmVwbGFjZVZhbHVlID09PSAnZnVuY3Rpb24nO1xuICAgICAgaWYgKCFmdW5jdGlvbmFsUmVwbGFjZSkgcmVwbGFjZVZhbHVlID0gdG9TdHJpbmcocmVwbGFjZVZhbHVlKTtcblxuICAgICAgdmFyIGdsb2JhbCA9IHJ4Lmdsb2JhbDtcbiAgICAgIGlmIChnbG9iYWwpIHtcbiAgICAgICAgdmFyIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUyk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIGJyZWFrO1xuXG4gICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICBpZiAoIWdsb2JhbCkgYnJlYWs7XG5cbiAgICAgICAgdmFyIG1hdGNoU3RyID0gdG9TdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgaWYgKG1hdGNoU3RyID09PSAnJykgcngubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKHJ4Lmxhc3RJbmRleCksIGZ1bGxVbmljb2RlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjY3VtdWxhdGVkUmVzdWx0ID0gJyc7XG4gICAgICB2YXIgbmV4dFNvdXJjZVBvc2l0aW9uID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHRzW2ldO1xuXG4gICAgICAgIHZhciBtYXRjaGVkID0gdG9TdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gbWF4KG1pbih0b0ludGVnZXIocmVzdWx0LmluZGV4KSwgUy5sZW5ndGgpLCAwKTtcbiAgICAgICAgdmFyIGNhcHR1cmVzID0gW107XG4gICAgICAgIC8vIE5PVEU6IFRoaXMgaXMgZXF1aXZhbGVudCB0b1xuICAgICAgICAvLyAgIGNhcHR1cmVzID0gcmVzdWx0LnNsaWNlKDEpLm1hcChtYXliZVRvU3RyaW5nKVxuICAgICAgICAvLyBidXQgZm9yIHNvbWUgcmVhc29uIGBuYXRpdmVTbGljZS5jYWxsKHJlc3VsdCwgMSwgcmVzdWx0Lmxlbmd0aClgIChjYWxsZWQgaW5cbiAgICAgICAgLy8gdGhlIHNsaWNlIHBvbHlmaWxsIHdoZW4gc2xpY2luZyBuYXRpdmUgYXJyYXlzKSBcImRvZXNuJ3Qgd29ya1wiIGluIHNhZmFyaSA5IGFuZFxuICAgICAgICAvLyBjYXVzZXMgYSBjcmFzaCAoaHR0cHM6Ly9wYXN0ZWJpbi5jb20vTjIxUXplUUEpIHdoZW4gdHJ5aW5nIHRvIGRlYnVnIGl0LlxuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHJlc3VsdC5sZW5ndGg7IGorKykgY2FwdHVyZXMucHVzaChtYXliZVRvU3RyaW5nKHJlc3VsdFtqXSkpO1xuICAgICAgICB2YXIgbmFtZWRDYXB0dXJlcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgIGlmIChmdW5jdGlvbmFsUmVwbGFjZSkge1xuICAgICAgICAgIHZhciByZXBsYWNlckFyZ3MgPSBbbWF0Y2hlZF0uY29uY2F0KGNhcHR1cmVzLCBwb3NpdGlvbiwgUyk7XG4gICAgICAgICAgaWYgKG5hbWVkQ2FwdHVyZXMgIT09IHVuZGVmaW5lZCkgcmVwbGFjZXJBcmdzLnB1c2gobmFtZWRDYXB0dXJlcyk7XG4gICAgICAgICAgdmFyIHJlcGxhY2VtZW50ID0gdG9TdHJpbmcocmVwbGFjZVZhbHVlLmFwcGx5KHVuZGVmaW5lZCwgcmVwbGFjZXJBcmdzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwbGFjZW1lbnQgPSBnZXRTdWJzdGl0dXRpb24obWF0Y2hlZCwgUywgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbiA+PSBuZXh0U291cmNlUG9zaXRpb24pIHtcbiAgICAgICAgICBhY2N1bXVsYXRlZFJlc3VsdCArPSBTLnNsaWNlKG5leHRTb3VyY2VQb3NpdGlvbiwgcG9zaXRpb24pICsgcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgbmV4dFNvdXJjZVBvc2l0aW9uID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY3VtdWxhdGVkUmVzdWx0ICsgUy5zbGljZShuZXh0U291cmNlUG9zaXRpb24pO1xuICAgIH1cbiAgXTtcbn0sICFSRVBMQUNFX1NVUFBPUlRTX05BTUVEX0dST1VQUyB8fCAhUkVQTEFDRV9LRUVQU18kMCB8fCBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdzbGljZScpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xudmFyIG5hdGl2ZVNsaWNlID0gW10uc2xpY2U7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuc2xpY2VgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc2xpY2Vcbi8vIGZhbGxiYWNrIGZvciBub3QgYXJyYXktbGlrZSBFUzMgc3RyaW5ncyBhbmQgRE9NIG9iamVjdHNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFIQVNfU1BFQ0lFU19TVVBQT1JUIH0sIHtcbiAgc2xpY2U6IGZ1bmN0aW9uIHNsaWNlKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCh0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBrID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW5ndGgpO1xuICAgIHZhciBmaW4gPSB0b0Fic29sdXRlSW5kZXgoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiBlbmQsIGxlbmd0aCk7XG4gICAgLy8gaW5saW5lIGBBcnJheVNwZWNpZXNDcmVhdGVgIGZvciB1c2FnZSBuYXRpdmUgYEFycmF5I3NsaWNlYCB3aGVyZSBpdCdzIHBvc3NpYmxlXG4gICAgdmFyIENvbnN0cnVjdG9yLCByZXN1bHQsIG47XG4gICAgaWYgKGlzQXJyYXkoTykpIHtcbiAgICAgIENvbnN0cnVjdG9yID0gTy5jb25zdHJ1Y3RvcjtcbiAgICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgICBpZiAodHlwZW9mIENvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgKENvbnN0cnVjdG9yID09PSBBcnJheSB8fCBpc0FycmF5KENvbnN0cnVjdG9yLnByb3RvdHlwZSkpKSB7XG4gICAgICAgIENvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcltTUEVDSUVTXTtcbiAgICAgICAgaWYgKENvbnN0cnVjdG9yID09PSBudWxsKSBDb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChDb25zdHJ1Y3RvciA9PT0gQXJyYXkgfHwgQ29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbmF0aXZlU2xpY2UuY2FsbChPLCBrLCBmaW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgPSBuZXcgKENvbnN0cnVjdG9yID09PSB1bmRlZmluZWQgPyBBcnJheSA6IENvbnN0cnVjdG9yKShtYXgoZmluIC0gaywgMCkpO1xuICAgIGZvciAobiA9IDA7IGsgPCBmaW47IGsrKywgbisrKSBpZiAoayBpbiBPKSBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIG4sIE9ba10pO1xuICAgIHJlc3VsdC5sZW5ndGggPSBuO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGNyZWF0ZUhUTUwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLWh0bWwnKTtcbnZhciBmb3JjZWRTdHJpbmdIVE1MTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1odG1sLWZvcmNlZCcpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS5zdWJgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnN1YlxuJCh7IHRhcmdldDogJ1N0cmluZycsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IGZvcmNlZFN0cmluZ0hUTUxNZXRob2QoJ3N1YicpIH0sIHtcbiAgc3ViOiBmdW5jdGlvbiBzdWIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ3N1YicsICcnLCAnJyk7XG4gIH1cbn0pO1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ3NwbGljZScpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDB4MUZGRkZGRkZGRkZGRkY7XG52YXIgTUFYSU1VTV9BTExPV0VEX0xFTkdUSF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgbGVuZ3RoIGV4Y2VlZGVkJztcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zcGxpY2VgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc3BsaWNlXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfSwge1xuICBzcGxpY2U6IGZ1bmN0aW9uIHNwbGljZShzdGFydCwgZGVsZXRlQ291bnQgLyogLCAuLi5pdGVtcyAqLykge1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbiA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgYWN0dWFsU3RhcnQgPSB0b0Fic29sdXRlSW5kZXgoc3RhcnQsIGxlbik7XG4gICAgdmFyIGFyZ3VtZW50c0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIGluc2VydENvdW50LCBhY3R1YWxEZWxldGVDb3VudCwgQSwgaywgZnJvbSwgdG87XG4gICAgaWYgKGFyZ3VtZW50c0xlbmd0aCA9PT0gMCkge1xuICAgICAgaW5zZXJ0Q291bnQgPSBhY3R1YWxEZWxldGVDb3VudCA9IDA7XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDEpIHtcbiAgICAgIGluc2VydENvdW50ID0gMDtcbiAgICAgIGFjdHVhbERlbGV0ZUNvdW50ID0gbGVuIC0gYWN0dWFsU3RhcnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc2VydENvdW50ID0gYXJndW1lbnRzTGVuZ3RoIC0gMjtcbiAgICAgIGFjdHVhbERlbGV0ZUNvdW50ID0gbWluKG1heCh0b0ludGVnZXIoZGVsZXRlQ291bnQpLCAwKSwgbGVuIC0gYWN0dWFsU3RhcnQpO1xuICAgIH1cbiAgICBpZiAobGVuICsgaW5zZXJ0Q291bnQgLSBhY3R1YWxEZWxldGVDb3VudCA+IE1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfTEVOR1RIX0VYQ0VFREVEKTtcbiAgICB9XG4gICAgQSA9IGFycmF5U3BlY2llc0NyZWF0ZShPLCBhY3R1YWxEZWxldGVDb3VudCk7XG4gICAgZm9yIChrID0gMDsgayA8IGFjdHVhbERlbGV0ZUNvdW50OyBrKyspIHtcbiAgICAgIGZyb20gPSBhY3R1YWxTdGFydCArIGs7XG4gICAgICBpZiAoZnJvbSBpbiBPKSBjcmVhdGVQcm9wZXJ0eShBLCBrLCBPW2Zyb21dKTtcbiAgICB9XG4gICAgQS5sZW5ndGggPSBhY3R1YWxEZWxldGVDb3VudDtcbiAgICBpZiAoaW5zZXJ0Q291bnQgPCBhY3R1YWxEZWxldGVDb3VudCkge1xuICAgICAgZm9yIChrID0gYWN0dWFsU3RhcnQ7IGsgPCBsZW4gLSBhY3R1YWxEZWxldGVDb3VudDsgaysrKSB7XG4gICAgICAgIGZyb20gPSBrICsgYWN0dWFsRGVsZXRlQ291bnQ7XG4gICAgICAgIHRvID0gayArIGluc2VydENvdW50O1xuICAgICAgICBpZiAoZnJvbSBpbiBPKSBPW3RvXSA9IE9bZnJvbV07XG4gICAgICAgIGVsc2UgZGVsZXRlIE9bdG9dO1xuICAgICAgfVxuICAgICAgZm9yIChrID0gbGVuOyBrID4gbGVuIC0gYWN0dWFsRGVsZXRlQ291bnQgKyBpbnNlcnRDb3VudDsgay0tKSBkZWxldGUgT1trIC0gMV07XG4gICAgfSBlbHNlIGlmIChpbnNlcnRDb3VudCA+IGFjdHVhbERlbGV0ZUNvdW50KSB7XG4gICAgICBmb3IgKGsgPSBsZW4gLSBhY3R1YWxEZWxldGVDb3VudDsgayA+IGFjdHVhbFN0YXJ0OyBrLS0pIHtcbiAgICAgICAgZnJvbSA9IGsgKyBhY3R1YWxEZWxldGVDb3VudCAtIDE7XG4gICAgICAgIHRvID0gayArIGluc2VydENvdW50IC0gMTtcbiAgICAgICAgaWYgKGZyb20gaW4gTykgT1t0b10gPSBPW2Zyb21dO1xuICAgICAgICBlbHNlIGRlbGV0ZSBPW3RvXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChrID0gMDsgayA8IGluc2VydENvdW50OyBrKyspIHtcbiAgICAgIE9bayArIGFjdHVhbFN0YXJ0XSA9IGFyZ3VtZW50c1trICsgMl07XG4gICAgfVxuICAgIE8ubGVuZ3RoID0gbGVuIC0gYWN0dWFsRGVsZXRlQ291bnQgKyBpbnNlcnRDb3VudDtcbiAgICByZXR1cm4gQTtcbiAgfVxufSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgTmF0aXZlUHJvbWlzZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtcHJvbWlzZS1jb25zdHJ1Y3RvcicpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUtYWxsJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIHNldFNwZWNpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXNwZWNpZXMnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4taW5zdGFuY2UnKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG52YXIgaXRlcmF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRlJyk7XG52YXIgY2hlY2tDb3JyZWN0bmVzc09mSXRlcmF0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90YXNrJykuc2V0O1xudmFyIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9taWNyb3Rhc2snKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wcm9taXNlLXJlc29sdmUnKTtcbnZhciBob3N0UmVwb3J0RXJyb3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hvc3QtcmVwb3J0LWVycm9ycycpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BlcmZvcm0nKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfQlJPV1NFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtYnJvd3NlcicpO1xudmFyIElTX05PREUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUnKTtcbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgUFJPTUlTRSA9ICdQcm9taXNlJztcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsUHJvbWlzZVN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoUFJPTUlTRSk7XG52YXIgTmF0aXZlUHJvbWlzZVByb3RvdHlwZSA9IE5hdGl2ZVByb21pc2UgJiYgTmF0aXZlUHJvbWlzZS5wcm90b3R5cGU7XG52YXIgUHJvbWlzZUNvbnN0cnVjdG9yID0gTmF0aXZlUHJvbWlzZTtcbnZhciBQcm9taXNlQ29uc3RydWN0b3JQcm90b3R5cGUgPSBOYXRpdmVQcm9taXNlUHJvdG90eXBlO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcbnZhciBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eTtcbnZhciBESVNQQVRDSF9FVkVOVCA9ICEhKGRvY3VtZW50ICYmIGRvY3VtZW50LmNyZWF0ZUV2ZW50ICYmIGdsb2JhbC5kaXNwYXRjaEV2ZW50KTtcbnZhciBOQVRJVkVfUkVKRUNUSU9OX0VWRU5UID0gdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nO1xudmFyIFVOSEFORExFRF9SRUpFQ1RJT04gPSAndW5oYW5kbGVkcmVqZWN0aW9uJztcbnZhciBSRUpFQ1RJT05fSEFORExFRCA9ICdyZWplY3Rpb25oYW5kbGVkJztcbnZhciBQRU5ESU5HID0gMDtcbnZhciBGVUxGSUxMRUQgPSAxO1xudmFyIFJFSkVDVEVEID0gMjtcbnZhciBIQU5ETEVEID0gMTtcbnZhciBVTkhBTkRMRUQgPSAyO1xudmFyIFNVQkNMQVNTSU5HID0gZmFsc2U7XG52YXIgSW50ZXJuYWwsIE93blByb21pc2VDYXBhYmlsaXR5LCBQcm9taXNlV3JhcHBlciwgbmF0aXZlVGhlbjtcblxudmFyIEZPUkNFRCA9IGlzRm9yY2VkKFBST01JU0UsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIFBST01JU0VfQ09OU1RSVUNUT1JfU09VUkNFID0gaW5zcGVjdFNvdXJjZShQcm9taXNlQ29uc3RydWN0b3IpO1xuICB2YXIgR0xPQkFMX0NPUkVfSlNfUFJPTUlTRSA9IFBST01JU0VfQ09OU1RSVUNUT1JfU09VUkNFICE9PSBTdHJpbmcoUHJvbWlzZUNvbnN0cnVjdG9yKTtcbiAgLy8gVjggNi42IChOb2RlIDEwIGFuZCBDaHJvbWUgNjYpIGhhdmUgYSBidWcgd2l0aCByZXNvbHZpbmcgY3VzdG9tIHRoZW5hYmxlc1xuICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04MzA1NjVcbiAgLy8gV2UgY2FuJ3QgZGV0ZWN0IGl0IHN5bmNocm9ub3VzbHksIHNvIGp1c3QgY2hlY2sgdmVyc2lvbnNcbiAgaWYgKCFHTE9CQUxfQ09SRV9KU19QUk9NSVNFICYmIFY4X1ZFUlNJT04gPT09IDY2KSByZXR1cm4gdHJ1ZTtcbiAgLy8gV2UgbmVlZCBQcm9taXNlI2ZpbmFsbHkgaW4gdGhlIHB1cmUgdmVyc2lvbiBmb3IgcHJldmVudGluZyBwcm90b3R5cGUgcG9sbHV0aW9uXG4gIGlmIChJU19QVVJFICYmICFQcm9taXNlQ29uc3RydWN0b3JQcm90b3R5cGVbJ2ZpbmFsbHknXSkgcmV0dXJuIHRydWU7XG4gIC8vIFdlIGNhbid0IHVzZSBAQHNwZWNpZXMgZmVhdHVyZSBkZXRlY3Rpb24gaW4gVjggc2luY2UgaXQgY2F1c2VzXG4gIC8vIGRlb3B0aW1pemF0aW9uIGFuZCBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG4gIGlmIChWOF9WRVJTSU9OID49IDUxICYmIC9uYXRpdmUgY29kZS8udGVzdChQUk9NSVNFX0NPTlNUUlVDVE9SX1NPVVJDRSkpIHJldHVybiBmYWxzZTtcbiAgLy8gRGV0ZWN0IGNvcnJlY3RuZXNzIG9mIHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZUNvbnN0cnVjdG9yKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUoMSk7IH0pO1xuICB2YXIgRmFrZVByb21pc2UgPSBmdW5jdGlvbiAoZXhlYykge1xuICAgIGV4ZWMoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pO1xuICB9O1xuICB2YXIgY29uc3RydWN0b3IgPSBwcm9taXNlLmNvbnN0cnVjdG9yID0ge307XG4gIGNvbnN0cnVjdG9yW1NQRUNJRVNdID0gRmFrZVByb21pc2U7XG4gIFNVQkNMQVNTSU5HID0gcHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZTtcbiAgaWYgKCFTVUJDTEFTU0lORykgcmV0dXJuIHRydWU7XG4gIC8vIFVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgcmV0dXJuICFHTE9CQUxfQ09SRV9KU19QUk9NSVNFICYmIElTX0JST1dTRVIgJiYgIU5BVElWRV9SRUpFQ1RJT05fRVZFTlQ7XG59KTtcblxudmFyIElOQ09SUkVDVF9JVEVSQVRJT04gPSBGT1JDRUQgfHwgIWNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbihmdW5jdGlvbiAoaXRlcmFibGUpIHtcbiAgUHJvbWlzZUNvbnN0cnVjdG9yLmFsbChpdGVyYWJsZSlbJ2NhdGNoJ10oZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KTtcbn0pO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcblxudmFyIG5vdGlmeSA9IGZ1bmN0aW9uIChzdGF0ZSwgaXNSZWplY3QpIHtcbiAgaWYgKHN0YXRlLm5vdGlmaWVkKSByZXR1cm47XG4gIHN0YXRlLm5vdGlmaWVkID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gc3RhdGUucmVhY3Rpb25zO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHN0YXRlLnZhbHVlO1xuICAgIHZhciBvayA9IHN0YXRlLnN0YXRlID09IEZVTEZJTExFRDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBjaGFpbltpbmRleCsrXTtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW4sIGV4aXRlZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgaWYgKHN0YXRlLnJlamVjdGlvbiA9PT0gVU5IQU5ETEVEKSBvbkhhbmRsZVVuaGFuZGxlZChzdGF0ZSk7XG4gICAgICAgICAgICBzdGF0ZS5yZWplY3Rpb24gPSBIQU5ETEVEO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpOyAvLyBjYW4gdGhyb3dcbiAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICAgICAgZXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZG9tYWluICYmICFleGl0ZWQpIGRvbWFpbi5leGl0KCk7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICAgIHN0YXRlLnJlYWN0aW9ucyA9IFtdO1xuICAgIHN0YXRlLm5vdGlmaWVkID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFzdGF0ZS5yZWplY3Rpb24pIG9uVW5oYW5kbGVkKHN0YXRlKTtcbiAgfSk7XG59O1xuXG52YXIgZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uIChuYW1lLCBwcm9taXNlLCByZWFzb24pIHtcbiAgdmFyIGV2ZW50LCBoYW5kbGVyO1xuICBpZiAoRElTUEFUQ0hfRVZFTlQpIHtcbiAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGV2ZW50LnByb21pc2UgPSBwcm9taXNlO1xuICAgIGV2ZW50LnJlYXNvbiA9IHJlYXNvbjtcbiAgICBldmVudC5pbml0RXZlbnQobmFtZSwgZmFsc2UsIHRydWUpO1xuICAgIGdsb2JhbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfSBlbHNlIGV2ZW50ID0geyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHJlYXNvbiB9O1xuICBpZiAoIU5BVElWRV9SRUpFQ1RJT05fRVZFTlQgJiYgKGhhbmRsZXIgPSBnbG9iYWxbJ29uJyArIG5hbWVdKSkgaGFuZGxlcihldmVudCk7XG4gIGVsc2UgaWYgKG5hbWUgPT09IFVOSEFORExFRF9SRUpFQ1RJT04pIGhvc3RSZXBvcnRFcnJvcnMoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHJlYXNvbik7XG59O1xuXG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gc3RhdGUuZmFjYWRlO1xuICAgIHZhciB2YWx1ZSA9IHN0YXRlLnZhbHVlO1xuICAgIHZhciBJU19VTkhBTkRMRUQgPSBpc1VuaGFuZGxlZChzdGF0ZSk7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAoSVNfVU5IQU5ETEVEKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKElTX05PREUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGRpc3BhdGNoRXZlbnQoVU5IQU5ETEVEX1JFSkVDVElPTiwgcHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgc3RhdGUucmVqZWN0aW9uID0gSVNfTk9ERSB8fCBpc1VuaGFuZGxlZChzdGF0ZSkgPyBVTkhBTkRMRUQgOiBIQU5ETEVEO1xuICAgICAgaWYgKHJlc3VsdC5lcnJvcikgdGhyb3cgcmVzdWx0LnZhbHVlO1xuICAgIH1cbiAgfSk7XG59O1xuXG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgcmV0dXJuIHN0YXRlLnJlamVjdGlvbiAhPT0gSEFORExFRCAmJiAhc3RhdGUucGFyZW50O1xufTtcblxudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHN0YXRlLmZhY2FkZTtcbiAgICBpZiAoSVNfTk9ERSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGRpc3BhdGNoRXZlbnQoUkVKRUNUSU9OX0hBTkRMRUQsIHByb21pc2UsIHN0YXRlLnZhbHVlKTtcbiAgfSk7XG59O1xuXG52YXIgYmluZCA9IGZ1bmN0aW9uIChmbiwgc3RhdGUsIHVud3JhcCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgZm4oc3RhdGUsIHZhbHVlLCB1bndyYXApO1xuICB9O1xufTtcblxudmFyIGludGVybmFsUmVqZWN0ID0gZnVuY3Rpb24gKHN0YXRlLCB2YWx1ZSwgdW53cmFwKSB7XG4gIGlmIChzdGF0ZS5kb25lKSByZXR1cm47XG4gIHN0YXRlLmRvbmUgPSB0cnVlO1xuICBpZiAodW53cmFwKSBzdGF0ZSA9IHVud3JhcDtcbiAgc3RhdGUudmFsdWUgPSB2YWx1ZTtcbiAgc3RhdGUuc3RhdGUgPSBSRUpFQ1RFRDtcbiAgbm90aWZ5KHN0YXRlLCB0cnVlKTtcbn07XG5cbnZhciBpbnRlcm5hbFJlc29sdmUgPSBmdW5jdGlvbiAoc3RhdGUsIHZhbHVlLCB1bndyYXApIHtcbiAgaWYgKHN0YXRlLmRvbmUpIHJldHVybjtcbiAgc3RhdGUuZG9uZSA9IHRydWU7XG4gIGlmICh1bndyYXApIHN0YXRlID0gdW53cmFwO1xuICB0cnkge1xuICAgIGlmIChzdGF0ZS5mYWNhZGUgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICB2YXIgdGhlbiA9IGlzVGhlbmFibGUodmFsdWUpO1xuICAgIGlmICh0aGVuKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsXG4gICAgICAgICAgICBiaW5kKGludGVybmFsUmVzb2x2ZSwgd3JhcHBlciwgc3RhdGUpLFxuICAgICAgICAgICAgYmluZChpbnRlcm5hbFJlamVjdCwgd3JhcHBlciwgc3RhdGUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpbnRlcm5hbFJlamVjdCh3cmFwcGVyLCBlcnJvciwgc3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHN0YXRlLnN0YXRlID0gRlVMRklMTEVEO1xuICAgICAgbm90aWZ5KHN0YXRlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGludGVybmFsUmVqZWN0KHsgZG9uZTogZmFsc2UgfSwgZXJyb3IsIHN0YXRlKTtcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmIChGT1JDRUQpIHtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgUHJvbWlzZUNvbnN0cnVjdG9yID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgUHJvbWlzZUNvbnN0cnVjdG9yLCBQUk9NSVNFKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoYmluZChpbnRlcm5hbFJlc29sdmUsIHN0YXRlKSwgYmluZChpbnRlcm5hbFJlamVjdCwgc3RhdGUpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaW50ZXJuYWxSZWplY3Qoc3RhdGUsIGVycm9yKTtcbiAgICB9XG4gIH07XG4gIFByb21pc2VDb25zdHJ1Y3RvclByb3RvdHlwZSA9IFByb21pc2VDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycyAtLSByZXF1aXJlZCBmb3IgYC5sZW5ndGhgXG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgICAgdHlwZTogUFJPTUlTRSxcbiAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgbm90aWZpZWQ6IGZhbHNlLFxuICAgICAgcGFyZW50OiBmYWxzZSxcbiAgICAgIHJlYWN0aW9uczogW10sXG4gICAgICByZWplY3Rpb246IGZhbHNlLFxuICAgICAgc3RhdGU6IFBFTkRJTkcsXG4gICAgICB2YWx1ZTogdW5kZWZpbmVkXG4gICAgfSk7XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlZGVmaW5lQWxsKFByb21pc2VDb25zdHJ1Y3RvclByb3RvdHlwZSwge1xuICAgIC8vIGBQcm9taXNlLnByb3RvdHlwZS50aGVuYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UucHJvdG90eXBlLnRoZW5cbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFByb21pc2VTdGF0ZSh0aGlzKTtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBQcm9taXNlQ29uc3RydWN0b3IpKTtcbiAgICAgIHJlYWN0aW9uLm9rID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gSVNfTk9ERSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgc3RhdGUucGFyZW50ID0gdHJ1ZTtcbiAgICAgIHN0YXRlLnJlYWN0aW9ucy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmIChzdGF0ZS5zdGF0ZSAhPSBQRU5ESU5HKSBub3RpZnkoc3RhdGUsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gYFByb21pc2UucHJvdG90eXBlLmNhdGNoYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UucHJvdG90eXBlLmNhdGNoXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUocHJvbWlzZSk7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBiaW5kKGludGVybmFsUmVzb2x2ZSwgc3RhdGUpO1xuICAgIHRoaXMucmVqZWN0ID0gYmluZChpbnRlcm5hbFJlamVjdCwgc3RhdGUpO1xuICB9O1xuICBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICAgIHJldHVybiBDID09PSBQcm9taXNlQ29uc3RydWN0b3IgfHwgQyA9PT0gUHJvbWlzZVdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcblxuICBpZiAoIUlTX1BVUkUgJiYgdHlwZW9mIE5hdGl2ZVByb21pc2UgPT0gJ2Z1bmN0aW9uJyAmJiBOYXRpdmVQcm9taXNlUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgbmF0aXZlVGhlbiA9IE5hdGl2ZVByb21pc2VQcm90b3R5cGUudGhlbjtcblxuICAgIGlmICghU1VCQ0xBU1NJTkcpIHtcbiAgICAgIC8vIG1ha2UgYFByb21pc2UjdGhlbmAgcmV0dXJuIGEgcG9seWZpbGxlZCBgUHJvbWlzZWAgZm9yIG5hdGl2ZSBwcm9taXNlLWJhc2VkIEFQSXNcbiAgICAgIHJlZGVmaW5lKE5hdGl2ZVByb21pc2VQcm90b3R5cGUsICd0aGVuJywgZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUNvbnN0cnVjdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBuYXRpdmVUaGVuLmNhbGwodGhhdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSkudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjQwXG4gICAgICB9LCB7IHVuc2FmZTogdHJ1ZSB9KTtcblxuICAgICAgLy8gbWFrZXMgc3VyZSB0aGF0IG5hdGl2ZSBwcm9taXNlLWJhc2VkIEFQSXMgYFByb21pc2UjY2F0Y2hgIHByb3Blcmx5IHdvcmtzIHdpdGggcGF0Y2hlZCBgUHJvbWlzZSN0aGVuYFxuICAgICAgcmVkZWZpbmUoTmF0aXZlUHJvbWlzZVByb3RvdHlwZSwgJ2NhdGNoJywgUHJvbWlzZUNvbnN0cnVjdG9yUHJvdG90eXBlWydjYXRjaCddLCB7IHVuc2FmZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICAvLyBtYWtlIGAuY29uc3RydWN0b3IgPT09IFByb21pc2VgIHdvcmsgZm9yIG5hdGl2ZSBwcm9taXNlLWJhc2VkIEFQSXNcbiAgICB0cnkge1xuICAgICAgZGVsZXRlIE5hdGl2ZVByb21pc2VQcm90b3R5cGUuY29uc3RydWN0b3I7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuXG4gICAgLy8gbWFrZSBgaW5zdGFuY2VvZiBQcm9taXNlYCB3b3JrIGZvciBuYXRpdmUgcHJvbWlzZS1iYXNlZCBBUElzXG4gICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICBzZXRQcm90b3R5cGVPZihOYXRpdmVQcm9taXNlUHJvdG90eXBlLCBQcm9taXNlQ29uc3RydWN0b3JQcm90b3R5cGUpO1xuICAgIH1cbiAgfVxufVxuXG4kKHsgZ2xvYmFsOiB0cnVlLCB3cmFwOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIFByb21pc2U6IFByb21pc2VDb25zdHJ1Y3RvclxufSk7XG5cbnNldFRvU3RyaW5nVGFnKFByb21pc2VDb25zdHJ1Y3RvciwgUFJPTUlTRSwgZmFsc2UsIHRydWUpO1xuc2V0U3BlY2llcyhQUk9NSVNFKTtcblxuUHJvbWlzZVdyYXBwZXIgPSBnZXRCdWlsdEluKFBST01JU0UpO1xuXG4vLyBzdGF0aWNzXG4kKHsgdGFyZ2V0OiBQUk9NSVNFLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIC8vIGBQcm9taXNlLnJlamVjdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5yZWplY3RcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgY2FwYWJpbGl0eS5yZWplY3QuY2FsbCh1bmRlZmluZWQsIHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuXG4kKHsgdGFyZ2V0OiBQUk9NSVNFLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IElTX1BVUkUgfHwgRk9SQ0VEIH0sIHtcbiAgLy8gYFByb21pc2UucmVzb2x2ZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5yZXNvbHZlXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShJU19QVVJFICYmIHRoaXMgPT09IFByb21pc2VXcmFwcGVyID8gUHJvbWlzZUNvbnN0cnVjdG9yIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuXG4kKHsgdGFyZ2V0OiBQUk9NSVNFLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IElOQ09SUkVDVF9JVEVSQVRJT04gfSwge1xuICAvLyBgUHJvbWlzZS5hbGxgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UuYWxsXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkcHJvbWlzZVJlc29sdmUgPSBhRnVuY3Rpb24oQy5yZXNvbHZlKTtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgIHZhciByZW1haW5pbmcgPSAxO1xuICAgICAgaXRlcmF0ZShpdGVyYWJsZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gY291bnRlcisrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgJHByb21pc2VSZXNvbHZlLmNhbGwoQywgcHJvbWlzZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeUNhbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmVycm9yKSByZWplY3QocmVzdWx0LnZhbHVlKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyBgUHJvbWlzZS5yYWNlYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1wcm9taXNlLnJhY2VcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHByb21pc2VSZXNvbHZlID0gYUZ1bmN0aW9uKEMucmVzb2x2ZSk7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAkcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwgInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHNsaWNlID0gW10uc2xpY2U7XG52YXIgTVNJRSA9IC9NU0lFIC5cXC4vLnRlc3QodXNlckFnZW50KTsgLy8gPC0gZGlydHkgaWU5LSBjaGVja1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChoYW5kbGVyLCB0aW1lb3V0IC8qICwgLi4uYXJndW1lbnRzICovKSB7XG4gICAgdmFyIGJvdW5kQXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICAgIHZhciBhcmdzID0gYm91bmRBcmdzID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBzY2hlZHVsZXIoYm91bmRBcmdzID8gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIHNwZWMgcmVxdWlyZW1lbnRcbiAgICAgICh0eXBlb2YgaGFuZGxlciA9PSAnZnVuY3Rpb24nID8gaGFuZGxlciA6IEZ1bmN0aW9uKGhhbmRsZXIpKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9IDogaGFuZGxlciwgdGltZW91dCk7XG4gIH07XG59O1xuXG4vLyBpZTktIHNldFRpbWVvdXQgJiBzZXRJbnRlcnZhbCBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZml4XG4vLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS90aW1lcnMtYW5kLXVzZXItcHJvbXB0cy5odG1sI3RpbWVyc1xuJCh7IGdsb2JhbDogdHJ1ZSwgYmluZDogdHJ1ZSwgZm9yY2VkOiBNU0lFIH0sIHtcbiAgLy8gYHNldFRpbWVvdXRgIG1ldGhvZFxuICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS90aW1lcnMtYW5kLXVzZXItcHJvbXB0cy5odG1sI2RvbS1zZXR0aW1lb3V0XG4gIHNldFRpbWVvdXQ6IHdyYXAoZ2xvYmFsLnNldFRpbWVvdXQpLFxuICAvLyBgc2V0SW50ZXJ2YWxgIG1ldGhvZFxuICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS90aW1lcnMtYW5kLXVzZXItcHJvbXB0cy5odG1sI2RvbS1zZXRpbnRlcnZhbFxuICBzZXRJbnRlcnZhbDogd3JhcChnbG9iYWwuc2V0SW50ZXJ2YWwpXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLFFBQUksUUFBUSxTQUFVLElBQUk7QUFDeEIsYUFBTyxNQUFNLEdBQUcsUUFBUSxRQUFRO0FBQUE7QUFJbEMsV0FBTyxVQUVMLE1BQU0sT0FBTyxjQUFjLFlBQVksZUFDdkMsTUFBTSxPQUFPLFVBQVUsWUFBWSxXQUVuQyxNQUFNLE9BQU8sUUFBUSxZQUFZLFNBQ2pDLE1BQU0sT0FBTyxVQUFVLFlBQVksV0FFbEMsV0FBWTtBQUFFLGFBQU87QUFBQSxXQUFjLFNBQVM7QUFBQTtBQUFBOzs7QUNiL0M7QUFBQTtBQUFBLFdBQU8sVUFBVSxTQUFVLE1BQU07QUFDL0IsVUFBSTtBQUNGLGVBQU8sQ0FBQyxDQUFDO0FBQUEsZUFDRixPQUFQO0FBQ0EsZUFBTztBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNKWDtBQUFBO0FBQUEsUUFBSSxTQUFRO0FBR1osV0FBTyxVQUFVLENBQUMsT0FBTSxXQUFZO0FBRWxD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
