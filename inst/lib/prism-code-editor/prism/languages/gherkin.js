import { l as languages } from "../../index-XEj74r-1.js";
var tableRow = "\n[ 	]*\\|.+\\|(?:(?!\\|).)*";
languages.gherkin = {
  "pystring": {
    pattern: /("""|''')[^]+?\1/,
    alias: "string"
  },
  "comment": {
    pattern: /(^[ 	]*)#.*/m,
    lookbehind: true
  },
  "tag": {
    pattern: /(^[ 	]*)@\S*/m,
    lookbehind: true
  },
  "feature": {
    pattern: /(^[ 	]*)(?:Ability|Ahoy matey!|Arwedd|Aspekt|Besigheid Behoefte|Business Need|Caracteristica|Característica|Egenska[bp]|Eiginleiki|Feature|Fīča|Fitur|Fonctionnalité|Fonksyonalite|Funcionalidade|Funcionalitat|Functionalitate|Funcţionalitate|Funcționalitate|Functionaliteit|Fungsi|Funkcia|Funkcija|Funkcionalitāte|Funkcionalnost|Funkcja|Funksie|Funktionalität|Funktionalitéit|Funzionalità|Hwaet|Hwæt|Jellemző|Karakteristik|Lastnost|Mak|Mogucnost|laH|Mogućnost|Moznosti|Možnosti|OH HAI|Omadus|Ominaisuus|Osobina|Özellik|Potrzeba biznesowa|perbogh|poQbogh malja'|Požadavek|Požiadavka|Pretty much|Qap|Qu'meH 'ut|Savybė|Tính năng|Trajto|Vermoë|Vlastnosť|Właściwość|Značilnost|Δυνατότητα|Λειτουργία|Могућност|Мөмкинлек|Особина|Свойство|Үзенчәлеклелек|Функционал|Функционалност|Функция|Функціонал|תכונה|خاصية|خصوصیت|صلاحیت|کاروبار کی ضرورت|وِیژگی|रूप लेख|ਖਾਸੀਅਤ|ਨਕਸ਼ ਨੁਹਾਰ|ਮੁਹਾਂਦਰਾ|గుణము|ಹೆಚ್ಚಳ|ความต้องการทางธุรกิจ|ความสามารถ|โครงหลัก|기능|フィーチャ|功能|機能):(?:[^\n:]+(?:\n|$))*/m,
    lookbehind: true,
    inside: {
      "keyword": /[^\n:]+:/,
      "important": /^.+/
    }
  },
  "scenario": {
    pattern: /(^[ 	]*)(?:Abstra[ck]t Scenario|Achtergrond|Aer|Ær|Agtergrond|All y'all|Antecedente?s|Atburðarás|Atburðarásir|Awww, look mate|B4|Background|Baggrund|Bakgrun[dn]|Bakgrunnur|Beispiele|Beispiller|Bối cảnh|Cefndir|Cen[aá]rios?|Cenário|Cen[aá]rio de Fundo|Conte[sx]to|Contexte?|Contoh?|Contone|Dæmi|Dasar|Dead men tell no tales|Delineacao do Cenario|Delineação do Cenário|Dis is what went down|Dữ liệu|Dyagram [Ss]enaryo|Egzanp|Ejemplos|Eksempler|Ekzemploj|Enghreifftiau|Esbozo do escenario|Escenario?|Esempi|Esquema de l'escenari|Esquema del escenario|Esquema do Cenario|Esquema do Cenário|EXAMPLZ|Examples|Exempel|Exemples?|Exemplos|First off|Fono|Forgatókönyv|Forgatókönyv vázlat|Fundo|Geçmiş|Grundlage|Hannergrond|ghantoH|Háttér|Heave to|Istorik|Juhtumid|Keadaan|Khung kịch bản|Khung tình huống|Kịch bản|Koncept|Konsep skenario|Kontèks|Kontekst|Konteksta?s|Kontext|Konturo de la scenaro|Latar Belakang|lut chovnatlh|lut|lutmey|Lýsing Atburðarásar|Lýsing Dæma|MISHUN SRSLY|MISHUN|Menggariskan Senario|mo'|Náčrt Scenár[au]|Náčrt Scénáře|Oris scenarija|Örnekler|Osnova|Osnova Scenára|Osnova scénáře|Osnutek|Ozadje|Paraugs|Pavyzdžiai|Példák|Piemēri|Plan du scénario|Plan du Scénario|Plan Senaryo|Plan senaryo|Plang vum Szenario|Pozadí|Pozadie|Pozadina|Príklady|Příklady|Primeri?|Primjeri|Przykłady|Raamstsenaarium|Reckon it's like|Rerefons|Scenár|Scénář|Scenari(?:e|jai|jaus šablonas|ji?|jus|o Amlinellol|o Outline|o Template|omall?|os?|u|usz)|Scénario|Scenārijs|Scenārijs pēc parauga|Scenaro|Schema dello scenario|Se ðe|Se the|Se þe|Senar[iy]o|Senaryo Deskripsyon|Senaryo deskripsyon|Senaryo taslağı|Shiver me timbers|Situācija|Situai|Situasie Uiteensetting|Situasie|Skenario konsep|Skenario|Skica|Structura scenariu|Structură scenariu|Struktura scenarija|Stsenaarium|Swa hwaer swa|Swa|Swa hwær swa|Szablon scenariusza|Szenario|Szenariogrundriss|Tapaukset|Tapaus|Tapausaihio|Tausta?|Template Keadaan|Template Senario|Template Situai|The thing of it is|Tình huống|Variantai|Voorbeelden?|Wharrimean is|Yo-ho-ho|You'll wanna|Założenia|Παραδείγματα|Περιγραφή Σεναρίου|Σενάρι[αο]|Υπόβαθρο|Кереш|Контекст|Концепт|Мисаллар|Мисоллар|Основа|Передумова|Позадина|Предистория|Предыстория|Приклади|Примери?|Примеры|Рамка на сценарий|Скица|Структура сценарија|Структура сценария|Структура сценарію|Сценарий|Сценарий структураси|Сценарийның төзелеше|Сценарији|Сценарио|Сценарій|Тарих|Үрнәкләр|דוגמאות|רקע|תבנית תרחיש|תרחיש|الخلفية|الگوی سناریو|امثلة|پس منظر|زمینه|سناریو|سيناريو|سيناريو مخطط|مثالیں|منظر نامے کا خاکہ|منظرنامہ|نمونه ها|उदाहरण|परिदृश्य|परिदृश्य रूपरेखा|पृष्ठभूमि|ਉਦਾਹਰਨਾਂ|ਪਟਕਥਾ|ਪਟਕਥਾ ਢਾਂਚਾ|ਪਟਕਥਾ ਰੂਪ ਰੇਖਾ|ਪਿਛੋਕੜ|ఉదాహరణలు|కథనం|నేపథ్యం|సన్నివేశం|ಉದಾಹರಣೆಗಳು|ಕಥಾಸಾರಾಂಶ|ವಿವರಣೆ|ಹಿನ್ನೆಲೆ|โครงสร้างของเหตุการณ์|ชุดของตัวอย่าง|ชุดของเหตุการณ์|แนวคิด|สรุปเหตุการณ์|เหตุการณ์|배경|시나리오|시나리오 개요|예|サンプル|シナリオ|シナリオアウトライン|シナリオテンプレ|シナリオテンプレート|テンプレ|例子?|剧本|剧本大纲|劇本|劇本大綱|场景|场景大纲|場景|場景大綱|背景):[^\n:]*/m,
    lookbehind: true,
    inside: {
      "keyword": /[^\n:]+:/,
      "important": /.+/
    }
  },
  "table-body": {
    // Look-behind is used to skip the table head, which has the same format as any table row
    pattern: RegExp("(" + tableRow + ")(?:" + tableRow + ")+"),
    lookbehind: true,
    inside: {
      "outline": {
        pattern: /<[^>]+>/,
        alias: "variable"
      },
      "td": {
        pattern: /\s*[^\s|][^|]*/,
        alias: "string"
      },
      "punctuation": /\|/
    }
  },
  "table-head": {
    pattern: RegExp(tableRow),
    inside: {
      "th": {
        pattern: /\s*[^\s|][^|]*/,
        alias: "variable"
      },
      "punctuation": /\|/
    }
  },
  "atrule": {
    pattern: /(^[ 	]+)(?:'a|'ach|'ej|7|A také|A taktiež|A tiež|A zároveň|Aber|Ac|Adott|Akkor|Ak|Aleshores|Al[ei]|Allora|Alors|Als|Ama|Amennyiben|Amikor|Ampak|an?|AN|Ananging|And y'all|And|Angenommen|Anrhegedig a|An|Apabila|Atès|Atesa|Atunci|Avast!|Aye|A|awer|Bagi|Banjur|Bet|Biết|Blimey!|Buh|But at the end of the day I reckon|But y'all|But|BUT|Cal|Când|Cand|Ce|Cu?ando|Če|Ða ðe|Ða|Dadas?|Dados?|DaH ghu' bejlu'|dann|Dan[no]?|Dar|Dat[ie]? fiind|Dat[aei]|Da[ţț]i fiind|DEN|Dato|De|Den youse gotta|Dengan|Diberi|Diyelim ki|Donada|Donat|Donitaĵo|Do|Dun|Duota|Ðurh|Eeldades|Ef|Eğer ki|Entao|Então|Entón|En?|Entonces|Epi|És|[EÉ]tant donnée?s?|Et|Fakat|Gangway!|Gdy|Gegeben seien|Gegeben sei|Gegeven|Gegewe|ghu' noblu'|Gitt|Given y'all|Give[nt]|Givun|Ha|Cho|I CAN HAZ|In|Ir|It's just unbelievable|I|Ja|Jeśli|Jeżeli|Kad|Kadar?|Ka[ij]|Když|Keď|Kemudian|Ketika|Khi|Kiedy|Ko|Kuid?|Kun|Lan|latlh|Le sa a|Let go and haul|Le|Lè sa a|Lè|Logo|Lorsqu'<|Lorsque|mä|Maar|Mais|Mając|Majd|Maka|Manawa|Mas?|Men|Menawa|Mutta|Nalika|Nalikaning|Nanging|Når|När|Nato|Nhưng|Niin|Njuk|O zaman|Och|Og|Oletetaan|Onda?|Oraz|Pak|Per[oò]|Podano|Pokiaľ|Pokud|Potem|Potom|Privzeto|Pryd|Quan|Quando?|qaSDI'|Så|Sed?|Siis|Sipoze ke|Sipoze Ke|Sipoze|Si|Şi|Și|Soit|Stel|Tada?|Takrat|Tak|Tapi|Ter|Tetapi|Tha the|Tha|[TW]hen y'all|[TW]hen|Thì|Thurh|Toda|Too right|Und?|ugeholl|Và|vaj|Vendar|Ve|wann|Wanneer|WEN|Wenn|Wtedy|Wun|Y'know|Yeah nah|Yna|Youse know like when|Youse know when youse got|Y|Za predpokladu|Za předpokladu|Zadani?|Zadano|Zadat[eo]|Zakładając|Zaradi|Zatati|Þa þe|Þa|Þá|Þegar|Þurh|Αλλά|Δεδομένου|Και|Όταν|Τότε|А також|Агар|Ал[еи]|Аммо|А|Әгәр|Әйтик|Әмма|Бирок|Ва|Вә|Дадено|Дано|Допустим|Если|Задат[еио]|И|І|К тому же|Када?|Когато|[КТ]огда|Коли|Ләкин|Лекин|Нәтиҗәдә|Нехай|Но|[ОУ]нда|Припустимо, що|Припустимо|Пусть|Также|Та|Тоді|То|Һәм|Якщо|אבל|אזי?|בהינתן|וגם|כאשר|آنگاه|اذاً|اگر|اما|اور|با فرض|بالفرض|بفرض|پھر|تب|ثم|جب|عندما|فرض کیا|لكن|لیکن|متى|هنگامی|و|अगर|और|कदा|किन्तु|चूंकि|जब|तथा|तदा|तब|परन्तु|पर|यदि|ਅਤੇ|ਜਦੋਂ|ਜਿਵੇਂ ਕਿ|ਜੇਕਰ|ਤਦ|ਪਰ|అప్పుడు|ఈ పరిస్థితిలో|కాని|చెప్పబడినది|మరియు|ಆದರೆ|ನಂತರ|ನೀಡಿದ|ಮತ್ತು|ಸ್ಥಿತಿಯನ್ನು|กำหนดให้|ดังนั้น|แต่|เมื่อ|และ|그러면<|그리고<|단<|만약<|만일<|먼저<|조건<|하지만<|かつ<|しかし<|ただし<|ならば<|もし<|並且<|但し<|但是<|假如<|假定<|假設<|假设<|前提<|同时<|同時<|并且<|当<|當<|而且<|那么<|那麼<)(?=[ 	])/m,
    lookbehind: true
  },
  "string": {
    pattern: /"(?:\\.|[^\\\n"])*"|'(?:\\.|[^\\\n'])*'/,
    inside: {
      "outline": {
        pattern: /<[^>]+>/,
        alias: "variable"
      }
    }
  },
  "outline": {
    pattern: /<[^>]+>/,
    alias: "variable"
  }
};
//# sourceMappingURL=gherkin.js.map
