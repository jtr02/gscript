***************************************************************************************
*	$Id: monmskt.gs,v 1.14 2006/04/06 21:18:41 bguan Exp bguan $
*	Copyright (C) 2004 Bin Guan.
*	Distributed under GNU/GPL.
***************************************************************************************
function monmskt(arg)
*
* Mask out specified months for a monthly time series.
*
rc=gsfallow('on')

input=subwrd(arg,1)
mon1=subwrd(arg,2)
mon2=subwrd(arg,3)
output=subwrd(arg,4)
tres=subwrd(arg,5)
if(mon2='')
usage()
return
endif
if(output='')
output=input
endif
if(tres='')
tres='monthly'
endif

if(tres='monthly' & (valnum(mon1)!=1 | mon1<1 | mon1>12))
say 'MONMSKT Error: <month1> must be an integer between 1 and 12.'
say ''
usage()
return
endif
if(tres='monthly' & (valnum(mon2)!=1 | mon2<1 | mon2>12))
say 'MONMSKT Error: <month2> must be an integer between 1 and 12.'
say ''
usage()
return
endif

qdims()

'set t '_ts' '_te
'mnmttmp='input

mon1minus1=mon1-1
if(tres='monthly' | tres='seasonal')
'set time Jan Dec'
endif
'mmskII=1'
'mmskII1=const(mmskII(t-'mon1minus1'),0,-u)'
'mmskII2=const(mmskII(t-'mon2'),0,-u)'
'mmskII=mmskII1-mmskII2'
if(mon1<=mon2)
'mmskII=maskout(mmskII,mmskII-0.5)'
else
'mmskII=maskout(mmskII+1,mmskII)'
endif

if(tres='monthly' | tres='seasonal')
'modify mmskII seasonal'
endif
'set t '_ts' '_te
if(output='display'|output='DISPLAY')
'display mnmttmp*mmskII'
else
output'=mnmttmp*mmskII'
endif
'undefine mnmttmp'
'undefine mmskII'
'undefine mmskII1'
'undefine mmskII2'

return
***************************************************************************************
function usage()
*
* Print usage information.
*
say '  Mask out part of a monthly time series.'
say ''
say '  Usage: monmskt <input> <month1> <month2> [<output>]'
say '     <input>: input monthly time series.'
say '     <month1>: the first calendar month not to mask out, e.g., 11.'
say '     <month2>: the last calendar month not to mask out, e.g., 2.'
say '     <output>: output monthly time series. Defaults to input.'
say '	            If <output> = DISPLAY, only a graph will be displayed.'
say ''
say '  Example 1: monmskt sst 12 2'
say '             This would set all months but December, January and February to missing values for the variable sst.'
say ''
say '  Example 2: monmskt sst 7 11 sst2'
say '             This would set all months but JASON period to missing values for the variable sst, and store the new time series in sst2.'
say ''
say '  Requires: qdims.gsf'
say ''
say '  Copyright (C) 2004 Bin Guan.'
say '  Distributed under GNU/GPL.'
return
