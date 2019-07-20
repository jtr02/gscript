***************************************************************************************
*	$Id: rms.gs,v 1.5 2008/07/02 21:36:24 bguan Exp bguan $
*	Copyright (C) 2007 Bin Guan.
*	Distributed under GNU/GPL.
***************************************************************************************
function rms(arg)
*
* Root mean squares of a time series.
*
rc=gsfallow('on')

input=subwrd(arg,1)
rms=subwrd(arg,2)
if(input='')
usage()
return
endif
if(rms='')
output='rmsout'
endif

qdims()

'set t '_ts' '_te
'define rmstmpsqr=pow('input',2)'

'set t 1'
'define 'rms'=sqrt(ave(rmstmpsqr,t='_ts',t='_te'))'

'set t '_ts' '_te

'undefine rmstmpsqr'
return
***************************************************************************************
function usage()
*
* Print usage information.
*
say '  Root mean squares of a time series.'
say ''
say '  Usage: rms <input> [<rms>]'
say '     <input>: input time series.'
say '     <rms>: root mean squares. Defalts to "rmsout".'
say ''
say '  Dependencies: qdims.gsf'
say ''
say '  Copyright (C) 2007 Bin Guan.'
say '  Distributed under GNU/GPL.'
return
