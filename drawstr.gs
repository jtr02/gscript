***************************************************************************************
*       $Id: drawstr.gs,v 1.25 2008/07/03 17:17:34 bguan Exp bguan $
*       Copyright (C) 2007 Bin Guan.
*       Distributed under GNU/GPL.
***************************************************************************************
function drawstr(arg)
*
* Draw string in designated position.
*
rc=gsfallow('on')

*
* Parse -T option (main title).
*
num_TXT=parseopt(arg,'-','T','TEXT')

*
* Parse -t option (text).
*
num_txt=parseopt(arg,'-','t','text')
if(num_TXT+num_txt=0 | num_TXT*num_txt>0)
usage()
return
endif

*
* Initialize other options.
*
if(num_TXT>0)
cnt=1
while(cnt<=num_TXT)
_.xoffset.cnt=0
_.yoffset.cnt=0
cnt=cnt+1
endwhile
endif
if(num_txt>0)
x=0
y=0
cnt=1
while(cnt<=num_txt)
_.position.cnt=cnt
_.xoffset.cnt=0
_.yoffset.cnt=0
cnt=cnt+1
endwhile
endif

*
* Parse -p option (position).
*
ps=10
p.1='tl'
p.2='tc'
p.3='tr'
p.4='bl'
p.5='br'
p.6='bc'
p.7='b25'
p.8='b75'
p.9='l'
p.10='r'
rc=parseopt(arg,'-','p','position')
cnt=1
while(cnt<=num_txt)
if(valnum(_.position.cnt)=0)
p_cnt=1
flag=0
while(p_cnt<=ps)
flag=flag | (_.position.cnt=p.p_cnt)
p_cnt=p_cnt+1
endwhile
  if(!flag)
  say 'DRAWSTR>ERROR: invalid <position>.'
  say ''
  return
  endif
endif
if(valnum(_.position.cnt)=1 & (_.position.cnt<1 | _.position.cnt>10))
say 'DRAWSTR>ERROR: <position> must be an integer between 1 and 10.'
say ''
return
endif
if(valnum(_.position.cnt)=2)
say 'DRAWSTR>ERROR: <position> must be an integer.'
say ''
return
endif
cnt=cnt+1
endwhile

*
* Parse -xo option (x offset).
*
rc=parseopt(arg,'-','xo','xoffset')

*
* Parse -yo option (y offset).
*
rc=parseopt(arg,'-','yo','yoffset')

*
* Draw main title.
*
if(num_TXT>0)
_.scalefactor.1=1
rc=parseopt(arg,'-','scale','scalefactor')
'set vpage off'
'set parea off'
'query gxinfo'
line2=sublin(result,2)
realpagewid=subwrd(line2,4)
realpagehgt=subwrd(line2,6)
scaledpagewid=realpagewid*_.scalefactor.1
marginleft=0.25
marginright=0.25
margintop=0.5
'set vpage off'
'set parea off'
TXT_spacing=(scaledpagewid-marginleft-marginright)/num_TXT
TXT_x0=0.5*TXT_spacing+marginleft
TXT_y0=realpagehgt-margintop+0.05*_.scalefactor.1
cnt=1
while(cnt<=num_TXT)
TXT_x=TXT_x0+(cnt-1)*TXT_spacing
'set strsiz '0.22*_.scalefactor.1
'set string 1 bc 5'
'draw string 'TXT_x+_.xoffset.cnt' 'TXT_y0+_.yoffset.cnt' '_.TEXT.cnt
cnt=cnt+1
endwhile
return
endif

*
* Get plot area
*
'query gxinfo'
line3=sublin(result,3)
line4=sublin(result,4)
x1=subwrd(line3,4)
x2=subwrd(line3,6)
y1=subwrd(line4,4)
y2=subwrd(line4,6)
x25=x1+(x2-x1)/4
x50=x1+(x2-x1)/2
x75=x1+(x2-x1)/4*3
y50=y1+(y2-y1)/2

