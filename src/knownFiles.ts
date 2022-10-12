/* eslint @typescript-eslint/naming-convention: "off" */

const KNOWN_FILE_TYPES = {
    c: { cs: "/*", cc: "** ", ce: "*/" },
    h: { cs: "/*", cc: "** ", ce: "*/" },
    css: { cs: "/*", cc: "** ", ce: "*/" },
    cpp: { cs: "/*", cc: "** ", ce: "*/" },
    sh: { cs: "#!/usr/bin/env bash\n##", cc: "## ", ce: "##" },
    php: { cs: "#!/usr/bin/env php\n<?php\n/*", cc: "** ", ce: "*/" },
    txt: { cs: "##", cc: "## ", ce: "##" },
    py: { cs: "#!/usr/bin/env python3\n##", cc: "## ", ce: "##" },
    rb: { cs: "#!/usr/bin/env ruby\n##", cc: "## ", ce: "##" },
    js: { cs: "//", cc: "// ", ce: "//" },
    ts: { cs: "//", cc: "// ", ce: "//" },
    jsx: { cs: "//", cc: "// ", ce: "//" },
    tsx: { cs: "//", cc: "// ", ce: "//" },
    html: { cs: "<!--", cc: "  -- ", ce: "-->" },
};

export default KNOWN_FILE_TYPES;

// 		 std-c-alist               '( { cs: "/*", cc: "** ", ce: "*/" } )
//       std-css-alist             '( { cs: "/*", cc: "** ", ce: "*/" } )
//       std-cpp-alist             '( { cs: "/*", cc: "** ", ce: "*/" } )
//       std-pov-alist             '( { cs: "//", cc: "// ", ce: "//" } )
//       std-java-alist            '( { cs: "//", cc: "// ", ce: "//" } )
//       std-latex-alist           '( { cs: "%%", cc: "%% ", ce: "%%" } )
//       std-lisp-alist            '( { cs: ";;", cc: ";; ", ce: ";;" } )
//       std-xdefault-alist        '( { cs: "!!", cc: "!! ", ce: "!!" } )
//       std-pascal-alist          '( { cs: "{ ", cc: "   ", ce: "}"  } )
//       std-makefile-alist        '( { cs: "##", cc: "## ", ce: "##" } )
//       std-text-alist            '( { cs: "##", cc: "## ", ce: "##" } )
//       std-fundamental-alist     '( { cs: "  ", cc: "   ", ce: "  " } )
//       std-html-alist            '( { cs: "<!--") (cc . "  -- ") (ce . "-->") )
//       std-php-alist             '( { cs: "#!/usr/bin/env php\n<?php\n/*") (cc . "** ") (ce . "*/") )
//       std-nroff-alist           '( { cs: "\\\"") (cc . "\\\" ") (ce . "\\\"") )
//       std-sscript-alist         '( { cs: "#!/usr/bin/env bash\n##")  (cc . "## ") (ce . "##") )
//       std-perl-alist            '( { cs: "#!/usr/bin/env perl\n##")  (cc . "## ") (ce . "##") )
//       std-cperl-alist           '( { cs: "#!/usr/bin/env perl\n##")  (cc . "## ") (ce . "##") )
//       std-python-alist          '( { cs: "#!/usr/bin/env python3\n##") (cc . "## ") (ce . "##") )
//       std-ruby-alist            '( { cs: "#!/usr/bin/env ruby\n##") (cc . "## ") (ce . "##") )
//       std-node-alist            '( { cs: "#!/usr/bin/env node\n/*") (cc . "** ") (ce . "*/") )
