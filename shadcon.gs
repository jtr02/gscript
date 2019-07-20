***************************************************************************************
*	$Id: shadcon.gs,v 1.15 2008/07/03 17:08:11 bguan Exp bguan $
*	Copyright (C) 2008 Bin Guan.
*	Distributed under GNU/GPL.
***************************************************************************************
function shadcon(arg)
*
* Plot a 2-D graph using shading and/or contours with specified color map, contour interval and shreshold. 
*
rc=gsfallow('on')

colormapNopt=subwrd(arg,1)
var=subwrd(arg,2)
cint=subwrd(arg,3)
blackout=subwrd(arg,4)
blackout2=subwrd(arg,5)
* blackout is for shading, blackout2 is for contours.

if(cint='')
usage()
return
endif

qdims()

*
* extract color map option
*
colormap=colormapNopt
cmopt=''
tmpstr1=substr(colormapNopt,strlen(colormapNopt),1)
tmpstr2=substr(colormapNopt,strlen(colormapNopt)-1,2)
if(valnum(tmpstr1)=1)
colormap=substr(colormapNopt,1,strlen(colormapNopt)-1)
cmopt=tmpstr1
endif
if(valnum(tmpstr2)=1)
colormap=substr(colormapNopt,1,strlen(colormapNopt)-2)
cmopt=tmpstr2
endif

if(colormap!='light2dark' & colormap!='blue2red' & colormap!='red2blue' & colormap!='brown2green' & colormap!='green2brown')
say 'SHADCON ERROR: invalid color map.'
return
endif

if(blackout='')
blackout=1
endif

if(blackout='inf')
blackout=1e30
endif

if(valnum(blackout)!=1 & blackout!=1e30)
say 'SHADCON>ERROR: <blackout> must be an integer or inf.'
return
endif

if(blackout<0)
say 'SHADCON>ERROR: <blackout> must be non-negative.'
return
endif

if(blackout2='')
blackout2=blackout
endif

if(blackout2='inf')
blackout2=1e30
endif

if(valnum(blackout2)!=1 & blackout2!=1e30)
say 'SHADCON>ERROR: <blackout2> must be an integer or inf.'
return
endif

if(blackout2<0)
say 'SHADCON>ERROR: <blackout2> must be non-negative.'
return
endif

if(colormap='light2dark')
*
* light grey
*
left_cols=1
*'set rgb 59 255 255 255'
'set rgb 59 220 220 220'
*
* dark grey
*
right_cols=1
'set rgb 61 170 170 170'
endif

if(colormap='blue2red')
*
* blues
*
left_cols=5
'set rgb 55   0   0 235'
'set rgb 56  35  55 235'
'set rgb 57  90 110 255'
'set rgb 58 145 165 255'
'set rgb 59 200 220 255'
*left_cols=9
*'set rgb 51  20 100 210'
*'set rgb 52  30 110 235'
*'set rgb 53  40 130 240'
*'set rgb 54  60 150 245'
*'set rgb 55  80 165 245'
*'set rgb 56 120 185 250'
*'set rgb 57 150 210 250'
*'set rgb 58 180 240 250'
*'set rgb 59 225 255 255'
*
* reds
*
right_cols=5
'set rgb 61 255 240 170'
'set rgb 62 255 195 115'
'set rgb 63 255 140  60'
'set rgb 64 255  85   5'
'set rgb 65 255  30   0'
*right_cols=9
*'set rgb 61 255 250 170'
*'set rgb 62 255 232 120'
*'set rgb 63 255 192  60'
*'set rgb 64 255 160   0'
*'set rgb 65 255  96   0'
*'set rgb 66 255  50   0'
*'set rgb 67 225  20   0'
*'set rgb 68 192   0   0'
*'set rgb 69 165   0   0'
endif

if(colormap='red2blue')
*
* reds
*
left_cols=5
'set rgb 55 255  30   0'
'set rgb 56 255  85   5'
'set rgb 57 255 140  60'
'set rgb 58 255 195 115'
'set rgb 59 255 240 170'
*
* blues
*
right_cols=5
'set rgb 61 200 220 255'
'set rgb 62 145 165 255'
'set rgb 63  90 110 255'
'set rgb 64  35  55 235'
'set rgb 65   0   0 235'
endif

