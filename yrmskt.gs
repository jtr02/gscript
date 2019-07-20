***************************************************************************************
*	$Id: yrmskt.gs,v 1.2 2005/07/11 19:17:00 bguan Exp bguan $
*	Copyright (C) 2005 Bin Guan.
*	Distributed under GNU/GPL.
***************************************************************************************
function yrmskt(arg)
*
* Mask out specified years for a yearly time series.
*
rc=gsfallow('on')

input=subwrd(arg,1)
year1=subwrd(arg,2)
year2=subwrd(arg,3)
output=subwrd(arg,4)
if(year2='')
usage()
return
endif
if(output='')
output=input
endif

qdims()
year1=year1-_yrs+1
year2=year2-_yrs+1

'run monmskt 'input' 'year1' 'year2' 'output' yearly'

return
***************************************************************************************
function usage()
*
* Print usage information.
*
say '  Mask out part of a yearly time series.'
say ''
say '  Usage: yrmskt <input> <year1> <year2> [<output>]'
say '     <input>: input yearly time series.'
say '     <year1>: the first calendar year not to mask out.'
say '     <year2>: the last calendar year not to mask out.'
say '     <output>: output yearly time series. Defaults to input.'
say '	            If <output> = DISPLAY, only a graph will be displayed.'
say ''
say '  Example 1: yrmskt sst 1900 1999'
say '             This would set all years but 1900--1999 to missing values for the variable sst.'
say ''
say '  Example 2: yrmskt sst 1900 1999 sst2'
say '             This would set all years but 1900--1999 to missing values for the variable sst, and store the new time series in sst2.'
say ''
say '  Requires: qdims.gsf, monmskt.gs'
say ''
say '  Copyright (C) 2005 Bin Guan.'
say '  Distributed under GNU/GPL.'
return
