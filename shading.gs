***************************************************************************************
*	$Id: shading.gs,v 1.5 2006/05/25 01:31:41 bguan Exp bguan $
*	Copyright (C) 2005 Bin Guan.
*	Distributed under GNU/GPL.
***************************************************************************************
function shading(arg)
*
* Plot a 2-D graph with shading with specified color palette, cint and blackout. 
*
palette=subwrd(arg,1)
var=subwrd(arg,2)
cint=subwrd(arg,3)
blackout=subwrd(arg,4)

if(cint='')
usage()
return
endif

if(palette!='blue2red' & palette!='red2blue' & palette!='brown2green' & palette!='green2brown')
say 'SHATOUR Error: invalid color palette.'
usage()
return
endif

if(blackout='')
blackout=1
endif

if(valnum(blackout)=0)
say 'SHATOUR Error: <blackout> must be a number.'
usage()
return
endif

if(blackout<0)
say 'SHATOUR Error: <blackout> must be a positive number or zero.'
usage()
return
endif

'shadcon 'palette' 'var' 'cint' 'blackout' 'nocontour

return
***************************************************************************************
function usage()
*
* Print usage information.
*
say '  Plot a 2-D graph with shading.'
say ''
say '  USAGE: shading <palette> <var> <cint> [<blackout>]'
say '     <palette>: color palette. Available: blue2red, red2blue, brown2green.'
say '     <var>: variable to be plotted.'
say '     <cint>: shading/contour interval.'
say '     <blackout>: values between -<blackout>*<cint> to <blackout>*<cint> will NOT be shaded.'
say '                 Must be positive or zero. All values will be shaded/contoured if <blackout>=0. Defaults to 1.'
say ''
say '  Requires: shadcon.gs'
say ''
say '  Copyright (C) 2005 Bin Guan.'
say '  Distributed under GNU/GPL.'
return