if(colormap='brown2green')
*
* browns
*
*left_cols=9
*'set rgb 51 100  60  50'
*'set rgb 52 120  80  70'
*'set rgb 53 140 100  90'
*'set rgb 54 160 120 110'
*'set rgb 55 180 140 130'
*'set rgb 56 200 160 150'
*'set rgb 57 225 190 180'
*'set rgb 58 240 220 210'
*'set rgb 59 250 240 230'
left_cols=8
'set rgb 52 100  60  50'
'set rgb 53 120  80  70'
'set rgb 54 140 100  90'
'set rgb 55 160 120 110'
'set rgb 56 180 140 130'
'set rgb 57 200 160 150'
'set rgb 58 225 190 180'
'set rgb 59 240 220 210'
*
* greens
*
*right_cols=9
*'set rgb 61 230 255 225'
*'set rgb 62 200 255 190'
*'set rgb 63 180 250 170'
*'set rgb 64 150 245 140'
*'set rgb 65 120 245 115'
*'set rgb 66  80 240  80'
*'set rgb 67  55 210  60'
*'set rgb 68  30 180  30'
*'set rgb 69  15 160  15'
right_cols=8
'set rgb 61 200 255 190'
'set rgb 62 180 250 170'
'set rgb 63 150 245 140'
'set rgb 64 120 245 115'
'set rgb 65  80 240  80'
'set rgb 66  55 210  60'
'set rgb 67  30 180  30'
'set rgb 68  15 160  15'
endif

*
* determine number of colors to be used by color map
*
'shdcntmp='var
'varmintmp=min(min(min(min('shdcntmp',t='_ts',t='_te'),x='_xs',x='_xe'),y='_ys',y='_ye'),z='_zs',z='_ze')'
'varmaxtmp=max(max(max(max('shdcntmp',t='_ts',t='_te'),x='_xs',x='_xe'),y='_ys',y='_ye'),z='_zs',z='_ze')'
* In the above two lines time dimension is done first since that's much quicker.
'query defval varmintmp 1 1'
varmin=subwrd(result,3)
'query defval varmaxtmp 1 1'
varmax=subwrd(result,3)
left_levs=math_int((-blackout*cint-varmin)/cint)+1
right_levs=math_int((varmax-blackout*cint)/cint)+1
if(left_levs>99)
left_levs=99
say 'SHADCON>WARNING: Too many contour levels (all undefined values?); forced to 99.'
endif
if(right_levs>99)
right_levs=99
say 'SHADCON>WARNING: Too many contour levels; forced to 99.'
endif
if(cmopt='')
left_cols_used=left_levs
right_cols_used=right_levs
endif
if(cmopt=0)
left_cols_used=left_cols
right_cols_used=right_cols
endif
if(cmopt>0)
left_cols_used=cmopt
right_cols_used=cmopt
endif
if(left_cols_used>left_cols);left_cols_used=left_cols;endif
if(right_cols_used>right_cols);right_cols_used=right_cols;endif
if(left_cols_used<0);left_cols_used=0;endif
if(right_cols_used<0);right_cols_used=0;endif
if(blackout!=0)
tot_cols_used=left_cols_used+right_cols_used+1
else
tot_cols_used=left_cols_used+right_cols_used
endif
*if(tot_cols_used<=1)
*say 'SHADCON>ERROR: <cint> too large.'
*return
*endif
*
* set clevs for shading
*
setclevs='set clevs'
cnt=-left_cols_used
while(cnt<=-1)
clev=(cnt-(blackout-1))*cint
setclevs=setclevs' 'clev
cnt=cnt+1
endwhile
if(blackout!=0)
cnt=1
else
cnt=2
endif
while(cnt<=right_cols_used)
clev=(cnt+(blackout-1))*cint
setclevs=setclevs' 'clev
cnt=cnt+1
endwhile
*
* determine step size to pick up colors from pre-defined ones
*
if(left_cols_used>1);left_step=math_int((left_cols-1)/(left_cols_used-1));else;left_step=1e30;endif
if(right_cols_used>1);right_step=math_int((right_cols-1)/(right_cols_used-1));else;right_step=1e30;endif
if(left_step<=right_step)
step=left_step
else
step=right_step
endif
*
* set ccols
*
setccols='set ccols'
offset=60
cnt=-left_cols_used
while(cnt<=-1)
color_idx=(-1+(cnt+1)*step)+offset
setccols=setccols' 'color_idx
cnt=cnt+1
endwhile
if(blackout!=0)
setccols=setccols' '0
endif
cnt=1
while(cnt<=right_cols_used)
color_idx=(1+(cnt-1)*step)+offset
setccols=setccols' 'color_idx
cnt=cnt+1
endwhile
*
* set clevs for contours
*
setclevsGE0='set clevs'
cnt=right_levs
while(cnt>=1)
clev=(cnt+(blackout2-1))*cint
setclevsGE0=setclevsGE0' 'clev
cnt=cnt-1
endwhile
setclevsLT0='set clevs'
if(blackout2!=0)
cnt=-1
else
cnt=-2
endif
while(cnt>=-left_levs)
clev=(cnt-(blackout2-1))*cint
setclevsLT0=setclevsLT0' 'clev
cnt=cnt-1
endwhile

