import { l as languages } from "../../index-XEj74r-1.js";
languages.uorazor = {
  "comment-hash": {
    pattern: /#.*/g,
    alias: "comment",
    greedy: true
  },
  "comment-slash": {
    pattern: /\/\/.*/g,
    alias: "comment",
    greedy: true
  },
  "string": {
    pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
    inside: {
      "punctuation": /^["']|["']$/
    },
    greedy: true
  },
  "source-layers": {
    pattern: /\b(?:arms|backpack|blue|bracelet|cancel|clear|cloak|criminal|earrings|enemy|facialhair|friend|friendly|gloves|gray|grey|ground|hair|head|innerlegs|innertorso|innocent|lefthand|middletorso|murderer|neck|nonfriendly|onehandedsecondary|outerlegs|outertorso|pants|red|righthand|ring|self|shirt|shoes|talisman|waist)\b/i,
    alias: "function"
  },
  "source-commands": {
    pattern: /\b(?:alliance|attack|cast|clearall|clearignore|clearjournal|clearlist|clearsysmsg|createlist|createtimer|dclick|dclicktype|dclickvar|dress|dressconfig|drop|droprelloc|emote|getlabel|guild|gumpclose|gumpresponse|hotkey|ignore|lasttarget|lift|lifttype|menu|menuresponse|msg|org|organizer?|overhead|pause|poplist|potion|promptresponse|pushlist|removelist|removetimer|rename|restock|say|scav|scavenger|script|setability|setlasttarget|setskill|settimer|setvar|sysmsg|target|targetloc|targetrelloc|targettype|undress|unignore|unsetvar|useobject|useonce|useskill|usetype|virtue|wait|waitforgump|waitformenu|waitforprompt|waitforstat|waitforsysmsg|waitfortarget|walk|wfsysmsg|wft|whisper|yell)\b/,
    alias: "function"
  },
  "tag-name": {
    pattern: /(^\{%-?\s*)\w+/,
    lookbehind: true,
    alias: "keyword"
  },
  "delimiter": {
    pattern: /^\{[{%]-?|-?[%}]\}$/,
    alias: "punctuation"
  },
  "function": /\b(?:atlist|close|closest|count|counter|counttype|dead|dex|diffhits|diffmana|diffstam|diffweight|find(?:buff|debuff|layer|typelist|type)?|followers|gumpexists|hidden|hits|hp|hue|human|humanoid|ingump|inlist|insysmessage|insysmsg|int|invul|[lr]handempty|list|listexists|mana|maxhits|maxhp|maxmana|maxstam|maxweight|monster|mounted|name|next|noto|paralyzed|poisoned|position|prev|previous|queued|rand|random|skill|stam|str|targetexists|timer|timerexists|varexist|warmode|weight)\b/,
  "keyword": /\b(?:and|as|break|continue|else|elseif|endfor|endif|endwhile|f?or|if|loop|not|replay|stop|while)\b/,
  "boolean": /\b(?:false|true|null)\b/,
  "number": /\b0x[a-fA-F\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
  "operator": [
    {
      pattern: /(\s)(?:and|b-and|b-x?or|ends with|in|is|matches|not|or|same as|starts with)(?!\S)/,
      lookbehind: true
    },
    /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[~%|+-]/
  ],
  "punctuation": /[()[\]{}.,:]/
};
//# sourceMappingURL=uorazor.js.map
