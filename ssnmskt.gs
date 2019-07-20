***************************************************************************************
*	$Id: ssnmskt.gs,v 1.4 2005/07/11 19:06:02 bguan Exp $
*	Copyright (C) 2004 Bin Guan.
*	Distributed under GNU/GPL.
***************************************************************************************
function ssnmskt(arg)
*
* Mask out specified seasons for a seasonal time series.
*
rc=gsfallow('on')

input=subwrd(arg,1)
ssn1=subwrd(arg,2)
ssn2=subwrd(arg,3)
output=subwrd(arg,4)
if(ssn2='')
usage()
return
endif
if(output='')
output=input
endif

if(valnum(ssn1)!=1|ssn1<1|ssn1>4)
say 'SSNMSKT Error: <season1> must be an integer between 1 and 4.'
say ''
usage()
return
endif
if(valnum(ssn2)!=1|ssn2<1|ssn2>4)
say 'SSNMSKT Error: <season2> must be an integer between 1 and 4.'
say ''
usage()
return
endif

'run monmskt 'input' 'ssn1' 'ssn2' 'output' seasonal'

return
***************************************************************************************
function usage()
*
* Print usage information.
*
say '  Mask out part of a seasonal time series.'
say ''
say '  Usage: ssnmskt <input> <season1> <season2> [<output>]'
say '     <input>: input seasonal time series.'
say '     <season1>: the first season not to mask out (1=winter, 2=spring, 3=summer, 4=fall).'
say '     <season2>: the last season not to mask out (1=winter, 2=spring, 3=summer, 4=fall).'
say '     <output>: output seasonal time series. Defaults to input.'
say '	            If <output> = DISPLAY, only a graph will be displayed.'
say ''
say '  Example 1: ssnmskt sst 1 1'
say '             This would set all seasons but winter to missing values for the variable sst.'
say ''
say '  Example 2: ssnmskt sst 4 1 sst2'
say '             This would set all seasons but fall and winter to missing values for the variable sst, and store the new time series in sst2.'
say ''
say '  Requires: qdims.gsf, monmskt.gs'
say ''
say '  Copyright (C) 2004 Bin Guan.'
say '  Distributed under GNU/GPL.'
return
