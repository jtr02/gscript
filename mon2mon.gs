***************************************************************************************
*	$Id: mon2yr.gs,v 1.8 2006/03/08 19:44:34 bguan Exp bguan $
*	Copyright (C) 2005 Bin Guan.
*	Distributed under GNU/GPL.
***************************************************************************************
function mon2mon(arg)
*
* Monthly-to-yearly regridding.
*
rc=gsfallow('on')
tmpdir='/tmp'
*
* Parse -v option (variables to be saved).
*
t1=subwrd(arg,1)
say 'interannual variation is fiexed to month 't1

num_var=parseopt(arg,'-','v','var')
if(num_var=0)
usage()
return
endif

*
* Initialize other options.
*
cnt=1
while(cnt<=num_var)
_.name.cnt=_.var.cnt
cnt=cnt+1
endwhile
_.file.1=''
_.path.1='.'

*
* Parse -n option (name to be used in .ctl).
*
rc=parseopt(arg,'-','n','name')

*
* Parse -o option (common name for .dat and .ctl pair).
*
rc=parseopt(arg,'-','o','file')

*
* Parse -p option (path to output files).
*
rc=parseopt(arg,'-','p','path')

'set gxout fwrite'
'set fwrite 'tmpdir'/yrlz.dat~'

*
* Ensure x-coordinates are integers and there are no redundant grid points.
*
qdims()
_tims_old=_tims
_time_old=_time
_xs_old=_xs
_xe_old=_xe
if(math_int(_xs)!=_xs | math_int(_xe)!=_xe)
xs_new=math_int(_xs)+1
xe_new=math_int(_xe)+1
'set x 'xs_new' 'xe_new
qdims()
endif
if(_lone-_lons>=360)
rddnt_points=(_lone-_lons-360)/_dlon+1
'set x '_xs' '_xe-rddnt_points
qdims()
endif

'set t '_ts' '_te
vcnt=1
while(vcnt<=num_var)
'mn2yrtmp'vcnt'='_.var.vcnt
vcnt=vcnt+1
endwhile

'set time JAN'_yrs' DEC'_yre
vcnt=1
while(vcnt<=num_var)
'montmp'vcnt'=mn2yrtmp'vcnt
vcnt=vcnt+1
endwhile
qdims()
years=_yre-_yrs+1

writectl(tmpdir'/yrlz.ctl~','^yrlz.dat~',years,num_var,name)

'set time JAN'_yrs

year=1
while(year<=years)
offset1=t1+(year-1)*12
say 'pick up time is =' offset1
#offset2=offset1+11

vcnt=1
while(vcnt<=num_var)
zcnt=_zs
while(zcnt<=_ze)
'set z 'zcnt
'yrtmp=ave(montmp'vcnt',t='offset1',t='offset1')'
'display const(yrtmp,'undef()',-u)'
zcnt=zcnt+1
endwhile
vcnt=vcnt+1
endwhile
year=year+1
endwhile

'disable fwrite'
vcnt=1
while(vcnt<=num_var)
'undefine mn2yrtmp'vcnt
'undefine montmp'vcnt
vcnt=vcnt+1
endwhile
'undefine yrtmp'
'set gxout contour'

'open 'tmpdir'/yrlz.ctl~'
file_num=file_number()
say 'Yearization finished. New variables are:'
vcnt=1
while(vcnt<=num_var)
say _.name.vcnt'.'file_num
vcnt=vcnt+1
endwhile

if(_.file.1!='')
writectl(_.path.1'/'_.file.1'.ctl','^'_.file.1'.dat',years,num_var,name)
'!cp 'tmpdir'/yrlz.dat~ '_.path.1'/'_.file.1'.dat'
endif

'set x '_xs_old' '_xe_old
'set z '_zs' '_ze
'set time '_tims_old' '_time_old

return
***************************************************************************************
function writectl(ctlfile,datfile,nt,nv,var)
*
* Write the .ctl file for the temporary .dat file
*
lines=8
line.1='DSET 'datfile
line.2='UNDEF 'undef()
line.3=_xdef
line.4=_ydef
line.5=_zdef
* Note: 'nt' below is an argument of function 'writectl', not the global variable '_nt'.
line.6='TDEF 'nt' LINEAR '_tims' 1yr'
line.7='VARS 'nv
line.8='ENDVARS'
cnt=1
while(cnt<=lines-1)
status=write(ctlfile,line.cnt)
cnt=cnt+1
endwhile
cnt=1
while(cnt<=nv)
varline=_.var.cnt' '_nz0' 99 '_.var.cnt
status=write(ctlfile,varline)
cnt=cnt+1
endwhile
status=write(ctlfile,line.lines)
status=close(ctlfile)

return
***************************************************************************************
function file_number()
*
* Get the number of files opened.
*
'q files'
if(result='No Files Open')
return 0
endif

lines=1
while(sublin(result,lines+1)!='')
lines=lines+1
endwhile

return lines/3
***************************************************************************************
function undef()
*
* Get undef value from the default .ctl file.
*
'q ctlinfo'
if(result='No Files Open')
return 'unknown'
endif

lines=1
while(1)
lin=sublin(result,lines)
if(subwrd(lin,1)='undef'|subwrd(lin,1)='UNDEF')
return subwrd(lin,2)
endif
lines=lines+1
endwhile
***************************************************************************************
function usage()
*
* Print usage information.
*
say '  Monthly-to-yearly regridding.'
say ''
say '  Usage: mon2yr -v <var1> [<var2>...] [-n <name1> [<name2>...]] [-o <file>] [-p <path>]'
say '     <var>: monthly variable.'
say '     <name>: name for yearly variable in saved .ctl file. Original name will be used if unset.'
say '     <file>: common name for output .dat and .ctl pair. No file output if unset.'
say '     <path>: path to output files. Do NOT include trailing "/". Defaults to current path.'
say ''
say '  Requires: parsestr.gsf, parseopt.gsf, qdims.gsf'
say ''
say '  Copyright (C) 2005 Bin Guan.'
say '  Distributed under GNU/GPL.'
return
