# bootstrap-heading() mixin approximates %heading placeholder

    Code
      heading_placeholder
    Output
      [1] "%heading {"                               
      [2] "  margin-top: 0; // 1"                    
      [3] "  margin-bottom: $headings-margin-bottom;"
      [4] "  font-family: $headings-font-family;"    
      [5] "  font-style: $headings-font-style;"      
      [6] "  font-weight: $headings-font-weight;"    
      [7] "  line-height: $headings-line-height;"    
      [8] "  color: var(--#{$prefix}heading-color);" 
      [9] "}"                                        

