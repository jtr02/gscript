***************************************************************************************
*	$Id: shatour.gs,v 1.14 2006/05/25 01:30:54 bguan Exp $
*	Copyright (C) 2005 Bin Guan.
*	Distributed under GNU/GPL.
***************************************************************************************
function shatour(arg)
*
* Plot a 2-D graph using both shading and contours with specified color palette, cint and blackout. 
*
palette=subwrd(arg,1)
var=subwrd(arg,2)
cint=subwrd(arg,3)
blackout=subwrd(arg,4)
switch=subwrd(arg,5)

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

if(switch='')
switch='default'
endif

if(palette='blue2red')
*
* blues
*
'set rgb 55   0   0 235'
'set rgb 56  35  55 235'
'set rgb 57  90 110 255'
'set rgb 58 145 165 255'
'set rgb 59 200 220 255'
negcols=5
*
* reds
*
'set rgb 61 255 240 170'
'set rgb 62 255 195 115'
'set rgb 63 255 140  60'
'set rgb 64 255  85   5'
'set rgb 65 255  30   0'
poscols=5
endif

if(palette='red2blue')
*
* reds
*
'set rgb 55 255  30   0'
'set rgb 56 255  85   5'
'set rgb 57 255 140  60'
'set rgb 58 255 195 115'
'set rgb 59 255 240 170'
negcols=5
*
* blues
*
'set rgb 61 200 220 255'
'set rgb 62 145 165 255'
'set rgb 63  90 110 255'
'set rgb 64  35  55 235'
'set rgb 65   0   0 235'
poscols=5
endif

if(palette='brown2green')
*
* browns
*
'set rgb 52 100  60  50'
'set rgb 53 120  80  70'
'set rgb 54 140 100  90'
'set rgb 55 160 120 110'
'set rgb 56 180 140 130'
'set rgb 57 200 160 150'
'set rgb 58 225 190 180'
'set rgb 59 240 220 210'
negcols=8
*
* greens
*
'set rgb 61 200 255 190'
'set rgb 62 180 250 170'
'set rgb 63 150 245 140'
'set rgb 64 120 245 115'
'set rgb 65  80 240  80'
'set rgb 66  55 210  60'
'set rgb 67  30 180  30'
'set rgb 68  15 160  15'
poscols=8
endif

*
* set black
*
black=(blackout-0.001)*cint
setblack='set black -'black' 'black
*
* set clevs
*
setclevs='set clevs'
cnt=-negcols
while(cnt<=-1)
clev=(cnt-(blackout-1))*cint
setclevs=setclevs' 'clev
cnt=cnt+1
endwhile
cnt=1
if(blackout=0)
cnt=cnt+1
endif
while(cnt<=poscols)
clev=(cnt+(blackout-1))*cint
setclevs=setclevs' 'clev
cnt=cnt+1
endwhile
*
* set ccols
*
setccols='set ccols'
cnt0=60
cnt=cnt0-negcols
while(cnt-cnt0<=-1)
setccols=setccols' 'cnt
cnt=cnt+1
endwhile
if(blackout!=0)
setccols=setccols' '0
endif
cnt=cnt0+1
while(cnt-cnt0<=poscols)
setccols=setccols' 'cnt
cnt=cnt+1
endwhile

if(switch!='noshading')
'set gxout shaded'
setclevs
setccols
'display 'var
endif
if(switch!='nocontour')
'set gxout contour'
'set cint 'cint
if(blackout!=0)
setblack
endif
'display 'var
endif

'set gxout contour'
return
***************************************************************************************
function usage()
*
* Print usage information.
*
say '  Plot a 2-D graph using both shading and contours.'
say ''
say '  USAGE: shatour <palette> <var> <cint> [<blackout>]'
say '     <palette>: color palette. Available: blue2red, red2blue, brown2green.'
say '     <var>: variable to be plotted.'
say '     <cint>: shading/contour interval.'
say '     <blackout>: values between -<blackout>*<cint> to <blackout>*<cint> will NOT be shaded/contoured.'
say '                 Must be positive or zero. All values will be shaded/contoured if <blackout>=0. Defaults to 1.'
say ''
say '  Copyright (C) 2005-2006 Bin Guan.'
say '  Distributed under GNU/GPL.'
return
