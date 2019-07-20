***************************************************************************************
* $Id: yrmask.gs,v 1.4 2014/06/02 22:37:36 bguan Exp bguan $
*
* Copyright (c) 2014, Bin Guan
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification, are
* permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this list
*    of conditions and the following disclaimer.
*
* 2. Redistributions in binary form must reproduce the above copyright notice, this
*    list of conditions and the following disclaimer in the documentation and/or other
*    materials provided with the distribution.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
* OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
* SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
* INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
* TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
* BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
* ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
* DAMAGE.
***************************************************************************************
function yrmask(arg)
*
* Generate mask for calendar years.
*
rc=gsfallow('on')

* Define system temporary directory.
tmpdir='/tmp'
* Get username and create user-specific temporary directory.
'!echo $USER > .bGASL.txt'
rc=read('.bGASL.txt')
while(sublin(rc,1))
  '!echo $USER > .bGASL.txt'
  rc=read('.bGASL.txt')
endwhile
user=sublin(rc,2)
'!rm .bGASL.txt'
mytmpdir=tmpdir'/bGASL-'user
'!mkdir -p 'mytmpdir
* Get process ID.
pidlock=mytmpdir'/pid.lock'
pidfile=mytmpdir'/pid.txt'
'!while true; do if mkdir 'pidlock'; then break; else echo System busy. Please wait...; sleep 1; fi; done 2> /dev/null'
'!echo $PPID > 'pidfile
rc=read(pidfile)
randnum=sublin(rc,2)
'!rm -r 'pidlock

cnt=1
word=subwrd(arg,cnt)
while(valnum(word)!=0)
yr.cnt=word
cnt=cnt+1
word=subwrd(arg,cnt)
endwhile
yrs=cnt-1
mask=subwrd(arg,yrs+1)
year=subwrd(arg,yrs+2)
if(mask='')
  usage()
  return
endif

qdims()

*
* Write .dat file.
*
'set x '_xs
'set y '_ys
'set z '_zs
'set gxout fwrite'
'set fwrite 'mytmpdir'/yrmask.dat.'randnum
cnt=_ts
while(cnt<=_te)
  'set t 'cnt
  'query dims'
  line5=sublin(result,5)
  tims_tmp=subwrd(line5,6)
  len=strlen(tims_tmp)
  YYYY=substr(tims_tmp,len-3,4)
  'display 'YYYY
  cnt=cnt+1
endwhile
'disable fwrite'
'set gxout contour'
'set t '_ts' '_te

*
* Write .ctl file.
*
lines=10
line.1='DSET ^yrmask.dat.'randnum
line.2='UNDEF 'dfile_undef()
if(_cal='')
  line.3='*Intentionally left blank.'
else
  line.3='OPTIONS '_cal
endif
line.4='XDEF 1 LEVELS '_lons
line.5='YDEF 1 LEVELS '_lats
line.6='ZDEF 1 LEVELS '_levs
line.7=_tdef
line.8='VARS 1'
line.9='yr 0 99 numbers between 1 and 12 corresponding to calendar year of each time step.'
line.10='ENDVARS'
cnt=1
while(cnt<=lines)
  status=write(mytmpdir'/yrmask.ctl.'randnum,line.cnt)
  cnt=cnt+1
endwhile
status=close(mytmpdir'/yrmask.ctl.'randnum)

*
* Output to variable(s). Done before resetting x/y/z to save memory.
*
'open 'mytmpdir'/yrmask.ctl.'randnum
file_num=file_number()
mask'=lon-lon'
cnt=1
while(cnt<=yrs)
'masktmp=maskout(1,yr.'file_num'-'yr.cnt')*maskout(1,'yr.cnt'-yr.'file_num')'
'masktmp=const(masktmp,0,-u)'
mask'='mask'+masktmp'
cnt=cnt+1
endwhile
mask'='mask'/'mask
'undefine masktmp'
if(year!='')
'define 'year'=yr.'file_num'*'mask
endif
'close 'file_num
'!rm 'mytmpdir'/yrmask.dat.'randnum

*
* Restore original dimension environment.
*
_resetx
_resety
_resetz
_resett

return
***************************************************************************************
function file_number()
*
* Get the number of files opened.
*
'q files'
line1=sublin(result,1)
if(line1='No files open')
  return 0
endif

lines=1
while(sublin(result,lines+1)!='')
  lines=lines+1
endwhile

return lines/3
***************************************************************************************
function dfile_undef()
*
* Get undef value from the default file. (Not 'q undef', which is for output.)
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
say '  Generate mask for calendar years.'
say ''
say '  USAGE: yrmask <yr1> [<yr2>...] <mask> [<year>]'
say '    <yr>: calendar year NOT to mask out.'
say '    <mask>: mask. Ones over unmasked years, missing values elsewhere.'
say '    <year>: calendar year where <mask> = 1, missing value elsewhere.'
say ''
say '  NOTE: any time grid or calendar is supported.'
say ''
say '  EXAMPLE: define a variable "posIODnoENSO" with ones over 1961, 1967, and 1983, and missing values over other years.'
say '    yrmask 1961 1967 1983 posIODnoENSO'
say ''
say '  DEPENDENCIES: qdims.gsf'
say ''
say '  Copyright (c) 2014, Bin Guan.'
return