*
* Define spacing.
*
small_spacing=0.05
big_spacing=0.5
'query pp2xy 0 0'
tmpxa=subwrd(result,3)
'query pp2xy 1 1'
tmpxb=subwrd(result,3)
rvratio=tmpxb-tmpxa
small_spacing=small_spacing*rvratio
big_spacing=big_spacing*rvratio

*
* Draw string.
*
thickness=5
cnt=1
while(cnt<=num_txt)
while(_.text.cnt='')
cnt=cnt+1
endwhile
if(cnt>num_txt)
return
endif
if(_.position.cnt=2 | _.position.cnt=p.2)
x=x50
y=y2+small_spacing
'set string 1 bc 'thickness' 0'
endif
if(_.position.cnt=6 | _.position.cnt=p.6)
x=x50
y=y1-big_spacing
'set string 1 tc 'thickness' 0'
endif
if(_.position.cnt=9 | _.position.cnt=p.9)
x=x1-2*big_spacing
y=y50
'set string 1 c 'thickness' 90'
endif
if(_.position.cnt=10 | _.position.cnt=p.10)
x=x2+big_spacing
y=y50
'set string 1 c 'thickness' 270'
endif
if(_.position.cnt=1 | _.position.cnt=p.1)
x=x1
y=y2+small_spacing
'set string 1 bl 'thickness' 0'
endif
if(_.position.cnt=3 | _.position.cnt=p.3)
x=x2
y=y2+small_spacing
'set string 1 br 'thickness' 0'
endif
if(_.position.cnt=4 | _.position.cnt=p.4)
x=x1
y=y1+small_spacing
'set string 1 bl 'thickness' 0'
endif
if(_.position.cnt=5 | _.position.cnt=p.5)
x=x2
y=y1+small_spacing
'set string 1 br 'thickness' 0'
endif
if(_.position.cnt=7 | _.position.cnt=p.7)
x=x25
y=y1-1.7*big_spacing
'set string 1 tc 'thickness' 0'
endif
if(_.position.cnt=8 | _.position.cnt=p.8)
x=x75
y=y1-1.7*big_spacing
'set string 1 tc 'thickness' 0'
endif
x=x+_.xoffset.cnt
y=y+_.yoffset.cnt
'draw string 'x' 'y' '_.text.cnt
cnt=cnt+1
endwhile
'set string 1 bl 'thickness' 0'

return
***************************************************************************************
function usage()
*
* Print usage information.
*
say '  Annotate a plot.'
say ''
say '  Usage 1: drawstr -t <text1> [<text2>...] [-p <position1> [<position2>...]] [-xo <xoffset1> [<xoffset2>...]] [-yo <yoffset1> [<yoffset2>...]]'
say '  Usage 2: drawstr -T <title1> [<title2>...] [-xo <xoffset1> [<xoffset2>...]] [-yo <yoffset1> [<yoffset2>...]] [-scale <scalingfactor>]'
say '     <text>: Panel labels. Text beginning with a minus sign or containing spaces must be double quoted.'
say '     <position>: Position of text. Refer to schematic below. Defaults to "1 2 3...".'
say '     <xoffset>: Horizontal offset to default position. Defaults to 0.'
say '     <yoffset>: Vertical offset to default position. Defaults to 0.'
say '     <title>: Title for a whole column. Refer to schematic below. Text beginning with a minus sign or containing spaces must be double quoted.'
say '     <scalingfactor>: scaling factor. Defaults to 1.'
say ''
say '                <title>'
say '   1               2               3'
say '   ---------------------------------'
say '   |                               |'
say '   |                               |'
say '   |                               |'
say '  9|             plot              |10'
say '   |                               |'
say '   |                               |'
say '   |4                             5|'
say '   ---------------------------------'
say '                   6                '
say '           7               8        '
say ''
say '  Note: The "-T" and "-t" options cannot be used together.'
say ''
say '  Dependencies: parsestr.gsf, parseopt.gsf'
say ''
say '  Copyright (C) 2007 Bin Guan.'
say '  Distributed under GNU/GPL.'
return