*
* get rvratio
*
'query pp2xy 0 0'
tmpxa=subwrd(result,3)
'query pp2xy 1 1'
tmpxb=subwrd(result,3)
rvratio=tmpxb-tmpxa

if(setclevs!='set clevs')
'set gxout shaded'
setclevs
setccols
'display 'var
endif

*
* if use this block then i can not use 'set clskip' to control contour labeling; otherwise it's better than the next block
*
*'set gxout contour'
*if(setclevsLT0!='set clevs')
*setclevsLT0
*'set ccolor 1'
*if(rvratio>=2)
*'set cstyle 2'
*else
*'set cstyle 3'
*endif
*'display 'var
*endif
*if(setclevsGE0!='set clevs')
*setclevsGE0
*'set ccolor 1'
*'set cstyle 1'
*'display 'var
*endif

*
* if use this block then contour shreshold can not be smaller than contour interval
* (e.g., set cint 2, set black 1, then contours will be 2, 4, 6, ..., instead of 1, 3, 5, ..., and hence out of sync with shading)
*
'set gxout contour'
black=(blackout2-0.001)*cint
'set black -'black' 'black
'set cint 'cint
'display 'var

*
* print some information
*
say 'SHADCON>INFO: color map = 'colormap'; # of colors (left + right) = 'left_cols_used' + 'right_cols_used'.'

return
***************************************************************************************
function usage()
*
* Print usage information.
*
say '  Plot a 2-D graph using shading and/or contours.'
say ''
say '  USAGE: shadcon <colormap>[<option>] <var> <cint> [<blackout> [<blackout2>]]'
say '     <colormap>: Available color maps: blue2red, red2blue, brown2green.'
say '     <option>: If unset, the number of colors used by the color map will depend on the min/max value of the field to' 
say '               be plotted as well as the contour interval/shreshold. Set to any integer >=1 if a common color map,'
say '               consisting of <option> colors on either side of zero, is to be shared by multiple plots. Set to 0 to'
say '               use all colors pre-defined for the specific color map.'
say '     <var>: variable to be plotted.'
say '     <cint>: shading/contour interval.'
say '     <blackout>: values between -<blackout>*<cint> to <blackout>*<cint> will NOT be shaded. Must be a non-negative integer.'
say '                 All values will be shaded if <blackout>=0. No values will be shaded if <blackout>=inf. Defaults to 1.'
say '     <blackout2>: values between -<blackout>*<cint> to <blackout>*<cint> will NOT be contoured. Must be a non-negative integer.'
say '                  All values will be shaded if <blackout>=0. No values will be shaded if <blackout>=inf. Defaults to <blackout>.'
say ''
say '  EXAMPLE 1: shadcon blue2red sst 0.1'
say '             This will plot the variable sst using a blue-to-red color map. The number of colors used will'
say '             be dynamically determined. Shading/contouring interval/shreshold is 0.1.'
say ''
say '  EXAMPLE 2: shadcon brown2green5 precip 0.05 2'
say '             This will plot the variable precip using a brown-to-green color map consisting of 5+5=10 colors.'
say '             Shading/contouring interval (shreshold) is 0.05x2=0.1.'
say ''
say '  EXAMPLE 3: shadcon brown2green0 precip 0.05 2 1'
say '             As EXAMPLE 2, except (a) using all pre-defined colors for the brown-to-green color map, and (b) contouring shreshold is 0.05x1=0.05.'
say ''
say '  EXAMPLE 4: shadcon brown2green0 precip 0.05 2 inf'
say '             As EXAMPLE 3, except without contours.'
say ''
say '  EXAMPLE 5: shadcon brown2green0 precip 0.05 inf 1'
say '             As EXAMPLE 3, except without shading.'
say ''
say '  Dependencies: qdims.gsf'
say ''
say '  Copyright (C) 2008 Bin Guan.'
say '  Distributed under GNU/GPL.'
return
