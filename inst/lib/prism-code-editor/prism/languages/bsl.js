import { l as languages } from "../../index-XEj74r-1.js";
import { r as re } from "../../shared-Sq5P6lf6.js";
var charClass = ["\\wЀ-҄҇-ԯᴫᵸⷠ-ⷿꙀ-ꚟ︮︯"];
languages.oscript = languages.bsl = {
  "comment": /\/\/.*/,
  "string": {
    pattern: /"(?:[^"]|"")*"(?!")|'(?:\\.|[^\n\\'])*'/g,
    greedy: true
  },
  "keyword": {
    pattern: re("(^|[^<0>])(?:пока|для|новый|прервать|попытка|исключение|вызватьисключение|иначе|конецпопытки|неопределено|функция|перем|возврат|конецфункции|если|иначеесли|процедура|конецпроцедуры|тогда|знач|экспорт|конецесли|из|каждого|истина|ложь|по|цикл|конеццикла|выполнить)(?![<0>])|\\b(?:break|do|each|else|elseif|enddo|endfunction|endif|endprocedure|endtry|except|execute|export|false|true|for|function|if|in|new|null|procedure|raise|return|then|to|try|undefined|val|var|while)\\b", charClass, "i"),
    lookbehind: true
  },
  "number": {
    pattern: re("(^(?=\\d)|[^<0>])(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?", charClass, "i"),
    lookbehind: true
  },
  "operator": {
    pattern: re("[<>*/+-]=?|[%=]|\\b(?:and|not|or)\\b|(^|[^<0>])(?:и|или|не)(?![\\w<0>])", charClass, "i"),
    lookbehind: true
  },
  "punctuation": /\(\.|\.\)|[()[\].,:;]/,
  // Теги препроцессора вида &Клиент, &Сервер, ...
  // Preprocessor tags of the type &Client, &Server, ...
  // Инструкции препроцессора вида:
  // #Если Сервер Тогда
  // ...
  // #КонецЕсли
  // Preprocessor instructions of the form:
  // #If Server Then
  // ...
  // #EndIf
  "directive": {
    pattern: /^([ 	]*)[&#].*/gm,
    lookbehind: true,
    greedy: true,
    alias: "important"
  }
};
//# sourceMappingURL=bsl.js.map
