***************************************************************************************
*       $Id: trend.gs,v 1.10 2006/05/24 19:37:57 bguan Exp bguan $
*       Copyright (C) 2005 Bin Guan.
*       Distributed under GNU/GPL.
***************************************************************************************
function trend(arg)
*
* Calculate linear trend defined by least square fitting.
*
rc=gsfallow('on')

input=subwrd(arg,1)
output=subwrd(arg,2)
slope=subwrd(arg,3)
rmse=subwrd(arg,4)
if(input=''); usage(); return; endif
if(output=''); output=input; endif

qdims()

'trndtmp='input
'set t '_ts' '_te
'ones=1'
'tttmp=tloop(sum(ones,t='_ts',t+0))+'_ts'-1'
'tttmp=maskout(tttmp,trndtmp/trndtmp)'
'tttmp=ave(ave(tttmp,x='_xs',x='_xe'),y='_ys',y='_ye')'
'set t 1'
'trndslope=tregr(tttmp,trndtmp,t='_ts',t='_te')'
'trndintercept=ave(trndtmp,t='_ts',t='_te')-trndslope*ave(tttmp,t='_ts',t='_te')'
'set t '_ts' '_te
'define trndrecon=trndslope*tttmp+trndintercept'
'define trnddiff=trndrecon-trndtmp'
if(output='DISPLAY' | output='display')
'display trndrecon'
else
'define 'output'=trndrecon'
endif
'set t 1'
if(slope!='')
'define 'slope'=trndslope'
endif
if(rmse!='')
'define 'rmse'=sqrt(ave(trnddiff*trnddiff,t='_ts',t='_te'))'
endif
'set t '_ts' '_te
'undefine trndtmp'
'undefine ones'
'undefine tttmp'
'undefine trndslope'
'undefine trndintercept'
'undefine trndrecon'
'undefine trnddiff'

return
***************************************************************************************
function usage()
*
* Print usage information.
*
say '  Linear trend defined by least square fitting.'
say ''
say '  Usage: trend <input> [<output> [<slope> [<rmse>]]]'
say '    <input>: input field.'
say '    <output>: output field.'
say '    <slope>: linear trend, i.e., change of <input> per time step.'
say '    <rmse>: root mean square error.'
say ''
say '  Requires: qdims.gsf'
say ''
say '  Copyright (C) 2005-2006 Bin Guan.'
say '  Distributed under GNU/GPL.'
return
